// One shared IntersectionObserver per option set instead of one per element.
const observers = new Map()

function getObserver(options) {
  const key = `${options.threshold ?? 0}|${options.rootMargin ?? ''}`
  let entry = observers.get(key)
  if (!entry) {
    const callbacks = new WeakMap()
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) callbacks.get(e.target)?.(e)
    }, options)
    entry = { io, callbacks }
    observers.set(key, entry)
  }
  return entry
}

/** Observe `el`; `cb` receives each IntersectionObserverEntry. Returns a stop function. */
export function observe(el, cb, options = {}) {
  if (!el || typeof IntersectionObserver === 'undefined') return () => {}
  const { io, callbacks } = getObserver(options)
  callbacks.set(el, cb)
  io.observe(el)
  return () => {
    io.unobserve(el)
    callbacks.delete(el)
  }
}
