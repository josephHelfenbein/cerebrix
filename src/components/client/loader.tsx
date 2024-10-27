'use client'

import { motion } from 'framer-motion'

export default function Loader({ size = 'default', color = 'primary' }: { size?: 'small' | 'default' | 'large', color?: 'primary' | 'secondary' | 'accent' } = {}) {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  const colorClasses = {
    primary: 'border-primary',
    secondary: 'border-secondary',
    accent: 'border-accent'
  }

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`rounded-full border-2 border-t-transparent ${sizeClasses[size]} ${colorClasses[color]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
    </div>
  )
}