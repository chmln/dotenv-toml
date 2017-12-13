import { readFileSync } from "fs"
import { resolve } from "path"
import * as toml from "toml-j0.4"

export interface Options {
  path: string
  intoEnv: boolean
}

const DEFAULTS: Options = { path: ".env.toml", intoEnv: true }

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

export const load = ({ path, intoEnv }: Options = DEFAULTS) => {
  const env = toml.parse(readFileSync(resolve(process.cwd(), path)).toString());
  intoEnv !== false && loadIntoEnv(env)
  return env
}

export default load
