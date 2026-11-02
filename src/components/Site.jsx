import { useEffect, useState } from "react";
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
      strokeWidth="1.5"
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
export function Nav() {
  const { lang, setLang } = useLang();
  const kr = lang === "kr";
  return (
    <header className="site-header shell">
      <a
        href="/"
        className="wordmark"
        aria-label={kr ? "이예찬 홈" : "Yaechan Lee home"}
      >
        yc<span>.</span>
      </a>
      <nav aria-label={kr ? "주 메뉴" : "Main navigation"}>
        <a href="/#work">{kr ? "하는 일" : "Work"}</a>
        <a href="/#community">{kr ? "함께하는 일" : "Community"}</a>
        <a href="/#contact">{kr ? "연락" : "Contact"}</a>
        <button
          className="language"
          onClick={() => setLang(kr ? "en" : "kr")}
          aria-label={kr ? "Switch to English" : "한국어로 전환"}
        >
          {kr ? "EN" : "KO"}
        </button>
      </nav>
    </header>
  );
}
export function Hero() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="hero shell" aria-labelledby="intro-title">
      <div className="hero-name">
        <h1 id="intro-title">
          Yaechan<span className="name-space"> </span>
          <br />
          Lee<span>.</span>
        </h1>
        <p>
          이예찬 <span>Seoul, Korea</span>
        </p>
      </div>
      <div className="hero-intro">
        <h2>
          {kr ? (
            <>
              현장의 문제를 찾고,
              <br />
              사업과 제품으로 만듭니다.
            </>
          ) : (
            <>
              From a real problem
              <br />
              to a working business.
            </>
          )}
        </h2>
        <p>
          {kr
            ? "기업의 AI 전환을 이끌며 직접 설계하고 개발합니다. SK On의 사내 AI 도입에서 시작해, 지금은 물류 현장의 업무를 바꾸는 시스템을 만들고 있습니다."
            : "I lead enterprise AI transformation and build the systems myself. From internal AI adoption at SK On to working software for logistics operations."}
        </p>
        <div className="current-role">
          <span className="status-dot" />
          {kr
            ? "Arkpoint Partner / Enterprise AX"
            : "Arkpoint Partner / Enterprise AX"}
        </div>
        <div className="hero-actions">
          <a href="#project-contact">
            {kr ? "프로젝트 문의" : "Discuss a project"}
            <Arrow />
          </a>
          <a href="#collaborate-contact">
            {kr ? "함께 만들기" : "Build together"}
            <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
const evidence = [
  {
    id: "tower",
    image: "/images/fsk/control-tower.webp",
    dimensions: [2336, 1000],
    label: ["물류 관제", "Logistics visibility"],
    title: [
      "운송 현황과 리스크를 한 화면에서.",
      "Shipment status and risk, in one view.",
    ],
    description: [
      "선박 위치, 운송 경로, 기상 리스크를 함께 살펴보는 물류 컨트롤타워. 도메인 리서치부터 화면 설계와 구현, 배포까지 연결했습니다.",
      "A logistics control tower bringing vessel positions, routes, and weather risk together. I connected domain research, interface design, implementation, and deployment.",
    ],
    caption: [
      "FSK 프로젝트 / 운송 경로와 기상 리스크 관제 화면",
      "FSK project / Route and weather-risk monitoring",
    ],
  },
  {
    id: "documents",
    image: "/images/fsk/document-review.webp",
    dimensions: [2280, 1280],
    label: ["문서 검증", "Document review"],
    title: [
      "읽은 문서를, 확인하고 처리할 수 있게.",
      "From extracted text to a reviewable order.",
    ],
    description: [
      "이메일 첨부문서에서 읽어낸 값을 원문과 대조하고, 담당자가 확인한 뒤 기존 시스템으로 연결하는 흐름을 구축·검증하고 있습니다.",
      "Building and validating a workflow that extracts email attachments, checks values against the source, and connects reviewed orders to the existing system.",
    ],
    caption: [
      "FSK 프로젝트 / 원문 대조와 필드 검증 화면",
      "FSK project / Source comparison and field validation",
    ],
  },
];
export function Evidence() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const index = kr ? 0 : 1;
  const [active, setActive] = useState(0);
  const item = evidence[active];
  function handleKey(event) {
    if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next =
      event.key === "Home" ? 0 : event.key === "End" ? 1 : 1 - active;
    setActive(next);
    document.getElementById(`evidence-tab-${next}`)?.focus();
  }
  return (
    <section id="work" className="evidence shell" aria-labelledby="fsk-title">
      <div className="section-bar">
        <h2 id="fsk-title">
          FSK{" "}
          <span>
            {kr ? "물류 현장에서 만드는 AX" : "Building AI into logistics"}
          </span>
        </h2>
        <span className="quiet">
          {kr ? "고객 프로젝트 / Praxis" : "Client work / Praxis"}
        </span>
      </div>
      <div
        className="evidence-controls"
        role="tablist"
        aria-label={kr ? "FSK 프로젝트 화면" : "FSK project views"}
      >
        {evidence.map((entry, i) => (
          <button
            key={entry.id}
            id={`evidence-tab-${i}`}
            role="tab"
            aria-selected={active === i}
            aria-controls={`evidence-panel-${i}`}
            tabIndex={active === i ? 0 : -1}
            onKeyDown={handleKey}
            onClick={() => setActive(i)}
          >
            {entry.label[index]}
          </button>
        ))}
      </div>
      <div
        id={`evidence-panel-${active}`}
        role="tabpanel"
        aria-labelledby={`evidence-tab-${active}`}
        tabIndex="0"
      >
        <figure className="evidence-figure">
          <div className="evidence-image">
            <img
              key={item.id}
              src={item.image}
              width={item.dimensions[0]}
              height={item.dimensions[1]}
              alt={item.caption[index]}
              fetchPriority="high"
            />
          </div>
          <figcaption>
            <span>{item.caption[index]}</span>
            <Link href={item.image} target="_blank" rel="noopener noreferrer">
              {kr ? "크게 보기" : "Open full image"}
              <Arrow external />
            </Link>
          </figcaption>
        </figure>
        <div className="evidence-story">
          <h3>{item.title[index]}</h3>
          <div>
            <p>{item.description[index]}</p>
            <a className="text-link" href="/case-study/fsk">
              {kr ? "FSK 프로젝트 자세히 보기" : "Explore the FSK work"}
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
export function SelectedWork() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section className="selected shell" aria-labelledby="selected-title">
      <h2 id="selected-title" className="section-heading">
        {kr ? "조직 안에서, 그리고 직접." : "Inside an enterprise. On my own."}
      </h2>
      <div className="work-pair">
        <article className="strix-preview">
          <a className="project-image" href="/case-study/strix">
            <img
              src="/images/strix-video.jpeg"
              width="1280"
              height="720"
              loading="lazy"
              alt={
                kr
                  ? "SK 그룹 mySUNI에 소개된 STRIX 교육 화면"
                  : "STRIX training featured on SK Group mySUNI"
              }
            />
          </a>
          <div className="project-heading">
            <h3>STRIX</h3>
            <span>SK On / 2024</span>
          </div>
          <h4>
            {kr
              ? "사내 지식이 일하는 도구가 되기까지."
              : "Making company knowledge useful at work."}
          </h4>
          <p>
            {kr
              ? "전략기획 업무를 하며 직접 만든 AI 지식 시스템. 구축에서 보안 협의, 경영진 설득, 사내 교육과 확산까지 맡았습니다."
              : "An AI knowledge system I built while working in strategy. My role spanned implementation, security discussions, leadership buy-in, and internal training."}
          </p>
          <p className="proof-line">
            {kr
              ? "600명+ 등록 / 전략기획본부 약 30명 일상 사용"
              : "600+ registrations / ~30 daily users in Strategy"}
          </p>
          <a href="/case-study/strix" className="text-link">
            {kr ? "도입 과정 읽기" : "Read the adoption story"}
            <Arrow />
          </a>
        </article>
        <article className="argus-preview">
          <Link
            href="https://argus.voyage/"
            className="argus-field"
            aria-label={kr ? "Argus 제품 열기" : "Open Argus product"}
          >
            <div className="argus-word">
              Argus
              <Arrow external />
            </div>
            <div className="argus-path">
              <span>{kr ? "판단을 기록하고" : "Record a judgment"}</span>
              <span>{kr ? "현실과 비교하고" : "Compare with reality"}</span>
              <span>
                {kr ? "다음 판단에 반영합니다" : "Inform the next decision"}
              </span>
            </div>
          </Link>
          <div className="project-heading">
            <h3>Argus</h3>
            <span>{kr ? "직접 만드는 제품" : "Independent product"}</span>
          </div>
          <h4>
            {kr
              ? "AI 시대에, 내 판단을 기르는 도구."
              : "A place to develop your own judgment."}
          </h4>
          <p>
            {kr
              ? "결정과 그 근거를 기록하고, 시간이 지난 뒤 실제 결과와 비교합니다. 판단을 돌아보는 습관을 제품으로 만들고 있습니다."
              : "Record a decision and its reasoning, then return to compare it with what happened. I am building a product around the practice of reflecting on judgment."}
          </p>
          <p className="proof-line">
            {kr
              ? "기획, 설계, 개발 / 독립 프로젝트"
              : "Product, design, engineering / Independent project"}
          </p>
          <Link href="https://argus.voyage/" className="text-link">
            {kr ? "Argus 열기" : "Explore Argus"}
            <Arrow external />
          </Link>
        </article>
      </div>
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
  const future = state === "upcoming";
  const status = open
    ? kr
      ? "참가 신청 중"
      : "Applications open"
    : future
      ? kr
        ? "개최 예정"
        : "Upcoming event"
      : kr
        ? "2026년 행사"
        : "2026 event";
  return (
    <section
      id="community"
      className="community"
      aria-labelledby="community-title"
    >
      <div className="shell community-grid">
        <div className="community-intro">
          <h2 id="community-title">
            {kr ? (
              <>
                함께 만드는 <br />
                사람들 곁에서.
              </>
            ) : (
              <>
                In good <br />
                building company.
              </>
            )}
          </h2>
          <p>
            {kr
              ? "Beyond Deploy 운영진으로, 현장에서 AI를 만들고 도입하는 사람들과 경험을 나눕니다. 실제 문제를 정의하고 풀어보는 자리를 함께 기획합니다."
              : "As part of the Beyond Deploy organizing team, I exchange experiences with people building and deploying AI in the field, and help create places to work through real problems."}
          </p>
          <Link href="https://beyonddeploy.kr/" className="text-link">
            Beyond Deploy
            <Arrow external />
          </Link>
        </div>
        <article className="event">
          <div className="event-top">
            <span className="event-status">{status}</span>
            <span>2026.12.05 SAT</span>
          </div>
          <h3>
            FDE<span>톤</span>
          </h3>
          <p className="event-subtitle">
            {kr
              ? "고객의 말에서 문제를 찾고, 직접 만들고, 피칭까지."
              : "Find the problem. Build a solution. Make your case."}
          </p>
          <p>
            {kr
              ? "복잡한 고객 상황을 재현한 시나리오에서 문제 정의부터 구현까지 경험하는 해커톤입니다. 운영진으로 기획에 참여합니다."
              : "A hackathon where teams define problems and build solutions in scenarios that recreate the complexity of client work. I am a contributing organizer."}
          </p>
          <dl className="event-details">
            <div>
              <dt>{kr ? "장소 / 시간" : "Where & when"}</dt>
              <dd>
                {kr
                  ? "서강대학교 / 13:00–18:00"
                  : "Sogang University / 13:00–18:00 KST"}
              </dd>
            </div>
            <div>
              <dt>{kr ? "참가" : "Entry"}</dt>
              <dd>
                {kr
                  ? "개인 또는 1–3인 팀 / 참가비 무료"
                  : "Individuals or teams of 1–3 / Free"}
              </dd>
            </div>
            <div>
              <dt>{kr ? "상금" : "Prizes"}</dt>
              <dd>{kr ? "총 200만원" : "KRW 2,000,000 total"}</dd>
            </div>
            {open && (
              <div>
                <dt>{kr ? "신청 마감" : "Apply by"}</dt>
                <dd>{kr ? "11월 15일 23:59" : "November 15, 23:59 KST"}</dd>
              </div>
            )}
          </dl>
          <Link href="https://fdethon.beyonddeploy.kr/" className="event-link">
            {open
              ? kr
                ? "FDE톤 알아보고 신청하기"
                : "Explore FDEthon & apply"
              : kr
                ? "FDE톤 행사 안내"
                : "FDEthon event details"}
            <Arrow external />
          </Link>
          <p className="event-credit">
            Beyond Deploy × InsideAnswer /{" "}
            {kr ? "기획 참여" : "Contributing organizer"}
          </p>
        </article>
      </div>
    </section>
  );
}

export function About() {
  const { lang } = useLang();
  const kr = lang === "kr";
  return (
    <section id="about" className="about shell">
      <div className="about-copy">
        <h2>
          {kr
            ? "전략을 하다가, 직접 만들게 되었습니다."
            : "Strategy led me to building."}
        </h2>
        <p>
          {kr
            ? "SK On에서 전략기획을 하며 AI를 업무에 적용하기 시작했습니다. 이후 Praxis를 통해 독립적으로 AX 프로젝트를 수행했고, Arkpoint에서 Enterprise AX 사업을 이끄는 일로 넓혀가고 있습니다."
            : "I began applying AI to work while in corporate strategy at SK On. I went on to deliver independent AX projects through Praxis, and am expanding this work into Enterprise AX leadership at Arkpoint."}
        </p>
        <p>
          {kr
            ? "서울대학교에서 경제학과 과학기술학을 공부했습니다. 사업이 성립하는 조건과 기술이 사람의 일에 들어오는 방식에 관심이 있습니다."
            : "I studied Economics and Science & Technology Studies at Seoul National University. I am interested in what makes a business work, and how technology becomes part of people’s working lives."}
        </p>
        <Link
          href="https://www.linkedin.com/in/yaechan-lee/"
          className="text-link"
        >
          {kr ? "LinkedIn에서 더 보기" : "More on LinkedIn"}
          <Arrow external />
        </Link>
      </div>
      <aside className="sayu-note">
        <div className="sayu-animals">
          <img
            src="/images/sayu/laef-fox.webp"
            alt=""
            width="160"
            height="160"
            loading="lazy"
          />
          <img
            src="/images/sayu/laec-cat.webp"
            alt=""
            width="160"
            height="160"
            loading="lazy"
          />
          <img
            src="/images/sayu/lamf-owl.webp"
            alt=""
            width="160"
            height="160"
            loading="lazy"
          />
        </div>
        <div className="project-heading">
          <h3>SAYU</h3>
          <span>{kr ? "프로젝트 기록" : "Project archive"}</span>
        </div>
        <p>
          {kr
            ? "미술을 좋아합니다. 취향과 감정에서 출발해 작품을 만나는 AI 큐레이션 프로젝트 SAYU를 만들었고, 큐레이팅스쿨서울에서도 공부했습니다. 일 밖의 관심이 다음에 만들 것을 넓혀줍니다."
            : "I like art. I built SAYU, an AI curation project that starts with taste and feeling, and studied at Curating School Seoul. Interests outside work make room for the next thing to build."}
        </p>
      </aside>
    </section>
  );
}
export function Contact() {
  const { lang } = useLang();
  const kr = lang === "kr";
  const options = [
    {
      id: "project-contact",
      title: kr ? "프로젝트 문의" : "Discuss a project",
      body: kr
        ? "반복되는 업무, 풀리지 않는 문제, AI를 적용하고 싶은 현장에 관해 이야기해 주세요."
        : "Tell me about a recurring workflow, an unresolved problem, or a team ready to put AI to work.",
      action: kr ? "프로젝트 이야기 보내기" : "Email about a project",
      subject: kr ? "AX 프로젝트 문의" : "AX project inquiry",
      event: "project",
    },
    {
      id: "collaborate-contact",
      title: kr ? "함께 만들기" : "Build together",
      body: kr
        ? "같이 만들 아이디어, 현장에서 얻은 경험, 커뮤니티에서 나누고 싶은 이야기도 반갑습니다."
        : "Have an idea to build together, a field experience to share, or something to contribute to the community? I would like to hear it.",
      action: kr ? "함께할 이야기 보내기" : "Email about collaborating",
      subject: kr ? "함께 만들고 싶은 일" : "Let’s build together",
      event: "collaborate",
    },
  ];
  return (
    <section id="contact" className="contact">
      <div className="shell">
        <h2>{kr ? "다음 이야기는, 함께." : "The next chapter, together."}</h2>
        <div className="contact-options">
          {options.map((option) => (
            <div key={option.id} id={option.id}>
              <h3>{option.title}</h3>
              <p>{option.body}</p>
              <a
                className="contact-action"
                href={`mailto:yclee913@gmail.com?subject=${encodeURIComponent(option.subject)}`}
                onClick={() => track("contact_click", { intent: option.event })}
              >
                {option.action}
                <Arrow />
              </a>
            </div>
          ))}
        </div>
        <div className="contact-bottom">
          <a href="mailto:yclee913@gmail.com">yclee913@gmail.com</a>
          <Link
            href="https://calendly.com/yclee913/15-min-meeting"
            onClick={() => track("calendly_click", { location: "contact" })}
          >
            {kr ? "15분 대화 예약" : "Book a 15-minute chat"}
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
