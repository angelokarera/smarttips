import { useState } from 'react'
import { Percent, ArrowRightLeft } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function PercentageCalculator() {
  const [mode, setMode] = useState('what-percent')
  const [values, setValues] = useState({ a: '', b: '', c: '', d: '' })

  const calculate = () => {
    switch (mode) {
      case 'what-percent':
        return values.a && values.b ? ((Number(values.a) / Number(values.b)) * 100).toFixed(2) + '%' : ''
      case 'percent-of':
        return values.c && values.d ? ((Number(values.c) / 100) * Number(values.d)).toFixed(2) : ''
      case 'percent-change':
        if (!values.a || !values.b) return ''
        const change = Number(values.b) - Number(values.a)
        return ((change / Number(values.a)) * 100).toFixed(2) + '%'
      default:
        return ''
    }
  }

  const result = calculate()

  return (
    <div className="space-y-6">
      <Tabs value={mode} onValueChange={setMode}>
        <TabsList className="grid grid-cols-3">
          <TabsTrigger value="what-percent">What %</TabsTrigger>
          <TabsTrigger value="percent-of">% Of</TabsTrigger>
          <TabsTrigger value="percent-change">% Change</TabsTrigger>
        </TabsList>

        <TabsContent value="what-percent" className="space-y-4">
          <p className="text-sm text-muted-foreground">What percentage is one number of another?</p>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div>
              <Label className="mb-2 block">Value</Label>
              <Input type="number" value={values.a} onChange={(e) => setValues({ ...values, a: e.target.value })} />
            </div>
            <div className="text-center pt-6">
              <ArrowRightLeft className="h-4 w-4 mx-auto text-muted-foreground" />
            </div>
            <div>
              <Label className="mb-2 block">Of Total</Label>
              <Input type="number" value={values.b} onChange={(e) => setValues({ ...values, b: e.target.value })} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="percent-of" className="space-y-4">
          <p className="text-sm text-muted-foreground">What is a percentage of a number?</p>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div>
              <Label className="mb-2 block">Percentage</Label>
              <Input type="number" value={values.c} onChange={(e) => setValues({ ...values, c: e.target.value })} />
            </div>
            <div className="text-center pt-6">
              <Percent className="h-4 w-4 mx-auto text-muted-foreground" />
            </div>
            <div>
              <Label className="mb-2 block">Of Number</Label>
              <Input type="number" value={values.d} onChange={(e) => setValues({ ...values, d: e.target.value })} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="percent-change" className="space-y-4">
          <p className="text-sm text-muted-foreground">Calculate percentage increase or decrease.</p>
          <div className="grid grid-cols-3 gap-4 items-center">
            <div>
              <Label className="mb-2 block">Original</Label>
              <Input type="number" value={values.a} onChange={(e) => setValues({ ...values, a: e.target.value })} />
            </div>
            <div className="text-center pt-6">
              <ArrowRightLeft className="h-4 w-4 mx-auto text-muted-foreground" />
            </div>
            <div>
              <Label className="mb-2 block">New</Label>
              <Input type="number" value={values.b} onChange={(e) => setValues({ ...values, b: e.target.value })} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {result && (
        <div className="p-6 rounded-xl border border-border bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground mb-1">Result</p>
          <p className="text-4xl font-bold">{result}</p>
        </div>
      )}
    </div>
  )
}
