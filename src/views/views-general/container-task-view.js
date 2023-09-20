import { View } from './view.js'

class ContainerTaskView extends View {
  constructor() {
    super()
    this._parentEl = document.querySelector('.display-container')
  }

  _generateAssets(data) {
    this._assets = {
      name: data.name,
      // Todo childTodos name probably should be fixed
      id: data.id,
      curTheme: data.curTheme,
      icon: data.icon,
      star: data?.star ?? false,
    }
  }
  addEventListeners(handlers) {
    this._parentEl.addEventListener('click', (e) => {
      const clickedEl = e.target
      if (clickedEl.closest('.back-button')) handlers.handlerBackBtn()
      if (clickedEl.closest('.display-project-plus-btn'))
        handlers.handleDisplayProjectPlus()
    })
  }
}
export { ContainerTaskView }
