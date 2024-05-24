var input = document.getElementById("in");
var Add_button = document.getElementById("add");
var unordered_list = document.createElement("ul");
unordered_list.id = "unorder";
document.body.appendChild(unordered_list);
var array = JSON.parse(localStorage.getItem("store")) || [
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
    var index = array.findIndex(function (value) { return value.id === todoId; });
    array.splice(index, 1);
    save();
}
function addItem(val) {
    var todoId = val.id;
    var ul = document.getElementById("unorder");
    ul.classList.add("un");
    //creating list container and added to unorder_list
    var list_container = document.createElement("div");
    list_container.classList.add("cont");
    list_container.id = todoId;
    ul.appendChild(list_container);
    // creating list item and added to list container
    var list_item = document.createElement("li");
    list_item.id = "item";
    list_item.textContent = val.name;
    list_container.appendChild(list_item);
    // creating delete icon and added to list container
    var delete_icon = document.createElement("i");
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
