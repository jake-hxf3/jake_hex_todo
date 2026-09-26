const searchBox = document.querySelector("#task-form");

const lists = document.querySelectorAll(".list-items");
const temp = document.querySelector("template");

const searchBar = document.querySelector("#task");

let taskIndex = 0;
let currentItem = null;


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

function startDrag(e) {
    if (e.target.tagName === "SPAN") {
        currentItem = e.target.closest("LI");
        if (!currentItem) return;
        setTimeout(currentItem.classList.add("hide"),0);

        //e.dataTransfer.setData('text', currentItem.firstElementChild.id);
        //console.log(e.dataTransfer.getData('text'));
    }
}

function stopDrag(e) {
    e.target.classList.remove("hide");
}

function swapPos(e, list) {
    //e.preventDefault();
    if (!list.contains(currentItem)) return;
        
    let nextItem = e.target.closest("li");
    if (!nextItem) return;
    if (nextItem === currentItem) return;

    let itemList = Array.prototype.slice.call(list.children);

    function itemIndex(item) {
        return itemList.indexOf(item);
    }

    if(itemIndex(currentItem) > itemIndex(nextItem)){
        nextItem.before(currentItem);
    } else {
        nextItem.after(currentItem);
    }
}

function deleteItem(e) {
    if (e.target.tagName === "BUTTON") {
        let deletedItem = e.target.closest("li");
        deletedItem.remove();
        e.target.style.display = "none";
    }
}

lists.forEach((list, index) => {
    list.addEventListener("animationend", (e) => {
        moveItem(e,index);
    })

    list.addEventListener("dragstart", (e) => {
        startDrag(e);
    })

    list.addEventListener("dragend", (e) => {
        stopDrag(e);
    })

    list.addEventListener("drop", (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    list.addEventListener("dragover", (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    list.addEventListener("dragenter", (e) => {
        swapPos(e, list);
    })

    list.addEventListener("click", (e) => {
        deleteItem(e);
    })
});


