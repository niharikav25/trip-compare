"use client"

import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Star, MapPin, Clock, Heart, Plus } from "lucide-react"
import type { Package } from "@/lib/data"
import { cn } from "@/lib/utils"

interface PackageCardProps {
  pkg: Package
  onCompare?: (pkg: Package) => void
  onSave?: (pkg: Package) => void
  isComparing?: boolean
  isSaved?: boolean
  viewMode?: "grid" | "list"
}

export function PackageCard({ 
  pkg, 
  onCompare, 
  onSave,
  isComparing = false,
  isSaved = false,
  viewMode = "grid"
}: PackageCardProps) {
  const discount = Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100)

  if (viewMode === "list") {
    return (
      <Card className="group flex overflow-hidden border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5">
        <div className="relative aspect-video w-48 flex-shrink-0 overflow-hidden sm:w-64">
          <Image
            src={pkg.image}
            alt={pkg.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute left-2 top-2">
            {discount > 0 && (
              <Badge variant="secondary" className="bg-white/90 text-foreground">
                {discount}% OFF
              </Badge>
            )}
          </div>
        </div>

        <CardContent className="flex flex-1 flex-col p-4">
          <div className="flex flex-1 flex-col">
            <div className="mb-2 flex items-start justify-between gap-2">
              <div className="flex-1">
                <Link href={`/package/${pkg.id}`} className="hover:underline">
                  <h3 className="line-clamp-1 text-lg font-semibold text-foreground">{pkg.name}</h3>
                </Link>
                <div className="mt-1 flex items-center gap-3 text-sm text-muted-foreground">
                  <Link href={`/company/${pkg.company.id}`} className="hover:text-primary">
                    by {pkg.company.name}
                  </Link>
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {pkg.destination}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {pkg.duration}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold text-amber-700">{pkg.rating}</span>
              </div>
            </div>

            <div className="mb-4 flex flex-wrap gap-1.5">
              {pkg.highlights.slice(0, 4).map((highlight, i) => (
                <span
                  key={i}
                  className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-end justify-between border-t pt-4">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-primary">
                  ₹{pkg.price.toLocaleString()}
                </span>
                <span className="text-sm text-muted-foreground line-through">
                  ₹{pkg.originalPrice.toLocaleString()}
                </span>
              </div>
              <span className="text-xs text-muted-foreground">per person</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  onSave?.(pkg)
                }}
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border border-border transition-colors hover:bg-secondary",
                  isSaved && "border-primary bg-primary text-primary-foreground hover:bg-primary/90"
                )}
              >
                <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
              </button>
              <Button
                size="sm"
                variant={isComparing ? "default" : "outline"}
                onClick={(e) => {
                  e.preventDefault()
                  onCompare?.(pkg)
                }}
                className="gap-1.5"
              >
                <Plus className={cn("h-4 w-4", isComparing && "rotate-45")} />
                {isComparing ? "Added" : "Compare"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group overflow-hidden border-border/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute left-3 top-3 flex flex-col gap-2">
          {pkg.bestDeal && (
            <Badge className="bg-green-500 text-white hover:bg-green-600">
              Best Deal
            </Badge>
          )}
          {pkg.premium && (
            <Badge className="bg-amber-500 text-white hover:bg-amber-600">
              Premium
            </Badge>
          )}
          {discount > 0 && (
            <Badge variant="secondary" className="bg-white/90 text-foreground">
              {discount}% OFF
            </Badge>
          )}
        </div>

        {/* Save Button */}
        <button
          onClick={(e) => {
            e.preventDefault()
            onSave?.(pkg)
          }}
          className={cn(
            "absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 transition-colors hover:bg-white",
            isSaved && "bg-primary text-primary-foreground hover:bg-primary/90"
          )}
        >
          <Heart className={cn("h-4 w-4", isSaved && "fill-current")} />
        </button>

        {/* Destination & Duration */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
          <div className="flex items-center gap-1.5">
            <MapPin className="h-4 w-4" />
            <span className="text-sm font-medium">{pkg.destination}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-4 w-4" />
            <span className="text-sm font-medium">{pkg.duration}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <div className="flex-1">
            <Link href={`/package/${pkg.id}`} className="hover:underline">
              <h3 className="line-clamp-1 font-semibold text-foreground">{pkg.name}</h3>
            </Link>
            <Link href={`/company/${pkg.company.id}`} className="text-sm text-muted-foreground hover:text-primary">
              by {pkg.company.name}
            </Link>
          </div>
          <div className="flex items-center gap-1 rounded-lg bg-amber-50 px-2 py-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            <span className="text-sm font-semibold text-amber-700">{pkg.rating}</span>
          </div>
        </div>

        <div className="mb-3 flex flex-wrap gap-1.5">
          {pkg.highlights.slice(0, 3).map((highlight, i) => (
            <span
              key={i}
              className="rounded-md bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
            >
              {highlight}
            </span>
          ))}
        </div>

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-primary">
                ₹{pkg.price.toLocaleString()}
              </span>
              <span className="text-sm text-muted-foreground line-through">
                ₹{pkg.originalPrice.toLocaleString()}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">per person</span>
          </div>
          <Button
            size="sm"
            variant={isComparing ? "default" : "outline"}
            onClick={(e) => {
              e.preventDefault()
              onCompare?.(pkg)
            }}
            className="gap-1.5"
          >
            <Plus className={cn("h-4 w-4", isComparing && "rotate-45")} />
            {isComparing ? "Added" : "Compare"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
