import Joi from "joi";
import { IUser } from "../../types";

export const UserSchema = Joi.object<IUser>({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  username: Joi.string(),
});