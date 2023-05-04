import { INote } from "../../types";
import Note from "./note.mongo";

export const getUserNotes = async (userId: string) => {
  try {
    const notes = await Note.find({ userId: userId });
    return notes;
  } catch (error) {
    console.error(error);
  }
};

export const createNewNote = async (note: INote) => {
  try {
    const newNote = new Note(note);
    return await newNote.save();
  } catch (error) {
    console.error(error);
  }
};

export const getNoteById = async (id: string, userId: string) => {
  try {
    const note = await Note.findOne({ _id: id, userId });
    return note;
  } catch (error) {
    console.error(error);
  }
};

export const updateNoteById = async (note: INote) => {
  try {
    const updatedNote = await Note.findByIdAndUpdate(note._id, note, { new: true });
    return await updatedNote?.save();
  } catch (error) {
    console.error(error);
  }
};

export const deleteNoteById = async (id: string, userId: string) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: id, userId });
    return deletedNote;
  } catch (error) {
    console.error(error);
  }
};

export const isNoteExists = async (id: string) => {
  const note = await Note.findOne({ _id: id });
  return note !== null
};