// State, Http library, Business logic: state is the data that needs to be stored in the front end it's for example the current page user is visiting in the case of todo list the todos that user creates before saving in backend or local storage it should be here in state and then when user gets back we should grab that data and put it back to state give it to controller so that then controller can order view to display those data, http library is fetch requests and interactons we have with the web if we're using an online api for example, business logic is the logic related to the core functionality fo our program in the case of todo list the objects and how they're implemented the todos functionalities and so on ...

import * as CONFIG from '../config'
import * as HELPERS from '../helpers'
const state = {
  usedIds: [],
  envs: [],
  projects: [],
  currentTheme: CONFIG.INITIAL_PAGE_THEME,
  currentPageId: CONFIG.INITIAL_PAGE_ID,
}
// We have seven default env inbox today upcoming anytime someday we must create six default ids
// Task is class parent for both project, environment and todo
class Task {
  constructor(data = {}, id = this._generateUniqueId()) {
    // Input data
    this.data = data
    this._getData()
    // Allowing user to manually add id
    this.id = id
    this.taskType =
      HELPERS.GET_CONSTRUCTOR_NAME(this) === 'Function'
        ? 'Task'
        : HELPERS.GET_CONSTRUCTOR_NAME(this)
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
      state.usedIds.push(id)
      return id
    }
    // Calls itself if the id is already given to a task so it generates a new id
    return this._generateUniqueId()
  }
  /**
   * this function quite simply returns the property name that consists of children of a certain task wether it's an Project or environment since project and environment have different names for this property
   * @param {obj} task task we want to
   * @returns {string} property name if that task
   */
  _getChildren(task = this) {
    return task.taskType === 'Project' ? '_childProjects' : '_childToDos'
  }
  /**
   * this function returns the index of a task inside the parent children array (the env or project that task take place)
   * @param {string} id the id of the target task
   * @returns {number} index of given target task in parent children array
   */
  _findTaskIndex(id = this.id) {
    return this.parent._childToDos.findIndex((childTodo) => childTodo.id === id)
  }
  /**
   * this function will delete a given task (todos or non-standalone projects)
   * @param {obj} task it must be a todo or non-standalone project
   * @returns {task} returns the deleted task
   */
  static deleteTask(taskId) {
    const task = this._findTaskById(taskId)
    if (task.taskType === 'Environment' || !task.parent) return false
    const children = this._getChildren(task)
    task.parent[children].splice(task._findTaskIndex(task.id), 1)
    return task
  }
  /**
   * this function will delete a given task (either a standalone project or an environment)
   * @param {number} task the target task id
   * @param {arr} arr an array (usually from state)
   * @returns
   */
  static deleteAloneTask(taskId, arr) {
    const task = this._findTaskById(taskId)
    if (task.taskType === 'ToDo' || task.parent) return false
    const index = arr.findIndex((task) => task.id === id)
    arr.splice(index, 1)
    return arr
  }
  /**
   * Edits a certain id with new information
   * @param {number} taskId the id of a given task
   * @param {*} newData edited data
   */
  static editTask(taskId, newData) {
    const task = this._findTaskById(taskId)
    task.data = newData
  }
  /**
   * finds a task by id by first creating an allTasks that contains all the tasks available on that parent
   * @param {number} id the id of the target task
   * @returns {obj} target task
   */
  static _findTaskById(id) {
    const allTasks = [...state.envs, ...state.projects]
    allTasks.forEach((task) => allTasks.push(task[_getChildren()]))
    return allTasks.flat(1000000000000000).find((task) => task.id === id)
  }
}
class Environment extends Task {
  _childProjects = []
  _getData() {
    this.details = this.data.details || CONFIG.DEFAULT_TASK_DETAILS
    this.name = this.data.name || CONFIG.DEFAULT_TASK_NAME
  }
}
class LimitedTimeTask extends Task {
  _done = false

  constructor(data, id) {
    super(data, id)
    // (0, low) (1, necessary) (2, high)
    this._creationDate = HELPERS.GET_TIME_TODAY()
    this._parent = this._getParent(this.id, state.envs, state.projects)
  }
  _getData() {
    this.importance = this.data?.importance || CONFIG.DEFAULT_IMPORTANCE
    this.due = this.data?.due || HELPERS.GET_TIME_TOMORROW()
    this.details = this.data?.details || CONFIG.DEFAULT_TASK_DETAILS
    this.name = this.data?.name || CONFIG.DEFAULT_TASK_NAME
  }
  /**
   * this function returns how many days are left
   * @returns {number} days left from creation date and right now
   */
  getDaysLeft() {
    // Creation date is the starting point the ending point is due
    return HELPERS.GET_DATE_RANGE(this._creationDate, this._due)
  }
  /**
   * determines the task's parent wether it's a project or environment if it's a standalone project or an environment (which means it doesn't have any parent) returns null
   * @param {string} id id of the item we want to retrieve the parent
   * @param {array} envs an array consisting a list of all of our environments
   * @param {array} projects an array consisting a list of all projects in our application
   * @returns {null | obj} null if it doesn't have a parent a task obj if we were able to find the parent
   */
  _getParent(id, envs, projects) {
    return (
      envs.find((env) =>
        env._childProjects.map((project) => project.id).includes(id)
      ) ||
      projects.find((project) =>
        project._childToDos.map((todo) => todo.id).includes(id)
      ) ||
      null
    )
  }
}
class Project extends LimitedTimeTask {
  _childToDos = []
  progress = this._getProjectProgress()
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
}

export { state, Task, Project, ToDo, Environment }

// 1. we must find that project or environment with the currentPageId

// 2. we must push the newly created todo or project to that environment or project's children array

// 3. If that page is a project we can't push a project into it in other words we must not allow adding a project into another project as this make no sense but i have to find out a functionality wether through application logic or user interface i think i can put a dataset into each button for add modules in projects and environment and attach a different call back for each of these button's click events and then only create a todo but or we can say if the currentPageId type is Project we won't allow todolist
