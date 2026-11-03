import { useEffect, useId, useRef, useState } from "react";
import { track } from "@vercel/analytics";
import { useLang } from "../LangContext";
import { eventState } from "../event";
import IntelligenceHub from "./IntelligenceHub";

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
              I lead enterprise AI.
              <br />
              <span>And build the software.</span>
            </>
          )}
        </h1>
      </div>
      <div className="hero-context">
        <p>
          {kr
            ? "물류기업의 운송 관제부터 SK On의 사내 AI까지. 업무를 분석하고, 제품을 설계하고, 직접 개발해 왔습니다."
            : "From shipment monitoring for a logistics company to internal AI at SK On. My work spans understanding the operation, designing the product, and writing the software."}
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
function EvidenceImage({ src, width, height, title, caption, alt, note, priority = false, compactLabel }) {
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
    <figure className={compactLabel ? "evidence-compact" : "map-exhibit"}>
      <button
        type="button"
        className={compactLabel ? "text-link" : "map-open"}
        onClick={show}
        aria-label={compactLabel || `${title} ${kr ? "확대하기" : "expand"}`}
      >
        {compactLabel ? <>{compactLabel}<Arrow external /></> : <img
          src={src}
          width={width}
          height={height}
          fetchPriority={priority ? "high" : undefined}
          loading={priority ? "eager" : "lazy"}
          alt={alt}
        />}
      </button>
      {!compactLabel && <figcaption>
        <span>{caption}</span>
        <button type="button" onClick={show}>
          {kr ? "전체 화면 확대" : "Expand full interface"}
          <Arrow external />
        </button>
      </figcaption>}
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
  return (
    <section
      id="work"
      className="work-section shell"
      aria-labelledby="work-title"
    >
      <div className="section-heading">
        <h2 id="work-title">{kr ? "주요 프로젝트" : "Selected work"}</h2>
        <a href="#intelligence" className="text-link">
          {kr ? "AI 에이전트 직접 실행" : "Try the live AI agent"}<Arrow />
        </a>
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
        <div className="shipment-story">
          <h4>{kr ? <>설비는 언제<br />미국 공장에 도착할까?</> : <>When will the equipment<br />reach the US factory?</>}</h4>
          <div><p>{kr ? "FSK L&S가 맡은 고객사의 설비 운송. 부산에서 여러 항차로 출발한 화물이 파나마 운하와 Newark항을 거쳐 미국 공장에 도착해야 했습니다." : "FSK L&S was handling a client's equipment shipment: multiple sailings from Busan, through the Panama Canal and Newark, to a US factory."}</p>
          <p>{kr ? "출고일이 바뀌면 탈 수 있는 배가 달라집니다. 바다를 건넌 뒤에도 항만 대기와 내륙 운송이 남습니다. 담당자에게 필요한 것은 이 변수를 함께 보고, 도착 일정과 확인할 일을 설명할 수 있는 화면이었습니다." : "A changed release date can mean a different sailing. Port dwell and inland delivery still lie ahead after the ocean crossing. Operators needed to see these dependencies together, explain the arrival plan, and know what to check next."}</p></div>
        </div>
        <EvidenceImage
          src="/images/work/client-monitoring.png" width={1920} height={1080} priority
          title={kr ? "고객사 설비 운송 관제" : "Client equipment shipment control"}
          caption={kr ? "고객사 운송 관제 / 고객명 비공개 · 예시 데이터" : "Client shipment control / Client name withheld · Example data"}
          alt={kr ? "왼쪽 운송 현황, 중앙 부산에서 파나마와 Newark를 잇는 지도, 오른쪽 구간 감시, 하단 항차 일정이 모두 보이는 고객사 운송 관제 전체 화면" : "Full client monitoring interface: shipment status on the left, route map in the center, risk monitoring on the right, and voyage schedule below"}
          note={kr ? "2026년 12월 24일 상황을 가정한 시연입니다. 화면의 일정과 물량은 예시이며 실제 운송 현황이 아닙니다." : "Demonstration as of December 24, 2026. Dates and quantities are examples, not live shipment data."}
        />
        <div className="map-description">
          <h4>
            {kr
              ? "일정과 위험을 한 화면에 연결했습니다."
              : "Connect the schedule, the risks, and the next decision."}
          </h4>
          <div>
            <p>
              {kr
                ? "업무 절차와 예외를 담당자들과 확인하고, 출고 계획부터 항로 감시까지 관제를 설계·개발해 배포했습니다. 일정이 바뀌면 대체 항차를 살펴보고, 항로 주변의 위험과 도착 예상 범위를 같은 화면에서 확인할 수 있습니다."
                : "I worked with operators to understand their workflow and exceptions, then designed, built, and deployed the control tower. They can explore alternative sailings when plans change and review route risks alongside arrival ranges."}
            </p>
            <dl className="map-capabilities">
              <div>
                <dt>{kr ? "일정이 바뀌면" : "When plans change"}</dt>
                <dd>
                  {kr
                    ? "이용 가능한 항차와 도착일 재계산"
                    : "Recalculate available sailings and arrival dates"}
                </dd>
              </div>
              <div>
                <dt>{kr ? "항로를 살피면" : "Along the route"}</dt>
                <dd>{kr ? "기상·운하·항만의 확인 사항을 구간별로" : "Weather, canal, and port issues by leg"}</dd>
              </div>
              <div>
                <dt>{kr ? "판단이 필요하면" : "Before a decision"}</dt>
                <dd>
                  {kr
                    ? "계획과 예측, 확인된 근거를 구분"
                    : "Distinguish plans, estimates, and observed evidence"}
                </dd>
              </div>
            </dl>
          </div>
        </div>
        <IntelligenceHub />
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
function Yakbang() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <article id="yakbang" className="yakbang-project" aria-labelledby="yakbang-title">
      <WorkHeading title={kr ? "약방" : "Yakbang"}
        subtitle={kr ? "막힌 일을 함께 푸는 AI 서비스" : "An AI service for getting unstuck"} />
      <div className="yakbang-intro">
        <Link href="https://yakbang.app" className="yakbang-cover" aria-label={kr ? "약방 방문하기" : "Visit Yakbang"}>
          <img src="/images/work/yakbang-home.png" width={1085} height={710} loading="lazy"
            alt={kr ? "약사가 방문객을 맞이하며 진단서 받기와 공개 처방을 안내하는 약방 실제 첫 화면" : "Yakbang's actual homepage: a pharmacist welcomes visitors to describe a task or try a public prescription"} />
        </Link>
        <div className="yakbang-story">
          <h4 id="yakbang-title">{kr ? <>무엇부터 해야 할지 막힐 때,<br />같이 시작하는 약방.</> : <>When you are stuck,<br />a place to make a start.</>}</h4>
          <p>{kr ? "AI에 무슨 질문을 해야 할지 몰라도, 하던 일을 이야기하면 됩니다. 메일과 회의록 같은 내 자료로 첫 작업본을 만들고, 써본 결과를 바탕으로 다음 작업을 이어가는 서비스를 만들었습니다." : "You do not need to know what to ask AI. Describe the task, bring an email or meeting note, and make a first draft. I built Yakbang to carry that work through to feedback and the next attempt."}</p>
          <dl className="yakbang-flow">
            <div><dt>{kr ? "문진" : "Describe"}</dt><dd>{kr ? "하던 일과 막힌 지점을 정리" : "Describe the task and where you got stuck"}</dd></div>
            <div><dt>{kr ? "첫 작업" : "Make"}</dt><dd>{kr ? "내 자료에서 할 일과 확인할 질문 추출" : "Turn your material into tasks and questions"}</dd></div>
            <div><dt>{kr ? "피드백" : "Refine"}</dt><dd>{kr ? "써본 뒤 수정하고, 필요하면 사람과 연결" : "Try it, revise it, and follow up with a person"}</dd></div>
          </dl>
          <div className="yakbang-actions">
            <Link href="https://yakbang.app" className="yakbang-visit">{kr ? "약방 써보기" : "Try Yakbang"}<Arrow external /></Link>
            <EvidenceImage src="/images/work/yakbang-result.png" width={920} height={807}
              compactLabel={kr ? "메일 정리 결과 보기" : "See an email result"}
              title={kr ? "약방의 메일 정리 결과" : "An email result from Yakbang"}
              alt={kr ? "가상의 행사 준비 메일에서 오늘 할 일과 기한, 원문 근거를 추출한 약방의 실제 결과 화면" : "Actual Yakbang output extracting an action, deadline, and source quote from a fictional event-planning email"}
              note={kr ? "시연용 가상 메일로 실제 생성한 결과입니다. 고객 자료가 아닙니다." : "Actually generated from a fictional email for this demonstration. No customer data."} />
          </div>
        </div>
      </div>
    </article>
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
            <h4>{kr ? "불일치를 찾고, 원문으로 확인합니다." : "Flag discrepancies. Check the source."}</h4>
            <p>{kr ? "운송장과 포장명세서의 중량이 다를 때, 두 값을 원문과 함께 보여줍니다. 불일치와 누락을 확인하는 검증 화면을 만들었고, 담당자가 승인한 값을 주문 시스템에 연결하는 과정까지 구축하고 있습니다." : "When the air waybill and packing list disagree on weight, an operator needs the source. I built a review screen that flags discrepancies beside the original document, and am building the connection from reviewed fields to order creation."}</p>
          </div>
          <div className="doc-workflow">
            <div className="doc-workflow-heading">
              <h4>{kr ? "문서 검토와 주문 연동 흐름" : "Document review and order integration"}</h4>
              <span>{kr ? "업무 흐름 / 구축·검증 중" : "Workflow / Implementation and validation"}</span>
            </div>
            <ol>
              {(kr ? [
                ["메일과 첨부 접수", "메일 본문과 첨부서류에서 고객과 운송 유형을 확인합니다."],
                ["항목 추출과 코드 연결", "중량과 수량 등을 읽고, 거래처와 항만 이름을 시스템 코드에 연결합니다."],
                ["원문 대조와 검토", "불일치와 누락을 표시합니다. 담당자는 원문을 대조해 수정하고 승인합니다."],
                ["주문 확인과 시스템 연동", "기존 주문을 조회한 뒤 승인된 값을 물류 업무 시스템 KEROL에 연결합니다."],
              ] : [
                ["Receive", "Group the email and attachments by customer and shipment type."],
                ["Extract and match", "Read the documents and match company, airport, and port codes."],
                ["Review and approve", "Flag discrepancies and missing values for operator correction and approval."],
                ["Check and integrate", "Check existing orders, then connect approved fields to KEROL, the logistics operations system."],
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
              ? "개발부터 사내 도입까지 맡았습니다."
              : "I built it and led the internal rollout."}
          </h4>
          <p>
            {kr
              ? "SK On 전략기획팀에서 문서를 찾고 정리하던 업무에 AI를 적용했습니다. 시스템 개발과 보안 협의, 경영진 설명, 사용자 교육까지 맡았습니다. 당시 등록자는 600명 이상, 전략기획본부 일상 사용자는 약 30명이었습니다."
              : "I built STRIX for strategy work at SK On and led security discussions, executive communication, training, and rollout. It reached over 600 registrations, with around 30 daily users in the Strategy Division at the time."}
          </p>
          <a className="text-link" href="/case-study/strix">
            {kr ? "STRIX 도입 과정" : "How STRIX was adopted"}
            <Arrow />
          </a>
        </article>
      </div>
      <div className="independent-heading"><SectionHeading>{kr ? "직접 만든 제품" : "Independent products"}</SectionHeading></div>
      <Yakbang />
      <article id="argus" className="argus-project">
        <WorkHeading
          title="Argus"
          subtitle={
            kr
              ? "결정의 근거를 기록하고 다시 검토하는 도구"
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
                ? "결정의 이유까지 기록합니다."
                : "Keep the reasoning behind the decision."}
            </h4>
            <p>
              {kr
                ? "무엇을 근거로 결정했는지, 어떤 가정이 맞아야 하는지, 다음에 무엇을 확인할지 남깁니다. 판단을 나중에 다시 검토할 수 있는 제품으로, 기획과 설계, 개발을 직접 하고 있습니다."
                : "Record the evidence behind a decision, the assumptions it depends on, and what to check next. I design and build the product so those judgments can be revisited later."}
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
          {kr ? "커뮤니티와 해커톤" : "Community and hackathons"}
        </SectionHeading>
        <div className="community-layout">
          <div className="community-copy">
            <h3>Beyond Deploy</h3>
            <p>
              {kr
                ? "AI 제품을 고객의 업무에 적용하는 사람들의 커뮤니티입니다. 운영진으로 참여해 프로젝트 경험을 나누는 모임과 해커톤을 함께 기획합니다."
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
                  ? "고객의 요구를 듣고, 풀어야 할 문제를 정하고, 팀으로 구현해 발표하는 해커톤입니다. Beyond Deploy 운영진으로 기획에 참여하고 있습니다."
                  : "A hackathon where teams listen to a client, define the problem, build a solution, and present it. I am helping organize it as part of the Beyond Deploy team."}
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
              ? "전략기획을 하며, 직접 만들기 시작했습니다."
              : "I started building while working in strategy."}
          </h3>
          <p>
            {kr
              ? "SK On 전략기획팀에서 업무에 필요한 AI 도구를 직접 만들기 시작했습니다. 이후 Praxis를 통해 기업 AX 프로젝트를 수행했고, 지금은 Arkpoint의 파트너로 Enterprise AX 사업을 이끌고 있습니다."
              : "I began building the tools I needed while working in corporate strategy at SK On. I then delivered independent AX engagements through Praxis, and now lead Enterprise AX at Arkpoint."}
          </p>
          <p>
            {kr
              ? "서울대학교에서 경제학과 과학기술학을 공부했습니다. 지금도 무엇을 만들지 판단하는 일과 직접 구현하는 일을 함께 하고 있습니다."
              : "I studied Economics and Science & Technology Studies at Seoul National University. I continue to combine deciding what to build with building it myself."}
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
                  ? "취향에 맞는 미술 작품을 찾아보는 SAYU를 만들었습니다. 큐레이팅스쿨서울에서 공부하며 전시와 큐레이션에도 관심을 이어가고 있습니다."
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
        ? "AI를 적용할 업무를 찾고 있거나, 구상한 시스템을 실제로 만들어야 한다면 연락 주세요. 현재 업무와 목표를 듣고 범위와 구현 방법을 함께 검토하겠습니다."
        : "Get in touch if you are deciding where AI could help or need to build a system you have in mind. We can review the current workflow, goals, scope, and implementation together.",
      action: kr ? "프로젝트 문의하기" : "Email about a project",
      subject: kr ? "AX 프로젝트 문의" : "AX project inquiry",
      event: "project",
    },
    {
      id: "collaborate-contact",
      title: kr ? "협업 제안" : "Collaborate",
      body: kr
        ? "함께 만들 제품이나 같이 맡을 프로젝트를 제안해 주세요. 개발, 기획, 사업 경험을 나누거나 커뮤니티에서 만나는 자리도 좋습니다."
        : "Suggest a product to build or a project to take on together. I am also open to exchanging experience in engineering, product, and business, or meeting through the community.",
      action: kr ? "협업 제안하기" : "Email about collaborating",
      subject: kr ? "협업 제안" : "Collaboration",
      event: "collaborate",
    },
  ];
  return (
    <section id="contact" className="contact">
      <div className="shell">
        <div className="contact-title">
          <h2>{kr ? "함께 만들 일이 있다면." : "Have something in mind?"}</h2>
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
              ? "메일로 내용을 보내거나, 짧은 미팅을 예약해 주세요."
              : "Send a note or book a short call."}
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
