import { ICommentsBase, ICommentsDTO } from "@/interfaces/commentsDTO";
import CommentItem from "./CommentItem";
import { useState } from "react";
import { Icon } from "@iconify/react";

interface ICommentsContainerProps {
  comments: ICommentsDTO[];
}

const CommentsContainer = ({ comments }: ICommentsContainerProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 bg-slate-700 py-2 px-4 rounded-lg">
      <header className="flex justify-between">
        <h2 className="font-medium">Comments</h2>
        <button
          onClick={() => setIsOpen((s) => !s)}
          className=" flex items-center justify-center h-7 w-7 rounded-lg bg-gray-900 hover:bg-gra-800 active:scale-90"
        >
          {!isOpen ? (
            <Icon icon="basil:plus-solid" />
          ) : (
            <Icon icon="system-uicons:minus" />
          )}
        </button>
      </header>
      {isOpen && (
        <div className="flex flex-col gap-2">
          {comments.length > 0 ? (
            <ul className="flex flex-col gap-2">
              {comments.map((comment) => {
                return (
                  <li key={comment.id}>
                    <CommentItem comment={comment} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <span className="text-zinc-300">No comment was found</span>
          )}
          <div className="flex">
            <input
              placeholder="Type here to add a new comment..."
              type="text"
              className="w-full indent-4 ring-1 ring-transparent outline-none focus:ring-fuchsia-500 focus:bg-slate-800 rounded-l-lg bg-slate-900 hover:bg-slate-800 h-12 transition-all"
            />
            <button className="h-12 flex items-center justify-center px-4 rounded-r-lg bg-fuchsia-500 hover:bg-fuchsia-600 transition-colors">
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentsContainer;
