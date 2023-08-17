import { GET_TIME_TOMORROW } from './helpers'
// Page configs
const INITIAL_PAGE = 'inbox'
const INITIAL_THEME = '1'
// Task ID configs
const ID_LETTERS_LENGTH = '2'
const ID_NUMBERS_LENGTH = '10'

// Default data
const DEFAULT_TASK_NAME = 'Untitled'
const DEFAULT_TASK_DETAILS = 'No details'
const DEFAULT_TASK_DUE = GET_TIME_TOMORROW()
// 0 (Might), 1 (Should), 2 (Must!)
const DEFAULT_IMPORTANCE = '2'
// API_settings
const API_SETTINGS = {
  URL: '',
  TIMEOUT_SEC: 10,
  KEY: '<KEY>',
}

export {
  INITIAL_PAGE,
  INITIAL_THEME,
  ID_NUMBERS_LENGTH,
  ID_LETTERS_LENGTH,
  API_SETTINGS,
  DEFAULT_TASK_NAME,
  DEFAULT_TASK_DETAILS,
  DEFAULT_TASK_DUE,
  DEFAULT_IMPORTANCE,
}
