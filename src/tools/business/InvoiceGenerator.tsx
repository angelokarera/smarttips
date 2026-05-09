import { useState } from 'react'
import { Download, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface LineItem {
  description: string
  quantity: number
  price: number
}

export default function InvoiceGenerator() {
  const [from, setFrom] = useState({ name: 'Your Company', email: '', address: '' })
  const [to, setTo] = useState({ name: 'Client Name', email: '', address: '' })
  const [items, setItems] = useState<LineItem[]>([
    { description: 'Web Design', quantity: 1, price: 500 },
  ])
  const [taxRate, setTaxRate] = useState(0)
  const [invoiceNumber, setInvoiceNumber] = useState('001')
  const [date, setDate] = useState(new Date().toISOString().split('T')[0])

  const subtotal = items.reduce((sum, item) => sum + item.quantity * item.price, 0)
  const tax = subtotal * (taxRate / 100)
  const total = subtotal + tax

  const addItem = () => setItems([...items, { description: '', quantity: 1, price: 0 }])
  const removeItem = (index: number) => setItems(items.filter((_, i) => i !== index))
  const updateItem = (index: number, field: keyof LineItem, value: string | number) => {
    const updated = [...items]
    updated[index] = { ...updated[index], [field]: value }
    setItems(updated)
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <h3 className="font-semibold">From</h3>
          <Input placeholder="Your Company" value={from.name} onChange={(e) => setFrom({ ...from, name: e.target.value })} />
          <Input placeholder="Your Email" value={from.email} onChange={(e) => setFrom({ ...from, email: e.target.value })} />
          <Input placeholder="Your Address" value={from.address} onChange={(e) => setFrom({ ...from, address: e.target.value })} />
        </div>
        <div className="space-y-3">
          <h3 className="font-semibold">Bill To</h3>
          <Input placeholder="Client Name" value={to.name} onChange={(e) => setTo({ ...to, name: e.target.value })} />
          <Input placeholder="Client Email" value={to.email} onChange={(e) => setTo({ ...to, email: e.target.value })} />
          <Input placeholder="Client Address" value={to.address} onChange={(e) => setTo({ ...to, address: e.target.value })} />
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-4">
        <div>
          <Label>Invoice #</Label>
          <Input value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
        </div>
        <div>
          <Label>Date</Label>
          <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <Label>Tax Rate (%)</Label>
          <Input type="number" value={taxRate} onChange={(e) => setTaxRate(Number(e.target.value))} />
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex flex-col gap-3 min-[420px]:flex-row min-[420px]:items-center min-[420px]:justify-between">
          <h3 className="font-semibold">Line Items</h3>
          <Button variant="outline" size="sm" onClick={addItem} className="w-full min-[420px]:w-auto">
            <Plus className="h-4 w-4 mr-1" /> Add Item
          </Button>
        </div>
        {items.map((item, index) => (
          <div key={index} className="grid grid-cols-2 gap-2 rounded-xl border border-border p-3 sm:grid-cols-12 sm:items-center sm:border-0 sm:p-0">
            <div className="col-span-2 sm:col-span-5">
              <Input placeholder="Description" value={item.description} onChange={(e) => updateItem(index, 'description', e.target.value)} />
            </div>
            <div className="col-span-1 sm:col-span-2">
              <Input type="number" placeholder="Qty" value={item.quantity} onChange={(e) => updateItem(index, 'quantity', Number(e.target.value))} />
            </div>
            <div className="col-span-1 sm:col-span-3">
              <Input type="number" placeholder="Price" value={item.price} onChange={(e) => updateItem(index, 'price', Number(e.target.value))} />
            </div>
            <div className="col-span-2 flex items-center justify-between text-right sm:col-span-2 sm:justify-end">
              <span className="text-sm font-medium">${(item.quantity * item.price).toFixed(2)}</span>
              {items.length > 1 && (
                <Button variant="ghost" size="icon" className="h-6 w-6 ml-2" onClick={() => removeItem(index)}>
                  <Trash2 className="h-3 w-3" />
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="p-4 rounded-xl border border-border bg-muted/30 space-y-2">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>Tax ({taxRate}%)</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button onClick={handlePrint} className="w-full min-[420px]:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Print / Save PDF
        </Button>
      </div>
    </div>
  )
}
