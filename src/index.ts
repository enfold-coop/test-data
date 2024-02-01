#! /usr/bin/env node
/**
 * Node Typescript script to generate CSV files filled with fake data
 *
 * Usage:
 *    npx tsc . && node ../dist/index.js
 *
 *    TODO: Add more usage instructions, with parameters and compilation commands
 */

import { program } from "commander";
import filenamify from "filenamify";
import { accessSync, lstatSync } from "fs";
import { generateCSVs } from "./commands/generate-csv";
import { defaultOptions } from "@App/types/options";

const parsePrefix = (prefix) => {
  return filenamify(prefix || defaultOptions.prefix, { replacement: "-" });
};

const parseRows = (numRows: string) => {
  return parseInt(numRows, 10) || defaultOptions.rows;
};

const parseMb = (numMb: string) => {
  return parseInt(numMb, 10) || defaultOptions.mb;
};

const parseNumFiles = (numFiles: string) => {
  return parseInt(numFiles, 10) || defaultOptions.numfiles;
};

const parseDirectory = (dirPath: string) => {
  try {
    accessSync(dirPath);
  } catch (error) {
    throw new Error("Output directory path does not exist.");
  }

  const stats = lstatSync(dirPath);
  if (!stats.isDirectory) {
    throw new Error("Given out path is not a directory.");
  }

  return dirPath;
};

program
  .command("csv")
  .description("Generate one or more CSV files filled with fake personal data.")
  .option(
    "-p, --prefix <string>",
    "File name prefix (default is 'mock-data')",
    parsePrefix
  )
  .option(
    "-r, --rows <number>",
    "Number of rows to generate (default is 1000). If --mb is specified, this argument is ignored.",
    parseRows
  )
  .option(
    "-m, --mb <number>",
    "Desired file size in megabytes (optional). If --numfiles is also specified, --numfiles will be generated in increments of --mb. This argument, if specified, will override the number of rows.",
    parseMb
  )
  .option(
    "-n, --numfiles <number>",
    "Number of files to generate (optional). If --mb is also specified, the number of files will be generated in increments of --mb megabytes.",
    parseNumFiles
  )
  .option(
    "-d, --dir <string>",
    "Directory path where the CSV files will be saved (defaults to './csv').",
    parseDirectory
  )
  .action(generateCSVs);

program.parse();
