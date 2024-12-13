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

  function doneTask(currentItem, Iterator) {
    if (Iterator.has(currentItem.id)) {
      const item = Iterator.get(currentItem.id);
      item.statuse = !item.statuse;
      Iterator.set(currentItem.id, item);
    }
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
      LiElement.addEventListener("click", function (event) {
        var Iterator = new Map(data.map((item) => [item.id, item]));
        if (event.target === buttonRemove) {
          Iterator.delete(currentItem.id);
          console.log("delet");
        } else {
          doneTask(currentItem, Iterator);
          console.log("done");
        }
        data = Array.from(Iterator.values()); ///==> convert to array by value
        printList();
      });

      LiElement.append(spanText, buttonRemove);
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
}
