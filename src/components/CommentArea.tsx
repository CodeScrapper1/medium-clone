import { commentStory } from "@/actions/comments";
import React, { useState } from "react";
import { toast } from "./ui/use-toast";

type Props = {
  setShowCommentArea: React.Dispatch<React.SetStateAction<boolean>>;
  commentId: string;
  storyId: string;
};
const CommentArea = ({ setShowCommentArea, commentId, storyId }: Props) => {
  const [content, setContent] = useState<string>("");

  const AddReply = async () => {
    try {
      const comment = await commentStory(storyId, content, commentId);
      if (comment?.error) {
        toast({ title: comment.error });
      }
    } catch (error) {
      toast({ title: "Error in story comment" });
    }
  };
  return (
    <div className="m-4 shadow-md">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="write a comment"
        className="w-full h-24 p-3 focus:outline-none placeholder:text-sm text-sm mt-3 border-[1px] border-slate-300"
      />
      <div className="flex flex-row-reverse p-3">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => {
              setShowCommentArea(false);
              setContent("");
            }}
            className="text-sm"
          >
            Cancel
          </button>
          <button
            onClick={AddReply}
            className="text-sm px-4 py-1.5 bg-green-500 rounded-full text-white"
          >
            Responed
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentArea;
