import { TextToolShell } from './shared/TextToolShell'
import { toSentenceCase } from './shared/textTransforms'

export default function SentenceCaseConverter() {
  return (
    <TextToolShell
      transform={toSentenceCase}
      inputLabel="Your text"
      outputLabel="Sentence case"
      outputPlaceholder="Sentence case text will appear here..."
    />
  )
}
