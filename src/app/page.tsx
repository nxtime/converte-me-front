import Header from "@/components/organisms/Header";
import PostsContainer from "@/components/organisms/posts/PostsContainer";
import api from "./utils/api";
import { IUserDTO } from "@/interfaces/usersDTO";

export default async function Home() {
  const { data: users } = await api.get<IUserDTO[]>(`user/all`);

  return (
    <div className="h-screen max-w-5xl mx-auto">
      <Header users={users} />
      <PostsContainer />
    </div>
  );
}
