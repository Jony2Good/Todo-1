(function () {
  let listArray = [],
    listName = "";

  function createAppTitle(title) {
    let appTitle = document.createElement("h2");
    appTitle.innerHTML = title;
    return appTitle;
  }

  function createTodoItemForm() {
    let form = document.createElement("form");
    let input = document.createElement("input");
    let buttonWrapper = document.createElement("div");
    let button = document.createElement("button");

    form.classList.add("input-group", "mb-3");
    input.classList.add("form-control");
    input.placeholder = "Введите название нового дела";
    buttonWrapper.classList.add("input-group-append");
    button.classList.add("btn", "btn-primary");
    button.textContent = "Добавить дело";
    button.disabled = true;

    buttonWrapper.append(button);
    form.append(input);
    form.append(buttonWrapper);

    input.addEventListener("input", function () {
      if (input.value !== "") {
        button.disabled = false;
      } else {
        button.disabled = true;
      }
    });

    return {
      form,
      input,
      button,
    };
  }

  function createTodoList() {
    let list = document.createElement("ul");
    list.classList.add("list-group");
    return list;
  }

  function createTodoItem(obj) {
    let item = document.createElement("li");
    let buttonGroup = document.createElement("div");
    let doneButton = document.createElement("button");
    let deleteButton = document.createElement("button");

    item.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-center"
    );
    item.textContent = obj.name;

    buttonGroup.classList.add("btn-group", "btn-group-sm");
    doneButton.classList.add("btn", "btn-success");
    doneButton.textContent = "Готово";
    deleteButton.classList.add("btn", "btn-danger");
    deleteButton.textContent = "Удалить";

    if (obj.done == true) item.classList.add("list-group-item-success");

    doneButton.addEventListener("click", function () {
      item.classList.toggle("list-group-item-success");

      for (let listItem of listArray) {
        if (listItem.id == obj.id) listItem.done = !listItem.done;
      }
      saveList(listArray, listName);
    });
    deleteButton.addEventListener("click", function () {
      if (confirm("Вы уверены?")) {
        item.remove();

        for (let i = 0; i < listArray.length; i++) {
          if (listArray[i].id == obj.id) {
            listArray.splice(i, 1);
          }
        }
        saveList(listArray, listName);
      }
    });

    buttonGroup.append(doneButton);
    buttonGroup.append(deleteButton);
    item.append(buttonGroup);

    return {
      item,
      doneButton,
      deleteButton,
    };
  }

  function getNewId(arr) {
    let max = 0;
    for (const item of arr) {
      if (item.id > max) max = item.id;
    }
    return max + 1;
  }

  function saveList(arr, keyName) {
    localStorage.setItem(keyName, JSON.stringify(arr));
  }

  function createTodoApp(container, title = "Список дел", keyName) {
    let todoAppTittle = createAppTitle(title);
    let todoItemForm = createTodoItemForm();
    let todoList = createTodoList();

    listName = keyName;

    container.append(todoAppTittle);
    container.append(todoItemForm.form);
    container.append(todoList);

    let localData = localStorage.getItem(listName);
    if (localData !== null && localData !== "") {
      listArray = JSON.parse(localData);

      for (let itemList of listArray) {
        let todoItem = createTodoItem(itemList);
        todoList.append(todoItem.item);
      }
    }

    todoItemForm.form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!todoItemForm.input.value) {
        return;
      }

      let newTodoItem = {
        id: getNewId(listArray),
        name: todoItemForm.input.value,
        done: false,
      };
      let todoItem = createTodoItem(newTodoItem);

      listArray.push(newTodoItem);

      saveList(listArray, listName);

      todoList.append(todoItem.item);
      todoItemForm.disabled = true;
      todoItemForm.input.value = "";
    });
  }

  window.createTodoApp = createTodoApp;

  
})();


  let main = gsap.timeline();

main.from('.nav-link--first', {opacity: 0, y: 80, duration: 1})
  .from('.nav-link--second', {opacity: 0, y: 120, duration: 0.5})
  .from('.nav-link--third', {opacity: 0, y: 150, duration: 0.8})
  .from('.inner-todo', {opacity: 0, x: 200, duration: 0.5})
