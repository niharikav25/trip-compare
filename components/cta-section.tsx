"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function CTASection() {
  return (
    <section className="relative py-10 md:py-12">
      <div className="container mx-auto px-4">
        <motion.div
          className="glass relative overflow-hidden rounded-[3rem] p-10 md:p-16 border border-white/10"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] as any }}
        >
          {/* Internal Glows */}
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-primary/20 blur-[100px]" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-accent/20 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-bold text-violet-300 backdrop-blur-md"
            >
              <Sparkles className="h-4 w-4" />
              <span>Ready for Takeoff?</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="mb-8 text-5xl font-bold tracking-tight text-white md:text-7xl"
            >
              Begin Your <br />
              <span className="gradient-text italic">Next Odyssey</span> Today.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mx-auto mb-12 max-w-2xl text-lg text-slate-400 md:text-xl lg:text-2xl"
            >
              The era of intelligent travel comparison is here. Join the vanguard of modern explorers and secure your perfect trip in seconds.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-col items-center justify-center gap-6 sm:flex-row"
            >
              <Link href="/explore">
                <button className="glow-hover group relative flex items-center gap-2 rounded-full bg-primary px-10 py-5 text-xl font-bold text-white transition-all">
                  Access Premium Packages
                  <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>
              <button
                onClick={() => window.dispatchEvent(new Event("open-chatbot"))}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-10 py-5 text-xl font-bold text-white backdrop-blur-md transition-all hover:bg-white/10 cursor-pointer"
              >
                <Sparkles className="h-6 w-6 text-violet-400" />
                Ask AI Advisor
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Decorative lines */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent -z-10" />
    </section>
  )
}
