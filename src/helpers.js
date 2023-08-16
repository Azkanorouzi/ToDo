/**
 * Generates a random number
 * @param {string} length
 * @returns {string} a random number with a certain length
 */
// Date fns
import { format, addDays, range } from 'date-fns'
// Example usage
const date = new Date()
const formattedDate = format(date, 'mm/dd/yyyy', 'en')

const GENERATE_RANDOM_NUMBER = (length = 1) => {
  return Array.from({ length }, () => Math.floor(Math.random() * 10)).join('')
}
/**
 * Generates a random alphabet string
 * @param {string} length
 * @returns {string}  a random string of alphabets with a certain length
 */
const GENERATE_RANDOM_ALPHABET = (length = 1) => {
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
const IS_UNIQ = (item = '', array = []) => !array.includes(item)
/**
 *  Checks if all Todos are done
 * @param {array} Todos
 * @returns {boolean} true if all todos are done
 */
const IS_ALL_DONE = (todos = []) => todos.every((todo) => todo.done)
/**
 *  Counts number of done todos
 * @param {array} Todos
 * @returns {number} number of todos
 */
const COUNT_DONE_TODOS = (ToDos = []) => {
  return +ToDos.filter((Todo) => Todo.done).length
}
/**
 *  Returns constructor name
 * @param {array} Todos
 * @returns {number} number of todos
 */
const GET_CONSTRUCTOR_NAME = (obj) => {
  return obj.constructor.name
}
/**
 *  Returns Today's date
 */
const GET_TIME_TODAY = () => {
  return format(new Date(), 'mm/dd/yyyy', 'en')
}
/**
 *  Returns Tomorrow's date
 */
const GET_TIME_TOMORROW = () => {
  return format(addDays(new Date(), 1), 'MM/dd/yyyy', 'en')
}
/**
 *  Returns range between two formatted ways
 * @param {string} startDate first date representing the starting time or creationDate for todos
 * @param {string} endDate second date representing the ending time or deadline for todos
 * @returns {string} returns a string representing days left until something
 */
const GET_DATE_RANGE = (startDate, endDate) => {
  const dateRange = range(startDate, endDate)
  const start = dateRange.start
  const end = dateRange.end
  return String(end - start)
}
export {
  GENERATE_RANDOM_NUMBER,
  GENERATE_RANDOM_ALPHABET,
  IS_UNIQ,
  IS_ALL_DONE,
  COUNT_DONE_TODOS,
  GET_CONSTRUCTOR_NAME,
  GET_TIME_TOMORROW,
  GET_TIME_TODAY,
  GET_DATE_RANGE,
}
