// Reads *.md files from src/content/legal/ and generates *.ts string exports.
// Run before build. Output files are gitignored.
import { readdirSync, readFileSync, writeFileSync } from 'fs'
import { join, basename } from 'path'

const srcDir = join(process.cwd(), 'src/content/legal')
const files = readdirSync(srcDir).filter(f => f.endsWith('.md'))

for (const file of files) {
  const content = readFileSync(join(srcDir, file), 'utf-8')
  const name = basename(file, '.md')
  const out = `// Auto-generated from ${file} — do not edit\nconst content = ${JSON.stringify(content)}\nexport default content\n`
  writeFileSync(join(srcDir, `${name}.ts`), out)
  console.log(`compiled: ${file} → ${name}.ts`)
}
