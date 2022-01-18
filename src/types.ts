export interface ITodoList {
  name: string
  color: string
}

export interface ITodoItem {
  title: string
  completed: boolean
  favorited: boolean
  description?: string
  date?: string
  // list?: ITodoList
}
