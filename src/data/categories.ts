/**
 * 카테고리와 시리즈 정의.
 *
 * 시리즈 id는 `src/content/posts/<id>/` 폴더 이름과 같다. 그 폴더 안의 글은
 * 자동으로 해당 시리즈에 속하고, 글 상단의 시리즈 목차(SeriesNav)와
 * `/categories/` 페이지는 이 표를 보고 글을 묶는다. 새 시리즈를 시작하면
 * 폴더를 만들고 여기에 항목을 하나 추가하면 된다. 시리즈 안의 글 순서는
 * 파일명 순(`01-`, `02-` 접두사)이다.
 */
export type SeriesDef = {
  /** `src/content/posts/` 바로 아래 폴더 이름 */
  id: string;
  title: string;
  description: string;
};

export type CategoryDef = {
  id: string;
  title: string;
  description: string;
  series: SeriesDef[];
};

export const CATEGORIES: CategoryDef[] = [
  {
    id: "motor-control",
    title: "모터제어",
    description:
      "로봇 관절용 액추에이터의 모터 제어기와 그 주변 부품을 측정하고 설계한 기록.",
    series: [
      {
        id: "anti-cogging",
        title: "안티코깅",
        description:
          "시판 드라이버 펌웨어 역분석에서 출발해, 상전류 센서와 고분해능 엔코더가 있는 관절 모터에 맞는 코깅 토크 보상 사양을 정리해 가는 과정.",
      },
      {
        id: "solenoid",
        title: "솔레노이드 브레이크",
        description:
          "브레이크용 솔레노이드의 위치와 권선 온도를 센서 없이 L과 R로 알아내기 위해 한 달 동안 측정하고, 보드용 데이터 테이블을 만든 과정.",
      },
    ],
  },
];
