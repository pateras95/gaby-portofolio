// Sets the /admin password:   npm run admin:password -- "my password"     (no argument = a random one is generated)
// Only a salted PBKDF2 hash is written to src/admin/auth.config.js (safe to commit); the password itself is never stored.
import { pbkdf2Sync, randomBytes } from 'node:crypto'
import { writeFileSync } from 'node:fs'

const password = process.argv[2] ?? randomBytes(9).toString('base64url')
const salt = randomBytes(16).toString('hex')
const iterations = 310000
const hash = pbkdf2Sync(password, Buffer.from(salt, 'hex'), iterations, 32, 'sha256').toString('hex')

writeFileSync(new URL('../src/admin/auth.config.js', import.meta.url), `// /admin password check — a salted hash, not the password. Change it with:  npm run admin:password -- "new password"
export const auth = { salt: '${salt}', hash: '${hash}', iterations: ${iterations} }
`)
console.log(`Admin password set${process.argv[2] ? '' : `: ${password}`}\nCommit src/admin/auth.config.js to publish the change.`)
