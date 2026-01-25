'use client'

import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <div className="mb-12 text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 100 }}
        className="inline-block mb-6"
      >
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-accent blur-2xl opacity-30 rounded-full" />
          <h1 className="relative text-6xl md:text-7xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent drop-shadow-lg">
            Git Green
          </h1>
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg text-muted-foreground max-w-2xl mx-auto"
      >
        Craft beautiful GitHub contribution graphs with ease. Generate realistic commit patterns that tell your coding story.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="mt-8 flex flex-wrap gap-4 justify-center"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-primary" />
          Real Commit Patterns
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-secondary" />
          Multiple Modes
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="w-2 h-2 rounded-full bg-accent" />
          Instant Preview
        </div>
      </motion.div>
    </div>
  )
}