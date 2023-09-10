import { IMPORTANT_MESSAGE, MIGHT_MESSAGE, SHOULD_MESSAGE } from '../config'
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
  const { defaultTodos, defaultTodosView } =
    taskController.generateDefaultToDos()
  taskController.updateTasksState(model.state, 'todo', ...defaultTodos)
  taskController.updateTasksState(model.state, 'view', ...defaultTodosView)
  initialProject.containerView.render(
    true,
    true,
    taskController.getChildren(model.state)
  )
}
// Handles child task click
function handleChildTaskClick(id) {
  taskController.changeCurrentPage(id)
}
// Handles task info click
function handleTaskInfoClick(id, modalInfoType) {
  const { task } = taskController.findTaskById(id, model.state)
  const taskModalInfo = view.viewHelpers.generateModalInfo(
    task,
    view.DetailModalView,
    modalInfoType,
    model.state.currentTheme
  )
  taskModalInfo.render(false, false)
  view.ModalView.addHandlers({ handleClose })
}

// Handles child more icon click
function handleChildMoreClick(moreIconsContainer) {
  view.viewHelpers.openMoreChildTaskIcons(moreIconsContainer)
}
// Handles child more icon click
function handleChildLessClick(moreIconsContainer) {
  moreIconsContainer.classList.remove('fade-in-left')
  view.viewHelpers.closeMoreChildTaskIcons(moreIconsContainer)
}
// Handles delete task click
function handleDeleteTaskClick(taskId) {
  const warningModal = view.viewHelpers.generateModal(
    view.WarningModalView,
    '',
    model.state.currentTheme
  )
  const task = taskController.findTaskById(taskId, model.state).task
  warningModal.render(false, false)

  view.ModalView.addHandlers({
    handleClose,
    handleWarningDeleteOk: handleWarningDeleteOk.bind(
      '',
      taskId,
      task.taskType.toLowerCase()
    ),
  })
}
// HandleClose for modals
function handleWarningDeleteOk(taskId, taskType) {
  taskController.deleteTask(taskId, taskType, model.state)
  view.viewHelpers.removeTaskFromDom(taskId)
  view.viewHelpers.closeModal()
  handleChildTaskClick(model.state.prePageId)
}
// Handler for nav plus button
function handlePlusBtn(type) {
  const addModal = view.viewHelpers.generateModal(
    view.AddModalView,
    type,
    model.state.currentTheme
  )
  addModal.render(false, false)
  view.ModalView.addHandlers({
    handleClose,
    handleNavRadioBtn,
    handleImportanceBtn,
  })
}
// HandleClose for modals
function handleClose() {
  view.viewHelpers.closeModal()
}
// handle radio buttons
function handleNavRadioBtn(selectedRadio, limitedTaskInputs) {
  // Hiding limited task inputs because env is not a limited task and therefore importance and date should be removed from the form
  if (selectedRadio === 'env') {
    view.viewHelpers.hideElements(limitedTaskInputs)
    return
  }
  view.viewHelpers.showElements(limitedTaskInputs)
}
// Handling modal importance click button
function handleImportanceBtn(
  curImportance,
  importanceBtnEl,
  colors,
  importanceText
) {
  curImportance += curImportance === 2 ? -2 : 1
  importanceBtnEl.dataset.importance = curImportance
  view.viewHelpers.removeImportanceColor(importanceBtnEl)
  console.log(colors, importanceBtnEl.dataset.importance, curImportance)
  importanceBtnEl.classList.add(colors[+importanceBtnEl.dataset.importance])
  importanceText.textContent = [
    MIGHT_MESSAGE,
    SHOULD_MESSAGE,
    IMPORTANT_MESSAGE,
  ][curImportance]
}
// This function will pass all subscribers to their publisher
function init() {
  view.addNavHandlers({
    handleThemeChange,
    handleNavPlusBtn: handlePlusBtn.bind('', 'addNav'),
  })
  view.viewHelpers.addLoadHandler(handleLoadEvent)
  view.viewHelpers.addNavTaskHandlers({
    handleChildTaskClick,
    handleTaskInfoClick,
    handleChildMoreClick,
    handleChildLessClick,
    handleDeleteTaskClick,
  })
  view.addDisplayHandlers({
    handleDisplayProjectPlusBtn: handlePlusBtn.bind('', 'addTodoDisplay'),
    handleDisplayEnvPlusBtn: handlePlusBtn.bind('', 'addDisplay'),
  })
  // Initializing the defaults
  // early return if the app is already initialized in that case we don't want to have defaults created again
  if (model.state.isDefaultsInitialized) return
  taskController.initializeDefaults()
  // marking the application as initialized so that initializeDefaults don't get called again
  model.state.isDefaultsInitialized = true
}
init()
