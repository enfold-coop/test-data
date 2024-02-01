import * as fs from "fs";
import { faker } from "@faker-js/faker";
import { defaultOptions, GenerateCSVOptions } from "@App/types/options";

export const generateCSVs = async (options: GenerateCSVOptions) => {
  // Initialize unset options with default values.
  Object.entries(defaultOptions).forEach(([key, value]) => {
    if (!options[key]) {
      options[key] = value;
    }
  });

  let fileName = options.prefix + "-";

  if (!options.mb) {
    console.log(
      `Generating ${options.numfiles} CSV file${
        options.numfiles > 1 ? "s" : ""
      } with ${options.rows} rows...`
    );

    fileName += `${options.rows}rows`;
  } else if (options.numfiles > 1 && options.mb) {
    console.log(
      `Generating ${options.numfiles} CSV files in increments of ${options.mb}MB...`
    );
    fileName += "{{size}}MB";
  } else {
    console.log(`Generating a ${options.mb}MB CSV file...`);

    fileName += `${options.mb}MB`;
  }

  fileName += ".csv";

  const fieldnames = [
    "firstName",
    "lastName",
    "middleName",
    "findName",
    "jobTitle",
    "gender",
    "prefix",
    "suffix",
    "title",
    "jobDescriptor",
    "jobArea",
    "jobType",
  ];
  await fs.promises.writeFile(fileName, fieldnames.join(",") + "\n");

  for (let index = 0; index < options.rows; index++) {
    const rowText = fieldnames.map((fn) => faker.name[fn]()).join('","');
    await fs.promises.appendFile(fileName, `"${rowText}"\n`);
  }

  console.log("Done.");
};
