export function obfuscateYear(year: string) {
  let obfuscatedYear = ""
  for (let i = 0; i < year.length; i++) {
    const digit = parseInt(year[i])
    const obfuscatedDigit = ((digit + 7) % 10).toString()
    obfuscatedYear += obfuscatedDigit
  }
  return obfuscatedYear
}
