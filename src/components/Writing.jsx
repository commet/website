import { motion } from 'framer-motion'
import { useLang } from '../LangContext'

const posts = [
  {
    image: '/images/writing/claude-bloom.jpg',
    href: 'https://www.linkedin.com/posts/yaechan-lee_%EC%84%9C%EC%9A%B8-%EC%B2%AB-claude-%EB%B0%8B%EC%97%85-claude-bloom%EC%97%90-%EB%8B%A4%EB%85%80%EC%99%94%EC%8A%B5%EB%8B%88%EB%8B%A4-%ED%96%89%EC%82%AC-activity-7449832014997872640-ZO-9',
    title: {
      en: 'Claude Bloom: Blue and Bloom as two sides of the same moment',
      kr: 'Claude Bloom: 블루와 블룸은 같은 현상의 양면',
    },
  },
  {
    image: '/images/writing/mempalace.jpg',
    href: 'https://www.linkedin.com/posts/yaechan-lee_milla-jovovich-on-instagram-what-inspired-activity-7447302958331113473-gs0_',
    title: {
      en: 'Milla Jovovich pushed a repo to GitHub: MemPalace',
      kr: '배우 밀라 요보비치가 깃허브에 레포를 올렸습니다',
    },
  },
  {
    image: '/images/writing/how-to-build.jpg',
    href: 'https://www.linkedin.com/posts/yaechan-lee_%EC%96%B4%EB%96%BB%EA%B2%8C-%EB%A7%8C%EB%93%9C%EB%8A%94%EA%B0%80%EC%9D%98-%EC%8B%9C%EB%8C%80%EA%B0%80-%EB%81%9D%EB%82%98%EA%B3%A0-%EC%9E%88%EC%8A%B5%EB%8B%88%EB%8B%A4-%EB%AC%B4%EC%97%87%EC%9D%84-%EB%A7%8C%EB%93%A4%EC%96%B4%EC%95%BC-%ED%95%98%EB%8A%94%EC%A7%80-activity-7430835937057681409-_fWw',
    title: {
      en: "The era of 'how to build' is ending",
      kr: "'어떻게 만드는가'의 시대가 끝나고 있습니다",
    },
  },
  {
    image: '/images/writing/hackathon.jpg',
    href: 'https://www.linkedin.com/posts/yaechan-lee_%EB%B9%84%EA%B0%9C%EB%B0%9C%EC%9E%90%EA%B0%80-claude-code-%ED%95%B4%EC%BB%A4%ED%86%A4%EC%97%90-%EA%B0%94%EB%8B%A4-%EC%98%A8-%EC%9D%B4%EC%95%BC%EA%B8%B0-1-%EC%96%B4%EC%A0%9C-activity-7420867158911541248-DOsH',
    title: {
      en: 'A non-developer at a Claude Code hackathon',
      kr: '비개발자가 Claude Code 해커톤에 갔다 온 이야기',
    },
  },
  {
    image: '/images/writing/ai-requests.jpg',
    href: 'https://www.linkedin.com/posts/yaechan-lee_%EC%B5%9C%EA%B7%BC-%ED%9A%8C%EC%82%AC-%EC%95%88%EC%97%90%EC%84%9C-ai-%EA%B4%80%EB%A0%A8-%EC%9A%94%EC%B2%AD%EC%9D%84-%EA%BD%A4-%EC%9E%90%EC%A3%BC-%EB%B0%9B%EC%8A%B5%EB%8B%88%EB%8B%A4-%EB%8C%80%EB%B6%80%EB%B6%84%EC%9D%80-%EB%A9%8B%EC%A7%84-ai%EB%A5%BC-activity-7415686806999834624-Md0T',
    title: {
      en: 'AI that actually gets used: constraints as design input',
      kr: '회사 안에서 받는 AI 요청들: 제약을 설계 입력값으로',
    },
  },
]

const labels = {
  en: {
    section: 'Writing',
    subtitle: 'Notes on enterprise AI adoption, constraints as design input, and what AI changes about building.',
    platform: 'LinkedIn',
  },
  kr: {
    section: '글',
    subtitle: '엔터프라이즈 AI 도입, 제약을 설계 입력값으로, AI가 \'만들기\'에 일으키는 변화에 대한 기록.',
    platform: 'LinkedIn',
  },
}

export default function Writing() {
  const { lang } = useLang()
  const l = labels[lang]

  return (
    <section id="writing" className="py-14 md:py-20 px-6 md:px-10">
      <div className="max-w-[1200px] mx-auto">
        <motion.h2
          className="text-[12px] text-stone-400 uppercase tracking-[0.2em] mb-3"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          {l.section}
        </motion.h2>
        <motion.p
          className="font-serif italic text-stone-600 text-[16px] md:text-[17px] leading-[1.55] max-w-[760px] mb-8 md:mb-10"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {l.subtitle}
        </motion.p>

        {posts.map((p, i) => (
          <motion.a
            key={p.href}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 py-4 border-b border-stone-100 first:border-t no-underline"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.4 }}
          >
            <div className="flex-shrink-0 w-16 h-12 md:w-20 md:h-14 rounded overflow-hidden bg-stone-100">
              <img
                src={p.image}
                alt=""
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <span className="flex-1 min-w-0 text-[15px] text-stone-700 group-hover:text-accent transition-colors truncate font-medium">
              {p.title[lang]}
            </span>
            <div className="flex items-center gap-3 flex-shrink-0">
              <span className="text-[12px] text-stone-400 hidden md:block">{l.platform}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                className="text-stone-300 group-hover:text-accent transition-colors"><path d="M7 17L17 7M17 7H7M17 7v10" /></svg>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  )
}
