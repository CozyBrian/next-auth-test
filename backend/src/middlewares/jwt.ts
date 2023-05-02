import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface IUserPayload {
  id: string;
  email: string;
}

declare global {
  namespace Express {
    interface Request {
      user?: IUserPayload;
    }
  }
}

const WhichUser = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (token === undefined) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!, (err, user) => {
    if (err) return res.sendStatus(401);

    req.user = user as IUserPayload;
    next();
  });
}

export default WhichUser;