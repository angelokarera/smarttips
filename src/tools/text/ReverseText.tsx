import { TextToolShell } from './shared/TextToolShell'
import { reverseText } from './shared/textTransforms'

export default function ReverseText() {
  return (
    <TextToolShell
      transform={reverseText}
      inputLabel="Your text"
      outputLabel="Reversed text"
      placeholder="Type or paste text to reverse..."
      outputPlaceholder="...ereh raeppa lliw txet desreveR"
    />
  )
}
