import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import { IUser, IUserPayload } from "../../types";
import { createNewUser, getUserByEmail, isUserExists } from "../../models/users/user.model";
import { UserSchema } from "../../models/users/user.schema";

type token = {
  name: string;
  expiresIn: string;
  accessToken: string;
  refreshToken: string;
}

type tokenData = {
  id: string;
  email: string;
}

const ATOKEN_EXPIRERY = 60 * 5; // 5 minutes
const RTOKEN_EXPIRERY = 60 * 2; // 2 minutes

const ATokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const RTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

export function _generateToken(data: IUserPayload) {
  return jwt.sign(data, ATokenSecret,{ expiresIn: `${ATOKEN_EXPIRERY}s` });
}

function _generateRefreshToken(data: IUserPayload) {
  return jwt.sign(data, RTokenSecret,{ expiresIn: `${RTOKEN_EXPIRERY}s` });
}

export const postAuthLogin = async (req: Request, res: Response) => {
  const value = req.body as IUser;

  const { value: user, error } = UserSchema.validate({ email: value.email, password: value.password });
  
  if (error) return res.status(400).json({ message: error });
  
  try {
    const userExists = await isUserExists(user.email);
    if (!userExists) {
      return res.status(404).send({ error: "User not found" });
    }

    const userdb = await getUserByEmail(user.email)
   
    const data = { id: userdb!._id.toString(), email: userdb!.email };

    const accessToken = _generateToken(data);
    const refreshToken = _generateRefreshToken(data);

    const now = new Date();
    now.setSeconds(now.getSeconds() + ATOKEN_EXPIRERY);

    const token = {
      name: userdb!.username,
      expiresIn: now.toISOString(),
      accessToken,
      refreshToken,
    }

    if (await bcrypt.compare(user.password, userdb!.password)) {
      res.cookie('test.token', refreshToken, { httpOnly: true, maxAge: RTOKEN_EXPIRERY * 1000, sameSite: 'none', secure: true });
      return res.status(200).send(token);
    } else {
      return res.status(401).send({
        error: "WRONG_PASSWORD"
      });
    }

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

    const createdUser = await createNewUser(newUser)
  
    const data = { id: createdUser._id.toString(), email: createdUser.email };

    const accessToken = _generateToken(data);
    const refreshToken = _generateRefreshToken(data);

    const now = new Date();
    now.setMinutes(now.getMinutes() + ATOKEN_EXPIRERY);

    const token = {
      expiresIn: now.toISOString(),
      accessToken,
      refreshToken,
    }
    return res.status(201).send(token);
  
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error: error });
  }
}

export const getAuthLogout = async (req: Request, res: Response) => {
  try {
    const cookies = req.cookies;
    if (cookies['test.token'] === undefined) {
      return res.sendStatus(204);
    }

    // TODO: Delete refresh token from database

    res.clearCookie('test.token');
    return res.sendStatus(204);

  } catch (error) {
    
  }
}

export const getAuthRefresh = async (req: Request, res: Response) => {
  const refreshToken = req.cookies['test.token'];

  if (refreshToken === undefined || refreshToken === "") {
    return res.sendStatus(403);
  }
    
  jwt.verify(refreshToken, RTokenSecret, (err: any, user: any) => {
    if (err) return res.sendStatus(403);

    const accessToken = _generateToken({ id: user.id, email: user.email });

    const now = new Date();
    now.setSeconds(now.getSeconds() + ATOKEN_EXPIRERY);
    
    res.send({ accessToken, expiresIn: now.toISOString() })
  });
}