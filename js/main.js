const searchBox = document.querySelector("#task-form");

const lists = document.querySelectorAll(".list-items");
const temp = document.querySelector("template");

const searchBar = document.querySelector("#task");

let taskIndex = 0;


function addItem() {
    let taskName = searchBar.value;

    taskIndex++;
    let taskId = `${taskName}-${taskIndex}`;

    let listItem = temp.content.cloneNode(true);
    listItem.querySelector("input").id = taskId;
    listItem.querySelector("label").htmlFor = taskId;
    listItem.querySelector("label").textContent = taskName;

    lists[0].appendChild(listItem);

    console.log("an item was added");
}

function moveItem(e,index) {
    if (e.target.tagName === "LI") {
        let checkbox = e.target.querySelector("input");
        if (checkbox.checked === true) {
            if (index < 2){
                let newItem = e.target.cloneNode(true);
                newItem.querySelector("input").checked = false;
                lists[index+1].prepend(newItem);
            }
            e.target.remove();      
        }
    }
}

lists.forEach((list, index) => {
    list.addEventListener("animationend", moveItem(e,index))
});


