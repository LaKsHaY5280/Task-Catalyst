"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient } from "../server";
import { config } from "../utils";
import { IToDo } from "../types/todos";
import { getCurrentUser } from "./user";

// ============================================================
// TODOS
// ============================================================

// ============================== ADD POST
export async function addTodo({
  title,
  desc,
  priority,
  labels,
  tags,
  dueDate,
  status,
  creator,
}: IToDo) {
  try {
    const { databases } = await createAdminClient();
    const user = await getCurrentUser();
    console.log(user!.id);
    const newTodo = await databases.createDocument(
      config.databaseId!,
      config.todoCollectionId!,
      ID.unique(),
      {
        id: ID.unique(),
        title,
        desc,
        priority,
        labels,
        tags,
        dueDate,
        status,
        creator: creator || user!.id,
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
