class View {
  #parentEl = document.querySelector('.display-container')
  render() {
    this.#parentEl.innerHTML = this.#generateHTML(this.#data)
  }
}
// We need to export view because we just want to inherit it's properties and methods
export { View }
