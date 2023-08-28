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

function renderInitialTab() {
  console.log(view.ProjectView)
  const defaultProjects = HELPERS.GENERATE_DEFAULT_PROJECTS(model.Project)
  const defaultProjectsView = HELPERS.GENERATE_DEFAULT_PROJECTS_VIEW(
    defaultProjects,
    model.state.currentTheme,
    ['fa-inbox', 'fa-star', 'fa-calendar-days', 'fa-layer-group', 'fa-clock'],
    view.ProjectView
  )
  console.log(model.state)
  defaultProjectsView[4].render()
}
// This function will pass all subscribers to their publisher
function init() {
  renderInitialTab()
  view.addNavHandlers({ handleThemeChange })
}
init()
