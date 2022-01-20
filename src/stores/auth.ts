import { defineStore } from 'pinia'
import { User } from 'firebase/auth'

export interface State {
  user: User | null
}

export const useAuth = defineStore('auth', {
  state: (): State => ({
    user: null,
  }),
})
