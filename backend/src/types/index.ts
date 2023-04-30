export interface IUser {
  _id?: string;
  email: string;
  password: string;
  username: string;
}

export interface IUserPayload {
  id: string;
  email: string;
}

export type IOUser = Partial<IUser>;