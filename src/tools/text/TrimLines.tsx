import { TextToolShell } from './shared/TextToolShell'

function trimLines(input: string): string {
  return input
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
}

export default function TrimLines() {
  return (
    <TextToolShell
      transform={trimLines}
      inputLabel="Input"
      outputLabel="Trimmed lines"
      outputPlaceholder="Leading and trailing whitespace removed from each line..."
    />
  )
}
