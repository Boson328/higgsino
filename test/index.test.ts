import { Word } from "../src/index"

test("log test", () => {
    let word = new Word("型関係", "ゔらめ")
    console.log(word.roman.array.all)
})