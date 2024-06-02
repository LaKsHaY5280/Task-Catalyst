"use server";

import { ID, Query } from "node-appwrite";
import { INewUser, config } from "../types";
import { createAdminClient, createSessionClient } from "../server";
import { cookies } from "next/headers";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const { account, avatars } = await createAdminClient();
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      user.name
    );

    if (!newAccount) throw Error;

    // const avatarUrl= new URL(avatars.getInitials(user.name).toString());
    // console.log(avatarUrl);

    const newUser = await saveUserToDB({
      userId: newAccount.$id,
      name: newAccount.name,
      email: newAccount.email,
      username: user.username,
      // imageUrl: "" as unknown as URL,
    });

    await signInAccount({ email: user.email, password: user.password });

    return newUser;
  } catch (error) {
    console.log(error);
    return error;
  }
}

// ============================== SAVE USER TO DB
export async function saveUserToDB(user: {
  userId: string;
  email: string;
  name: string;
  imageUrl?: URL;
  username?: string;
}) {
  try {
    const { databases } = await createAdminClient();

    const newUser = await databases.createDocument(
      config.databaseId!,
      config.userCollectionId!,
      ID.unique(),
      user
    );

    return newUser;
  } catch (error) {
    console.log(error);
  }
}

// ============================== SIGN IN
export async function signInAccount(user: { email: string; password: string }) {
  try {
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(
      user.email,
      user.password
    );

    cookies().set("task-catalyst-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return session;
  } catch (error) {
    throw new Error(
      "There was an error signing in. Please check your email and password."
    );
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ============================== GET USER
export async function getCurrentUser() {
  try {
    const { databases } = await createAdminClient();
    const currentAccount = await getAccount();

    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      config.databaseId!,
      config.userCollectionId!,
      [Query.equal("userId", currentAccount.$id)]
    );

    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
    return null;
  }
}

// ============================== SIGN OUT
export async function signOutAccount() {
  try {
    const { account } = await createSessionClient();

    cookies().delete("my-custom-session");
    await account.deleteSession("current");
  } catch (error) {
    console.log(error);
  }
}
