import { Request, Response } from "express";

import { getAllUsers, getUserByID, deleteUserByID, updateUserByID } from "../../models/users/user.model";
import { IOUser } from "../../types";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await getAllUsers();
    return res.status(200).send(users);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export const getUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const user = await getUserByID(id);
    
    if (user !== null) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  try {
    const user = await deleteUserByID(id);
    
    if (user !== null) {
      return res.status(200).send(user);
    } else {
      return res.status(404).send({ error: "User not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body as IOUser;

  try {
    const updatedUser = await updateUserByID(id, body);
    return res.status(200).send(updatedUser);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}