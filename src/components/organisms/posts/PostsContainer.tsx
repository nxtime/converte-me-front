import { IPostDTO } from "@/interfaces/postsDTO";
// import axios from "axios";
import PostItem from "./PostItem";
import api from "@/app/utils/api";

const PostsContainer = async () => {
  try {
    const { data: posts } = await api.get<IPostDTO[]>("post/all");

    return (
      <ul className="flex flex-col gap-4">
        {await Promise.all(
          posts.map(async (post) => {
            const comments = await Promise.all(
              post.comments.map(async (comment) => {
                const { data: commentData } = await api.get(
                  `comment/${comment.id}`
                );

                return commentData;
              })
            );

            return (
              <li
                key={post.id}
                className="flex flex-col gap-4 bg-slate-800 transition-colors rounded-md p-4 justify-center"
              >
                <PostItem post={post} comments={comments} />
              </li>
            );
          })
        )}
      </ul>
    );
  } catch (err) {
    return <span>No post was found</span>;
  }
};

export default PostsContainer;
