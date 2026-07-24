import { TextToolShell } from './shared/TextToolShell'
import { toTitleCase } from './shared/textTransforms'

export default function TitleCaseConverter() {
  return (
    <TextToolShell
      transform={toTitleCase}
      inputLabel="Your text"
      outputLabel="Title Case"
      outputPlaceholder="Title Case Text Will Appear Here..."
    />
  )
}
