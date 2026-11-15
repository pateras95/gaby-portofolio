import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

// Order matters: Vuetify base styles first, then our design system on top.
import './styles/tokens.css'
import './styles/typography.css'
import './styles/animations.css'
import './styles/global.css'

createApp(App).use(router).use(vuetify).mount('#app')
