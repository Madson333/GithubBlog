import { useCallback, useEffect, useState } from "react";
import { PostHeader } from "./postHeader";
import { api } from "../../lib/axios";
import { IPost } from "../blog";
import { useParams } from "react-router-dom";
import { PostContent } from "./postContent";

const userName = import.meta.env.VITE_GITHUB_USERNAME
const repoName = import.meta.env.VITE_GITHUB_REPONAME


export function Post() {
  const [postData, setPostData] = useState<IPost>({} as IPost)
  const [isLoading, setIsLoading] = useState(true)

  const { id } = useParams()

  const getPostDetails = useCallback(async () => {


    try {
      setIsLoading(true)
      const response = await api.get(`/repos/${userName}/${repoName}/issues/${id}`)
      setPostData(response.data)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    getPostDetails()
  }, [getPostDetails])
  return (
    <>
      <PostHeader isLoading={isLoading} postData={postData} />
      {!isLoading && <PostContent content={postData.body} />}
    </>
  )
}