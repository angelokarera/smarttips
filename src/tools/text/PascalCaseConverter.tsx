import { TextToolShell } from './shared/TextToolShell'
import { toPascalCase } from './shared/textTransforms'

export default function PascalCaseConverter() {
  return (
    <TextToolShell
      transform={toPascalCase}
      inputLabel="Your text"
      outputLabel="PascalCase"
      outputPlaceholder="PascalCaseTextWillAppearHere..."
    />
  )
}
