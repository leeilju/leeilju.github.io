# Ilju's Dev Log

[Astro](https://astro.build/)와 [AstroPaper](https://github.com/satnaing/astro-paper) 테마로 만든 개인 기술 블로그입니다.
`main` 브랜치에 push하면 GitHub Actions가 빌드해서 GitHub Pages에 배포합니다.

## 글 쓰기

`src/content/posts/` 아래에 마크다운 파일을 하나 추가하면 글 하나가 됩니다.

```md
---
title: "글 제목"
description: "목록과 검색 결과에 보이는 한 줄 요약"
pubDatetime: 2026-11-11T20:00:00+09:00
tags:
  - embedded
---

본문은 여기에 씁니다.
```

- 파일 이름이 URL이 됩니다. `hello-world.md` → `/posts/hello-world`
- `draft: true` 를 넣으면 빌드에서 제외됩니다.
- `featured: true` 를 넣으면 홈 화면 상단 "추천 글"에 표시됩니다.
- 글을 고치면 `modDatetime` 을 추가해 수정일을 표시할 수 있습니다.
- 이미지는 `src/assets/images/` 에 두고 `![설명](@/assets/images/파일명.png)` 으로 넣습니다.

## 로컬에서 실행

```bash
npm install
```

```bash
npm run dev
```

개발 서버는 http://localhost:4321 에서 열립니다. 프로덕션 빌드는 `npm run build`, 빌드 결과 확인은 `npm run preview` 입니다.

## 설정 파일

| 바꾸고 싶은 것                   | 파일                          |
| -------------------------------- | ----------------------------- |
| 사이트 제목, 설명, 작성자, 링크  | `astro-paper.config.ts`       |
| GitHub 아이디(사이트 URL에 사용) | `astro-paper.config.ts` 맨 위 |
| 화면에 보이는 한국어 문구        | `src/i18n/lang/ko.ts`         |
| 색상(라이트/다크)                | `src/styles/theme.css`        |
| 소개 페이지                      | `src/content/pages/about.md`  |
| 홈 화면 인사말                   | `src/pages/index.astro`       |
| 파비콘                           | `public/favicon.svg`          |

## 배포

1. 저장소는 [leeilju/leeilju.github.io](https://github.com/leeilju/leeilju.github.io) 이고, 사이트 주소는 https://leeilju.github.io 입니다.
2. 저장소 **Settings → Pages → Build and deployment → Source** 가 **GitHub Actions** 여야 합니다.
3. `main` 에 push할 때마다 [deploy.yml](.github/workflows/deploy.yml) 이 자동으로 빌드하고 배포합니다.

## 크레딧

테마: [AstroPaper](https://github.com/satnaing/astro-paper) by Sat Naing (MIT License)
