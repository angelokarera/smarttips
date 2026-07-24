import { TextToolShell } from './shared/TextToolShell'

function shuffleLines(input: string): string {
  const lines = input.split('\n')
  // Fisher–Yates shuffle
  for (let i = lines.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[lines[i], lines[j]] = [lines[j], lines[i]]
  }
  return lines.join('\n')
}

export default function ShuffleLines() {
  return (
    <TextToolShell
      transform={shuffleLines}
      live={false}
      actionLabel="Shuffle Lines"
      inputLabel="Input (one item per line)"
      outputLabel="Shuffled result"
      outputPlaceholder="Randomly ordered lines will appear here..."
    />
  )
}
