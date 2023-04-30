import { kanaToRoman } from "./function/kanaToRoman";

export class Word {
  private _kanji: string = "";
  private _kana: string = "";
  private _roman: string[][] = [[""]];
  private _pattern: number[] = [0];

  constructor(kanji: string, kana: string) {
    this._kanji = kanji;
    this._kana = kana;
    this._roman = kanaToRoman(kana);
    this._pattern = new Array(this._roman.length).fill(0);
  }

  get kanji() {
    return this._kanji;
  }

  get kana() {
    return this._kana;
  }

  get roman() {
    return {
      text: this._roman.map((rome, index) => rome[this._pattern[index]]).join(""),
      array: this._roman,
    };
  }
}


export function Hello() {
  return "Hello World!"
}