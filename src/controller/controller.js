import * as model from '../model/model'
import * as view from '../views/view'
import * as CONFIG from '../config'

console.log(model.state)
// Theme change handler
function handleThemeChange(selectedTheme) {
  view.viewHelpers.changeTheme(selectedTheme, model.state.currentTheme)
  model.state.currentTheme = selectedTheme
}

function renderInitialTab() {
  // Default project is inbox
  const data = {
    importance: '2',
    due: 'Without Time Limit',
    details:
      'Inbox is a nice home for random todos, here you can brain storm and put todos that you might want to change later :)',
    name: 'Inbox',
  }
  const defaultProject = new model.Project(data)
  const defaultProjectView = new view.ProjectView({
    name: 'Inbox',
    id: CONFIG.INITIAL_PAGE_ID,
    curTheme: model.state.currentTheme,
  })
  defaultProjectView.render()
}
// This function will pass all subscribers to their publisher
function init() {
  renderInitialTab()
  view.addNavHandlers({ handleThemeChange })
}
init()
