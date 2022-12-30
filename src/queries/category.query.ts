import { useQuery } from "@tanstack/react-query"
import { connection } from "./axios.config"

export function useGetCategories() {
  const {} = useQuery(["get-categories"], () => connection.get("categories/"))
}
