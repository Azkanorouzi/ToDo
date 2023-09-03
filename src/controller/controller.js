import * as model from '../model/model'
import * as view from '../views/view'
import * as taskController from './task-controller'

// Theme change handler
function handleThemeChange(selectedTheme) {
  view.viewHelpers.changeTheme(selectedTheme, model.state.currentTheme)
  model.state.currentTheme = selectedTheme
  // Updating the theme of existing views
  model.state.containerviews.map(
    (containerview) =>
      (containerview._assets.curTheme = model.state.currentTheme)
  )
}

// Load event handler
function handleLoadEvent() {
  const initialProject = taskController.findTaskById(
    model.state.currentPageId,
    model.state
  )
  initialProject.containerView.render()
}
// Handles child task click
function handleChildTaskClick(id) {
  const project = taskController.findTaskById(id, model.state)
  console.log(project.containerView)
  project.containerView.render()
}
// Handles task info click
function handleTaskInfoClick(id) {
  const { task } = taskController.findTaskById(id, model.state)
  const taskModalInfo = view.viewHelpers.generateModalInfo(
    task,
    view.DetailModalView,
    'details',
    model.state.currentTheme
  )
  console.log(taskModalInfo)
  taskModalInfo.render(false, false)
  view.ModalView.addHandlers({ handleClose })
}
// Handler for nav plus button
function handlePlusBtn(type) {
  const addModal = view.viewHelpers.generateAddModal(
    view.AddModalView,
    type,
    model.state.currentTheme
  )
  addModal.render(false, false)
  view.ModalView.addHandlers({ handleClose })
}
// HandleClose for modals
function handleClose() {
  view.viewHelpers.closeModal()
}
// This function will pass all subscribers to their publisher
async function init() {
  const a = view.addNavHandlers({
    handleThemeChange,
    handleNavPlusBtn: handlePlusBtn.bind('', 'addNav'),
  })
  view.viewHelpers.addLoadHandler(handleLoadEvent)
  view.viewHelpers.addDefaultChildProjectsHandler({
    handleChildTaskClick,
    handleTaskInfoClick,
  })
  view.addDisplayHandlers({
    handleDisplayProjectPlusBtn: handlePlusBtn.bind('', 'addDisplay'),
  })
  // Initializing the defaults
  InitializeDefaults()
}
// this function will initialize the defaults
function InitializeDefaults() {
  // early return if the app is already initialized in that case we don't want to have defaults created again
  if (model.state.isDefaultsInitialized) return
  const { defaultProjects, defaultProjectsView, defaultProjectsContainerView } =
    taskController.generateDefaultProjects(model.state)
  // Updating the tasks state for the default projects
  taskController.updateTasksState(model.state, 'project', ...defaultProjects)
  taskController.updateTasksState(model.state, 'view', ...defaultProjectsView)
  taskController.updateTasksState(
    model.state,
    'containerView',
    ...defaultProjectsContainerView
  )
}
init()
