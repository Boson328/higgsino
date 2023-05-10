import { Word } from "../src/index"

test("log test", () => {
    let word = new Word("感じ", "っうぇ")
    console.log(word.next);
    word.typed("l");
    console.log(word.next);
    word.typed("t");
    console.log(word.next);
})