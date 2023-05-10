<p align="center"><img src="https://user-images.githubusercontent.com/121548464/237051613-2c859c35-3695-4666-97b2-22acc667472f.svg" /></p>

<a href="https://higgsino.boson.jp">
<h1 align="center" >
HIGGSINO.JS
</h1>
</a>

<h3 align="center" >
タイピングソフト制作を簡単に
</h3>

<br /><br /><br />

[README in English](https://github.com/Boson328/higgsino/blob/main/README-us.md)

## 概要

このライブラリはタイピングソフト（特にローマ字タイピングソフト）の開発を補助するために作られました。

導入することで以下のようなことが簡単に行えるようになります。

- ひらがなからローマ字への変換
- タイピング動作を再現
- すべての打ち方対応 ( 例: ゆっくりじっきょう → yuxtsucurijikkilyou )

## 導入

Node.jsの場合

```
npm i --save higgsino
```

または

```
yarn add --save higgsino
```

## 使い方


Wordコンストラクタからインスタンスを作成して使います。

第一引数は例文（漢字使用可）、第二引数は読み仮名（ひらがなのみ）を入れてください。

また、ローマ字はひらがなによって決まるため、例文と対応した読み方にしてください。


```javascript
import { Word } from "higgsino";

let word = new Word("漢字", "ひらがな");
```

ローマ字や例文、読み仮名を取得する際は以下のようにして取得できます


```javascript
// Example
console.log("例文を取得", word.example);

// Kana
console.log("よみがなの全てを取得", word.kana.all);
console.log("よみがなの打った部分を取得", word.kana.typed);
console.log("よみがなの打ってない部分を取得", word.kana.untyped);

// Roman
console.log("ローマ字の全文字", word.roman.all);
console.log("ローマ字の打った文字", word.roman.typed);
console.log("ローマ字の打ってない文字", word.roman.untyped);

console.log("ローマ字の全配列", word.roman.array.all);
console.log("ローマ字の打った配列", word.roman.array.typed);
console.log("ローマ字の打ってない配列", word.roman.array.typed);
```

タイピングしたらtyped関数を使えば、ミスしたかどうか確かめ、合っている場合は次の文字にすることができます。

引数にKeyboardEventのkeyを渡して、必要であればeventにpreventDefaultをしておいてください。

```javascript
window.addEventListener("keydown", (event) => {
  event.preventDefault();
  // ミスしたらisMissがtrue、全て打ち終わったらisFinishがtrueになる。
  const { isMiss, isFinish } = word.typed(event.key); 
})
```

## 
