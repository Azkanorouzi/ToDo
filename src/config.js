import { GET_TIME_TOMORROW } from './helpers'

// Task ID configs
const ID_LETTERS_LENGTH = '2'
const ID_NUMBERS_LENGTH = '10'
// Default data
const DEFAULT_TASK_NAME = 'Untitled'
const DEFAULT_TASK_DETAILS = 'No details'
const DEFAULT_TASK_DUE = GET_TIME_TOMORROW()
const DEFAULT_PROJECT_DUE = 'Without time limit!'
// Details for default projects
const INBOX_DETAILS =
  'Inbox is a nice home for random todos, here you can brain storm and put todos that you might want to change their details later :)'
const TODAY_DETAILS = 'Keep track of your daily tasks :)'
const UPCOMING_DETAILS = 'plan out your future tasks with upcoming :)'
const ANYTIME_DETAILS =
  'Sometimes you have tasks that you`re not sure as to when you want them to be done, so why not do them at anytime? :)'
const SOMEDAY_DETAILS =
  'This is where you want to put things that you want to do in future, it can be things that are totally random and imaginative like building your dream house :)'
// Initial tab
const INITIAL_PAGE_NAME = 'Inbox'
const INITIAL_PAGE_ID = 'AA1111111111'
const INITIAL_PAGE_THEME = '1'
const INITIAL_PROJECTS_ID = [
  'AA1111111111',
  'BB2222222222',
  'CC3333333333',
  'DD4444444444',
  'EE5555555555',
]
// 0 (Might), 1 (Should), 2 (Must!)
const DEFAULT_IMPORTANCE = '2'
// API_settings
const API_SETTINGS = {
  URL: '',
  TIMEOUT_SEC: 10,
  KEY: '<KEY>',
}
// Additional theme defaults (more settings can be found in tailwind config file)
const SAFE_COLOR = 'text-green-300'
const WARNING_COLOR = 'text-yellow-300'
const DANGER_COLOR = 'text-red-300'

export {
  ID_NUMBERS_LENGTH,
  ID_LETTERS_LENGTH,
  API_SETTINGS,
  DEFAULT_TASK_NAME,
  DEFAULT_TASK_DETAILS,
  DEFAULT_TASK_DUE,
  DEFAULT_IMPORTANCE,
  DEFAULT_PROJECT_DUE,
  SAFE_COLOR,
  DANGER_COLOR,
  WARNING_COLOR,
  INITIAL_PAGE_NAME,
  INITIAL_PROJECTS_ID,
  INITIAL_PAGE_ID,
  INITIAL_PAGE_THEME,
  INBOX_DETAILS,
  TODAY_DETAILS,
  UPCOMING_DETAILS,
  ANYTIME_DETAILS,
  SOMEDAY_DETAILS,
}
