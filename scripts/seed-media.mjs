// Copies the media files committed in the repo into the persistent
// media directory (MEDIA_DIR) on startup, so existing images referenced
// by the database keep working after switching to a mounted volume.
// Files already present in the volume are never overwritten.
import { copyFileSync, existsSync, mkdirSync, readdirSync, statSync } from 'fs'
import path from 'path'

const source = path.resolve(process.cwd(), 'media')
const target = path.resolve(process.cwd(), process.env.MEDIA_DIR || 'media')

if (source !== target && existsSync(source)) {
  mkdirSync(target, { recursive: true })

  let copied = 0
  for (const file of readdirSync(source)) {
    const from = path.join(source, file)
    const to = path.join(target, file)
    if (statSync(from).isFile() && !existsSync(to)) {
      copyFileSync(from, to)
      copied += 1
    }
  }

  console.log(`[MEDIA] Seeded ${copied} file(s) into ${target}`)
}
