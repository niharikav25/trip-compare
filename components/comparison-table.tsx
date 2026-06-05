"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { TrustScore } from "@/components/trust-score"
import { Star, Check, X, Crown, Sparkles, ArrowRight } from "lucide-react"
import type { Package } from "@/lib/data"

interface ComparisonTableProps {
  packages: Package[]
  onRemove: (id: string) => void
}

export function ComparisonTable({ packages, onRemove }: ComparisonTableProps) {
  // Find best values
  const lowestPrice = Math.min(...packages.map((p) => p.price))
  const highestRating = Math.max(...packages.map((p) => p.rating))
  const highestTrust = Math.max(...packages.map((p) => p.company.trustScore))

  const getBestLabel = (pkg: Package) => {
    if (pkg.price === lowestPrice && pkg.rating === highestRating) {
      return { label: "Best Overall", color: "bg-primary text-primary-foreground" }
    }
    if (pkg.price === lowestPrice) {
      return { label: "Best Value", color: "bg-green-500 text-white" }
    }
    if (pkg.rating === highestRating) {
      return { label: "Top Rated", color: "bg-amber-500 text-white" }
    }
    if (pkg.company.trustScore === highestTrust) {
      return { label: "Most Trusted", color: "bg-blue-500 text-white" }
    }
    return null
  }

  const rows = [
    {
      label: "Price",
      render: (pkg: Package) => (
        <div className="text-center">
          <div className={`text-2xl font-extrabold ${pkg.price === lowestPrice ? "text-emerald-700" : "text-foreground"}`}>
            ₹{pkg.price.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground line-through">
            ₹{pkg.originalPrice.toLocaleString()}
          </div>
        </div>
      ),
    },
    {
      label: "Duration",
      render: (pkg: Package) => (
        <div className="text-center font-medium">{pkg.duration}</div>
      ),
    },
    {
      label: "Rating",
      render: (pkg: Package) => (
        <div className="flex items-center justify-center gap-1">
          <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
          <span className={`text-lg font-bold ${pkg.rating === highestRating ? "text-amber-700" : "text-foreground"}`}>
            {pkg.rating}
          </span>
          <span className="text-xs text-muted-foreground">({pkg.reviewCount})</span>
        </div>
      ),
    },
    {
      label: "Trust Score",
      render: (pkg: Package) => (
        <div className="flex justify-center">
          <TrustScore score={pkg.company.trustScore} size="sm" showLabel={false} />
        </div>
      ),
    },
    {
      label: "Hotels",
      render: (pkg: Package) => (
        <div className="text-center">
          {pkg.hotels.map((hotel, i) => (
            <div key={i} className="mb-1 last:mb-0">
              <div className="flex items-center justify-center gap-0.5">
                {Array.from({ length: hotel.stars }).map((_, j) => (
                  <Star key={j} className="h-3 w-3 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">{hotel.name}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      label: "Transport",
      render: (pkg: Package) => (
        <div className="text-center text-sm">{pkg.transport}</div>
      ),
    },
    {
      label: "Meals",
      render: (pkg: Package) => (
        <div className="text-center text-sm">{pkg.meals}</div>
      ),
    },
    {
      label: "Highlights",
      render: (pkg: Package) => (
        <div className="flex flex-wrap justify-center gap-1">
          {pkg.highlights.slice(0, 3).map((h, i) => (
            <span key={i} className="rounded bg-secondary text-secondary-foreground font-semibold px-2 py-0.5 text-[10px] tracking-wide shadow-xs border border-primary/10">
              {h}
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Inclusions",
      render: (pkg: Package) => (
        <div className="space-y-1">
          {pkg.inclusions.slice(0, 4).map((item, i) => (
            <div key={i} className="flex items-center gap-1 text-xs">
              <Check className="h-3 w-3 shrink-0 text-green-500" />
              <span className="line-clamp-1">{item}</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[768px]">
        {/* Header */}
        <div className="grid gap-4 items-stretch" style={{ gridTemplateColumns: `200px repeat(${packages.length}, 1fr)` }}>
          <div className="sticky left-0 z-20 bg-background/95 border-r border-border/60" />
          {packages.map((pkg) => {
            const bestLabel = getBestLabel(pkg)
            const isBest = bestLabel?.label === "Best Overall" || bestLabel?.label === "Best Value"
            return (
              <motion.div
                key={pkg.id}
                className={`relative rounded-t-2xl border border-border bg-white p-4 shadow-sm mt-8 transition-all duration-300 ${
                  isBest ? "ring-2 ring-primary/40 shadow-lg" : "hover:-translate-y-1 hover:shadow-xl"
                }`}
                whileHover={{ y: -5, scale: 1.01 }}
              >
                {bestLabel && (
                  <Badge className={`absolute -top-3 left-1/2 -translate-x-1/2 gap-1 ${bestLabel.color}`}>
                    {bestLabel.label === "Best Overall" && <Crown className="h-3 w-3" />}
                    {bestLabel.label === "Best Value" && <Sparkles className="h-3 w-3" />}
                    {bestLabel.label}
                  </Badge>
                )}
                <button
                  onClick={() => onRemove(pkg.id)}
                  className="absolute right-2 top-2 rounded-full p-1 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
                <div className="relative mx-auto mb-3 aspect-[4/3] w-full max-w-[200px] overflow-hidden rounded-xl">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                </div>
                <Link href={`/package/${pkg.id}`} className="hover:underline">
                  <h3 className="mb-1 text-center font-semibold text-foreground line-clamp-2">
                    {pkg.name}
                  </h3>
                </Link>
                <Link
                  href={`/company/${pkg.company.id}`}
                  className="block text-center text-sm text-muted-foreground hover:text-primary"
                >
                  {pkg.company.name}
                </Link>
              </motion.div>
            )
          })}
        </div>

        {/* Rows */}
        {rows.map((row, index) => (
          <div
            key={row.label}
            className={`grid items-stretch border-b border-border/60 ${
              index % 2 === 0 ? "bg-muted/40" : "bg-transparent"
            }`}
            style={{ gridTemplateColumns: `200px repeat(${packages.length}, 1fr)` }}
          >
            <div className={`sticky left-0 z-20 flex items-center px-6 py-4 font-serif text-base font-bold text-primary backdrop-blur border-r border-border/60 ${
              index % 2 === 0 ? "bg-[#FAF0E1]/95" : "bg-background/95"
            }`}>
              {row.label}
            </div>
            {packages.map((pkg, pIndex) => (
              <div
                key={pkg.id}
                className={`px-6 py-4 flex items-center justify-center text-center ${
                  pIndex < packages.length - 1 ? "border-r border-border/40" : ""
                }`}
              >
                {row.render(pkg)}
              </div>
            ))}
          </div>
        ))}

        {/* CTA Row */}
        <div
          className="grid rounded-b-2xl border-t border-border/60 bg-muted/20 p-4"
          style={{ gridTemplateColumns: `200px repeat(${packages.length}, 1fr)` }}
        >
          <div className="sticky left-0 z-20 bg-background/95 border-r border-border/60" />
          {packages.map((pkg, pIndex) => (
            <div
              key={pkg.id}
              className={`flex justify-center items-center py-2 ${
                pIndex < packages.length - 1 ? "border-r border-border/40" : ""
              }`}
            >
              <Link href={`/package/${pkg.id}`}>
                <Button className="gap-2 font-semibold shadow-xs">
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
