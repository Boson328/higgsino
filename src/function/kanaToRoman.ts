import { romanMap } from "../data/romanMap";

export function kanaToRoman(kana: string) {
  let remStr: string = kana; // ひらがなのコピー
  let slStr: string; // ひらがな1文字
  let roman: string[]; // ローマ1字
  let next: string[]; // 次の文字のローマ1字
  let result = []; // returnする配列

  // 1文字切り取る
  function splice() {
    let oneChar = remStr.slice(0, 1);
    remStr = remStr.slice(1);
    return oneChar;
  }

  // 小文字が含まれているかどうか
  function isSmallChar() {
    return !!remStr.slice(0, 1).match(/^[ぁぃぅぇぉゃゅょ]$/);
  }
  

  // ひらがなのある限りループ
  while (remStr) {
    slStr = splice();
    next = romanMap[remStr.slice(0, 1)];

    // 「っ」だった時
    if (slStr == "っ") {
      if (
        !remStr || // ひらがながなくなった？
        !next || // 次の文字がひらがなではないか？
        next[0].match(/^[aeon,.]/) // aeon,.のどれか？(iuが含まれていないのはyiやwhuがあるため)
      ) {
        roman = [...romanMap[slStr]];
      } else {
        slStr = splice();
        if (isSmallChar()) slStr += splice(); // 小文字があるなら2文字切り取る(っち→っちゃ)

        // 「っ」の次の文字のローマ字を2回繰り返す
        roman = [
          ...romanMap[slStr]
            .filter((str) => !str.match(/^[iu]/)) // iuのものを除外
            .map((str: string) => str.slice(0, 1) + str), // 1文字目を2回(って→tte)
          ...romanMap["っ"].flatMap((str: string) =>
            romanMap[slStr].flatMap((str3: string) => str + str3)
          ),
        ];
      }
      result.push(roman);
    } else {
      if (isSmallChar()) slStr += splice();
      if (slStr == "&") {
        slStr += remStr.slice(0, 7);
        remStr = remStr.slice(7);
      }
      roman = romanMap[slStr] ? [...romanMap[slStr]] : [slStr];
      if (slStr == "ん") {
        if (!remStr) {
          roman.pop();
        } else {
          if (next[0].match(/^[aiueony]/)) roman.pop();
        }
      }
      result.push(roman);
    }
  }

  return result;
}
