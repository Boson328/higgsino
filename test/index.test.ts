import { Word } from "../src";
import { kanaToRoman } from "../src/function/kanaToRoman";

test("should first", () => {
  const word = new Word("漢字", "かんな");
  console.log(
    word.typed("c"),
    word.typed("a"),
    word.typed("n"),
    word.typed("n"),
    word.typed("n"),
    word.typed("a"),
    word.roman
  );
});
