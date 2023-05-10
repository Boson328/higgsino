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

タイピングしたらtyped関数を使えば、ミスしたかどうか確かめ、合っている場合は次の文字にすることができます。

引数にKeyboardEventのkeyを渡して、必要であればeventにpreventDefaultをしておいてください。

```javascript
window.addEventListener("keydown", (event) => {
  event.preventDefault();
  // ミスしたかどうかと、打ち終わったかどうかが返ってくる
  const { isMiss, isFinish } = word.typed(event.key); 
})
```

## 
