import { contentFormat } from "@/lib/data";
import React from "react";

const SidebarStories = async ({ story }: any) => {
  const formattedContent: any = await contentFormat(story?.content, 20);
  return (
    <div className="space-y-1 mb-4">
      <div className="flex items-center space-x-2">
        <img
          src={formattedContent?.imgSrc}
          className="w-7 h-7 rounded-full"
          alt=""
        />
        <div className="">
          <h4 className="text-md font-semibold">
            {formattedContent?.h1ElementWithoutTag}
          </h4>
          <span className="text-xs">{formattedContent?.firstWords}</span>
        </div>
      </div>
    </div>
  );
};

export default SidebarStories;
