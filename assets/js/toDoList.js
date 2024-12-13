document.addEventListener("DOMContentLoaded", () => {
  var data = localStorage.getItem("data") === null ? [] 
                : JSON.parse(localStorage.getItem("data")) 
              console.log(data)

  var input = document.getElementById("input-task");
  var buttonAdd = document.getElementById("add-task");
  var ulList = document.getElementById("list-task");

  var focusInput = () => (input.value = "", input.focus());

  var doneTask = (currentItem, taskMap) => { //finde & change current item in object
    if (taskMap.has(currentItem.id)) {
      var item = taskMap.get(currentItem.id);
      item.statuse = !item.statuse;
      taskMap.set(currentItem.id, item);
    }
  };

  var renderElement = ({ id, text, statuse }) => {
    var li = document.createElement("LI");
    var buttonRemove = document.createElement("BUTTON");
    var spanText = document.createElement("SPAN");

    buttonRemove.innerHTML = "X";
    spanText.innerHTML = text;
    if (statuse) {spanText.classList.add("done")};
    buttonRemove.classList.add("remove-button")

    li.append(spanText, buttonRemove);

    li.addEventListener("click", (event) => {
      var taskMap = new Map(data.map(item => [item.id, item])); //Iterator
      if (event.target === buttonRemove) {taskMap.delete(id)}
      else {doneTask({ id, statuse }, taskMap)};
      data = Array.from(taskMap.values());
      printList();
    });

    return li;
  };

  var printList = () => {
    localStorage.setItem("data", JSON.stringify(data))
    ulList.innerHTML = "";
    data.forEach(item => ulList.appendChild(renderElement(item)));
  };

  var addList = () => {
    var valueInput = input.value.trim();
    if (valueInput.length <= 3 || valueInput.length===0) {
      return alert("Please enter a valid task"), focusInput();
    }
    data.push({ id: Date.now(),
                text: valueInput,
                statuse: false 
              });
    printList();
    focusInput();
  };

  buttonAdd.addEventListener("click", addList);
  input.addEventListener("keydown", (e) => e.key === "Enter" && addList());
  printList();
});
