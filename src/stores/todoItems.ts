import { defineStore } from 'pinia'
import { ITodoItem } from '../types'

export interface State {
  nextId: 4
  todoItems: ITodoItem[]
}

const todoItems = [
  {
    id: 0,
    title: 'Learn firestore',
    completed: false,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, nostrum ipsum dolor sit amet.',
    favorited: false,
  },
  {
    id: 1,
    title: 'Learn firestore',
    completed: false,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt, nostrum ipsum dolor sit amet.',
    favorited: true,
    date: 'TODO',
  },
  {
    id: 2,
    title: 'Learn vue.js',
    completed: false,
    favorited: true,
  },
  {
    id: 3,
    title: 'Implement my app',
    completed: false,
    favorited: true,
    date: 'TODO',
  },
]

export const useTodoItems = defineStore('todoItems', {
  state: (): State => ({
    nextId: 4,
    todoItems,
  }),
  actions: {
    addTodo(title: string, description?: string) {
      this.todoItems.push({
        title: title,
        description: description,
        completed: false,
        favorited: false,
        id: this.nextId++,
      })
    },
  },
  getters: {
    activeItems(state) {
      return state.todoItems.filter((item) => !item.completed)
    },
    completedItems(state) {
      return state.todoItems.filter((item) => item.completed)
    },
  },
})
