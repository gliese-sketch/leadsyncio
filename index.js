// Read CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

import { readCSV, writeCSV } from "./lib/io.js";
import service from "./lib/service.js";

// This is responsible to start our program
function main() {
  const csvData = readCSV(argv.input);
  const [clean, errors] = service(csvData.body);

  // Create the clean file
  writeCSV(argv.clean, clean);

  // Generate report file
  writeCSV(argv.errors, errors);
}
main();
