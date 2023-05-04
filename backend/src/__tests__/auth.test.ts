import mongoose from "mongoose";
import * as UserService from "../models/users/user.model";

const userId = new mongoose.Types.ObjectId().toString()

const userPayload = {
  _id: userId,
  email: "brian@test.com",
  username: "test@brian",
};

const userInput = {
  email: "test@brian.com",
  password: "test@brian",
  username: "test@brian"
}

describe("Authentication", () => {
  // User registration
  describe('User registration', () => {
    describe('given the email and password are valid', () => { 
      it('should return a 201 and token', () => {
        const createUserServiceMock = jest
          .spyOn(UserService, "createNewUser");

      });
    });
  });
  
  describe('User login', () => { 
    describe('given username and password are valid', () => {
      it('should return a signed accessToken & refreshToken', async () => {
  
      });
    });

    describe('given user not exists', () => { 
      it('should return a 404', async () => {
  
      });
    });

    describe('given password is incorrect', () => { 
      it('should return a 404', async () => {
  
      });
    });
  });
});