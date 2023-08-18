import { View } from './view.js'

class ContainerTaskView extends View {
  _parentEl = document.querySelector('.display-container')
  _generateAssets(data) {
    this._assets.name = data.name
    // Todo childTodos name probably should be fixed
    this._assets.id = data.id
    this._assets.curTheme = data.curTheme
  }
}
export { ContainerTaskView }
