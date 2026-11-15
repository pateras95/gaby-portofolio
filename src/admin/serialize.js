// Data → JavaScript source, formatted like the hand-written config files (unquoted keys, 2 spaces,
// short arrays / objects on one line, trailing commas).
const IDENT = /^[A-Za-z_$][\w$]*$/
const key = (k) => (IDENT.test(k) ? k : JSON.stringify(k))
const prim = (v) => (v === undefined ? 'null' : JSON.stringify(v))

function inline(v) {
  if (Array.isArray(v)) return `[${v.map(inline).join(', ')}]`
  if (v && typeof v === 'object') {
    const e = Object.entries(v)
    return e.length ? `{ ${e.map(([k, x]) => `${key(k)}: ${inline(x)}`).join(', ')} }` : '{}'
  }
  return prim(v)
}

export function toJs(v, depth = 0) {
  if (!v || typeof v !== 'object') return prim(v)
  const flat = inline(v)
  if (flat.length + depth * 2 <= 92) return flat
  const pad = '  '.repeat(depth + 1)
  const end = '  '.repeat(depth)
  if (Array.isArray(v)) return `[\n${v.map((x) => `${pad}${toJs(x, depth + 1)},\n`).join('')}${end}]`
  return `{\n${Object.entries(v).map(([k, x]) => `${pad}${key(k)}: ${toJs(x, depth + 1)},\n`).join('')}${end}}`
}

// The leading comment block of a config file (kept when a file is exported).
export const headerOf = (text) => {
  const out = []
  for (const line of text.split('\n')) {
    if (!line.startsWith('//')) break
    out.push(line)
  }
  return out.join('\n')
}
