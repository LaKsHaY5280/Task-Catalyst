"use server";
import { Client, Account, Databases, Storage, Avatars } from "node-appwrite";
import { cookies } from "next/headers";
import { config } from "./utils";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(config.url!)
    .setProject(config.projectId!);

  const session = cookies().get("task-catalyst-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(config.url!)
    .setProject(config.projectId!)
    .setKey(config.apiKey!);

  return {
    get account() {
      return new Account(client);
    },
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
    get avatars() {
      return new Avatars(client);
    },
  };
}
