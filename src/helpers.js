/**
 * Generates a random number
 * @param {string} length
 * @returns {string} a random number with a certain length
 */
const GENERATE_RANDOM_NUMBER = (length) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}
/**
 * Generates a random alphabet string
 * @param {string} length
 * @returns {string}  a random string of alphabets with a certain length
 */
const GENERATE_RANDOM_ALPHABET = (length) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  return Array.from(
    { length },
    () => alphabet[Math.floor(Math.random() * alphabet.length)]
  ).join('')
}
/**
 *  Checks if given item doesn't exist in array
 * @param {*} item
 * @param {array} array
 * @returns {boolean} true if item doesn't exist in array and therefore uniq
 */
const IS_UNIQ = (item, array) => {
  return !array.includes(item)
}
export { GENERATE_RANDOM_NUMBER, GENERATE_RANDOM_ALPHABET, IS_UNIQ }
