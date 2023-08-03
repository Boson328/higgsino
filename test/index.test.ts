import { Word, kanaToRoman } from "../src/index"

test("log test", () => {
    let word = new Word("型関係", "ゔらめ")
    word = new Word("型関係", "ゔらめ", [ [ 'vu' ], [ 'ra' ], [ 'me' ] ])
    word = new Word("", "")
    word.typed("a")
    console.log(word.roman, kanaToRoman("やりますねぇえええ"))
})