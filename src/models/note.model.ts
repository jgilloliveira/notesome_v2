import { Category } from "./category.model"

// TODO: Folder
export interface Note {
  title: string
  content: string
  color: string
  isFavorite: boolean
  isDeleted: boolean
  categories: Category[]
}
