import { TextToolShell } from './shared/TextToolShell'
import { flipText } from './shared/textTransforms'

export default function FlipText() {
  return (
    <TextToolShell
      transform={flipText}
      inputLabel="Your text"
      outputLabel="Flipped (upside down)"
      placeholder="Type text to flip upside down..."
      outputPlaceholder="uʍop ǝpᴉsdn"
    />
  )
}
