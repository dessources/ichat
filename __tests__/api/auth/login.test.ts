/**
 * @jest-environment node
 */

import login from "@/pages/api/auth/login";
import { mockRequestResponse, testUser } from "../../testUtils";

import { setCookie, getCookie, getCookies } from "cookies-next";
import { NextApiRequest, NextApiResponse } from "next";

let reqRes: { req: NextApiRequest; res: NextApiResponse };

afterEach(() => {
  // Make sure that the api returned a response
  // no matter what. We do that by checking
  // the writableEnded property of res
  expect(reqRes?.res.writableEnded).toBeTruthy();
});
describe("Login API route", () => {
  it("should return a 401 error if user does not exist", async () => {
    //Mock the request, response context
    reqRes = mockRequestResponse("POST");
    const { req, res } = reqRes;
    jest.spyOn(res, "json");

    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Could not login user",
    });
  });

  it("should return a 401 error if password is incorrect", async () => {
    reqRes = mockRequestResponse("POST", {
      ...testUser,
      password: "badPassword",
    });
    const { req, res } = reqRes;
    const ResJsonSpy = jest.spyOn(res, "json");

    await login(req, res);

    expect(typeof ResJsonSpy.mock.calls[0][0]?.message).toBe("string");
    expect(ResJsonSpy.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"Could not login user"`
    );
    expect(res.statusCode).toBe(401);
  });

  it("should return a 401 error if refreshToken is incorrect", async () => {
    reqRes = mockRequestResponse("POST");
    const { req, res } = reqRes;
    setCookie("refreshToken", "badToken", { req, res });
    const ResJsonSpy = jest.spyOn(res, "json");

    await login(req, res);

    expect(typeof ResJsonSpy.mock.calls[0][0]?.message).toBe("string");
    expect(ResJsonSpy.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"Could not login user"`
    );
    expect(res.statusCode).toBe(401);
  });

  it("should return a JWT access token and refresh token cookie if authentication with username + password is successful", async () => {
    reqRes = mockRequestResponse("POST", testUser);
    const { req, res } = reqRes;
    jest.spyOn(res, "status");

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

    const { refreshToken, accessToken } = getCookies({ req, res }) as {
      refreshToken: string;
      accessToken: string;
    };

    expect(typeof refreshToken).toBe("string");
    expect(refreshToken.length).toBeGreaterThan(10);
    expect(typeof accessToken).toBe("string");
    expect(accessToken.length).toBeGreaterThan(10);
  });

  it("should set a JWT access token cookie if authentication with refresh token is successful", async () => {
    reqRes = mockRequestResponse("POST");
    const { req, res } = reqRes;
    setCookie("refreshToken", process.env.TEST_USER_REFRESH_TOKEN, { req, res });

    jest.spyOn(res, "status");

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const accessToken = getCookie("accessToken", { req, res }) as string;
    expect(typeof accessToken).toBe("string");

    expect(accessToken.length).toBeGreaterThan(10);
  });
});
