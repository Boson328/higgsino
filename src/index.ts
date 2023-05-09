import { kanaToRoman } from "./function/kanaToRoman";

type result = {
  isMiss: boolean;
  isFinish: boolean;
};

export class Word {
  private _kanji: string = "";
  private _kana: string = "";
  private _roman: string[][] = [[""]];
  private _pattern: number[] = [0];
  private _charIndex: number = 0;
  private _charIndex2: number = 0;
  private _charTyped: string = "";
  private _isFinish: boolean = false;

  constructor(kanji: string, kana: string) {
    this._kanji = kanji;
    this._kana = kana;
    this._roman = kanaToRoman(kana);
    this._pattern = new Array(this._roman.length).fill(0);
  }

  get kanji() {
    return this._kanji;
  }

  get kana(): {
    text: {
      normal: string;
      typed: string;
      untyped: string;
    };
  } {
    return {
      text: {
        normal: this._kana,
        typed: this._kana.slice(0, this._charIndex),
        untyped: this._kana.slice(this._charIndex),
      },
    };
  }

  get next() {
    return this._isFinish
      ? ""
      : this._roman[this._charIndex][this._pattern[this._charIndex]][
          this._charIndex2
        ];
  }

  get roman() {
    return {
      text: {
        normal: this._roman
          .map((rome, index) => rome[this._pattern[index]])
          .join(""),
        typed: this._roman
          .flatMap((rome, index) => {
            if (index < this._charIndex) {
              return rome[this._pattern[index]];
            } else if (
              index == this._charIndex &&
              rome[this._pattern[index]].length > this._charIndex2
            ) {
              return rome[this._pattern[index]].slice(0, this._charIndex2);
            } else return [];
          })
          .join(""),
        untyped: this._roman
          .flatMap((rome, index) => {
            if (index > this._charIndex) {
              return rome[this._pattern[index]];
            } else if (index == this._charIndex) {
              return rome[this._pattern[index]].slice(this._charIndex2);
            } else return [];
          })
          .join(""),
      },
      array: {
        normal: this._roman,
        typed: this._roman.slice(0, this._charIndex),
        untyped: this._roman.slice(this._charIndex),
      },
    };
  }

  typed(key: string): result {
    if (!this._isFinish) {
      // 文字を一つ一つ検査
      if (this._roman[this._charIndex].includes("n")) {
        for (let j = 0; j < this._roman[this._charIndex + 1].length; j++) {
          if (this._roman[this._charIndex + 1][j][0] == key) {
            this._pattern[this._charIndex] = 2;
            this._pattern[this._charIndex + 1] = j;
            this._charIndex++;
            this._charIndex2 = 1;
            this._charTyped = key;
            return { isMiss: false, isFinish: false };
          }
        }
      }
      for (let i = 0; i < this._roman[this._charIndex].length; i++) {
        const char = this._roman[this._charIndex][i].slice(
          0,
          this._charIndex2 + 1
        );
        if (char == this._charTyped + key) {
          this._pattern[this._charIndex] = i;
          this._charIndex2++;
          this._charTyped += key;
          if (this._charIndex2 >= this._roman[this._charIndex][i].length) {
            this._charIndex++;
            this._charIndex2 = 0;
            this._charTyped = "";
            if (this._roman.length <= this._charIndex) {
              this._isFinish = true;
              return { isMiss: false, isFinish: true };
            }
          }
          return { isMiss: false, isFinish: false };
        }
      }
      return { isMiss: true, isFinish: false };
    } else {
      return { isMiss: false, isFinish: true };
    }
  }
}
