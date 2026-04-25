import { useState, useMemo } from 'react'
import { TrendingUp, DollarSign, Calendar, Percent } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Slider } from '@/components/ui/slider'

export default function CompoundInterest() {
  const [principal, setPrincipal] = useState(10000)
  const [rate, setRate] = useState([5])
  const [years, setYears] = useState([10])
  const [monthly, setMonthly] = useState(100)
  const [frequency, setFrequency] = useState('12')

  const result = useMemo(() => {
    const r = rate[0] / 100
    const n = Number(frequency)
    const t = years[0]
    const p = principal
    const m = monthly

    const amount = p * Math.pow(1 + r / n, n * t) + m * ((Math.pow(1 + r / n, n * t) - 1) / (r / n))
    const totalContributions = p + m * 12 * t
    const interest = amount - totalContributions

    const yearlyData = []
    for (let year = 1; year <= t; year++) {
      const yearAmount = p * Math.pow(1 + r / n, n * year) + m * ((Math.pow(1 + r / n, n * year) - 1) / (r / n))
      yearlyData.push({ year, amount: yearAmount })
    }

    return { amount, interest, totalContributions, yearlyData }
  }, [principal, rate, years, monthly, frequency])

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div>
          <Label className="mb-2 block flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            Initial Investment
          </Label>
          <Input type="number" value={principal} onChange={(e) => setPrincipal(Number(e.target.value))} />
        </div>
        <div>
          <Label className="mb-2 block flex items-center gap-2">
            <Percent className="h-4 w-4" />
            Annual Rate
          </Label>
          <div className="pt-2">
            <Slider value={rate} onValueChange={setRate} min={0.1} max={20} step={0.1} />
            <p className="text-sm text-muted-foreground mt-1">{rate[0]}%</p>
          </div>
        </div>
        <div>
          <Label className="mb-2 block flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Years
          </Label>
          <div className="pt-2">
            <Slider value={years} onValueChange={setYears} min={1} max={50} step={1} />
            <p className="text-sm text-muted-foreground mt-1">{years[0]} years</p>
          </div>
        </div>
        <div>
          <Label className="mb-2 block flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Monthly Contribution
          </Label>
          <Input type="number" value={monthly} onChange={(e) => setMonthly(Number(e.target.value))} />
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Compounding Frequency</Label>
        <Select value={frequency} onValueChange={setFrequency}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="1">Annually</SelectItem>
            <SelectItem value="2">Semi-annually</SelectItem>
            <SelectItem value="4">Quarterly</SelectItem>
            <SelectItem value="12">Monthly</SelectItem>
            <SelectItem value="365">Daily</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-xl border border-border bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground mb-1">Final Amount</p>
          <p className="text-3xl font-bold">${result.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="p-5 rounded-xl border border-border bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground mb-1">Total Contributions</p>
          <p className="text-3xl font-bold">${result.totalContributions.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
        <div className="p-5 rounded-xl border border-border bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground mb-1">Interest Earned</p>
          <p className="text-3xl font-bold text-emerald-600">${result.interest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
        </div>
      </div>

      <div className="p-4 rounded-xl border border-border bg-muted/30">
        <h3 className="font-semibold mb-3">Year by Year Growth</h3>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {result.yearlyData.map((data) => (
            <div key={data.year} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground w-16">Year {data.year}</span>
              <div className="flex-1 mx-3 h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full bg-primary transition-all"
                  style={{ width: `${(data.amount / result.amount) * 100}%` }}
                />
              </div>
              <span className="font-medium w-28 text-right">
                ${data.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
