import { useState, useMemo } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const lengthUnits: Record<string, number> = {
  meter: 1,
  kilometer: 1000,
  centimeter: 0.01,
  millimeter: 0.001,
  micrometer: 0.000001,
  nanometer: 1e-9,
  mile: 1609.344,
  yard: 0.9144,
  foot: 0.3048,
  inch: 0.0254,
  nautical_mile: 1852,
}

export default function LengthConverter() {
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('foot')
  const [value, setValue] = useState(1)

  const result = useMemo(() => {
    const fromFactor = lengthUnits[fromUnit]
    const toFactor = lengthUnits[toUnit]
    return (value * fromFactor) / toFactor
  }, [fromUnit, toUnit, value])

  const unitNames = Object.keys(lengthUnits)

  const quickConversions = [
    { label: '1 m to ft', from: 'meter', to: 'foot', val: 1 },
    { label: '1 km to mi', from: 'kilometer', to: 'mile', val: 1 },
    { label: '1 in to cm', from: 'inch', to: 'centimeter', val: 1 },
    { label: '1 yd to m', from: 'yard', to: 'meter', val: 1 },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-2">
        {quickConversions.map((q) => (
          <Button
            key={q.label}
            variant="outline"
            size="sm"
            onClick={() => {
              setFromUnit(q.from)
              setToUnit(q.to)
              setValue(q.val)
            }}
          >
            {q.label}
          </Button>
        ))}
      </div>

      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <Label className="mb-2 block">From</Label>
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {unitNames.map((u) => (
                <SelectItem key={u} value={u}>{u.replace('_', ' ')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-center pb-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              const temp = fromUnit
              setFromUnit(toUnit)
              setToUnit(temp)
            }}
          >
            <ArrowLeftRight className="h-4 w-4" />
          </Button>
        </div>

        <div>
          <Label className="mb-2 block">To</Label>
          <Select value={toUnit} onValueChange={setToUnit}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              {unitNames.map((u) => (
                <SelectItem key={u} value={u}>{u.replace('_', ' ')}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block">Value</Label>
          <Input type="number" value={value} onChange={(e) => setValue(Number(e.target.value))} />
        </div>
        <div>
          <Label className="mb-2 block">Result</Label>
          <Input value={result.toFixed(6).replace(/\.?0+$/, '')} readOnly className="bg-muted/30 font-mono" />
        </div>
      </div>
    </div>
  )
}
