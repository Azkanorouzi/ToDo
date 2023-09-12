import { View } from './view'
import { LISTEN_TO } from '../../helpers'

function addDisplayHandlers(handlers) {
  LISTEN_TO(document.querySelector('.display-container'), 'click', (e) => {
    const clicked = e.target
    if (clicked.closest('.display-project-plus-btn')) {
      handlers.handleDisplayProjectPlusBtn()
      return
    }
    if (clicked.closest('.display-env-plus-btn')) {
      handlers.handleDisplayEnvPlusBtn()
      return
    }
    if (clicked.closest('.todo-menu')) {
      handlers.handleTodoMenuClick(
        clicked.closest('.todo-container').querySelector('.todo-menu-container')
      )
      return
    }
    if (clicked.closest('.todo-delete-btn')) {
      handlers.handleDeleteTaskClick(
        clicked.closest('.todo-container').querySelector('.todo').dataset.id
      )
    }
    if (clicked.closest('.todo-check-button')) {
      handlers.handleTodoCheck(clicked.closest('.todo').dataset.id)
      return
    }
    if (clicked.classList.contains('fa-question') || clicked.closest('.todo')) {
      console.log(clicked.closest('.todo').dataset.id)
      handlers.handleTaskInfoClick(
        clicked.closest('.todo').dataset.id,
        'todo details'
      )
      return
    }
  })
}

export { addDisplayHandlers }
