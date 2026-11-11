# CLAUDE.md

Ilju Lee의 개인 기술 블로그. Astro 7 + AstroPaper v7.1.0 테마 기반이고 GitHub Pages(https://leeilju.github.io, 저장소 `leeilju/leeilju.github.io`)로 배포한다.
글 작성, 설정 변경, 기능 추가 같은 블로그 운영은 대부분 Claude가 맡는다. 사용자는 한국어로 소통한다.

## 빠른 참조

- 패키지 매니저: **npm** (pnpm 아님). Node 26. Windows에서 개발.
- 개발 서버: `npm run dev` → http://localhost:4321 (`.claude/launch.json`의 `blog-dev` 설정으로 preview 가능)
- 빌드: `npm run build` = `astro check` → `astro build` → pagefind 인덱스 생성 → `public/pagefind` 복사
- 포맷/린트: `npm run format`, `npm run lint` (`.prettierignore`가 허용 목록 방식이라 `astro-paper.config.ts`, `CLAUDE.md`는 포맷 대상이 아님)
- 배포: `main`에 push → `.github/workflows/deploy.yml` (빌드 후 GitHub Pages 배포). 저장소 Settings → Pages → Source는 **GitHub Actions**.

## 글 작성 규칙

- 위치: `src/content/posts/`. 하위 폴더 가능하며 폴더명이 URL에 포함된다. `_`로 시작하는 폴더/파일은 빌드에서 제외.
- 스키마: `src/content.config.ts`. `title`, `description`, `pubDatetime` 필수. `tags` 기본값 `["others"]`. `draft`, `featured`, `modDatetime`, `ogImage`, `hideToc`, `timezone` 선택.
- 날짜 형식: `2026-11-11T20:00:00+09:00` (KST). 사이트 타임존은 `Asia/Seoul`. 게시 여부는 날짜 단위로 판단된다(미래 날짜는 빌드에서 제외).
- 파일명은 영문 kebab-case이고 그대로 URL 슬러그가 된다. frontmatter `slug:`로 덮어쓸 수 있다.
- 본문은 한국어. 코드블록에는 언어를 표기한다. 이미지는 `src/assets/images/`에 두고 `@/assets/images/...`로 참조한다.
- 글을 고치면 `modDatetime`을 갱신한다.
- 회사 코드, 제품 정보, 내부 자료는 올리지 않는다.

## 설정 위치

| 무엇                                 | 어디                                                                  |
| ------------------------------------ | --------------------------------------------------------------------- |
| 사이트 URL/제목/설명/작성자/링크/기능 | `astro-paper.config.ts` (`GITHUB_USERNAME` 상수에서 URL들이 파생됨)  |
| Astro 설정(i18n ko, 마크다운, 폰트)  | `astro.config.ts`                                                     |
| UI 문구(한국어)                      | `src/i18n/lang/ko.ts` (새 키는 `src/i18n/types.ts`에도 추가)          |
| 색상, 본문 폰트 스택                 | `src/styles/theme.css`                                                |
| 코드 폰트, `word-break: keep-all`    | `src/styles/global.css`                                               |
| `<head>` (Pretendard CDN 링크 포함)  | `src/layouts/Layout.astro`                                            |
| 홈 화면 인사말                       | `src/pages/index.astro`                                               |
| 소개 페이지                          | `src/content/pages/about.md`                                          |
| 날짜 표시 형식                       | `src/components/Datetime.astro` (ko → `YYYY.MM.DD`)                   |
| OG 이미지(기본 / 글별)               | `src/pages/og.png.ts`, `src/pages/posts/[...slug]/index.png.ts`       |
| OG 이미지 폰트 로더                  | `src/utils/loadGoogleFont.ts` (빌드 시 Noto Sans KR TTF 다운로드)     |

## 업스트림(AstroPaper) 대비 변경 사항

업스트림 업데이트를 반영할 때 이 항목들이 충돌 지점이다.

- 한국어 로케일 추가: `src/i18n/lang/ko.ts`, `astro.config.ts`의 `i18n.locales = ["ko"]`.
- 본문 폰트를 Pretendard(jsDelivr 동적 서브셋)로, 코드 폰트는 Google Sans Code 유지. `html { word-break: keep-all }`.
- OG 이미지 폰트를 Astro fonts API 대신 `loadGoogleFont("Noto Sans KR")`로 교체(한글 깨짐 방지). `src/utils/getFontPathByWeight.ts` 삭제.
- `Datetime.astro` 날짜 형식 로케일 분기.
- 홈 화면(`index.astro`) 인사말, `about.md`, `favicon.svg`, `README.md` 교체. `public/default-og.jpg` 삭제(자동 생성 OG 사용).
- 샘플 글/이미지, Docker, pnpm, 업스트림 GitHub 메타 파일(이슈 템플릿 등) 제거. `ci.yml` → `deploy.yml`.
- 업스트림 가이드 글(글 작성 규칙, 색상 스킴, Giscus 댓글, LaTeX, 의존성 업데이트)은 https://github.com/satnaing/astro-paper 의 `src/content/posts/`에 있다. 기능 추가 시 참고.

## 자주 하는 작업

- 새 글: `src/content/posts/<slug>.md` 작성 → `npm run build`로 확인 → commit → push.
- 댓글(Giscus), 색상 스킴 변경, LaTeX 지원 등은 업스트림 가이드를 참고해 적용.
- 의존성 업데이트: `npm outdated` → `npm update` → 빌드 확인. Astro 메이저 업그레이드는 `npx @astrojs/upgrade`.

## 주의

- `public/pagefind/`는 빌드 산출물이며 `.gitignore`에 있다.
- `.claude/settings.local.json`, `.claude/launch.json`은 로컬 전용이며 `.gitignore`에 있다.
- 커밋 작성자는 개인 GitHub 계정(`leeilju`) 기준이어야 한다. 회사 메일(전역 git 설정)을 쓰지 않도록 이 저장소에는 로컬 `user.email`로 GitHub noreply 주소가 설정되어 있다.
- 이 저장소는 `credential.useHttpPath=true`로 설정되어 있어 push 자격 증명이 다른 GitHub 계정과 섞이지 않고 저장소별로 저장된다. 첫 push 때 Git Credential Manager가 로그인 창을 띄우면 개인 계정으로 로그인한다.
