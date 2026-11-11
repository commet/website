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
function Spotlight({ id, title, lead, aside, src, ratio, alt, spots, steps, like, basis, dim = 0.62, wide = false }) {
  const { lang } = useLang();
  const kr = lang === "kr";
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
        <div className="spotlight-shot" style={{ aspectRatio: ratio, backgroundImage: `url(${src})`, "--dim": dim }} role="img" aria-label={alt}>
          {spots.map((spot, i) => (
            <div key={i} className="spot" style={pos(spot)}><span>{spot.n}</span></div>
          ))}
        </div>
        <ol className="spotlight-steps">
          {steps.map(([name, body, from, to, unit], i) => (
            <li key={name}>
              <span>{i + 1}</span>
              <div>
                <strong>{name}</strong>
                <p>{body}</p>
                <p className="spotlight-num">
                  {from && <><s>{from}</s><Arrow /></>}
                  <b>{to}</b>
                  <small>{unit}</small>
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <p className="spotlight-foot">
        <span><b>{kr ? "같은 구조의 업무" : "Work with the same shape"}</b>{like}</span>
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
          <p>{kr ? "출고일이 바뀌면 탈 수 있는 배가 달라집니다. 바다를 건넌 뒤에도 항만 대기와 내륙 운송이 남습니다. 담당자에게 필요한 것은 이 변수를 함께 보고, 도착 일정과 확인할 일을 설명할 수 있는 화면이었습니다." : "A changed release date can mean a different sailing. Port dwell and inland delivery still lie ahead after the ocean crossing. Operators needed to see these dependencies together, explain the arrival plan, and know what to check next."}</p>
          <p>{kr ? "업무 절차와 예외를 담당자들과 확인하고, 출고 계획부터 항로 감시까지 관제를 설계하고 개발해 배포했습니다." : "I worked through the workflow and its exceptions with the operators, then designed, built, and deployed the control tower, from release planning to route monitoring."}</p></div>
        </div>
        <EvidenceImage
          src="/images/work/client-monitoring-light.webp" width={1920} height={1080} priority
          title={kr ? "고객사 설비 운송 관제" : "Client equipment shipment control"}
          caption={kr ? "고객사 운송 관제 / 고객명 비공개 | 예시 데이터" : "Client shipment control / Client name withheld | Example data"}
          alt={kr ? "왼쪽 운송 현황, 중앙 부산에서 파나마와 Newark를 잇는 지도, 오른쪽 구간 감시, 하단 항차 일정이 모두 보이는 고객사 운송 관제 전체 화면" : "Full client monitoring interface: shipment status on the left, route map in the center, risk monitoring on the right, and voyage schedule below"}
          note={kr ? "2026년 12월 24일 상황을 가정한 시연입니다. 화면의 일정과 물량은 예시이며 실제 운송 현황이 아닙니다." : "Demonstration as of December 24, 2026. Dates and quantities are examples, not live shipment data."}
        />
        <Spotlight
          id="spotlight-control"
          title={kr ? <>크게 빗나가는 도착 예측이<br /><em>절반</em>으로 줄었습니다.</> : <>Badly missed arrival estimates<br />were cut in <em>half</em>.</>}
          lead={kr
            ? "전에는 출고일이 바뀔 때마다 담당자가 선사 일정, 항만 상황, 내륙 운송을 따로 확인해 도착일을 다시 계산했습니다. 지금은 한 화면에서 다시 계산합니다."
            : "Before, every change to a release date meant checking carrier schedules, port conditions, and inland transport separately, then recalculating by hand. Now it is recalculated on one screen."}
          aside={{
            kind: "bar",
            label: kr ? "6일 넘게 빗나간 도착 예측: 도입 전 29.7%, 도입 후 14.3%" : "Arrival estimates off by more than six days: 29.7% before, 14.3% after",
            rows: kr
              ? [["도입 전", 100, <>6일 넘게 빗나간 예측 <b>29.7%</b></>], ["도입 후", 48, <>6일 넘게 빗나간 예측 <b>14.3%</b></>]]
              : [["Before", 100, <>Estimates off by 6+ days <b>29.7%</b></>], ["After", 48, <>Estimates off by 6+ days <b>14.3%</b></>]],
          }}
          src="/images/work/client-monitoring-light.webp" ratio="16 / 9" dim={0.34}
          alt={kr ? "고객사 운송 관제 화면에서 도착 범위, 구간 감시, 항차 일정 세 곳을 밝게 표시한 그림" : "The client monitoring screen with three areas highlighted: arrival range, route monitoring, and voyage schedule"}
          spots={[{ n: 1, x: 0.8, y: 10, w: 19, h: 12 }, { n: 2, x: 80.4, y: 16.3, w: 18.8, h: 19.3 }, { n: 3, x: 0.8, y: 84.9, w: 38.6, h: 13.6 }]}
          steps={kr ? [
            ["도착일을 다시 계산합니다", "출고일이 바뀌면 탈 수 있는 배와 도착 범위를 새로 냅니다.", "4.51일", "3.61일", "도착 예측 평균 오차"],
            ["확인할 일을 구간별로 모읍니다", "기상, 운하, 항만의 위험을 구간마다 보여 줍니다.", "29.7%", "14.3%", "6일 넘게 빗나간 예측"],
            ["공장 도착일까지 잇습니다", "항만에 내린 뒤의 내륙 운송까지 예측합니다.", "", "73%", "3일 안에 맞춘 공장 도착 예측"],
          ] : [
            ["Arrival is recalculated", "When a release date moves, available sailings and the arrival range are recomputed.", "4.51 days", "3.61 days", "average arrival error"],
            ["Checks are grouped by leg", "Weather, canal, and port risks are shown for each leg.", "29.7%", "14.3%", "estimates off by 6+ days"],
            ["Through to the factory", "Inland transport after the port is estimated as well.", "", "73%", "factory arrivals within 3 days"],
          ]}
          like={kr ? "협력사 납기 관리, 원자재 수급 점검, 프로젝트 일정 관리" : "Supplier delivery tracking, material supply checks, project scheduling"}
          basis={kr ? "FSK L&S 북미행 해상 운송의 과거 기록으로 사후 검증(부킹 시점 도착 예측 523건, 공장 도착 228건)" : "Checked afterwards against past FSK L&S ocean shipments to North America (523 arrival estimates made at booking; 228 factory arrivals)"}
        />
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
      <header><h2 id={titleId}>{kr ? "메일 한 통에서, 오늘 할 일로." : "From one email to today's task."}</h2><button type="button" onClick={() => setOpen(false)}>{kr ? "닫기" : "Close"}</button></header>
      <div className="yakbang-result-content">
        <p className="yakbang-result-note">{kr ? "가상 행사 준비 메일로 약방에서 생성한 결과입니다. 읽기 쉽게 텍스트로 옮겼습니다." : "Actual output from a fictional event-planning email, transcribed for readability. The source and output are in Korean."}</p>
        <div className="yakbang-result-columns">
          <section aria-labelledby="yakbang-mail-title"><h3 id="yakbang-mail-title">{kr ? "넣은 메일" : "Input email"}</h3>
            <p lang="ko">다음 주 제품 소개 행사 준비 건입니다.</p>
            <p lang="ko">금요일 오후 3시까지 소개 자료 초안을 공유해 주세요. 행사 장소는 아직 확정되지 않았으니 운영 담당자에게 확인이 필요합니다.</p>
            <p lang="ko">참가 신청은 목요일에 마감하며, 마감 후 최종 인원을 자료에 반영해 주세요. 이전 행사 사진은 참고용으로 첨부했습니다.</p>
            <p lang="ko">오늘은 초안 목차를 먼저 잡아 주시면 됩니다.</p>
          </section>
          <section className="yakbang-result-output" aria-labelledby="yakbang-output-title"><h3 id="yakbang-output-title">{kr ? "약방이 꺼낸 오늘 할 일" : "Today's task from Yakbang"}</h3>
            <dl lang="ko"><div><dt>행동</dt><dd>소개 자료 초안 목차 작성</dd></div><div><dt>기한</dt><dd>오늘 중</dd></div><div><dt>근거</dt><dd><blockquote>“오늘은 초안 목차를 먼저 잡아 주시면 됩니다”</blockquote></dd></div></dl>
          </section>
        </div>
        <Link href="https://yakbang.app" className="text-link">{kr ? "내 일로 약방 써보기" : "Try Yakbang with your task"}<Arrow external /></Link>
      </div>
    </dialog>
  </>;
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
          <img src="/images/work/yakbang-review.webp" width={1536} height={1024} loading="lazy"
            alt={kr ? "약방 서비스에서 사용하는 원본 이미지: 작업지를 함께 살펴보는 약사" : "Original artwork used in Yakbang: a pharmacist reviewing the work with you"} />
          <span className="yakbang-cover-caption"><strong>{kr ? "여기까지 만들었어요. 함께 볼까요?" : "Here is a first draft. Shall we take a look?"}</strong><span>yakbang.app<Arrow external /></span></span>
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
          <WorkHeading title={kr ? "물류 문서 자동화" : "Logistics document automation"}
            subtitle={kr ? "FSK L&S DocAgent / 메일 접수부터 주문 연동까지" : "FSK L&S DocAgent / From inbox to order integration"}
            year="2026" context="Praxis" />
          <Spotlight
            id="spotlight-documents"
            title={kr ? <>서류 열 건 중 <em>아홉 건</em>이<br />사람 손 없이 끝납니다.</> : <><em>Nine in ten</em> documents finish<br />without manual handling.</>}
            lead={kr
              ? "전에는 담당자가 메일로 온 서류를 한 장씩 열어 값을 옮겨 적었습니다. 지금은 서로 맞지 않는 곳만 확인합니다."
              : "Before, operators opened each emailed document and typed the values in by hand. Now they review only the fields that disagree."}
            aside={{
              kind: "ten",
              label: kr ? "자동으로 처리되는 서류: 도입 전 10%대, 도입 후 90% 이상" : "Documents processed automatically: 10–20% before, over 90% after",
              rows: kr
                ? [["도입 전", 1, <>자동 처리 <b>10%대</b></>], ["도입 후", 9, <>자동 처리 <b>90% 이상</b></>]]
                : [["Before", 1, <>Automatic <b>10–20%</b></>], ["After", 9, <>Automatic <b>90%+</b></>]],
            }}
            src="/images/fsk/document-review.webp" ratio="2280 / 1280"
            alt={kr ? "서류 검증 화면에서 AI가 읽은 값, 서로 맞지 않는 값과 원문, 등록 단추를 밝게 표시한 그림" : "The document review screen with three areas highlighted: fields read by AI, a mismatch beside its source, and the register action"}
            spots={[{ n: 1, x: 2.5, y: 34, w: 32, h: 45 }, { n: 2, x: 2.5, y: 80.6, w: 32, h: 13.2 }, { n: 2, x: 43.4, y: 65.6, w: 31.2, h: 5.5 }, { n: 3, x: 1.2, y: 2.8, w: 25, h: 5.3 }]}
            steps={kr ? [
              ["값은 AI가 읽습니다", "서류에서 필요한 값을 찾아 채웁니다.", "65%", "99.5%", "판독 정확도"],
              ["안 맞는 곳만 담당자에게", "서류끼리 값이 다르면 원문과 나란히 보여 줍니다.", "", "95% 이상", "등록 전에 찾은 오류"],
              ["확인이 끝나면 바로 등록", "나머지 서류는 사람을 거치지 않습니다.", "10%대", "90% 이상", "자동 처리"],
            ] : [
              ["AI reads the values", "It finds and fills the fields each document needs.", "65%", "99.5%", "reading accuracy"],
              ["Only mismatches reach a person", "When documents disagree, the values appear beside the source.", "", "95%+", "errors caught before entry"],
              ["Registered once reviewed", "Everything else skips manual handling.", "10–20%", "90%+", "automatic"],
            ]}
            like={kr ? "세금계산서와 발주서 대조, 보험금 청구 접수, 계약서 검토" : "Invoice and purchase-order matching, insurance claims intake, contract review"}
            basis={kr ? "FSK L&S 수출입 서류 500만 건 이상 처리 기준. 화면은 고객 식별정보를 가린 검증 화면" : "Based on 5M+ FSK L&S import and export documents. Client identifiers are redacted"}
          />
          <div id="doc-workflow" className="doc-workflow">
            <div className="doc-workflow-heading">
              <h4>{kr ? "문서 검토와 주문 연동 흐름" : "Document review and order integration"}</h4>
              <span>{kr ? "업무 흐름 / 구축과 검증 중" : "Workflow / Implementation and validation"}</span>
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
              ? "SK On 전략기획팀이 여러 문서에서 정보를 찾고 비교해 의사결정 근거로 정리하던 일에 문서 검색과 LLM을 결합했습니다. 업무 흐름을 바꾸지 않도록 Excel, Word, Outlook에서 바로 쓰게 연결했습니다."
              : "The SK On strategy team kept finding, comparing, and summarizing documents to support decisions. STRIX combined document search with an LLM and worked inside Excel, Word, and Outlook, so the workflow did not have to change."}
          </p>
          <dl className="yakbang-flow strix-facts">
            <div><dt>{kr ? "맡은 일" : "Role"}</dt><dd>{kr ? "개발, 보안 협의, 경영진 설명, 사용자 교육" : "Development, security review, executive briefings, user training"}</dd></div>
            <div><dt>{kr ? "등록자" : "Registered"}</dt><dd>{kr ? "600명 이상(당시 기준)" : "600+ at the time"}</dd></div>
            <div><dt>{kr ? "일상 사용자" : "Daily users"}</dt><dd>{kr ? "약 30명(전략기획본부)" : "About 30 in the Strategy Division"}</dd></div>
            <div><dt>{kr ? "사내 교육" : "Training"}</dt><dd>{kr ? "mySUNI 교육 콘텐츠, 1,000명 이상 도달" : "SK Group mySUNI course, reached 1,000+"}</dd></div>
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
              ? <>전략기획을 하며,<br />직접 만들기 시작했습니다.</>
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
        ? "함께 만들 제품이나 같이 맡을 프로젝트를 제안해 주십시오. 개발, 기획, 사업 경험을 나누거나 커뮤니티에서 만나는 자리도 좋습니다."
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
              ? "메일로 내용을 보내거나, 짧은 미팅을 예약하십시오."
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
