"use client"

import { useState } from "react"
import { MemberAuth } from "@/components/member-auth"
import { MovementLibrary } from "@/components/movement-library"
import { MemberFAQs } from "@/components/member-faqs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Calendar, BookOpen, Play, HelpCircle, LogOut, Clock, Target, TrendingUp } from "lucide-react"

// Mock programming notes data
const programmingNotes = [
  {
    week: "Week of January 15, 2024",
    title: "Focus on Shoulder Stability",
    content: `This week we're emphasizing shoulder blade control and rotator cuff strengthening. Pay special attention to:

• **Wall Slides**: Focus on keeping your back flat against the wall throughout the movement
• **Band Pull-Aparts**: Squeeze your shoulder blades together and hold for 2 seconds
• **External Rotations**: Keep your elbow tucked to your side

**Key Points:**
- Quality over quantity - perfect form is more important than speed
- If you feel pinching in your shoulder, reduce the range of motion
- Aim for 3 sets of 12-15 repetitions for strengthening exercises

**This Week's Goals:**
- Complete exercises 4 times this week
- Notice improved shoulder blade control during daily activities
- Reduced shoulder tension by end of week`,
    author: "Dr. Sarah Mitchell",
    date: "2024-01-15",
  },
  {
    week: "Week of January 8, 2024",
    title: "Core Stability Foundation",
    content: `Building a strong foundation with core stability work. This week's emphasis:

• **Dead Bug**: Focus on keeping your lower back pressed to the floor
• **Bird Dog**: Hold each position for 5 seconds, focusing on not rotating your hips
• **Modified Plank**: Build up your hold time gradually

**Progression Notes:**
- Start with 15-second holds and build up by 5 seconds each day
- If you can hold a modified plank for 45 seconds with good form, try a full plank
- Remember to breathe normally during all exercises

**What to Expect:**
- You may feel your deep abdominal muscles working (this is good!)
- Some muscle fatigue is normal, sharp pain is not
- Improved posture awareness throughout the day`,
    author: "Dr. Mark Thompson",
    date: "2024-01-08",
  },
  {
    week: "Week of January 1, 2024",
    title: "New Year, New Movement Patterns",
    content: `Welcome to your personalized movement program! This week we're establishing baseline movement patterns:

• **Assessment Review**: We identified key areas for improvement in your shoulder and hip mobility
• **Starting Slow**: Begin with basic movements to establish proper patterns
• **Building Habits**: Consistency is key - aim for short, frequent sessions

**Your Priority Areas:**
1. Hip flexor mobility (from prolonged sitting)
2. Thoracic spine extension
3. Shoulder blade stability

**Week 1 Goals:**
- Complete your movement routine 3 times
- Focus on learning proper form for each exercise
- Notice how your body feels before and after exercises

Remember: This is a journey, not a sprint. Small, consistent improvements lead to lasting change.`,
    author: "Dr. Sarah Mitchell",
    date: "2024-01-01",
  },
]

export default function PortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState("")
  const [activeTab, setActiveTab] = useState("notes")

  const handleAuthenticated = (email: string) => {
    setIsAuthenticated(true)
    setUserEmail(email)
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    setUserEmail("")
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">GMC Member Portal</h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Access your personalized programming notes, movement library, and member resources.
            </p>
          </div>
          <MemberAuth onAuthenticated={handleAuthenticated} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-muted border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">GMC Member Portal</h1>
              <p className="text-sm text-muted-foreground">Welcome back, {userEmail}</p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Calendar className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Program Week</p>
                  <p className="text-2xl font-bold">3</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Target className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Exercises Completed</p>
                  <p className="text-2xl font-bold">24/30</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Progress Score</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="notes" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Programming Notes
            </TabsTrigger>
            <TabsTrigger value="library" className="flex items-center gap-2">
              <Play className="h-4 w-4" />
              Movement Library
            </TabsTrigger>
            <TabsTrigger value="faqs" className="flex items-center gap-2">
              <HelpCircle className="h-4 w-4" />
              Member FAQs
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notes" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Weekly Programming Notes</h2>
              <Badge variant="secondary">Updated Weekly</Badge>
            </div>

            <div className="space-y-6">
              {programmingNotes.map((note, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{note.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{note.week}</p>
                      </div>
                      <div className="text-right text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <User className="h-3 w-3" />
                          {note.author}
                        </div>
                        <div className="flex items-center gap-1 mt-1">
                          <Clock className="h-3 w-3" />
                          {new Date(note.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="prose prose-sm max-w-none">
                      <div
                        dangerouslySetInnerHTML={{
                          __html: note.content.replace(/\n/g, "<br>").replace(/•/g, "&bull;"),
                        }}
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="library" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Movement Library</h2>
              <Badge variant="secondary">12+ Videos Available</Badge>
            </div>
            <MovementLibrary />
          </TabsContent>

          <TabsContent value="faqs" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Member FAQs</h2>
              <Badge variant="secondary">Searchable Database</Badge>
            </div>
            <MemberFAQs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
