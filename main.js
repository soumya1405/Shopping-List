var inputElement = document.getElementById("input");
var unordered_list = document.createElement("ul");
unordered_list.id = "unorderList";
document.body.appendChild(unordered_list);
var selectedItemsList = [];
var itemsArray = JSON.parse(localStorage.getItem("store")) ||
    JSON.parse(localStorage.getItem("list")) || [
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
var div = document.createElement("div");
div.classList.add("itemCounts-container");
document.body.appendChild(div);
var selectedItemsCount = document.createElement("span");
selectedItemsCount.textContent = "Selected Items count : ".concat(selectedItemsList.length);
selectedItemsCount.id = "span1";
div.appendChild(selectedItemsCount);
var unSelectedItemsCount = document.createElement("span");
unSelectedItemsCount.textContent = "UnSelected Items count : ".concat(itemsArray.length - selectedItemsList.length);
unSelectedItemsCount.id = "span2";
div.appendChild(unSelectedItemsCount);
var totalItemsCount = document.createElement("span");
totalItemsCount.textContent = "Total Items Count : ".concat(itemsArray.length);
totalItemsCount.id = "span3";
div.appendChild(totalItemsCount);
var arrayLength = itemsArray.length;
for (var _i = 0, itemsArray_1 = itemsArray; _i < itemsArray_1.length; _i++) {
    var val = itemsArray_1[_i];
    addItem(val);
}
//delete function to delete items from the unordered list.
function Delete(todoId) {
    var del = document.getElementById(todoId);
    unordered_list.removeChild(del);
    var index = itemsArray.findIndex(function (value) { return value.id === todoId; });
    itemsArray.splice(index, 1);
    save();
}
function addItem(val) {
    var todoId = "todo+ ".concat(val.id);
    var ul = document.getElementById("unorderList");
    ul.classList.add("unorder-list");
    var list_container = document.createElement("div");
    list_container.classList.add("list-container");
    //write a function to show green color when I select the particular item and item will be striked and also written conditions for total count of items
    list_container.addEventListener("click", function (e) {
        var element = e.target;
        if (element.tagName === "LI") {
            list_container.classList.toggle("done");
            if (list_container.classList.contains("done")) {
                selectedItemsList.push(element.tagName);
                selectedItemsCount.innerHTML = "Selected Items count : ".concat(selectedItemsList.length);
                var unSelected = itemsArray.length - selectedItemsList.length;
                unSelectedItemsCount.innerHTML = "UnSelected Items count :".concat(unSelected);
            }
            else {
                selectedItemsList.pop();
                selectedItemsCount.innerHTML = "Selected Items count : ".concat(selectedItemsList.length);
                var unSelected = itemsArray.length - selectedItemsList.length;
                unSelectedItemsCount.innerHTML = "UnSelected Items count :".concat(unSelected);
            }
            totalItemsCount.textContent = "Total Items Count : ".concat(itemsArray.length, " ");
        }
    });
    list_container.id = todoId;
    ul.appendChild(list_container);
    // creating list item and added to list container
    var list_item = document.createElement("li");
    list_item.id = todoId;
    list_item.textContent = val.name;
    list_container.appendChild(list_item);
    // creating delete icon and added to list container
    var delete_icon = document.createElement("i");
    delete_icon.classList.add("bi", "bi-x", "delete-icon");
    list_container.appendChild(delete_icon);
    //giving onclick event to delete icon
    delete_icon.onclick = function () {
        Delete(todoId);
    };
    // write a consition for hiding the selected items, if i click the checkbox then items will be hidden, if I unclick it then it will unhide the all selected items.
    var checkbox = document.getElementById("checkId");
    checkbox.addEventListener("change", function (e) {
        var isChecked = checkbox.checked;
        if (isChecked && list_container.classList.contains("done")) {
            list_container.style.display = "none";
        }
        else {
            list_container.style.display = "block";
        }
    });
}
//adding addeventlistener to the add button
inputElement.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        var value = inputElement.value;
        if (value === "") {
            alert("enter input");
        }
        else {
            arrayLength = arrayLength + 1;
            var newItem = {
                name: value,
                id: arrayLength,
            };
            itemsArray.push(newItem);
            totalItemsCount.textContent = "Total Items Count : ".concat(itemsArray.length, " ");
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
