import { IOUser, IUser } from "../../types";
import User from "./user.mongo";

export const createNewUser = async (user: IUser) => {
  try {
    const newUser = new User(user);
    return await newUser.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const isUserExists = async (email: string) => {
  try {
    const isExists = await User.exists({ email: email });
    return isExists !== null;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getUserByEmail = async (email: string) => {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getUserByID = async (id: string) => {
  try {
    const user = await User.findById(id, { __v: 0, password: 0 });
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const getAllUsers = async () => {
  try {
    const users = await User.find({}, { __v: 0, password: 0 });
    return users;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const updateUserByID = async (id: string, updated_user: IOUser) => {
  try {
    const user = await User.findByIdAndUpdate(updated_user._id, updated_user, { new: true });
    return await user?.save();
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export const deleteUserByID = async (id: string) => {
  try {
    const user = await User.findByIdAndDelete(id);
    return user;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
