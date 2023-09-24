import { ModalView } from '../views-general/modal-view'
import {
  SAFE_COLOR_BG,
  DANGER_COLOR_BG,
  WARNING_COLOR_BG,
  DANGER_COLOR,
  SHOULD_MESSAGE,
  IMPORTANT_MESSAGE,
  MIGHT_MESSAGE,
} from '../../config'

class AddModalView extends ModalView {
  constructor(data = null) {
    super(data)
    super._generateAssets(data)
  }

  _generateHTML() {
    return `
    <section
    class="absolute top-0 left-0 right-0 bottom-0 bg-theme-${
      this._assets.curTheme
    }-forth bg-opacity-5 backdrop-blur-sm z-50 p-4 fade-in-left landscape:p-0 add-modal nav-add-modal modal"
    data-theme="true"
    data-add-type=" ${this._assets.modalType}"
  >
    <div
      class="w-full min-h-full relative lg:flex lg:justify-center lg:items-center close-modal"
    >
      <div
        class="bg-theme-${
          this._assets.curTheme
        }-third absolute bottom-0 h-3/4 w-full rounded-2xl bg-opacity-100 p-5 text-2xl text-theme-${
      this._assets.curTheme
    }-forth flex flex-col justify-between lg:w-5/12 lg:mx-auto lg:my-auto lg:static lg:border-theme-${
      this._assets.curTheme
    }-fifth lg:border-8 lg:shadow-2xl gap-5 lg:text-3xl sm:h-3/5 flip-in-br landscape:min-h-screen landscape landscape:overflow-scroll  landscape:lg:min-h-0 modal-card "
    data-theme="true"
      >
        <i
          class="fa-solid fa-times text-5xl ${DANGER_COLOR} ml-auto cursor-pointer close-modal"
        ></i>
        <h2 class="absolute text-4xl">${
          this._assets.message
            ? this._assets.message
            : `Add a new ${
                this._assets.modalType === 'adddisplay'
                  ? 'Todo/Project'
                  : this._assets.modalType === 'addtododisplay'
                  ? 'Todo'
                  : 'Env/Project'
              }`
        }</h2>
        <div class="flex gap-3 flex-col ">
        <div class="flex ${
          this._assets.modalType === 'addtododisplay' ? 'hidden' : ''
        }">
          <label for="radio-btn" class="mr-5">
          ${this._assets.modalType === 'adddisplay' ? 'Todo: ' : 'Env: '}
            <input type="radio" name="type" id="task-btn" value="${
              this._assets.modalType === 'adddisplay'
                ? 'todo'
                : this._assets.modalType === 'addtododisplay'
                ? 'todo'
                : 'env'
            }" class="radio-button" data-task-type="${
      this._assets.modalType === 'adddisplay'
        ? 'todo'
        : this._assets.modalType === 'addtododisplay'
        ? 'todo'
        : 'env'
    }" checked/>
          </label>
          <label for="radio-btn2" data-task-type="project">
            Project:
            <input
              type="radio"
              name="type"
              id="radio-btn2"
              value= "project"
              class="radio-button" data-radio-type="${
                this._assets.modalType === 'adddisplay' ? 'todo' : 'env'
              }" />
          </label>
          </div>
        <!-- Title -->
        <label for="task-title">
          <input
            type="text"
            id="task-title"
            class="resize-none w-full bg-theme-${
              this._assets.curTheme
            }-main rounded-lg p-3 focus:border-none focus:outline-none title-input"
            placeholder="Title"
            data-theme="true"
          />
        </label>
        <!-- Details -->
        <label for="details">
          <textarea
            type="text"
            id="details"
            class="resize-none w-full bg-theme-${
              this._assets.curTheme
            }-main rounded-lg p-3 focus:border-none focus:outline-none details-input"
            placeholder="Details"
            data-theme="true"
          ></textarea>
        </label>
        <!-- Date -->
        <label for="details" class="add-modal-date-container env-hidden">
          <input
            type="date"
            class="w-full bg-theme-${
              this._assets.curTheme
            }-main rounded-lg p-3 focus:border-none focus:outline-none date-input"
            placeholder="Date"
            data-theme="true"
          />
        </label>
        <!-- Importance -->
        <div class="flex importance-input env-hidden ">
          <div class="rounded-full w-10 h-10 ${
            this._assets.importance === '1'
              ? WARNING_COLOR_BG
              : this._assets.importance === '0'
              ? SAFE_COLOR_BG
              : DANGER_COLOR_BG
          } cursor-pointer importance-button transition-colors" data-importance="${
      this._assets.importance ?? 2
    }"></div>
          <p class="importance-text ml-3">
          ${
            this._assets.importance === '1'
              ? SHOULD_MESSAGE
              : this._assets.importance === '0'
              ? MIGHT_MESSAGE
              : IMPORTANT_MESSAGE
          }
          </p>
        </div>

        <!-- Add and close button for add modal -->
        <div class="buttons text-center">
          <button
            class="bg-theme-${
              this._assets.curTheme
            }-fifth px-6 text-xl py-3 rounded-xl text-theme-${
      this._assets.curTheme
    }-forth shadow-2xl border-b-4 border-b-theme-${
      this._assets.curTheme
    }-forth focus:border-b-0 transition-all hover:opacity-100 opacity-70 add-modal-button ${
      this._assets.modalType === 'adddisplay'
        ? 'add-nav-modal-button'
        : this._assets.message
        ? 'edit-display-modal-button'
        : 'add-display-modal-button'
    }"
    data-theme="true"
            type="button"
          >
            Add
          </button>
          <button
            class="bg-theme-${
              this._assets.curTheme
            }-fifth px-6 text-xl py-3 rounded-xl text-theme-${
      this._assets.curTheme
    }-forth border-b-4 border-b-theme-${
      this._assets.curTheme
    }-forth focus:border-b-0 transition-all hover:opacity-100 opacity-70 close-modal"
            type="button"
            data-theme="true"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </section>
    `
  }
}
export { AddModalView }
