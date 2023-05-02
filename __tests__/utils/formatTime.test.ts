import formatTime from "@/utils/formatTime";

beforeAll(() => {
  process.env.TZ = "America/New_York";
});

describe("formatTime", () => {
  test("formats a timestamp in the morning", () => {
    const result = formatTime("2022-01-02T14:30:00.000Z");
    const date = new Date("2022-01-02T14:30:00.000Z");
    console.log(date.toUTCString());
    expect(result).toBe("9:30 AM");
  });

  test("formats a timestamp in the afternoon", () => {
    const result = formatTime("2022-01-02T21:30:00.000Z");
    expect(result).toBe("4:30 PM");
  });

  test("formats a timestamp at midnight", () => {
    const result = formatTime("2022-01-02T05:00:00.000Z");
    expect(result).toBe("12:00 AM");
  });

  test("formats a timestamp at noon", () => {
    const result = formatTime("2022-01-01T17:00:00.000Z");
    expect(result).toBe("12:00 PM");
  });
  test("returns an empty string if a timestamp is invalid", () => {
    const result = formatTime("invalidTimestamp");
    expect(result).toBe("");
  });
});
