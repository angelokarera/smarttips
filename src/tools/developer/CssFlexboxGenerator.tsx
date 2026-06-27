import { useState } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function CssFlexboxGenerator() {
  const [flexDirection, setFlexDirection] = useState<'row' | 'row-reverse' | 'column' | 'column-reverse'>('row')
  const [flexWrap, setFlexWrap] = useState<'nowrap' | 'wrap' | 'wrap-reverse'>('nowrap')
  const [justifyContent, setJustifyContent] = useState<
    'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  >('flex-start')
  const [alignItems, setAlignItems] = useState<'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline'>('stretch')
  const [alignContent, setAlignContent] = useState<
    'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around'
  >('stretch')
  const [gap, setGap] = useState<number>(16)
  const [itemCount, setItemCount] = useState<number>(4)

  const generatedCss = `.flex-container {
  display: flex;
  flex-direction: ${flexDirection};
  flex-wrap: ${flexWrap};
  justify-content: ${justifyContent};
  align-items: ${alignItems};
  align-content: ${alignContent};
  gap: ${gap}px;
}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCss)
    toast.success('CSS copied to clipboard!')
  }

  const resetAll = () => {
    setFlexDirection('row')
    setFlexWrap('nowrap')
    setJustifyContent('flex-start')
    setAlignItems('stretch')
    setAlignContent('stretch')
    setGap(16)
    setItemCount(4)
    toast.success('Reset settings')
  }

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Generate CSS Flexbox layouts visually. Adjust the properties below and copy the generated CSS.
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="space-y-4 lg:col-span-1 bg-card/45 p-5 rounded-xl border border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">Flex Container Properties</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">flex-direction</label>
            <select
              value={flexDirection}
              onChange={(e) => setFlexDirection(e.target.value as 'row' | 'row-reverse' | 'column' | 'column-reverse')}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="row">row</option>
              <option value="row-reverse">row-reverse</option>
              <option value="column">column</option>
              <option value="column-reverse">column-reverse</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">flex-wrap</label>
            <select
              value={flexWrap}
              onChange={(e) => setFlexWrap(e.target.value as 'nowrap' | 'wrap' | 'wrap-reverse')}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="nowrap">nowrap</option>
              <option value="wrap">wrap</option>
              <option value="wrap-reverse">wrap-reverse</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">justify-content</label>
            <select
              value={justifyContent}
              onChange={(e) => setJustifyContent(e.target.value as 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly')}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
              <option value="space-evenly">space-evenly</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">align-items</label>
            <select
              value={alignItems}
              onChange={(e) => setAlignItems(e.target.value as 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'baseline')}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="baseline">baseline</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground">align-content</label>
            <select
              value={alignContent}
              onChange={(e) => setAlignContent(e.target.value as 'stretch' | 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around')}
              className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary"
            >
              <option value="stretch">stretch</option>
              <option value="flex-start">flex-start</option>
              <option value="flex-end">flex-end</option>
              <option value="center">center</option>
              <option value="space-between">space-between</option>
              <option value="space-around">space-around</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>gap ({gap}px)</span>
            </label>
            <input
              type="range"
              min="0"
              max="50"
              value={gap}
              onChange={(e) => setGap(Number(e.target.value))}
              className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>Item Count ({itemCount})</span>
            </label>
            <input
              type="range"
              min="2"
              max="12"
              value={itemCount}
              onChange={(e) => setItemCount(Number(e.target.value))}
              className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Preview & Code Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Live Preview</h3>
            <div className="border border-border/80 rounded-xl bg-slate-900/60 p-4 min-h-[300px] flex overflow-hidden">
              <div
                style={{
                  display: 'flex',
                  flexDirection,
                  flexWrap,
                  justifyContent,
                  alignItems,
                  alignContent,
                  gap: `${gap}px`,
                  width: '100%',
                }}
              >
                {Array.from({ length: itemCount }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-lg border border-primary/20 text-sm font-semibold transition-all shadow-sm"
                    style={{
                      backgroundColor: `hsl(${(i * 360) / itemCount}, 70%, 25%)`,
                      color: 'white',
                      padding: alignItems === 'stretch' && flexDirection.startsWith('row') ? '1.5rem' : '1rem 1.5rem',
                      minWidth: '60px',
                      minHeight: '60px',
                    }}
                  >
                    Item {i + 1}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Generated CSS</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={copyToClipboard}>
                  <Copy className="h-3.5 w-3.5 mr-1" /> Copy
                </Button>
                <Button variant="outline" size="sm" onClick={resetAll}>
                  <RotateCcw className="h-3.5 w-3.5 mr-1" /> Reset
                </Button>
              </div>
            </div>
            <pre className="p-4 rounded-xl border border-border bg-card font-mono text-sm leading-relaxed overflow-x-auto text-primary">
              <code>{generatedCss}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  )
}
