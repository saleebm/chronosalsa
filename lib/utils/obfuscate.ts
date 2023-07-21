export function obfuscateYear(year: string) {
  let obfuscatedYear = ""
  for (let i = 0; i < year.length; i++) {
    const digit = parseInt(year[i])
    // well if you're willing to go through the trouble of deobfuscating this
    // you deserve to know the year
    const obfuscatedDigit = ((digit + 7) % 10).toString()
    obfuscatedYear += obfuscatedDigit
  }
  return obfuscatedYear
}
