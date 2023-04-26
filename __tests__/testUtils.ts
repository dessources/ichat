import type { NextApiRequest, NextApiResponse } from "next";
import { createMocks, RequestMethod } from "node-mocks-http";
import { faker } from "@faker-js/faker";
import { User } from "@/models";

export function createRandomUser(): Partial<User> {
  return {
    name: faker.name.fullName(),
    username: faker.internet.userName(),
    profilePicture: faker.image.avatar(),
    password: faker.internet.password(),
  };
}

export function mockRequestResponse(
  method: RequestMethod,
  body?: any,
  headers?: any
) {
  const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
    method,
  });

  req.headers = {
    "Content-Type": "application/json",
    authorization: `Bearer ${process.env.NEXT_PUBLIC_API_ACCESS_TOKEN}`,
    ...headers,
  };

  req.body = body;
  return { req, res };
}

export const testUser = {
  username: process.env.TEST_USER_USERNAME,
  password: process.env.TEST_USER_PASSWORD,
};

export const testUserWithWeakPassword = {
  username: "badUser",
  password: "weak",
};
