// State, Http library, Business logic: state is the data that needs to be stored in the front end it's for example the current page user is visiting in the case of todo list the todos that user creates before saving in backend or local storage it should be here in state and then when user gets back we should grab that data and put it back to state give it to controller so that then controller can order view to display those data, http library is fetch requests and interactons we have with the web if we're using an online api for example, business logic is the logic related to the core functionality fo our program in the case of todo list the objects and how they're implemented the todos functionalities and so on ...

import { parseISOWithOptions } from 'date-fns/fp'
import * as CONFIG from '../config'
import * as HELPERS from '../helpers'
const state = {
  star: false,
  isDefaultsInitialized: false,
  usedIds: [],
  containerviews: [],
  views: [],
  todos: [],
  envs: [],
  projects: [],
  currentTheme: CONFIG.INITIAL_PAGE_THEME,
  currentPageId: CONFIG.INITIAL_PAGE_ID,
  prePageId: CONFIG.INITIAL_PAGE_ID,
}
// We have seven default env inbox today upcoming anytime someday we must create six default ids
// Task is class parent for both project, environment and todo
class Task {
  constructor(data = {}, id) {
    // Input data
    this.data = data
    this._getData()
    // Allowing user to manually add id
    this.id = id ?? this._generateUniqueId()
    this.taskType =
      HELPERS.GET_CONSTRUCTOR_NAME(this) === 'Function'
        ? 'Task'
        : HELPERS.GET_CONSTRUCTOR_NAME(this)
  }
  updateTask() {
    this._getData()
  }
  /**
   *  this function will generate a unique id consisting of letters and numbers and calls itself if the generated id is already used
   * @returns {number} a unique id
   */
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
      return id
    }
    // Calls itself if the id is already given to a task so it generates a new id
    return this._generateUniqueId()
  }
}
class Environment extends Task {
  children = []
  _getData() {
    this.details = this.data.details || CONFIG.DEFAULT_TASK_DETAILS
    this.name = this.data?.name || CONFIG.DEFAULT_TASK_NAME
  }
}
class LimitedTimeTask extends Task {
  done = false

  constructor(data = {}, id) {
    super(data, id)
    // (0, low) (1, necessary) (2, high)
    this._creationDate = HELPERS.GET_TIME_TODAY()
  }
  _getData() {
    this.importance = this.data?.importance || CONFIG.DEFAULT_IMPORTANCE
    this.due = this.data?.due || HELPERS.GET_TIME_TOMORROW()
    this.details = this.data?.details || CONFIG.DEFAULT_TASK_DETAILS
    this.name = this.data?.name || CONFIG.DEFAULT_TASK_NAME
    this.daysLeft = this.getDaysLeft()
  }
  /**
   * this function returns how many days are left
   * @returns {number} days left from creation date and right now
   */
  getDaysLeft() {
    // Creation date is the starting point the ending point is due
    return HELPERS.GET_DATE_RANGE(this._creationDate, this.due)
  }
  /**
   * determines the task's parent wether it's a project or environment if it's a standalone project or an environment (which means it doesn't have any parent) returns null
   * @param {string} id id of the item we want to retrieve the parent
   * @param {array} envs an array consisting a list of all of our environments
   * @param {array} projects an array consisting a list of all projects in our application
   * @returns {null | obj} null if it doesn't have a parent a task obj if we were able to find the parent
   */
  // _getParent(id, envs, projects) {
  //   return (
  //     envs.find((env) =>
  //       env._childProjects.map((project) => project.id).includes(id)
  //     ) ||
  //     projects.find((project) =>
  //       project._childToDos.map((todo) => todo.id).includes(id)
  //     ) ||
  //     null
  //   )
  // }
}
class Project extends LimitedTimeTask {
  constructor(data = {}, id, standAlone = true) {
    super(data, id)
    this.standAlone = standAlone
    this.parentId = standAlone ? null : state.currentPageId
    this.progress = this._getProjectProgress()
  }
  children = []
  // Returns a how much of the project is done
  _getProjectProgress() {
    if (this.children.length === 0) {
      this.done = true
      return '0%'
    }
    const progress = `${
      (100 / this.children.length) * HELPERS.COUNT_DONE_TODOS(this.children) ||
      0
    }%`
    return progress
  }
  updateProjectProgress() {
    this.progress = this._getProjectProgress()
  }
}
class ToDo extends LimitedTimeTask {
  constructor(data = {}, id) {
    super(data, id)
    this.updateParentId()
    this.done = data.done
  }
  updateParentId() {
    this.parentId = state.currentPageId
  }
  trigger() {
    this.done = this.done ? false : true
  }
}

export { state, Task, Project, ToDo, Environment }
