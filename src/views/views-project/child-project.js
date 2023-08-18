import { ChildView } from '../views-general/child-view'
import { SAFE_COLOR, DANGER_COLOR, WARNING_COLOR } from '../../config'

class ChildProjectView extends ChildView {
  _parentEl = document.querySelector(
    `.todo-container[data-id="${this._data.id}"]`
  )
  _assets = {}
  constructor(data = null) {
    if (!data) throw new Error('data is required')
    this._data = data
    this._generateAssets()
  }
  _generateHTML() {
    return `
    <h2
    class="hover:bg-theme-1-fifth rounded-md p-2 transition-all hover:scale-105 cursor-pointer"
  >
    <i class="fa-solid fa-code text-theme-1-third"></i> Project
  </h2>`
  }
}
export { ChildProjectView }
