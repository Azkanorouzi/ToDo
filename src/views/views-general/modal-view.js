import { View } from './view'

class ModalView extends View {
  constructor(data) {
    if (!data) throw new Error('data is required')
    this._generateAssets(data)
    this._parentEl = document.querySelector('main')
  }
  _generateAssets(data) {
    this._assets.name = data.name
    this._assets.details = data.details
    this._assets.importance = data.importance
    // Todo childTodos name probably should be fixed
    this._assets.modalType = data.modalType.toLower()
    this._assets.curTheme = data.curTheme
  }
}
export { ModalView }
