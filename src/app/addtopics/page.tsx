import { SelectedTopics } from "@/actions/topics";
import AddTags from "@/components/AddTags";
import React from "react";

const AddTopics = async () => {
  const userTags = await SelectedTopics();
  return <AddTags userTags={userTags} />;
};

export default AddTopics;
