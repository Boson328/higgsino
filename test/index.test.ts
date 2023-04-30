import { Hello, Word } from "../src";
import { kanaToRoman } from "../src/function/kanaToRoman";

test("should first", () => {
  expect(Hello()).toBe("Hello World!");
  expect(kanaToRoman("ふぁっんあっ。")).toEqual([
    ["fa", "hula", "huxa", "fula", "fuxa"],
    ["ltu", "xtu", "ltsu", "xtsu"],
    ["nn", "xn"],
    ["a"],
    ["ltu", "xtu", "ltsu", "xtsu"],
    ["."],
  ]);
  console.log(new Word("漢字", "What is this?"))
});
