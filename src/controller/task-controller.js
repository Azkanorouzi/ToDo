import * as model from '../model/model'
import * as HELPERS from '../helpers'
import * as view from '../views/view'
import * as CONFIG from '../config'
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
  const defaultProjectsContainerView = HELPERS.GENERATE_DEFAULT_PROJECTS_VIEW(
    defaultProjects,
    model.state.currentTheme,
    ['fa-inbox', 'fa-star', 'fa-calendar-days', 'fa-layer-group', 'fa-clock'],
    view.ProjectView,
    ['Inbox', 'Today', 'Upcoming', 'Anytime', 'Sometime']
  )

  return { defaultProjects, defaultProjectsView, defaultProjectsContainerView }
}
function generateDefaultToDos() {
  const defaultTodos = HELPERS.GENERATE_DEFAULT_TODOS(model.ToDo)
  const defaultTodosView = HELPERS.GENERATE_DEFAULT_TODOS_VIEW(
    defaultTodos,
    model.state.currentTheme,
    view.TodoView,
    model.state.currentPageId
  )

  return {
    defaultTodos,
    defaultTodosView,
  }
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
  if (taskType === 'view' || taskType === 'containerView') return
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
  const containerViews = state.containerviews.concat()
  return {
    task: allTasks.find((task) => task.id === id),
    view: views.find((view) => view._assets.id === id),
    containerView: containerViews.find((view) => view._assets.id === id),
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
  const deletedContainerView = state.containerviews.splice(
    _findViewIndex(taskId, state.views),
    1
  )
  return {
    deletedTask,
    deletedView,
    deletedContainerView,
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
/**
 * this function simply creates a new task
 * @param {obj} options an object that contains viewConstructor viewContainerConstructor and taskConstructor
 * @returns {obj} and object containing task, it's view alongside with it's containerView
 */
function createTask(options, taskType, standAlone) {
  const { viewConstructor, viewContainerConstructor, taskConstructor, data } =
    options
  taskType = taskType.toUpperCase()
  // generate task
  const newTask = HELPERS.GENERATE_TASK(taskConstructor, data)
  const newView = HELPERS[`GENERATE_${taskType}_VIEW`](
    viewConstructor,
    data,
    model.state.currentTheme,
    '',
    taskType.toLowerCase(),
    standAlone,
    newTask.id,
    newTask.getDaysLeft(),
    newTask.done,
    newTask.progress
  )
  // generate container view
  const newContainerView = HELPERS[`GENERATE_${taskType}_CONTAINER_VIEW`](
    newTask,
    model.state.currentTheme,
    viewContainerConstructor,
    newTask.name,
    newTask.id
  )

  // updates state
  updateTasksState(model.state, taskType, newTask)
  updateTasksState(model.state, 'view', newView)
  updateTasksState(model.state, 'containerView', newContainerView)
  // returns the task and it's view
  return {
    task: newTask,
    view: newView,
    containerView: newContainerView,
  }
}
// this function will initialize the defaults
function initializeDefaults() {
  const { defaultProjects, defaultProjectsView, defaultProjectsContainerView } =
    generateDefaultProjects(model.state)
  // Updating the tasks state for the default projects
  updateTasksState(model.state, 'project', ...defaultProjects)
  updateTasksState(model.state, 'view', ...defaultProjectsView)
  updateTasksState(
    model.state,
    'containerView',
    ...defaultProjectsContainerView
  )

  //{ viewConstructor, viewContainerConstructor, taskConstructor, data }
  /*     this.importance = this.data?.importance || CONFIG.DEFAULT_IMPORTANCE
    this.due = this.data?.due || HELPERS.GET_TIME_TOMORROW()
    this.details = this.data?.details || CONFIG.DEFAULT_TASK_DETAILS
    this.name = this.data?.name || CONFIG.DEFAULT_TASK_NAME */
  // Creating intiail project
  const initialProject = createTask(
    {
      taskConstructor: model.Project,
      viewConstructor: view.ChildProjectView,
      viewContainerConstructor: view.ProjectView,
      data: {
        importance: CONFIG.DEFAULT_IMPORTANCE,
        due: CONFIG.DEFAULT_TASK_DUE,
        details: CONFIG.INITIAL_PROJECT_DETAILS,
        name: CONFIG.INITIAL_PROJECT_NAME,
        standAlone: true,
      },
    },
    'project',
    true
  )
  model.state.currentPageId = initialProject.task.id

  initialProject.view.render(false, false)
}
function getChildren(state) {
  return state.views.filter((view) => {
    return view?._assets.parentId === state.currentPageId
  })
}
export {
  generateDefaultProjects,
  updateTasksState,
  findTaskById,
  editTask,
  deleteTask,
  createTask,
  initializeDefaults,
  getChildren,
  generateDefaultToDos,
}
