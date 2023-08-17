import { View } from './view.js'
class LimitedTaskView extends View {
  _data = {}
  _generateAssets() {
    this._assets.projectName = this._data.name
    // Todo childTodos name probably should be fixed
    this._assets.todos = this._data.childTodos
    this._assets.id = this._data.id
  }
}
export { LimitedTaskView }
