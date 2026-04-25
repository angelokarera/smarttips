import { useState, useMemo } from 'react'
import { ArrowLeftRight, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const rates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 150.5,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.19,
  INR: 83.3,
  MXN: 17.1,
  BRL: 4.97,
  SGD: 1.34,
  KRW: 1330,
  HKD: 7.82,
  NZD: 1.61,
  SEK: 10.3,
  NOK: 10.5,
  DKK: 6.87,
  PLN: 4.0,
  THB: 35.5,
  AED: 3.67,
  SAR: 3.75,
  ZAR: 18.9,
  TRY: 30.8,
  RUB: 91.5,
  IDR: 15600,
  MYR: 4.75,
  PHP: 55.8,
  VND: 24500,
  EGP: 30.9,
  PKR: 279,
  BDT: 109.5,
  NGN: 1500,
  COP: 3900,
  CLP: 965,
  PEN: 3.74,
  ARS: 830,
}

const currencies = Object.keys(rates)

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100)
  const [fromCurrency, setFromCurrency] = useState('USD')
  const [toCurrency, setToCurrency] = useState('EUR')

  const result = useMemo(() => {
    const fromRate = rates[fromCurrency]
    const toRate = rates[toCurrency]
    return (amount / fromRate) * toRate
  }, [amount, fromCurrency, toCurrency])

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <Label className="mb-2 block">From</Label>
          <Select value={fromCurrency} onValueChange={setFromCurrency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center pb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const temp = fromCurrency
              setFromCurrency(toCurrency)
              setToCurrency(temp)
            }}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <Label className="mb-2 block">To</Label>
          <Select value={toCurrency} onValueChange={setToCurrency}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {currencies.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div>
        <Label className="mb-2 block">Amount</Label>
        <Input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          className="text-lg"
        />
      </div>

      <div className="p-6 rounded-xl border border-border bg-muted/30">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Result</span>
          <Button variant="ghost" size="sm" onClick={() => {
            setAmount(result)
            const temp = fromCurrency
            setFromCurrency(toCurrency)
            setToCurrency(temp)
          }}>
            <RefreshCw className="h-3 w-3 mr-1" />
            Swap
          </Button>
        </div>
        <p className="text-4xl font-bold">
          {result.toLocaleString(undefined, { maximumFractionDigits: 2 })} {toCurrency}
        </p>
        <p className="text-sm text-muted-foreground mt-2">
          1 {fromCurrency} = {(rates[toCurrency] / rates[fromCurrency]).toFixed(4)} {toCurrency}
        </p>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        Exchange rates are updated daily and are for reference only. Actual rates may vary.
      </p>
    </div>
  )
}
