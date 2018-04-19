import { load } from "../src"

describe("Load .env", () => {
  it("Properly loads toml file into env", () => {
    load({ path: "./test/.env.toml", intoEnv: true });
    expect(process.env.topKey).toEqual("topValue")
    expect(process.env.SECTION1_KEY).toEqual("value")
    expect(process.env.SECTION2_KEY).toEqual("123")
  })

  it("Parses and returns toml without env", () => {
    const {parsed: env} = load({ path: "./test/.env.toml", intoEnv: false });
    expect(env.topKey).toEqual("topValue")
    expect(env.SECTION3.date).toBeDefined()
    expect(Array.isArray(env.SECTION4.arr)).toBeTruthy()
  })
})
