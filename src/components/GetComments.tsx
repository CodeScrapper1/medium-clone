"use client";
import { getAllComments } from "@/actions/comments";
import React, { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import UserBadget from "./UserBadget";
import UserEngagement from "./UserEngagement";

type Props = {
  storyId: string;
  showCommentComp: boolean;
};
const GetComments = ({ storyId, showCommentComp }: Props) => {
  const [comments, setComments] = useState<any[]>([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const result: any = await getAllComments(storyId);
        if (result?.length) {
          setComments(result);
        } else {
          toast({ title: result.error });
        }
      } catch (error) {}
    };
    fetchComments();
  }, [showCommentComp]);
  return (
    <div className="mt-10 border-t-[1px]">
      {comments?.map((comment: any, index: number) => {
        const clapCounts = comment?.clap?.map((clap: any) => clap?.clapCount);
        const totalClaps = clapCounts?.reduce(
          (acc: any, curr: number) => acc + curr,
          0
        );
        return (
          <div
            key={index}
            className="m-4 mt-5 py-4 border-b-[1px] border-neutral-100"
          >
            <UserBadget user={comment?.author} createdAt={comment?.createdAt} />
            <p className="py-3 text-neutral-600 text-sm ml-3">
              {comment?.content}
            </p>
            <UserEngagement totalClaps={totalClaps} comment={comment} />
          </div>
        );
      })}
    </div>
  );
};

export default GetComments;
