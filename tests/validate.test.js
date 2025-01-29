import { describe, expect, test } from "vitest";

import { isURL, isEmail, isEmployeeSize, isCompanyName } from "../lib/validate.js";

// MARK: isURL
describe("Checking isURL", () => {
  test("Check for proper URL", () => {
    expect(isURL("https://google.com")).toBe(true); // Valid HTTPS URL
  });

  test("Check for valid URL pattern", () => {
    expect(isURL("www.google.im")).toBe(true); // Valid WWW URL
  });

  test("Checks for incomplete pattern", () => {
    expect(isURL("google")).toBe(false); // Invalid - no protocol or TLD
  });

  test("Checks for www", () => {
    expect(isURL("ww.google.com")).toBe(true); // Valid WWW URL (even with "ww")
  });

  test("Check for both http and www part", () => {
    expect(isURL("http://www.google.com")).toBe(true); // Valid HTTP and WWW URL
  });

  test("Check for URL with path", () => {
    expect(isURL("https://www.example.com/path/to/page")).toBe(true); // Valid URL with path
  });

  test("Check for URL with query parameters", () => {
    expect(isURL("http://example.com?param1=value1&param2=value2")).toBe(true); // Valid URL with query parameters
  });

  test("Check for URL with fragment", () => {
    expect(isURL("https://example.com#fragment")).toBe(true); // Valid URL with fragment
  });

  test("Check for URL with subdomain", () => {
    expect(isURL("http://subdomain.example.com")).toBe(true); // Valid URL with subdomain
  });

  test("Check for URL without www", () => {
    expect(isURL("http://example.com")).toBe(true); // Valid URL without www
  });

  test("Check for invalid protocol", () => {
    expect(isURL("ftp://example.com")).toBe(false); // Invalid protocol (only http/https are considered valid in this context)
  });

  test("Check for empty string", () => {
    expect(isURL("")).toBe(false); // Empty string is not a valid URL
  });

  test("Check for null", () => {
    expect(isURL(null)).toBe(false); // Null is not a valid URL
  });
});


// MARK: isEmail
describe("Checking isEmail", () => {
  test("Check for proper email", () => {
    expect(isEmail("hey@website.com")).toBe(true);
  });

  test("Check for NA", () => {
    expect(isEmail("NA")).toBe(true);
  });

  test("Check for empty string", () => {
    expect(isEmail("")).toBe(false);
  });

  test("Check for wrong email", () => {
    expect(isEmail("hey@company")).toBe(false);
  });

  test("Check for email with multiple dots", () => {
    expect(isEmail("john.doe.smith@example.co.uk")).toBe(true);
  });

  test("Check for email with special characters", () => {
    expect(isEmail("john+doe@example.com")).toBe(true);
  });
  test("Check for no @ symbol", () => {
    expect(isEmail("john.example.com")).toBe(false);
  })
  test("Check for null", () => {
    expect(isEmail(null)).toBe(false);
  });

});



// MARK: isEmployeeSize
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
  test("Check for empty string", () => {
    expect(isEmployeeSize("")).toBe(false);
  });
  test("Check for null", () => {
    expect(isEmployeeSize(null)).toBe(false);
  });
  test("Check for only plus", () => {
    expect(isEmployeeSize("+")).toBe(false);
  });
  test("Check for only k", () => {
    expect(isEmployeeSize("k")).toBe(false);
  })
  test("Check for only dash", () => {
    expect(isEmployeeSize("-")).toBe(false);
  })
  test("Check for only number", () => {
    expect(isEmployeeSize("123")).toBe(true);
  })
});




// MARK: isCompanyName
describe("Checking isCompanyName", () => {
  test("Check for a valid name", () => {
    expect(isCompanyName("e24")).toBe(true);
  });

  test("Check for a pure number", () => {
    expect(isCompanyName("10")).toBe(false);
  });

  test("Check for incorrect employee size pattern", () => {
    expect(isCompanyName("10-500")).toBe(false);
  });

  test("Check for a URL", () => {
    expect(isCompanyName("https://facebook.com")).toBe(false);
  });

  test("Check for alphabetical name", () => {
    expect(isCompanyName("Phleebs")).toBe(true);
  });
  test("Check for an empty string", () => {
    expect(isCompanyName("")).toBe(false);
  });

  test("Check for null", () => {
    expect(isCompanyName(null)).toBe(false);
  });

  test("Check for a name with spaces", () => {
    expect(isCompanyName("Example Company")).toBe(true);
  });

  test("Check for a name with hyphens", () => {
    expect(isCompanyName("Example-Company")).toBe(true);
  });

  test("Check for a name with special characters", () => {
    expect(isCompanyName("Example&Company")).toBe(true);
  });

});

