import { Client, Account, Databases, Storage, Avatars } from "appwrite";
import { config } from "./utils";

export const client = new Client();

client.setEndpoint(config.url!).setProject(config.projectId!);

export const account = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);
export const avatars = new Avatars(client);

export { ID } from "appwrite";
