import { ModalView } from '../views-general/modal-view'
import { DANGER_COLOR } from '../../config'

class WarningModalView extends ModalView {
  _message =
    'Please keep in mind that the effect of this action will be permanent.'
  constructor(data = null, action) {
    super(data)
    this.action = action
  }
  addHandlerModalViewProceed(handler) {
    document
      .querySelector('.modal-warning-ok')
      .addEventListener('click', handler)
  }
  _generateHTML() {
    return `
    <section
    class="absolute top-0 left-0 right-0 bottom-0 bg-theme-${this._assets.curTheme}-forth bg-opacity-5 backdrop-blur-sm z-50 p-4 fade-in-left modal"
  >
    <div
      class="w-full h-full relative lg:flex lg:justify-center lg:items-center"
    >
      <div
        class="bg-theme-${this._assets.curTheme}-third absolute bottom-0 h-3/5 w-full rounded-2xl bg-opacity-100 p-5 text-3xl text-theme-${this._assets.curTheme}-forth flex flex-col justify-between lg:w-5/12 lg:mx-auto lg:my-auto lg:static lg:border-theme-${this._assets.curTheme}-fifth lg:border-8 lg:shadow-2xl lg:h-3/5 lg:text-3xl sm:h-3/5 flip-in-br"
      >
        <i
          class="fa-solid fa-times text-5xl ${DANGER_COLOR} ml-auto cursor-pointer close-modal"
        ></i>
        <!-- Title -->
        <h2 class="text-5xl text-theme-1-fifth absolute">Are you sure you want to ${this._assets.theme} this task? </h2>
        <p>
            ${this._message}
        </p>

        <!-- Add and close button for add modal -->
        <div class="buttons text-center">
          <button
            class="bg-theme-${this._assets.curTheme}-fifth px-6 text-xl py-3 rounded-xl text-theme-${this._assets.curTheme}-forth shadow-2xl border-b-4 border-b-theme-${this._assets.curTheme}-forth focus:border-b-0 transition-all hover:opacity-100 opacity-70 modal-warning-ok"
            type="button"
          >
            Ok
          </button>
          <button
            class="bg-theme-${this._assets.curTheme}-fifth px-6 text-xl py-3 rounded-xl text-theme-${this._assets.curTheme}-forth border-b-4 border-b-theme-${this._assets.curTheme}-forth focus:border-b-0 transition-all hover:opacity-100 opacity-70 warning-modal-cancel"
            type="button"
          >
            cancel
          </button>
        </div>
      </div>
    </div>
  </section>
    `
  }
}
export { WarningModalView }
