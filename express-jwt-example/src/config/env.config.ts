import * as dotenv from "dotenv";

const env = dotenv.config();

if (env.error) throw env.error;

const parsedEnv = env.parsed as object;

const envKeys = Object.keys(parsedEnv);
const envVals = Object.values(parsedEnv);

envVals.forEach((value, index) => {
  if (!value) throw new Error(`process.env.${envKeys[index]} is empty`);
});

export const PORT: number = parseInt(process.env.PORT as string, 10);

export const ACCESS_TOKEN_SECRET: string = process.env
  .ACCESS_TOKEN_SECRET as string;

export const REFRESH_TOKEN_SECRET: string = process.env
  .REFRESH_TOKEN_SECRET as string;
