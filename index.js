import { readCSV, writeCSV } from "./lib/io.js";

// Read CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;
