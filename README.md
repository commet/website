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

- `/`: FSK 관제와 DocAgent, STRIX, 직접 만든 제품(약방·Argus), Beyond Deploy와 FDE톤, 글, 배경, 연락
- `/case-study/fsk`: 물류 관제, 문서 검증과 시스템 연동, 청구·입금 대사
- `/case-study/strix`: SK On의 사내 AI 구축과 도입 경험

## Content and design

- `PRODUCT.md`: 확인된 공개 범위와 콘텐츠 기준
- `DESIGN.md`: 구현된 디자인 시스템
- `src/components/Site.jsx`: 홈과 공통 영역의 한영 콘텐츠
- `src/components/CaseStudy.jsx`: 사례 상세 콘텐츠
- `src/components/Notes.jsx`, `src/writing-links.json`: 선별한 LinkedIn 글
- `src/event.js`: FDE톤 모집 마감 및 행사 시점 상태
- `scripts/generate-og-image.py`: 소셜 공유 이미지 생성 (`pillow`, `fonttools[woff]` 필요)

FSK 이름과 프로젝트 이미지 공개는 사용자 허락을 확인했습니다. 전체 관제 화면은 별도 고객사 관제 저장소의 v1.2.0(`b4f7413`)을 예시 데이터로 구동한 1920×1080 캡처입니다. 왼쪽 현황, 중앙 지도, 오른쪽 감시, 하단 일정을 자르지 않았습니다. DocAgent는 식별정보를 가린 검증 화면과 공개용으로 요약한 4단계 업무 흐름을 제시하며, 주문 연동은 구축·검증 중임을 명시합니다. 운항계획의 두 화면은 고객사 관제 앱 소스를 기존 테스트 항차 데이터로 구동해 캡처했으며, 예시 데이터임을 표시합니다. 출고 3일 지연과 도착 7일 지연의 관계는 예시 시나리오이며 실측 성과가 아닙니다. 고객 수량, 담당자, 계약 정보는 포함하지 않습니다. 절감 시간, 비용 효과, 예측 정확도는 검증 없이 추가하지 않습니다.

## 약방 사례

사용자가 직접 만들었다고 확인한 `https://yakbang.app`을 `#yakbang`에 소개합니다. 물류 관제와 DocAgent를 연속 배치하고, STRIX 다음의 직접 만든 제품 묶음에서 약방과 Argus를 소개합니다. 2026-11-03 공개 페이지의 첫 화면을 1100×720 뷰포트로 다시 캡처했으며, 시연용 가상 행사 준비 메일로 생성한 실제 결과 영역을 별도로 캡처했습니다. 결과는 확대 뷰어에서 열고, 기본 페이지에는 짧은 설명과 세 단계 흐름만 표시합니다. 이전의 빈 문진·처방 템플릿·피드백 팝업 캡처는 제거했습니다. 실제 고객 자료나 검증되지 않은 이용·효과 수치는 포함하지 않습니다.

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

## Signal Desk

Homepage `#intelligence` is a working public-data agent. GET `/api/intelligence?mission=world|panama|newark` retrieves NOAA/NWS, NASA EONET and USGS observations. POST takes `{ "mission": "world", "lang": "kr" }` and streams NDJSON events for source connection, parallel API calls, synthesis and the cited result; a cached result returns JSON. It accepts fixed missions only. The model never receives arbitrary URLs or customer data.

Production reuses server-only `ANTHROPIC_API_KEY`, `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`; optional `SIGNAL_DESK_MODEL` overrides the latency-oriented Haiku 4.5 default. AI execution fails closed without shared storage. Limits: 4 uncached requests/IP/10 minutes, 60 total/hour, one model call/run, 10-minute result cache, 90-second function ceiling. Provider failures are separate from zero results. Brief citations must reference successfully retrieved source IDs and actual record IDs.

`npm run dev` serves the public-data API through a development-only Vite middleware. Live AI requires those server-side variables in the dev process (or `vercel dev` with development credentials); no production secrets are pulled into source. An unconfigured local AI run shows a retryable unavailable state while real public feeds continue to work. `npm test` covers geographical filtering, unsupported/empty/failed feeds, stale catalog entries, citation integrity and safe URLs, as well as event-date boundaries. The old homepage schedule tabs are removed; release planning remains in `/case-study/fsk`.

The public monitoring capture is re-rendered with the end-client name replaced by 고객사; the former named asset is not shipped. Signal Desk starts with the Panama leg and includes a local Natural Earth map with the geolocated NASA/USGS observations. Weather alerts remain in the briefing because this integration does not supply their map geometry. Geography: Natural Earth public-domain land polygons via world-atlas 2.0.2 (ISC), rendered using d3-geo and topojson-client.
