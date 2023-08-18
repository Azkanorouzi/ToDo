import { View } from './view'

class ChildView extends View {
  assets = {}
  _generateAssets(data) {
    this._assets.name = data.name
    // Todo childTodos name probably should be fixed
    this._assets.id = data.id
    this._assets = data.parentId
    this._assets.taskType = data.taskType.toLower()
    this._assets.curTheme = data.curTheme

    if (this._assets.taskType === 'Project')
      this._assets.progress = data.progress
    if (this._assets.taskType === 'ToDo') return
    this._assets.done = data.done
  }
}
export { ChildView }
