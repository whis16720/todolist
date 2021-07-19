//Submit
document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    let activity = document.querySelector("#activity").value;
    let item = {
        id: new Date().toISOString(),
        activity: activity.trim(),
    };
    addItemToLocal(item);
    addItemToUI(item);
    document.querySelector("#activity").value = "";
});

//Add item to localstorage
let addItemToLocal = (item) => {
    if (item.activity !== "") {
        let list = getList();
        list.push(item);
        localStorage.setItem("list", JSON.stringify(list));
    }
};

//Add item to UI
let addItemToUI = (item) => {
    if (item.activity !== "") {
        let card = document.createElement("div");
        card.className =
            "card p-2 flex-row justify-content-between align-items-center mb-3";
        card.innerHTML = `
	<span>${item.activity}</span>
	<button class="btn btn-sm btn-danger btn-remove" data-id="${item.id}">Remove</button>`;
        document.querySelector(".list").appendChild(card);
    }
};

//Remove item from localstorage
let removeItemFromLS = (id) => {
    let list = getList();
    let index = list.findIndex((item) => item.id === id);
    list.splice(index, 1);
    localStorage.setItem("list", JSON.stringify(list));
};

//Listen remove
document.querySelector(".list").addEventListener("click", (event) => {
    if (event.target.classList.contains("btn-remove")) {
        console.log(event.target.classList.contains("btn-remove"));
        let name = event.target.previousElementSibling.textContent;
        let isConfirmed = confirm(`Bạn có muốn xóa item '${name}' không?`);
        if (isConfirmed) {
            let card = event.target.parentElement;
            let id = event.target.dataset.id;
            //Remove from UI
            card.remove();

            //Remoev from LS
            removeItemFromLS(id);
        }
    }
});

//Remove all
document.querySelector("#btn-remove-all").addEventListener("click", () => {
    let isConfirmed = confirm(`Bạn có muốn xóa tất cả item không?`);
    if (isConfirmed) {
        localStorage.removeItem("list");
        document.querySelector(".list").innerHTML = "";
    }
});

//Filter
document.querySelector("#filter").addEventListener("keyup", (event) => {
    let value = event.target.value.trim();
    let list = getList();
    let filteredList = list.filter((item) => {
        return item.activity.toLowerCase().includes(value.toLowerCase());
    });
    document.querySelector(".list").innerHTML = "";
    filteredList.forEach((item) => {
        addItemToUI(item);
    });
});

//Get list
let getList = () => {
    return JSON.parse(localStorage.getItem("list")) || [];
};

//Render list
let renderList = () => {
    let list = getList();
    list.forEach((item) => {
        addItemToUI(item);
    });
};

renderList();
