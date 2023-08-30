import { SAFE_COLOR, DANGER_COLOR, WARNING_COLOR } from '../../config'
import { ContainerTaskView } from '../views-general/container-task-view'
class EnvironmentView extends ContainerTaskView {
  _assets = {}
  constructor(data = null) {
    if (!data) throw new Error('data is required')
    this._generateAssets(data)
    this.children = this._assets.children
  }
  _generateHTML() {
    return `
    <section
    class="bg-theme-${this._assets.curTheme}-main flex flex-col gap-6 transition-transform absolute top-0 left-0 right-0 bottom-0 z-10 lg:bg-theme-${this._assets.curTheme}-second lg:overflow-scroll"
    data-theme="true"
    data-id="${this._assets.id}"
  >
    <!-- Nav  -->
    <nav
      class="bg-theme-${this._assets.curTheme}-main p-6 flex justify-between fixed top-0 left-0 right-0 bg-opacity-30 backdrop-blur-xl lg:sticky lg:justify-center"
      data-theme="true"
    >
      <!-- back button -->
      <div class="text-2xl text-theme-${this._assets.curTheme}-fifth cursor-pointer lg:hidden back-button" data-theme="true">
        <i class="fa-solid fa-arrow-left"></i>
      </div>
      <!-- Name of the Area -->
      <h1 class="text-2xl font-second text-theme-${this._assets.curTheme}-fifth lg:text-3xl" data-theme="true">
        <i class="fa-solid fa-dragon text-theme-${this._assets.curTheme}-third" data-theme="true"></i>
        ${this._assets.name}
      </h1>
    </nav>
    <!-- Project container -->
    <section
      class="text-theme-${this._assets.curTheme}-forth text-1xl flex flex-col gap-2 text-2xl rounded-sm p-5 pt-32 lg:pt-0 2xl:grid xl:grid-cols-2 items-container"
      data-theme="true"
    >
    </section>
    <!-- Plus button -->
    <div
      class="rounded-full w-12 h-12 grid place-content-center bg-theme--main text-3xl text-theme-${this._assets.curTheme}-forth fixed bottom-7 left-7 z-30 cursor-pointer hover:rotate-180 transition-transform lg:sticky lg:py-5 display-env-plus-btn"
      data-theme="true"
    >
      <i class="fa-solid fa-plus"></i>
    </div>
  </section>`
  }
}

export { EnvironmentView }
