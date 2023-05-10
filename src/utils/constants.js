"use strict";
exports.__esModule = true;
exports.AXIOS_CONFIG =
  exports.BASE_URL =
  exports.SHORT_REFRESH_TOKEN_DAYS_COUNT =
  exports.LONG_REFRESH_TOKEN_DAYS_COUNT =
  exports.SALT_ROUNDS =
  exports.MIN_NAME_LENGTH =
  exports.MAX_NAME_LENGTH =
  exports.MIN_USERNAME_LENGTH =
  exports.MAX_USERNAME_LENGTH =
  exports.MIN_PASSWORD_LENGTH =
    void 0;
exports.MIN_PASSWORD_LENGTH = 8;
exports.MAX_USERNAME_LENGTH = 41;
exports.MIN_USERNAME_LENGTH = 3;
exports.MAX_NAME_LENGTH = 50;
exports.MIN_NAME_LENGTH = 2;
exports.SALT_ROUNDS = 10;
exports.LONG_REFRESH_TOKEN_DAYS_COUNT = 30;
exports.SHORT_REFRESH_TOKEN_DAYS_COUNT = 1;
exports.BASE_URL = "/api";
exports.AXIOS_CONFIG = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer ".concat(process.env.NEXT_PUBLIC_API_ACCESS_TOKEN),
  },
};
