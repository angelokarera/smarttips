import { TextToolShell } from './shared/TextToolShell'

function removeExtraSpaces(input: string): string {
  return input
    .split('\n')
    .map((line) => line.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
}

export default function RemoveExtraSpaces() {
  return (
    <TextToolShell
      transform={removeExtraSpaces}
      inputLabel="Input (with extra spaces)"
      outputLabel="Cleaned text"
      stats={(input, output) => {
        if (!input) return null
        return `${input.length} chars → ${output.length} chars`
      }}
    />
  )
}
