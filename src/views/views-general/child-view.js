import { View } from './view'

class ChildView extends View {
  constructor(data) {
    if (!data) throw new Error('data is required')
    this._generateAssets(data)
  }
  _generateAssets(data) {
    this._assets.name = data.name
    // Todo childTodos name probably should be fixed
    this._assets.daysLeft = data.daysLeft
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
