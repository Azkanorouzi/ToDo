// State, Http library, Business logic: state is the data that needs to be stored in the front end it's for example the current page user is visiting in the case of todo list the todos that user creates before saving in backend or local storage it should be here in state and then when user gets back we should grab that data and put it back to state give it to controller so that then controller can order view to display those data, http library is fetch requests and interactons we have with the web if we're using an online api for example, business logic is the logic related to the core functionality fo our program in the case of todo list the objects and how they're implemented the todos functionalities and so on ...
state = {
  todo: {},
}
