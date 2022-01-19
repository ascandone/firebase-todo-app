import { createApp } from 'vue'
import './index.css'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { createPinia } from 'pinia'

import Home from './pages/Home.vue'
import New from './pages/New.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/new', component: New },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
