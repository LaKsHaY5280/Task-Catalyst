"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../server";
import { config } from "../utils";
import { IToDo } from "../types/todos";

// ============================================================
// TODOS
// ============================================================

// ============================== ADD POST
export async function addTodo({ title, desc, tags, dueDate, creator }: IToDo) {
  try {
    const { databases } = await createAdminClient();
    const newTodo = await databases.createDocument(
      config.databaseId!,
      config.todoCollectionId!,
      ID.unique(),
      {
        title,
        desc,
        tags,
        dueDate,
        creator,
      },
    );

    return newTodo;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== GET USER'S POST
export async function getUserPosts(userId?: string) {
  if (!userId) return;

  try {
    const { databases } = await createAdminClient();

    const post = await databases.listDocuments(
      config.databaseId!,
      config.todoCollectionId!,
      [Query.equal("creator", userId), Query.orderDesc("$createdAt")],
    );

    if (!post) throw Error;

    return post;
  } catch (error) {
    console.log(error);
  }
}
