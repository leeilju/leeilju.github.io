---
title: "블로그를 시작합니다"
description: "Astro와 GitHub Pages로 개인 기술 블로그를 열었습니다. 이 블로그를 어떻게 만들었고, 무엇을 기록할지 소개합니다."
pubDatetime: 2026-11-11T20:00:00+09:00
tags:
  - blog
featured: true
draft: false
---

개발하면서 배운 것, 문제를 해결한 과정, 나중에 다시 찾아볼 내용들을 기록하기 위해 블로그를 열었습니다.

## 블로그 구성

- [Astro](https://astro.build/)와 [AstroPaper](https://github.com/satnaing/astro-paper) 테마로 만들었습니다.
- GitHub Pages에서 호스팅하고, `main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드하고 배포합니다.
- 글은 마크다운(`.md`, `.mdx`)으로 작성합니다.
- 검색, 태그, 아카이브, 다크 모드, RSS를 기본으로 지원합니다.

## 글 쓰는 방법

`src/content/posts/` 폴더에 마크다운 파일을 하나 추가하면 글 하나가 됩니다. 파일 맨 위에 제목, 날짜, 태그 같은 정보를 적고, 그 아래에 본문을 씁니다.

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

## 앞으로

꾸준히 기록하는 것이 목표입니다. 작은 삽질 기록도 나중의 나에게는 도움이 되니까요.
