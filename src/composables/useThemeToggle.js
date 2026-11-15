import { computed } from 'vue'
import { useTheme } from 'vuetify'

// Keeps Vuetify's theme, the <html data-theme> attribute (which drives the CSS
// tokens) and localStorage in sync.
export function useThemeToggle() {
  const theme = useTheme()
  const isDark = computed(() => theme.global.name.value === 'dark')

  function toggleTheme() {
    const next = isDark.value ? 'light' : 'dark'
    theme.change(next)
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem('theme', next)
    } catch {}
  }

  return { isDark, toggleTheme }
}
