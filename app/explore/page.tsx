import { Suspense } from "react"
import { ExploreClient } from "@/components/explore-client"

export default function ExplorePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <ExploreClient />
    </Suspense>
  )
}
