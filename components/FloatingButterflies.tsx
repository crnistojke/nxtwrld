"use client"

import { useEffect, useState } from "react"

export function FloatingButterflies() {
  const [butterflies, setButterflies] = useState<Array<{ id: number; delay: number; duration: number; color: string }>>(
    [],
  )

  useEffect(() => {
    const colors = [
      "from-pink-400 to-purple-500",
      "from-blue-400 to-cyan-500",
      "from-purple-400 to-pink-500",
      "from-cyan-400 to-blue-500",
      "from-indigo-400 to-purple-500",
      "from-violet-400 to-pink-500",
    ]

    const newButterflies = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 10,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setButterflies(newButterflies)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {butterflies.map((butterfly) => (
        <div
          key={butterfly.id}
          className="absolute animate-float opacity-20 hover:opacity-40 transition-opacity"
          style={{
            animationDelay: `${butterfly.delay}s`,
            animationDuration: `${butterfly.duration}s`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <div
            className={`w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br ${butterfly.color} rounded-full transform rotate-45 relative`}
          >
            <div
              className={`absolute -top-1 -left-1 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br ${butterfly.color} rounded-full`}
            ></div>
            <div
              className={`absolute -top-1 -right-1 w-4 h-4 md:w-6 md:h-6 bg-gradient-to-br ${butterfly.color} rounded-full`}
            ></div>
            <div
              className={`absolute -bottom-1 -left-1 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br ${butterfly.color} rounded-full`}
            ></div>
            <div
              className={`absolute -bottom-1 -right-1 w-3 h-3 md:w-4 md:h-4 bg-gradient-to-br ${butterfly.color} rounded-full`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  )
}
