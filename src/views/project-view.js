import { LimitedTaskView } from './limited-task-view'
class ProjectView extends LimitedTaskView {
  _assets = {}
  constructor(data = null) {
    if (!data) throw new Error('data is required')
    this._data = data
    this._generateAssets()
  }
  _generateHTML() {
    return `
    <section
    class="bg-theme-1-second flex flex-col gap-6 transition-transform absolute top-0 left-0 right-0 bottom-0 lg:overflow-scroll"
  >
    <!-- Nav  -->
    <nav
      class="bg-theme-1-main p-4 flex justify-between fixed top-0 left-0 right-0 bg-opacity-50 backdrop-blur-xl z-40 lg:sticky lg:justify-center"
    >
      <!-- back button -->
      <div class="text-2xl text-theme-1-fifth cursor-pointer lg:hidden">
      <i class="fa-solid fa-arrow-left"></i>
      </div>
      <!-- Name of the project -->
      <h1 class="text-2xl font-second text-theme-1-fifth lg:text-3xl">
        <i class="fa-solid fa-code text-theme-1-third"></i>
        ${this._data.name}
      </h1>
    </nav>
    <!-- Todos container -->
    <section
      class="text-theme-1-forth text-1xl flex flex-col gap-2 text-2xl rounded-sm p-5 pt-32 lg:pt-0 2xl:grid xl:grid-cols-2 items-container"
    >
      <!-- sample todo list -->
      <div
        class="hover:bg-theme-1-fifth rounded-md p-4 todo bg-theme-1-third flex items-center justify-between text-3xl relative border-l-4 border-l-theme-1-fifth shadow-md shadow-theme-1-main cursor-pointer transition-colors fade-in-left"
      >
        <div
          class="todo-check-button w-9 h-9 rounded-md bg-theme-1-forth grid place-content-center"
        >
          <!-- When user checks the todo list -->
          <!-- <i class="fa-solid fa-check text-theme-1-fifth "></i> -->
        </div>
        <!-- Todo title -->
        <span> Title </span>
        <!-- Todo icons container -->
        <div
          class="flex justify-between text-2xl md:text-3xl 2xl:text-4xl"
        >
          <!-- Menu -->
          <i
            class="fa-solid fa-bars text-theme-1-forth mr-2 cursor-pointer hhover:scale-110 transition-transform"
          ></i>
          <!-- Time clock -->
          <i
            class="text-green-300 fa-solid fa-clock mr-2 cursor-pointer hover:scale-110 transition-transform"
          ></i>
          <!-- Importance button -->
          <i
            class="fa-solid fa-circle text-red-600 cursor-pointer hover:scale-110 transition-transform"
          ></i>
        </div>
        <!-- Todo icons more -->
        <div
          class="text-3xl absolute bg-theme-1-main z-10 p-4 rounded-r-full rounded-bl-full rotate-12 -bottom-16 -right-4 transition-all"
        >
          <i
            class="fa-solid fa-edit text-yellow-500 hover:scale-110 transition-transform cursor-pointer"
          ></i>
          <i
            class="fa-solid fa-share text-blue-500 hover:scale-110 transition-transform cursor-pointer"
          ></i>
          <i
            class="fa-solid fa-times text-red-400 hover:scale-110 transition-transform cursor-pointer"
          ></i>
        </div>
      </div>
    </section>
    <!-- Plus button -->
    <div
      class="rounded-full w-14 h-14 grid place-content-center bg-theme-1-main text-3xl text-theme-1-forth fixed bottom-7 left-7 z-30 lg:sticky lg:py-5 cursor-pointer hover:rotate-180 transition-transform"
    >
      <i class="fa-solid fa-plus"></i>
    </div>
  </section>`
  }
}

export { ProjectView }
