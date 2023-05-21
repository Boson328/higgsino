<p align="center"><img src="https://user-images.githubusercontent.com/121548464/237051613-2c859c35-3695-4666-97b2-22acc667472f.svg" /></p>

<h1 align="center">
HIGGSINO.JS
</h1>

<h3 align="center" >
Make typing software development easier
</h3>

<br /><br /><br />

[README日本語版](https://github.com/Boson328/higgsino)

## Overview

This library was created to assist in the development of typing software, especially for Roman alphabet typing.

By introducing this library, the following tasks become easier to accomplish:

- Conversion from Hiragana to Roman characters
- Reproduction of typing behavior
- Support for all typing methods (e.g. "yuxtsucurijikkilyou" for "ゆっくりじっきょう")

## Install

```
npm i --save higgsino
```

or

```
yarn add --save higgsino
```

## Usage

Create an instance from the Word constructor and use it.

The first argument should be an example sentence (kanji can be used), and the second argument should be a reading kana (hiragana only).

The romaji is determined by the hiragana, so the reading should correspond to the example sentences.


```javascript
import { Word } from "higgsino";

let word = new Word("漢字", "ひらがな");
```

You can retrieve romaji, example sentences, and reading kana as follows

```javascript
// Example
console.log("Get example", word.example);

// Kana
console.log("Get all of the kana", word.kana.all);
console.log("Get typed part of kana", word.kana.typed);
console.log("Get the part of the kana not typed", word.kana.untyped);

// Roman
console.log("Get all Roman characters", word.roman.all);
console.log("Get Roman typed characters", word.roman.typed);
console.log("Get characters not typed in roman", word.roman.untyped);

console.log("Get whole array of roman characters", word.roman.array.all);
console.log("Get typed array of Roman characters", word.roman.array.typed);
console.log("Get array without typed Roman characters", word.roman.array.typed);

```

After typing, you can use the typed function to see if you made a mistake and, if correct, the next character.

Pass the KeyboardEvent key as an argument, and if necessary, execute the preventDefault function.

```javascript
window.addEventListener("keydown", (event) => {
  event.preventDefault();
  // isMiss is true when a miss is made, isFinish is true when all typing is done.
  const { isMiss, isFinish } = word.typed(event.key); 
})
```

## Developer

[HomePage](https://boson.jp)　/　[GitHub](https://github.com/Boson328)

[Twitter](https://twitter.com/boson328)　/　[Zenn](https://zenn.dev/boson)

[YouTube](https://www.youtube.com/channel/UCXRxlOWvs6MHaFIXGtw2Y4A)　/　[Misskey](https://misskey.io/@boson)

## Developer Notes

### Testing

Test with jest
```
npm test
```

### Build

Use tsc and webpack.
```
npm run build
```
or
```
npx tsc && npx webpack
```

## License

Higgsino.js is protected by the [MIT License](https://github.com/Boson328/higgsino/blob/main/LICENSE).