import * as model from '../model/model'
import * as HELPERS from '../helpers'
import * as view from '../views/view'
// Task controller's an module that has functionalities for deleting tasks, editing them, and updating the state
/**
 * generates default projects alongside with their views and returns an the default projects and toggles the
 * @returns {obj} an object containing the defaultProjects and defaultProjectsView
 */
function generateDefaultProjects() {
  const defaultProjects = HELPERS.GENERATE_DEFAULT_PROJECTS(model.Project)
  const defaultProjectsView = HELPERS.GENERATE_DEFAULT_PROJECTS_VIEW(
    defaultProjects,
    model.state.currentTheme,
    ['fa-inbox', 'fa-star', 'fa-calendar-days', 'fa-layer-group', 'fa-clock'],
    view.ChildProjectView
  )
  return { defaultProjects, defaultProjectsView }
}
/**
 * This function's responsibility is to update a certain task it can also update the views
 * @param {obj} state the current state of our program
 * @param {string} taskType indicates the type of given task
 * @param  {...tasks} tasks new tasks we want to be added
 */
function updateTasksState(state, taskType, ...tasks) {
  state[`${taskType.toLowerCase()}s`].push(...tasks)
  // we don't need to add view ids to used ids because their counterpart task id is already in usedId array
  if (taskType === 'view') return
  state.usedIds.push(...HELPERS.GET_TASKS_ID_ARRAY(tasks))
}
/**
 * finds a task by id by first creating an allTasks that contains all the tasks available on that parent
 * @param {number} id the id of the target task
 * @returns {obj} target task
 */
function findTaskById(id, state) {
  const allTasks = state.projects.concat(state.envs)
  // making a copy of view
  const views = state.views.concat()
  return {
    task: allTasks.find((task) => task.id === id),
    view: views.find((view) => view._assets.id === id),
  }
}
/**
 * this function returns the index of a task inside the parent children array (the env or project that task take place)
 * @param {string} id the id of the target task
 * @returns {number} index of given target task in parent children array
 */
function _findTaskIndex(id = model.state.currentPageId, arr = []) {
  return arr.findIndex((task) => task.id === id)
}
function _findViewIndex(id = model.state.currentPageId, arr = []) {
  return arr.findIndex((view) => view._assets.id === id)
}
/**
 * this function will delete a given task (todos or non-standalone projects)
 * @param {obj} task it must be a todo or non-standalone project
 * @returns {obj} an object containing deleted task alongside with it's view
 */
function deleteTask(taskId, taskType, state) {
  const taskArr = state[`${taskType.toLowerCase()}s`]
  const deletedTask = taskArr.splice(_findTaskIndex(taskId, taskArr), 1)
  const deletedView = state.views.splice(_findViewIndex(taskId, state.views), 1)
  return {
    deletedTask,
    deletedView,
  }
}
/**
 * Edits a certain id with new information
 * @param {number} taskId the id of a given task
 * @param {*} newData edited data
 */
function editTask(taskId, newData) {
  const { task } = findTaskById(taskId)
  task.data = newData
  return task
}
function createTask(options) {
  const { viewConstructor, taskConstructor, data } = options
  const taskType = taskConstructor.name.toUpperCase()
  // generate task
  const newTask = HELPERS.GENERATE_TASK(taskConstructor, data)
  // generate view
  const newView = HELPERS[`GENERATE_${taskType}_VIEW`](
    viewConstructor,
    data,
    model.state.currentTheme
  )
  // updates state
  taskController.updateTasksState(model.state, taskType, newTask)
  taskController.updateTasksState(model.state, 'view', newView)
  // returns the task and it's view
  return {
    task: newTask,
    view: newView,
  }
}

export {
  generateDefaultProjects,
  updateTasksState,
  findTaskById,
  editTask,
  deleteTask,
  createTask,
}
