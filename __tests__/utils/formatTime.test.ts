import formatTime from "@/utils/formatTime";

describe("formatTime", () => {
  test("formats a timestamp in the morning", () => {
    const result = formatTime(1641115800000);
    expect(result).toBe("4:30 AM");
  });

  test("formats a timestamp in the afternoon", () => {
    const result = formatTime(1641159000000);
    expect(result).toBe("4:30 PM");
  });

  test("formats a timestamp at midnight", () => {
    const result = formatTime(1641186000000);
    expect(result).toBe("12:00 AM");
  });

  test("formats a timestamp at noon", () => {
    const result = formatTime(1641142800000);
    expect(result).toBe("12:00 PM");
  });
  test("returns an empty string if a timestamp is invalid", () => {
    const result = formatTime("invalidTimestamp");
    expect(result).toBe("");
  });
});
