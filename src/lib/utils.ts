import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const config = {
  url: process.env.NEXT_PUBLIC_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  databaseId: process.env.NEXT_PUBLIC_DATABASE_ID,
  userCollectionId: process.env.NEXT_PUBLIC_USERS_ID,
  todoCollectionId: process.env.NEXT_PUBLIC_TODOS_ID,
  storageId: process.env.NEXT_ENV_APPWRITE_USERPIC_STORAGE_ID,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
};

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);