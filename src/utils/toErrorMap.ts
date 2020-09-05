import { FieldError } from "../generated/graphql";

export const toErorMap = (errors: FieldError[]) => {
  const errorMap: Record<string, string> = {}

  errors.forEach(({ field, message }) => {
    errorMap[field] = message
  })

  return errorMap
}