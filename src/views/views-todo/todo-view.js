import { ChildView } from '../views-general/child-view'
import { SAFE_COLOR, DANGER_COLOR, WARNING_COLOR } from '../../config'

class TodoView extends ChildView {
  _assets = {}
  constructor(data = null) {
    super(data)
    this._generateAssets(data)
    this._parentEl = document.getElementById(`${this._assets.parentId}`)
  }
  _generateHTML() {
    const markup = `<div
    class="hover:bg-theme-${
      this._assets.curTheme
    }-fifth rounded-md p-4 todo bg-theme-${this._assets.curTheme}-${
      this._assets.done ? 'fifth' : 'third'
    } flex items-center justify-between text-3xl relative border-l-4 border-l-theme-${
      this._assets.curTheme
    }-fifth shadow-md shadow-theme-${
      this._assets.curTheme
    }-main cursor-pointer transition-colors fade-in-left child-task"
data-id="${this._assets.id}
data-theme="true">
    <div
      class="todo-check-button w-9 h-9 rounded-md bg-theme-${
        this._assets.curTheme
      }-forth grid place-content-center"
      data-theme="true"
    >
      <!-- When user checks the todo list -->
      <i class="fa-solid fa-check text-theme-${this._assets.curTheme}-fifth ${
      this._assets.done ? 'hidden' : ''
    }" data-theme="true"></i>
    </div>
    <!-- Todo title -->
    <span class="${this._assets.done ? 'line-through' : ''}"> ${
      this._assets.name
    } </span>
    <!-- Todo icons container -->
    <div
      class="flex justify-between text-2xl md:text-3xl 2xl:text-4xl"
    >
      <!-- Menu -->
      <i
        class="fa-solid fa-bars text-theme-${
          this._assets.curTheme
        }-forth mr-2 cursor-pointer hover:scale-110 transition-transform"
        data-theme="true"
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
        data-theme="true"
      ></i>
    </div>
    <!-- Todo icons more -->
    <div
      class="text-3xl absolute bg-theme-${
        this._assets.curTheme
      }-main z-10 p-4 rounded-r-full rounded-bl-full rotate-12 -bottom-16 -right-0 transition-all"
      data-theme="true"
    >
      <i
        class="fa-solid fa-edit ${WARNING_COLOR} hover:scale-110 transition-transform cursor-pointer child-edit-btn"
      ></i>
      <i
        class="fa-solid fa-share ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer child-move-btn"
      ></i>
      <i
        class="fa-solid fa-times ${DANGER_COLOR} hover:scale-110 transition-transform cursor-pointer mr-2"
      ></i>
      <!-- Details button -->
      <i
        class="fa-solid fa-question ${SAFE_COLOR} hover:scale-110 transition-transform cursor-pointer"
      ></i>
    </div>
  </div>`
    this._parentEl = document.querySelector(`.items-container`)
    return markup
  }
}
export { TodoView }
