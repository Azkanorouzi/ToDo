import { View } from './view'

function addNavHandlers(handlers, curTheme) {
  document.addEventListener((e) => {
    const clicked = e.target
    if (clicked.closest('.theme-buttons-container')) {
      handlers.handleThemeButtonClick(curTheme)
    }
    if (clicked.closest('.nav-plus-btn')) {
      handlers.handleNavPlusBtn(curTheme)
    }
  })
}

export { addNavHandlers }
