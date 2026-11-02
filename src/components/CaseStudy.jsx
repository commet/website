import { useEffect } from "react";
import { useLang } from "../LangContext";
import { Arrow, Link } from "./Site";

const content = {
  fsk: {
    kr: {
      title: "FSK L&S",
      subtitle: "물류기업의 운송 관제와 문서 자동화.",
      meta: "고객 프로젝트 / Praxis / 2026",
      intro:
        "물류기업 FSK L&S의 업무를 분석하며 운송 관제, 문서 처리, 수금 대사를 설계하고 개발했습니다. 관제는 구축해 배포했고, 문서에서 읽은 값을 주문 시스템에 연결하는 흐름은 구축·검증을 진행하고 있습니다.",
      role: "도메인 리서치, 업무 분석, 제품 설계, 개발과 현업 피드백 반영",
      context:
        "Praxis를 통한 독립 AX 프로젝트. FSK L&S 담당자들과 업무 맥락을 확인하며 진행했습니다.",
      sections: [
        {
          title: "출고 3일 지연이 도착 7일 지연으로 바뀌는 이유",
          text: [
            "설비가 늦게 출고되면 배도 같은 일수만큼 늦게 탈 수 있을까요? 주 단위로 출항하는 노선에서는 그렇지 않습니다. 선적 가능한 날짜를 하루만 넘겨도 다음 주 배를 기다려야 합니다. 그래서 출고일과 도착일 사이의 관계를 단순한 날짜 덧셈으로 표현할 수 없었습니다.",
            "출고일을 바꾸면 이용 가능한 항차를 다시 찾고, 도착일 범위가 함께 바뀌는 시뮬레이션을 구현했습니다. 아래는 제품에 예시 항차를 넣은 화면입니다. 출고일을 3일 옮기면 다음 항차로 배정되면서 도착이 7일 늦어집니다. 해상 운송과 항만 대기, 내륙 운송을 나누어 어느 구간에서 일정이 달라지는지도 확인할 수 있습니다.",
          ],
          id: "planning",
          image: "/images/work/sailing-delay.png",
          caption:
            "실제 제품에 예시 항차를 넣은 시뮬레이션. 출고 3일 지연 시 다음 항차로 재배정됩니다.",
          state: "일정 시뮬레이션 구현 / 예시 데이터로 동작 설명",
        },
        {
          id: "monitoring",
          title: "도착 예정일에 근거와 범위를 붙이다",
          text: [
            "선박의 위치는 운송 상황의 일부입니다. 지도에서 항로와 기상 위험을 함께 보고, 도착 일정에 영향을 주는 항만 대기와 내륙 운송도 나누어 살펴보도록 했습니다.",
            "계획된 날짜와 보정한 예측값은 구분했습니다. 관측 근거가 부족한 구간은 그 상태를 드러내고, 도착일을 하나의 숫자로 단정하는 대신 범위로 표시했습니다. 담당자가 예측을 어디까지 믿고 판단할 수 있는지가 화면에서 보여야 했습니다.",
          ],
          image: "/images/fsk/control-tower.webp",
          caption: "항로와 기상 위험을 함께 확인하는 운송 관제 화면",
          state: "관제 구축·배포 / 예측 기능은 별도 검증",
        },
        {
          id: "documents",
          title: "문서 판독에서 주문 승인까지",
          text: [
            "이메일에 도착한 운송 문서에는 서로 다른 양식과 표현이 섞여 있습니다. 값을 추출한 다음에는 원문이 맞는지, 기존 코드와 연결되는지, 이미 만들어진 주문은 없는지 확인해야 합니다.",
            "첨부문서 판독 → 필드별 원문 대조 → 값과 코드 검증 → 기존 주문 확인 → 담당자 승인 → KEROL 주문 생성으로 이어지는 흐름을 구축·검증하고 있습니다. 화면에는 AI가 읽은 값과 원문 근거를 나란히 놓아 사람이 수정하고 판단할 수 있게 했습니다.",
          ],
          image: "/images/fsk/document-review.webp",
          caption: "원문과 추출값을 대조하고 불일치를 확인하는 검증 화면",
          state: "구축·검증 / 담당자 검토와 승인을 포함한 업무 흐름",
        },
        {
          id: "reconciliation",
          title: "청구와 입금을 맞추고, 차이의 원인을 찾다",
          text: [
            "수금 대사는 청구 금액과 입금 금액을 나란히 놓는 것만으로 끝나지 않습니다. 집계 기준과 정산 상태를 먼저 맞추고, 확인이 끝난 항목과 후속 조치가 필요한 항목을 구분해야 합니다.",
            "청구·입금 대사 결과를 근거와 함께 살펴보고, 확인할 건과 담당자의 후속 업무를 정리하는 흐름을 설계·구현했습니다. 숫자의 변화가 실제 수금인지 분류 기준의 수정인지 구별할 수 있도록 하는 데 집중했습니다.",
          ],
          state: "대사·확인 업무 흐름 설계 및 구현",
        },
      ],
      closingTitle: "어디까지 자동화할 것인가",
      closing:
        "문서에서 값을 읽는 일은 자동화하되, 원문이 모호하거나 기존 코드와 맞지 않을 때는 담당자에게 돌려줍니다. 일정은 계산하되, 확정된 계획과 예측값은 구분합니다. 이 경계를 정하고 화면과 기존 시스템에 반영하는 일까지 맡았습니다.",
    },
    en: {
      title: "FSK L&S",
      subtitle: "Shipment planning, document review, and reconciliation.",
      meta: "Client work / Praxis / 2026",
      intro:
        "My work for logistics company FSK L&S spans shipment monitoring, document processing, and invoice–payment reconciliation. The control tower is built and deployed; the workflow connecting extracted document fields to order creation is under implementation and validation.",
      role: "Domain research, workflow analysis, product design, engineering, and iteration with users",
      context:
        "An independent AX engagement through Praxis, developed in dialogue with FSK L&S operators.",
      sections: [
        {
          title: "Why a three-day release delay can cost a week",
          text: [
            "On a weekly service, a shipment that misses the cutoff cannot simply board three days later. It has to wait for another sailing. A release delay and an arrival delay are therefore different quantities.",
            "I built a simulator that finds the available sailing again when the release date changes, then updates the arrival range. The actual interface below uses example sailings: moving the release by three days moves the arrival by seven. Ocean transit, port dwell, and inland delivery are shown separately so the source of a delay remains visible.",
          ],
          id: "planning",
          image: "/images/work/sailing-delay.png",
          caption:
            "Actual product with example sailings. A three-day release delay triggers reassignment to the next sailing.",
          state:
            "Schedule simulation implemented / Demonstrated with example data",
        },
        {
          id: "monitoring",
          title: "An estimate needs evidence and a range.",
          text: [
            "A vessel position is only part of the picture. The control tower brings routes and weather risks onto one map, with port dwell and inland delivery considered separately.",
            "Planned dates remain distinct from adjusted estimates. Where observations are missing, that gap stays visible. Arrival is shown as a range, so operators can see how much confidence to place in it before acting.",
          ],
          image: "/images/fsk/control-tower.webp",
          caption: "The control tower showing shipment routes and weather risk",
          state:
            "Control tower built and deployed / Prediction evaluated separately",
        },
        {
          id: "documents",
          title: "Extraction is the start of the review.",
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
          id: "reconciliation",
          title: "Matching invoices, payments, and the reasons for discrepancies",
          text: [
            "Matching invoices to payments requires more than comparing two amounts. The accounting basis and settlement status need to be aligned before separating confirmed items from those needing attention.",
            "I designed and implemented a workflow for reviewing reconciliation evidence and organizing operator follow-up. A change caused by correcting a classification must remain distinguishable from money actually collected.",
          ],
          state: "Reconciliation and review workflow designed and implemented",
        },
      ],
      closingTitle: "Deciding what to automate",
      closing:
        "Extract the fields, but return ambiguous source material or conflicting codes to an operator. Calculate dates, but distinguish a committed plan from an estimate. My role included defining these boundaries and implementing them in the interface and existing systems.",
    },
  },
  strix: {
    kr: {
      title: "STRIX",
      subtitle: "전략기획팀의 도구에서 사내 AI 시스템으로.",
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
          title: "팀의 도구에서 사내 교육 콘텐츠로",
          text: [
            "전략기획본부 약 30명이 일상적으로 사용하는 도구로 시작해, 시스템 등록자는 600명 이상으로 늘었습니다. 이후 SK 그룹의 학습 플랫폼 mySUNI에 사례와 교육 콘텐츠가 소개되어 1,000명 이상이 콘텐츠를 접했습니다.",
          ],
          image: "/images/strix-video.jpeg",
          caption:
            "SK 그룹 mySUNI에 소개된 STRIX 교육 콘텐츠. 수치는 당시 도달·등록·일상 사용 기준입니다.",
          metrics: [
            ["1,000명+", "mySUNI 학습 콘텐츠 도달"],
            ["600명+", "시스템 등록"],
            ["약 30명", "전략기획본부 일상 사용자"],
          ],
        },
      ],
      closingTitle: "개발, 보안 협의, 교육을 하나의 프로젝트로",
      closing:
        "STRIX에서는 코드 작성과 함께 보안 협의, 경영진 설명, 사용자 교육을 진행했습니다. 제품을 만들고 조직 안에서 쓰이게 하는 과정 전체를 경험했고, 이후 기업 AX 프로젝트로 일을 넓혔습니다.",
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
          title: "From a team tool to internal training",
          text: [
            "The system served around 30 daily users in the Strategy Division and reached over 600 registrations. The project and its training content were later featured on SK Group’s mySUNI learning platform, reaching over 1,000 learners.",
          ],
          image: "/images/strix-video.jpeg",
          caption:
            "STRIX training on SK Group mySUNI. Figures describe reach, registration, and daily use during the original rollout.",
          metrics: [
            ["1,000+", "mySUNI learning-content reach"],
            ["600+", "System registrations"],
            ["~30", "Daily users in Strategy Division"],
          ],
        },
      ],
      closingTitle: "Implementation, security, and training in one project",
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
          <a href={`#${s.id || `chapter-${i}`}`} key={s.title}>
            {s.title}
            <Arrow />
          </a>
        ))}
      </nav>
      {c.sections.map((s, i) => (
        <section
          className="case-section"
          id={s.id || `chapter-${i}`}
          key={s.title}
        >
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
        </section>
      ))}
      <section className="case-closing">
        <h2>{c.closingTitle}</h2>
        <p>{c.closing}</p>

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
