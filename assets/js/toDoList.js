document.addEventListener("DOMContentLoaded", toDoList);
function toDoList() {
  var data = [];
  var input = document.getElementById("input-task");
  var buttonAdd = document.getElementById("add-task");
  var ulList = document.createElement("UL");
  function focusInput() {
    input.value = "";
    input.focus();
  }
  function deletTask(currentItem, event) {
    event.stopPropagation();
    data = data.filter(function (item) {
      return item.id != currentItem.id;
    });
    printList();
  }
  function doneTask(currentItem) {
    data = data.filter(function (item) {
      if (item.id === currentItem.id) {
        item.statuse = !currentItem.statuse;
      }
      return item;
    });
    printList();
  }

  function printList() {
    ulList.innerHTML = "";
    data.forEach(function (currentItem) {
      var LiElement = document.createElement("LI");
      var buttonRemove = document.createElement("BUTTON");
      var spanText = document.createElement("SPAN");
      if (currentItem.statuse === true) {
        spanText.classList.add("done");
      }
      buttonRemove.innerHTML = "X";
      spanText.innerHTML = currentItem.text;
      buttonRemove.addEventListener("click", function (event) {
        deletTask(currentItem, event);
      });
      spanText.addEventListener("click", function () {
        doneTask(currentItem);
      });
      LiElement.append(buttonRemove, spanText);
      ulList.appendChild(LiElement);
    });
    document.body.appendChild(ulList);
  }
  function addList() {
    valueInput = input.value.trim();
    if (valueInput.length === 0 || valueInput.length <= 3) {
      alert("please correct text");
      focusInput();
      return;
    }

    var dataIndex = {
      id: new Date().getTime(),
      text: input.value.trim(),
      statuse: false,
    };
    data.push(dataIndex);
    printList();
    focusInput();
  }
  buttonAdd.addEventListener("click", addList);
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      addList();
    }
  });
  console.log(data);
}
