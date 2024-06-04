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
