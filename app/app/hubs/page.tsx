import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, BookOpen } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Health Hubs | Geelong Movement Co",
  description: "Comprehensive guides to understanding and managing common movement and pain conditions.",
  openGraph: {
    title: "Health Hubs | Geelong Movement Co",
    description: "Expert guides for shoulder pain, back pain, and movement health.",
  },
}

const hubs = [
  {
    slug: "shoulder",
    title: "Shoulder Pain & Movement",
    description:
      "Comprehensive guide to understanding, treating, and preventing shoulder pain through movement therapy.",
    readTime: "8 min read",
    articleCount: 2,
    lastUpdated: "2024-01-15",
    color: "bg-blue-50 border-blue-200",
    icon: "🦴",
  },
  {
    slug: "low-back",
    title: "Low Back Pain Solutions",
    description: "Evidence-based approaches to managing and preventing low back pain through movement and exercise.",
    readTime: "10 min read",
    articleCount: 2,
    lastUpdated: "2024-01-20",
    color: "bg-green-50 border-green-200",
    icon: "🏃‍♂️",
  },
]

export default function HubsPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-b from-muted to-background py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="mb-4">
              Health Resources
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-balance">Movement Health Hubs</h1>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Expert-curated guides to help you understand and manage common movement conditions. Evidence-based
              information from our qualified physiotherapists.
            </p>
          </div>
        </div>
      </section>

      {/* Hubs Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              {hubs.map((hub) => (
                <Card key={hub.slug} className="group hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="text-3xl mb-4">{hub.icon}</div>
                      <Badge variant="outline" className="text-xs">
                        {hub.articleCount} articles
                      </Badge>
                    </div>
                    <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                      <Link href={`/hubs/${hub.slug}`}>{hub.title}</Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{hub.description}</p>

                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{hub.readTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>Updated {new Date(hub.lastUpdated).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <Button
                      className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                      asChild
                    >
                      <Link href={`/hubs/${hub.slug}`}>
                        Explore Hub
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-muted">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Need Personalized Help?</h2>
            <p className="text-muted-foreground">
              While our health hubs provide valuable information, nothing replaces a personalized assessment. Book your
              free FMS evaluation to get a customized movement plan.
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
    </div>
  )
}
