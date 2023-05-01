import express from "express";

import { getNote, getNotes } from "./notes.controller";

const notesRouter = express.Router();

notesRouter.get("/", getNotes);
notesRouter.get("/:id", getNote);
// notesRouter.put("/:id",updateNote);
// notesRouter.delete("/:id", deleteNote);

export default notesRouter;