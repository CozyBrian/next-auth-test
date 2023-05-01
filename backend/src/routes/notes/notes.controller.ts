import { Request, Response } from "express";

const notes = [
  {
    id: "a",
    title: "Note 1",
    description: "Description 1",
  },
  {
    id: "ab",
    title: "Note 2",
    description: "Description 2",
  },
  {
    id: "abc",
    title: "Note 3",
    description: "Description 3",
  },
];

export const getNotes = async (req: Request, res: Response) => {
  try {
    return res.status(200).send(notes);
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}

export const getNote = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const note = notes.find((note) => note.id === id);
    if (note !== null) {
      return res.status(200).send(note);
    } else {
      return res.status(404).send({ error: "Note not found" });
    }
  } catch (error) {
    return res.status(500).send({ error: error });
  }
}