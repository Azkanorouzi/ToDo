/**
 * Generates a random number
 * @param {string} length
 * @returns {string} a random number with a certain length
 */
// Date fns
import { format, addDays } from 'date-fns'
import * as CONFIG from './config'

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
  return format(new Date(), 'MM/dd/yyyy', 'en')
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
  const start = addDays(new Date(), 0)
  const end = addDays(new Date(), 0)
  return String(end - start)
}
/**
 * this function will simply return all the elements that contain data-theme=true attribute which is an indication of them being themable
 * @returns {NodeList} returns a Node list consisting of all the themable elements
 */
const GET_ALL_THEME_EL = () => {
  return document.querySelectorAll('*[data-theme="true"]')
}
/**
 * This function will generate task calling a task constructor
 * @param {obj} constructor constructor that we want to use to create the task
 * @param {obj} data Object containing the data needed to create a task
 * @param {string} id the id of a certain task
 * @returns newly created task
 */
const GENERATE_TASK = (constructor, data, id) => {
  return new constructor(
    {
      importance: data.importance,
      due: data.due,
      details: data.details,
      name: data.name,
      standAlone: data.standAlone,
      id,
    },
    id
  )
}
/**
 * this function is responsible for creating default projects
 * @param {obj} con constructor we want to call
 * @returns an array of default projects
 */
const GENERATE_DEFAULT_PROJECTS = (con) => {
  const defaultProjects = [
    'Inbox',
    'Today',
    'Upcoming',
    'AnyTime',
    'Someday',
  ].map((defProjectName, i) =>
    GENERATE_TASK(
      con,
      {
        name: defProjectName,
        details: CONFIG[`${defProjectName.toUpperCase()}_DETAILS`],
        importance: CONFIG.DEFAULT_IMPORTANCE,
        due: CONFIG.DEFAULT_PROJECT_DUE,
        standAlone: true,
      },
      CONFIG.INITIAL_PROJECTS_ID[i]
    )
  )
  return defaultProjects
}
/**
 * creates project view
 * @param {obj} con the project view constructor
 * @param {obj} data project task data
 * @param {string} curTheme current theme
 * @param {string} icon the font awesome icon for the project (if not given the default icon will be applied) for example fa-circle
 * @param {string} taskType the task
 * @returns project view
 */
const GENERATE_PROJECT_VIEW = (
  con,
  data,
  curTheme,
  icon,
  taskType,
  standAlone = false,
  id,
  daysLeft,
  done,
  progress
) => {
  return new con(
    {
      ...data,
      curTheme,
      icon,
      taskType,
      id,
      daysLeft,
      done,
      progress,
    },
    standAlone
  )
}

/**
 * creates default projects view by calling the GENERATE_VIEW function
 * @param {array} defProjects an array of default projects
 * @param {string} curTheme the current theme number
 * @param {string} icons icons of our projects
 * @param {obj} PView project view constructor function
 * @returns an array of default project views
 */
const GENERATE_DEFAULT_PROJECTS_VIEW = (
  defProjects,
  curTheme,
  icons,
  PView,
  name
) => {
  const DEFAULT_PROJECT_VIEWS = defProjects.map((project, i) => {
    const projectView = new PView({
      ...project.data,
      curTheme,
      icon: icons[i],
      taskType: 'project',
    })
    if (name) projectView.name = typeof name === 'string' ? name : name[i]
    return projectView
  })
  return DEFAULT_PROJECT_VIEWS
}
const GENERATE_PROJECT_CONTAINER_VIEW = (
  project,
  curTheme,
  PView,
  name,
  id
) => {
  const projectContainerView = new PView({
    ...project.data,
    curTheme,
    icon: 'fa-code',
    name,
    id,
  })
  return projectContainerView
}
/**
 * given the consturctor of todos will generate default todos
 * @param {object} con todo constructor
 * @returns an array of default todos
 */
const GENERATE_DEFAULT_TODOS = (con) => {
  const defaultTodos = CONFIG.DEFAULT_GET_FAMILIAR_TODOS
  const res = Object.keys(defaultTodos).map((defTodoTitle, i) => {
    return GENERATE_TASK(con, {
      name: defTodoTitle,
      details: defaultTodos[defTodoTitle],
      importance: CONFIG.DEFAULT_IMPORTANCE,
      due: CONFIG.DEFAULT_PROJECT_DUE,
    })
  })
  return res
}
const GENERATE_DEFAULT_TODOS_VIEW = (defTodo, curTheme, PView, name) => {
  const DEFAULT_TODO_VIEWS = defTodo.map((todo, i) => {
    const projectView = new PView({
      ...todo.data,
      curTheme,
      taskType: 'todo',
      name: todo,
      id: todo.id,
    })
    return projectView
  })
  return DEFAULT_TODO_VIEWS
}
/**
 * Given an array of tasks returns an array containing their id
 * @param {array} tasks an array of tasks
 * @returns an array of tasks id
 */
const GET_TASKS_ID_ARRAY = (tasks) => {
  return tasks.map((task) => task.id)
}
/**
 * promisified event listener
 * @param {*} element dom element
 * @param {string} eventName event we want to listen top:
 * @returns {Promise} a promise representing the event
 */
const LISTEN_TO = (element, eventName, handler) => {
  return new Promise((resolve, reject) => {
    element.addEventListener(eventName, (event) => {
      // Resolve the Promise with the event object
      handler(event)
      resolve()
    })
  })
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
  GET_ALL_THEME_EL,
  GENERATE_TASK,
  GENERATE_PROJECT_VIEW,
  GENERATE_DEFAULT_PROJECTS,
  GENERATE_DEFAULT_PROJECTS_VIEW,
  GENERATE_DEFAULT_TODOS,
  GENERATE_DEFAULT_TODOS_VIEW,
  GENERATE_PROJECT_CONTAINER_VIEW,
  GET_TASKS_ID_ARRAY,
  LISTEN_TO,
}
