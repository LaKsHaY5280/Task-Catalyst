"use server";

import { ID, ImageGravity, OAuthProvider, Query } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../server";
import { cookies, headers } from "next/headers";
import { INewUser, IProfile } from "../types/user";
import { config } from "../utils";
import { redirect } from "next/navigation";
import { InputFile } from "node-appwrite/file";
import { account, storage } from "../client-sdk";

// ============================================================
// AUTH
// ============================================================

// ============================== SIGN UP
export async function createUserAccount(user: INewUser) {
  try {
    const { account } = await createAdminClient();
    const newAccount = await account.create(
      ID.unique(),
      user.email,
      user.password,
      `${user.fname} ${user.lname}`,
    );

    if (!newAccount) throw Error;

    const username = user.username.startsWith("@")
      ? user.username
      : `@${user.username}`;

    const name = `${user.fname} ${user.lname}`;

    const avatarUrl = new URL(
      `https://cloud.appwrite.io/v1/avatars/initials?name=${name}&project=${config.projectId}`,
    );

    const newUser = await saveUserToDB({
      userId: newAccount.$id,
      fname: user.fname,
      lname: user.lname,
      email: newAccount.email,
      username: username,
      imageUrl: avatarUrl,
    });

    await signInAccount({
      email: user.email,
      password: user.password,
    });

    // if (session) {
    //   await createVerification(
    //     "http://localhost:3000/email-verify", // url
    //   );
    // }

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

    if (!session) throw new Error("There was an error signing in.");

    await setCookie(session.secret);
    return session;
  } catch (error) {
    throw new Error(
      "There was an error signing in. Please check your email and password.",
    );
  }
}

// ============================== CREATE VERIFICATION
export async function createVerification(url: string) {
  try {
    const { account } = await createSessionClient();
    const token = await account.createVerification(url);
    console.log(token);
    return token;
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE VERIFICATION
export async function updateVerification(userId: string, secret: string) {
  try {
    const { account } = await createSessionClient();
    await account.updateVerification(userId, secret);
  } catch (error) {
    console.log(error);
  }
}

// ============================== GET ACCOUNT
export async function getAccount() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    console.log(error);
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

// ============================== SIGNUP USING GOOGLE
export async function signUpWithGoogle() {
  const { account } = await createAdminClient();

  const origin = headers().get("origin");

  const redirectUrl = await account.createOAuth2Token(
    OAuthProvider.Google,
    `${origin}/oauth`,
    `${origin}/register`,
  );

  return redirect(redirectUrl);
}

// ============================== LOGGING IN USER VIA GOOGLE
export async function loginwithGoogle(userId: string, secret: string) {
  try {
    const { account, databases } = await createAdminClient();
    const session = await account.createSession(userId, secret);

    if (!session) throw new Error("There was an error signing in.");

    await setCookie(session.secret);

    const Gaccount = await getAccount();

    if (!Gaccount)
      throw new Error(
        "There was an error signing in. Please check your email and password.",
      );

    const name = Gaccount.name.split(" ");

    const avatarUrl = new URL(
      `https://cloud.appwrite.io/v1/avatars/initials?name=${Gaccount.name}&project=${config.projectId}`,
    );

    const userExists = await databases.listDocuments(
      config.databaseId!,
      config.userCollectionId!,
      [Query.equal("email", Gaccount.email)],
    );

    if (userExists.documents.length === 0) {
      await saveUserToDB({
        userId: Gaccount.$id,
        email: Gaccount.email,
        fname: name[0],
        lname: name[1],
        imageUrl: Gaccount.prefs.avatar || avatarUrl,
        username: generateRandomUsername(),
      });
    }

    // redirect("/");
  } catch (error) {
    throw new Error(
      "There was an error signing in. Please check your email and password.",
    );
  }
}

// ============================== COOKIE
export async function setCookie(secret: string) {
  try {
    cookies().set("task-catalyst-session", secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });
  } catch (error) {
    throw new Error("There was an error setting the cookie. Please try again.");
  }
}

// ============================== GENERATE RANDOM USERNAME
function generateRandomUsername(): string {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  let username = "";

  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    username += characters[randomIndex];
  }

  return `@${username}`;
}

// ============================== UPLOAD FILE
export async function uploadFile(file: any) {
  try {
    const uploadedFile = await storage.createFile(
      config.storageId!,
      ID.unique(),
      file,
    );

    return uploadedFile;
  } catch (error) {
    console.log(error);
  }
}


// ============================== DELETE FILE
export async function deleteFile(fileId: string) {
  try {
    const { storage } = await createAdminClient();

    await storage.deleteFile(config.storageId!, fileId);

    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}

// ============================== UPDATE USER
export async function updateUser(formdata: FormData, user: IProfile) {
  try {
    let image = {
      imageUrl: user.imageUrl,
      imageId: user.imageId,
    };

    if (formdata) {
      const uploadedFile = await uploadFile(formdata.get("file"));
      if (!uploadedFile) throw Error;

      // Get new file url
      const fileUrl = storage.getFilePreview(
        config.storageId!,
        uploadedFile.$id,
        2000,
        2000,
        ImageGravity.Top,
        100,
      );

      if (!fileUrl) {
        await deleteFile(uploadedFile.$id);
        throw Error;
      }

      console.log(fileUrl);

      image = { ...image, imageUrl: fileUrl, imageId: uploadedFile.$id };
    }

    const { databases } = await createAdminClient();

    //  Update user
    const updatedUser = await databases.updateDocument(
      config.databaseId!,
      config.userCollectionId!,
      user.userId,
      {
        imageUrl: image.imageUrl,
        imageId: image.imageId,
        fname: user.fname,
        lname: user.lname,
        username: user.username,
        email: user.email,
        bio: user.bio,
        course: user.course,
        year: user.year,
        semester: user.semester,
        section: user.section,

        // timetable: user.timetable,
        // syllabus: user.syllabus,
        // datesheet: user.datesheet,
        // recentTodos: user.recentTodos,
        // notes: user.notes,
      },
    );

    // Failed to update
    if (!updatedUser) {
      // If no new file uploaded, just throw error
      throw new Error(
        "There was an error updating your profile. Please try again.",
      );
    }

    return updatedUser;
  } catch (error) {
    console.log(error);
  }
}
