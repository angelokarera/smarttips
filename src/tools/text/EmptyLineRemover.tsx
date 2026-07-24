import { TextToolShell } from './shared/TextToolShell'

function removeEmptyLines(input: string): string {
  return input
    .split('\n')
    .filter((line) => line.trim() !== '')
    .join('\n')
}

export default function EmptyLineRemover() {
  return (
    <TextToolShell
      transform={removeEmptyLines}
      inputLabel="Input (with blank lines)"
      outputLabel="Cleaned text"
      stats={(input, output) => {
        if (!input) return null
        const before = input.split('\n').length
        const after = output ? output.split('\n').length : 0
        return `${before} lines → ${after} lines (${before - after} blank removed)`
      }}
    />
  )
}
