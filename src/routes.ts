import { createRouter, createWebHistory } from 'vue-router'
import Home from './pages/Home.vue'
import New from './pages/New.vue'
import Edit from './pages/Edit.vue'
import Login from './pages/Login.vue'
import Signup from './pages/Signup.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/new', component: New },
  { path: '/edit/:id', component: Edit },
  { path: '/login', component: Login },
  { path: '/signup', component: Signup },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
