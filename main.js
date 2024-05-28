var input = document.getElementById("in");
var Add_button = document.getElementById("add");
var unordered_list = document.createElement("ul");
var check = document.createElement("input");
check.type = "checkbox";
check.id = "checkId";
document.body.appendChild(check);
var list1 = JSON.parse(localStorage.getItem("list")) || [];
unordered_list.id = "unorder";
document.body.appendChild(unordered_list);
var array = JSON.parse(localStorage.getItem("store")) || JSON.parse(localStorage.getItem("list")) || [
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
var length1 = array.length;
for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
    var val = array_1[_i];
    addItem(val);
}
function Delete(todoId) {
    var del = document.getElementById(todoId);
    unordered_list.removeChild(del);
    unordered_list.removeChild(check);
    var index = array.findIndex(function (value) { return value.id === todoId; });
    array.splice(index, 1);
    save();
}
function addItem(val) {
    var todoId = "todo+".concat(val.id);
    var checkId = val.id;
    var ul = document.getElementById("unorder");
    ul.classList.add("un");
    // let check = document.createElement("input") as HTMLInputElement;
    // check.type = "checkbox";
    // check.id = checkId;
    // ul.appendChild(check);
    //creating list container and added to unorder_list
    var list_container = document.createElement("div");
    list_container.classList.add("cont");
    list_container.addEventListener("click", function (e) {
        var ele = e.target;
        if (ele.tagName === "LI") {
            list_container.classList.toggle("done");
            if (list_container.classList.contains("done")) {
                list1.push(ele.tagName);
                span1.innerHTML = "Selected Items count : ".concat(list1.length);
                var unS = array.length - list1.length;
                span2.innerHTML = "UnSelected Items count :".concat(String(unS));
            }
            else {
                list1.pop(ele.tagName);
                span1.innerHTML = "Selected Items count : ".concat(list1.length);
                var unS = array.length - list1.length;
                span2.innerHTML = "UnSelected Items count :".concat(String(unS));
            }
        }
        span3.textContent = "Total Items Count : ".concat(array.length, " ");
    });
    list_container.id = todoId;
    ul.appendChild(list_container);
    // creating list item and added to list container
    var list_item = document.createElement("li");
    list_item.id = "item";
    list_item.textContent = val.name;
    list_container.appendChild(list_item);
    // creating delete icon and added to list containerx
    var delete_icon = document.createElement("i");
    delete_icon.classList.add("bi", "bi-x", "del");
    list_container.appendChild(delete_icon);
    //giving onclick event to delete icon
    delete_icon.onclick = function () {
        Delete(todoId);
    };
    var checkbox = document.getElementById("checkId");
    checkbox.addEventListener("change", function (e) {
        console.log(checkbox);
        var isChecked = checkbox.checked;
        var C = e.target;
        if (isChecked && list_container.classList.contains("done,cont")) {
            list_container.style.display = "none";
        }
        else {
            list_container.style.display = "block";
        }
    });
}
var div = document.createElement("div");
div.classList.add("container");
document.body.appendChild(div);
var span1 = document.createElement("span");
span1.textContent = "Selected Items count : ".concat(list1.length);
span1.id = "span1";
div.appendChild(span1);
var span2 = document.createElement("span");
span2.textContent = "UnSelected Items count : ".concat(array.length - list1.length, " ");
span2.id = "span2";
div.appendChild(span2);
var span3 = document.createElement("span");
span3.textContent = "Total Items Count : ".concat(array.length);
span3.id = "span3";
div.appendChild(span3);
//adding addeventlistener to the add button
input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        var value = input.value;
        if (value === "") {
            alert("enter input");
        }
        else {
            length1 = length1 + 1;
            var b = {
                name: value,
                id: length1,
            };
            array.push(b);
            span3.textContent = "Total Items Count : ".concat(array.length, " ");
            input.value = "";
            addItem(b);
            save();
        }
    }
});
//creating one function to store array  into the localstorage.
function save() {
    localStorage.setItem("store", JSON.stringify(array));
    localStorage.setItem("list", JSON.stringify(list1));
}
