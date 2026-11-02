import { useLang } from "../LangContext";
import { Arrow, Link } from "./Site";

const content = {
  fsk: {
    kr: {
      title: "FSK",
      subtitle: "물류 현장의 업무를, 연결된 시스템으로.",
      meta: "고객 프로젝트 / Praxis / 2026",
      intro:
        "운송 현황을 파악하는 일, 문서를 읽고 입력하는 일, 청구와 입금을 맞추는 일. 물류 현장에서 반복되는 업무를 이해하고, 실제로 확인하고 처리할 수 있는 화면과 흐름으로 만들었습니다.",
      role: "도메인 리서치, 업무 분석, 제품 설계, 개발과 현업 피드백 반영",
      context:
        "Praxis를 통한 독립 AX 프로젝트. FSK 담당자들과 업무 맥락을 확인하며 진행했습니다.",
      sections: [
        {
          title: "운송 현황과 리스크를 함께 보기",
          text: [
            "운송 상황을 판단하려면 선박 위치만으로는 부족합니다. 경로와 기상 변화, 항만 상황을 함께 살펴볼 수 있어야 합니다.",
            "물류 컨트롤타워를 설계하고 구현해 배포했습니다. 지도에서 운송 경로와 기상 리스크를 함께 확인하도록 구성하고, 도착 시점 예측과 항만 혼잡 분석도 검토했습니다. 예측은 불확실성을 함께 다뤄야 하는 판단 보조 영역으로 접근했습니다.",
          ],
          image: "/images/fsk/control-tower.webp",
          caption: "운송 경로와 기상 리스크를 함께 보여주는 실제 프로젝트 화면",
          state: "컨트롤타워 구축·배포 / 예측 기능은 별도 검증 영역",
        },
        {
          title: "문서를 읽는 것에서, 검증하고 처리하는 것으로",
          text: [
            "이메일에 도착한 운송 문서에는 서로 다른 양식과 표현이 섞여 있습니다. 값을 추출한 다음에는 원문이 맞는지, 기존 코드와 연결되는지, 이미 만들어진 주문은 없는지 확인해야 합니다.",
            "첨부문서 판독 → 필드별 원문 대조 → 값과 코드 검증 → 기존 주문 확인 → 담당자 승인 → KEROL 주문 생성으로 이어지는 흐름을 구축·검증하고 있습니다. 화면에는 AI가 읽은 값과 원문 근거를 나란히 놓아 사람이 수정하고 판단할 수 있게 했습니다.",
          ],
          image: "/images/fsk/document-review.webp",
          caption: "원문과 추출값을 대조하고 불일치를 확인하는 검증 화면",
          state: "구축·검증 / 담당자 검토와 승인을 포함한 업무 흐름",
        },
        {
          title: "청구와 입금 사이의 확인할 일 구분하기",
          text: [
            "수금 대사는 청구 금액과 입금 금액을 나란히 놓는 것만으로 끝나지 않습니다. 집계 기준과 정산 상태를 먼저 맞추고, 확인이 끝난 항목과 후속 조치가 필요한 항목을 구분해야 합니다.",
            "청구·입금 대사 결과를 근거와 함께 살펴보고, 확인할 건과 담당자의 후속 업무를 정리하는 흐름을 설계·구현했습니다. 숫자의 변화가 실제 수금인지 분류 기준의 수정인지 구별할 수 있도록 하는 데 집중했습니다.",
          ],
          state: "대사·확인 업무 흐름 설계 및 구현",
        },
      ],
      closingTitle: "이 작업에서 중요했던 것",
      closing:
        "화면을 만드는 일과 업무를 이해하는 일은 계속 오갔습니다. 자동화할 부분, 사람이 확인할 부분, 기존 시스템과 연결할 부분을 나누고 실제 업무 흐름에서 검증하는 것이 제 역할이었습니다.",
      note: "표시된 상태는 각 작업의 구현 범위를 구분한 것입니다. 절감 시간, 비용 효과, 예측 정확도는 별도 검증 없이 성과 수치로 제시하지 않았습니다.",
    },
    en: {
      title: "FSK",
      subtitle: "Connecting the work behind logistics.",
      meta: "Client work / Praxis / 2026",
      intro:
        "Understanding a shipment, reading its documents, matching an invoice to a payment. I worked through recurring logistics tasks and turned them into interfaces and workflows people can review and act on.",
      role: "Domain research, workflow analysis, product design, engineering, and iteration with users",
      context:
        "An independent AX engagement through Praxis, developed in dialogue with FSK operators.",
      sections: [
        {
          title: "Seeing shipment status alongside risk",
          text: [
            "A vessel position alone does not explain a shipment. Operators need routes, changing weather, and port conditions in context.",
            "I designed, built, and deployed a logistics control tower that brings routes and weather risks onto one map. I also explored arrival-time prediction and port congestion analysis, treating prediction as decision support that must account for uncertainty.",
          ],
          image: "/images/fsk/control-tower.webp",
          caption:
            "Actual project interface showing shipment routes and weather risk",
          state:
            "Control tower built and deployed / Prediction requires separate validation",
        },
        {
          title: "From reading a document to reviewing an order",
          text: [
            "Shipping documents arrive by email in different formats. After extracting a value, someone still needs to check the source, match existing codes, and find any order that already exists.",
            "I am building and validating the path from attachment extraction to source comparison, field and code validation, existing-order checks, operator approval, and KEROL order creation. Extracted values sit next to source evidence so an operator can correct them and make a decision.",
          ],
          image: "/images/fsk/document-review.webp",
          caption:
            "Actual project interface for comparing extracted values with source documents",
          state:
            "Implementation and validation / Includes operator review and approval",
        },
        {
          title: "Separating reconciled items from follow-up work",
          text: [
            "Matching invoices to payments requires more than comparing two amounts. The accounting basis and settlement status need to be aligned before separating confirmed items from those needing attention.",
            "I designed and implemented a workflow for reviewing reconciliation evidence and organizing operator follow-up. A change caused by correcting a classification must remain distinguishable from money actually collected.",
          ],
          state: "Reconciliation and review workflow designed and implemented",
        },
      ],
      closingTitle: "What the work demanded",
      closing:
        "Understanding the workflow and building the interface were iterative activities. My role was to distinguish what to automate, what an operator should review, and where the existing system needed to connect, then validate those decisions against the work.",
      note: "Status labels distinguish the scope of each implementation. Time savings, financial impact, and prediction accuracy are not presented as measured results without separate validation.",
    },
  },
  strix: {
    kr: {
      title: "STRIX",
      subtitle: "회사 안에서 만든 AI가, 일상 업무에 쓰이기까지.",
      meta: "SK On / 전략기획 / 2024",
      intro:
        "전략기획 업무를 하며 문서 탐색과 정보 정리에 AI를 적용하기 시작했습니다. 직접 만든 지식 시스템 STRIX를 실제 업무 도구에 연결하고, 사내에서 소개하고 확산하는 과정까지 맡았습니다.",
      role: "AI 지식 시스템 설계·구현, 보안 및 도입 협의, 경영진 설명, 교육과 확산",
      context: "SK On 전략기획본부 재직 중 수행한 사내 프로젝트입니다.",
      sections: [
        {
          title: "문서를 찾고, 근거를 정리하는 일에서 시작",
          text: [
            "전략기획에서는 여러 문서에서 정보를 찾고 비교해 의사결정에 필요한 근거로 정리하는 일이 반복됩니다. 이 업무에 문서 검색과 LLM을 결합한 지식 시스템을 적용했습니다.",
            "기능을 만드는 것과 함께, 어떤 정보를 다룰지와 누가 사용할지, 운영을 어떻게 이어갈지에 관한 논의가 필요했습니다. 현업의 필요와 사내 도입 조건을 함께 다루는 역할을 맡았습니다.",
          ],
        },
        {
          title: "사용자가 이미 일하는 도구에 연결",
          text: [
            "AI를 쓰기 위해 기존 업무 흐름을 크게 바꾸지 않아도 되도록 Excel, Word, Outlook과 연결하는 방식을 택했습니다. VBA와 사내 API를 활용해 반복 작업에서 AI를 호출할 수 있게 했습니다.",
            "경영진에게는 기능뿐 아니라 도입 비용과 업무에서의 활용 방식도 설명했습니다. 사용자 교육과 피드백을 통해 실제 사용으로 이어지는 과정에 참여했습니다.",
          ],
        },
        {
          title: "소개, 등록, 일상 사용을 구분해서 보기",
          text: [
            "SK 그룹의 학습 플랫폼 mySUNI에 사례와 교육 콘텐츠가 소개됐습니다. 학습 콘텐츠를 접한 인원, 시스템에 등록한 인원, 일상적으로 사용한 팀은 서로 다른 범위입니다.",
          ],
          image: "/images/strix-video.jpeg",
          caption: "SK 그룹 mySUNI에 소개된 STRIX 교육 콘텐츠",
          metrics: [
            ["1,000명+", "mySUNI 학습 콘텐츠 도달"],
            ["600명+", "시스템 등록"],
            ["약 30명", "전략기획본부 일상 사용자"],
          ],
        },
      ],
      closingTitle: "다음 현장으로 가져온 경험",
      closing:
        "AI 도입에는 현업의 문제를 이해하는 일, 직접 만드는 일, 조직 안에서 함께 사용할 조건을 만드는 일이 모두 필요했습니다. STRIX에서의 경험은 이후 독립 AX 프로젝트를 수행하는 출발점이 되었습니다.",
      note: "사용 수치는 기존 공개 사례에 기록된 당시 기준입니다. 등록자와 학습 도달 인원을 활성 사용자로 합산하지 않았으며, 시간 절감이나 유지율을 별도 계측 결과로 제시하지 않았습니다.",
    },
    en: {
      title: "STRIX",
      subtitle: "From an internal AI build to everyday work.",
      meta: "SK On / Corporate strategy / 2024",
      intro:
        "While working in corporate strategy, I began applying AI to document research and information synthesis. I built STRIX, connected it to familiar work tools, and helped introduce and spread it within the organization.",
      role: "System design and implementation, security and adoption discussions, executive communication, training, and rollout",
      context:
        "An internal project built during my time in SK On’s Strategy Division.",
      sections: [
        {
          title: "Starting with research and supporting evidence",
          text: [
            "Strategy work repeatedly involves finding information across documents and turning it into evidence for a decision. I applied a knowledge system combining document retrieval with an LLM to that work.",
            "Implementation came with discussions about the information in scope, who would use it, and how operations would continue. I worked across the needs of users and the conditions for adoption inside the company.",
          ],
        },
        {
          title: "Connecting to tools people already used",
          text: [
            "I connected AI capabilities to Excel, Word, and Outlook so that users could apply them within established workflows. VBA and an internal API enabled AI calls from recurring tasks.",
            "Executive communication covered cost and practical usage as well as functionality. Training and user feedback helped connect the implementation to daily work.",
          ],
        },
        {
          title: "Distinguishing reach, registration, and daily use",
          text: [
            "The project and its training content were featured on SK Group’s mySUNI learning platform. Training reach, system registrations, and daily use describe different groups.",
          ],
          image: "/images/strix-video.jpeg",
          caption: "STRIX training content featured on SK Group mySUNI",
          metrics: [
            ["1,000+", "mySUNI learning-content reach"],
            ["600+", "System registrations"],
            ["~30", "Daily users in Strategy Division"],
          ],
        },
      ],
      closingTitle: "What I carried into the next engagement",
      closing:
        "AI adoption required understanding the work, building the system, and establishing the conditions for people to use it together. STRIX became a starting point for my subsequent independent AX engagements.",
      note: "These figures describe the period documented in the original public case. Registrations and learning reach are not added together as active users. Time savings and retention are not presented as separately measured outcomes.",
    },
  },
};
export default function CaseStudy({ id }) {
  const { lang } = useLang();
  const kr = lang === "kr";
  const c = content[id][lang === "kr" ? "kr" : "en"];
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
        <p className="case-intro">{c.intro}</p>
        <dl className="case-role">
          <div>
            <dt>{kr ? "맡은 일" : "My role"}</dt>
            <dd>{c.role}</dd>
          </div>
          <div>
            <dt>{kr ? "프로젝트 맥락" : "Context"}</dt>
            <dd>{c.context}</dd>
          </div>
        </dl>
      </header>
      <nav
        className="case-index"
        aria-label={kr ? "사례 목차" : "Case contents"}
      >
        {c.sections.map((s, i) => (
          <a href={`#chapter-${i}`} key={s.title}>
            {s.title}
            <Arrow />
          </a>
        ))}
      </nav>
      {c.sections.map((s, i) => (
        <section className="case-section" id={`chapter-${i}`} key={s.title}>
          <div className="case-section-copy">
            <h2>{s.title}</h2>
            <div>
              {s.text.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          {s.image && (
            <figure className="case-figure">
              <img src={s.image} loading="lazy" alt={s.caption} />
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
        </section>
      ))}
      <section className="case-closing">
        <h2>{c.closingTitle}</h2>
        <p>{c.closing}</p>
        <p className="case-note">{c.note}</p>
        <a
          className="text-link"
          href={id === "fsk" ? "/case-study/strix" : "/case-study/fsk"}
        >
          {kr
            ? id === "fsk"
              ? "STRIX의 사내 도입 경험도 보기"
              : "FSK의 물류 AX 작업도 보기"
            : id === "fsk"
              ? "Read about adoption at SK On"
              : "Explore logistics AX at FSK"}
          <Arrow />
        </a>
      </section>
    </article>
  );
}
