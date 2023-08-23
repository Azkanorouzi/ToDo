import * as model from '../model/model'
import * as view from '../views/view'

console.log(model.state)
// Theme change handler
function handleThemeChange(selectedTheme) {
  console.log(selectedTheme)
  view.viewHelpers.changeTheme(selectedTheme, model.state.currentTheme)
  model.state.currentTheme = selectedTheme
}
// This function will pass all subscribers to their publisher
function init() {
  view.addNavHandlers({ handleThemeChange })
}
init()
