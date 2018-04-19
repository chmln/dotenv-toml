import { readFileSync } from "fs"

import * as toml from "toml-j0.4"

export interface Options {
  encoding?: string
  intoEnv?: boolean
  path?: string
  useJson?: boolean
}

const loadIntoEnv = function(env: Record<string, any>, useJson=false, prefix="")
{
  for (const key in env) {
    const value: any = env[key]

    if (typeof value === "string")
      process.env[prefix + key] = value;

    else if (useJson)
      process.env[prefix + key] = JSON.stringify(value);

    else if (typeof value === "number")
      process.env[prefix + key] = value.toString();

    else if (value instanceof Date)
      process.env[prefix + key] = value.toJSON();

    else if (typeof value === "object")
      loadIntoEnv(value, useJson, `${prefix}${key}_`)
  }
}

export const load = function({
  encoding = 'utf8',
  intoEnv = true,
  path = '.env.toml',
  useJson = false
}: Options)
{
  try {
    const parsed = toml.parse(readFileSync(path, encoding));
    intoEnv !== false && loadIntoEnv(parsed, useJson)
    return {parsed}
  }

  catch (error) {
    return {error}
  }
}

export default load
