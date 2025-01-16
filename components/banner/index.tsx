'use client'

import Link from 'next/link'
import { Button } from '../ui/button'

export function Banner() {
  return (
    <div className="min-h-screen flex items-center justify-center flex-col">
      <h1 className="text-white text-7xl font-bold">
        AI Powered Tasks Organizer
      </h1>
      <p className="text-3xl text-white pt-10 opacity-75 mb-10">
        Write in natural language, TO handles the rest.
      </p>
      <Button variant="default" size="lg">
        <Link href="/sign-up">Get Started</Link>
      </Button>
    </div>
  )
}
