import { ChildView } from '../views-general/child-view'
import { SAFE_COLOR, DANGER_COLOR, WARNING_COLOR } from '../../config'

class ChildProjectView extends ChildView {
  constructor(data = null, standAlone = false) {
    super(data)
    // child project have slightly different markup if it's standAlone
    this._standAlone = standAlone
    this._parentEl = document.querySelector(
      this.standAlone
        ? `.stand-alone-projects-container`
        : `.todo-container[data-id="${this._assets.parentId}"]`
    )
    this.el = document.querySelector(`.project[data-id="${this._assets.id}"]`)
    this.children = this._assets.children
  }
  get el() {
    return document.querySelector(`.project[data-id="${this._assets.id}"]`)
  }
  _generateHTML() {
    return this._standAlone
      ? `
      <div
      class="hover:border-theme-${
        this._assets.curTheme
      }-forth rounded-md p-1 px-2 todo flex items-center justify-between text-xl relative shadow-md shadow-theme-${
          this._assets.curTheme
        }-main border-x-4 border-y-4 border-theme-${
          this._assets.curTheme
        }-fifth cursor-pointer transition-colors project fade-in-left"
        data-id = "${this._assets.id}"
    >
      <div
        class="absolute left-0 h-full w-3/6 bg-theme-1-third project-fill text-theme-${
          this._assets.curTheme
        }-fifth"
      ></div>
      <i
        class="fa-solid fa-code text-theme-${
          this._assets.curTheme
        }-fifth z-10 project-dragon-icon text-2xl"
      ></i>
      <!-- Project name -->
      <span class="z-10"> ${this._assets.name} </span>
      <!-- Project icons -->
      <div class="flex justify-between text-xl md:text-1xl 2xl:text-2xl">
        <!-- Menu -->
        <i
          class="fa-solid fa-bars text-theme-${
            this._assets.curTheme
          }-forth mr-2 cursor-pointer hhover:scale-110 transition-transform"
        ></i>
        <!-- Time clock -->
        <i
          class="${
            this._assets.daysLeft === 0
              ? WARNING_COLOR
              : this._assets.daysLeft > 0
              ? SAFE_COLOR
              : DANGER_COLOR
          } fa-solid fa-clock mr-2 cursor-pointer hover:scale-110 transition-transform"
        ></i>
        <!-- Importance button -->
        <i
          class="${
            this._assets.importance === '1'
              ? WARNING_COLOR
              : this._assets.importance === '0'
              ? SAFE_COLOR
              : DANGER_COLOR
          } fa-solid fa-circle cursor-pointer hover:scale-110 transition-transform"
        ></i>
      </div>
      <!-- Project icons more -->
      <div
        class="text-2xl absolute bg-theme-${
          this._assets.curTheme
        }-second z-10 p-2 transition-all top-0 left-0 right-0 bottom-0 flex justify-center hover:bg-opacity-90 backdrop-blur-sm gap-2"
      >
        <i
          class="fa-solid fa-bars text-theme-${
            this._assets.curTheme
          }-fifth mr-2 cursor-pointer hover:scale-110 transition-transform rotate-90"
        ></i>
        <i
          class="fa-solid fa-edit ${WARNING_COLOR} hover:scale-110 transition-transform cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-share ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-times ${DANGER_COLOR} hover:scale-110 transition-transform cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-question ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer"
        ></i>
      </div>
    </div>
    `
      : `            <div
      class="hover:border-theme--forth rounded-md p-4 todo flex items-center justify-between lg:text-3xl relative shadow-md shadow-theme-${
        this._assets.curTheme
      }-main border-x-4 border-y-4 border-theme-${
          this._assets.curTheme
        }-fifth cursor-pointer transition-colors project fade-in-left"
    >
      <div
        class="absolute left-0 h-full w-3/6 bg-theme-${
          this._assets.curTheme
        }-third project-fill text-theme-${this._assets.curTheme}-fifth"
      ></div>
      <i
        class="fa-solid fa-dragon text-theme-${
          this._assets.curTheme
        }-fifth z-10 project-dragon-icon"
      ></i>
      <!-- Project name -->
      <span class="z-10"> Project name </span>
      <!-- Project icons -->
      <div
        class="flex justify-between text-2xl md:text-3xl 2xl:text-4xl"
      >
        <!-- Menu -->
        <i
          class="fa-solid fa-bars text-theme-1-forth mr-2 cursor-pointer hhover:scale-110 transition-transform"
        ></i>
        <!-- Time clock -->
        <i
          class="${
            this._assets.daysLeft === 0
              ? WARNING_COLOR
              : this._assets.daysLeft > 0
              ? SAFE_COLOR
              : DANGER_COLOR
          } fa-solid fa-clock mr-2 cursor-pointer hover:scale-110 transition-transform"
        ></i>
        <!-- Importance button -->
        <i
          class=" ${
            this._assets.importance === '1'
              ? WARNING_COLOR
              : this._assets.importance === '0'
              ? SAFE_COLOR
              : DANGER_COLOR
          } fa-solid fa-circle cursor-pointer hover:scale-110 transition-transform mr-2"
        ></i>
        <!-- Details button -->
        <i
          class="fa-solid fa-question ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer"
        ></i>
      </div>
      <!-- Project icons more -->
      <div
        class="text-3xl absolute bg-theme-${
          this._assets.curTheme
        }-forth z-10 p-4 rounded-r-full rounded-bl-full rotate-12 -bottom-16 -right-0 transition-all"
      >
        <i
          class="fa-solid fa-edit ${WARNING_COLOR} hover:scale-110 transition-transform cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-share ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer"
        ></i>
        <i
          class="fa-solid fa-times ${DANGER_COLOR} hover:scale-110 transition-transform cursor-pointer"
        ></i>
      </div>
    </div>`
  }
}
export { ChildProjectView }
