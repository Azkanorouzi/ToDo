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
  constructor(name, data, id = this._generateUniqueId()) {
    // Input data
    this._data = data
    this.name = name
    // Allowing user to manually add id
    this.id = id
    this.taskType =
      HELPERS.GET_CONSTRUCTOR_NAME() === 'Function'
        ? 'Task'
        : HELPERS.GET_CONSTRUCTOR_NAME()
  }
  // This function will generate a random unique id using recursion
  _generateUniqueId() {
    if (this.id) return false
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
    return this._generateUniqueId()
  }
}
class Environment extends Task {
  projects = []
}
class LimitedTimeTask extends Task {
  // (0, low) (1, medium) (2, high)
  _importance = '2'
  _done = false
  constructor(
    name,
    data,
    id = this._generateUniqueId(),
    creationDate = HELPERS.GET_TIME_TODAY()
  ) {
    super(name, data, id)
    this._creationDate = creationDate
    this._parent = this._getParent(this.id, state.envs, state.projects)
    this._due = this._data.due || HELPERS.GET_TIME_TOMORROW()
  }
  /**
   * determines the task's parent wether it's a project or environment if it's a standalone project (which means it doesn't have parent) it will return null
   * @param {string} id id of the item we want to retrieve the parent
   * @param {array} envs an array consisting a list of all  our environments
   * @param {array} projects an array consisting a list of all projects in our application
   * @returns {null | obj} null if it doesn't have a parent a task obj if we were able to find the parent
   */
  _getParent(id, envs, projects) {
    return (
      envs.find((env) => env.id === id) ||
      projects.find((project) => project.id === id) ||
      null
    )
  }
  getDaysLeft() {
    // Creation date is the starting point the ending point is due
    return HELPERS.GET_DATE_RANGE(this._creationDate, this._due)
  }
}
class Project extends LimitedTimeTask {
  _childToDos = []
  _progress = this._getProjectProgress()
  // Returns a how much of the project is done
  _getProjectProgress() {
    return `${
      (100 / this._childToDos.length) *
        HELPERS.COUNT_DONE_TODOS(this._childToDos) || 100
    }%`
  }
  updateProjectProgress() {
    this._progress = this._getProjectProgress()
    if (this._progress === '100%') this._done = true
  }
}
class ToDo extends LimitedTimeTask {
  _done = false
  trigger() {
    this._done = this._done ? false : true
  }
  _findToDoIndex(id) {
    return this.parent._childToDos.findIndex((childTodo) => childTodo.id === id)
  }
  /**
   * Deletes a certain todo
   * @param {*} todo todo we want to be deleted
   */
  static deleteToDo(todo) {
    todo.parent._childToDos.splice(this._findToDoIndex(todo.id), 1)
  }
}
