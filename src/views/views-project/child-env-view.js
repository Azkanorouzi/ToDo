import { ChildView } from '../views-general/child-view'
import { SAFE_COLOR, DANGER_COLOR, WARNING_COLOR } from '../../config'

class ChildEnvView extends ChildView {
  constructor(data = null, standAlone = false) {
    if (!data) throw new Error('data is required')
    this._generateAssets(data)
    this._parentEl = document.querySelector(``)
    this._el = document.querySelector(`.project[data-id="${this._assets.id}"]`)
  }
}
export { ChildEnvView }
