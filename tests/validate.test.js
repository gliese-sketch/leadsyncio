import { describe, expect, test } from "vitest";

import { isURL, isEmail, isEmployeeSize } from "../lib/validate.js";

describe("Checking isURL", () => {
  test("Check for proper URL", () => {
    expect(isURL("https://google.com")).toBe(true);
  });

  test("Check for valid URL pattern", () => {
    expect(isURL("www.google.im")).toBe(true);
  });

  test("Checks for any matching URL pattern", () => {
    expect(isURL("google")).toBe(false);
  });

  test("Checks for www", () => {
    expect(isURL("ww.google.com")).toBe(true);
  });

  test("Check for both http and www part", () => {
    expect(isURL("http://www.google.com")).toBe(true);
  });
});

describe("Checking isEmail", () => {
  test("Check for proper email", () => {
    expect(isEmail("hey@website.com")).toBe(true);
  });

  test("Check for NA", () => {
    expect(isEmail("NA")).toBe(true);
  });

  test("Check for wrong email", () => {
    expect(isEmail("hey@company")).toBe(true);
  });
});

describe("Checking isEmployeeSize", () => {
  test("Check for a number", () => {
    expect(isEmployeeSize("40")).toBe(true);
  });

  test("Check for a range", () => {
    expect(isEmployeeSize("10-500")).toBe(true);
  });

  test("Check for k & +", () => {
    expect(isEmployeeSize("10k+")).toBe(true);
  });

  test("Check for invalid suffix", () => {
    expect(isEmployeeSize("10lakh")).toBe(false);
  });

  test("Check for invalid operator", () => {
    expect(isEmployeeSize("10k-")).toBe(false);
  });
});
