document.addEventListener("DOMContentLoaded", () => {
    const itemInput = document.getElementById("txtItem");
    const addItemBtn = document.getElementById("noteBtn");
    const shoppingList = document.getElementById("noteList");

    let items = JSON.parse(localStorage.getItem("notes")) || [];

    function saveToLocalStorage() {
        localStorage.setItem("notes", JSON.stringify(items));
    }

    function renderList() {
        shoppingList.innerHTML = "";
        items.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="note-title">Your Note</span>
                <span>${item.name}</span>
                <button class="delete-btn" title="Delete Note" onclick="deleteItem(${index})">💀</button>
                <button class="edit-btn" title="Edit Note" onclick="modifyItem(${index})">✏️</button>
            `;
            shoppingList.appendChild(li);
        });
    }

    window.deleteItem = (deleteIndex) => {
        items.splice(deleteIndex, 1);
        saveToLocalStorage();
        renderList();
    }

    window.modifyItem = (modifyIndex) => {
        const newName = prompt("Enter new note text:", items[modifyIndex].name);
        if (newName !== null && newName.trim() !== "") {
            items[modifyIndex].name = newName.trim();
            saveToLocalStorage();
            renderList();
        }
    };
    
    addItemBtn.addEventListener("click", () => {
        let itemText = itemInput.value.trim();
        if (itemText === "") {
            alert("Note cannot be empty");
            return;
        }
        items.push({ name: itemText });
        itemInput.value = "";
        saveToLocalStorage();
        renderList();
    });

    renderList();
});