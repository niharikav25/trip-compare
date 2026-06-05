"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ComparisonTable } from "@/components/comparison-table"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { packages as allPackages, type Package } from "@/lib/data"
import { Plus, BarChart3, ArrowRight, Star } from "lucide-react"

export function CompareClient() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [selectedPackages, setSelectedPackages] = useState<Package[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  useEffect(() => {
    const packageIds = searchParams.get("packages")?.split(",") || []
    const pkgs = packageIds
      .map((id) => allPackages.find((p) => p.id === id))
      .filter(Boolean) as Package[]
    setSelectedPackages(pkgs)
  }, [searchParams])

  const updateUrl = (pkgs: Package[]) => {
    const ids = pkgs.map((p) => p.id).join(",")
    router.push(`/compare?packages=${ids}`)
  }

  const addPackage = (pkg: Package) => {
    if (selectedPackages.length < 4 && !selectedPackages.find((p) => p.id === pkg.id)) {
      const updated = [...selectedPackages, pkg]
      setSelectedPackages(updated)
      updateUrl(updated)
    }
    setDialogOpen(false)
  }

  const removePackage = (id: string) => {
    const updated = selectedPackages.filter((p) => p.id !== id)
    setSelectedPackages(updated)
    updateUrl(updated)
  }

  const availablePackages = allPackages.filter(
    (p) => !selectedPackages.find((sp) => sp.id === p.id)
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <motion.main
        className="container mx-auto px-4 pt-32 pb-8"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
              Compare Packages
            </h1>
            <p className="text-muted-foreground">
              Compare up to 4 packages side by side to find your perfect trip
            </p>
          </div>
          {selectedPackages.length < 4 && (
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Package
                </Button>
              </DialogTrigger>
              <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
                <DialogHeader>
                  <DialogTitle>Select a Package to Compare</DialogTitle>
                </DialogHeader>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {availablePackages.map((pkg) => (
                    <Card
                      key={pkg.id}
                      className="cursor-pointer border-border/50 transition-all hover:border-primary hover:shadow-md"
                      onClick={() => addPackage(pkg)}
                    >
                      <CardContent className="p-3">
                        <div className="flex gap-3">
                          <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                            <Image
                              src={pkg.image}
                              alt={pkg.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-foreground line-clamp-1">
                              {pkg.name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {pkg.destination} - {pkg.duration}
                            </p>
                            <div className="mt-1 flex items-center justify-between">
                              <span className="font-semibold text-primary">
                                ₹{pkg.price.toLocaleString()}
                              </span>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                <span className="text-sm">{pkg.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        {/* Comparison Content */}
        {selectedPackages.length >= 2 ? (
          <ComparisonTable packages={selectedPackages} onRemove={removePackage} />
        ) : (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-20">
              <div className="mb-4 rounded-full bg-primary/10 p-4">
                <BarChart3 className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">
                {selectedPackages.length === 0
                  ? "No packages selected"
                  : "Select one more package"}
              </h3>
              <p className="mb-6 max-w-md text-center text-muted-foreground">
                {selectedPackages.length === 0
                  ? "Add at least 2 packages to start comparing prices, features, and more."
                  : "Add one more package to see the side-by-side comparison."}
              </p>
              <div className="flex flex-col items-center gap-3 sm:flex-row">
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="gap-2">
                      <Plus className="h-4 w-4" />
                      Add Package
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Select a Package to Compare</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {availablePackages.map((pkg) => (
                        <Card
                          key={pkg.id}
                          className="cursor-pointer border-border/50 transition-all hover:border-primary hover:shadow-md"
                          onClick={() => addPackage(pkg)}
                        >
                          <CardContent className="p-3">
                            <div className="flex gap-3">
                              <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-lg">
                                <Image
                                  src={pkg.image}
                                  alt={pkg.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h3 className="font-medium text-foreground line-clamp-1">
                                  {pkg.name}
                                </h3>
                                <p className="text-sm text-muted-foreground">
                                  {pkg.destination} - {pkg.duration}
                                </p>
                                <div className="mt-1 flex items-center justify-between">
                                  <span className="font-semibold text-primary">
                                    ₹{pkg.price.toLocaleString()}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                                    <span className="text-sm">{pkg.rating}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </DialogContent>
                </Dialog>
                <Link href="/explore">
                  <Button variant="outline" className="gap-2">
                    Browse All Packages
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Selected packages preview (when less than 2) */}
        {selectedPackages.length === 1 && (
          <div className="mt-6">
            <h3 className="mb-3 font-medium text-muted-foreground">
              Currently selected:
            </h3>
            <div className="flex flex-wrap gap-4">
              {selectedPackages.map((pkg) => (
                <Card key={pkg.id} className="w-64 border-primary">
                  <CardContent className="p-3">
                    <div className="flex gap-3">
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-lg">
                        <Image
                          src={pkg.image}
                          alt={pkg.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-foreground line-clamp-1 text-sm">
                          {pkg.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          ₹{pkg.price.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </motion.main>

      <Footer />
    </div>
  )
}