import { LISTEN_TO } from '../../helpers'
import { View } from './view'

class ModalView extends View {
  importantMessage = 'Important!'
  shouldMessage = 'Relatively important'
  mightMessage = 'optional'
  _importanceMessage = ['Important!', 'Relatively important', 'optional']
  constructor(data) {
    super()
    if (!data) throw new Error('data is required')
    this._parentEl = document.querySelector('.modal-container')
  }
  _generateAssets(data) {
    this._assets.name = data.name
    this._assets.details = data.details
    this._assets.importance = data.importance
    // Todo childTodos name probably should be fixed
    this._assets.modalType = data.modalType.toLowerCase()
    this._assets.curTheme = data.curTheme
    this._assets.due = data.due
    this._assets.daysLeft = data.daysLeft
  }
  static addHandlers(handlers) {
    LISTEN_TO(document.querySelector('.modal'), 'click', (e) => {
      const clickedEl = e.target
      if (clickedEl.classList.contains('close-modal')) {
        handlers.handleClose()
        return
      }
      if (clickedEl.closest('.importance-button')) {
        handlers.handleImportanceBtn()
        return
      }
      if (clickedEl.closest('.add-display-modal-button')) {
        handlers.handleDisplayAdd(this._getInputsValue('display'))
        return
      }
      if (clickedEl.closest('.add-nav-modal-button')) {
        handlers.handleNav(this._getInputsValue())
        return
      }
      if (clickedEl.closest('.radio-button')) {
        handlers.handleNavRadioBtn()
        return
      }
      if (clickedEl.closest('.warning-modal-cancel')) {
        handlers.handleWarningModalCancel()
        return
      }
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
