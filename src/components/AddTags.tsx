"use client";
import { addRemoveTags } from "@/actions/topics";
import { topics } from "@/lib/data";
import React, { useState } from "react";
import Select from "react-select";
import { toast } from "./ui/use-toast";

const AddTags = ({ userTags }: any) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const AdduserTags = async () => {
    const res = await addRemoveTags(selectedTopics);
    if (res?.error) {
      toast({ title: res.error });
    }
  };
  return (
    <div className="fixed bg-gray-50 w-full z-20 overflow-auto top-0 left-0 right-0 bottom-0">
      <div className="max-w-[900px] mx-auto md:mt-28 mt-10 w-full">
        <div>
          <Select
            placeholder="tags"
            isMulti
            defaultValue={userTags}
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
            className="px-4 py-2 bg-gray-600 hover:bg-green-700 rounded-full text-white text-sm mt-8"
            onClick={AdduserTags}
          >
            Add Tags
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTags;
