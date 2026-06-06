"use client"

import { motion } from "framer-motion"
import { BarChart3, Bot, ShieldCheck, Zap } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Smart Comparison",
    description: "Compare prices, hotels, meals, and itineraries side-by-side from multiple travel companies.",
    color: "from-blue-500 to-cyan-500"
  },
  {
    icon: Bot,
    title: "AI Travel Advisor",
    description: "Get personalized recommendations based on your budget, preferences, and travel style.",
    color: "from-purple-500 to-pink-500"
  },
  {
    icon: ShieldCheck,
    title: "Trusted Reviews",
    description: "Real reviews and trust scores help you choose reliable travel companies with confidence.",
    color: "from-emerald-500 to-teal-500"
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as any },
  },
}

export function FeaturesSection() {
  return (
    <section className="relative py-10 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div 
          className="mx-auto mb-12 max-w-3xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-4 py-1.5 text-sm font-semibold text-violet-400">
            <Zap className="h-4 w-4" />
            <span>Advanced Features</span>
          </div>
          <h2 className="mb-6 text-4xl font-bold tracking-tight text-white md:text-5xl lg:text-6xl">
            Experience the <span className="gradient-text italic">Future</span> of Travel
          </h2>
          <p className="text-lg text-slate-400 md:text-xl">
            Our neural-powered platform redefines how you plan, compare, and book your next journey.
          </p>
        </motion.div>

        <motion.div 
          className="grid gap-8 md:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative"
            >
              <div className="glass-dark glow-hover h-full rounded-3xl p-8 border border-white/5 transition-all duration-500">
                {/* Icon with glow background */}
                <div className={`mb-8 relative flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.color} p-4 shadow-lg group-hover:scale-110 transition-transform duration-500`}>
                  <feature.icon className="h-8 w-8 text-white" />
                  <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.color} blur-xl opacity-40 group-hover:opacity-60 transition-opacity`} />
                </div>
                
                <h3 className="mb-4 text-2xl font-bold text-white group-hover:text-amber-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[#FAF4E8]/60 leading-relaxed text-lg">
                  {feature.description}
                </p>

                {/* Corner detail */}
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                   <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
