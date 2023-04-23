/**
 * @jest-environment node
 */

import register from "@/pages/api/auth/register";
import {
  mockRequestResponse,
  createRandomUser,
  testUser,
  testUserWithWeakPassword,
} from "../../testUtils";

import clientPromise from "../../lib/mongodb";
import { getCookie, getCookies } from "cookies-next";
import * as mongoDb from "mongodb";
import User from "@/models/User";

let client: mongoDb.MongoClient;
let users: mongoDb.Collection;
let newUser: Partial<User>;

beforeAll(async () => {
  client = await clientPromise;
  users = client.db("ichat").collection("users");
});

afterEach(async () => {
  //clear registered test User

  if (newUser)
    await users
      .deleteMany({ id: { $exists: true } })
      .then((value) => console.log(value))
      .catch((reason) => console.log(reason));
});

afterAll(async () => {
  client.close();
});

describe("Register API route", () => {
  it("should return a 405 if request is not POST", async () => {
    //Mock the request, response context
    const { req, res } = mockRequestResponse("GET");

    const resJsonSpy = jest.spyOn(res, "json");

    await register(req, res);

    expect(res.statusCode).toBe(405);
    expect(resJsonSpy.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"Bad Request, only POST accepted"`
    );
  });

  it("should return a 500 error if user's username already exits", async () => {
    const { req, res } = mockRequestResponse("POST", testUser);

    const ResJsonSpy = jest.spyOn(res, "json");

    await register(req, res);

    expect(ResJsonSpy.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"Could not register user"`
    );

    expect(res.statusCode).toBe(500);
  });

  it("should return a 500 error if user's password is not strong", async () => {
    const { req, res } = mockRequestResponse("POST", testUserWithWeakPassword);

    const ResJsonSpy = jest.spyOn(res, "json");

    await register(req, res);

    expect(ResJsonSpy.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"Could not register user"`
    );

    expect(res.statusCode).toBe(500);
  });

  it("should return a code 201 and access token and refresh token if user is valid", async () => {
    newUser = createRandomUser();
    const { req, res } = mockRequestResponse("POST", newUser);
    const ResJsonSpy = jest.spyOn(res, "json");
    jest.spyOn(res, "status");

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);

    expect(typeof ResJsonSpy.mock.calls[0][0]?.accessToken).toBe("string");
    expect(ResJsonSpy.mock.calls[0][0].accessToken.length).toBeGreaterThan(10);

    const refreshToken = getCookie("refreshToken", { req, res }) as string;

    expect(typeof refreshToken).toBe("string");
    expect(refreshToken.length).toBeGreaterThan(10);
  });
});
