"use server";

import { ID, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server";
import { cookies } from "next/headers";
import { INewUser } from "../types/user";
import { config } from "../utils";

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
      `${user.fname} ${user.lname}`,
    );

    if (!newAccount) throw Error;

    // const avatarUrl= new URL(avatars.getInitials(user.name).toString());
    // console.log(avatarUrl);

    const avatarUrl = new URL(
      `https://ui-avatars.com/api/?name=${user.fname}+${user.lname}&background=random&color=FFFFFF&bold=true&size=128`,
    );

    const username = user.username.startsWith("@") ? user.username : `@${user.username}`;



    const newUser = await saveUserToDB({
      userId: newAccount.$id,
      fname: user.fname,
      lname: user.lname,
      email: newAccount.email,
      username: username,
      imageUrl: avatarUrl,
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
  fname: string;
  lname: string;
  imageUrl?: URL;
  username?: string;
}) {
  try {
    const { databases } = await createAdminClient();

    const newUser = await databases.createDocument(
      config.databaseId!,
      config.userCollectionId!,
      ID.unique(),
      user,
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
      user.password,
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
      "There was an error signing in. Please check your email and password.",
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
      [Query.equal("userId", currentAccount.$id)],
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

// export async function setAvatar() {
//   try {
//     const { avatars } = await createAdminClient();

//     const user = await getCurrentUser();
//     if (!user) throw Error;

//     const arrayBuffer = avatars.getInitials(user.name);
//     const avatarUrl = Buffer.from(arrayBuffer.toString()).toString("base64");

//     const byteCharacters = atob(avatarUrl);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     const blob = new Blob([byteArray], { type: "image/png" });
//     const url = URL.createObjectURL(blob);

//     return url;
//   } catch (error) {
//     console.log(error);
//   }
// }