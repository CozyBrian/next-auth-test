import { Request, Response } from "express";
import { deleteNoteById, getNoteById, getUserNotes, isNoteExists, updateNoteById } from "../../models/notes/note.model";
import { NoteSchema } from "../../models/notes/note.schema";
import { createNewNote } from "../../models/notes/note.model";

export const getNotes = async (req: Request, res: Response) => {
  try {
    const notes = await getUserNotes(req.user?.id!);
    return res.status(200).send(notes);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export const getNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const note = await getNoteById(id, req.user?.id!)
    if (note !== null && note !== undefined) {
      return res.status(200).send(note);
    } else {
      return res.status(404).send({ error: "Note not found" });
    }
  } catch (error) {
    return res.status(500).send(error);
  }
}

export const postNote = async (req: Request, res: Response) => {
  const value = req.body;

  try {
    const { value: note, error } = NoteSchema.validate(value);

    if (error) return res.status(400).json(error);

    note.userId = req.user?.id!;
    const newNote = await createNewNote(note);

    return res.status(201).send(newNote);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export const updateNote = async (req: Request, res: Response) => {
  const value = req.body;

  try {
    const { value: note, error } = NoteSchema.validate(value);

    if (error) return res.status(400).json(error);

    if (!(await isNoteExists(note._id!))) {
      return res.status(404).send({ error: "Note not found" });
    }
    const updatedNote = await updateNoteById(note);

    return res.status(200).send(updatedNote);
  } catch (error) {
    return res.status(500).send(error);
  }
}

export const deleteNote = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!(await isNoteExists(id))) {
      return res.status(404).send({ error: "Note not found" });
    }
    const deletedNote = await deleteNoteById(id, req.user?.id!);
    return res.status(200).send(deletedNote);
    
  } catch (error) {
    return res.status(500).send(error);
  }
}