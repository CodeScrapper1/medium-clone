import React from "react";
import StoryDetail from "./StoryDetail";

const GetStories = ({ stories }: any) => {
  return (
    <div className="space-y-10 py-4">
      {stories?.map((story: any, index: number) => (
        <StoryDetail key={index} story={story} />
      ))}
    </div>
  );
};

export default GetStories;
