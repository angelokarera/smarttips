import { useState, useMemo } from 'react'
import { Copy, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

type LipsumType = 'paragraphs' | 'sentences' | 'words'
type Variant = 'classic' | 'hipster'

const CLASSIC_WORDS = 'lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum'.split(' ')

const HIPSTER_WORDS = 'artisan craft bicycle rights portland sustainable kale chips aesthetic twee fixie single origin synth normcore quinoa flexitarian food truck occupy ethical meggings cornhole banh mi dreamcatcher meditation flannel scenester ennui narwhal humblebrag whatever gluten-free squid mlkshk offal asymmetrical biodiesel put a bird on it austin pickled viral four loko williamsburg chillwave pitchfork letterpress tattooed seitan'.split(' ')

function randomWord(words: string[]): string {
  return words[Math.floor(Math.random() * words.length)]
}

function generateSentence(words: string[]): string {
  const len = Math.floor(Math.random() * 10) + 8
  const sentence = Array.from({ length: len }, () => randomWord(words)).join(' ')
  return sentence.charAt(0).toUpperCase() + sentence.slice(1) + '.'
}

function generateParagraph(words: string[]): string {
  const sentenceCount = Math.floor(Math.random() * 4) + 3
  return Array.from({ length: sentenceCount }, () => generateSentence(words)).join(' ')
}

function generateLipsum(count: number, type: LipsumType, variant: Variant, seed?: number): string {
  if (seed !== undefined) void seed
  const words = variant === 'hipster' ? HIPSTER_WORDS : CLASSIC_WORDS
  if (type === 'words') return Array.from({ length: count }, () => randomWord(words)).join(' ')
  if (type === 'sentences') return Array.from({ length: count }, () => generateSentence(words)).join(' ')
  return Array.from({ length: count }, () => generateParagraph(words)).join('\n\n')
}

export default function LoremIpsumGenerator() {
  const [count, setCount] = useState(3)
  const [type, setType] = useState<LipsumType>('paragraphs')
  const [variant, setVariant] = useState<Variant>('classic')
  const [seed, setSeed] = useState(0)

  const text = useMemo(() => generateLipsum(count, type, variant, seed), [count, type, variant, seed])

  const copy = () => { navigator.clipboard.writeText(text); toast.success('Lorem Ipsum copied!') }
  const regenerate = () => setSeed(s => s + 1)

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Generate Lorem Ipsum placeholder text by paragraphs, sentences, or words. Choose the classic or hipster variant.
      </p>

      <div className="flex flex-wrap gap-4 bg-card/45 p-4 rounded-xl border border-border">
        <div className="space-y-1.5 flex-1 min-w-[160px]">
          <label className="text-xs font-medium text-muted-foreground">Type</label>
          <select value={type} onChange={e => setType(e.target.value as LipsumType)}
            className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="paragraphs">Paragraphs</option>
            <option value="sentences">Sentences</option>
            <option value="words">Words</option>
          </select>
        </div>

        <div className="space-y-1.5 flex-1 min-w-[160px]">
          <label className="text-xs font-medium text-muted-foreground">Variant</label>
          <select value={variant} onChange={e => setVariant(e.target.value as Variant)}
            className="w-full bg-secondary text-foreground text-sm rounded-lg p-2 border border-border/80 focus:outline-none focus:ring-1 focus:ring-primary">
            <option value="classic">Classic Lorem Ipsum</option>
            <option value="hipster">Hipster Lorem Ipsum</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground">
            Count ({count} {type})
          </label>
          <input type="range" min="1" max="type === 'words' ? 300 : type === 'sentences' ? 30 : 10" value={count}
            onChange={e => setCount(Number(e.target.value))}
            className="w-full accent-primary bg-secondary rounded-lg h-1.5 appearance-none cursor-pointer mt-1" />
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground font-semibold uppercase tracking-wider">Generated Text</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={regenerate}><RefreshCw className="h-3.5 w-3.5 mr-1" />Regenerate</Button>
            <Button size="sm" onClick={copy}><Copy className="h-3.5 w-3.5 mr-1" />Copy</Button>
          </div>
        </div>
        <div className="p-5 rounded-xl border border-border bg-card/50 text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap min-h-[200px]">
          {text}
        </div>
        <p className="text-xs text-muted-foreground text-right">{text.split(/\s+/).filter(Boolean).length} words</p>
      </div>
    </div>
  )
}
