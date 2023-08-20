import { ChildView } from '../views-general/child-view'

class ChildEnvView extends ChildView {
  constructor(data = null) {
    super(data)
    this._parentEl = document.querySelector(`environment-container`)
    this._el = document.querySelector(
      `.environment[data-id="${this._assets.id}"]`
    )
  }
  get el() {
    return `.environment[data-id="${this._assets.id}"]`
  }
  _generateHTML() {
    return `
    <div
    class="hover:bg-theme-${this._assets.curTheme}-fifth rounded-md p-2 transition-all hover:scale-105 cursor-pointer flex justify-between items-center environment"
    data-id="${this._assets.id}"
  >
    <div>
      <i class="fa-solid fa-dragon text-theme-1-third"></i>
      ${this._assets.name}
    </div>
    <div class="flex justify-between text-1xl md:text-2xl gap-2">
      <i
        class="fa-solid fa-edit text-theme-${this._assets.curTheme}-main hover:scale-110 transition-transform cursor-pointer"
      ></i>
      <i
        class="fa-solid fa-times text-theme-${this._assets.curTheme}-main hover:scale-110 transition-transform cursor-pointer"
      ></i>
      <i
        class="fa-solid fa-question text-theme-${this._assets.curTheme}-main hover:scale-110 transition-transform cursor-pointer"
      ></i>
    </div>
  </div>`
  }
}
export { ChildEnvView }