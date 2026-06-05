import { Suspense } from "react"
import { CompareClient } from "@/components/compare-client"

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background" />}>
      <CompareClient />
    </Suspense>
  )
}
