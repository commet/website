import { lazy, Suspense, useEffect } from "react";
import { Analytics } from "@vercel/analytics/react";
import { LangProvider, useLang } from "./LangContext";
import {
  Nav,
  Hero,
  Evidence,
  SelectedWork,
  Community,
  About,
  Contact,
  Footer,
} from "./components/Site";
import Notes from "./components/Notes";
const CaseStudy = lazy(() => import("./components/CaseStudy"));
const path = window.location.pathname.replace(/\/$/, "") || "/";
const caseId =
  path === "/case-study/fsk"
    ? "fsk"
    : path === "/case-study/strix"
      ? "strix"
      : null;
function Page() {
  const { lang } = useLang();
  useEffect(() => {
    // The browser may resolve an incoming section link before React mounts it.
    if (caseId || path !== "/") return;
    const target = window.location.hash.slice(1);
    if (target) document.getElementById(target)?.scrollIntoView({ behavior: "instant" });
  }, []);
  useEffect(() => {
    document.title = `${caseId ? `${caseId.toUpperCase()} / ` : ""}${lang === "kr" ? "이예찬 | AI 사업과 제품 개발" : "Yaechan Lee | Enterprise AI and product development"}`;
    const descriptions = {
      fsk: lang === "kr"
        ? "물류기업 FSK L&S의 운송 관제와 서류 처리. 출고 지연이 도착에 미치는 영향, 도착 예측 보정, 서류 판독에서 주문 승인까지의 설계와 구현."
        : "Shipment monitoring and document processing for FSK L&S: release delays and arrival, corrected arrival estimates, and document review through order approval.",
      strix: lang === "kr"
        ? "SK On 전략기획팀의 AI 지식 시스템 STRIX. 개발부터 보안 협의, 경영진 설명, 사용자 교육과 사내 확산까지."
        : "STRIX, an AI knowledge system for the SK On strategy team, from development to security review, executive briefings, training, and rollout.",
    };
    const description = document.querySelector('meta[name="description"]');
    if (description) {
      description.dataset.home ||= description.content;
      description.content = caseId ? descriptions[caseId] : description.dataset.home;
    }
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical)
      canonical.href = `https://yclee.today${caseId ? `/case-study/${caseId}` : "/"}`;
  }, [lang]);
  return (
    <>
      <a className="skip-link" href="#main">
        {lang === "kr" ? "본문으로 건너뛰기" : "Skip to content"}
      </a>
      <Nav />
      <main id="main">
        {caseId ? (
          <Suspense
            fallback={
              <div className="shell route-loading" role="status">
                {lang === "kr"
                  ? "사례를 불러오고 있습니다."
                  : "Loading the case study."}
              </div>
            }
          >
            <CaseStudy id={caseId} />
          </Suspense>
        ) : path === "/" ? (
          <>
            <Hero />
            <Evidence />
            <SelectedWork />
            <Community />
            <Notes />
            <About />
          </>
        ) : (
          <section className="shell not-found">
            <h1>
              {lang === "kr"
                ? "이 페이지를 찾을 수 없습니다."
                : "This page could not be found."}
            </h1>
            <a href="/">{lang === "kr" ? "홈으로 돌아가기" : "Return home"}</a>
          </section>
        )}
      </main>
      <Contact />
      <Footer />
      <Analytics />
    </>
  );
}
export default function App() {
  return (
    <LangProvider>
      <Page />
    </LangProvider>
  );
}
