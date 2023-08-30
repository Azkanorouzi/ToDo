import { View } from './view'
import { LISTEN_TO } from '../../helpers'

function addNavHandlers(handlers) {
  LISTEN_TO(
    document.querySelector('.theme-buttons-container'),
    'click',
    (e) => {
      console.log('hey')
      const clicked = e.target
      if (clicked.closest('.theme-button')) {
        handlers.handleThemeChange(clicked.dataset.selectedTheme)
      }
      if (clicked.closest('.nav-plus-btn')) {
        handlers.handleNavPlusBtn()
      }
    }
  )
}

export { addNavHandlers }
