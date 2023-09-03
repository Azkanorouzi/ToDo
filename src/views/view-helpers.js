import { GET_ALL_THEME_EL, LISTEN_TO } from '../helpers'
// General functions
/**
 * given the old theme and new theme numbers this function will iterate through an array consisting of all elements that contain theme classes and will change those classes to achieve the desired outcome
 * @param {number} newTheme a number starting from 1 representing the new theme
 * @param {number} oldTheme a number starting from 1 representing the old theme
 */
export function changeTheme(newTheme, oldTheme) {
  GET_ALL_THEME_EL().forEach((el) => {
    const newClassList = Array.from(el.classList).map((className) => {
      if (!className.includes(`theme-${oldTheme}`)) return className
      return className.replace(oldTheme, newTheme)
    })
    el.classList = newClassList.join(' ')
  })
}
export function addDefaultChildProjectsHandler(handlers) {
  const defProjectContainer = document.querySelector(
    '.default-projects-container'
  )
  console.log(defProjectContainer)
  if (!defProjectContainer) return
  return LISTEN_TO(defProjectContainer, 'click', (e) => {
    const clicked = e.target
    if (clicked.classList.contains('fa-question')) {
      handlers.handleTaskInfoClick(clicked.closest('.child-task').dataset.id)
      return
    }
    if (clicked.closest('.child-task')) {
      console.log(clicked, clicked.closest('.child-task'), 'asfd')
      handlers.handleChildTaskClick(clicked.closest('.child-task').dataset.id)
    }
  })
}

export function generateModalInfo(task, view, modalType, curTheme) {
  console.log(task)
  return new view({
    name: task.name,
    details: task.details,
    importance: task.importance,
    modalType: modalType,
    curTheme: curTheme,
    due: task.due,
    daysLeft: task.getDaysLeft(),
  })
}
export function generateAddModal(view, modalType, curTheme) {
  console.log(curTheme, 'asfd')
  return new view({
    modalType,
    curTheme,
  })
}
export function closeModal() {
  const modalCard = document.querySelector('.modal-card')
  modalCard.classList.add('flip-out-tl')
  const modal = document.querySelector('.modal')
  modal.classList.add('fade-out')
  LISTEN_TO(modalCard, 'animationend', () => {
    modal.remove()
  })
}

export function addLoadHandler(handler) {
  return LISTEN_TO(window, 'load', handler)
}
