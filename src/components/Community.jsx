import { motion } from 'framer-motion'

const activities = [
  {
    title: 'Claude Code Meetup Seoul',
    detail: 'FDE Night 공동 호스팅',
  },
  {
    title: 'Claude Community Ambassador',
    detail: null,
  },
  {
    title: '큐레이팅스쿨서울 정회원',
    detail: '박서보재단',
  },
]

export default function Community() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          className="flex items-end justify-between mb-14 border-b border-stone-200 pb-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-stone-900 tracking-tight">
            함께하는 곳
          </h2>
          <span className="font-serif italic text-base text-stone-400 hidden md:block">
            Community
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.map((activity, i) => (
            <motion.div
              key={activity.title}
              className="py-6 px-5 rounded-xl bg-white/60 border border-stone-200/40"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{
                boxShadow: '0 1px 3px rgba(0,0,0,0.02)',
              }}
            >
              <span className="block text-base text-stone-800 font-medium mb-1">
                {activity.title}
              </span>
              {activity.detail && (
                <span className="text-[13px] text-stone-400">
                  {activity.detail}
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
