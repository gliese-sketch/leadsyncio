#!/usr/bin/env node
import {
  intro,
  outro,
  text,
  log,
  isCancel,
  cancel,
  spinner,
} from "@clack/prompts";

// Read CLI Arguments
import yargs from "yargs/yargs";
import { hideBin } from "yargs/helpers";
const argv = yargs(hideBin(process.argv)).argv;

import { readCSV, writeCSV } from "./lib/io.js";
import service from "./lib/core.js";

async function fakeLoading() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve("Resolved");
    }, 1000);
  });
}

// This is responsible to start our program
async function main() {
  intro(`Nucsoft Leads Validator CLI Application`);
  // Do stuff

  const inputFile = await text({
    message: "What is the input file name?",
    placeholder: "file.csv",
    initialValue: "file.csv",
    validate(value) {
      if (!value.toLowerCase().endsWith(".csv"))
        return `Only csv files are supported!`;
    },
  });

  if (isCancel(inputFile)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const outputFile = await text({
    message: "What will be the output file name?",
    placeholder: "final.csv",
    initialValue: "final.csv",
    validate(value) {
      if (!value.toLowerCase().endsWith(".csv"))
        return `Only csv files are supported!`;
    },
  });

  if (isCancel(outputFile)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const errorsFile = await text({
    message: "What will be the errors file name?",
    placeholder: "errors.csv",
    initialValue: "errors.csv",
    validate(value) {
      if (!value.toLowerCase().endsWith(".csv"))
        return `Only csv files are supported!`;
    },
  });

  if (isCancel(errorsFile)) {
    cancel("Operation cancelled.");
    process.exit(0);
  }

  const s = spinner();

  s.start("Reading File");

  await fakeLoading();

  const csvData = readCSV(inputFile);
  const [clean, errors] = service(csvData.body);

  s.message("Creating the cleaned version");

  await fakeLoading();

  // Create the clean file
  writeCSV(outputFile, clean);

  s.message("Generating report");

  await fakeLoading();

  // Generate report file
  writeCSV(errorsFile, errors);

  await fakeLoading();

  s.stop("Operations completed");

  outro(`Thanks for using our service!`);
}

await main();
