import express from "express";

import { deleteNote, getNote, getNotes, postNote, updateNote } from "./notes.controller";

const notesRouter = express.Router();

notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNote);
notesRouter.put("/:id", updateNote);
notesRouter.post("/", postNote);
notesRouter.delete("/:id", deleteNote);

export default notesRouter;