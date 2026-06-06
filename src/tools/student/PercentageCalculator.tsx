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
      case 'percent-change': {
        if (!values.a || !values.b) return ''
        const change = Number(values.b) - Number(values.a)
        return ((change / Number(values.a)) * 100).toFixed(2) + '%'
      }
      case 'discount': {
        if (!values.a || !values.b) return ''
        const original = Number(values.a)
        const discountPercent = Number(values.b)
        const savings = (original * discountPercent) / 100
        const finalPrice = original - savings
        return `Sale Price: $${finalPrice.toFixed(2)} (Saved $${savings.toFixed(2)})`
      }
      case 'profit': {
        if (!values.a || !values.b) return ''
        const cost = Number(values.a)
        const revenue = Number(values.b)
        const profit = revenue - cost
        const margin = revenue ? ((profit / revenue) * 100).toFixed(2) : '0.00'
        const markup = cost ? ((profit / cost) * 100).toFixed(2) : '0.00'
        return `Profit: $${profit.toFixed(2)} | Margin: ${margin}% | Markup: ${markup}%`
      }
      default:
        return ''
    }
  }

  const result = calculate()

  return (
    <div className="space-y-6">
      <Tabs value={mode} onValueChange={setMode}>
        <TabsList className="grid h-auto w-full grid-cols-2 sm:grid-cols-5 gap-1">
          <TabsTrigger value="what-percent">What %</TabsTrigger>
          <TabsTrigger value="percent-of">% Of</TabsTrigger>
          <TabsTrigger value="percent-change">% Change</TabsTrigger>
          <TabsTrigger value="discount">Discount</TabsTrigger>
          <TabsTrigger value="profit">Profit</TabsTrigger>
        </TabsList>

        <TabsContent value="what-percent" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">What percentage is one number of another?</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
            <div>
              <Label className="mb-2 block">Value</Label>
              <Input type="number" value={values.a} onChange={(e) => setValues({ ...values, a: e.target.value })} />
            </div>
            <div className="flex justify-center sm:pt-6">
              <ArrowRightLeft className="h-4 w-4 mx-auto text-muted-foreground" />
            </div>
            <div>
              <Label className="mb-2 block">Of Total</Label>
              <Input type="number" value={values.b} onChange={(e) => setValues({ ...values, b: e.target.value })} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="percent-of" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">What is a percentage of a number?</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
            <div>
              <Label className="mb-2 block">Percentage</Label>
              <Input type="number" value={values.c} onChange={(e) => setValues({ ...values, c: e.target.value })} />
            </div>
            <div className="flex justify-center sm:pt-6">
              <Percent className="h-4 w-4 mx-auto text-muted-foreground" />
            </div>
            <div>
              <Label className="mb-2 block">Of Number</Label>
              <Input type="number" value={values.d} onChange={(e) => setValues({ ...values, d: e.target.value })} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="percent-change" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">Calculate percentage increase or decrease.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
            <div>
              <Label className="mb-2 block">Original Value</Label>
              <Input type="number" value={values.a} onChange={(e) => setValues({ ...values, a: e.target.value })} />
            </div>
            <div className="flex justify-center sm:pt-6">
              <ArrowRightLeft className="h-4 w-4 mx-auto text-muted-foreground" />
            </div>
            <div>
              <Label className="mb-2 block">New Value</Label>
              <Input type="number" value={values.b} onChange={(e) => setValues({ ...values, b: e.target.value })} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="discount" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">Calculate sale price and savings from discount.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
            <div>
              <Label className="mb-2 block">Original Price ($)</Label>
              <Input type="number" value={values.a} onChange={(e) => setValues({ ...values, a: e.target.value })} />
            </div>
            <div className="flex justify-center sm:pt-6">
              <Percent className="h-4 w-4 mx-auto text-muted-foreground" />
            </div>
            <div>
              <Label className="mb-2 block">Discount Rate (%)</Label>
              <Input type="number" value={values.b} onChange={(e) => setValues({ ...values, b: e.target.value })} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="profit" className="space-y-4 pt-4">
          <p className="text-sm text-muted-foreground">Calculate profit margins and markups.</p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-center sm:gap-4">
            <div>
              <Label className="mb-2 block">Cost Price ($)</Label>
              <Input type="number" value={values.a} onChange={(e) => setValues({ ...values, a: e.target.value })} />
            </div>
            <div className="flex justify-center sm:pt-6">
              <ArrowRightLeft className="h-4 w-4 mx-auto text-muted-foreground" />
            </div>
            <div>
              <Label className="mb-2 block">Selling Price ($)</Label>
              <Input type="number" value={values.b} onChange={(e) => setValues({ ...values, b: e.target.value })} />
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {result && (
        <div className="p-6 rounded-xl border border-border bg-muted/30 text-center">
          <p className="text-sm text-muted-foreground mb-1">Result</p>
          <p className="text-xl font-bold sm:text-2xl">{result}</p>
        </div>
      )}
    </div>
  )
}
