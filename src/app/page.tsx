import Header from "@/components/organisms/Header";
import PostsContainer from "@/components/organisms/PostsContainer";

export default async function Home() {
  return (
  <div className="h-screen max-w-5xl mx-auto">
    <Header />
    <PostsContainer />
  </div>
  )
}
