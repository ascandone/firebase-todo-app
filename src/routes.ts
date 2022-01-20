import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import New from './pages/New.vue'
import Edit from './pages/Edit.vue'
import Login from './pages/Login.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/new', component: New },
  { path: '/edit/:id', component: Edit },
  { path: '/login', component: Login },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
