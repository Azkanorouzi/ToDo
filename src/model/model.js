// State, Http library, Business logic: state is the data that needs to be stored in the front end it's for example the current page user is visiting in the case of todo list the todos that user creates before saving in backend or local storage it should be here in state and then when user gets back we should grab that data and put it back to state give it to controller so that then controller can order view to display those data, http library is fetch requests and interactons we have with the web if we're using an online api for example, business logic is the logic related to the core functionality fo our program in the case of todo list the objects and how they're implemented the todos functionalities and so on ...
import * as CONFIG from '../config'
import * as HELPERS from '../helpers'
state = {
  usedIds: [],
  envs: [],
  standAloneProjects: [],
  currentTheme: CONFIG.INITIAL_THEME,
  currentTab: CONFIG.INITIAL_PAGE,
}
// Task is class parent for both project, environment and todo
class Task {
  constructor(name) {
    this.name = name
    this.id = this.#generateUniqueId()
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
    // Calls itself if the id is already given to a task
    return this.#generateUniqueId()
  }
}
class Environment extends Task {
  projects = []
  checkDone() {
    isAllDone(this.projects)
  }
}

class Project extends Task {
  #done = true
  ToDos = []
  getPercentTaskDone() {
    isAllDone(this.ToDos)
  }
}
class ToDo extends Task {
  #done = false
  checkDone() {
    isAllDone(this.projects)
  }
}
