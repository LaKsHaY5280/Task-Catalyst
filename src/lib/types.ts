export type IUser = {
  id: string;
  name: string;
  username: string;
  email: string;
  imageUrl: string;
};

export type INewUser = {
  name: string;
  email: string;
  username: string;
  password: string;
};

export type IUpdateUser = {
  userId: string;
  name: string;
  bio: string;
  imageId: string;
  imageUrl: URL | string;
  file: File[];
};

export type IContextType = {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
};

export const config = {
  url: process.env.NEXT_PUBLIC_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  databaseId: process.env.NEXT_PUBLIC_DATABASE_ID,
  userCollectionId: process.env.NEXT_PUBLIC_USERS_ID,
  storageId: process.env.NEXT_PUBLIC_STORAGE_ID,
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
};
