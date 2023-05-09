import { romanMap } from "../data/romanMap";

export function kanaToRoman(kana: string) {
  let copiedKana: string = kana;
  let currentKana: string;
  let currentRoman: string[];
  let nextRoman: string[];
  let retRoman = [];

  function splice() {
    let oneChar = copiedKana.slice(0, 1);
    copiedKana = copiedKana.slice(1);
    return oneChar;
  }

  // 小文字が含まれているかどうか
  function isSmallChar() {
    return !!copiedKana.slice(0, 1).match(/^[ぁぃぅぇぉゃゅょ]$/);
  }
  

  // ひらがなをすべて処理する
  while (copiedKana) {
    currentKana = splice();
    nextRoman = romanMap[copiedKana.slice(0, 1)];

    if (currentKana == "っ") {
      if (
        !copiedKana || // ひらがながなくなった？
        !nextRoman || // 次の文字がひらがなではないか？
        nextRoman[0].match(/^[aeon,.]/) // aeon,.のどれか？(iuが含まれていないのはyiやwhuがあるため)
      ) {
        currentRoman = [...romanMap[currentKana]];
      } else {
        currentKana = splice();
        if (isSmallChar()) currentKana += splice(); // 小文字があるなら2文字切り取る(っち→っちゃ)

        // 「っ」の次の文字のローマ字を2回繰り返す
        currentRoman = [
          ...romanMap[currentKana]
            .filter((str) => !str.match(/^[iu]/)) // iuのものを除外
            .map((str: string) => str.slice(0, 1) + str), // 1文字目を2回(って→tte)
          ...romanMap["っ"].flatMap((str: string) =>
            romanMap[currentKana].flatMap((str3: string) => str + str3)
          ),
        ];
      }
      retRoman.push(currentRoman);
    } else {
      if (isSmallChar()) currentKana += splice();
      if (currentKana == "&") {
        currentKana += copiedKana.slice(0, 7);
        copiedKana = copiedKana.slice(7);
      }
      currentRoman = romanMap[currentKana] ? [...romanMap[currentKana]] : [currentKana];
      if (currentKana == "ん") {
        if (!copiedKana) {
          currentRoman.pop();
        } else {
          if (nextRoman[0].match(/^[aiueony]/)) currentRoman.pop();
        }
      }
      retRoman.push(currentRoman);
    }
  }

  return retRoman;
}
