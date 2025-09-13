import type { Metadata } from "next"
import { Timetable } from "@/components/timetable"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Class Timetable | Geelong Movement Co",
  description:
    "View our current class schedule including movement sessions, assessments, and workshops. Book your spot today.",
  openGraph: {
    title: "Class Timetable | Geelong Movement Co",
    description: "Current class schedule and booking information for movement therapy sessions.",
  },
}

export default function TimetablePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-muted to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              Live Schedule
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">Class Timetable</h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Join our expert-led movement sessions, book assessments, and take the next step in your movement journey.
            </p>
            <Button size="lg" asChild>
              <Link href="/fms">
                Book Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Timetable */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Timetable />
        </div>
      </section>
    </div>
  )
}
