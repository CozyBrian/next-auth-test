import mongoose from "mongoose";
import * as UserService from "../models/users/user.model";
import supertest from "supertest";
import app from "../app";
import { MongoMemoryServer } from "mongodb-memory-server";

const userId = new mongoose.Types.ObjectId().toString()

const userPayload = {
  _id: userId,
  email: "brian@test.com",
  username: "test@brian",
};

const userInput = {
  email: "test@brian.com",
  password: "test@brian",
  username: "brian"
}

describe("Authentication", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
  });
  
  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close(); 
  });
  

  // User registration
  describe('User registration', () => {
    describe('given the email and password are valid', () => { 
      it('should return a 201 and token', async () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createNewUser");

        const { statusCode, body } = await supertest(app).post(`/v1/auth/signup`).send(userInput);

        expect(statusCode).toEqual(201);

        expect(body).toHaveProperty("accessToken");

        expect(body).toHaveProperty("refreshToken");

        expect(body).toHaveProperty("expiresIn");

        expect(createUserServiceMock).toHaveBeenCalledWith({...userInput, password: expect.any(String) });
      });
    });
  });
  
  describe('User login', () => { 
    describe('given username and password are valid', () => {
      it('should return a signed accessToken & refreshToken', async () => {
        const { statusCode, body } = await supertest(app).post(`/v1/auth/login`).send(userInput);

        expect(statusCode).toEqual(200);

        expect(body).toHaveProperty("accessToken");

        expect(body).toHaveProperty("refreshToken");
      });
    });

    describe('given user not exists', () => { 
      it('should return a 404', async () => {
        const { statusCode } = await supertest(app).post(`/v1/auth/login`).send({ email: "does@gmail.com", password: "notexists" });

        expect(statusCode).toEqual(404);
      });
    });

    describe('given password is incorrect', () => { 
      it('should return a 404', async () => {
        const { statusCode, body } = await supertest(app).post(`/v1/auth/login`).send({...userInput, password: "notexists" });

        expect(statusCode).toEqual(401);

        expect(body.error).toEqual("WRONG_PASSWORD");
      });
    });
  });
});