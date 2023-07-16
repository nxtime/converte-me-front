"use client";
import { IPostDTO } from "@/interfaces/postsDTO";
import { useContext, useState } from "react";
import { Icon } from "@iconify/react";
import UserModal from "../../layouts/UserModal";
import CommentsContainer from "../comments/CommentsContainer";
import { UserSettingsContext } from "@/stores/UserSettingsProvider";
import { ICommentsDTO } from "@/interfaces/commentsDTO";

const PostItem = ({
  post,
  comments
}: {
  post: IPostDTO;
  comments: ICommentsDTO[];
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const userSettings = useContext(UserSettingsContext);

  return (
    <>
      <header className="flex h-10 items-center justify-between w-full gap-4">
        <button
          onClick={() => setIsUserModalOpen(true)}
          className="flex gap-4 items-center py-2 px-4 rounded-lg bg-transparent hover:bg-fuchsia-500 transition-colors"
        >
          <img
            className="h-8 w-8 aspect-square rounded-lg"
            src={post.user.avatar_url}
            alt={"User post creator image"}
          />
          {post.user.id === userSettings?.currentUserId ? (
            <span>Me</span>
          ) : (
            <span>
              {post.user.firstName} {post.user.lastName}
            </span>
          )}
        </button>
        <div className="flex gap-4 items-center">
          <button
            className="text-lg font-medium text-zinc-100 hover:text-zinc-400 transition-colors"
            onClick={() => setIsOpen((s) => !s)}
          >
            {post.title}
          </button>
          <button
            className="h-7 w-7 flex items-center text-xs justify-center bg-gray-900 hover:bg-gray-800 transition-all hover:shadow-md hover:shadow-gray-900 rounded-md active:scale-90"
            onClick={() => {
              setIsOpen((s) => !s);
            }}
          >
            <Icon icon="bxs:down-arrow" vFlip={isOpen} />
          </button>
        </div>
        <div className="flex gap-2 items-center">
          {post.user.id === userSettings?.currentUserId && (
            <>
              <button className="h-8 w-8 flex items-center justify-center text-xs bg-red-600 hover:bg-red-700 transition-all rounded-md active:scale-90">
                <Icon icon="bi:trash-fill" />
              </button>
              <button className="h-8 w-8 flex items-center justify-center text-xs bg-gray-900 hover:bg-gray-800 hover:shadow-md hover:shadow-gray-900 transition-all rounded-md active:scale-90">
                <Icon icon="mdi:pencil" />
              </button>
            </>
          )}
        </div>
      </header>
      {isOpen && (
        <div className="flex flex-col gap-4">
          <span>{post.content}</span>
          <CommentsContainer comments={comments} />
        </div>
      )}
      <UserModal
        userId={post.user.id}
        isOpen={isUserModalOpen}
        setIsOpen={setIsUserModalOpen}
      />
    </>
  );
};

export default PostItem;
