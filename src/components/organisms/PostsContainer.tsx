import { IPostDTO } from "@/interfaces/postsDTO";
// import axios from "axios";
import PostItem from "./PostItem";
import api from "@/app/utils/api";

const PostsContainer = async () => {
  try {
    const { data: posts } = await api.get<IPostDTO[]>("post/all");

    return (
      <ul className="flex flex-col gap-4">
        {posts.map((post) => (
          <li
            key={post.id}
            className="flex flex-col gap-4 bg-slate-800 transition-colors rounded-md p-4 justify-center"
          >
            <PostItem post={post} />
          </li>
        ))}
      </ul>
    );
  } catch (err) {
    <span>No post was found</span>;
  }
};

export default PostsContainer;
