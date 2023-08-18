import { ChildView } from '../views-general/child-view'
import { SAFE_COLOR, DANGER_COLOR, WARNING_COLOR } from '../../config'

class TodoView extends ChildView {
  _parentEl = document.querySelector(
    `.todo-container[data-id="${this._data.parentId}"]`
  )
  _todoEl = document.querySelector(
    `.todo-container[data-id="${this._data.id}"]`
  )
  _assets = {}
  constructor(data = null) {
    if (!data) throw new Error('data is required')
    this._data = data
    this._generateAssets()
  }
  _generateHTML() {
    return `<div
    class="hover:bg-theme-${
      this._data.curTheme
    }-fifth rounded-md p-4 todo bg-theme-${this._data.curTheme}-${
      this._data.done ? 'fifth' : 'third'
    } flex items-center justify-between text-3xl relative border-l-4 border-l-theme-${
      this._data.curTheme
    }-fifth shadow-md shadow-theme-${
      this._data.curTheme
    }-main cursor-pointer transition-colors fade-in-left todo"
data-id="${this._data.id}>
    <div
      class="todo-check-button w-9 h-9 rounded-md bg-theme-${
        this._data.curTheme
      }-forth grid place-content-center"
    >
      <!-- When user checks the todo list -->
      <i class="fa-solid fa-check text-theme-${this._data.curTheme}-fifth ${
      this._data.done ? 'hidden' : ''
    }"></i>
    </div>
    <!-- Todo title -->
    <span class="${this._data.done ? 'line-through' : ''}"> ${
      this._data.name
    } </span>
    <!-- Todo icons container -->
    <div
      class="flex justify-between text-2xl md:text-3xl 2xl:text-4xl"
    >
      <!-- Menu -->
      <i
        class="fa-solid fa-bars text-theme-${
          this._data.curTheme
        }-forth mr-2 cursor-pointer hover:scale-110 transition-transform"
      ></i>
      <!-- Time clock -->
      <i
        class="${
          this._data.daysLeft === 0
            ? WARNING_COLOR
            : this._data.daysLeft > 0
            ? SAFE_COLOR
            : DANGER_COLOR
        } fa-solid fa-clock mr-2 cursor-pointer hover:scale-110 transition-transform"
      ></i>
      <!-- Importance button -->
      <i
        class="${
          this._data.importance === '1'
            ? WARNING_COLOR
            : this._data.importance === '0'
            ? SAFE_COLOR
            : DANGER_COLOR
        } fa-solid fa-circle cursor-pointer hover:scale-110 transition-transform"
      ></i>
    </div>
    <!-- Todo icons more -->
    <div
      class="text-3xl absolute bg-theme-${
        this._data.curTheme
      }-main z-10 p-4 rounded-r-full rounded-bl-full rotate-12 -bottom-16 -right-4 transition-all"
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
export { TodoView }
