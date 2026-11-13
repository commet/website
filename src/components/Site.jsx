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
              I lead enterprise AI work
              <br />
              <span>and build the software myself.</span>
            </>
          )}
        </h1>
      </div>
      <div className="hero-context">
        <p>
          {kr
            ? "기업이 반복하는 업무에 AI를 적용하고 운영까지 맡습니다. 물류기업의 운송 관제와 문서 처리, SK On의 사내 AI 시스템을 업무 분석부터 설계, 개발까지 직접 만들었습니다."
            : "I apply AI to the work companies repeat every day and stay on through operation. For a logistics company's shipment monitoring and document processing, and for internal AI at SK On, I did the analysis, design, and engineering myself."}
        </p>
        <div className="role-line">
          <span>Arkpoint</span>
          <span>{kr ? "파트너 / 기업 AI 전환(AX)" : "Partner / Enterprise AI transformation (AX)"}</span>
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
function ImageViewer({ open, onClose, src, width, height, title, alt, note }) {
  const { lang } = useLang();
  const kr = lang === "kr";
  const dialog = useRef(null);
  const titleId = useId();
  const [zoom, setZoom] = useState(false);
  const close = () => {
    setZoom(false);
    onClose();
  };
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
  return (
    <dialog
      ref={dialog}
      className="image-viewer"
      aria-labelledby={titleId}
      onClose={close}
      onCancel={close}
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
          <button onClick={close}>
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
        {open && <img src={src} width={width} height={height} style={zoom ? { width, height } : undefined} alt={alt} />}
      </div>
      {note && <p className="viewer-note">{note}</p>}
    </dialog>
  );
}
function EvidenceImage({ src, width, height, title, caption, alt, note, priority = false }) {
  const { lang } = useLang();
  const kr = lang === "kr";
  const [open, setOpen] = useState(false);
  const show = () => setOpen(true);
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
          {kr ? "화면 크게 보기" : "Expand full interface"}
          <Arrow external />
        </button>
      </figcaption>
      <ImageViewer open={open} onClose={() => setOpen(false)} src={src} width={width} height={height} title={title} alt={alt} note={note} />
    </figure>
  );
}
function Spotlight({ id, title, lead, aside, src, ratio, alt, spots, steps, like, basis, dim = 0.62, wide = false, viewer }) {
  const { lang } = useLang();
  const kr = lang === "kr";
  const [open, setOpen] = useState(false);
  const pos = ({ x, y, w, h }) => ({
    left: `${x}%`, top: `${y}%`, width: `${w}%`, height: `${h}%`,
    backgroundImage: `url(${src})`,
    backgroundSize: `${10000 / w}% auto`,
    backgroundPosition: `${(x / (100 - w)) * 100}% ${(y / (100 - h)) * 100}%`,
  });
  return (
    <section className="spotlight" aria-labelledby={id}>
      <div className="spotlight-lead">
        <div>
          <h4 id={id}>{title}</h4>
          <p>{lead}</p>
        </div>
        <div className="spotlight-aside" role="img" aria-label={aside.label}>
          {aside.rows.map(([name, value, text], i) => (
            <div key={name} className={i === 1 ? "is-after" : undefined}>
              <span>{name}</span>
              {aside.kind === "ten"
                ? <div className="ten">{Array.from({ length: 10 }, (_, k) => <i key={k} className={k < value ? "on" : undefined} />)}</div>
                : <div className="bar"><i style={{ width: `${value}%` }} /></div>}
              <p>{text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className={wide ? "spotlight-stage is-wide" : "spotlight-stage"}>
        <div className="spotlight-figure">
          <div className="spotlight-shot" style={{ aspectRatio: ratio, backgroundImage: `url(${src})`, "--dim": dim }} role="img" aria-label={alt}>
            {spots.map((spot, i) => (
              <div key={i} className="spot" style={pos(spot)}><span>{spot.n}</span></div>
            ))}
          </div>
          {viewer && <>
            <button type="button" className="spotlight-open" onClick={() => setOpen(true)}>
              {kr ? "화면 크게 보기" : "View the full screen"}<Arrow external />
            </button>
            <ImageViewer open={open} onClose={() => setOpen(false)} src={src} width={viewer.width} height={viewer.height} title={viewer.title} alt={viewer.alt || alt} note={viewer.note} />
          </>}
        </div>
        <ol className="spotlight-steps">
          {steps.map(([name, body, from, to, unit], i) => (
            <li key={name}>
              <span>{i + 1}</span>
              <div>
                <strong>{name}</strong>
                <p>{body}</p>
                {to && <p className="spotlight-num">
                  {from && <><s>{from}</s><Arrow /></>}
                  <b>{to}</b>
                  <small>{unit}</small>
                </p>}
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className="spotlight-foot">
        <span><b>{kr ? "다른 업종 적용" : "Other industries"}</b>{like}</span>
        <span>{basis}</span>
      </p>
    </section>
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
            <span className="project-no" aria-hidden="true">01</span>
            <div>
              <h3>{kr ? "운송 관제" : "Shipment monitoring"}</h3>
              <p>
                {kr
                  ? "물류기업 FSK L&S / 출고 계획부터 항로 감시까지"
                  : "FSK L&S, logistics / From release planning to route monitoring"}
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
          <dl className="shipment-facts">
            {(kr ? [
              ["경로", <>부산 → 파나마 운하 → Newark항 → <b>미국{"\u00a0"}공장</b>, 매주 여러 척에 나눠 운송</>],
              ["변수", <><b>출고일이 바뀌면 탈 배가 달라짐</b>. 도착 뒤에도 항만 대기와 내륙 운송이 남음</>],
              ["필요", <>담당자가 <b>도착 일정과 확인할 일을 한 화면에서</b> 보고 설명할 수 있어야 함</>],
              ["한 일", <>업무 절차와 예외를 담당자들과 확인하고, <b>관제{"\u00a0"}화면을 설계, 개발해 배포</b></>],
            ] : [
              ["Route", <>Busan → Panama Canal → Newark → <b>US factory</b>, split across weekly sailings</>],
              ["Variables", <><b>A new release date can mean a different ship</b>. Port dwell and inland delivery come after</>],
              ["Need", <>Operators had to <b>see the arrival plan and what to check on one screen</b>, and explain it</>],
              ["What I did", <>Worked through the workflow with the operators, then <b>designed, built, and deployed the control tower</b></>],
            ]).map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
          </dl>
        </div>
        <EvidenceImage
          src={kr ? "/images/work/client-monitoring-light.webp" : "/images/work/client-monitoring-light-en.webp"} width={1920} height={1080} priority
          title={kr ? "고객사 설비 운송 관제" : "Client equipment shipment control"}
          caption={kr ? "고객사 운송 관제 / 고객명 비공개, 예시 데이터" : "Client shipment control / Client name withheld | Example data"}
          alt={kr ? "왼쪽 운송 현황, 중앙 부산에서 파나마와 Newark를 잇는 지도, 오른쪽 구간 감시, 하단 항차 일정이 모두 보이는 고객사 운송 관제 전체 화면" : "Full client monitoring interface: shipment status on the left, route map in the center, risk monitoring on the right, and voyage schedule below"}
          note={kr ? "2026년 12월 24일 상황을 가정한 시연입니다. 화면의 일정과 물량은 예시이며 실제 운송 현황이 아닙니다." : "Demonstration as of December 24, 2026. Dates and quantities are examples, not live shipment data."}
        />
        <Spotlight
          id="spotlight-control"
          title={kr ? <>크게 빗나가는 도착 예측을<br /><em>절반</em>으로 줄였습니다.</> : <>Badly missed arrival estimates,<br />cut in <em>half</em>.</>}
          lead={kr
            ? "고객사는 도착 예측이 6일 넘게 빗나가는 비율을 핵심 지표(KPI)로 봤습니다. 선사\u2060(해운사)가 선적 예약 때 알려 준 도착 예정일(ETA)은 열 건 중 세 건꼴로 그만큼 빗나갔는데, 과거 운송 기록으로 보정하자 이 비율이 52%\u2060 줄었습니다(29.7%\u00a0→\u00a014.3%)."
            : "The client's KPI was the share of arrival estimates off by more than six days. Carrier arrival dates (ETA) given at booking missed by that much about three times in ten; corrected against past shipment records, such misses fell by 52% (29.7% to 14.3%)."}
          aside={{
            kind: "bar",
            label: kr ? "KPI, 6일 넘게 빗나간 도착 예측: 선사 예정일 29.7%, 보정한 예측 14.3%" : "Arrival estimates off by more than six days: carrier dates 29.7%, corrected estimates 14.3%",
            rows: kr
              ? [["선사 예정일", 100, <>KPI: 6일 넘게 빗나간 비율 <b>29.7%</b></>], ["보정한 예측", 48, <>KPI: 6일 넘게 빗나간 비율 <b>14.3%</b></>]]
              : [["Carrier date", 100, <>KPI: off by 6+ days <b>29.7%</b></>], ["Corrected", 48, <>KPI: off by 6+ days <b>14.3%</b></>]],
          }}
          src={kr ? "/images/work/client-monitoring-light.webp" : "/images/work/client-monitoring-light-en.webp"} ratio="16 / 9" dim={0.34}
          alt={kr ? "고객사 운송 관제 화면에서 도착 범위, 구간 감시, 항차 일정 세 곳을 밝게 표시한 그림" : "The client monitoring screen with three areas highlighted: arrival range, route monitoring, and voyage schedule"}
          spots={[{ n: 1, x: 0.8, y: 10, w: 19, h: 12 }, { n: 2, x: 80.4, y: 16.3, w: 18.8, h: kr ? 19.3 : 23.4 }, { n: 3, x: 0.8, y: 84.9, w: kr ? 38.6 : 45.4, h: 13.6 }]}
          steps={kr ? [
            ["도착일을 다시 계산합니다", "출고일이 바뀌면 탈 수 있는 배를 다시 찾고, 도착 범위를 새로 산출합니다.", "4.51일", "2.61일", "도착 예측 평균 오차(42% 감소)"],
            ["확인할 일을 구간별로 모읍니다", "기상, 운하, 항만의 위험을 구간마다 표시하고, 계획을 확정하기 전에 풀어야 할 일은 따로 묶습니다.", "", "", ""],
            ["공장 도착일까지 예측합니다", "항만에 내린 뒤의 내륙 운송 기간까지 더해 공장 도착일을 냅니다.", "", "", ""],
          ] : [
            ["Recalculates arrival", "When a release date moves, it finds the sailings still available and a new arrival range.", "4.51 days", "2.61 days", "average arrival error (down 42%)"],
            ["Groups checks by leg", "Weather, canal, and port risks appear for each leg, with unconfirmed plans kept apart.", "", "", ""],
            ["Carries it to the factory", "Inland transport after the port is added to estimate factory arrival.", "", "", ""],
          ]}
          like={kr ? "반도체 장비 반입, 해외 플랜트 기자재 조달, 제약 원료 수입" : "Semiconductor tool move-ins, overseas plant equipment procurement, pharmaceutical ingredient imports"}
          basis={kr ? "FSK L&S 북미행 해상 운송의 과거 기록으로 사후 검증(선적 예약 시점의 도착 예측 523건)" : "Checked afterwards against past FSK L&S ocean shipments to North America (523 arrival estimates made at booking)"}
        />
        <IntelligenceHub />
      </article>
    </section>
  );
}
function WorkHeading({ no, title, subtitle, year, context }) {
  return (
    <div className="project-head">
      <div className="project-name">
        {no && <span className="project-no" aria-hidden="true">{no}</span>}
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
function YakbangResult() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const dialog = useRef(null);
  const titleId = useId();
  const [open, setOpen] = useState(false);
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
  return <>
    <button className="yakbang-result-open text-link" type="button" onClick={() => setOpen(true)}>
      {kr ? "메일 정리 결과 보기" : "See an email result"}<Arrow external />
    </button>
    <dialog className="yakbang-result" ref={dialog} aria-labelledby={titleId} onClose={() => setOpen(false)} onCancel={() => setOpen(false)}>
      <header><h2 id={titleId}>{kr ? "메일 한 통으로 정리한 오늘 할 일" : "From one email to today's task."}</h2><button type="button" onClick={() => setOpen(false)}>{kr ? "닫기" : "Close"}</button></header>
      <div className="yakbang-result-content">
        <p className="yakbang-result-note">{kr ? "가상 행사 준비 메일로 약방에서 생성한 결과입니다. 읽기 쉽게 텍스트로 옮겼습니다." : "Actual output from a fictional event-planning email, transcribed for readability. The source and output are in Korean."}</p>
        <div className="yakbang-result-columns">
          <section aria-labelledby="yakbang-mail-title"><h3 id="yakbang-mail-title">{kr ? "넣은 메일" : "Input email"}</h3>
            <p lang="ko">다음 주 제품 소개 행사 준비 건입니다.</p>
            <p lang="ko">금요일 오후 3시까지 소개 자료 초안을 공유해 주세요. 행사 장소는 아직 확정되지 않았으니 운영 담당자에게 확인이 필요합니다.</p>
            <p lang="ko">참가 신청은 목요일에 마감하며, 마감 후 최종 인원을 자료에 반영해 주세요. 이전 행사 사진은 참고용으로 첨부했습니다.</p>
            <p lang="ko">오늘은 초안 목차를 먼저 잡아 주시면 됩니다.</p>
          </section>
          <section className="yakbang-result-output" aria-labelledby="yakbang-output-title"><h3 id="yakbang-output-title">{kr ? "약방에서 정리한 오늘 할 일" : "Today's task from Yakbang"}</h3>
            <dl lang="ko"><div><dt>행동</dt><dd>소개 자료 초안 목차 작성</dd></div><div><dt>기한</dt><dd>오늘 중</dd></div><div><dt>근거</dt><dd><blockquote>“오늘은 초안 목차를 먼저 잡아 주시면 됩니다”</blockquote></dd></div></dl>
          </section>
        </div>
        <Link href="https://yakbang.app" className="text-link">{kr ? "약방에서 내 업무 정리하기" : "Try Yakbang with your task"}<Arrow external /></Link>
      </div>
    </dialog>
  </>;
}
function Yakbang() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <article id="yakbang" className="yakbang-project" aria-labelledby="yakbang-title">
      <WorkHeading no="04" title={kr ? "약방" : "Yakbang"}
        subtitle={kr ? "막힌 일을 함께 푸는 AI 서비스" : "An AI service for getting unstuck"} />
      <div className="yakbang-intro">
        <Link href="https://yakbang.app" className="yakbang-cover" aria-label={kr ? "약방 방문하기" : "Visit Yakbang"}>
          <img src="/images/work/yakbang-review.webp" width={1536} height={1024} loading="lazy"
            alt={kr ? "약방 서비스에서 사용하는 원본 이미지: 작업지를 함께 살펴보는 약사" : "Original artwork used in Yakbang: a pharmacist reviewing the work with you"} />
          <span className="yakbang-cover-caption"><strong>{kr ? "“여기까지 만들었어요. 함께 볼까요?”" : "Here is a first draft. Shall we take a look?"}</strong><span>yakbang.app<Arrow external /></span></span>
        </Link>
        <div className="yakbang-story">
          <h4 id="yakbang-title">{kr ? <>무엇부터 해야 할지 막힐 때,<br />같이 시작하는 약방.</> : <>When you are stuck,<br />start here with Yakbang.</>}</h4>
          <p>{kr ? "AI에 무엇을 물어야 할지 몰라도, 하던 일을 이야기하면 됩니다. 메일과 회의록 같은 자료로 첫 작업본을 만들고, 사용한 결과를 바탕으로 다음 작업을 이어 가는 서비스입니다." : "You do not need to know what to ask AI. Describe the task, bring an email or meeting note, and make a first draft. I built Yakbang to carry that work through to feedback and the next attempt."}</p>
          <dl className="yakbang-flow">
            <div><dt>{kr ? "문진" : "Describe"}</dt><dd>{kr ? "하던 일과 막힌 지점을 정리" : "Describe the task and where you got stuck"}</dd></div>
            <div><dt>{kr ? "첫 작업" : "Make"}</dt><dd>{kr ? "내 자료에서 할 일과 확인할 질문 추출" : "Turn your material into tasks and questions"}</dd></div>
            <div><dt>{kr ? "피드백" : "Refine"}</dt><dd>{kr ? "사용한 뒤 수정하고, 필요하면 사람과 연결" : "Try it, revise it, and follow up with a person"}</dd></div>
          </dl>
          <div className="yakbang-actions">
            <Link href="https://yakbang.app" className="yakbang-visit">{kr ? "약방 사용하기" : "Try Yakbang"}<Arrow external /></Link>
            <YakbangResult />
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
          <WorkHeading no="02" title={kr ? "문서 자동화" : "Document automation"}
            subtitle={kr ? "물류기업 FSK L&S / 메일\u00a0접수부터 주문\u00a0연동까지" : "FSK L&S DocAgent / From inbox to order integration"}
            year="2026" context="Praxis" />
          <div className="shipment-story">
            <h4>{kr ? <>수출입 서류,<br />언제까지 손으로 옮겨 적을까?</> : <>Must every document<br />still be typed in by hand?</>}</h4>
            <dl className="shipment-facts">
              {(kr ? [
                ["상황", <>업무 과제 32개를 따라가 보니 <b>공통{"\u00a0"}원인은 서류{"\u00a0"}입력{"\u00a0"}단계</b></>],
                ["변수", <><b>메일로 오는 서류마다 양식이 다름</b>. 서류끼리 중량 같은 값이 어긋나기도 함</>],
                ["필요", <><b>어긋난 곳만 사람이</b> 보고, 나머지는 손대지 않고 등록되어야 함</>],
                ["한 일", <>판독, 원문 대조, 코드 연결까지 <b>검증 화면과 업무{"\u00a0"}흐름을 설계하고 구축</b></>],
              ] : [
                ["Context", <>Tracing 32 workflow problems led to <b>one cause: document entry</b></>],
                ["Variables", <><b>Every emailed document has its own format</b>, and values such as weight can disagree</>],
                ["Need", <><b>A person should see only the mismatches</b>; the rest should go in untouched</>],
                ["What I did", <><b>Designed and built the review screen and workflow</b>, from reading to source checks and code matching</>],
              ]).map(([label, text]) => <div key={label}><dt>{label}</dt><dd>{text}</dd></div>)}
            </dl>
          </div>
          <Spotlight
            id="spotlight-documents"
            title={kr ? <>서류 열 건 중 <em>아홉 건</em>이<br />사람 손을 거치지 않고 끝납니다.</> : <><em>Nine in ten</em> documents go through<br />without anyone touching them.</>}
            lead={kr
              ? "전에는 사람 손을 거치지 않고 끝나는 서류의 비율(자동 처리율, STP)이 10%\u2060대였습니다. 지금은 열 건 중 아홉 건이 처음부터 끝까지 자동으로 처리되고, 담당자는 어긋난 곳만 확인합니다."
              : "Before, only 10–20% of documents went through without a person (straight-through processing, STP). Now nine in ten are processed end to end automatically, and operators check only where documents disagree."}
            aside={{
              kind: "ten",
              label: kr ? "자동 처리율(STP): 도입 전 10%대, 도입 후 90% 이상" : "Straight-through processing: 10–20% before, over 90% after",
              rows: kr
                ? [["도입 전", 1, <>자동 처리율 <b>10%대</b></>], ["도입 후", 9, <>자동 처리율 <b>90% 이상</b></>]]
                : [["Before", 1, <>STP <b>10–20%</b></>], ["After", 9, <>STP <b>90%+</b></>]],
            }}
            src="/images/fsk/document-review.webp" ratio="2280 / 1280"
            viewer={{ width: 2280, height: 1280, title: kr ? "서류 검증 화면" : "Document review screen", alt: kr ? "AI가 읽은 값과 원문을 나란히 놓고 불일치를 표시한 서류 검증 화면. 고객 식별정보는 가렸습니다." : "Document review screen showing extracted fields beside the source, with mismatches flagged. Client identifiers are redacted.", note: kr ? "고객 식별정보를 가린 검증 화면입니다." : "Client identifiers are redacted." }}
            alt={kr ? "서류 검증 화면에서 AI가 읽은 값, 서로 맞지 않는 값과 원문, 등록 단추를 밝게 표시한 그림" : "The document review screen with three areas highlighted: fields read by AI, a mismatch beside its source, and the register action"}
            spots={[{ n: 1, x: 2.5, y: 34, w: 32, h: 45 }, { n: 2, x: 2.5, y: 80.6, w: 32, h: 13.2 }, { n: 2, x: 43.4, y: 65.6, w: 31.2, h: 5.5 }, { n: 3, x: 1.2, y: 2.8, w: 25, h: 5.3 }]}
            steps={kr ? [
              ["AI가 값을 읽습니다", "서류에서 필요한 값을 찾아 채웁니다.", "65%", "99.5%", "판독 정확도"],
              ["맞지 않는 곳만 담당자가 확인합니다", "서류끼리 값이 다르면 원문과 나란히 표시합니다.", "", "95% 이상", "등록 전에 찾은 오류"],
              ["값이 맞으면 바로 등록합니다", "값이 모두 맞는 서류는 사람 손을 거치지 않고 등록까지 끝납니다.", "10%대", "90% 이상", "자동 처리율(STP)"],
            ] : [
              ["AI reads the values", "It finds and fills the fields each document needs.", "65%", "99.5%", "reading accuracy"],
              ["A person sees only mismatches", "When documents disagree, the values appear beside the source.", "", "95%+", "errors caught before entry"],
              ["Matching documents go straight in", "Documents whose values all agree are registered without anyone touching them.", "10–20%", "90%+", "straight-through processing"],
            ]}
            like={kr ? "보험사 청구 서류 심사, 은행 대출 서류 검토, 제조사 발주서와 세금계산서 대조" : "Insurance claim review, bank loan document checks, manufacturer purchase-order and invoice matching"}
            basis={kr ? "FSK L&S 수출입 서류 500만 건 이상 처리 기준 | 고객 식별정보를 가린 화면" : "Based on 5M+ FSK L&S import and export documents. Client identifiers are redacted"}
          />
          <div id="doc-workflow" className="doc-workflow">
            <div className="doc-workflow-heading">
              <h4>{kr ? "문서 검토와 주문 연동 흐름" : "Document review and order integration"}</h4>
              <span>{kr ? "업무 흐름 / 주문 연동은 구축과 검증 중" : "Workflow / Order integration in build and validation"}</span>
            </div>
            <ol>
              {(kr ? [
                ["메일과 첨부 접수", "메일 본문과 첨부서류에서 고객과 운송 유형을 확인합니다."],
                ["항목 추출과 코드 연결", "중량과 수량 등을 읽고, 거래처와 공항, 항만 이름을 시스템 코드에 연결합니다."],
                ["원문 대조와 검토", "불일치나 누락이 있는 서류만 표시합니다. 담당자는 원문을 대조해 고치고 승인합니다."],
                ["주문 확인과 시스템 연동", "기존 주문을 조회한 뒤, 승인된 값으로 물류 업무 시스템 KEROL에 주문을 만듭니다."],
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
            no="03"
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
              ? "SK On 전략기획팀은 여러 문서에서 정보를 찾고 비교해 의사결정 근거로 정리하는 일을 반복했습니다. 사내외 정보를 한데 모은 지식 시스템을 직접 만들어 매일 쓰는 Excel, Word, Outlook에 연결했고, 보안 협의와 경영진 설명, 사용자 교육까지 맡았습니다."
              : "The SK On strategy team kept finding and comparing documents to support decisions. I built a knowledge system that brings internal and external information together, connected it to Excel, Word, and Outlook, and handled security review, executive briefings, and training."}
          </p>
          <dl className="yakbang-flow strix-facts">
            <div><dt>{kr ? "효과" : "Result"}</dt><dd><b>{kr ? "기획서 작성 시간 평균 약 50% 단축" : "Planning documents drafted in about half the time"}</b></dd></div>
            <div><dt>{kr ? "활용 예" : "Use"}</dt><dd>{kr ? "의사결정 자료와 시장 정보로 기획서 초안 작성, 경영진 알림" : "Draft planning documents from past decisions and market data; executive alerts"}</dd></div>
            <div><dt>{kr ? "구성" : "Stack"}</dt><dd>{kr ? "경량 로컬 LLM과 문서 검색(LangChain\u00a0RAG), Office 연동(VBA)" : "Lightweight local LLM with document search (LangChain RAG), Office integration (VBA)"}</dd></div>
            <div><dt>{kr ? "사용" : "Adoption"}</dt><dd>{kr ? "일상 사용자 약 30명, 등록자 600명 이상, mySUNI 소개(1,000명 이상)" : "About 30 daily users, 600+ registered, featured on mySUNI (1,000+)"}</dd></div>
            <div><dt>{kr ? "다른 업종" : "Elsewhere"}</dt><dd>{kr ? "증권사 리서치, 로펌 판례와 의견서 검토, 컨설팅사 제안서 준비" : "Equity research, legal precedent and opinion review, consulting proposals"}</dd></div>
          </dl>
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
          no="05"
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
              {kr ? "Argus 사용하기" : "Try Argus"}
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
                    ? "참가 신청 접수 중"
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
                  <dd>13:00~18:00 KST</dd>
                </div>
                <div>
                  <dt>{kr ? "참가" : "Entry"}</dt>
                  <dd>
                    {kr
                      ? "개인 또는 1~3인 팀 / 무료"
                      : "Individuals or teams of 1–3 / Free"}
                  </dd>
                </div>
                <div>
                  <dt>{kr ? "상금" : "Prizes"}</dt>
                  <dd>{kr ? "총 200만 원" : "KRW 2,000,000 total"}</dd>
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
              ? <>전략기획을 하며,<br />직접 만들기 시작했습니다.</>
              : "I started building while working in strategy."}
          </h3>
          <p>
            {kr
              ? "SK On 전략기획팀에서 일하며 업무에 필요한 AI 도구를 만들었습니다. 이후 Praxis에서 기업 AX 프로젝트를 수행했고, 지금은 Arkpoint의 파트너로 기업 AX 사업을 이끌고 있습니다."
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
              <dd>{kr ? "파트너 / 기업 AX" : "Partner / Enterprise AX"}</dd>
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
        ? "AI를 적용할 업무를 찾고 있거나, 구상한 시스템을 실제로 만들어야 한다면 연락 주십시오. 현재 업무와 목표를 듣고 범위와 구현 방법을 함께 검토하겠습니다."
        : "Get in touch if you are deciding where AI could help or need to build a system you have in mind. We can review the current workflow, goals, scope, and implementation together.",
      action: kr ? "프로젝트 문의하기" : "Email about a project",
      subject: kr ? "AX 프로젝트 문의" : "AX project inquiry",
      event: "project",
    },
    {
      id: "collaborate-contact",
      title: kr ? "협업 제안" : "Collaborate",
      body: kr
        ? "함께 만들 제품이나 프로젝트를 제안해 주십시오. 개발, 기획, 사업 경험을 나누는 자리나 커뮤니티 모임도 좋습니다."
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
              ? "메일로 내용을 보내셔도 되고, 15분 대화를 바로 예약하셔도 됩니다."
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
