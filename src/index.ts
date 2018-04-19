import { readFileSync } from "fs"

import * as toml from "toml-j0.4"

export interface Options {
  encoding?: string
  intoEnv?: boolean
  path?: string
}

const loadIntoEnv = (env: Record<string, any>, prefix = "") => {
  for (const key in env) {
    const value: any = env[key]

    if (typeof value === "string")
      process.env[prefix + key] = value;

    else if (typeof value === "number")
      process.env[prefix + key] = value.toString();

    else if (value instanceof Date)
      process.env[prefix + key] = value.toJSON();

    else if (typeof value === "object")
      loadIntoEnv(value, `${prefix}${key}_`)
  }
}

export const load = function({
  encoding = 'utf8',
  intoEnv = true,
  path = '.env.toml'
}: Options)
{
  try {
    const parsed = toml.parse(readFileSync(path, encoding));
    intoEnv !== false && loadIntoEnv(parsed)
    return {parsed}
  }

  catch (error) {
    return {error}
  }
}

export default load
