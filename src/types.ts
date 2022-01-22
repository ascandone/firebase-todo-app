export interface ITodoItem {
  uid: string
  title: string
  completed: boolean
  favorited: boolean
  description?: string
  date?: string
  createdAt: unknown
}
