import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { router } from './routes'
import { createPinia } from 'pinia'
import '@/firebase'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
