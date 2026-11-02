import { useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { useLang } from "../LangContext";
import { eventState } from "../event";

export function Arrow({ external = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
    >
      <path d={external ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}
export function Link({ children, href, className = "", ...props }) {
  const external = href.startsWith("https:");
  return (
    <a
      href={href}
      className={className}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  );
}
export function SectionHeading({ children, aside }) {
  return (
    <div className="section-heading">
      <h2>{children}</h2>
      {aside && <span>{aside}</span>}
    </div>
  );
}
export function Nav() {
  const { lang, setLang } = useLang();
  const kr = lang === "kr";
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <a
          href="/"
          className="identity"
          aria-label={kr ? "이예찬 홈" : "Yaechan Lee home"}
        >
          <span className="identity-mark" aria-hidden="true">
            y.
          </span>
          <span>
            <strong>{kr ? "이예찬" : "Yaechan Lee"}</strong>
            <span>{kr ? "Yaechan Lee" : "이예찬"}</span>
          </span>
        </a>
        <nav aria-label={kr ? "주 메뉴" : "Main navigation"}>
          <a href="/#work">{kr ? "프로젝트" : "Work"}</a>
          <a href="/#about">{kr ? "소개" : "About"}</a>
          <a href="/#contact">{kr ? "연락하기" : "Contact"}</a>
          <button
            className="language"
            onClick={() => setLang(kr ? "en" : "kr")}
            aria-label={kr ? "Switch to English" : "한국어로 전환"}
          >
            {kr ? "EN" : "KO"}
          </button>
        </nav>
      </div>
    </header>
  );
}
export function Hero() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="hero shell" aria-labelledby="intro-title">
      <div className="hero-main">
        <h1 id="intro-title">
          {kr ? (
            <>
              AI 사업을 이끌고,
              <br />
              <span>제품을 직접 만듭니다.</span>
            </>
          ) : (
            <>
              I lead AI ventures.
              <br />
              <span>I build the products.</span>
            </>
          )}
        </h1>
      </div>
      <div className="hero-context">
        <p>
          {kr
            ? "물류 관제, 문서 자동화, 사내 지식 시스템. 기업의 복잡한 업무를 분석하고, 제품을 설계하고 개발합니다. Arkpoint의 파트너로 Enterprise AX 사업을 이끌고 있습니다."
            : "Logistics monitoring, document automation, and internal knowledge systems. I work through complex operations, then design and build the software. I lead Enterprise AX as a partner at Arkpoint."}
        </p>
        <div className="role-line">
          <span>Arkpoint</span>
          <span>Partner / Enterprise AX</span>
        </div>
        <div className="hero-actions">
          <a href="#project-contact">
            {kr ? "프로젝트 상담" : "Discuss a project"}
            <Arrow />
          </a>
          <a href="#collaborate-contact">
            {kr ? "협업 제안" : "Collaborate"}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
const scenarios = [
  {
    image: "/images/work/sailing-plan.png",
    label: ["기준 계획", "Baseline plan"],
    sailing: "NAVIOS UNISON 641E",
    arrival: ["11월 16–20일", "Nov 16–20"],
    value: ["도착 일정 유지", "Arrival unchanged"],
    detail: [
      "출고 여유가 남아 있어 예정된 항차를 이용합니다.",
      "The shipment stays on its planned sailing while release slack remains.",
    ],
  },
  {
    image: "/images/work/sailing-delay.png",
    label: ["출고 3일 지연", "Release delayed 3 days"],
    sailing: "COYHAIQUE 642E",
    arrival: ["11월 23–27일", "Nov 23–27"],
    value: [
      "다음 항차 배정 / 도착 7일 지연",
      "Next sailing / Arrival 7 days later",
    ],
    detail: [
      "선적 가능한 날짜가 넘어가면 다음 주 항차로 바뀝니다.",
      "Missing the sailing cutoff moves the shipment to the following week.",
    ],
  },
];
function EvidenceImage({ src, width, height, title, caption, alt, note, priority = false }) {
  const { lang } = useLang();
  const kr = lang === "kr";
  const dialog = useRef(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [zoom, setZoom] = useState(false);
  useEffect(() => {
    if (!open) return;
    const node = dialog.current;
    node.showModal();
    const before = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      if (node.open) node.close();
      document.body.style.overflow = before;
    };
  }, [open]);
  const show = () => {
    setZoom(false);
    setOpen(true);
  };
  return (
    <figure className="map-exhibit">
      <button
        type="button"
        className="map-open"
        onClick={show}
        aria-label={`${title} ${kr ? "확대하기" : "expand"}`}
      >
        <img
          src={src}
          width={width}
          height={height}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
          alt={alt}
        />
      </button>
      <figcaption>
        <span>{caption}</span>
        <button type="button" onClick={show}>
          {kr ? "전체 화면 확대" : "Expand full interface"}
          <Arrow external />
        </button>
      </figcaption>
      <dialog
        ref={dialog}
        className="image-viewer"
        aria-labelledby={titleId}
        onClose={() => setOpen(false)}
        onCancel={() => setOpen(false)}
      >
        <div className="viewer-toolbar">
          <h2 id={titleId}>{title}</h2>
          <div>
            <button onClick={() => setZoom(!zoom)} aria-pressed={zoom}>
              {zoom
                ? kr
                  ? "화면에 맞추기"
                  : "Fit to screen"
                : kr
                  ? "원본 크기"
                  : "Original size"}
            </button>
            <button onClick={() => setOpen(false)}>
              {kr ? "닫기" : "Close"}
            </button>
          </div>
        </div>
        <div
          className={`viewer-body${zoom ? " is-zoomed" : ""}`}
          tabIndex="0"
          aria-label={
            kr
              ? "원본 크기에서는 스크롤로 이미지를 이동할 수 있습니다."
              : "Scroll to pan the image at original size."
          }
        >
          <img src={src} width={width} height={height} style={zoom ? { width, height } : undefined} alt={alt} />
        </div>
        <p className="viewer-note">{note}</p>
      </dialog>
    </figure>
  );
}
export function Evidence() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const l = kr ? 0 : 1;
  const [active, setActive] = useState(0);
  function onKey(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - active;
    setActive(next);
    document.getElementById(`scenario-tab-${next}`)?.focus();
  }
  return (
    <section
      id="work"
      className="work-section shell"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <h2 id="work-title">{kr ? "주요 프로젝트" : "Selected work"}</h2>
        <span>
          {kr
            ? "기업 AX와 독립 제품"
            : "Client engagements & independent products"}
        </span>
      </div>
      <article className="featured-work">
        <div className="project-head">
          <div className="project-name">
            <span className="client-symbol" aria-hidden="true">
              F
            </span>
            <div>
              <h3>{kr ? "물류기업 FSK L&S" : "FSK L&S / Logistics"}</h3>
              <p>
                {kr
                  ? "설비 운송 관제 / 출고 계획부터 항로 감시까지"
                  : "Equipment shipment control / Planning and route monitoring"}
              </p>
            </div>
          </div>
          <div className="project-meta">
            <span>2026</span>
            <span>
              {kr ? "고객 프로젝트 / Praxis" : "Client work / Praxis"}
            </span>
          </div>
        </div>
        <EvidenceImage
          src="/images/work/electrovaya-full.png" width={1920} height={1080} priority
          title={kr ? "Electrovaya 운송 관제" : "Electrovaya shipment control"}
          caption={kr ? "Electrovaya v1.2.0 / 예시 데이터로 재현한 전체 화면" : "Electrovaya v1.2.0 / Full interface with example data"}
          alt={kr ? "왼쪽 운송 현황, 중앙 부산에서 파나마와 Newark를 잇는 지도, 오른쪽 구간 감시, 하단 항차 일정이 모두 보이는 Electrovaya 전체 화면" : "Full Electrovaya interface: shipment status on the left, route map in the center, risk monitoring on the right, and voyage schedule below"}
          note={kr ? "2026년 12월 24일 상황을 가정한 시연입니다. 화면의 일정과 물량은 예시이며 실제 운송 현황이 아닙니다." : "Demonstration as of December 24, 2026. Dates and quantities are examples, not live shipment data."}
        />
        <div className="map-description">
          <h4>
            {kr
              ? "부산에서 미국 현장까지, 하나의 관제 화면으로."
              : "One view from Busan to the delivery site."}
          </h4>
          <div>
            <p>
              {kr
                ? "부산에서 파나마 운하와 Newark를 거쳐 Jamestown까지. 해상·내륙 운송 경로에 기상과 항만 정보를 연결했습니다. 담당자가 구간별 위험과 일정에 미치는 영향을 함께 살펴볼 수 있도록 설계했습니다."
                : "The equipment travels from Busan through the Panama Canal to Newark, then inland to Jamestown. I brought the ocean and inland legs onto one map, with weather and port conditions reviewed by segment."}
            </p>
            <dl className="map-capabilities">
              <div>
                <dt>{kr ? "해상 구간" : "Ocean leg"}</dt>
                <dd>
                  {kr
                    ? "부산 → 파나마 운하 → Newark"
                    : "Busan → Panama Canal → Newark"}
                </dd>
              </div>
              <div>
                <dt>{kr ? "내륙 구간" : "Inland leg"}</dt>
                <dd>{kr ? "Newark → Jamestown" : "Newark → Jamestown"}</dd>
              </div>
              <div>
                <dt>{kr ? "확인할 위험" : "Risk review"}</dt>
                <dd>
                  {kr
                    ? "기상, 운하 통항, 기항 항만 부하"
                    : "Weather, canal transit, and port load"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <div className="schedule-heading">
          <h4>
            {kr
              ? "출고 일정이 바뀌면, 도착일도 다시 계산합니다."
              : "Change the release date. Recalculate the arrival."}
          </h4>
          <p>
            {kr
              ? "Electrovaya 초기 출고 시뮬레이터 / 예시 시나리오"
              : "Electrovaya release simulator, earlier version / Example scenario"}
          </p>
        </div>
        <div className="product-stage">
          <div className="stage-toolbar">
            <div
              className="scenario-tabs"
              role="tablist"
              aria-label={kr ? "출고 지연 시나리오" : "Release-delay scenarios"}
            >
              {scenarios.map((s, i) => (
                <button
                  key={s.image}
                  role="tab"
                  id={`scenario-tab-${i}`}
                  aria-controls={`scenario-panel-${i}`}
                  aria-selected={active === i}
                  tabIndex={active === i ? 0 : -1}
                  onKeyDown={onKey}
                  onClick={() => setActive(i)}
                >
                  {s.label[l]}
                </button>
              ))}
            </div>
            <span className="stage-note">
              {kr
                ? "실제 제품 / 예시 항차 데이터"
                : "Actual interface / Example sailing data"}
            </span>
          </div>
          {scenarios.map((s, i) => (
            <div
              role="tabpanel"
              id={`scenario-panel-${i}`}
              aria-labelledby={`scenario-tab-${i}`}
              hidden={active !== i}
              tabIndex="0"
              key={s.image}
            >
              <img
                className="schedule-image"
                src={s.image}
                width="1306"
                height={i === 0 ? 564 : 616}
                alt={
                  kr
                    ? `운항계획과 출고 지연 분석: ${s.label[0]}`
                    : `Sailing plan and release-delay analysis: ${s.label[1]}`
                }
                loading="lazy"
              />
              <div className="scenario-result">
                <span className="scenario-indicator" aria-hidden="true" />
                <strong>{s.value[l]}</strong>

                <a
                  href={s.image}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={
                    kr ? "시나리오 화면 크게 보기" : "Open full scenario image"
                  }
                >
                  {kr ? "화면 크게 보기" : "View full image"}
                  <Arrow external />
                </a>
              </div>
              <dl className="scenario-facts">
                <div>
                  <dt>{kr ? "배정 항차" : "Assigned sailing"}</dt>
                  <dd>{s.sailing}</dd>
                </div>
                <div>
                  <dt>{kr ? "도착 일정" : "Arrival window"}</dt>
                  <dd>{s.arrival[l]}</dd>
                </div>
                <div>
                  <dt>{kr ? "변경 이유" : "Why it changes"}</dt>
                  <dd>{s.detail[l]}</dd>
                </div>
              </dl>
            </div>
          ))}
        </div>
        <div className="feature-description">
          <h4>
            {kr
              ? "출고 3일 지연이 도착 7일 지연이 되는 순간."
              : "Three days late at departure. Seven at arrival."}
          </h4>
          <div>
            <p>
              {kr
                ? "주 1회 출항하는 배를 놓치면, 하루의 차이가 일주일이 됩니다. 출고일을 바꿀 때 이용 가능한 항차와 도착일을 다시 계산하도록 만들었습니다. 위 예시는 출고 3일 지연이 다음 주 항차 배정으로 이어지는 경우입니다."
                : "A small release delay can mean missing a weekly sailing. I built a tool that recalculates the sailing and arrival as the release date changes, and separates ocean, port, and inland delays."}
            </p>
            <a className="text-link" href="/case-study/fsk">
              {kr ? "설계 과정 자세히 보기" : "The project and design decisions"}
              <Arrow />
            </a>
          </div>
        </div>
      </article>
    </section>
  );
}
function WorkHeading({ title, subtitle, year, context }) {
  return (
    <div className="project-head">
      <div className="project-name">
        <div>
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
      <div className="project-meta">
        <span>{year}</span>
        <span>{context}</span>
      </div>
    </div>
  );
}
export function SelectedWork() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const argusUrl = kr ? "https://argus.voyage/ko" : "https://argus.voyage/en";
  return (
    <section
      id="more-work"
      className="selected shell"
      aria-label={kr ? "추가 프로젝트" : "More work"}
    >
      <div className="project-grid">
        <article id="doc-agent" className="project doc-project">
          <WorkHeading title={kr ? "물류 문서 자동화" : "Logistics document automation"}
            subtitle={kr ? "FSK L&S DocAgent / 메일 접수부터 주문 연동까지" : "FSK L&S DocAgent / From inbox to order integration"}
            year="2026" context="Praxis" />
          <EvidenceImage src="/images/fsk/document-review.webp" width={2280} height={1280}
            title={kr ? "DocAgent 원문 대조와 검증" : "DocAgent source review"}
            caption={kr ? "검증 화면 구현 예시 / 고객 식별정보 가림" : "Review interface example / Client identifiers redacted"}
            alt={kr ? "왼쪽 검증 항목의 중량 불일치 경고와 오른쪽 원문 하이라이트를 나란히 확인하는 화면" : "A weight discrepancy on the left, with highlighted source evidence on the right"}
            note={kr ? "원문 대조 기능의 구현 예시입니다. 전체 주문 연동 흐름은 구축과 검증을 진행하고 있습니다." : "Implementation example of source comparison. The complete order integration is under development and validation."} />
          <div id="doc-workflow" className="doc-explanation">
            <h4>{kr ? "값 하나에도, 확인할 근거가 있습니다." : "Every field has evidence to check."}</h4>
            <p>{kr ? "서류마다 다른 중량, 제각각인 거래처 이름, 빠진 필수값. 추출한 값 옆에 원문과 불일치 이유를 붙였습니다. 담당자는 확인이 필요한 항목을 찾아 수정하고, 승인한 결과를 주문으로 넘깁니다." : "Conflicting weights, inconsistent company names, and missing required fields. Extracted values sit beside their source and the reason for a flag, so operators can review, correct, and approve them for order creation."}</p>
          </div>
          <div className="doc-workflow">
            <div className="doc-workflow-heading">
              <h4>{kr ? "메일 한 통이 주문이 되기까지" : "From one email to an order"}</h4>
              <span>{kr ? "업무 흐름 / 구축·검증 중" : "Workflow / Implementation and validation"}</span>
            </div>
            <ol>
              {(kr ? [
                ["메일과 첨부 접수", "본문과 첨부서류를 묶고 고객과 운송 유형을 구분합니다."],
                ["판독과 코드 매칭", "서류에서 값을 읽고 거래처, 공항, 항만 코드를 맞춥니다."],
                ["원문 대조와 검토", "서류 간 불일치와 누락을 표시하고 담당자가 수정·승인합니다."],
                ["기존 주문 확인과 연동", "중복 여부를 확인한 뒤 승인된 값을 KEROL 주문으로 연결합니다."],
              ] : [
                ["Receive", "Group the email and attachments by customer and shipment type."],
                ["Extract and match", "Read the documents and match company, airport, and port codes."],
                ["Review and approve", "Flag discrepancies and missing values for operator correction and approval."],
                ["Check and integrate", "Check existing orders, then connect approved values to KEROL."],
              ]).map(([title, body], i) => <li key={title} className={i === 2 ? "human-review" : undefined}>
                <div><strong>{title}</strong>{i < 3 && <Arrow />}</div><p>{body}</p>
                {i === 2 && <span>{kr ? "담당자의 판단" : "Operator judgment"}</span>}
              </li>)}
            </ol>
          </div>
          <a className="text-link" href="/case-study/fsk#documents">{kr ? "문서 자동화 설계 자세히 보기" : "Explore the document workflow"}<Arrow /></a>
        </article>
        <article className="project strix-project">
          <WorkHeading
            title="STRIX"
            subtitle={
              kr
                ? "전략기획팀의 AI 지식 시스템"
                : "An AI knowledge system for corporate strategy"
            }
            year="2024"
            context="SK On"
          />
          <a className="media-frame strix-frame" href="/case-study/strix">
            <img
              src="/images/strix-video.jpeg"
              width="1348"
              height="1172"
              loading="lazy"
              alt={
                kr
                  ? "SK 그룹 mySUNI에 소개된 STRIX 교육 콘텐츠"
                  : "STRIX training featured on SK Group mySUNI"
              }
            />
          </a>
          <h4>
            {kr
              ? "팀에서 시작해, 조직이 쓰는 도구로."
              : "Built in one team. Adopted across the company."}
          </h4>
          <p>
            {kr
              ? "SK On 전략기획 업무에서 출발한 AI 지식 시스템입니다. 직접 개발하고 보안 협의, 경영진 설명, 사용자 교육을 거쳐 사내로 확산했습니다. 당시 시스템 등록자는 600명 이상, 전략기획본부 일상 사용자는 약 30명이었습니다."
              : "I built STRIX for strategy work at SK On and led security discussions, executive communication, training, and rollout. It reached over 600 registrations, with around 30 daily users in the Strategy Division at the time."}
          </p>
          <a className="text-link" href="/case-study/strix">
            {kr ? "STRIX 도입 과정" : "How STRIX was adopted"}
            <Arrow />
          </a>
        </article>
      </div>
      <article id="argus" className="argus-project">
        <WorkHeading
          title="Argus"
          subtitle={
            kr
              ? "의사결정의 근거와 후속 검토를 기록하는 제품"
              : "A record of decisions, assumptions, and follow-up"
          }
          context={kr ? "독립 제품" : "Independent product"}
        />
        <div className="argus-layout">
          <Link
            href={argusUrl}
            className="media-frame argus-frame"
            aria-label={kr ? "Argus 제품 열기" : "Open Argus product"}
          >
            <img
              src="/images/work/argus.png"
              width="1440"
              height="1000"
              loading="lazy"
              alt={
                kr
                  ? "Argus의 실제 첫 화면: 결정 입력과 판단 기록 예시"
                  : "The actual Argus homepage with decision input and an example record"
              }
            />
          </Link>
          <div className="argus-copy">
            <h4>
              {kr
                ? "그때, 왜 그 결정을 했는지."
                : "Why you made that call."}
            </h4>
            <p>
              {kr
                ? "결정의 근거와 가정, 나중에 확인할 일을 한곳에 남깁니다. 시간이 지난 뒤 판단을 되짚어볼 수 있도록 기획하고, 설계와 개발을 직접 하고 있습니다."
                : "A product for recording what a decision rests on and what to check later. I own the product, design, and engineering."}
            </p>
            <Link href={argusUrl} className="text-link">
              {kr ? "Argus 사용해 보기" : "Try Argus"}
              <Arrow external />
            </Link>
          </div>
        </div>
      </article>
    </section>
  );
}
export function Community() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);
  const state = eventState(now);
  const open = state === "applications-open";
  return (
    <section id="community" className="community">
      <div className="shell">
        <SectionHeading
          aside={kr ? "Beyond Deploy 운영진" : "Beyond Deploy organizing team"}
        >
          {kr ? "만드는 사람들과 함께" : "With fellow builders"}
        </SectionHeading>
        <div className="community-layout">
          <div className="community-copy">
            <h3>Beyond Deploy</h3>
            <p>
              {kr
                ? "AI를 고객의 업무에 적용하는 사람들이 모입니다. 운영진으로 모임과 해커톤을 기획하며, 개발 과정의 선택과 시행착오를 나눕니다."
                : "A community for people building AI into client operations. As part of the organizing team, I help plan gatherings and hackathons where we share implementation choices and lessons from the work."}
            </p>
            <Link href="https://beyonddeploy.kr/" className="text-link">
              {kr ? "커뮤니티 보기" : "Visit the community"}
              <Arrow external />
            </Link>
          </div>
          <article className="event">
            <div className="event-date">
              <span>DEC</span>
              <strong>05</strong>
              <span>2026 / SAT</span>
            </div>
            <div className="event-content">
              <h3>{kr ? "FDE톤" : "FDEthon"}</h3>
              <div className="event-status">
                {open
                  ? kr
                    ? "참가 신청 중"
                    : "Applications open"
                  : state === "upcoming"
                    ? kr
                      ? "개최 예정"
                      : "Upcoming"
                    : kr
                      ? "2026년 행사"
                      : "2026 event"}
              </div>
              <p>
                {kr
                  ? "고객 인터뷰부터 문제 정의, 구현, 피칭까지. 실제 업무의 복잡함을 풀어보는 FDE 해커톤을 함께 기획하고 있습니다."
                  : "Client interviews, problem definition, implementation, and a pitch. I am helping organize an FDE hackathon built around the complexity of real work."}
              </p>
              <dl className="event-details">
                <div>
                  <dt>{kr ? "장소" : "Where"}</dt>
                  <dd>{kr ? "서강대학교" : "Sogang University"}</dd>
                </div>
                <div>
                  <dt>{kr ? "시간" : "When"}</dt>
                  <dd>13:00–18:00 KST</dd>
                </div>
                <div>
                  <dt>{kr ? "참가" : "Entry"}</dt>
                  <dd>
                    {kr
                      ? "개인 또는 1–3인 팀 / 무료"
                      : "Individuals or teams of 1–3 / Free"}
                  </dd>
                </div>
                <div>
                  <dt>{kr ? "상금" : "Prizes"}</dt>
                  <dd>{kr ? "총 200만원" : "KRW 2,000,000 total"}</dd>
                </div>
              </dl>
              <Link
                href="https://fdethon.beyonddeploy.kr/"
                className="button-link"
              >
                {open
                  ? kr
                    ? "행사 안내와 참가 신청"
                    : "Details & application"
                  : kr
                    ? "행사 안내"
                    : "Event details"}
                <Arrow external />
              </Link>
              <p className="event-footnote">
                {open
                  ? kr
                    ? "11월 15일 23:59 신청 마감"
                    : "Applications close Nov 15, 23:59 KST"
                  : "Beyond Deploy × InsideAnswer"}
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
export function About() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section id="about" className="about shell">
      <SectionHeading>{kr ? "소개" : "About Yaechan"}</SectionHeading>
      <div className="about-layout">
        <div className="about-copy">
          <h3>
            {kr
              ? "전략기획에서 제품 개발로."
              : "From corporate strategy to product development."}
          </h3>
          <p>
            {kr
              ? "SK On 전략기획팀에서 업무에 필요한 AI 도구를 직접 만들기 시작했습니다. 이후 Praxis를 통해 기업 AX 프로젝트를 수행했고, 지금은 Arkpoint의 파트너로 Enterprise AX 사업을 이끌고 있습니다."
              : "I began building the tools I needed while working in corporate strategy at SK On. I then delivered independent AX engagements through Praxis, and now lead Enterprise AX at Arkpoint."}
          </p>
          <p>
            {kr
              ? "서울대학교에서 경제학과 과학기술학을 공부했습니다. 사업의 우선순위를 정하는 일과 제품을 구현하는 일을 함께 해왔습니다."
              : "I studied Economics and Science & Technology Studies at Seoul National University. My work combines setting business priorities with hands-on product development."}
          </p>
          <Link
            href="https://www.linkedin.com/in/yaechan-lee/"
            className="text-link"
          >
            LinkedIn
            <Arrow external />
          </Link>
        </div>
        <div className="about-details">
          <dl className="experience-list">
            <div>
              <dt>Arkpoint</dt>
              <dd>Partner / Enterprise AX</dd>
            </div>
            <div>
              <dt>Praxis</dt>
              <dd>{kr ? "독립 AX 프로젝트" : "Independent AX engagements"}</dd>
            </div>
            <div>
              <dt>SK On</dt>
              <dd>
                {kr ? "전략기획 / 2022–2026" : "Corporate strategy / 2022–2026"}
              </dd>
            </div>
          </dl>
          <div className="sayu-note">
            <div className="sayu-animals">
              <img
                src="/images/sayu/laef-fox.webp"
                width="100"
                height="100"
                alt=""
                loading="lazy"
              />
              <img
                src="/images/sayu/laec-cat.webp"
                width="100"
                height="100"
                alt=""
                loading="lazy"
              />
              <img
                src="/images/sayu/lamf-owl.webp"
                width="100"
                height="100"
                alt=""
                loading="lazy"
              />
            </div>
            <div>
              <h4>{kr ? "미술도 좋아합니다." : "Outside work, art."}</h4>
              <p>
                {kr
                  ? "취향으로 작품을 만나는 큐레이션 프로젝트 SAYU를 만들었고, 큐레이팅스쿨서울에서도 공부했습니다."
                  : "I built SAYU, an art-curation project based on taste, and studied at Curating School Seoul."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export function Contact() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const items = [
    {
      id: "project-contact",
      title: kr ? "프로젝트 상담" : "Discuss a project",
      body: kr
        ? "반복되는 수작업, 흩어진 정보, 도입 이후 멈춘 AI 프로젝트. 지금 풀고 싶은 업무와 제약을 알려주세요. 적용할 범위부터 함께 짚어보겠습니다."
        : "Manual work, fragmented information, or an AI project that has stalled. Tell me what needs to change and what stands in the way. We can work out the scope together.",
      action: kr ? "프로젝트 메일 보내기" : "Email about a project",
      subject: kr ? "AX 프로젝트 문의" : "AX project inquiry",
      event: "project",
    },
    {
      id: "collaborate-contact",
      title: kr ? "협업 제안" : "Collaborate",
      body: kr
        ? "함께 개발할 제품, 같이 풀어볼 고객의 문제, 나누고 싶은 경험이 있다면 연락 주세요. 개발자, 기획자, 사업 파트너와 연결되고 싶습니다."
        : "Have a product to build, a client problem to work through, or experience to share? I would like to meet developers, product people, and business partners.",
      action: kr ? "협업 메일 보내기" : "Email about collaborating",
      subject: kr ? "협업 제안" : "Collaboration",
      event: "collaborate",
    },
  ];
  return (
    <section id="contact" className="contact">
      <div className="shell">
        <div className="contact-title">
          <h2>{kr ? "함께할 일을 이야기해요." : "Let’s talk about the work."}</h2>
          <a href="mailto:yclee913@gmail.com">
            yclee913@gmail.com
            <Arrow external />
          </a>
        </div>
        <div className="contact-options">
          {items.map((i) => (
            <div id={i.id} key={i.id}>
              <h3>{i.title}</h3>
              <p>{i.body}</p>
              <a
                href={`mailto:yclee913@gmail.com?subject=${encodeURIComponent(i.subject)}`}
                className="contact-action"
                onClick={() => track("contact_click", { intent: i.event })}
              >
                {i.action}
                <Arrow />
              </a>
            </div>
          ))}
        </div>
        <div className="contact-bottom">
          <span>
            {kr
              ? "메일 또는 15분 미팅으로 시작할 수 있습니다."
              : "Start with an email or a 15-minute call."}
          </span>
          <Link
            href="https://calendly.com/yclee913/15-min-meeting"
            onClick={() => track("calendly_click", { location: "contact" })}
          >
            {kr ? "15분 대화 예약" : "Book a 15-minute call"}
            <Arrow external />
          </Link>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer shell">
      <span>© {new Date().getFullYear()} Yaechan Lee</span>
      <div>
        <Link href="https://www.linkedin.com/in/yaechan-lee/">LinkedIn</Link>
        <Link href="https://github.com/commet">GitHub</Link>
        <Link href="https://www.threads.com/@and__yc">Threads</Link>
        <a href="#top">
          Top
          <Arrow />
        </a>
      </div>
    </footer>
  );
}
