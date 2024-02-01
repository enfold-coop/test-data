export interface GenerateCSVOptions {
  prefix: string;
  rows: number;
  mb?: number;
  numfiles?: number;
  dir?: string;
}

export const defaultOptions: GenerateCSVOptions = {
  prefix: "mock-data",
  rows: 1000,
  mb: undefined,
  numfiles: 1,
  dir: "./output",
};
