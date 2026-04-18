import { motion } from 'framer-motion'
import ProjectCard from './ProjectCard'

const projects = [
  {
    name: 'STRIX',
    subtitle: 'Enterprise RAG System',
    description: [
      'SK On 전략기획실을 위한 LLM 기반 지식 시스템.',
      '비개발자가 설계하고, 600명 이상이 사용했습니다.',
      'SK그룹 mySUNI Best Practice로 선정.',
    ],
    tags: ['Claude API', 'LangChain', 'Enterprise'],
    link: null,
  },
  {
    name: 'SAYU',
    subtitle: 'AI Art Curation',
    description: [
      '당신의 취향을 이해하는 16명의 AI 큐레이터.',
      '5,000점의 작품과 12,000개의 전시 데이터.',
      '200명 이상이 자신만의 아트 여정을 시작했습니다.',
    ],
    tags: ['Claude API', 'Curation', 'Personalization'],
    link: { label: '경험하기', href: '#' },
  },
  {
    name: 'Overture',
    subtitle: 'AI Harness Engineering',
    description: [
      '개발자도 기획을, PM도 개발을 이해해야 하는 시대.',
      '익숙하지 않은 영역에서도 길을 잃지 않고',
      '목적지에 도착하도록 돕는 도구.',
    ],
    quote: [
      '"생각이 뭉툭하면 AI를 다룰 수 없다.',
      'Overture는 생각을 뾰족하게 만든다."',
    ],
    tags: ['Claude Code', 'Meta-cognition', 'Strategic Thinking'],
    link: { label: '시작하기', href: '#' },
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-32 md:py-44 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <motion.div
          className="flex items-end justify-between mb-20 md:mb-28 border-b border-stone-200 pb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
              만든 것들
            </h2>
          </div>
          <span className="font-serif italic text-base text-stone-400 hidden md:block">
            Projects
          </span>
        </motion.div>

        {/* Project cards */}
        <div className="space-y-28 md:space-y-40">
          {projects.map((project, i) => (
            <ProjectCard key={project.name} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
