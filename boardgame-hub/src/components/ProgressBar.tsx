interface ProgressBarProps {
  current: number
  max: number
}

export default function ProgressBar({ current, max }: ProgressBarProps) {
  const percentage = Math.min((current / max) * 100, 100)

  return (
    <div className="w-full">
      <div className="flex justify-between mb-2">
        <span className="text-white/60 text-sm">XP</span>
        <span className="text-white font-bold">{current} / {max}</span>
      </div>
      <div className="w-full bg-white/10 rounded-full h-3 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full transition-all duration-700"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}