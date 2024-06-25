"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import StoryTags from "./StoryTags";
import { publishNewStory } from "@/actions/story";
import { toast } from "./ui/use-toast";

interface Props {
  storyId: string;
  currentUserName: string;
}
const NavbarStory = ({ storyId, currentUserName }: Props) => {
  const [showTags, setShowTags] = useState<boolean>(false);

  const publishStory = async (topics: string[]) => {
    try {
      const res = await publishNewStory(storyId, topics);
      if (res.error) {
        toast({ title: res.error });
      }
    } catch (error) {
      console.log("Error in publishing the story");
    }
  };
  return (
    <div>
      <div className="flex items-center justify-between px-10">
        <div className="flex items-center space-x-3">
          <Link href="/">
            <Image src="/logo.png" width={40} height={40} alt="Medium logo" />
          </Link>
        </div>
        <div className="flex items-center space-x-7">
          <button
            className="flex items-center opacity-90 hover:opacity-100 duration-100 ease-in cursor-pointer bg-green-600 hover:bg-green-700 rounded-full px-3 py-1 text-md text-white"
            onClick={() => setShowTags(true)}
          >
            Publish
          </button>
        </div>
      </div>
      {showTags && (
        <StoryTags
          storyId={storyId}
          publishStory={publishStory}
          username={currentUserName}
          setShowTags={setShowTags}
        />
      )}
    </div>
  );
};

export default NavbarStory;
