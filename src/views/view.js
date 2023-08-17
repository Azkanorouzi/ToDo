class View {
  // ParentEl typically would be display container
  #parentEl = document.querySelector('.display-container')
  /**
   * Renders the view
   * @sideEffect this method renders the display in the parent element of whichever object it was called upon and therefore it modifies the DOM
   * @param {boolean} clear in case we don't want our parent element to be cleared before injecting our generated html we set this parameter to false (default:true)
   * @param {obj} data data that we get from the add module
   */
  render(clear = true) {
    if (clear) this.#clear()
    // Injection
    this.#parentEl.innerHTML += this._generateHTML()
  }
  renderSpinner(clear = true) {
    if (clear) this.#clear()
    this.#parentEl.innerHTML += this.#generateSpinner()
  }
  #clear() {
    this.#parentEl.innerHTML = ''
  }
  #generateSpinner() {
    return `
    <section
    class="absolute left-0 top-0 right-0 bottom-0 z-50 grid place-content-center bg-gradient-to-l from-theme-${this._data.curTheme}-second to-theme-${this._data.curTheme}-main loading-module bg fade-out animation-delay-7"
  >
    <i
      class="fa-solid fa-dragon text-theme-${this._data.curTheme}-fifth text-9xl animate-pulse"
    ></i>
  </section>`
  }
}
// We need to export view and not an instance because we just want to inherit it's properties and methods
export { View }
