class View {
  // ParentEl typically would be display container
  #parentEl = document.querySelector('.display-container')
  /**
   * Renders the view
   * @sideEffect this method renders the display in the parent element of whichever object it was called upon and therefore it modifies the DOM
   * @param {boolean} clear in case we don't want our parent element to be cleared before injecting our generated html we set this parameter to false (default:true)
   */
  render(clear = true) {
    if (clear) this.#clear()
    // Generating assets
    this.#generateAssets()
    // Injection
    this.#parentEl.innerHTML += this.#generateHTML(this.#assets)
  }
  #clear() {
    this.#parentEl.innerHTML = ''
  }
}
// We need to export view and not an instance because we just want to inherit it's properties and methods
export { View }
