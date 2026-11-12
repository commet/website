import links from "../writing-links.json";
import { useLang } from "../LangContext";
import { Arrow, Link } from "./Site";
const titles = {
  kr: [
    "회사 안에서 받는 AI 요청들: 제약을 설계 입력값으로",
    "‘어떻게 만드는가’의 시대가 끝나고 있습니다",
    "비개발자가 Claude Code 해커톤에 갔다 온 이야기",
  ],
  en: [
    "AI that gets used: constraints as design input",
    "The era of “how to build” is ending",
    "A non-developer at a Claude Code hackathon",
  ],
};
export default function Notes() {
  const { lang } = useLang();
  return (
    <section id="writing" className="notes shell">
      <div className="section-bar">
        <h2>{lang === "kr" ? "글과 기록" : "Writing & notes"}</h2>
        <Link href="https://www.linkedin.com/in/yaechan-lee/recent-activity/all/">
          {lang === "kr" ? "LinkedIn 활동" : "LinkedIn activity"}
          <Arrow external />
        </Link>
      </div>
      <div className="notes-list">
        {links.map((post, i) => (
          <Link href={post.href} key={post.href} className="note-row">
            <img
              src={post.image}
              alt=""
              width="120"
              height="84"
              loading="lazy"
            />
            <h3>{titles[lang][i]}</h3>
            <span>LinkedIn</span>
            <Arrow external />
          </Link>
        ))}
      </div>
    </section>
  );
}
