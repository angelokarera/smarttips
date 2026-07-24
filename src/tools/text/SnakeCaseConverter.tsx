import { TextToolShell } from './shared/TextToolShell'
import { toSnakeCase } from './shared/textTransforms'

export default function SnakeCaseConverter() {
  return (
    <TextToolShell
      transform={toSnakeCase}
      inputLabel="Your text"
      outputLabel="snake_case"
      outputPlaceholder="snake_case_text_will_appear_here..."
    />
  )
}
