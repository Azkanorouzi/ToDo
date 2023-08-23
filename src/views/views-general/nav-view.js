import { View } from './view'

function addNavHandlers(handlers) {
  document
    .querySelector('.theme-buttons-container')
    .addEventListener('click', (e) => {
      const clicked = e.target
      if (clicked.closest('.theme-button')) {
        handlers.handleThemeChange(clicked.dataset.selectedTheme)
      }
      if (clicked.closest('.nav-plus-btn')) {
        handlers.handleNavPlusBtn()
      }
    })
}

export { addNavHandlers }
