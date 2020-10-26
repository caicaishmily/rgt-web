import { usePostQuery } from "../generated/graphql"
import { usePostId } from "./usePostId"

export const useGetPostFromUrl = () => {
  const postId = usePostId()

  return usePostQuery({
    pause: postId === -1,
    variables: {
      id: postId
    }
  })
}