/**
 * @jest-environment node
 */

import login from "@/pages/api/auth/login";
import { mockRequestResponse, testUser } from "../../../testUtils";

import { setCookie, getCookie } from "cookies-next";

describe("Login API route", () => {
  it("should return a 401 error if user does not exist", async () => {
    //Mock the request, response context
    const { req, res } = mockRequestResponse("POST");

    jest.spyOn(res, "json");

    await login(req, res);

    expect(res.statusCode).toBe(401);
    expect(res.json).toHaveBeenCalledWith({
      message: "Could not login user",
    });
  });

  it("should return a 401 error if password is incorrect", async () => {
    const { req, res } = mockRequestResponse("POST", {
      ...testUser,
      password: "badPassword",
    });

    jest.spyOn(res, "json");

    await login(req, res);

    expect(res.json).toHaveBeenCalledWith({
      message: "Could not login user",
    });

    expect(res.statusCode).toBe(401);
  });

  it("should return a 401 error if refreshToken is incorrect", async () => {
    const { req, res } = mockRequestResponse("POST");
    setCookie("refreshToken", "badToken", { req, res });
    const ResJsonSpy = jest.spyOn(res, "json");

    await login(req, res);

    expect(typeof ResJsonSpy.mock.calls[0][0]?.message).toBe("string");
    expect(ResJsonSpy.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"Could not login user"`
    );
    expect(res.statusCode).toBe(401);
  });

  it("should return a JWT access token and refresh token if authentication with username + password is successful", async () => {
    const { req, res } = mockRequestResponse("POST", testUser);
    const ResJsonSpy = jest.spyOn(res, "json");
    jest.spyOn(res, "status");

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(typeof ResJsonSpy.mock.calls[0][0]?.accessToken).toBe("string");
    expect(ResJsonSpy.mock.calls[0][0].accessToken.length).toBeGreaterThan(10);

    const refreshToken = getCookie("refreshToken", { req, res }) as string;

    expect(typeof refreshToken).toBe("string");
    expect(refreshToken.length).toBeGreaterThan(10);
  });

  it("should return a JWT access token if authentication with refresh token is successful", async () => {
    const { req, res } = mockRequestResponse("POST");
    setCookie("refreshToken", process.env.TEST_USER_REFRESH_TOKEN, { req, res });

    const ResJsonSpy = jest.spyOn(res, "json");
    jest.spyOn(res, "status");

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);

    expect(typeof ResJsonSpy.mock.calls[0][0]?.accessToken).toBe("string");
    expect(ResJsonSpy.mock.calls[0][0].accessToken.length).toBeGreaterThan(10);
  });
});
