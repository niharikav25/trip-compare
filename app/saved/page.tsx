"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { PackageCard } from "@/components/package-card"
import { Button } from "@/components/ui/button"
import { packages, type Package } from "@/lib/data"
import { Heart, BarChart3, ArrowRight, Trash2 } from "lucide-react"

// Mock saved packages - in a real app, this would come from a database or local storage
const initialSavedIds = ["rajasthan-royal-heritage", "goa-beach-bliss", "manali-adventure"]

export default function SavedPage() {
  const [savedIds, setSavedIds] = useState<string[]>([])
  const [compareList, setCompareList] = useState<Package[]>([])

  useEffect(() => {
    const saved = localStorage.getItem("saved-packages")
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setSavedIds(parsed)
        }
      } catch (e) {
        console.error(e)
      }
    } else {
      const defaults = ["rajasthan-royal-heritage", "goa-beach-bliss", "manali-adventure"]
      setSavedIds(defaults)
      localStorage.setItem("saved-packages", JSON.stringify(defaults))
    }
  }, [])

  const savedPackages = packages.filter((p) => savedIds.includes(p.id))

  const handleRemove = (pkg: Package) => {
    setSavedIds((prev) => {
      const updated = prev.filter((id) => id !== pkg.id)
      localStorage.setItem("saved-packages", JSON.stringify(updated))
      window.dispatchEvent(new Event("saved-packages-updated"))
      return updated
    })
  }

  const handleCompare = (pkg: Package) => {
    setCompareList((prev) => {
      if (prev.find((p) => p.id === pkg.id)) {
        return prev.filter((p) => p.id !== pkg.id)
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), pkg]
      }
      return [...prev, pkg]
    })
  }

  const clearAll = () => {
    setSavedIds([])
    localStorage.setItem("saved-packages", JSON.stringify([]))
    window.dispatchEvent(new Event("saved-packages-updated"))
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 pt-32 pb-8">
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
              Saved Packages
            </h1>
            <p className="text-muted-foreground">
              {savedPackages.length} package{savedPackages.length !== 1 ? "s" : ""} saved
            </p>
          </div>
          {savedPackages.length > 0 && (
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="gap-2 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                onClick={clearAll}
              >
                <Trash2 className="h-4 w-4" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Saved Packages Grid */}
        {savedPackages.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {savedPackages.map((pkg) => (
              <PackageCard
                key={pkg.id}
                pkg={pkg}
                onCompare={handleCompare}
                onSave={handleRemove}
                isComparing={compareList.some((p) => p.id === pkg.id)}
                isSaved={true}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 rounded-full bg-secondary p-4">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">No saved packages</h3>
            <p className="mb-6 max-w-md text-muted-foreground">
              Save packages while browsing to easily find them later and compare your favorites.
            </p>
            <Link href="/explore">
              <Button className="gap-2">
                Explore Packages
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        )}

        {/* Compare Bar */}
        {compareList.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 border-t border-border bg-card p-4 shadow-lg">
            <div className="container mx-auto flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-medium">
                  {compareList.length} package{compareList.length > 1 ? "s" : ""} selected
                </span>
                <div className="hidden items-center gap-2 sm:flex">
                  {compareList.map((pkg) => (
                    <span
                      key={pkg.id}
                      className="rounded-full bg-secondary px-3 py-1 text-sm"
                    >
                      {pkg.name.split(" ").slice(0, 2).join(" ")}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCompareList([])}
                >
                  Clear
                </Button>
                <Button
                  size="sm"
                  className="gap-2"
                  onClick={() => {
                    const ids = compareList.map((p) => p.id).join(",")
                    window.location.href = `/compare?packages=${ids}`
                  }}
                  disabled={compareList.length < 2}
                >
                  <BarChart3 className="h-4 w-4" />
                  Compare Now
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
