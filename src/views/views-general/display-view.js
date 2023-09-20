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
        clicked?.closest('.todo-container')?.querySelector('.todo')?.dataset
          ?.id ??
          clicked?.closest('.todo-container')?.querySelector('.child-project')
            ?.dataset?.id
      )
    }
    if (clicked.closest('.todo-check-button')) {
      handlers.handleTodoCheck(
        clicked.closest('.todo').dataset.id,
        clicked.closest('.todo')
      )
      return
    }
    if (clicked.classList.contains('fa-question') || clicked.closest('.todo')) {
      handlers.handleTaskInfoClick(
        clicked?.closest('.todo')?.dataset?.id ??
          clicked?.closest('.child-project')?.dataset?.id,
        clicked?.closest('.todo') ? 'Todo details' : 'Project details'
      )
      return
    }
    if (clicked.closest('.child-task')) {
      handlers.handleChildTaskClick(clicked.closest('.child-task').dataset.id)
      handlers.handleStandAloneProjectClick()
      return
    }
    if (clicked.closest('.back-button')) {
      handlers.handleBackButtonClick()
    }
  })
}

export { addDisplayHandlers }
