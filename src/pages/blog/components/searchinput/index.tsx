import { useForm } from "react-hook-form";
import { SearchInputContainer } from "./styles";
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod";

const searchFormSchema = z.object({
  query: z.string()
})

type SearchFormInput = z.infer<typeof searchFormSchema>

interface SearchInputProps {
  postsLength: number;
  getPosts: (query?: string) => Promise<void>;
}

export function SearchInput({ getPosts, postsLength }: SearchInputProps) {
  const { register, handleSubmit } = useForm<SearchFormInput>({
    resolver: zodResolver(searchFormSchema)
  })

  async function handleSearchPosts(data: SearchFormInput) {
    await getPosts(data.query)
  }

  return (
    <SearchInputContainer onSubmit={handleSubmit(handleSearchPosts)} >
      <header>
        <h3>Publicações</h3>
        <span>
          {postsLength === 1 ? `${postsLength} publicação` : `${postsLength} publicações`}
        </span>

      </header>

      <input type="text" placeholder="Buscar conteúdo" {...register("query")} />
    </SearchInputContainer>
  )
}