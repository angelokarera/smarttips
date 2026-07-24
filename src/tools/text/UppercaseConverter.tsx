import { TextToolShell } from './shared/TextToolShell'

export default function UppercaseConverter() {
  return (
    <TextToolShell
      transform={(input) => input.toUpperCase()}
      inputLabel="Your text"
      outputLabel="UPPERCASE"
      outputPlaceholder="UPPERCASE TEXT WILL APPEAR HERE..."
    />
  )
}
