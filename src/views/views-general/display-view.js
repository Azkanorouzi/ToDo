import { View } from './view'
import { LISTEN_TO } from '../../helpers'

function addDisplayHandlers(handlers) {
  LISTEN_TO(document.querySelector('.display-container'), 'click', (e) => {
    const clicked = e.target
    if (clicked.closest('.display-project-plus-btn')) {
      handlers.handleDisplayProjectPlusBtn()
      return
    }
  })
}

export { addDisplayHandlers }