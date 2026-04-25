import { useState, useMemo } from 'react'
import { Calendar, Clock } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState('1990-01-01')
  const [toDate, setToDate] = useState(new Date().toISOString().split('T')[0])

  const age = useMemo(() => {
    if (!birthDate || !toDate) return null

    const birth = new Date(birthDate)
    const target = new Date(toDate)

    if (isNaN(birth.getTime()) || isNaN(target.getTime())) return null
    if (target < birth) return null

    let years = target.getFullYear() - birth.getFullYear()
    let months = target.getMonth() - birth.getMonth()
    let days = target.getDate() - birth.getDate()

    if (days < 0) {
      months--
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0)
      days += prevMonth.getDate()
    }
    if (months < 0) {
      years--
      months += 12
    }

    const diffMs = target.getTime() - birth.getTime()
    const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60))
    const totalMinutes = Math.floor(diffMs / (1000 * 60))
    const totalSeconds = Math.floor(diffMs / 1000)

    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

    return {
      years,
      months,
      days,
      totalDays,
      totalHours,
      totalMinutes,
      totalSeconds,
      birthDayOfWeek: daysOfWeek[birth.getDay()],
      nextBirthday: (() => {
        const next = new Date(target.getFullYear(), birth.getMonth(), birth.getDate())
        if (next < target) next.setFullYear(next.getFullYear() + 1)
        const daysUntil = Math.ceil((next.getTime() - target.getTime()) / (1000 * 60 * 60 * 24))
        return { date: next.toISOString().split('T')[0], daysUntil }
      })(),
    }
  }, [birthDate, toDate])

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Birth Date
          </Label>
          <Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
        <div>
          <Label className="mb-2 block flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Calculate To
          </Label>
          <Input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
      </div>

      {age && (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatCard label="Years" value={age.years} />
          <StatCard label="Months" value={age.months} />
          <StatCard label="Days" value={age.days} />
          <StatCard label="Total Days" value={age.totalDays.toLocaleString()} />
          <StatCard label="Total Hours" value={age.totalHours.toLocaleString()} />
          <StatCard label="Total Minutes" value={age.totalMinutes.toLocaleString()} />
        </div>
      )}

      {age && (
        <div className="p-5 rounded-xl border border-border bg-muted/30 space-y-3">
          <h3 className="font-semibold">Fun Facts</h3>
          <p className="text-sm text-muted-foreground">
            You were born on a <strong>{age.birthDayOfWeek}</strong>
          </p>
          <p className="text-sm text-muted-foreground">
            Your next birthday is in <strong>{age.nextBirthday.daysUntil}</strong> days 
            ({age.nextBirthday.date})
          </p>
          <p className="text-sm text-muted-foreground">
            You have lived approximately <strong>{Math.floor(age.totalDays / 365.25)}</strong> years 
            or <strong>{(age.totalSeconds / 1000000).toFixed(1)}M</strong> seconds
          </p>
        </div>
      )}
    </div>
  )
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="p-4 rounded-xl border border-border bg-muted/30 text-center">
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-sm text-muted-foreground mt-1">{label}</p>
    </div>
  )
}
