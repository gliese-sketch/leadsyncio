import fs from "fs";
import Papa from "papaparse";

// Read from a csv file
export function readCSV(file) {
  const fileContent = fs.readFileSync(file, "utf-8");
  const parse = Papa.parse(fileContent, {
    header: true,
  });

  return { body: parse.data, headers: parse.meta.fields };
}

// Write to a csv file
export function writeCSV(file, data) {
  const row = data[0];
  row["Errors"] = "No error";
  data[0] = row;
  const stringify = Papa.unparse(data);
  fs.writeFileSync(file, stringify);
}
