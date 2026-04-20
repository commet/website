import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { track } from '@vercel/analytics'
import { useLang } from '../LangContext'
import { navigate } from '../navigate'

const t = {
  en: {
    eyebrow: 'Case Study',
    back: '← Back to portfolio',
    langLabel: 'KR',
    title: 'STRIX',
    tagline: 'Deploying Claude inside a regulated Korean enterprise',
    meta: 'SK On · 2024 · Enterprise RAG · 5 min read',
    tldr: 'How I rolled out an LLM knowledge system to 600+ users in a division governed by National Core Technology regulations — on-premise, inside the tools people already lived in, with executive buy-in earned by reframing cost.',
    s1: {
      label: '01 — Situation',
      body: [
        `SK On is one of the world's top-three EV battery manufacturers. Its Strategy Division owns portfolio decisions, business valuation, and competitive intelligence — work that turns on thousands of dense internal documents every month.`,
        `LLMs were the obvious unlock. But SK On's battery technology is designated 국가핵심기술 (National Core Technology) under Korean law — subject to National Intelligence Service oversight and formal audit. "Just use ChatGPT" was never a real option. A system had to be built from inside the boundary.`,
      ],
    },
    s2: {
      label: '02 — Stakeholder map',
      intro: 'Five groups had to say yes. Each had a different reason to say no.',
      headers: { group: 'Group', want: 'What they wanted', block: 'Why they might block' },
      rows: [
        { group: 'Strategy Division leadership', want: 'Productivity unlock for analysts', block: 'Reputational risk if regulated data leaks' },
        { group: 'Information Security Office', want: 'Clean NIS audit posture', block: 'Default answer to external AI: no' },
        { group: 'IT Infrastructure', want: 'Maintainable, boring systems', block: 'Would inherit ongoing ops burden' },
        { group: 'Legal', want: 'Defensible posture on regulated data', block: 'Liability when data leaves the boundary' },
        { group: 'C-suite / CEO', want: 'Risk-adjusted ROI, unambiguous', block: 'Would not sign without clean economics' },
      ],
    },
    s3: {
      label: '03 — Objections, as raised in the security review',
      intro: 'Three questions the review actually asked. I kept them in my notes verbatim:',
      items: [
        'Battery internal data is designated National Core Technology and subject to NIS audit. How do we guarantee nothing leaves our boundary? Is this truly on-premise?',
        'The Strategy Division holds materials across multiple classification tiers. How does the system handle permission scoping?',
        'Who is responsible for deployment uptime and DB integrity, sustained over time?',
      ],
    },
    s4: {
      label: '04 — Resolution',
      secHead: 'Clearing the security review',
      sec: [
        { title: 'Data boundary', body: `Architected as on-premise RAG. No Strategy Division data left the SK On network; every LLM call was proxied through an internal gateway. This was the only architecture Information Security would sign.` },
        { title: 'Permission scoping', body: `Mirrored the existing document classification tiers into the RAG index, so retrieval respected what each user was already cleared to read. I didn't invent a new permissions model — I extended the one IT already owned. Less net-new risk surface, less political friction.` },
        { title: 'Operations', body: `Handed DB and uptime ownership to IT Infrastructure with a maintenance runbook. I fought the instinct to keep everything under my control. The operating model had to survive my departure — otherwise it wasn't a system, it was a project.` },
      ],
      execHead: 'Winning the CEO',
      execIntro: 'The executive pitch deliberately avoided the "AI transformation" narrative. Three moves instead:',
      exec: [
        { title: 'Met users where they already were', body: `Built VBA macros so Claude was callable from inside Excel, Word, and Outlook — the three apps analysts actually lived in all day. The internal LLM API was wired into familiar ribbons and right-click menus. Zero new tool to learn, zero onboarding cost. Adoption friction dropped to near zero because nothing changed about how people worked, only what they could finish.` },
        { title: 'Reframed the cost', body: `Not a SaaS with annual license inflation — a one-time DB build-out, after which marginal cost was negligible. Positioned as infrastructure, not software. CFO language, not CTO language.` },
        { title: 'Led with risk posture, not model capability', body: `What a regulated Korean enterprise buys first is risk posture. Capability is the unlock on the other side. I opened the CEO presentation with the on-premise architecture and the NIS-aligned governance story — model benchmarks came second, and briefly.` },
      ],
    },
    s5: {
      label: '05 — Outcome',
      funnelIntro: 'A funnel, not a single headline number:',
      metrics: [
        { num: '1,000+', label: 'SK Group employees aware', sub: 'Featured on mySUNI (SK Group\'s internal learning platform) as a Best Practice case' },
        { num: '600+', label: 'Registered users', sub: 'Across SK On' },
        { num: '~30', label: 'Daily active users', sub: 'Inside Strategy Division — adopted as standard workflow' },
        { num: 'CEO', label: 'Executive visibility', sub: 'Presented to CEO and C-level as a Best Practice case' },
      ],
      quote: '"What takes me a week, I can actually finish in an hour with this. Keep making it better."',
      cite: '— Strategy Team Lead, SK On',
      honestLabel: 'Honest limits',
      honest: `The internal environment didn't expose dwell-time or query-frequency instrumentation, so I can't report average session length or retention curves. What I can report is that the team lead kept asking for the next feature — and that is the adoption signal I trust most. When a buyer asks you to keep going, they've bought.`,
      evidenceCaption: 'Featured on SK Group mySUNI as a Best Practice case',
    },
    s6: {
      label: '06 — What transferred',
      intro: 'Three patterns I took from STRIX that apply directly to how Anthropic sells into Korean enterprises:',
      items: [
        'Korean enterprises buy risk posture first, capability second. Lead with the governance story; let the benchmarks follow.',
        'Adoption happens when AI lives inside existing tools, not in a new tab. The office suite is not legacy — it is the terrain.',
        'CapEx framing moves CFOs faster than ROI framing. Infrastructure gets signed; SaaS gets deferred.',
      ],
    },
    cta: {
      prompt: 'Want to go deeper on any of this?',
      mail: 'Talk to me',
      mailHref: 'mailto:yclee913@gmail.com?subject=STRIX%20case%20study',
      back: '← Back to portfolio',
    },
  },
  kr: {
    eyebrow: 'Case Study',
    back: '← 포트폴리오로 돌아가기',
    langLabel: 'EN',
    title: 'STRIX',
    tagline: '규제 받는 한국 엔터프라이즈 내부에 Claude를 배포한 기록',
    meta: 'SK On · 2024 · Enterprise RAG · 5분 분량',
    tldr: '국가핵심기술 규제 하의 600명+ 조직에, Claude를 온프레미스로 — 사용자가 이미 쓰는 도구 안에서 — 배포하고, 비용을 재정의해 경영진 승인을 받아낸 프로젝트.',
    s1: {
      label: '01 — 상황',
      body: [
        `SK On은 세계 Top 3 EV 배터리 제조사. 전략기획본부는 포트폴리오 의사결정, 기업가치 평가, 경쟁정보 분석을 담당 — 매달 수천 건의 무거운 내부 문서를 뒤지는 일이 구조적으로 발생합니다.`,
        `LLM은 당연한 해법이었습니다. 하지만 SK On의 배터리 기술은 **국가핵심기술**로 지정되어 국정원 감시와 공식 감사를 받습니다. "ChatGPT 쓰자"는 실질적 선택지가 아니었습니다. 경계 안쪽에서 처음부터 설계해야 했습니다.`,
      ],
    },
    s2: {
      label: '02 — 이해관계자 지도',
      intro: '5개 그룹이 각기 다른 이유로 No를 말할 수 있는 구조였습니다.',
      headers: { group: '그룹', want: '원하는 것', block: '막을 수 있는 이유' },
      rows: [
        { group: '전략기획본부 리더십', want: '애널리스트 생산성 해금', block: '규제 데이터 리스크로 인한 평판 훼손' },
        { group: '정보보안팀', want: '국정원 감사 대응 태세', block: '외부 AI에 대한 기본값: 불가' },
        { group: 'IT 인프라', want: '유지보수 가능한 지루한 시스템', block: '운영 부담이 자기 쪽으로 전이됨' },
        { group: '법무', want: '규제 데이터에 대한 방어 가능한 포지션', block: '데이터가 경계 밖으로 나가는 순간의 책임' },
        { group: 'C-suite / CEO', want: '명확한 리스크 조정 ROI', block: '깔끔한 경제학 없이는 서명 불가' },
      ],
    },
    s3: {
      label: '03 — 보안심사에서 실제 제기된 반대',
      intro: '심사에서 실제로 나온 세 가지 질문. 기록 그대로 남겼습니다:',
      items: [
        '배터리 내부 정보는 국가핵심기술로 지정되어 국정원 감사 대상이다. 외부로 유출되지 않는다는 것을 어떻게 보장하나? 온프레미스 맞는가?',
        '전략기획본부는 다양한 보안 등급의 자료를 보유한다. 권한 관리는 어떻게 하나?',
        '배포 유지와 DB 관리를 시간에 걸쳐 안정적으로 누가 책임지나?',
      ],
    },
    s4: {
      label: '04 — 돌파',
      secHead: '보안심사 통과',
      sec: [
        { title: '데이터 경계', body: `온프레미스 RAG로 설계. 전략기획본부의 어떤 데이터도 SK On 네트워크 밖으로 나가지 않음. 모든 LLM 호출은 내부 게이트웨이를 통한 프록시. 정보보안팀이 승인한 유일한 아키텍처였습니다.` },
        { title: '권한 스코핑', body: `기존 문서 분류 등급을 RAG 인덱스에 그대로 미러링. 검색은 사용자가 이미 열람 권한을 가진 문서만 되돌려줬습니다. 새 권한 모델을 발명하지 않고, IT가 이미 소유·운영하던 모델을 확장했습니다. 순증 리스크 표면이 작고, 정치적 마찰도 적었습니다.` },
        { title: '운영', body: `DB와 가동시간 책임을 IT 인프라에 이관하고 유지보수 런북을 작성했습니다. 모든 것을 제 손에 쥐고 싶은 본능을 의도적으로 눌렀습니다. 운영 모델은 제가 떠나도 살아남아야 — 그래야 시스템이지, 안 그러면 프로젝트입니다.` },
      ],
      execHead: 'CEO 설득',
      execIntro: '경영진 피치에서는 "AI 전환" 서사를 의도적으로 피했습니다. 대신 세 가지 움직임:',
      exec: [
        { title: '사용자가 이미 있는 곳에서 만남', body: `VBA 매크로로 Claude를 Excel, Word, Outlook 안에서 호출 가능하게 구현 — 애널리스트가 하루 종일 머무는 세 개의 앱. 사내 LLM API를 익숙한 리본과 우클릭 메뉴에 연결했습니다. 새로 배울 도구가 없고 온보딩 비용이 0. 사람들의 일하는 방식은 바뀌지 않았고, 할 수 있는 일만 바뀌었기 때문에 도입 마찰이 거의 0에 수렴했습니다.` },
        { title: '비용 재정의', body: `매년 라이선스가 인플레되는 SaaS가 아니라, 일회성 DB 구축 이후 한계비용이 미미한 투자. SaaS가 아니라 인프라로 포지셔닝했습니다. CTO 언어가 아니라 CFO 언어로.` },
        { title: '성능이 아니라 리스크 포스처를 먼저', body: `규제받는 한국 엔터프라이즈가 가장 먼저 사는 것은 성능이 아니라 리스크 포스처입니다. 성능은 그 반대편에 있는 해금입니다. CEO 프레젠테이션은 온프레미스 아키텍처와 국정원 정합적 거버넌스 서사로 시작했습니다. 모델 벤치마크는 뒤에, 짧게.` },
      ],
    },
    s5: {
      label: '05 — 결과',
      funnelIntro: '단일 헤드라인 숫자가 아니라 퍼널로 보기:',
      metrics: [
        { num: '1,000+', label: 'SK 그룹 임직원 인지', sub: 'mySUNI(SK 그룹 사내 학습 플랫폼)에 Best Practice 사례로 게시' },
        { num: '600+', label: '등록 사용자', sub: 'SK On 전사' },
        { num: '~30', label: '일일 활성 사용자', sub: '전략기획본부에서 표준 워크플로우로 정착' },
        { num: 'CEO', label: '경영진 가시성', sub: 'CEO 및 C-level 대상 Best Practice 사례로 발표' },
      ],
      quote: '"내가 일주일 걸릴 걸 이걸 통해서 하면 1시간이면 진짜로 다 가능하네. 더 고도화해줘."',
      cite: '— 전략팀 팀장, SK On',
      honestLabel: '정직한 한계',
      honest: `내부 환경 특성상 체류시간이나 쿼리 빈도 계측에 접근할 수 없었습니다. 평균 세션 길이나 리텐션 곡선은 말씀드릴 수 없습니다. 다만 팀장이 계속 다음 기능을 요청했다는 사실 — 그것이 제가 가장 신뢰하는 도입 시그널입니다. 구매자가 "계속 해달라"고 말하는 순간, 이미 도입은 끝난 것입니다.`,
      evidenceCaption: 'SK 그룹 mySUNI에 Best Practice 사례로 게시',
    },
    s6: {
      label: '06 — 전이 가능한 것',
      intro: 'Anthropic이 한국 엔터프라이즈를 공략할 때 바로 적용되는 세 가지 패턴을 STRIX에서 가져갑니다:',
      items: [
        '한국 엔터프라이즈는 성능이 아니라 리스크 포스처를 먼저 삽니다. 거버넌스 서사를 앞세우고, 벤치마크는 뒤에 배치하세요.',
        '도입은 AI가 새 탭이 아니라 기존 도구 안에 살 때 일어납니다. 오피스 스위트는 레거시가 아니라 지형(terrain)입니다.',
        'CFO는 ROI 서사보다 CapEx 재정의에 더 빨리 움직입니다. 인프라는 서명되고 SaaS는 유예됩니다.',
      ],
    },
    cta: {
      prompt: '어느 부분이든 더 파고들어 보실래요?',
      mail: '이야기 나누기',
      mailHref: 'mailto:yclee913@gmail.com?subject=STRIX%20%EC%BC%80%EC%9D%B4%EC%8A%A4%20%EC%8A%A4%ED%84%B0%EB%94%94',
      back: '← 포트폴리오로 돌아가기',
    },
  },
}

function Section({ label, children }) {
  return (
    <motion.section
      className="py-10 md:py-14 border-t border-stone-200"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-[11px] text-stone-400 uppercase tracking-[0.22em] mb-6">{label}</div>
      {children}
    </motion.section>
  )
}

export default function CaseStudyStrix() {
  const { lang, setLang } = useLang()
  const c = t[lang]

  useEffect(() => {
    document.title = lang === 'en'
      ? 'STRIX Case Study — Yaechan Lee'
      : 'STRIX 케이스 스터디 — 이예찬'
    track('case_study_view', { study: 'strix', lang })
    return () => {
      document.title = 'Yaechan Lee — Enterprise AI, Strategy, Curation'
    }
  }, [lang])

  const goBack = (e) => {
    e.preventDefault()
    track('case_study_back', { study: 'strix' })
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-warm-bg">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-[#FAFAF8]/85 backdrop-blur-xl border-b border-stone-200/60">
        <div className="max-w-[1100px] mx-auto px-6 md:px-10 h-12 flex items-center justify-between">
          <a
            href="/"
            onClick={goBack}
            className="text-[13px] text-stone-500 hover:text-stone-900 transition-colors no-underline"
          >
            {c.back}
          </a>
          <button
            onClick={() => {
              const next = lang === 'en' ? 'kr' : 'en'
              track('lang_toggle', { to: next, on: 'case_study' })
              setLang(next)
            }}
            className="text-[12px] text-stone-400 hover:text-stone-900 transition-colors tracking-wide border border-stone-200 rounded-md px-2 py-0.5 cursor-pointer bg-transparent"
          >
            {c.langLabel}
          </button>
        </div>
      </div>

      {/* Header */}
      <header className="px-6 md:px-10 pt-14 md:pt-20 pb-10">
        <div className="max-w-[1100px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-[12px] text-accent uppercase tracking-[0.22em] mb-5">{c.eyebrow}</p>
            <h1 className="text-[clamp(2.4rem,6vw,4.6rem)] font-bold text-stone-900 tracking-[-0.04em] leading-[1.02]">
              {c.title}
            </h1>
            <p className="font-serif italic text-stone-600 text-[clamp(1.1rem,2vw,1.4rem)] mt-3 leading-snug">
              {c.tagline}
            </p>
            <p className="text-[13px] text-stone-400 mt-4 tracking-wide">{c.meta}</p>
          </motion.div>

          <motion.p
            className="text-[17px] md:text-[19px] text-stone-800 leading-[1.65] max-w-[760px] mt-10 pt-8 border-t border-stone-200"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            {c.tldr}
          </motion.p>
        </div>
      </header>

      <main className="px-6 md:px-10">
        <div className="max-w-[1100px] mx-auto">

          {/* 01 Situation */}
          <Section label={c.s1.label}>
            <div className="max-w-[760px] space-y-5">
              {c.s1.body.map((p, i) => (
                <p key={i} className="text-[16px] text-stone-700 leading-[1.8]">{p}</p>
              ))}
            </div>
          </Section>

          {/* 02 Stakeholder map */}
          <Section label={c.s2.label}>
            <p className="text-[16px] text-stone-700 leading-[1.8] max-w-[760px] mb-8">{c.s2.intro}</p>
            <div className="border-t border-stone-200">
              <div className="hidden md:grid grid-cols-12 gap-4 py-3 text-[11px] uppercase tracking-[0.2em] text-stone-400">
                <div className="col-span-4">{c.s2.headers.group}</div>
                <div className="col-span-4">{c.s2.headers.want}</div>
                <div className="col-span-4">{c.s2.headers.block}</div>
              </div>
              {c.s2.rows.map((r) => (
                <div key={r.group} className="grid grid-cols-1 md:grid-cols-12 gap-2 md:gap-4 py-5 border-t border-stone-200">
                  <div className="md:col-span-4 text-[15px] font-medium text-stone-900">{r.group}</div>
                  <div className="md:col-span-4 text-[14px] text-stone-600 leading-relaxed">{r.want}</div>
                  <div className="md:col-span-4 text-[14px] text-stone-500 leading-relaxed">{r.block}</div>
                </div>
              ))}
            </div>
          </Section>

          {/* 03 Objections */}
          <Section label={c.s3.label}>
            <p className="text-[16px] text-stone-700 leading-[1.8] max-w-[760px] mb-8">{c.s3.intro}</p>
            <div className="space-y-6 max-w-[820px]">
              {c.s3.items.map((q, i) => (
                <blockquote key={i} className="border-l-2 border-accent/50 pl-5 py-1">
                  <span className="text-[11px] text-stone-400 uppercase tracking-[0.2em] block mb-2">
                    {lang === 'en' ? `Q${i+1}` : `질문 ${i+1}`}
                  </span>
                  <p className="text-[16px] text-stone-800 italic leading-[1.7]">"{q}"</p>
                </blockquote>
              ))}
            </div>
          </Section>

          {/* 04 Resolution */}
          <Section label={c.s4.label}>
            {/* Security */}
            <div className="mb-14">
              <h3 className="text-[20px] md:text-[22px] font-semibold text-stone-900 tracking-[-0.02em] mb-6">{c.s4.secHead}</h3>
              <div className="border-t border-stone-200">
                {c.s4.sec.map((item) => (
                  <div key={item.title} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 border-b border-stone-200">
                    <div className="md:col-span-3 text-[14px] text-accent font-medium">{item.title}</div>
                    <div className="md:col-span-9 text-[15px] text-stone-700 leading-[1.8]">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Executive */}
            <div>
              <h3 className="text-[20px] md:text-[22px] font-semibold text-stone-900 tracking-[-0.02em] mb-4">{c.s4.execHead}</h3>
              <p className="text-[16px] text-stone-700 leading-[1.8] max-w-[760px] mb-6">{c.s4.execIntro}</p>
              <div className="border-t border-stone-200">
                {c.s4.exec.map((item) => (
                  <div key={item.title} className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 py-6 border-b border-stone-200">
                    <div className="md:col-span-3 text-[14px] text-accent font-medium">{item.title}</div>
                    <div className="md:col-span-9 text-[15px] text-stone-700 leading-[1.8]">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </Section>

          {/* 05 Outcome */}
          <Section label={c.s5.label}>
            <p className="text-[16px] text-stone-700 leading-[1.8] max-w-[760px] mb-8">{c.s5.funnelIntro}</p>

            <div className="grid grid-cols-1 md:grid-cols-4 border-t border-stone-200">
              {c.s5.metrics.map((m, i) => (
                <div
                  key={m.label}
                  className={`py-6 pr-5 ${i > 0 ? 'md:border-l md:border-stone-200 md:pl-6' : ''} ${i > 0 ? 'border-t md:border-t-0 border-stone-200' : ''}`}
                >
                  <span className="text-[26px] md:text-[32px] font-bold text-stone-900 tracking-tight block leading-none">{m.num}</span>
                  <span className="text-[13px] text-stone-700 block mt-2 font-medium">{m.label}</span>
                  <span className="text-[12px] text-stone-400 leading-snug block mt-2">{m.sub}</span>
                </div>
              ))}
            </div>

            {/* Evidence image */}
            <div className="mt-10 rounded-2xl overflow-hidden border border-stone-200/60 bg-white max-w-[820px]">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-stone-100 bg-stone-50/50">
                <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                <div className="w-2.5 h-2.5 rounded-full bg-stone-200" />
                <span className="ml-3 text-[10px] text-stone-400 truncate">mysuni.sk.com</span>
              </div>
              <img src="/images/strix-video.jpeg" alt={c.s5.evidenceCaption} className="w-full h-auto block" />
              <div className="px-4 py-3 text-[12px] text-stone-400 border-t border-stone-100">{c.s5.evidenceCaption}</div>
            </div>

            {/* Quote */}
            <blockquote className="mt-12 max-w-[820px] border-l-2 border-accent pl-6 py-2">
              <p className="font-serif italic text-[20px] md:text-[24px] text-stone-800 leading-[1.55]">{c.s5.quote}</p>
              <cite className="text-[13px] text-stone-400 not-italic block mt-3">{c.s5.cite}</cite>
            </blockquote>

            {/* Honest limits */}
            <div className="mt-12 max-w-[820px] bg-cream/40 border border-stone-200/60 rounded-2xl p-6 md:p-8">
              <div className="text-[11px] text-stone-400 uppercase tracking-[0.2em] mb-3">{c.s5.honestLabel}</div>
              <p className="text-[15px] text-stone-700 leading-[1.8]">{c.s5.honest}</p>
            </div>
          </Section>

          {/* 06 What transferred */}
          <Section label={c.s6.label}>
            <p className="text-[16px] text-stone-700 leading-[1.8] max-w-[760px] mb-8">{c.s6.intro}</p>
            <ol className="space-y-6 max-w-[820px]">
              {c.s6.items.map((item, i) => (
                <li key={i} className="grid grid-cols-[auto_1fr] gap-5 items-baseline">
                  <span className="text-[13px] text-accent font-mono font-semibold">{String(i+1).padStart(2,'0')}</span>
                  <p className="text-[16px] md:text-[17px] text-stone-800 leading-[1.7]">{item}</p>
                </li>
              ))}
            </ol>
          </Section>

          {/* CTA */}
          <motion.section
            className="py-14 md:py-20 border-t border-stone-200"
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 max-w-[1100px]">
              <p className="text-[20px] md:text-[24px] text-stone-900 font-medium tracking-[-0.02em]">{c.cta.prompt}</p>
              <div className="flex items-center gap-6 text-[14px]">
                <a
                  href={c.cta.mailHref}
                  onClick={() => track('contact_click', { location: 'case_study_strix' })}
                  className="text-accent font-medium no-underline hover:text-stone-900 transition-colors"
                >
                  {c.cta.mail}
                </a>
                <a
                  href="/"
                  onClick={goBack}
                  className="text-stone-400 no-underline hover:text-stone-900 transition-colors"
                >
                  {c.cta.back}
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  )
}
