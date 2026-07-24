import { TextToolShell } from './shared/TextToolShell'
import { toCamelCase } from './shared/textTransforms'

export default function CamelCaseConverter() {
  return (
    <TextToolShell
      transform={toCamelCase}
      inputLabel="Your text"
      outputLabel="camelCase"
      outputPlaceholder="camelCaseTextWillAppearHere..."
    />
  )
}
