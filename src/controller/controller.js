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
  model.state.views.map(
    (view) => (view._assets.curTheme = model.state.currentTheme)
  )
}
// Handles star button
function handleStarButtonClick(starIcon, starDisplays) {
  view.viewHelpers.toggleStarIcon(starIcon)
  view.viewHelpers.toggleStar(starDisplays, model.state.currentTheme)
  model.state.star = model.state.star ? false : true
  model.state.containerviews.map(
    (containerview) => (containerview._assets.star = model.state.star)
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
    taskController.getChildrenViews(model.state)
  )
  taskController.updateProgress(initialProject.task)
}
// Handles child task click
function handleChildTaskClick(id, type) {
  taskController.changeCurrentPage(id, type)
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
  if (!task) return
  warningModal.render(false, false)

  view.ModalView.addHandlers({
    handleClose,
    handleWarningDeleteOk: handleWarningDeleteOk.bind(
      '',
      taskId,
      task?.taskType?.toLowerCase() ?? 'todo',
      task
    ),
  })
}
// HandleClose for modals
function handleWarningDeleteOk(taskId, taskType, task) {
  taskController.deleteTask(taskId, taskType, model.state)
  view.viewHelpers.removeTaskFromDom(taskId, taskType)
  view.viewHelpers.closeModal()
  const taskParent = taskController.findTaskById(
    task.parentId,
    model.state
  ).task
  taskController.updateProgress(taskParent)
  if (taskType === 'todo' || task.standAlone) return
  handleChildTaskClick(model.state.prePageId, 'delete')
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
    handleDisplayAdd,
  })
}
// Handles Adding a new todo
function handleDisplayAdd(data, displayAddType) {
  const { selectedType } = data
  // env todo project
  const newTask = taskController.createTask(
    {
      viewConstructor:
        selectedType === 'todo'
          ? view.TodoView
          : selectedType === 'env'
          ? view.ChildEnvView
          : view.ChildProjectView,
      taskConstructor:
        selectedType === 'todo'
          ? model.ToDo
          : selectedType === 'env'
          ? model.Environment
          : model.Project,
      viewContainerConstructor:
        selectedType === 'todo'
          ? null
          : selectedType === 'env'
          ? view.EnvironmentView
          : view.ProjectView,
      data: {
        parentId:
          displayAddType.trim('') === 'addnav'
            ? null
            : model.state.currentPageId,
        name: data.title,
        importance: data.importance,
        due: data.due,
        details: data.details,
        standAlone: displayAddType.trim('') === 'addnav' ? true : false,
      },
    },
    'project',
    displayAddType.trim('') === 'addnav' ? true : false,
    selectedType === 'todo' ? false : selectedType === 'env' ? true : true
  )
  newTask.view._parentEl = document.querySelector(
    `${
      selectedType === 'env'
        ? '.environment-container'
        : displayAddType.trim('') === 'addnav'
        ? '.stand-alone-projects-container'
        : '.items-container'
    }`
  )
  newTask.view.render(false, false)

  const { task: parentTask } = taskController.findTaskById(
    newTask.task.parentId,
    model.state
  )
  if (selectedType !== 'todo') return
  taskController.updateProgress(parentTask)
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

  importanceBtnEl.classList.add(colors[+importanceBtnEl.dataset.importance])
  importanceText.textContent = [
    MIGHT_MESSAGE,
    SHOULD_MESSAGE,
    IMPORTANT_MESSAGE,
  ][curImportance]
}
function handleTodoMenuClick(todoMenu) {
  view.viewHelpers.triggerTodoMenu(todoMenu)
}
function handleTodoCheck(id, todoEl) {
  const todo = taskController.findTaskById(id, model.state)
  taskController.checkTodo(todo)
  taskController.checkTodoInDom(todoEl)
  const parentTodo = taskController.findTaskById(
    taskController.findTaskById(todoEl.dataset.id, model.state).task.parentId,
    model.state
  )
  taskController.updateProgress(parentTodo.task)
}
function handleStandAloneProjectClick() {
  view.viewHelpers.showBackButton()
}
function handleBackButtonClick() {
  taskController.changeCurrentPage(model.state.prePageId)
}
// This function will pass all subscribers to their publisher
function init() {
  view.addNavHandlers({
    handleThemeChange,
    handleStarButtonClick,
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
    handleTodoMenuClick,
    handleTaskInfoClick,
    handleDeleteTaskClick,
    handleTodoCheck,
    handleChildMoreClick,
    handleChildTaskClick,
    handleStandAloneProjectClick,
    handleBackButtonClick,
  })
  // Initializing the defaults
  // early return if the app is already initialized in that case we don't want to have defaults created again
  if (model.state.isDefaultsInitialized) return
  taskController.initializeDefaults()
  // marking the application as initialized so that initializeDefaults don't get called again
  model.state.isDefaultsInitialized = true
}
init()
