import { getStoryById } from "@/actions/story";
import React, { useEffect, useState } from "react";
import { toast } from "./ui/use-toast";
import { contentFormat, topics } from "@/lib/data";
import Select from "react-select";
import Image from "next/image";

type Props = {
  storyId: string;
  publishStory: (topics: string[]) => void;
  username: string;
  setShowTags: React.Dispatch<React.SetStateAction<boolean>>;
};
const StoryTags = ({ storyId, publishStory, username, setShowTags }: Props) => {
  const [Story, setStory] = useState<any>();
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  useEffect(() => {
    const fetchStoryById = async () => {
      try {
        const res: any = await getStoryById(storyId, false);
        if (res.error) {
          toast({ title: res.error });
        } else {
          const data = await contentFormat(res?.content, 20);
          setStory(data);
        }
      } catch (error) {
        console.log("Error in fetching data");
      }
    };
    fetchStoryById();
  }, []);
  return (
    <div className="fixed bg-gray-50 w-full z-20 overflow-auto top-0 left-0 bottom-0 right-0">
      <span className="absolute top-4 right-6 text-3xl cursor-pointer">
        &times;
      </span>

      <div className="max-w-[900px] mx-auto md:mt-28 mt-10 grid md:grid-cols-2 grid-cols-1 gap-14">
        <div className="max-md:hidden">
          <p className="font-semibold">Story Preview</p>
          <div className="w-full h-[250px] bg-gray-100 rounded my-3 border-b-[1px]">
            {Story?.imgSrc && (
              <Image
                src={Story?.imgSrc}
                width={250}
                height={250}
                alt="preview image"
                className="w-full h-full object-cover"
              />
            )}
          </div>
          <h1 className="border-b-[1px] text-lg font-semibold py-2">
            {Story?.h1ElementWithoutTag}
          </h1>
          <p className="border-b-[1px] py-2 text-sm text-neutral-500 pt-3">
            {Story?.firstWords}
          </p>
        </div>
        <div>
          <p className="py-2">
            Publishing to: <span className="font-semibold">{username}</span>
          </p>
          <p>
            Add or change topics (up to 5) so readers know what your story is
            about
          </p>
          <Select
            placeholder="tags"
            isMulti
            onChange={(selectedVal) => {
              const values = selectedVal as { value: string; label: string }[];

              const stringValues = values.map((val) => val.value);

              setSelectedTopics(stringValues);
            }}
            isOptionDisabled={() => selectedTopics?.length >= 5}
            name="topics"
            options={topics}
            className="basic-multi-select"
            classNamePrefix="Add a topic ..."
          />
          <button
            onClick={() => publishStory(selectedTopics)}
            className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-full text-white text-sm mt-8"
          >
            Publish Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default StoryTags;
