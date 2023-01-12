import { Category } from "./category.model"

export interface Note {
  id: string
  title: string
  content: string
  color: string
  isFavorite: boolean
  isDeleted: boolean
  categories: Category[]
}
