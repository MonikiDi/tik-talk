export function dateUtc(date: string) {
  const nowDateUtcParse = Date.parse(date);
  const iso = new Date().getTimezoneOffset()
  return  new Date(nowDateUtcParse + (-iso * 60 * 1000))
}
