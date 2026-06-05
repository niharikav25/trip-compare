"use client"

import { useState, useMemo, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FilterSidebar } from "@/components/filter-sidebar"
import { PackageCard } from "@/components/package-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { packages, type Package } from "@/lib/data"
import { Search, SlidersHorizontal, LayoutGrid, List } from "lucide-react"

const defaultFilters = {
  budget: [5000, 50000] as number[],
  duration: [] as string[],
  rating: 0,
  travelType: [] as string[],
}

export function ExploreClient() {
  const searchParams = useSearchParams()
  const initialDestination = searchParams.get("destination") || ""

  const [searchQuery, setSearchQuery] = useState(initialDestination)
  const [sortBy, setSortBy] = useState("recommended")
  const [filters, setFilters] = useState(defaultFilters)
  const [compareList, setCompareList] = useState<Package[]>([])
  const [savedList, setSavedList] = useState<string[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("saved-packages")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setSavedList(parsed)
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      const defaults = ["rajasthan-royal-heritage", "goa-beach-bliss", "manali-adventure"]
      setSavedList(defaults)
      localStorage.setItem("saved-packages", JSON.stringify(defaults))
    }
  }, [])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  const activeFiltersCount = useMemo(() => {
    let count = 0
    if (
      filters.budget[0] !== defaultFilters.budget[0] ||
      filters.budget[1] !== defaultFilters.budget[1]
    ) {
      count++
    }
    if (filters.duration.length > 0) count++
    if (filters.rating > 0) count++
    if (filters.travelType.length > 0) count++
    return count
  }, [filters])

  const filteredPackages = useMemo(() => {
    let result = packages.filter((pkg) => {
      // Search query
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        if (
          !pkg.name.toLowerCase().includes(query) &&
          !pkg.destination.toLowerCase().includes(query) &&
          !pkg.company.name.toLowerCase().includes(query)
        ) {
          return false
        }
      }

      // Budget
      if (pkg.price < filters.budget[0] || pkg.price > filters.budget[1]) {
        return false
      }

      // Duration
      if (filters.duration.length > 0) {
        const matchesDuration = filters.duration.some((d) => {
          if (d === "1-3") return pkg.durationDays >= 1 && pkg.durationDays <= 3
          if (d === "4-5") return pkg.durationDays >= 4 && pkg.durationDays <= 5
          if (d === "6-7") return pkg.durationDays >= 6 && pkg.durationDays <= 7
          if (d === "8+") return pkg.durationDays >= 8
          return false
        })
        if (!matchesDuration) return false
      }

      // Rating
      if (filters.rating > 0 && pkg.rating < filters.rating) {
        return false
      }

      // Travel type
      if (filters.travelType.length > 0) {
        if (!filters.travelType.includes(pkg.travelType)) {
          return false
        }
      }

      return true
    })

    // Sort
    if (sortBy === "price-low") result.sort((a, b) => a.price - b.price)
    if (sortBy === "price-high") result.sort((a, b) => b.price - a.price)
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating)

    return result
  }, [searchQuery, filters, sortBy])

  const toggleCompare = (pkg: Package) => {
    setCompareList((prev) => {
      const exists = prev.find((p) => p.id === pkg.id)
      if (exists) {
        return prev.filter((p) => p.id !== pkg.id)
      }
      if (prev.length < 4) {
        return [...prev, pkg]
      }
      return prev
    })
  }

  const toggleSaved = (pkgId: string) => {
    setSavedList((prev) => {
      const updated = prev.includes(pkgId) ? prev.filter((id) => id !== pkgId) : [...prev, pkgId]
      localStorage.setItem("saved-packages", JSON.stringify(updated))
      window.dispatchEvent(new Event("saved-packages-updated"))
      return updated
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto max-w-7xl px-4 pt-32 pb-8">
        <div className="mb-8">
          <h1 className="mb-4 text-4xl font-bold tracking-tight text-foreground">
            Explore Packages
          </h1>
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search destinations, packages..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Top Rated</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
              
              <Button
                variant={showFilters ? "default" : "outline"}
                onClick={() => setShowFilters(!showFilters)}
                className="hidden md:flex gap-2 items-center"
              >
                <SlidersHorizontal className="h-4 w-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>

              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="md:hidden">
                    <SlidersHorizontal className="h-4 w-4" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left">
                  <SheetHeader>
                    <SheetTitle>Filters</SheetTitle>
                  </SheetHeader>
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={setFilters}
                    onReset={() => setFilters(defaultFilters)}
                  />
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>

        <div className="flex gap-8 items-start">
          <AnimatePresence initial={false}>
            {showFilters && (
              <motion.aside
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 256, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="hidden w-64 flex-shrink-0 md:block overflow-hidden"
              >
                <div className="w-64 pr-1">
                  <FilterSidebar
                    filters={filters}
                    onFiltersChange={setFilters}
                    onReset={() => setFilters(defaultFilters)}
                  />
                </div>
              </motion.aside>
            )}
          </AnimatePresence>

          <section className="flex-1">
            {filteredPackages.length === 0 ? (
              <div className="flex items-center justify-center rounded-lg border-2 border-dashed py-16 text-center">
                <div>
                  <p className="mb-2 text-lg font-semibold">No packages found</p>
                  <p className="text-muted-foreground">
                    Try adjusting your filters or search query
                  </p>
                </div>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-muted-foreground">
                  Showing {filteredPackages.length} package{filteredPackages.length !== 1 ? "s" : ""}
                </p>
                <div
                  className={
                    viewMode === "grid"
                      ? "grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                      : "space-y-4"
                  }
                >
                  {filteredPackages.map((pkg) => (
                    <PackageCard
                      key={pkg.id}
                      pkg={pkg}
                      onCompare={() => toggleCompare(pkg)}
                      onSave={() => toggleSaved(pkg.id)}
                      isComparing={compareList.some((p) => p.id === pkg.id)}
                      isSaved={savedList.includes(pkg.id)}
                      viewMode={viewMode}
                    />
                  ))}
                </div>
              </>
            )}
          </section>
        </div>

        {compareList.length > 0 && (
          <div className="fixed bottom-6 right-6 z-40 rounded-xl bg-primary p-4 text-primary-foreground shadow-lg">
            <p className="mb-2 font-semibold">{compareList.length} selected</p>
            <Button
              asChild
              size="sm"
              variant="secondary"
              className="w-full"
            >
              <a href={`/compare?packages=${compareList.map((p) => p.id).join(",")}`}>
                Compare Now
              </a>
            </Button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}