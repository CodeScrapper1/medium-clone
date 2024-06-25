"use server";
import db from "@/db/drizzle";
import { comment, reply } from "@/db/schema";
import { count, eq } from "drizzle-orm";
import { getUser } from "./user";
import { getStoryById } from "./story";
import { revalidatePath } from "next/cache";

export const NumberOfComments = async (storyId: string) => {
  try {
    const response = await db
      .select({ count: count() })
      .from(comment)
      .where(eq(comment.storyId, storyId));

    return response?.[0]?.count || 0;
  } catch (error) {
    return { error: "Error getting number of comments" };
  }
};

// add comment by story
export const commentStory = async (
  storyId: string,
  content: string,
  commentId?: string
) => {
  const user: any = await getUser();

  if (!storyId || !content) {
    return { error: "something is missing" };
  }

  let Comment;

  try {
    await getStoryById(storyId, true);
    if (!commentId) {
      const data: any = {
        userId: user.id,
        storyId,
        content,
      };
      Comment = await db.insert(comment).values(data).returning();
    } else {
      const data: any = {
        userId: user.id,
        commentId,
        content,
      };
      Comment = await db.insert(reply).values(data).returning();
    }
  } catch (error) {
    return { error: "Error in getting story comment" };
  }
  revalidatePath(`/published/${storyId}`);
};

// get all comments by story
export const getAllComments = async (storyId: string) => {
  if (!storyId) {
    return { error: "required data is not provided" };
  }

  let Comments;

  try {
    Comments = await db.query.comment.findMany({
      where: eq(comment.storyId, storyId),
      with: {
        clap: true,
        author: true,
        replies: { with: { clap: true, author: true } },
      },
    });

    if (!Comments?.length) {
      return { error: "No Comment" };
    }
  } catch (error) {
    return { error: "Error getting comments by story" };
  }
  revalidatePath(`published/${storyId}`);
  return Comments;
};
