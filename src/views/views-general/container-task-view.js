import { View } from './view.js'

class ContainerTaskView extends View {
  _parentEl = document.querySelector('.display-container')
  _generateAssets() {
    this._assets.name = this._data.name
    // Todo childTodos name probably should be fixed
    this._assets.id = this._data.id
    this._assets.curTheme = this._data.curTheme
  }
}
export { ContainerTaskView }
