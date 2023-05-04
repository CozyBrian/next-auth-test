import Joi from "joi";
import { INote } from "../../types";

export const NoteSchema = Joi.object<INote>({
  title: Joi.string().required(),
  description: Joi.string().required(),
  userId: Joi.string().optional(),
})