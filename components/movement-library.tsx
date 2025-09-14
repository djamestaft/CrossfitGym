'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Search, Play, Clock, Target } from 'lucide-react'

interface MovementVideo {
  id: string
  title: string
  description: string
  duration: string
  category: string
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced'
  bodyPart: string[]
  videoUrl: string
  thumbnailUrl: string
}

const movementVideos: MovementVideo[] = [
  {
    id: '1',
    title: 'Shoulder Blade Squeezes',
    description:
      'Strengthen your rhomboids and middle trapezius to improve posture and reduce shoulder pain.',
    duration: '3:45',
    category: 'Strengthening',
    difficulty: 'Beginner',
    bodyPart: ['Shoulders', 'Upper Back'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-shoulder-blade-exercise.jpg',
  },
  {
    id: '2',
    title: 'Cat-Cow Stretch',
    description:
      'Improve spinal mobility and reduce lower back stiffness with this gentle movement.',
    duration: '4:20',
    category: 'Mobility',
    difficulty: 'Beginner',
    bodyPart: ['Lower Back', 'Core'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-cat-cow-stretch.jpg',
  },
  {
    id: '3',
    title: 'Dead Bug Exercise',
    description:
      'Core stability exercise that teaches proper coordination and spinal control.',
    duration: '5:15',
    category: 'Core Stability',
    difficulty: 'Intermediate',
    bodyPart: ['Core', 'Lower Back'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-dead-bug-exercise.jpg',
  },
  {
    id: '4',
    title: 'Hip Flexor Stretch',
    description:
      'Release tight hip flexors from prolonged sitting and improve hip mobility.',
    duration: '3:30',
    category: 'Stretching',
    difficulty: 'Beginner',
    bodyPart: ['Hips', 'Lower Back'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-hip-flexor-stretch.jpg',
  },
  {
    id: '5',
    title: 'Thoracic Spine Rotation',
    description:
      'Improve mid-back mobility and reduce stiffness from desk work.',
    duration: '4:45',
    category: 'Mobility',
    difficulty: 'Beginner',
    bodyPart: ['Upper Back', 'Shoulders'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-thoracic-spine-rotation.jpg',
  },
  {
    id: '6',
    title: 'Single Leg Glute Bridge',
    description:
      'Strengthen glutes and improve hip stability for better movement patterns.',
    duration: '4:00',
    category: 'Strengthening',
    difficulty: 'Intermediate',
    bodyPart: ['Glutes', 'Core', 'Lower Back'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-single-leg-glute-bridge.jpg',
  },
  {
    id: '7',
    title: 'Wall Slides',
    description:
      'Improve shoulder blade control and strengthen the posterior chain.',
    duration: '3:15',
    category: 'Strengthening',
    difficulty: 'Beginner',
    bodyPart: ['Shoulders', 'Upper Back'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-wall-slides-exercise.jpg',
  },
  {
    id: '8',
    title: 'Bird Dog',
    description:
      'Enhance core stability and coordination while strengthening the posterior chain.',
    duration: '4:30',
    category: 'Core Stability',
    difficulty: 'Intermediate',
    bodyPart: ['Core', 'Lower Back', 'Glutes'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-bird-dog-exercise.jpg',
  },
  {
    id: '9',
    title: 'Calf Stretch',
    description: 'Release tight calf muscles and improve ankle mobility.',
    duration: '2:45',
    category: 'Stretching',
    difficulty: 'Beginner',
    bodyPart: ['Calves', 'Ankles'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-calf-stretch.jpg',
  },
  {
    id: '10',
    title: 'Plank Progression',
    description:
      'Build core strength progressively with proper plank technique.',
    duration: '6:00',
    category: 'Core Stability',
    difficulty: 'Advanced',
    bodyPart: ['Core', 'Shoulders'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/plank-exercise.png',
  },
  {
    id: '11',
    title: 'Neck Stretches',
    description: 'Relieve neck tension and improve cervical spine mobility.',
    duration: '3:20',
    category: 'Stretching',
    difficulty: 'Beginner',
    bodyPart: ['Neck', 'Shoulders'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/neck-stretches.png',
  },
  {
    id: '12',
    title: 'Rotator Cuff Strengthening',
    description:
      'Targeted exercises to strengthen and protect your rotator cuff muscles.',
    duration: '7:30',
    category: 'Strengthening',
    difficulty: 'Advanced',
    bodyPart: ['Shoulders'],
    videoUrl: '/placeholder-video.mp4',
    thumbnailUrl: '/person-doing-rotator-cuff-exercises.jpg',
  },
]

export function MovementLibrary() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All')

  const categories = [
    'All',
    ...Array.from(new Set(movementVideos.map(video => video.category))),
  ]
  const difficulties = ['All', 'Beginner', 'Intermediate', 'Advanced']

  const filteredVideos = movementVideos.filter(video => {
    const matchesSearch =
      video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      video.bodyPart.some(part =>
        part.toLowerCase().includes(searchTerm.toLowerCase())
      )

    const matchesCategory =
      selectedCategory === 'All' || video.category === selectedCategory
    const matchesDifficulty =
      selectedDifficulty === 'All' || video.difficulty === selectedDifficulty

    return matchesSearch && matchesCategory && matchesDifficulty
  })

  const handleVideoPlay = (videoId: string, videoTitle: string) => {
    // GA4 event
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'video_play', {
        event_category: 'engagement',
        event_label: videoTitle,
        video_id: videoId,
      })
    }
  }

  return (
    <div className='space-y-6'>
      {/* Search and Filters */}
      <div className='space-y-4'>
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
          <Input
            placeholder='Search exercises by name, body part, or description...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className='pl-10'
          />
        </div>

        <div className='flex flex-wrap gap-2'>
          <div className='flex flex-wrap gap-1'>
            <span className='text-sm font-medium text-muted-foreground mr-2'>
              Category:
            </span>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size='sm'
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className='flex flex-wrap gap-2'>
          <div className='flex flex-wrap gap-1'>
            <span className='text-sm font-medium text-muted-foreground mr-2'>
              Difficulty:
            </span>
            {difficulties.map(difficulty => (
              <Button
                key={difficulty}
                variant={
                  selectedDifficulty === difficulty ? 'default' : 'outline'
                }
                size='sm'
                onClick={() => setSelectedDifficulty(difficulty)}
              >
                {difficulty}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className='text-sm text-muted-foreground'>
        Showing {filteredVideos.length} of {movementVideos.length} exercises
      </div>

      {/* Video Grid */}
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {filteredVideos.map(video => (
          <Card
            key={video.id}
            className='group hover:shadow-lg transition-shadow'
          >
            <div className='relative'>
              <img
                src={video.thumbnailUrl || '/placeholder.svg'}
                alt={video.title}
                className='w-full h-48 object-cover rounded-t-lg'
              />
              <div className='absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors rounded-t-lg flex items-center justify-center'>
                <Button
                  size='lg'
                  className='opacity-80 group-hover:opacity-100 transition-opacity'
                  onClick={() => handleVideoPlay(video.id, video.title)}
                >
                  <Play className='mr-2 h-5 w-5' />
                  Play Video
                </Button>
              </div>
              <div className='absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center gap-1'>
                <Clock className='h-3 w-3' />
                {video.duration}
              </div>
            </div>

            <CardHeader className='pb-3'>
              <div className='flex items-start justify-between gap-2 mb-2'>
                <CardTitle className='text-lg leading-tight'>
                  {video.title}
                </CardTitle>
                <Badge
                  variant={
                    video.difficulty === 'Beginner'
                      ? 'secondary'
                      : video.difficulty === 'Intermediate'
                        ? 'default'
                        : 'destructive'
                  }
                >
                  {video.difficulty}
                </Badge>
              </div>
              <div className='flex flex-wrap gap-1'>
                <Badge variant='outline' className='text-xs'>
                  {video.category}
                </Badge>
                {video.bodyPart.map(part => (
                  <Badge key={part} variant='outline' className='text-xs'>
                    {part}
                  </Badge>
                ))}
              </div>
            </CardHeader>

            <CardContent className='pt-0'>
              <p className='text-sm text-muted-foreground mb-4'>
                {video.description}
              </p>
              <Button
                className='w-full'
                onClick={() => handleVideoPlay(video.id, video.title)}
              >
                <Play className='mr-2 h-4 w-4' />
                Watch Exercise
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredVideos.length === 0 && (
        <div className='text-center py-12'>
          <Target className='h-16 w-16 text-muted-foreground mx-auto mb-4' />
          <h3 className='text-lg font-semibold mb-2'>No exercises found</h3>
          <p className='text-muted-foreground'>
            Try adjusting your search terms or filters to find what you're
            looking for.
          </p>
        </div>
      )}
    </div>
  )
}
