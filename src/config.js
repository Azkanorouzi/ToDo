import { GET_TIME_TOMORROW } from './helpers'

// Task ID configs
const ID_LETTERS_LENGTH = '2'
const ID_NUMBERS_LENGTH = '10'
// Default data
const DEFAULT_TASK_NAME = 'Untitled'
const DEFAULT_TASK_DETAILS = 'No details'
const DEFAULT_TASK_DUE = GET_TIME_TOMORROW()
const DEFAULT_PROJECT_DUE = 'Without time limit!'
// Default envs
const DEFAULT_ENV_NAME = 'Environment'
const DEFAULT_ENV_DETAILS =
  'Environments are used to organize your projects and tasks into more manageable categories. :)'
const DEFAULT_ENV_ID = 'GG7777777777'
// Details for default projects
const INBOX_DETAILS =
  'Inbox is a nice home for random todos, here you can brain storm and put todos that you might want to change their details later :)'
const TODAY_DETAILS = 'Keep track of your daily tasks :)'
const UPCOMING_DETAILS = 'plan out your future tasks with upcoming :)'
const ANYTIME_DETAILS =
  'Sometimes you have tasks that you`re not sure as to when you want them to be done, so why not do them at anytime? :)'
const SOMEDAY_DETAILS =
  'This is where you want to put things that you want to do in future, it can be things that are totally random and imaginative like building your dream house :)'
const INITIAL_PROJECT_DETAILS =
  'Projects are used to organize your tasks in a more structured manner, say you have to do your homework, you can create a project named homework that contains minor tasks that must be done for you in order to finish your homework, also note that a project can only contain todos you can not nest projects into another :)'

const INITIAL_PROJECT_NAME = 'Get familiar'

const DEFAULT_GET_FAMILIAR_TODOS = {
  'Open doIt': 'welcome :)',
  'Get familiar with containers':
    'You can use container to keep your todos organized for more info you can click on "?" any container go ahead and take a look at "?" on any container in the left hand side:) ',
  'Create a todo':
    'click on the plus button, fill out the info and add a new todo :)',
  'Create a project':
    'Go ahead create a project by clicking on the navbar plus button :)',
  'Create a environment':
    'Go ahead create an environment by clicking on the navbar plus button :)',
  'Add a new project to your environment':
    'You can use environments to contain projects click on the right plus button to add a new project to your environment :)',
  'Delete, move, edit': 'You can delete move edit things anytime you want :)',
  'DOIT :)': 'Last but not least always remember (to) doit :)',
}
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
const DANGER_COLOR = 'text-red-600'
const SAFE_COLOR_BG = 'bg-green-300'
const WARNING_COLOR_BG = 'bg-yellow-300'
const DANGER_COLOR_BG = 'bg-red-600'
// Messages
const IMPORTANT_MESSAGE = 'Important!'
const SHOULD_MESSAGE = 'Relatively important'
const MIGHT_MESSAGE = 'optional'
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
  SAFE_COLOR_BG,
  WARNING_COLOR_BG,
  DANGER_COLOR_BG,
  INITIAL_PROJECT_DETAILS,
  INITIAL_PROJECT_NAME,
  DEFAULT_GET_FAMILIAR_TODOS,
  DEFAULT_ENV_NAME,
  DEFAULT_ENV_DETAILS,
  DEFAULT_ENV_ID,
  IMPORTANT_MESSAGE,
  SHOULD_MESSAGE,
  MIGHT_MESSAGE,
}
