import { defineAstroPaperConfig } from "./src/types/config";

/**
 * 블로그 기본 설정. 제목, 설명, 작성자, 링크, 기능 토글은 모두 이 파일에서 바꿉니다.
 * 이 파일만 수정하면 사이트 전체에 반영됩니다.
 */

/**
 * GitHub 아이디. 저장소 이름이 `<아이디>.github.io` 라고 가정하고
 * 사이트 URL과 GitHub 링크를 여기서 파생합니다.
 */
export const GITHUB_USERNAME = "leeilju";

export default defineAstroPaperConfig({
  site: {
    url: `https://${GITHUB_USERNAME}.github.io/`,
    title: "Ilju's Dev Log",
    description: "개발하면서 배우고 정리한 것들을 기록합니다.",
    author: "Ilju Lee",
    profile: `https://github.com/${GITHUB_USERNAME}`,
    // public/ 에 이 파일이 있으면 기본 OG 이미지로 사용하고,
    // 없으면 사이트 제목으로 자동 생성한 /og.png 를 사용합니다.
    ogImage: "default-og.jpg",
    lang: "ko",
    timezone: "Asia/Seoul",
    dir: "ltr",
  },
  posts: {
    perPage: 8, // 글 목록 한 페이지당 글 수
    perIndex: 5, // 홈 화면 "최근 글" 수
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true, // 글마다 OG 이미지 자동 생성
    showArchives: true,
    showBackButton: true,
    editPost: { enabled: false },
    search: "pagefind",
    toc: true,
  },
  socials: [
    { name: "github", url: `https://github.com/${GITHUB_USERNAME}` },
  ],
  shareLinks: [
    { name: "x", url: "https://x.com/intent/post?url=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    {
      name: "mail",
      url: `mailto:?subject=${encodeURIComponent("이 글을 공유합니다")}&body=`,
    },
  ],
});
