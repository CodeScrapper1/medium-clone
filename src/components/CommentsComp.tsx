"use client";
import { commentStory } from "@/actions/comments";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "./ui/use-toast";
import GetComments from "./GetComments";

type Props = {
  NoOfComments: any;
  username: string | null;
  userImage: string;
  storyId: string;
};
const CommentsComp = ({
  NoOfComments,
  username,
  userImage,
  storyId,
}: Props) => {
  const [showCommentComp, setShowCommentComp] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");

  const AddComments = async () => {
    try {
      const comment = await commentStory(storyId, content, "");
      if (comment?.error) {
        toast({ title: comment.error });
      }
    } catch (error) {
      toast({ title: "Error in story comment" });
    }
  };
  return (
    <div>
      <button
        className="flex items-center text-slate-400"
        onClick={() => setShowCommentComp(!showCommentComp)}
      >
        <svg width="24" height="24" viewBox="0 0 24 24" className="ku">
          <path d="M18 16.8a7.14 7.14 0 0 0 2.24-5.32c0-4.12-3.53-7.48-8.05-7.48C7.67 4 4 7.36 4 11.48c0 4.13 3.67 7.48 8.2 7.48a8.9 8.9 0 0 0 2.38-.32c.23.2.48.39.75.56 1.06.69 2.2 1.04 3.4 1.04.22 0 .4-.11.48-.29a.5.5 0 0 0-.04-.52 6.4 6.4 0 0 1-1.16-2.65v.02zm-3.12 1.06l-.06-.22-.32.1a8 8 0 0 1-2.3.33c-4.03 0-7.3-2.96-7.3-6.59S8.17 4.9 12.2 4.9c4 0 7.1 2.96 7.1 6.6 0 1.8-.6 3.47-2.02 4.72l-.2.16v.26l.02.3a6.74 6.74 0 0 0 .88 2.4 5.27 5.27 0 0 1-2.17-.86c-.28-.17-.72-.38-.94-.59l.01-.02z"></path>
        </svg>
        <p className="text-sm">{NoOfComments}</p>
      </button>
      <div
        className={`h-screen fixed top-0 right-0 w-96 shadow-xl bg-white z-20 duration-200 ease-linear transform overflow-y-scroll ${
          showCommentComp ? "translate-x-0" : "translate-x-[450px]"
        }`}
      >
        <div className="px-6 pt-6 flex justify-between items-center">
          <p className="font-semibold text-xl">Responses {NoOfComments}</p>
          <span className="cursor-pointer text-slate-400 scale-150">
            &times;
          </span>
        </div>
        <div className="m-4">
          <div className="flex items-center space-x-3 px-3 pt-3">
            <Image src={userImage} width={32} height={32} alt="user image" />
            <div className="text-sm">
              <p>{username}</p>
            </div>
          </div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="write a comment"
            className="w-full h-24 p-3 focus:outline-none placeholder:text-sm text-sm mt-3 border-[1px] border-slate-300"
          />
          <div className="flex flex-row-reverse p-3">
            <div className="flex items-center space-x-4">
              <button onClick={() => setContent("")} className="text-sm">
                Cancel
              </button>
              <button
                onClick={AddComments}
                className="text-sm px-4 py-1.5 bg-green-500 rounded-full text-white"
              >
                Responed
              </button>
            </div>
          </div>
        </div>
        <GetComments storyId={storyId} showCommentComp={showCommentComp} />
      </div>
    </div>
  );
};

export default CommentsComp;
