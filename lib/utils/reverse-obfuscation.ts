export function reverseObfuscation(obfuscatedYear: string) {
  let year = ""
  for (let i = 0; i < obfuscatedYear.length; i++) {
    const obfuscatedDigit = parseInt(obfuscatedYear[i])
    const originalDigit = ((obfuscatedDigit + 3) % 10).toString()
    year += originalDigit
  }
  return year
}
