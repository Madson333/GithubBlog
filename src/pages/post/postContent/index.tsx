import { PostContentContainer } from "./styles";
import Markdown from "react-markdown";

interface PostContentProps {
  content: string;
}

export function PostContent({ content }: PostContentProps) {
  return (
    <PostContentContainer>
      <Markdown children={content} />
    </PostContentContainer>
  )
}