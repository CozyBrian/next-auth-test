import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app";
import mongoose from "mongoose";
import { createNewNote } from "../models/notes/note.model";
import { INote } from "../types";
import { _generateToken } from "../routes/auth/auth.controller";

const userId = new mongoose.Types.ObjectId().toString()

const userPayload = {
  id: userId,
  email: "brian@test.com",
};

const productPayload: INote = {
  userId: userId,
  title: "Test Product",
  description: "Test Description",
}

describe("Notes", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close(); 
  });
  
  const accessToken = _generateToken(userPayload);

  describe("GET /v1/notes route", () => {

    describe("given the user not logged in" ,() => {
      it("should return a 401", async () => {
        const { statusCode } = await supertest(app).get(`/v1/notes`);
        
        expect(statusCode).toEqual(401);
      });
    });

    describe("given the user logged in" ,() => {

      describe("given note doesn't exists", () => {
        it("should return a 404", async () => {
          const { statusCode } = await supertest(app).get(`/v1/notes/${userId}`)
            .set("Authorization", `Bearer ${accessToken}`);

          expect(statusCode).toEqual(404);
        });
      });
      
      describe("given note does exist", () => {
        it("should return a 200 and note", async () => {
          const note = await createNewNote(productPayload);
    
          const { body, statusCode } = await supertest(app).get(`/v1/notes/${note?._id}`)
            .set("Authorization", `Bearer ${accessToken}`);
    
          expect(statusCode).toEqual(200);
          expect(body.title).toEqual(productPayload.title);
        });
      });

    });
  });
  
  describe("POST /v1/notes route", () => {
    
    describe("given the user not logged in" ,() => {
      it("should return a 401", async () => {
        const {statusCode} = await supertest(app).post(`/v1/notes`);
        
        expect(statusCode).toEqual(401);
      });
    });

    describe("given the user logged in" ,() => {
      it("should return a 201 and create note", async () => {
        const { body, statusCode } = await supertest(app).post(`/v1/notes`)
        .set("Authorization", `Bearer ${accessToken}`)
        .send(productPayload);

        expect(statusCode).toEqual(201);
        expect(body.title).toEqual(productPayload.title);
      });
    });

  });

});