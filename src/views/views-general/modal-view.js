import { View } from './view'

class ModalView extends View {
  importantMessage = 'Important!'
  shouldMessage = 'Relatively important'
  mightMessage = 'optional'
  _importanceMessage = ['Important!', 'Relatively important', 'optional']
  constructor(data) {
    if (!data) throw new Error('data is required')
    this._generateAssets(data)
    this._parentEl = document.querySelector('main')
  }
  _generateAssets(data) {
    this._assets.name = data.name
    this._assets.details = data.details
    this._assets.importance = data.importance
    // Todo childTodos name probably should be fixed
    this._assets.modalType = data.modalType.toLower()
    this._assets.curTheme = data.curTheme
  }
  addHandlers(handlers) {
    document.querySelector('.modal').addEventListener('click', (e) => {
      const clickedEl = e.target
      if (clickedEl.closest('.close-modal')) handlers.handleClose()
      if (clickedEl.closest('.importance-button'))
        handlers.handleImportanceBtn()
      if (clickedEl.closest('.add-display-modal-button'))
        handlers.handleDisplayAdd(this._getInputsValue('display'))
      if (clickedEl.closest('.add-nav-modal-button'))
        handlers.handleNav(this._getInputsValue())
      if (clickedEl.closest('.radio-button')) handlers.handleNavRadioBtn()
      if (clickedEl.closest('.warning-modal-cancel'))
        handlers.handleWarningModalCancel()
    })
  }
  _getInputsValue() {
    const modal = document.querySelector('.modal')
    const selectedTitleInput = modal.querySelector('.title-input').value
    const selectedDetailsInput = modal.querySelector('.details-input').value
    const selectedDateInput = modal.querySelector('.date-input').value
    const selectedImportanceInput =
      modal.querySelector('.importance-input').dataset.importance

    return {
      selectedTitleInput,
      selectedDetailsInput,
      selectedDateInput,
      selectedImportanceInput,
    }
  }
}
export { ModalView }
