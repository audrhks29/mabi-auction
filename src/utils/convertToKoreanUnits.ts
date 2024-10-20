function convertToKoreanUnits(num: number) {
  const units = ["", "만", "억", "조", "경"];
  let result = "";
  let unitIndex = 0;

  while (num > 0) {
    const part = num % 10000;
    if (part > 0) {
      result = `${part.toLocaleString()}${units[unitIndex]} ` + result;
    }
    num = Math.floor(num / 10000);
    unitIndex++;
  }

  return result.trim();
}

export default convertToKoreanUnits;
