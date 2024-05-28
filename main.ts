let input = document.getElementById("in") as HTMLInputElement;
let Add_button = document.getElementById("add") as HTMLButtonElement;
let unordered_list = document.createElement("ul") as HTMLUListElement;
let check = document.createElement("input") as HTMLInputElement;
check.type = "checkbox";
check.id = "checkId";
document.body.appendChild(check);
let list1:any = [];
unordered_list.id = "unorder";
document.body.appendChild(unordered_list);
const array = JSON.parse(localStorage.getItem("store")!) || JSON.parse(localStorage.getItem("list")!) || [
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
  // span3.textContent = `Total Items Count : ${array.length} `;
}
function addItem(val: { name: string; id: string }) {
  let todoId = `todo+${val.id}`;
  let checkId = val.id;
  let ul = document.getElementById("unorder") as HTMLElement;
  ul.classList.add("un");
  let list_container = document.createElement("div");
  list_container.classList.add("cont");
  list_container.addEventListener("click", function (e: MouseEvent) {
    var ele = e.target as HTMLElement;
    if (ele.tagName === "LI") {
      list_container.classList.toggle("done");
      if (list_container.classList.contains("done")) {
        list1.push(ele.tagName);
        span1.innerHTML = `Selected Items count : ${list1.length}`;
        var unS = array.length - list1.length;
        span2.innerHTML = `UnSelected Items count :${String(unS)}`;
      } else {
        list1.pop(ele.tagName);
        span1.innerHTML = `Selected Items count : ${list1.length}`;
        var unS = array.length - list1.length;
        span2.innerHTML = `UnSelected Items count :${String(unS)}`;
      }
    }
    span3.textContent = `Total Items Count : ${array.length} `;
  });
  list_container.id = todoId;
  ul.appendChild(list_container);
  // creating list item and added to list container
  let list_item = document.createElement("li");
  list_item.id = "item";
  list_item.textContent = val.name;
  list_container.appendChild(list_item);
  // creating delete icon and added to list containerx
  let delete_icon = document.createElement("i");
  delete_icon.classList.add("bi", "bi-x", "del");
  list_container.appendChild(delete_icon);
  //giving onclick event to delete icon
  delete_icon.onclick = function () {
    Delete(todoId);
  };
  let checkbox = <HTMLInputElement>document.getElementById("checkId");
  checkbox.addEventListener("change", (e) => {
    console.log(checkbox);
    var isChecked = checkbox.checked;
    var C = e.target as HTMLElement;
    if (isChecked && list_container.classList.contains("done")) {
      list_container.style.display = "none";
    } else {
      list_container.style.display = "block";
    }
  });
}

let div = document.createElement("div") as HTMLDivElement;
div.classList.add("container");
document.body.appendChild(div);

let span1 = document.createElement("span") as HTMLSpanElement;
span1.textContent = `Selected Items count : ${list1.length}`;
span1.id = "span1";
div.appendChild(span1);

let span2 = document.createElement("span") as HTMLSpanElement;
span2.textContent = `UnSelected Items count : ${array.length - list1.length} `;
span2.id = "span2";
div.appendChild(span2);

let span3 = document.createElement("span") as HTMLSpanElement;
span3.textContent = `Total Items Count : ${array.length}`;
span3.id = "span3";
div.appendChild(span3);

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
      span3.textContent = `Total Items Count : ${array.length} `;
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
