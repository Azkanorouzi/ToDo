import { View } from './view'
import { LISTEN_TO } from '../../helpers'

function addNavHandlers(handlers) {
  LISTEN_TO(document.querySelector('nav'), 'click', (e) => {
    const clicked = e.target
    if (clicked.closest('.theme-button')) {
      handlers.handleThemeChange(clicked.dataset.selectedTheme)
      return
    }
    if (clicked.closest('.star-button')) {
      handlers.handleStarButtonClick(
        clicked.querySelector('.star') ?? clicked,
        document.querySelectorAll('[data-star="true"]')
      )
      return
    }
    if (clicked.closest('.nav-plus-btn')) {
      handlers.handleNavPlusBtn()
      return
    }
  })
}

export { addNavHandlers }
