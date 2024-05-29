let inputElement = document.getElementById("input") as HTMLInputElement;
let unordered_list = document.createElement("ul") as HTMLUListElement;
unordered_list.id = "unorderList";
document.body.appendChild(unordered_list);

let selectedItemsList: string[] = [];

type arrayType = {
  name: string;
  id: string;
};

const itemsArray: arrayType[] = JSON.parse(localStorage.getItem("store")!) ||
  JSON.parse(localStorage.getItem("list")!) || [
    { name: "Cook Biryani", id: 1 },
    { name: "Go to Gym", id: 2 },
    { name: "Study Javascript", id: 3 },
    { name: "Spend time with plants", id: 4 },
    { name: "Do Meditation", id: 5 },
    { name: "Learn Typing", id: 6 },
    { name: "Do walking", id: 7 },
    { name: "Watch Movie", id: 8 },
    { name: "Read Novel", id: 9 },
    { name: "Talk to friends", id: 10 },
    { name: "Play ludo", id: 11 },
  ];

let div = document.createElement("div") as HTMLDivElement;
div.classList.add("itemCounts-container");
document.body.appendChild(div);

let selectedItemsCount = document.createElement("span") as HTMLSpanElement;
selectedItemsCount.textContent = `Selected Items count : ${selectedItemsList.length}`;
selectedItemsCount.id = "span1";
div.appendChild(selectedItemsCount);

let unSelectedItemsCount = document.createElement("span") as HTMLSpanElement;
unSelectedItemsCount.textContent = `UnSelected Items count : ${
  itemsArray.length - selectedItemsList.length
}`;
unSelectedItemsCount.id = "span2";
div.appendChild(unSelectedItemsCount);

let totalItemsCount = document.createElement("span") as HTMLSpanElement;
totalItemsCount.textContent = `Total Items Count : ${itemsArray.length}`;
totalItemsCount.id = "span3";
div.appendChild(totalItemsCount);

let arrayLength = String(itemsArray.length);
for (let val of itemsArray) {
  addItem(val);
}
//delete function to delete items from the unordered list.
function Delete(todoId: string) {
  let del = document.getElementById(todoId) as HTMLElement;
  unordered_list.removeChild(del);
  let index = itemsArray.findIndex(
    (value: { name: string; id: string }) => value.id === todoId
  );
  itemsArray.splice(index, 1);
  save();
}
function addItem(val: { name: string; id: string }) {
  let todoId = `todo+ ${val.id}`;
  let ul = document.getElementById("unorderList") as HTMLElement;
  ul.classList.add("unorder-list");
  let list_container = document.createElement("div");
  list_container.classList.add("list-container");
  //write a function to show green color when I select the particular item and item will be striked and also written conditions for total count of items
  list_container.addEventListener("click", function (e: MouseEvent) {
    var element = e.target as HTMLElement;
    if (element.tagName === "LI") {
      list_container.classList.toggle("done");
      if (list_container.classList.contains("done")) {
        selectedItemsList.push(element.tagName);
        selectedItemsCount.innerHTML = `Selected Items count : ${selectedItemsList.length}`;
        var unSelected = itemsArray.length - selectedItemsList.length;
        unSelectedItemsCount.innerHTML = `UnSelected Items count :${unSelected}`;
      } else {
        selectedItemsList.pop();
        selectedItemsCount.innerHTML = `Selected Items count : ${selectedItemsList.length}`;
        var unSelected = itemsArray.length - selectedItemsList.length;
        unSelectedItemsCount.innerHTML = `UnSelected Items count :${unSelected}`;
      }
      totalItemsCount.textContent = `Total Items Count : ${itemsArray.length} `;
    }
  });
  list_container.id = todoId;
  ul.appendChild(list_container);
  // creating list item and added to list container
  let list_item = document.createElement("li");
  list_item.id = todoId;
  list_item.textContent = val.name;
  list_container.appendChild(list_item);
  // creating delete icon and added to list container
  let delete_icon = document.createElement("i");
  delete_icon.classList.add("bi", "bi-x", "delete-icon");
  list_container.appendChild(delete_icon);
  //giving onclick event to delete icon
  delete_icon.onclick = function () {
    Delete(todoId);
  };
  // write a consition for hiding the selected items, if i click the checkbox then items will be hidden, if I unclick it then it will unhide the all selected items.
  let checkbox = <HTMLInputElement>document.getElementById("checkId");
  checkbox.addEventListener("change", (e) => {
    var isChecked = checkbox.checked;
    if (isChecked && list_container.classList.contains("done")) {
      list_container.style.display = "none";
    } else {
      list_container.style.display = "block";
    }
  });
}
//adding addeventlistener to the add button
inputElement.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let value = inputElement.value;
    if (value === "") {
      alert("enter input");
    } else {
      arrayLength = arrayLength + 1;
      let newItem: {
        name: string;
        id: string;
      } = {
        name: value,
        id: arrayLength,
      };
      itemsArray.push(newItem);
      totalItemsCount.textContent = `Total Items Count : ${itemsArray.length} `;
      inputElement.value = "";
      addItem(newItem);
      save();
    }
  }
});

//creating one function to store array  into the localstorage.
function save() {
  localStorage.setItem("store", JSON.stringify(itemsArray));
}
