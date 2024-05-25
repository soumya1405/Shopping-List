let input = document.getElementById("in") as HTMLInputElement;
let Add_button = document.getElementById("add") as HTMLButtonElement;
let unordered_list = document.createElement("ul") as HTMLUListElement;
unordered_list.id = "unorder";
document.body.appendChild(unordered_list);
const array = JSON.parse(localStorage.getItem("store")!) || [
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
//const array = JSON.parse(localStorage.getItem("store"));
let length1: string = array.length;
for (let val of array) {
  addItem(val);
}

function Delete(todoId: string) {
  let del = document.getElementById(todoId) as HTMLElement;
  unordered_list.removeChild(del);
  let index = array.findIndex(
    (value: { name: string; id: string }) => value.id === todoId
  );
  array.splice(index, 1);
  save();
}
function addItem(val: { name: string; id: string }) {
  let todoId = val.id;
  let ul = document.getElementById("unorder") as HTMLElement;
  ul.classList.add("un");
  //creating list container and added to unorder_list
  let list_container = document.createElement("div");
  list_container.classList.add("cont");
  list_container.addEventListener("click", function (e: MouseEvent) {
    var ele = e.target as HTMLElement;
    if (ele.tagName === "LI" || "DIV") {
      list_container.classList.toggle("done");
    }
  });
  list_container.id = todoId;
  ul.appendChild(list_container);
  // creating list item and added to list container
  let list_item = document.createElement("li");
  list_item.id = "item";
  list_item.textContent = val.name;
  list_container.appendChild(list_item);
  // creating delete icon and added to list container
  let delete_icon = document.createElement("i");
  delete_icon.classList.add("bi", "bi-x", "del");
  list_container.appendChild(delete_icon);
  //giving onclick event to delete icon
  delete_icon.onclick = function () {
    Delete(todoId);
  };
}
//adding addeventlistener to the add button
input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let value = input.value;
    if (value === "") {
      alert("enter input");
    } else {
      length1 = length1 + 1;
      let b: {
        name: string;
        id: string;
      } = {
        name: value,
        id: length1,
      };
      array.push(b);
      input.value = "";
      addItem(b);
      save();
    }
  }
});

//creating one function to store array  into the localstorage.
function save() {
  localStorage.setItem("store", JSON.stringify(array));
}
