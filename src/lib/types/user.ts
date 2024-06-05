export interface IUser {
  id: string;
  fname: string;
  lname: string;
  username: string;
  email: string;
  imageUrl: string;
}

export interface INewUser {
  fname: string;
  lname: string;
  email: string;
  username: string;
  password: string;
}

export interface IContextType {
  user: IUser;
  isLoading: boolean;
  setUser: React.Dispatch<React.SetStateAction<IUser>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  checkAuthUser: () => Promise<boolean>;
}

export interface IProfile {
  imageUrl: URL;
  fname: string;
  lname: string;
  username: string;
  email: string;
  password: string;
  bio: string;
  course: string;
  year: number;
  semester: number;
  section: string;
  // timetable: string;
  // syllabus: string;
  // datesheet: string;
  // recentTodos: string;
  // notes: string;
}
