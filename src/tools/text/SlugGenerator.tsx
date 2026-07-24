import { TextToolShell } from './shared/TextToolShell'
import { toSlug } from './shared/textTransforms'

export default function SlugGenerator() {
  return (
    <TextToolShell
      transform={toSlug}
      inputLabel="Title or text"
      outputLabel="URL slug"
      placeholder="e.g. 10 Best SEO Tips for 2026!"
      outputPlaceholder="10-best-seo-tips-for-2026"
    />
  )
}
