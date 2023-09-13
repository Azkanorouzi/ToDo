import { DANGER_COLOR_BG, SAFE_COLOR_BG, WARNING_COLOR_BG } from '../config'
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

export function addNavTaskHandlers(handlers) {
  const standAloneProjectContainer = document.querySelector('nav')
  if (!standAloneProjectContainer) return
  return LISTEN_TO(standAloneProjectContainer, 'click', (e) => {
    const clicked = e.target

    if (clicked.classList.contains('fa-question')) {
      handlers.handleTaskInfoClick(
        clicked.closest('.child-task')?.dataset.id ??
          clicked.closest('.environment')?.dataset.id,
        (() => (clicked.closest('.project') ? 'project details' : 'details'))()
      )
      return
    }
    if (clicked.closest('.child-more-btn')) {
      handlers.handleChildMoreClick(
        clicked.closest('.child-task').querySelector('.more')
      )
      return
    }
    if (clicked.closest('.child-less-btn')) {
      handlers.handleChildLessClick(
        clicked.closest('.child-task').querySelector('.more')
      )
      return
    }
    if (clicked.closest('.child-delete-btn')) {
      handlers.handleDeleteTaskClick(
        clicked.closest('.child-task')?.dataset.id ??
          clicked.closest('.environment')?.dataset.id
      )
    }
    if (clicked.closest('.child-task')) {
      handlers.handleChildTaskClick(clicked.closest('.child-task').dataset.id)
      return
    }
    if (clicked.closest('.environment')) {
      handlers.handleChildTaskClick(clicked.closest('.environment').dataset.id)
    }
  })
}
export function generateModalInfo(task, view, modalType, curTheme) {
  return new view({
    name: task?.name ?? task?.title,
    details: task.details,
    importance: task.importance,
    modalType: modalType,
    curTheme: curTheme,
    due: task.due,
    ...(() => {
      if (task?.getDaysLeft) return [task.getDaysLeft()]
    })(),
  })
}
export function generateModal(view, modalType, curTheme) {
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

export function closeMoreChildTaskIcons(moreIconsContainer) {
  moreIconsContainer.classList.remove('fade-in-left')
  moreIconsContainer.classList.add('fade-out')
  LISTEN_TO(moreIconsContainer, 'animationend', () => {
    moreIconsContainer.classList.add('hidden')
  })
}
export function openMoreChildTaskIcons(moreIconsContainer) {
  moreIconsContainer.classList.remove('fade-out')
  moreIconsContainer.classList.remove('hidden')
  moreIconsContainer.classList.add('fade-in-left')
  LISTEN_TO(moreIconsContainer, 'animationend', () => {
    moreIconsContainer.classList.remove('hidden')
  })
}
export function removeTaskFromDom(taskId, taskType) {
  const taskEl =
    taskType === 'todo'
      ? document
          .querySelector(`[data-id="${taskId}"]`)
          .closest('.todo-container')
      : document.querySelector(`[data-id="${taskId}"]`)
  taskEl.classList.add('fade-out')
  LISTEN_TO(taskEl, 'animationend', () => {
    taskEl.remove()
  })
}
export function addLoadHandler(handler) {
  return LISTEN_TO(window, 'load', handler)
}
export function hideElements(elements) {
  elements.forEach((el) => el.classList.add('hidden'))
}
export function showElements(elements) {
  elements.forEach((el) => el.classList.remove('hidden'))
}
export function removeImportanceColor(importanceButton) {
  importanceButton.classList.remove(
    SAFE_COLOR_BG,
    WARNING_COLOR_BG,
    DANGER_COLOR_BG
  )
}
export function updateViewProgress(id, progress) {
  const progressEl = document.querySelector(
    `[data-id = ${id}] > .project-progress`
  )
  if (!progressEl) return
  progressEl.style.width = progress
}
export function triggerTodoMenu(todoMenu) {
  todoMenu.classList.toggle('fade-in')
  todoMenu.classList.toggle('hidden')
}
export function updateCheckedTodo(el, curTheme) {
  const todoCheckButton = el.querySelector('.fa-check')
  const todoText = el.querySelector('.todo-text')
  todoText.classList.toggle('line-through')
  todoCheckButton.classList.toggle('hidden')
  el.closest('.todo-container').style.order = el.closest('.todo-container')
    .style.order
    ? ''
    : '4'
  console.log(el.style.order)
  if (el.classList.contains(`bg-theme-${curTheme}-third`)) {
    el.classList.remove(`bg-theme-${curTheme}-third`)
    el.classList.add(`bg-theme-${curTheme}-fifth`)
    return
  }
  el.classList.remove(`bg-theme-${curTheme}-fifth`)
  el.classList.add(`bg-theme-${curTheme}-third`)
}
