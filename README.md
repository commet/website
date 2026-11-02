# yclee.today

이예찬 / Yaechan Lee의 개인 웹사이트. AX 사업과 직접 만드는 일을 실제 프로젝트 사례, 글, 커뮤니티 활동으로 소개합니다.

## Run

```sh
npm install
npm run dev
npm run build
npm run lint
npm test
```

React + Vite. 한국어 기본, 영어 지원. 언어 선택을 로컬에 저장합니다.

- `/`: FSK 프로젝트, STRIX, Argus, Beyond Deploy와 FDE톤, 글, 배경, 연락
- `/case-study/fsk`: 물류 관제, 문서 검증과 시스템 연동, 청구·입금 대사
- `/case-study/strix`: SK On의 사내 AI 구축과 도입 경험

## Content and design

- `PRODUCT.md`: 확인된 공개 범위와 콘텐츠 기준
- `DESIGN.md`: 구현된 디자인 시스템
- `src/components/Site.jsx`: 홈과 공통 영역의 한영 콘텐츠
- `src/components/CaseStudy.jsx`: 사례 상세 콘텐츠
- `src/components/Notes.jsx`, `src/writing-links.json`: 선별한 LinkedIn 글
- `src/event.js`: FDE톤 모집 마감 및 행사 시점 상태
- `scripts/generate-og-image.py`: 소셜 공유 이미지 생성 (Pillow 필요)

FSK 화면은 기존 공개용 프로젝트 이미지이며 사용자에게 이름과 이미지 공개 허락을 확인했습니다. 새로운 실제 데이터 화면을 추가할 때는 별도 확인이 필요합니다. 절감 시간, 비용 효과, 예측 정확도는 검증 없이 추가하지 않습니다.

## Hosting

기존 Vercel 프로젝트 `website`, team `team_Rl6K0F7x6qLFP2crqbJ6uNAL`, project `prj_H8zVKlhQOfi9rqV7OM3TfFUcpVoW`.

```sh
npx vercel deploy --scope team_Rl6K0F7x6qLFP2crqbJ6uNAL
npx vercel deploy --prod --skip-domain --scope team_Rl6K0F7x6qLFP2crqbJ6uNAL
# 검증 후 해당 production deployment URL을 promote
npx vercel promote <deployment-url> --scope team_Rl6K0F7x6qLFP2crqbJ6uNAL
```

도메인: https://yclee.today. 기존 `api/daily-report.js`, `api/objection-simulator.js`와 cron은 유지했습니다. 시뮬레이터 UI는 개편에서 제거했습니다.

## Verification

`npm test`는 한국 시간 기준 모집 마감의 마지막 분과 행사 종료 경계를 확인합니다. 브라우저에서 홈, 두 상세 페이지, 언어 유지, 탭의 키보드 이동, 연락 링크, 데스크톱과 모바일 표시를 확인했습니다. 로컬 시각 검토 캡처는 `.impeccable/review/`에 있으며 git과 배포에서 제외합니다.

개편 전 미커밋 변경은 이름이 지정된 git stash와 `/tmp/yclee-site-refresh-backup/pre-existing.patch`에 보관했습니다. 예약 링크는 새 연락 영역에 반영했습니다. 별도 근거를 확인하지 못한 월 120시간 절감 문구는 공개 성과에 넣지 않았습니다.
