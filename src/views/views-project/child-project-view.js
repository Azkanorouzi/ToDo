import { ChildView } from '../views-general/child-view'
import { SAFE_COLOR, DANGER_COLOR, WARNING_COLOR } from '../../config'
import { data } from 'autoprefixer'

class ChildProjectView extends ChildView {
  constructor(data = null, standAlone = false) {
    super()
    if (!data) throw new Error('data is required')
    super._generateAssets(data)
    // child project have slightly different markup if it's standAlone
    this._standAlone = standAlone

    this._parentEl = document.getElementsByClassName(
      this._standAlone ? `stand-alone-projects-container` : `items-container`
    )[0]
    this.children = this._assets.children
  }
  getEl = function () {
    return document.querySelector(`.project[data-id="${this._assets.id}"]`)
  }
  _generateHTML() {
    console.log(this._assets.daysLeft)
    return this._standAlone
      ? `
      
      <div
      class="hover:border-theme-${
        this._assets.curTheme
      }-forth rounded-md p-1 px-2 todo flex items-center justify-between text-xl relative shadow-md shadow-theme-${
          this._assets.curTheme
        }-main border-x-4 border-y-4 border-theme-${
          this._assets.curTheme
        }-fifth cursor-pointer transition-colors project fade-in-left child-task"
        data-id = "${this._assets.id}"
        data-theme="true"
    >
      <div
        class="absolute left-0 h-full bg-theme-1-third project-fill text-theme-${
          this._assets.curTheme
        }-fifth project-progress"
        style="width:${this._assets.progress}; transition: .5s width;"
        data-theme="true"
      ></div>
      <i
        class="fa-solid fa-code text-theme-${
          this._assets.curTheme
        }-fifth z-10 project-dragon-icon text-2xl"
        data-theme="true"
      ></i>
      <!-- Project name -->
      <span class="z-10 tsk-name"> ${this._assets.name || 'Untitled'} </span>
      <!-- Project icons -->
      <div class="flex justify-between text-xl md:text-1xl 2xl:text-2xl z-10">
        <!-- Menu -->
        <i
          class="fa-solid fa-bars text-theme-${
            this._assets.curTheme
          }-forth mr-2 cursor-pointer hover:scale-110 transition-transform child-more-btn"
          data-theme="true"
        ></i>
        <!-- Time clock -->
        <i
          class="${
            this._assets.daysLeft >= '7'
              ? SAFE_COLOR
              : this._assets.daysLeft >= '0'
              ? WARNING_COLOR
              : DANGER_COLOR
          } fa-solid fa-clock mr-2 cursor-pointer hover:scale-110 transition-transform "
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
        }-second z-10 p-2 transition-all top-0 left-0 right-0 bottom-0 flex justify-center hover:bg-opacity-90 backdrop-blur-sm gap-2 hidden scale-in-from-left more"
        data-theme="true"
      >
        <i
          class="fa-solid fa-bars text-theme-${
            this._assets.curTheme
          }-fifth mr-2 cursor-pointer hover:scale-110 transition-transform rotate-90 child-less-btn"
          data-theme="true"
        ></i>
        <i
          class="fa-solid fa-edit ${WARNING_COLOR} hover:scale-110 transition-transform cursor-pointer edit-btn"
        ></i>
        <i
          class="fa-solid fa-share ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer child-share-btn"
        ></i>
        <i
          class="fa-solid fa-times ${DANGER_COLOR} hover:scale-110 transition-transform cursor-pointer child-delete-btn"
        ></i>
        <i
          class="fa-solid fa-question ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer child-info-btn"
        ></i>
      </div>
    </div>
    `
      : `
      <div class="relative todo-container order-${
        (this._assets.importance - 3) * -1
      } "${this._assets.done ? 'style="order: 4;"' : ''}>
    <div
      class="hover:border-theme-${
        this._assets.curTheme
      }-forth rounded-md p-4  flex items-center justify-between lg:text-3xl  shadow-md shadow-theme-${
          this._assets.curTheme
        }-main border-x-4 border-y-4 border-theme-${
          this._assets.curTheme
        }-fifth cursor-pointer transition-colors project fade-in-left child-task child-project project"
        data-id="${this._assets.id}"
        data-theme="true"
    >
      <div
        class="absolute left-0 h-full bg-theme-${
          this._assets.curTheme
        }-third project-fill text-theme-${this._assets.curTheme}-fifth"
        style="width:${this._assets.progress}; transition: .5s width"
        data-theme="true"
      ></div>
      <i
        class="fa-solid fa-dragon text-theme-${
          this._assets.curTheme
        }-fifth z-10 project-dragon-icon"
        data-theme="true"
      ></i>
      <!-- Project name -->
      <span class="z-10 tsk-name"> ${this._assets.name || 'Untitled'} </span>
      <!-- Project icons -->
      <div
        class="flex justify-between text-2xl md:text-3xl 2xl:text-4xl  z-10"
      >
        <!-- Menu -->
        <i
          class="fa-solid fa-bars text-theme-${
            this._assets.curTheme
          }-forth mr-2 cursor-pointer hover:scale-110 transition-transform child-more-btn todo-menu"
          data-theme="true"
        ></i>
        <!-- Time clock -->
        <i
          class="${
            this._assets.daysLeft >= '7'
              ? SAFE_COLOR
              : this._assets.daysLeft >= '0'
              ? WARNING_COLOR
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
          class="fa-solid fa-question ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer child-info-btn"
        ></i>
      </div>
      <!-- Project icons more -->
      <div
      class="text-3xl absolute bg-theme-${
        this._assets.curTheme
      }-main p-4 rounded-r-full rounded-bl-full transition-all z-10 hidden  opacity-0  todo-menu-container -bottom-16 -right-0"
      data-theme="true"
    >
      <i
        class="fa-solid fa-edit ${WARNING_COLOR} hover:scale-110 transition-transform cursor-pointer child-edit-btn"
      ></i>
      <i
        class="fa-solid fa-share ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer child-move-btn"
      ></i>
      <i
        class="fa-solid fa-times ${DANGER_COLOR} hover:scale-110 transition-transform cursor-pointer mr-2 todo-delete-btn"
      ></i>
    </div>
    </div>
    </div>`
  }
  updateParentEL() {
    this._parentEl = document.querySelector('.items-container')
  }
}
export { ChildProjectView }
