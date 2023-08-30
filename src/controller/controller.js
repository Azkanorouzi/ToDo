import * as model from '../model/model'
import * as view from '../views/view'

import * as taskController from './task-controller'

// Theme change handler
function handleThemeChange(selectedTheme) {
  view.viewHelpers.changeTheme(selectedTheme, model.state.currentTheme)
  model.state.currentTheme = selectedTheme
}

// Load event handler
function handleLoadEvent() {
  console.log('loaded')
  const InitialProject = taskController.findTaskById(
    model.state.currentPageId,
    model.state
  )
}

function handleStandAloneProjectClick() {}

// This function will pass all subscribers to their publisher
function init() {
  view.addNavHandlers({ handleThemeChange })
  view.viewHelpers.addLoadHandler(handleLoadEvent)
  // early return if the app is already initialized in that case we don't want to have defaults created again
  if (model.state.isDefaultsInitialized) return
  const { defaultProjects, defaultProjectsView } =
    taskController.generateDefaultProjects(model.state)
  // Updating the tasks state for the default projects
  taskController.updateTasksState(model.state, 'project', ...defaultProjects)
  taskController.updateTasksState(model.state, 'view', ...defaultProjectsView)
}
init()
