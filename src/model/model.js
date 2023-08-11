// State, Http library, Business logic: state is the data that needs to be stored in the front end it's for example the current page user is visiting in the case of todo list the todos that user creates before saving in backend or local storage it should be here in state and then when user gets back we should grab that data and put it back to state give it to controller so that then controller can order view to display those data, http library is fetch requests and interactons we have with the web if we're using an online api for example, business logic is the logic related to the core functionality fo our program in the case of todo list the objects and how they're implemented the todos functionalities and so on ...
import * as CONFIG from '../config'
import * as HELPERS from '../helpers'
state = {
  usedIds: [],
  envs: [],
  projects: [],
  currentTheme: CONFIG.INITIAL_THEME,
  currentTab: CONFIG.INITIAL_PAGE,
}
// Task is class parent for both project, environment and todo
class Task {
  // Todo
  delete(id) {
    const taskIndex = HELPERS.FIND_EL_INDEX_WITH_ID()
    HELPERS.DELETE_EL_WITH_INDEX(taskIndex)
  }
  constructor(name, data) {
    // Input data
    this.#data = data
    // TODO
    // Early return in case task is provided with valid info
    if (!this.#isValid()) return
    this.name = name
    this.id = this.#generateUniqueId()
    this.taskType =
      HELPERS.GET_CONSTRUCTOR_NAME() === 'Function'
        ? 'Task'
        : HELPERS.GET_CONSTRUCTOR_NAME()
  }
  // This function will generate a random unique id
  #generateUniqueId() {
    // Random letter
    const randomLetters = HELPERS.GENERATE_RANDOM_ALPHABET(
      CONFIG.ID_LETTERS_LENGTH
    )
    // Random digits
    const randomDigits = HELPERS.GENERATE_RANDOM_NUMBER(
      CONFIG.ID_NUMBERS_LENGTH
    )
    // Id
    const id = randomLetters + randomDigits
    // Checking if new id is unique (it should be)
    if (HELPERS.IS_UNIQ(id, [...state.usedIds])) {
      state.usedIds.push(id)
      return id
    }
    // Calls itself if the id is already given to a task so it generates a new id
    return this.#generateUniqueId()
  }
  // Checking the task validity
  #isValid(data) {
    return data.title && data.details && data.date
  }
}
class Environment extends Task {
  projects = []
  constructor(name, data) {
    super(name, data)
  }
  #isValid(data) {
    return data.title && data.details
  }
}
class LimitedTimeTask extends Task {
  parent = null // project or environment
  constructor(
    name,
    data,
    // TODO
    creationDate = HELPERS.GET_TIME_TODAY(),
    // TODO
    due = HELPERS.GET_TIME_TOMORROW()
  ) {
    super(name, data)
    this.creationDate = creationDate
    this.due = due
  }
  getDaysLeft() {
    return (
      // TODO
      HELPERS.CONVERT_DATE_TO_DAYS(this.date) -
      HELPERS.CONVERT_DATE_TO_DAYS(this.due)
    )
  }
}
class Project extends LimitedTimeTask {
  #done = false
  #childToDos = []
  #progress = this.#getProjectProgress()
  // Returns a how much of the project is done
  #getProjectProgress() {
    return `${
      (100 / this.#childToDos.length) *
        HELPERS.COUNT_DONE_TODOS(this.#childToDos) || 100
    }%`
  }
  updateProjectProgress() {
    this.#progress = this.#getProjectProgress()
    if (this.#progress === '100%') this.#done = true
  }
}
class ToDo extends LimitedTimeTask {
  #done = false
  trigger() {
    this.#done = this.#done ? false : true
  }
  static findToDo(todo, id) {
    todo.parent.#childToDos.find((childTodo) => childTodo.id === id) || false
  }
}
