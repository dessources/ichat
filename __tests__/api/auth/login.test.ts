/**
 * @jest-environment node
 */

import login from "@/pages/api/auth/login";
import { mockRequestResponse, testUser } from "../../../testUtils";

import { setCookie, getCookie, getCookies } from "cookies-next";

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

    const ResJsonSpy = jest.spyOn(res, "json");

    await login(req, res);

    expect(typeof ResJsonSpy.mock.calls[0][0]?.message).toBe("string");
    expect(ResJsonSpy.mock.calls[0][0].message).toMatchInlineSnapshot(
      `"Could not login user"`
    );
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

  it("should return a JWT access token and refresh token cookie if authentication with username + password is successful", async () => {
    const { req, res } = mockRequestResponse("POST", testUser);

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
    const { req, res } = mockRequestResponse("POST");
    setCookie("refreshToken", process.env.TEST_USER_REFRESH_TOKEN, { req, res });

    jest.spyOn(res, "status");

    await login(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    const accessToken = getCookie("accessToken", { req, res }) as string;
    expect(typeof accessToken).toBe("string");
    expect(accessToken.length).toBeGreaterThan(10);
  });
});
