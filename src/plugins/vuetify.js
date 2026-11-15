import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { lightTheme, darkTheme } from './themes'

// index.html already set <html data-theme> before first paint; reuse it.
function getInitialTheme() {
  const t = document.documentElement.dataset.theme
  return t === 'dark' ? 'dark' : 'light'
}

export default createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi },
  },
  theme: {
    defaultTheme: getInitialTheme(),
    themes: { light: lightTheme, dark: darkTheme },
  },
})
