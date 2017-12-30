import { readFileSync } from "fs"
import { resolve } from "path"
import * as toml from "toml-j0.4"

export interface Options {
  path?: string
  intoEnv?: boolean
  throwErr?: boolean
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

export const load = ({ path = ".env.toml", intoEnv = true, throwErr = false }: Options) => {

  try {
    const env = toml.parse(readFileSync(resolve(process.cwd(), path)).toString());
    intoEnv !== false && loadIntoEnv(env)
    return env
  }

  catch (e) {
    if (throwErr)
     throw new Error(e);
    return {}
  }
}

export default load
