import { View } from './view.js'

class ContainerTaskView extends View {
  _parentEl = document.querySelector('.display-container')
  _generateAssets(data) {
    this._assets.name = data.name
    // Todo childTodos name probably should be fixed
    this._assets.id = data.id
    this._assets.curTheme = data.curTheme
    this._assets.icon = data.icon
  }
  addEventListeners(handlers) {
    document
      .querySelector('.display-container')
      .addEventListener('click', (e) => {
        const clickedEl = e.target
        if (clickedEl.closest('.back-button')) handlers.handlerBackBtn()
        if (clickedEl.closest('.display-project-plus-btn'))
          handlers.handleDisplayProjectPlus()
      })
  }
}
export { ContainerTaskView }
