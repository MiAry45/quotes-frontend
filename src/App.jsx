import { useState } from "react"

function App() {
  const [quotes, setQuotes] = useState("")
  const [stories, setStories] = useState("")
  const [currentMood, setCurrentMood] = useState(null)

  const moodToColorMap = {
    happy: "yellow",
    sad: "blue",
    hopeless: "violet",
    anger: "red"
  }

  // Tailwind-safe full shadow classes
  const glowingShadowClassMap = {
    red: "shadow-[0_0_30px_#ef4444]",
    yellow: "shadow-[0_0_30px_#facc15]",
    blue: "shadow-[0_0_30px_#3b82f6]",
    violet: "shadow-[0_0_30px_#8b5cf6]"
  }

  async function fetchMood(mood) {
    setCurrentMood(mood)
    const res = await fetch(`http://localhost:5000/random/${mood}`)
    const data = await res.json()
    setQuotes(data.quote)
    setStories(data.story)
  }

  const currentColor = moodToColorMap[currentMood] || "violet"
  const currentShadowClass = glowingShadowClassMap[currentColor]

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold mb-8 drop-shadow-lg">Quotes & Stories</h1>
      <h1 className="text-2xl font-bold mb-8 drop-shadow-md">Choose your mood!</h1>

      {/* Mood buttons */}
      <div className="flex gap-4 mb-10 flex-wrap justify-center">
        {[
          { mood: "happy", color: "yellow" },
          { mood: "sad", color: "blue" },
          { mood: "hopeless", color: "violet" },
          { mood: "anger", color: "red" },
        ].map(({ mood, color }) => (
          <button
            key={mood}
            onClick={() => fetchMood(mood)}
            className={`
              bg-${color}-500 px-6 py-3 rounded-xl font-semibold 
              hover:scale-105 transition 
              ${glowingShadowClassMap[color]} 
              backdrop-blur-md bg-opacity-80
            `}
          >
            {mood.charAt(0).toUpperCase() + mood.slice(1)}
          </button>
        ))}
      </div>

      {/* Quote box */}
      <div
        className={`
          w-full max-w-lg text-center mt-4 p-6 rounded-2xl 
          bg-white/10 border border-white/20 backdrop-blur-md 
          ${currentShadowClass} transition-all duration-300
        `}
      >
        <h2 className="text-2xl font-bold mb-4">Quote</h2>
        <p className="text-lg italic">{quotes || "Click a mood to get a quote"}</p>
      </div>

      {/* Story box */}
      <div
        className={`
          w-full max-w-lg text-center mt-6 p-6 rounded-2xl 
          bg-white/10 border border-white/20 backdrop-blur-md 
          ${currentShadowClass} transition-all duration-300
        `}
      >
        <h2 className="text-2xl font-bold mb-4">Story</h2>
        <p className="text-lg">{stories || "Click a mood to get a story"}</p>
      </div>
    </div>
  )
}

export default App
