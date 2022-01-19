export interface ITodoItem {
  id: number
  title: string
  completed: boolean
  favorited: boolean
  description?: string
  date?: string
  // list?: ITodoList
}
