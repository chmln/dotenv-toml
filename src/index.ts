import { readFileSync } from "fs"
import * as toml from "toml"

export interface Options {
  path: string
}

export const load = ({ path }: Options = { path: ".env" }) => {
  const env = toml.parse(readFileSync(path).toString());
  for (const key in env) {
    process.env[key] = env[key]
  }
}

export default load
