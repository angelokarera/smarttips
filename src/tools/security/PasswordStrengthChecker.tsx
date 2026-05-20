import { useState, useMemo } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { analyzePasswordStrength } from '@/lib/security-utils'

export default function PasswordStrengthChecker() {
  const [password, setPassword] = useState('')
  const [show, setShow] = useState(false)

  const strength = useMemo(() => analyzePasswordStrength(password), [password])

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Rule-based strength analysis runs entirely in your browser. Your password is never sent to
        any server or stored.
      </p>

      <div className="space-y-2">
        <Label htmlFor="pwd-check">Password to analyze</Label>
        <div className="relative">
          <Input
            id="pwd-check"
            type={show ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password..."
            className="pr-10 font-mono"
            autoComplete="off"
          />
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={show ? 'Hide password' : 'Show password'}
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {password && (
        <div className="rounded-xl border border-border bg-muted/30 p-6 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm font-semibold">Strength</span>
            <span className="text-sm font-bold">{strength.label}</span>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${strength.color}`}
              style={{ width: `${Math.min(100, (strength.score / 10) * 100)}%` }}
            />
          </div>
          <ul className="space-y-2">
            {strength.feedback.map((tip) => (
              <li key={tip} className="text-sm text-muted-foreground flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
