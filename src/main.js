import { createApp } from 'vue'
import { pinia } from '@/store'
import router from '@/router'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from '@/App.vue'
import '@/assets/styles/main.scss'

const app = createApp(App)

app.use(router)
    .use(pinia)
    .use(autoAnimatePlugin)
    .mount('#app')
