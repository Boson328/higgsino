import { kanaToRoman } from "./function/kanaToRoman";

type result = {
  isMiss: boolean;
  isFinish: boolean;
};

type text = {
  all: string;
  typed: string;
  untyped: string;
};


class Word {
  private _example: string = "";
  private _kana: string = "";
  private _roman: string[][] = [[""]];
  private _pattern: number[] = [0];
  private _charIndex: number = 0;
  private _charIndex2: number = 0;
  private _charTyped: string = "";
  private _isFinish: boolean = false;

  constructor(example: string, kana: string, roman?: string[][]) {
    this._example = example;
    this._kana = kana;
    this._roman = roman ? roman : kanaToRoman(kana);
    this._pattern = new Array(this._roman.length).fill(0);
  }

  get example() {
    return this._example;
  }

  get kana(): text {
    return {
      all: this._kana,
      typed: this._kana.slice(0, this._charIndex),
      untyped: this._kana.slice(this._charIndex),
    };
  }

  // 一番関連性の高いやつが配列の先頭に来る
  get next() {
    if (this._isFinish) return [""];
    else {
      const dup: string[] = [
        this._roman[this._charIndex][this._pattern[this._charIndex]][
          this._charIndex2
        ],

        ...this._roman[this._charIndex].flatMap((rome, index) => {
          if (rome.slice(0, this._charIndex2) == this._charTyped) {
            return rome[this._charIndex2];
          } else {
            return []; // flatMapで[]を返して消す
          }
        }),
      ];

      // Setで重複削除
      const undup: string[] = [...new Set(dup)];
      return undup;
    }
  }

  get roman(): text & {
    array: {
      all: string[][];
      typed: string[][];
      untyped: string[][];
    };
  } {
    return {
      all: this._roman
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
          } else {
            return [];
          }
        })
        .join(""),
      untyped: this._roman
        .flatMap((rome, index) => {
          if (index > this._charIndex) {
            return rome[this._pattern[index]];
          } else if (index == this._charIndex) {
            return rome[this._pattern[index]].slice(this._charIndex2);
          } else {
            return [];
          }
        })
        .join(""),
      array: {
        all: this._roman,
        typed: this._roman.slice(0, this._charIndex),
        untyped: this._roman.slice(this._charIndex),
      },
    };
  }

  typed(key: string): result {
    if (!this._isFinish && this._roman[this._charIndex]) {
      // nが一つでも打てる場合
      if (this._roman[this._charIndex].includes("n")) {
        for (let j = 0; j < this._roman[this._charIndex + 1].length; j++) {
          if (this._roman[this._charIndex + 1][j][0] == key) {
            // 例：nsaのような場合でnだけ打っていて、今回sを打った場合

            this._pattern[this._charIndex] = 2; // nは必ず3個目の文字だからpatternは2になる。
            this._pattern[this._charIndex + 1] = j;
            this._charIndex++; // nは打ち終わったことになるから
            this._charIndex2 = 1; // この時点でsは打ち終わっているので、charIndex2を1にする。
            this._charTyped = key; // 本来はいったんcharTypedを空にするが、省略しても問題ない。

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

export { kanaToRoman, Word };