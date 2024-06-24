import { createApp } from 'vue'
import './assets/style.scss'
import router from './router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'

const app = createApp(App)

app.use(router)
app.use(autoAnimatePlugin)
app.mount('#app')
