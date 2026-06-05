"use client"

import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star, RotateCcw } from "lucide-react"

interface FilterSidebarProps {
  filters: {
    budget: number[]
    duration: string[]
    rating: number
    travelType: string[]
  }
  onFiltersChange: (filters: FilterSidebarProps["filters"]) => void
  onReset: () => void
}

const travelTypes = [
  "Heritage",
  "Beach",
  "Adventure",
  "Budget",
  "Luxury",
  "Honeymoon",
  "Family",
  "Wildlife",
  "Wellness",
  "Photography",
]

const durations = [
  { label: "1-3 Days", value: "1-3" },
  { label: "4-5 Days", value: "4-5" },
  { label: "6-7 Days", value: "6-7" },
  { label: "8+ Days", value: "8+" },
]

export function FilterSidebar({ filters, onFiltersChange, onReset }: FilterSidebarProps) {
  const updateFilter = <K extends keyof FilterSidebarProps["filters"]>(
    key: K,
    value: FilterSidebarProps["filters"][K]
  ) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: "duration" | "travelType", value: string) => {
    const current = filters[key]
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]
    updateFilter(key, updated)
  }

  return (
    <Card className="sticky top-20 border-border/50">
      <CardHeader className="flex flex-row items-center justify-between pb-4">
        <CardTitle className="text-lg">Filters</CardTitle>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="h-8 gap-1 text-muted-foreground"
        >
          <RotateCcw className="h-3 w-3" />
          Reset
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Budget Range */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">
            Budget Range
          </Label>
          <div className="px-1">
            <Slider
              value={filters.budget}
              onValueChange={(value) => updateFilter("budget", value)}
              min={5000}
              max={50000}
              step={1000}
              className="mt-2"
            />
          </div>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>₹{filters.budget[0].toLocaleString()}</span>
            <span>₹{filters.budget[1].toLocaleString()}</span>
          </div>
        </div>

        {/* Duration */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Duration</Label>
          <div className="space-y-2">
            {durations.map((duration) => (
              <label
                key={duration.value}
                className="flex cursor-pointer items-center gap-2"
              >
                <Checkbox
                  checked={filters.duration.includes(duration.value)}
                  onCheckedChange={() => toggleArrayFilter("duration", duration.value)}
                />
                <span className="text-sm">{duration.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Minimum Rating</Label>
          <RadioGroup
            value={String(filters.rating)}
            onValueChange={(value) => updateFilter("rating", Number(value))}
            className="space-y-2"
          >
            {[4.5, 4.0, 3.5, 0].map((rating) => (
              <label key={rating} className="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value={String(rating)} />
                <div className="flex items-center gap-1">
                  {rating > 0 ? (
                    <>
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm">{rating}+ stars</span>
                    </>
                  ) : (
                    <span className="text-sm">Any rating</span>
                  )}
                </div>
              </label>
            ))}
          </RadioGroup>
        </div>

        {/* Travel Type */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Travel Type</Label>
          <div className="flex flex-wrap gap-2">
            {travelTypes.map((type) => (
              <button
                key={type}
                onClick={() => toggleArrayFilter("travelType", type)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filters.travelType.includes(type)
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
