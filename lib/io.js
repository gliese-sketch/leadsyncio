import fs from "fs";
import Papa from "papaparse";

// Read from a csv file
export function readCSV(file) {
  try {
    const fileContent = fs.readFileSync(file, "utf-8");
    const parse = Papa.parse(fileContent, {
      header: true,
    });

    return { body: parse.data, headers: parse.meta.fields };
  } catch (err) {
    console.log("Error occured while reading the file", err);
    process.exit(1);
  }
}

// Write to a csv file
export function writeCSV(file, data) {
  try {
    const stringify = Papa.unparse(data);
    fs.writeFileSync(file, stringify);
  } catch (err) {
    console.log("Error occured while writing the file", err);
    process.exit(1);
  }
}
