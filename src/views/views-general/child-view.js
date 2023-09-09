import { View } from './view'

class ChildView extends View {
  addHandlers(handlers) {
    document
      .querySelector(`.childTask[data-id=${this._assets.id}]`)
      .addEventListener('click', (e) => {
        const clickedEl = e.target
        if (clickedEl.closest('.child-more-btn')) handlers.handleMenuOpen()
        if (clickedEl.closest('.child-info-btn')) handlers.handleChildInfoBtn()
        if (clickedEl.closest('.child-delete-btn'))
          handlers.handleDeleteTaskBtn(clickedEl)
        if (clickedEl.closest('.child-less-btn')) handlers.handleMenuClose()
        if (clickedEl.closest('.child-move-btn')) handlers.handleMoveTaskBtn()
        if (clickedEl.closest('.child-edit-btn')) handlers.handleEditTaskBtn()
        if (clickedEl.closest('.child-task')) handlers.handleChildTaskClick()
      })
  }
  _generateAssets(data) {
    this._assets = {
      name: data.name,
      // Todo childTodos name probably should be fixed
      daysLeft: data.daysLeft,
      id: data.id,
      parentId: data.parentId,
      taskType: data.taskType?.toLowerCase(),
      curTheme: data.curTheme,
      progress: data.progress,
    }
    if (this._assets.taskType === 'Project')
      this._assets.progress = data.progress
    if (this._assets.taskType === 'ToDo') return
    this._assets.done = data.done
  }
}
export { ChildView }
