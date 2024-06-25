import { getStoryById } from "@/actions/story";
import { getUser } from "@/actions/user";
import NavbarStory from "@/components/NavbarStory";
import NewStory from "@/components/NewStory";
import { User } from "@/interfaces";
import React from "react";

const StoryId = async ({ params }: { params: { storyId: string } }) => {
  const story: any = await getStoryById(params?.storyId, false);
  const user: any = await getUser();
  console.log(user, "story");
  return (
    <div>
      <NavbarStory
        storyId={params.storyId}
        currentUserName={user?.name || ""}
      />
      <NewStory storyId={params.storyId} storyContent={story?.content} />
    </div>
  );
};

export default StoryId;
