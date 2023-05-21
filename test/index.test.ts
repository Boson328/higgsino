import { Word } from "../src/index"

test("log test", () => {
    let word = new Word("感じ", "っうぇ")
    console.log(word.next);
    word.typed("w");
    console.log(word.next);
    word.typed("w");
    console.log(word.next);
})