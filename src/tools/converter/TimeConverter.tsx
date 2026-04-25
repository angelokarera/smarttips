import { useState } from 'react'
import { Clock, ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const timeZones = [
  { label: 'UTC', offset: 0 },
  { label: 'London (GMT/BST)', offset: 0 },
  { label: 'New York (EST/EDT)', offset: -5 },
  { label: 'Los Angeles (PST/PDT)', offset: -8 },
  { label: 'Chicago (CST/CDT)', offset: -6 },
  { label: 'Toronto (EST/EDT)', offset: -5 },
  { label: 'Sao Paulo (BRT)', offset: -3 },
  { label: 'Paris (CET/CEST)', offset: 1 },
  { label: 'Berlin (CET/CEST)', offset: 1 },
  { label: 'Moscow (MSK)', offset: 3 },
  { label: 'Dubai (GST)', offset: 4 },
  { label: 'Mumbai (IST)', offset: 5.5 },
  { label: 'Bangkok (ICT)', offset: 7 },
  { label: 'Singapore (SGT)', offset: 8 },
  { label: 'Hong Kong (HKT)', offset: 8 },
  { label: 'Shanghai (CST)', offset: 8 },
  { label: 'Tokyo (JST)', offset: 9 },
  { label: 'Seoul (KST)', offset: 9 },
  { label: 'Sydney (AEDT)', offset: 11 },
  { label: 'Auckland (NZDT)', offset: 13 },
]

export default function TimeConverter() {
  const [dateTime, setDateTime] = useState(() => {
    const now = new Date()
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
    return now.toISOString().slice(0, 16)
  })
  const [fromZone, setFromZone] = useState('UTC')
  const [toZone, setToZone] = useState('New York (EST/EDT)')

  const convert = () => {
    const fromOffset = timeZones.find((z) => z.label === fromZone)?.offset || 0
    const toOffset = timeZones.find((z) => z.label === toZone)?.offset || 0

    const localDate = new Date(dateTime)
    const utcMs = localDate.getTime() - fromOffset * 3600000
    const targetMs = utcMs + toOffset * 3600000

    const result = new Date(targetMs)
    return result.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-2 block flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Date & Time
        </Label>
        <Input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full sm:w-80"
        />
      </div>

      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <Label className="mb-2 block">From Time Zone</Label>
          <Select value={fromZone} onValueChange={setFromZone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {timeZones.map((z) => (
                <SelectItem key={z.label} value={z.label}>{z.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center pb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const temp = fromZone
              setFromZone(toZone)
              setToZone(temp)
            }}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <Label className="mb-2 block">To Time Zone</Label>
          <Select value={toZone} onValueChange={setToZone}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {timeZones.map((z) => (
                <SelectItem key={z.label} value={z.label}>{z.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="p-6 rounded-xl border border-border bg-muted/30 text-center">
        <p className="text-sm text-muted-foreground mb-2">Converted Time</p>
        <p className="text-2xl font-bold">{convert()}</p>
      </div>
    </div>
  )
}
