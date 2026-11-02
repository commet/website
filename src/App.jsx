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
    document.title = `${caseId ? `${caseId.toUpperCase()} / ` : ""}${lang === "kr" ? "이예찬 | AX 사업과 제품을 만듭니다" : "Yaechan Lee | AX leadership & building"}`;
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
