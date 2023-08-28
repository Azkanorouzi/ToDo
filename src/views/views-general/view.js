class View {
  /**
   * Renders the view
   * @sideEffect this method renders the display in the parent element of whichever object it was called upon and therefore it modifies the DOM
   * @param {boolean} clear in case we don't want our parent element to be cleared before injecting our generated html we set this parameter to false (default:true)
   * @param {obj} data data that we get from the add module
   */
  _assets = {}
  render(clear = true, thisIsAChild = false) {
    if (clear) this.#clear()
    this.renderSpinner()

    // Injection
    this._parentEl.innerHTML += this._generateHTML()
    if (thisIsAChild) this._getThisEl(this.assets.taskType)
  }
  renderSpinner(clear = true) {
    if (clear) this.#clear()
    this._parentEl.innerHTML += this.#generateSpinner()
  }
  #clear() {
    this._parentEl.innerHTML = ''
  }
  #generateSpinner() {
    return `
    <section
    class="absolute left-0 top-0 right-0 bottom-0 z-50 grid place-content-center bg-gradient-to-l from-theme-${this._assets.curTheme}-second to-theme-${this._assets.curTheme}-main loading-module bg animation-delay-7 fade-out"
  >
    <i
      class="fa-solid fa-dragon text-theme-${this._assets.curTheme}-fifth text-9xl animate-pulse"
    ></i>
  </section>`
  }

  #hideSpinner() {
    const loadingModule = document.querySelector('.loading-module')
    loadingModule.classList.add('fade-out')
  }
}
// We need to export view and not an instance because we just want to inherit it's properties and methods
export { View }
