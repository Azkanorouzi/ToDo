import { LISTEN_TO } from '../../helpers'
import { View } from './view'
import { SAFE_COLOR_BG, WARNING_COLOR_BG, DANGER_COLOR_BG } from '../../config'
class ModalView extends View {
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
        handlers.handleImportanceBtn(
          +clickedEl.dataset.importance,
          clickedEl,
          [SAFE_COLOR_BG, WARNING_COLOR_BG, DANGER_COLOR_BG],
          document.querySelector('.importance-text')
        )
        return
      }
      if (clickedEl.closest('.add-display-modal-button')) {
        handlers.handleDisplayAdd(
          _getInputsValue('display'),
          clickedEl.closest('.modal').dataset.addType
        )
        return
      }
      if (clickedEl.closest('.add-nav-modal-button')) {
        handlers.handleDisplayAdd(
          _getInputsValue(),
          clickedEl.closest('.modal').dataset.addType
        )
        return
      }
      if (clickedEl.closest('[type="radio"]')) {
        handlers.handleNavRadioBtn(
          clickedEl.value,
          document.querySelectorAll('.env-hidden')
        )
        return
      }
      if (clickedEl.closest('.warning-modal-ok')) {
        handlers.handleWarningDeleteOk()
        return
      }
    })
  }
}
function _getInputsValue() {
  const modal = document.querySelector('.modal')
  const selectedTitleInput = modal.querySelector('.title-input').value
  const selectedDetailsInput = modal.querySelector('.details-input').value
  const selectedDateInput = modal.querySelector('.date-input').value
  const selectedImportanceInput =
    modal.querySelector('.importance-button').dataset.importance
  const selectedType = modal.querySelector('[type="radio"]:checked').value

  return {
    title: selectedTitleInput,
    details: selectedDetailsInput,
    date: selectedDateInput,
    importance: selectedImportanceInput,
    selectedType,
  }
}
export { ModalView }
