import { useState, useCallback } from 'react'
import { RefreshCw, Copy, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'

export default function PasswordGenerator() {
  const [length, setLength] = useState([16])
  const [uppercase, setUppercase] = useState(true)
  const [lowercase, setLowercase] = useState(true)
  const [numbers, setNumbers] = useState(true)
  const [symbols, setSymbols] = useState(true)
  const [password, setPassword] = useState('')
  const [copied, setCopied] = useState(false)

  const generate = useCallback(() => {
    const chars = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+-=[]{}|;:,.<>?',
    }

    let pool = ''
    if (uppercase) pool += chars.uppercase
    if (lowercase) pool += chars.lowercase
    if (numbers) pool += chars.numbers
    if (symbols) pool += chars.symbols

    if (!pool) pool = chars.lowercase

    let result = ''
    const array = new Uint32Array(length[0])
    crypto.getRandomValues(array)
    for (let i = 0; i < length[0]; i++) {
      result += pool[array[i] % pool.length]
    }
    setPassword(result)
    setCopied(false)
  }, [length, uppercase, lowercase, numbers, symbols])

  const getStrength = () => {
    let score = 0
    if (uppercase) score++
    if (lowercase) score++
    if (numbers) score++
    if (symbols) score++
    if (length[0] >= 12) score++
    if (length[0] >= 20) score++

    if (score <= 2) return { label: 'Weak', color: 'bg-red-500' }
    if (score <= 4) return { label: 'Moderate', color: 'bg-amber-500' }
    return { label: 'Strong', color: 'bg-emerald-500' }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      <div className="p-6 rounded-xl border border-border bg-muted/30">
        <div className="flex items-center gap-3 mb-4">
          <Input
            value={password}
            readOnly
            className="text-lg font-mono tracking-wider"
          />
          <Button variant="outline" size="icon" onClick={handleCopy} disabled={!password}>
            {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
          </Button>
        </div>

        {password && (
          <div className="flex items-center gap-3">
            <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
              <div className={`h-full transition-all ${getStrength().color}`} style={{ width: `${(getStrength().label === 'Strong' ? 100 : getStrength().label === 'Moderate' ? 60 : 30)}%` }} />
            </div>
            <span className={`text-sm font-medium ${getStrength().color.replace('bg-', 'text-')}`}>
              {getStrength().label}
            </span>
          </div>
        )}
      </div>

      <div className="space-y-4">
        <div>
          <Label className="mb-2 block">Length: {length[0]}</Label>
          <Slider value={length} onValueChange={setLength} min={6} max={64} step={1} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox id="uppercase" checked={uppercase} onCheckedChange={(c) => setUppercase(c as boolean)} />
            <Label htmlFor="uppercase">Uppercase (A-Z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="lowercase" checked={lowercase} onCheckedChange={(c) => setLowercase(c as boolean)} />
            <Label htmlFor="lowercase">Lowercase (a-z)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="numbers" checked={numbers} onCheckedChange={(c) => setNumbers(c as boolean)} />
            <Label htmlFor="numbers">Numbers (0-9)</Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="symbols" checked={symbols} onCheckedChange={(c) => setSymbols(c as boolean)} />
            <Label htmlFor="symbols">Symbols (!@#$)</Label>
          </div>
        </div>
      </div>

      <Button onClick={generate} className="w-full">
        <RefreshCw className="h-4 w-4 mr-2" />
        Generate Password
      </Button>
    </div>
  )
}
