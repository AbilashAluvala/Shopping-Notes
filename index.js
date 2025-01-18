class ShoppingList{
    constructor(itemsSelector,
        addItemButtonSelector,
        newItemTextSelector,
        storageKey = 'shoppingList'
    ) {

        this.storageKey = storageKey;
        this.itemsElement = document.querySelector(itemsSelector);
        this.addItemButtonEl = document.querySelector(addItemButtonSelector);
        this.newItemTextEl = document.querySelector(newItemTextSelector);

        this.items = JSON.parse(localStorage.getItem(this.storageKey)) || ['apples', 'oranges'];

        this.initialise();
    }

    initialise(){
        this.addItemButtonEl.addEventListener('click', () => {
            const value = this.newItemTextEl.value;
            this.addItem(value);
            this.newItemTextEl.value = '';
            
            this.renderItems();
            this.storeItems();

        });
    }

    capitalizeFirstLetter(text) {
        if (text && text.length > 0) {
            return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
        }
        return text;
    }

    renderItems() {
        this.itemsElement.innerHTML = '';
        if(this.items.length === 0 ){
            const  itemElement = document.createElement('li');
             itemElement.textContent = "No Items";
            this.itemsElement.appendChild(itemElement);
        }
        this.items.forEach((item, index) => {
            const itemElement = document.createElement('li');
            itemElement.textContent = item;
            const removeEl = document.createElement('span');
            removeEl.textContent = "Remove";
            removeEl.classList.add("remove-item");
            removeEl.onclick = () => {
                this.removeItemAt(index);
                this.renderItems();
                this.storeItems();
            };
            itemElement.appendChild(removeEl);
            this.itemsElement.appendChild(itemElement);
        });

    }

    addItem(newItem) {
        const capitalizedItem = this.capitalizeFirstLetter(newItem);
        this.items.push(capitalizedItem);

    }

    removeItemAt(indexToRemove) {
        this.items = this.items.filter((item, index) => indexToRemove != index);
    }

    storeItems() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items))
    }
}

const myShoppingList = new ShoppingList('#shoppingListItems', '#addItem', '#newItemText');

myShoppingList.renderItems();