// Hace opcionales los atributos de T.
export type ErrorResponse<T> = {
  [Key in keyof T]?: T[Key]
} & {
  error?: string
}

export function formatErrorResponse(error: any) {
  // Formateo del error que devuelve django.
  for (const attr in error.response.data) {
    const value = error.response.data[attr]
    if (Array.isArray(value)) error.response.data[attr] = value[0]
  }

  return error
}
