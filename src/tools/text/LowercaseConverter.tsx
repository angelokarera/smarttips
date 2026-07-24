import { TextToolShell } from './shared/TextToolShell'

export default function LowercaseConverter() {
  return (
    <TextToolShell
      transform={(input) => input.toLowerCase()}
      inputLabel="Your text"
      outputLabel="lowercase"
      outputPlaceholder="lowercase text will appear here..."
    />
  )
}
