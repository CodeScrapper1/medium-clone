"use server";
import { getUser } from "./user";
import db from "@/db/drizzle";
import { save, story } from "@/db/schema";
import { and, arrayContains, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const CreateStory = async () => {
  let newStory;
  try {
    const user: any = await getUser();

    newStory = await db.insert(story).values({ userId: user.id }).returning();
    if (!newStory.length) {
      return { error: "Story not created" };
    }
    console.log(user);
  } catch (error) {
    return { error: "Story not created" };
  }
  redirect(`/p/${newStory[0].id}`);
};

// get story by id
export const getStoryById = async (id: string, publish: boolean) => {
  if (!id) {
    return { error: "Do have sotry id" };
  }

  let storyDetails;
  try {
    storyDetails = await db.query.story.findFirst({
      where: and(eq(story.id, id), eq(story.publish, publish)),
    });

    if (!storyDetails) {
      return { error: "Error on getting story" };
    }
  } catch (error) {
    return { error: "Error on getting story" };
  }
  return storyDetails;
};

// update story
export const updateStory = async (storyId: string, content: any) => {
  if (!storyId || !content) {
    return { error: "please fill all fields" };
  }

  const Story = await db.query.story.findFirst({
    where: eq(story.id, storyId),
  });

  if (!Story) {
    return { error: "Story not exists" };
  }

  let update;
  try {
    update = await db
      .update(story)
      .set({ content })
      .where(eq(story.id, storyId))
      .returning();
    console.log(update, "update");
    if (!update?.length) {
      return { error: "Story not udpated" };
    }
  } catch (error) {
    return { error: "Story not udpated" };
  }
  revalidatePath(`/p/${storyId}`);
  return { result: update };
};

// publish new story

export const publishNewStory = async (storyId: string, topics: string[]) => {
  if (!storyId || !topics?.length) {
    return { error: "please provide complete information" };
  }

  const Story = await db.query.story.findFirst({
    where: eq(story.id, storyId),
  });

  if (!Story) {
    return { error: "No story found" };
  }

  let updateStory: any;

  try {
    updateStory = await db
      .update(story)
      .set({ topics, publish: true })
      .where(eq(story.id, storyId))
      .returning();
    if (!updateStory.length) {
      return { error: "Story not published" };
    }
  } catch (error) {
    return { error: "Story not published" };
  }
  redirect(`/published/${updateStory?.[0].id}`);
};

// add to fav
export const addToFav = async (storyId: string) => {
  const user: any = await getUser();
  let fav;
  try {
    await getStoryById(storyId, true);

    fav = await db.query.save.findFirst({
      where: and(eq(save.storyId, storyId), eq(save.userId, user.id)),
    });

    if (fav) {
      await db.delete(save).where(eq(save.id, fav.id));
    } else {
      fav = await db
        .insert(save)
        .values({ userId: user.id, storyId })
        .returning();
    }
  } catch (error) {
    return { error: "not added in fav" };
  }
  revalidatePath(`/published/${storyId}`);
};

// get all stories
export const getStories = async (tag: string) => {
  let stories;
  try {
    if (tag) {
      stories = await db.query.story.findMany({
        where: arrayContains(story.topics, [tag]),
        with: { author: true },
      });
    } else {
      stories = await db.query.story.findMany({
        with: { author: true },
      });
    }

    if (!stories?.length) {
      return { error: "Error on getting stories" };
    }
  } catch (error) {
    return { error: "Error on getting stories" };
  }
  return stories;
};

// limited stories
export const getLimitedStories = async (tag: string) => {
  let stories;
  try {
    if (tag) {
      stories = await db.query.story.findMany({
        where: arrayContains(story.topics, [tag]),
        limit: 4,
        offset: 0,
        with: { author: true },
      });
    } else {
      stories = await db.query.story.findMany({
        limit: 4,
        offset: 0,
        with: { author: true },
      });
    }

    if (!stories?.length) {
      return { error: "Error on getting stories" };
    }
  } catch (error) {
    return { error: "Error on getting stories" };
  }
  return stories;
};
