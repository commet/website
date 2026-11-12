import { useEffect } from "react";
import { useLang } from "../LangContext";
import { Arrow, Link } from "./Site";

const NB = " ";
const content = {
  fsk: {
    kr: {
      title: "FSK L&S",
      subtitle: "물류기업의 운송 관제와 문서 자동화",
      meta: "고객 프로젝트 / Praxis / 2026",
      facts: [
        ["고객", <>물류기업 FSK L&S</>],
        ["맡은 일", <>업무 조사, 제품 설계와 개발, 담당자 피드백 반영</>],
        ["상태", <><b>관제는 배포</b>, 문서의 주문 연동은 구축과 검증 중</>],
      ],
      highlights: [
        ["52%", "6일 넘게 빗나간 도착 예측 감소(KPI)"],
        ["90% 이상", "문서 자동 처리율(STP)"],
        ["99.5%", "문서 판독 정확도"],
      ],
      sections: [
        {
          id: "planning",
          title: <>출고 3일 지연이 도착{NB}7일{NB}지연으로 바뀌는 이유</>,
          nav: "출고 지연과 도착일",
          rows: [
            ["상황", <>주 1회 출항 노선이라 <b>선적 마감을 넘기면 다음 주 배</b>를 기다려야 함</>],
            ["문제", <>출고가 며칠 늦었는지만으로는 도착일을 계산할 수 없음</>],
            ["한 일", <>출고일을 바꾸면 <b>탈 수 있는 항차(배 한 번의 운항)를 다시 찾고 도착 범위를 새로 계산</b>하는 시뮬레이션 구현</>],
            ["예시", <>아래 화면에서 출고를 3일 늦추면 다음 항차로 배정되어 <b>도착이 7일 늦어짐</b>(예시 데이터)</>],
          ],
          image: "/images/work/sailing-delay.png",
          caption: "실제 제품에 예시 항차를 넣은 시뮬레이션. 해상 운송, 항만 대기, 내륙 운송을 나눠 어느 구간에서 밀리는지 표시합니다.",
          state: "일정 시뮬레이션 구현 / 예시 데이터",
        },
        {
          id: "monitoring",
          title: "도착일을 범위로 표시한 이유",
          nav: "도착 예측과 관제",
          rows: [
            ["상황", <>선박 위치만으로는 운송 상황을 다 알 수 없음. 항만 대기와 내륙 운송이 남음</>],
            ["문제", <>선사가 예약 때 알려 준 도착 예정일(ETA)은 <b>열 건 중 세 건꼴로 6일 넘게 빗나감</b>. 고객사는 이 비율을 KPI로 봄</>],
            ["한 일", <>과거 운송 기록으로 도착 예측을 보정하고, <b>계획된 날짜와 보정한 예측을 구분</b>해 도착일을 범위로 표시</>],
            ["화면", <>항로, 기상 위험, 항만 대기, 내륙 운송을 한 지도에서 보고, 근거가 부족한 구간은 부족하다고 표시</>],
          ],
          image: "/images/fsk/control-tower.webp",
          caption: "항로와 기상 위험을 함께 확인하는 운송 관제 화면",
          state: "관제 구축과 배포 / 예측 기능은 별도 검증",
          metrics: [
            ["52%", "KPI 개선: 6일 넘게 빗나간 도착 예측 감소(29.7% → 14.3%)"],
            ["20%", "도착 예측 평균 오차 감소(4.51일 → 3.61일)"],
            ["523건", "검증에 쓴 과거 운송 기록"],
          ],
          metricsNote: "선사가 선적 예약 때 알려 준 도착 예정일과 보정한 예측을 실제 도착일과 비교해 과거 기록으로 사후 검증한 결과이며, 운영 중에 쌓인 기록은 아닙니다.",
        },
        {
          id: "documents",
          title: "문서 판독에서 주문 승인까지",
          nav: "문서 판독과 주문 연동",
          rows: [
            ["상황", <>업무 과제 32개를 따라가 보니 <b>공통 원인은 서류 입력 단계</b></>],
            ["문제", <>메일로 오는 서류는 양식과 표현이 제각각. 값을 옮긴 뒤에도 원문, 기존 코드, 중복 주문을 다시 확인해야 함</>],
            ["한 일", <>AI가 값을 읽어 <b>원문 근거와 나란히</b> 보여 주고, <b>어긋난 곳만 담당자가</b> 고치고 승인</>],
            ["흐름", <>첨부 판독 → 원문 대조 → 값과 코드 검증 → 기존 주문 확인 → 담당자 승인 → 물류 업무 시스템 KEROL에 주문 생성</>],
          ],
          image: "/images/fsk/document-review.webp",
          caption: "원문과 추출한 값을 대조해 불일치를 확인하는 검증 화면",
          state: "주문 연동은 구축과 검증 중",
          metrics: [
            ["90% 이상", "자동 처리율 STP(이전 10%대)"],
            ["99.5%", "판독 정확도(이전 65%)"],
            ["95% 이상", "등록 전에 찾은 오류"],
          ],
          metricsNote: "자동 처리율(STP, Straight-Through Processing)은 사람의 개입 없이 처음부터 끝까지 자동으로 끝난 서류의 비율입니다. FSK L&S 수출입 서류 500만 건 이상을 처리한 기준입니다.",
        },
        {
          id: "reconciliation",
          title: "청구와 입금이 다른 이유 확인",
          nav: "수금 대사",
          rows: [
            ["상황", <>수금 대사(청구와 입금 맞추기)는 두 금액을 나란히 놓는 것만으로 끝나지 않음</>],
            ["문제", <>집계 기준과 정산 상태가 다르면 <b>숫자가 왜 바뀌었는지</b> 알 수 없음</>],
            ["한 일", <>대사 결과를 근거와 함께 보고, 확인할 건과 담당자의 후속 업무를 정리하는 흐름을 설계하고 구현</>],
            ["기준", <><b>실제 입금인지, 분류 기준을 고친 것인지</b> 구별되게 함</>],
          ],
          state: "대사와 확인 업무 흐름 설계, 구현",
        },
      ],
      closingTitle: "어디까지 자동화할 것인가",
      closingRows: [
        ["자동화", <>서류의 값 읽기, 일정 계산</>],
        ["사람에게", <>원문이 모호하거나 기존 코드와 맞지 않는 값, <b>확정된 계획인지 예측인지의 판단</b></>],
        ["맡은 일", <>이 경계를 정하고 화면과 기존 시스템에 반영</>],
      ],
    },
    en: {
      title: "FSK L&S",
      subtitle: "Shipment monitoring and document automation for a logistics company",
      meta: "Client work / Praxis / 2026",
      facts: [
        ["Client", <>FSK L&S, logistics</>],
        ["My role", <>Domain research, product design and engineering, iteration with operators</>],
        ["Status", <><b>Control tower deployed</b>; order integration for documents in build and validation</>],
      ],
      highlights: [
        ["52%", "Fewer arrival estimates off by 6+ days (KPI)"],
        ["90%+", "Document straight-through processing"],
        ["99.5%", "Document reading accuracy"],
      ],
      sections: [
        {
          id: "planning",
          title: "Why a three-day release delay can cost a week",
          nav: "Release delays and arrival",
          rows: [
            ["Context", <>On a weekly service, <b>missing the cutoff means waiting for next week&apos;s ship</b></>],
            ["Problem", <>A release delay alone does not tell you the arrival date</>],
            ["What I did", <>A simulator that <b>finds the sailing still available and recalculates the arrival range</b> when the release date moves</>],
            ["Example", <>Below, a three-day release delay moves the cargo to the next sailing and <b>arrival by seven days</b> (example data)</>],
          ],
          image: "/images/work/sailing-delay.png",
          caption: "Actual product with example sailings. Ocean transit, port dwell, and inland delivery are shown separately.",
          state: "Schedule simulation implemented / Example data",
        },
        {
          id: "monitoring",
          title: "Why arrival is shown as a range",
          nav: "Arrival estimates and monitoring",
          rows: [
            ["Context", <>A vessel position is only part of the picture; port dwell and inland delivery come after</>],
            ["Problem", <>Carrier ETAs given at booking <b>missed by more than six days about three times in ten</b>. That share was the client&apos;s KPI</>],
            ["What I did", <>Corrected arrival estimates against past shipment records and <b>kept planned dates apart from estimates</b>, showing arrival as a range</>],
            ["Screen", <>Routes, weather risk, port dwell, and inland delivery on one map; gaps in evidence stay visible</>],
          ],
          image: "/images/fsk/control-tower.webp",
          caption: "The control tower showing shipment routes and weather risk",
          state: "Control tower built and deployed / Prediction evaluated separately",
          metrics: [
            ["52%", "KPI: fewer estimates off by 6+ days (29.7% to 14.3%)"],
            ["20%", "Lower average arrival error (4.51 to 3.61 days)"],
            ["523", "Past shipment records used to check"],
          ],
          metricsNote: "Carrier dates given at booking and corrected estimates, compared with actual arrival on past records after the fact; not a record from live operation.",
        },
        {
          id: "documents",
          title: "From reading documents to approving orders",
          nav: "Documents and order integration",
          rows: [
            ["Context", <>Tracing 32 workflow problems led to <b>one common cause: document entry</b></>],
            ["Problem", <>Emailed documents come in every format; after typing values in, the source, codes, and duplicate orders still need checking</>],
            ["What I did", <>AI reads the values and shows them <b>beside the source</b>; <b>operators fix and approve only the mismatches</b></>],
            ["Flow", <>Read attachments → compare with source → check values and codes → check existing orders → approve → create the order in KEROL</>],
          ],
          image: "/images/fsk/document-review.webp",
          caption: "Review screen comparing extracted values with the source",
          state: "Order integration in build and validation",
          metrics: [
            ["90%+", "Straight-through processing (previously 10-20%)"],
            ["99.5%", "Reading accuracy (previously 65%)"],
            ["95%+", "Errors caught before entry"],
          ],
          metricsNote: "Straight-through processing (STP) is the share of documents completed end to end with no human intervention. Based on more than 5 million FSK L&S import and export documents.",
        },
        {
          id: "reconciliation",
          title: "Why invoices and payments differ",
          nav: "Reconciliation",
          rows: [
            ["Context", <>Reconciliation takes more than putting two amounts side by side</>],
            ["Problem", <>When the accounting basis and settlement status differ, <b>you cannot tell why a number changed</b></>],
            ["What I did", <>A workflow to review reconciliation results with evidence and organize operator follow-up</>],
            ["Rule", <><b>Money actually received stays distinguishable from a reclassification</b></>],
          ],
          state: "Reconciliation and review workflow designed and implemented",
        },
      ],
      closingTitle: "Deciding what to automate",
      closingRows: [
        ["Automated", <>Reading document values, calculating dates</>],
        ["Left to people", <>Ambiguous sources, codes that do not match, <b>whether a date is a plan or an estimate</b></>],
        ["My role", <>Set these boundaries and built them into the screens and existing systems</>],
      ],
    },
  },
  strix: {
    kr: {
      title: "STRIX",
      subtitle: "팀이 쓰던 도구를 사내 AI 시스템으로 키웠습니다",
      meta: "SK On / 전략기획 / 2024",
      facts: [
        ["소속", <>SK On 전략기획본부, 사내 프로젝트</>],
        ["맡은 일", <>설계와 구현, 보안과 도입 협의, 경영진 설명, 교육과 확산</>],
        ["구성", <>경량 로컬 LLM과 문서 검색(LangChain{NB}RAG), Office 연동(VBA)</>],
      ],
      highlights: [
        ["약 50%", "기획서 작성 시간 단축(평균)"],
        ["600명+", "시스템 등록자"],
        ["약 30명", "전략기획본부 일상 사용자"],
      ],
      sections: [
        {
          title: "문서 검색과 정보 정리에 AI 적용",
          nav: "문서 검색과 정보 정리",
          rows: [
            ["상황", <>전략기획팀은 여러 문서에서 정보를 찾고 비교해 <b>의사결정 근거로 정리하는 일을 반복</b>함</>],
            ["한 일", <>사내외 정보를 한데 모은 지식 시스템을 직접 구축. <b>경량 로컬 LLM과 문서 검색(RAG)을 결합</b></>],
            ["활용 예", <>과거 전략과 투자 의사결정 자료, 산업과 시장 정보를 묶어 <b>기획서 초안 작성, 경영진 알림</b></>],
            ["조율", <>다룰 정보, 쓸 사람, 운영 방식을 현업의 필요와 사내 도입 조건에 맞춰 정함</>],
          ],
        },
        {
          title: <>Excel,{NB}Word,{NB}Outlook에서 쓰도록 연결</>,
          nav: "Office 도구 연결",
          rows: [
            ["원칙", <><b>일하는 방식을 바꾸지 않도록</b> 매일 쓰는 도구 안에서 AI를 부름</>],
            ["한 일", <>VBA와 사내 API로 Excel, Word, Outlook의 반복 작업에서 AI 호출</>],
            ["도입", <>경영진에게 기능과 비용, 쓰는 방식을 설명하고 <b>사용자 교육과 피드백으로 실제 사용까지</b> 연결</>],
          ],
        },
        {
          title: "사내 교육 콘텐츠로 확산",
          nav: "확산과 결과",
          rows: [
            ["효과", <><b>기획서 작성 시간 평균 약 50% 단축</b></>],
            ["사용", <>전략기획본부 일상 사용자 약 30명, 등록자 600명 이상</>],
            ["확산", <>SK 그룹 mySUNI에 사례와 교육 콘텐츠로 소개되어 <b>1,000명 이상</b>이 봄</>],
          ],
          image: "/images/strix-video.jpeg",
          caption: "SK 그룹 mySUNI에 소개된 STRIX 교육 콘텐츠",
          metricsNote: "수치는 당시 기준입니다. 등록자와 학습 도달 인원을 활성 사용자로 합산하지 않았습니다.",
        },
      ],
      closingTitle: "개발부터 보안 협의와 교육까지",
      closingRows: [
        ["배운 것", <>제품을 만드는 일과 <b>조직 안에서 쓰이게 하는 일</b>은 따로 설계해야 함</>],
        ["그다음", <>이 경험을 바탕으로 기업 AX 프로젝트로 일을 넓힘</>],
      ],
    },
    en: {
      title: "STRIX",
      subtitle: "A team tool grown into an internal AI system",
      meta: "SK On / Corporate strategy / 2024",
      facts: [
        ["Where", <>SK On Strategy Division, internal project</>],
        ["My role", <>Design and build, security and adoption review, executive briefings, training and rollout</>],
        ["Stack", <>Lightweight local LLM with document search (LangChain RAG), Office integration (VBA)</>],
      ],
      highlights: [
        ["~50%", "Less time drafting planning documents"],
        ["600+", "System registrations"],
        ["~30", "Daily users in the Strategy Division"],
      ],
      sections: [
        {
          title: "Applying AI to research and synthesis",
          nav: "Research and synthesis",
          rows: [
            ["Context", <>The strategy team kept <b>finding and comparing documents to support decisions</b></>],
            ["What I did", <>Built a knowledge system that brings internal and external information together, <b>combining a lightweight local LLM with document search (RAG)</b></>],
            ["Use", <>Drafts planning documents from past strategy and investment decisions and market data; <b>sends executive alerts</b></>],
            ["Alignment", <>Set the information in scope, the users, and operations to fit users&apos; needs and internal adoption rules</>],
          ],
        },
        {
          title: "Connecting to Excel, Word, and Outlook",
          nav: "Office integration",
          rows: [
            ["Principle", <><b>Keep the way people work</b>; call AI from the tools they use every day</>],
            ["What I did", <>VBA and an internal API call AI from recurring tasks in Excel, Word, and Outlook</>],
            ["Adoption", <>Explained function, cost, and usage to executives; <b>training and feedback carried it into daily use</b></>],
          ],
        },
        {
          title: "Spreading through internal training",
          nav: "Rollout and results",
          rows: [
            ["Result", <><b>Planning documents drafted in about half the time</b></>],
            ["Use", <>About 30 daily users in the Strategy Division, 600+ registered</>],
            ["Reach", <>Featured on SK Group&apos;s mySUNI as a case and course, <b>seen by 1,000+</b></>],
          ],
          image: "/images/strix-video.jpeg",
          caption: "STRIX training featured on SK Group mySUNI",
          metricsNote: "Figures describe the period of the original rollout. Registrations and learning reach are not added together as active users.",
        },
      ],
      closingTitle: "From code to security review and training",
      closingRows: [
        ["Lesson", <>Building a product and <b>getting it used inside an organization</b> need separate design</>],
        ["Next", <>That experience led to enterprise AX engagements</>],
      ],
    },
  },
};
export default function CaseStudy({ id }) {
  const { lang } = useLang();
  const kr = lang === "kr";
  const c = content[id][lang === "kr" ? "kr" : "en"];
  useEffect(() => {
    // This route is lazy-loaded, so the browser's first hash lookup can precede its content.
    const target = window.location.hash.slice(1);
    if (target)
      document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
  }, [id, lang]);
  return (
    <article className="case shell">
      <header className="case-header">
        <a href="/#work" className="back-link">
          <Arrow />
          {kr ? "프로젝트로 돌아가기" : "Back to the work"}
        </a>
        <div className="case-title-row">
          <h1>{c.title}</h1>
          <p>{c.meta}</p>
        </div>
        <h2>{c.subtitle}</h2>
        <dl className="case-facts">
          {c.facts.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
        </dl>
        <dl className="case-metrics case-highlights">
          {c.highlights.map(([number, label]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{number}</dd>
            </div>
          ))}
        </dl>
      </header>
      <nav
        className="case-index"
        aria-label={kr ? "사례 목차" : "Case contents"}
      >
        {c.sections.map((s, i) => (
          <a href={`#${s.id || `chapter-${i}`}`} key={s.nav}>
            <span className="case-no">{String(i + 1).padStart(2, "0")}</span>
            {s.nav}
            <Arrow />
          </a>
        ))}
      </nav>
      {c.sections.map((s, i) => (
        <section
          className="case-section"
          id={s.id || `chapter-${i}`}
          key={s.nav}
        >
          <div className="case-section-copy">
            <h2><span className="case-no">{String(i + 1).padStart(2, "0")}</span>{s.title}</h2>
            <dl className="case-facts">
              {s.rows.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
            </dl>
          </div>
          {s.image && (
            <figure className="case-figure">
              <img
                src={s.image}
                loading="lazy"
                alt={s.caption}
                width={
                  s.image.includes("sailing")
                    ? 1306
                    : s.image.includes("control-tower")
                      ? 2336
                      : s.image.includes("document-review")
                        ? 2280
                        : 1348
                }
                height={
                  s.image.includes("sailing")
                    ? 616
                    : s.image.includes("control-tower")
                      ? 1000
                      : s.image.includes("document-review")
                        ? 1280
                        : 1172
                }
              />
              <figcaption>
                <span>{s.caption}</span>
                <Link href={s.image} target="_blank" rel="noopener noreferrer">
                  {kr ? "크게 보기" : "Full image"}
                  <Arrow external />
                </Link>
              </figcaption>
            </figure>
          )}
          {s.state && <p className="case-state">{s.state}</p>}
          {s.metrics && (
            <dl className="case-metrics">
              {s.metrics.map(([number, label]) => (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{number}</dd>
                </div>
              ))}
            </dl>
          )}
          {s.metricsNote && <p className="case-metrics-note">{s.metricsNote}</p>}
        </section>
      ))}
      <section className="case-closing">
        <h2>{c.closingTitle}</h2>
        <dl className="case-facts">
          {c.closingRows.map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
        </dl>

        <a
          className="text-link"
          href={id === "fsk" ? "/case-study/strix" : "/case-study/fsk"}
        >
          {kr
            ? id === "fsk"
              ? "STRIX의 사내 도입 경험도 보기"
              : "물류기업 FSK L&S의 AX 사례 보기"
            : id === "fsk"
              ? "Read about adoption at SK On"
              : "Explore logistics AX at FSK"}
          <Arrow />
        </a>
      </section>
    </article>
  );
}
