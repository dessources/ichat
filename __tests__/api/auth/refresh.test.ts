/**
 * @jest-environment node
 */

import { mockRequestResponse } from "../../../testUtils";
import refresh from "@/pages/api/auth/refresh";

import { setCookie } from "cookies-next";

describe("Refresh  Api Route", () => {
  it("Should return a 405 error if request method is not POST", async () => {
    const { req, res } = mockRequestResponse("GET");

    const resJsonSpy = jest.spyOn(res, "json");

    await refresh(req, res);

    expect(res.statusCode).toBe(405);
    expect(resJsonSpy.mock.lastCall?.[0].message).toMatchInlineSnapshot(
      `"Method not allowed"`
    );
  });

  it("Should return a 401 error if refresh token is invalid", async () => {
    const { req, res } = mockRequestResponse("POST");
    setCookie("refreshToken", "BadRefreshToken", { req, res });

    const resJsonSpy = jest.spyOn(res, "json");

    await refresh(req, res);

    expect(res.statusCode).toBe(401);

    expect(resJsonSpy.mock.lastCall?.[0].message).toMatchInlineSnapshot(
      `"Authentication failed"`
    );
  });

  it("Should return a new access Token when refresh token valid", async () => {
    const { req, res } = mockRequestResponse("POST");
    setCookie("refreshToken", process.env.TEST_USER_REFRESH_TOKEN, { req, res });
    const resJsonSpy = jest.spyOn(res, "json");

    await refresh(req, res);

    expect(res.statusCode).toBe(200);
    const accessToken = resJsonSpy.mock.lastCall?.[0].accessToken;
    expect(typeof accessToken).toBe("string");
    expect(accessToken.length).toBeGreaterThan(10);
  });
});
