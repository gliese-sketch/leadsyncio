import validator from "validator";

// Checks for valid URL pattern
export const isURL = (text) => {
  return validator.isURL(text);
};

// Checks for valid URL and linkedin
export const isLinkedInURL = (text) => {
  return validator.isURL(text) && text.includes("linkedin");
};

// Checks if not a complete URL or a number
export const isCompanyName = (text) => {
  return !validator.isURL(text) && !validator.isNumeric(text);
};

// Checks for valid email pattern
export const isEmail = (text) => {
  if (validator.isEmail(text) || "NA" || "N/A") return true;

  return false;
};

// Checks for number, range, k or + pattern
export const isEmployeeSize = (text) => {
  const employeeSizeRegEx = /^(?:\d+-\d+|\d+k\+|\d+k|\d+\+|\d+)$/;

  return employeeSizeRegEx.test(text);
};
