import { onMounted, onBeforeUnmount } from 'vue'
import { prefersReducedMotion } from './useMotion'

/**
 * Subtle vertical parallax for an element. Only listens to scroll while the
 * element is near the viewport and writes with requestAnimationFrame.
 * `speed` is the fraction of the offset from viewport centre (0.08 = subtle).
 */
export function useParallax(elRef, speed = 0.08) {
  let io = null
  let raf = 0
  let active = false

  function update() {
    raf = 0
    const el = elRef.value
    if (!el) return
    const box = (el.parentElement || el).getBoundingClientRect()
    const offset = box.top + box.height / 2 - window.innerHeight / 2
    el.style.transform = `translate3d(0, ${(-offset * speed).toFixed(1)}px, 0)`
  }
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(update)
  }
  function start() {
    if (active) return
    active = true
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule, { passive: true })
    schedule()
  }
  function stop() {
    if (!active) return
    active = false
    window.removeEventListener('scroll', schedule)
    window.removeEventListener('resize', schedule)
  }

  onMounted(() => {
    const el = elRef.value
    if (!el || prefersReducedMotion() || typeof IntersectionObserver === 'undefined') return
    io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()), { rootMargin: '20% 0px' })
    io.observe(el.parentElement || el)
  })
  onBeforeUnmount(() => {
    io?.disconnect()
    stop()
    if (raf) cancelAnimationFrame(raf)
  })
}
