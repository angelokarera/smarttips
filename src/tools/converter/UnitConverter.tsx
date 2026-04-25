import { useState, useMemo } from 'react'
import { ArrowLeftRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const unitCategories: Record<string, { label: string; units: Record<string, number> }> = {
  length: {
    label: 'Length',
    units: {
      meter: 1,
      kilometer: 1000,
      centimeter: 0.01,
      millimeter: 0.001,
      mile: 1609.344,
      yard: 0.9144,
      foot: 0.3048,
      inch: 0.0254,
    },
  },
  weight: {
    label: 'Weight',
    units: {
      kilogram: 1,
      gram: 0.001,
      milligram: 0.000001,
      pound: 0.453592,
      ounce: 0.0283495,
      ton: 1000,
    },
  },
  temperature: {
    label: 'Temperature',
    units: {
      celsius: 1,
      fahrenheit: 1,
      kelvin: 1,
    },
  },
  volume: {
    label: 'Volume',
    units: {
      liter: 1,
      milliliter: 0.001,
      gallon: 3.78541,
      quart: 0.946353,
      pint: 0.473176,
      cup: 0.24,
      fluid_ounce: 0.0295735,
    },
  },
  area: {
    label: 'Area',
    units: {
      'square meter': 1,
      'square kilometer': 1000000,
      'square foot': 0.092903,
      'square inch': 0.00064516,
      acre: 4046.86,
      hectare: 10000,
    },
  },
  speed: {
    label: 'Speed',
    units: {
      'meter/second': 1,
      'kilometer/hour': 0.277778,
      'mile/hour': 0.44704,
      knot: 0.514444,
    },
  },
}

export default function UnitConverter() {
  const [category, setCategory] = useState('length')
  const [fromUnit, setFromUnit] = useState('meter')
  const [toUnit, setToUnit] = useState('foot')
  const [value, setValue] = useState(1)

  const units = unitCategories[category].units

  const result = useMemo(() => {
    if (category === 'temperature') {
      const val = Number(value)
      let celsius: number
      if (fromUnit === 'celsius') celsius = val
      else if (fromUnit === 'fahrenheit') celsius = (val - 32) * 5 / 9
      else celsius = val - 273.15

      if (toUnit === 'celsius') return celsius
      if (toUnit === 'fahrenheit') return celsius * 9 / 5 + 32
      return celsius + 273.15
    }

    const fromFactor = units[fromUnit]
    const toFactor = units[toUnit]
    return (Number(value) * fromFactor) / toFactor
  }, [category, fromUnit, toUnit, value, units])

  const unitNames = Object.keys(units)

  return (
    <div className="space-y-6">
      <div>
        <Label className="mb-2 block">Category</Label>
        <Select value={category} onValueChange={(v) => {
          setCategory(v)
          const newUnits = Object.keys(unitCategories[v].units)
          setFromUnit(newUnits[0])
          setToUnit(newUnits[1] || newUnits[0])
        }}>
          <SelectTrigger className="w-64">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(unitCategories).map(([key, cat]) => (
              <SelectItem key={key} value={key}>{cat.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <Label className="mb-2 block">From</Label>
          <Select value={fromUnit} onValueChange={setFromUnit}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {unitNames.map((u) => (
                <SelectItem key={u} value={u}>{u}</SelectItem>
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
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {unitNames.map((u) => (
                <SelectItem key={u} value={u}>{u}</SelectItem>
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
          <Input value={typeof result === 'number' ? result.toFixed(6).replace(/\.?0+$/, '') : result} readOnly className="bg-muted/30 font-mono" />
        </div>
      </div>
    </div>
  )
}
