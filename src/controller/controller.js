import * as model from '../model/model'
import * as view from '../views/view'
import * as CONFIG from '../config'
import * as HELPERS from '../helpers'
console.log(model.state)
// Theme change handler
function handleThemeChange(selectedTheme) {
  view.viewHelpers.changeTheme(selectedTheme, model.state.currentTheme)
  model.state.currentTheme = selectedTheme
}
function handleLoadEvent() {
  const { view } = model.Task.findTaskById(model.state.currentPageId)
  // view.render()
}
// function renderTask(taskType) {
//   // generate task
//   HELPERS.GENERATE_TASK()
//   // generate view
//   // push task to state
//   // push view to state
// }
// This function will pass all subscribers to their publisher
function init() {
  generateDefaults(model.state)
  view.addNavHandlers({ handleThemeChange })
  view.viewHelpers.addLoadHandler(handleLoadEvent)
}
init()
// These functions need to be inside controller because they need both model and view

function generateDefaults(state) {
  console.log(view.ProjectView)
  const defaultProjects = HELPERS.GENERATE_DEFAULT_PROJECTS(model.Project)
  const defaultProjectsView = HELPERS.GENERATE_DEFAULT_PROJECTS_VIEW(
    defaultProjects,
    model.state.currentTheme,
    ['fa-inbox', 'fa-star', 'fa-calendar-days', 'fa-layer-group', 'fa-clock'],
    view.ProjectView
  )
  console.log(state)
  if (state.views.length === 0) model.state.views = [...defaultProjectsView]
}
