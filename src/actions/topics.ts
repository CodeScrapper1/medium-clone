"use server";

import db from "@/db/drizzle";
import { story, topics } from "@/db/schema";
import { getUser } from "./user";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

export const getUniqueTopics = async () => {
  try {
    const allStoryTopics = await db
      .select({ topics: story.topics })
      .from(story);

    const uniqueTopics = Array.from(
      new Set(allStoryTopics.flatMap((item) => item.topics))
    );

    const formatedTopics = uniqueTopics?.map((topic) => ({
      value: topic,
      label: topic,
    }));

    return formatedTopics;
  } catch (error) {
    console.log(error);
  }
};

export const SelectedTopics = async () => {
  const user: any = await getUser();

  try {
    const tags: any = await db.query.topics.findFirst({
      where: eq(topics.userId, user.id),
    });

    const formatedTopics = tags?.topics?.map((value: string) => ({
      value,
      label: value,
    }));

    return formatedTopics || [];
  } catch (error) {
    return [];
  }
};

export const addRemoveTags = async (tags: any) => {
  const user: any = await getUser();

  let response;
  try {
    const tag: any = await db.query.topics.findFirst({
      where: eq(topics.userId, user.id),
    });
    if (tag) {
      response = await db
        .update(topics)
        .set({ topics: tags })
        .where(eq(topics.id, tag.id))
        .returning();
    } else {
      const data: any = { userId: user.id, topics: tags };
      response = await db.insert(topics).values(data).returning();
    }
  } catch (error) {
    return { error: "tags not updated" };
  }
  redirect("/");
};
