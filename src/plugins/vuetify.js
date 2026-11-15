import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import { lightTheme, darkTheme } from './themes'

// index.html already set <html data-theme> before first paint; reuse it.
const initialTheme = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'

export default createVuetify({
  icons: { defaultSet: 'mdi', aliases, sets: { mdi } }, // SVG icons: import { mdiXxx } from '@mdi/js'
  theme: { defaultTheme: initialTheme, themes: { light: lightTheme, dark: darkTheme } },
})
