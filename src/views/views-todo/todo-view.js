import { ChildView } from '../views-general/child-view'
import { SAFE_COLOR, DANGER_COLOR, WARNING_COLOR } from '../../config'

class TodoView extends ChildView {
  _assets = {}
  constructor(data = null) {
    super(data)
    this._generateAssets(data)
    this._parentEl = document.getElementById(`${this._assets.parentId}`)
    this.__class__ = 'TodoView'
  }
  _generateHTML() {
    const markup = `
    <div class="relative todo-container order-${
      (this._assets.importance - 3) * -1
    } "${this._assets.done ? 'style="order: 4;"' : ''}>
    <div
    class="hover:bg-theme-${
      this._assets.curTheme
    }-fifth rounded-md p-2 lg:p-3 todo bg-theme-${this._assets.curTheme}-${
      this._assets.done ? 'fifth' : 'third'
    } flex items-center justify-between text-sm lg:text-3xl relative border-l-4 border-l-theme-${
      this._assets.curTheme
    }-fifth shadow-md shadow-theme-${
      this._assets.curTheme
    }-main cursor-pointer transition-colors fade-in-left child-task -z-50 "
    data-theme="true"
data-id="${this._assets.id}"
>
    <div
      class="todo-check-button w-9 h-9 rounded-md bg-theme-${
        this._assets.curTheme
      }-forth grid place-content-center"
      data-theme="true"
    >
      <!-- When user checks the todo list -->
      <i class="fa-solid fa-check text-theme-${this._assets.curTheme}-fifth ${
      this._assets.done ? '' : 'hidden'
    }" data-theme="true"></i>
    </div>
    <!-- Todo title -->
    <span class="todo-text ${
      this._assets.done ? 'line-through' : ''
    } tsk-name"> ${this._assets.name || 'Untitled'} </span>
    <!-- Todo icons container -->
    <div
      class="flex justify-between text-2xl md:text-3xl 2xl:text-4xl"
    >
      <!-- Menu -->
      <i
        class="fa-solid fa-bars text-theme-${
          this._assets.curTheme
        }-forth mr-2 cursor-pointer hover:scale-110 transition-transform todo-menu"
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
        } fa-solid fa-clock mr-2 transition-transform"
      ></i>
      <!-- Importance button -->
      <i
        class="${
          this._assets.importance == '1'
            ? WARNING_COLOR
            : this._assets.importance == '0'
            ? SAFE_COLOR
            : DANGER_COLOR
        } fa-solid fa-circle transition-transform mr-2 "
        data-theme="true"
      ></i>
      <!-- Details button -->
      <i
        class="fa-solid fa-question ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer"
      ></i>
    </div>
  </div>
  <!-- Todo icons more -->
  <div
    class="text-3xl absolute bg-theme-${
      this._assets.curTheme
    }-main p-4 rounded-r-full rounded-bl-full -bottom-16 -right-0 transition-all z-10 hidden todo-menu-container opacity-0 "
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
  `
    this._parentEl = document.querySelector(`.items-container`)
    return markup
  }
  updateParentEl() {
    this._parentEl = document.querySelector(`.items-container`)
  }
}
export { TodoView }
