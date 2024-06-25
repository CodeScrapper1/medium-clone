import { checkFav } from "@/favorite";
import { contentFormat } from "@/lib/data";
import React from "react";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import Favorite from "./Favorite";
import Share from "./Share";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";

const StoryDetail = async ({ story }: any) => {
  const savedStatus: any = await checkFav(story.id);
  const formattedContent: any = await contentFormat(story?.content, 30);
  console.log(story, "story");
  return (
    <div className="flex">
      <div>
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarImage
              alt={story?.author?.name}
              src={`${story?.author?.image}?height=40&width=40`}
            />
          </Avatar>
          <div className="text-sm text-gray-500">{story?.author?.name}</div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Link href={`/published/${story?.id}`}>
              <h2 className="text-xl font-bold">
                {formattedContent?.h1ElementWithoutTag}
              </h2>
            </Link>
            <p className="text-sm">{formattedContent?.firstWords}</p>
            <div>
              <div className="flex gap-3">
                {story?.topics?.map((topic: string) => (
                  <div className="text-gray-500 text-sm">
                    <Badge variant="secondary">{topic}</Badge>
                  </div>
                ))}
              </div>
              <div className="flex items-center gap-4 mr-8">
                <div className="flex items-center space-x-4">
                  <Favorite storyId={story.id} favStatus={savedStatus} />
                  <Share />
                  <MoreHorizontal
                    size={24}
                    className="opacity-80 text-green-800"
                  />
                </div>
              </div>
            </div>
          </div>
          <img src={formattedContent?.imgSrc} alt="" className="w-40" />
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;
