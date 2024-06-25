import { ClapCount, clapCountByuser } from "@/actions/claps";
import { NumberOfComments } from "@/actions/comments";
import { getUser } from "@/actions/user";
import { checkFav } from "@/favorite";
import { contentFormat } from "@/lib/data";
import Image from "next/image";
import React from "react";
import ClapCountComp from "./ClapCountComp";
import CommentsComp from "./CommentsComp";
import Favorite from "./Favorite";
import Share from "./Share";
import { MoreHorizontal } from "lucide-react";

type Props = {
  username: string;
  userImage: string;
  publishedStory: any;
};

const StoryRender = async ({ username, userImage, publishedStory }: Props) => {
  const content: string = publishedStory?.content;
  const formatedContent: any = await contentFormat(content, 10);

  const clapCounts: any = await ClapCount(publishedStory.id);
  const userClaps: any = await clapCountByuser(publishedStory.id);
  const currentUser: any = await getUser();

  const NoOfComments = await NumberOfComments(publishedStory.id);
  const favStatus: any = await checkFav(publishedStory.id);

  return (
    <div className="flex items-center justify-center mt-6 max-w-[800px] mx-auto">
      <div>
        <h1 className="text-4xl font-bold my-8">
          {formatedContent?.h1ElementWithoutTag}
        </h1>
        <div className="flex items-center space-x-5">
          <Image
            src={userImage}
            className="rounded-full"
            width={44}
            height={44}
            alt="User image"
          />
          <div className="text-sm">
            <p className="opacity-60">
              Published on{" "}
              {new Date(publishedStory?.createdAt)
                .toDateString()
                .split(" ")
                ?.slice(1, 4)
                .join(" ")}
            </p>
          </div>
        </div>
        <div className="border-y-[1px] border-neutral-200 py-3 mt-6 flex items-center justify-between px-3">
          <div className="flex items-center space-x-4">
            <ClapCountComp
              clapCount={clapCounts}
              storyId={publishedStory.id}
              userClaps={userClaps}
            />
            <CommentsComp
              NoOfComments={NoOfComments}
              username={username}
              userImage={userImage}
              storyId={publishedStory?.id}
            />
          </div>
          <div className="flex items-center space-x-4">
            <Favorite storyId={publishedStory.id} favStatus={favStatus} />
            <Share />
            <MoreHorizontal size={24} className="opacity-80 text-green-800" />
          </div>
        </div>
        <div
          className="my-5 font-serif"
          dangerouslySetInnerHTML={{ __html: formatedContent?.finalContent }}
        ></div>
      </div>
    </div>
  );
};

export default StoryRender;
