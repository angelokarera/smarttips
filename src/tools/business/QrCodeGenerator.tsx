import { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Download, Link, Wifi, Mail, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

export default function QrCodeGenerator() {
  const [type, setType] = useState('url')
  const [value, setValue] = useState('https://smartytips.com')
  const [size, setSize] = useState(256)
  const [level, setLevel] = useState('M')

  const [wifiData, setWifiData] = useState({ ssid: '', password: '', security: 'WPA' })
  const [contactData, setContactData] = useState({ name: '', phone: '', email: '' })

  const getQrValue = () => {
    switch (type) {
      case 'url':
        return value
      case 'wifi':
        return `WIFI:T:${wifiData.security};S:${wifiData.ssid};P:${wifiData.password};;`
      case 'contact':
        return `BEGIN:VCARD\nVERSION:3.0\nFN:${contactData.name}\nTEL:${contactData.phone}\nEMAIL:${contactData.email}\nEND:VCARD`
      case 'email':
        return `mailto:${value}`
      case 'phone':
        return `tel:${value}`
      default:
        return value
    }
  }

  const handleDownload = () => {
    const svg = document.querySelector('#qr-code svg') as SVGSVGElement
    if (!svg) return
    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = size
      canvas.height = size
      ctx?.drawImage(img, 0, 0)
      const a = document.createElement('a')
      a.download = 'qrcode.png'
      a.href = canvas.toDataURL('image/png')
      a.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <div className="space-y-6">
      <Tabs value={type} onValueChange={setType}>
        <TabsList className="grid grid-cols-5">
          <TabsTrigger value="url"><Link className="h-4 w-4 mr-1" />URL</TabsTrigger>
          <TabsTrigger value="wifi"><Wifi className="h-4 w-4 mr-1" />WiFi</TabsTrigger>
          <TabsTrigger value="contact"><User className="h-4 w-4 mr-1" />Contact</TabsTrigger>
          <TabsTrigger value="email"><Mail className="h-4 w-4 mr-1" />Email</TabsTrigger>
          <TabsTrigger value="phone"><Phone className="h-4 w-4 mr-1" />Phone</TabsTrigger>
        </TabsList>

        <TabsContent value="url" className="space-y-4">
          <div>
            <Label>URL</Label>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="https://example.com" />
          </div>
        </TabsContent>

        <TabsContent value="wifi" className="space-y-4">
          <div>
            <Label>Network Name (SSID)</Label>
            <Input value={wifiData.ssid} onChange={(e) => setWifiData({ ...wifiData, ssid: e.target.value })} />
          </div>
          <div>
            <Label>Password</Label>
            <Input type="password" value={wifiData.password} onChange={(e) => setWifiData({ ...wifiData, password: e.target.value })} />
          </div>
          <div>
            <Label>Security</Label>
            <Select value={wifiData.security} onValueChange={(v) => setWifiData({ ...wifiData, security: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="WPA">WPA/WPA2</SelectItem>
                <SelectItem value="WEP">WEP</SelectItem>
                <SelectItem value="nopass">None</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="space-y-4">
          <div>
            <Label>Name</Label>
            <Input value={contactData.name} onChange={(e) => setContactData({ ...contactData, name: e.target.value })} />
          </div>
          <div>
            <Label>Phone</Label>
            <Input value={contactData.phone} onChange={(e) => setContactData({ ...contactData, phone: e.target.value })} />
          </div>
          <div>
            <Label>Email</Label>
            <Input value={contactData.email} onChange={(e) => setContactData({ ...contactData, email: e.target.value })} />
          </div>
        </TabsContent>

        <TabsContent value="email" className="space-y-4">
          <div>
            <Label>Email Address</Label>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="someone@example.com" />
          </div>
        </TabsContent>

        <TabsContent value="phone" className="space-y-4">
          <div>
            <Label>Phone Number</Label>
            <Input value={value} onChange={(e) => setValue(e.target.value)} placeholder="+1 234 567 8900" />
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <Label className="mb-2 block">Size: {size}px</Label>
          <input
            type="range"
            min="128"
            max="512"
            step="32"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            className="w-full"
          />
        </div>
        <div>
          <Label className="mb-2 block">Error Correction</Label>
          <Select value={level} onValueChange={setLevel}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="L">Low (7%)</SelectItem>
              <SelectItem value="M">Medium (15%)</SelectItem>
              <SelectItem value="Q">Quartile (25%)</SelectItem>
              <SelectItem value="H">High (30%)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col items-center gap-4 p-6 rounded-xl border border-border bg-muted/30">
        <div id="qr-code">
          <QRCodeSVG value={getQrValue()} size={size} level={level as 'L' | 'M' | 'Q' | 'H'} />
        </div>
        <Button variant="outline" onClick={handleDownload}>
          <Download className="h-4 w-4 mr-2" />
          Download PNG
        </Button>
      </div>
    </div>
  )
}
