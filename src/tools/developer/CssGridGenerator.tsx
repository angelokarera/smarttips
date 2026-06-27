import { useState } from 'react'
import { Copy, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

export default function CssGridGenerator() {
  const [columns, setColumns] = useState<number>(3)
  const [rows, setRows] = useState<number>(3)
  const [columnGap, setColumnGap] = useState<number>(12)
  const [rowGap, setRowGap] = useState<number>(12)

  const generatedCss = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, 1fr);
  column-gap: ${columnGap}px;
  row-gap: ${rowGap}px;
}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedCss)
    toast.success('CSS Grid code copied to clipboard!')
  }

  const resetAll = () => {
    setColumns(3)
    setRows(3)
    setColumnGap(12)
    setRowGap(12)
    toast.success('Reset settings')
  }

  const totalItems = columns * rows

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Generate custom CSS Grid layouts visually. Set columns, rows, and gaps, and preview the structure in real-time.
      </p>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Controls Column */}
        <div className="space-y-4 lg:col-span-1 bg-card/45 p-5 rounded-xl border border-border">
          <h3 className="text-sm font-semibold uppercase tracking-wider mb-2">CSS Grid Properties</h3>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>Columns ({columns})</span>
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={columns}
              onChange={(e) => setColumns(Number(e.target.value))}
              className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>Rows ({rows})</span>
            </label>
            <input
              type="range"
              min="1"
              max="8"
              value={rows}
              onChange={(e) => setRows(Number(e.target.value))}
              className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>Column Gap ({columnGap}px)</span>
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={columnGap}
              onChange={(e) => setColumnGap(Number(e.target.value))}
              className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-medium text-muted-foreground flex justify-between">
              <span>Row Gap ({rowGap}px)</span>
            </label>
            <input
              type="range"
              min="0"
              max="40"
              value={rowGap}
              onChange={(e) => setRowGap(Number(e.target.value))}
              className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer"
            />
          </div>
        </div>

        {/* Preview & Code Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="space-y-2">
            <h3 className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Live Preview</h3>
            <div className="border border-border/80 rounded-xl bg-slate-900/60 p-4 min-h-[300px] flex items-center justify-center">
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${columns}, 1fr)`,
                  gridTemplateRows: `repeat(${rows}, 1fr)`,
                  columnGap: `${columnGap}px`,
                  rowGap: `${rowGap}px`,
                  width: '100%',
                  height: '100%',
                  minHeight: '260px',
                }}
              >
                {Array.from({ length: totalItems }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-lg border border-primary/20 text-xs font-semibold transition-all p-3 shadow-xs"
                    style={{
                      backgroundColor: `hsl(${(i * 360) / totalItems}, 65%, 23%)`,
                      color: 'white',
                      minHeight: '40px',
                    }}
                  >
                    Col { (i % columns) + 1 }, Row { Math.floor(i / columns) + 1 }
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
