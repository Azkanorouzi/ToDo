import { ModalView } from '../views-general/modal-view'
import {
  SAFE_COLOR_BG,
  DANGER_COLOR_BG,
  WARNING_COLOR_BG,
  DANGER_COLOR,
} from '../../config'

class DetailModalView extends ModalView {
  todayMessage = 'Today!'
  futureMessage = 'You have time'
  lateMessage = "It's late!"
  constructor(data = null) {
    super(data)
    super._generateAssets(data)
  }
  _generateHTML() {
    return `
    <section
    class="absolute top-0 left-0 right-0 bottom-0 bg-opacity-5 z-50 fade-in-left bg-theme-${
      this._assets.curTheme
    }-forth backdrop-blur-sm modal"
    data-theme="true"
  >
    <div
      class="w-full min-h-full relative lg:flex lg:justify-center lg:items-center lg:bg-opacity-30 lg:backdrop-blur-2xl close-modal modal-back"
    >
      <div
        class="bg-theme-${
          this._assets.curTheme
        }-second absolute top-0 min-h-full w-full rounded-2xl bg-opacity-100 p-5 text-3xl text-theme-${
      this._assets.curTheme
    }-forth flex flex-col justify-between border-x-8 border-y-8 border-theme-${
      this._assets.curTheme
    }-main lg:w-7/12 lg:mx-auto lg:my-auto lg:static lg:border-theme-${
      this._assets.curTheme
    }-fifth lg:border-8 lg:shadow-2xl lg:gap-9 lg:text-3xl flip-in-br modal-card"
    data-theme="true"
      >
        <i
          class="fa-solid fa-times text-5xl ${DANGER_COLOR} ml-auto cursor-pointer close-modal"
        ></i>
        <!-- Title,Icon -->
        <div>
          <h2 class="text-5xl">
            <i class="fa-solid fa-dragon"></i>
            ${this._assets.name} (${this._assets.modalType})
          </h2>
        </div>
        <!-- Details -->
        <p class="text-theme-${this._assets.curTheme}-fifth">
          ${this._assets.details}
        </p>
        <!-- Date -->
        <div>
          <p class="text-theme-${this._assets.curTheme}-forth">${
      this._assets.due
    }</p>
    ${
      this._assets.modalType === 'details'
        ? ``
        : `          <!-- State -->
        <p class="text-theme-${this._assets.curTheme}-main" data-theme="true">${
            this._assets.daysLeft == 0
              ? this.todayMessage
              : this._assets.daysLeft > 0
              ? this.futureMessage
              : this.lateMessage
          }</p>
      </div>
      <!-- Importance -->
      <div class="flex">
        <div class="rounded-full w-10 h-10 ${
          this._assets.importance === '1'
            ? WARNING_COLOR_BG
            : this._assets.importance === '0'
            ? SAFE_COLOR_BG
            : DANGER_COLOR_BG
        } "></div>
        <p class="importance-text ml-3">${
          this._assets.importance === '1'
            ? this.importantMessage
            : this._assets.importance === '0'
            ? this.shouldMessage
            : this.mightMessage
        }</p>
      </div>`
    }

        <!-- Add and close button for detail modal -->
        <div class="buttons text-center">
          <button
            class="bg-theme-${
              this._assets.curTheme
            }-fifth px-6 text-xl py-3 rounded-xl text-theme-${
      this._assets.curTheme
    }-forth shadow-2xl border-b-4 border-b-theme-${
      this._assets.curTheme
    }-forth focus:border-b-0 transition-all hover:opacity-100 opacity-70 close-modal"
            type="button"
            data-theme="true"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  </section>`
  }
}
export { DetailModalView }
