import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { IUser, IUserPayload } from "../../types";
import { createNewUser, getUserByEmail, isUserExists } from "../../models/users/user.model";
import { UserSchema } from "../../models/user.schema";
import { ifError } from "assert";

const TOKEN_EXPIRED = 60 * 24 * 3; // 3 days

const ATokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const RTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

function _generateToken(data: IUserPayload) {
  return jwt.sign(data, ATokenSecret,{ expiresIn: `${TOKEN_EXPIRED}h` });
}

export const postAuthLogin = async (req: Request, res: Response) => {
  const value = req.body as IUser;

  const { value: user, error } = UserSchema.validate({ email: value.email, password: value.password });
  console.log(value);
  
  if (error) return console.log("schema error",error);
  if (error) return res.status(400).json({ message: error });
  
  try {
    const userExists = await isUserExists(user.email);
    if (!userExists) {
      return res.status(404).send({ error: "User not found" });
    }

    getUserByEmail(user.email)
    .then(async (userdb) => {
      const data = { id: userdb!._id.toString(), email: userdb!.email };

      const accessToken = _generateToken(data);
      const refreshToken = jwt.sign(data, RTokenSecret);

      const now = new Date();
      now.setMinutes(now.getMinutes() + TOKEN_EXPIRED);

      const token = {
        name: userdb!.username,
        expiresIn: now.toISOString(),
        accessToken,
        refreshToken,
      }

      if (await bcrypt.compare(user.password, userdb!.password)) {
        return res.status(200).send(token);
      } else {
        return res.status(401).send({
          error: "WRONG_PASSWORD"
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({ error: err });
    });

  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export const PostAuthSignUp = async (req: Request, res: Response) => {
  const value = req.body as IUser;

  const { value: user, error } = UserSchema.validate(value);

  if (error) return res.status(400).json({ message: error });
  
  try {
    if (await isUserExists(user.email)) {
      return res.status(409).send({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      ...user,
      password: hashedPassword
    }

    createNewUser(newUser)
    .then((user) => {
      const data = { id: user._id.toString(), email: user.email };

      const accessToken = _generateToken(data);
      const refreshToken = jwt.sign(data, RTokenSecret);

      const now = new Date();
      now.setMinutes(now.getMinutes() + TOKEN_EXPIRED);

      const token = {
        expiresIn: now.toISOString(),
        accessToken,
        refreshToken,
      }

      return res.status(201).send(token);
    })
    .catch((err) => {
      return res.status(500).send({ error: err });
    });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
}

export const postAuthRefresh = async (req: Request, res: Response) => {
  const refreshToken = req.body.refreshToken;

  if (refreshToken === undefined || refreshToken === "") {
    return res.status(401).send({ error: "Unauthorized" });
  }
    
  jwt.verify(refreshToken, RTokenSecret, (err: any, user: any) => {
    if (err) {
      console.log(err);
      return res.status(401).send({
        error: "Unauthorized"
      });
    }
  });

}