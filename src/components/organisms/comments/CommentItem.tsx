import api from "@/app/utils/api";
import UserModal from "@/components/layouts/UserModal";
import { ICommentsDTO } from "@/interfaces/commentsDTO";
import { UserSettingsContext } from "@/stores/UserSettingsProvider";
import { useContext, useEffect, useState } from "react";

const CommentItem = ({ commentId }: { commentId: number }) => {
  const [comment, setComment] = useState<ICommentsDTO>({} as ICommentsDTO);
  const [isLoading, setIsLoading] = useState(true);
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);

  const userSettings = useContext(UserSettingsContext);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const { data } = await api.get(`comment/${commentId}`);

        setComment(data);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComment();
  }, [commentId]);

  if (isLoading)
    return (
      <div className="bg-slate-900 animate-pulse rounded-lg h-12 w-full" />
    );

  if (comment?.id === undefined) return null;

  return (
    <>
      <div className="w-full flex gap-4 bg-slate-900 rounded-lg items-center pr-4">
        <button
          onClick={() => setIsUserModalOpen(true)}
          className="flex gap-4 items-center py-2 px-4 rounded-l-lg bg-slate-800 hover:bg-fuchsia-500 transition-colors"
        >
          <img
            className="h-8 w-8 aspect-square rounded-lg"
            src={comment.user.avatar_url}
            alt={"User comment creator image"}
          />
          {comment.user.id === userSettings?.currentUserId ? (
            <span>Me</span>
          ) : (
            <span>
              {comment.user.firstName} {comment.user.lastName}
            </span>
          )}
        </button>
        <span className="text-zinc-300 text-sm">{comment.content}</span>
        <span className="ml-auto text-zinc-400 text-xs">
          {new Date(comment.created_at).toLocaleDateString()}
        </span>
      </div>
      <UserModal
        userId={comment.userId}
        setIsOpen={setIsUserModalOpen}
        isOpen={isUserModalOpen}
      />
    </>
  );
};

export default CommentItem;
