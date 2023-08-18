import { View } from './view-general'

class ChildView extends View {
  _parentEl = document.querySelector('.display-container')
  _generateAssets() {
    this._assets.name = this._data.name
    // Todo childTodos name probably should be fixed
    this._assets.id = this._data.id
    this._assets = this._data.parentId
    this._assets.taskType = this._data.taskType
    this._assets.curTheme = this._data.curTheme

    if (this._assets.taskType === 'Project')
      this._assets.progress = this._data.progress
    if (this._assets.taskType === 'ToDo') return
    this._assets.done = this._data.done
  }
}
export { ChildView }
