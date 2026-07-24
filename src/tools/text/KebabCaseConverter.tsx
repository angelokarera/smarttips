import { TextToolShell } from './shared/TextToolShell'
import { toKebabCase } from './shared/textTransforms'

export default function KebabCaseConverter() {
  return (
    <TextToolShell
      transform={toKebabCase}
      inputLabel="Your text"
      outputLabel="kebab-case"
      outputPlaceholder="kebab-case-text-will-appear-here..."
    />
  )
}
