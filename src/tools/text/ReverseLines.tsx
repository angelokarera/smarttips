import { TextToolShell } from './shared/TextToolShell'

function reverseLines(input: string): string {
  return input.split('\n').reverse().join('\n')
}

export default function ReverseLines() {
  return (
    <TextToolShell
      transform={reverseLines}
      inputLabel="Input"
      outputLabel="Reversed line order"
      outputPlaceholder="Lines in reverse order will appear here..."
    />
  )
}
