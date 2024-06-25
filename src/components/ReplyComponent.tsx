import React from "react";
import UserBadget from "./UserBadget";
import ClapCountComp from "./ClapCountComp";

type Props = {
  storyId: string;
  comment: any;
};
const ReplyComponent = ({ storyId, comment }: Props) => {
  return (
    <div className="mt-10 border-t-[1px]">
      {comment?.replies?.map((reply: any, index: number) => {
        const clapCounts = reply?.clap?.map((clap: any) => clap?.clapCount);
        const totalClaps = clapCounts?.reduce(
          (acc: any, curr: number) => acc + curr,
          0
        );
        return (
          <div
            key={index}
            className="m-4 mt-5 py-4 border-b-[1px] border-neutral-100"
          >
            <UserBadget user={reply?.author} createdAt={reply?.createdAt} />
            <p className="py-3 text-neutral-600 text-sm ml-3">
              {reply?.content}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ClapCountComp
                  clapCount={totalClaps}
                  storyId={comment.storyId}
                  userClaps={0}
                  type="replyId"
                  commentId={reply.id}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ReplyComponent;
