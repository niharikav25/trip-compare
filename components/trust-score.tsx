"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Shield, ShieldCheck, ShieldAlert } from "lucide-react"

interface TrustScoreProps {
  score: number
  size?: "sm" | "md" | "lg"
  showLabel?: boolean
}

export function TrustScore({ score, size = "md", showLabel = true }: TrustScoreProps) {
  const getScoreColor = () => {
    if (score >= 90) return "text-green-600 bg-green-100"
    if (score >= 70) return "text-yellow-600 bg-yellow-100"
    return "text-red-600 bg-red-100"
  }

  const getIcon = () => {
    if (score >= 90) return ShieldCheck
    if (score >= 70) return Shield
    return ShieldAlert
  }

  const sizeClasses = {
    sm: "h-8 w-8 text-xs",
    md: "h-12 w-12 text-sm",
    lg: "h-16 w-16 text-base",
  }

  const iconSizes = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  }

  const Icon = getIcon()

  const scoreLabel = score >= 90 ? "Excellent" : score >= 70 ? "Good" : "Fair"

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold",
            getScoreColor()
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-[120px]">
          <div className="text-sm font-semibold text-foreground">{score}%</div>
          <div className="text-xs text-muted-foreground">{scoreLabel}</div>
        </div>
        {showLabel && <div className="text-sm text-muted-foreground">Trust Score</div>}
      </div>

      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${score}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-2 w-full overflow-hidden rounded-full bg-muted"
      >
        <div
          className={cn("h-2 rounded-full", score >= 90 ? "bg-green-500" : score >= 70 ? "bg-yellow-400" : "bg-rose-500")}
          style={{ width: `${score}%` }}
        />
      </motion.div>
    </div>
  )
}
