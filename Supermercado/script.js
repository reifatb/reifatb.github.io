class CatalogFilter {
    constructor() {
        this.filter = 'all';
    }

    setFruit() { this.filter = 'fruit' };
    setFrozenFood() { this.filter = 'frozenFood' };
    setMeat() { this.filter = 'meat' };
    setAll() { this.filter = 'all' };
}

const cartMap = new Map();
const catalogFilter = new CatalogFilter();

async function getArrayCatalog(catalogFilter) {
    try {
        const response = await fetch('catalog.json');
        const catalog = await response.json();
        return catalogFilter.filter === 'all' ? catalog.items : catalog.items.filter((item) => item.type === catalogFilter.filter);
    } catch {
        console.error('Failed to fetch catalog');
    }
}


async function getArrayUsers() {
    try {
        const response = await fetch('users.json');
        const users = await response.json();
        const items = users.items;
    } catch {
        console.error('Failed to fetch users');
    }
}

function createSections() {
    const nav = document.getElementById('sectionsNav');
    const ul = document.createElement('ul');
    ul.id = 'sections';
    nav.appendChild(ul);

    for (const section of ['Todo', 'Frutería', 'Carnicería', 'Congelados']) {
        const element = document.createElement('li');
        element.textContent = section;
        ul.appendChild(element);
    }

    ul.firstChild.classList.add('selected');

    ul.addEventListener('click', async ({ target, currentTarget }) => {
        if (target === currentTarget) { return; }
        for (const child of ul.children) {
            child.classList.remove('selected')
        }

        target.classList.add('selected');

        switch (target.textContent) {
            case 'Todo':
                catalogFilter.setAll();
                break;
            case 'Frutería':
                catalogFilter.setFruit();
                break;
            case 'Carnicería':
                catalogFilter.setMeat();
                break;
            case 'Congelados':
                catalogFilter.setFrozenFood();
                break;
            default:
                throw new Error('categoría no encontrada ' + target.textContent);
        }

        await renderCards();
    })
}

function itemCard(item) {
    const div = document.createElement('div');
    div.setAttribute('id', item.id);
    div.className = 'card';
    const img = document.createElement('img');
    img.src = 'img/' + item.id + '.png';
    div.appendChild(img);
    const name = document.createElement('p');
    name.innerHTML = item.name;
    div.appendChild(name);
    const price = document.createElement('p');
    price.innerHTML = item.price + ' €';
    div.appendChild(price);
    const addToCartForm = document.createElement('form');
    addToCartForm.className = 'addToCartForm';
    div.appendChild(addToCartForm);
    const lessQuatityButton = document.createElement('button');
    lessQuatityButton.className = 'quantityButton';
    lessQuatityButton.innerHTML = '-';
    addToCartForm.appendChild(lessQuatityButton);
    const quantity = document.createElement('input');
    quantity.type = 'number';
    quantity.value = 1;
    addToCartForm.appendChild(quantity);
    const moreQuatityButton = document.createElement('button');
    moreQuatityButton.className = 'quantityButton';
    moreQuatityButton.innerHTML = '+';
    addToCartForm.appendChild(moreQuatityButton);
    const submitToCartForm = document.createElement('input');
    submitToCartForm.type = 'submit';
    submitToCartForm.className = 'submitToCartForm';
    submitToCartForm.value = ' Añadir';
    addToCartForm.appendChild(submitToCartForm);

    lessQuatityButton.addEventListener('click', () => {
        quantity.value--;
    });
    moreQuatityButton.addEventListener('click', () => {
        quantity.value++;
    });

    addToCartForm.addEventListener('submit', e => {
        e.preventDefault();
        const itemMap = cartMap.get(item.id);
        if (itemMap) {
            cartMap.set(item.id, (parseInt(itemMap) + parseInt(quantity.value)))
        } else {
            cartMap.set(item.id, quantity.value);
        }
    });

    return div;
}

async function renderCards() {
    const arrayCatalog = await getArrayCatalog(catalogFilter);
    createCards(arrayCatalog);
}

function createCards(array) {
    const items = document.getElementById('items');
    items.innerHTML = '';
    for (let item of array) {
        console.log(item);
        console.log(itemCard(item));
        items.appendChild(itemCard(item));
    }
}

function openCart() {
    document.getElementById("cart").style.width = "250px";
    document.getElementById("cart").style.border = 'solid 1px #E6843A';
}

function closeCart() {
    const cart = document.getElementById("cart")
    cart.style.width = "0";
    cart.style.border = 'none';
    cart.parentNode.removeChild(cart);
}

function clickOutsideCart(evt) {
    const flyoutEl = document.getElementById("cart");
    let targetEl = evt.target; // clicked element      
    while (targetEl) {
        if (targetEl == flyoutEl) {
            // This is a click inside, does nothing, just return.

            return;
        }
        // Go up the DOM
        targetEl = targetEl.parentNode;
    }
    // This is a click outside.      
    closeCart();
}

async function createCart() {
    const arrayCatalog = await getArrayCatalog({ filter: 'all' });
    const header = document.getElementsByTagName('header')[0];
    const cart = document.createElement('div');
    cart.id = 'cart';
    cart.className = 'sidepanel';
    header.appendChild(cart);

    const closeButton = document.createElement('a');
    closeButton.textContent = '×';
    closeButton.addEventListener('click', closeCart);
    closeButton.className = 'closebtn';
    cart.appendChild(closeButton);

    let totalAmount = 0;
    const table = document.createElement('table');
    cart.appendChild(table);
    const thead = document.createElement('thead');
    table.appendChild(thead);
    const trHead = document.createElement('tr');
    thead.appendChild(trHead);
    const thProduct = document.createElement('th');
    thProduct.innerText = 'Producto';
    trHead.appendChild(thProduct);
    const thQuantity = document.createElement('th');
    thQuantity.innerText = 'Cantidad';
    trHead.appendChild(thQuantity);
    const thPrice = document.createElement('th');
    thPrice.innerText = 'Precio';
    trHead.appendChild(thPrice);

    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    for (const [itemId, quantity] of cartMap) {
        const tr = document.createElement('tr');
        tbody.appendChild(tr);
        //comparar itemId con el id de los elementos del array
        //multiplicar precio x cantidad
        const tdProduct = document.createElement('td');
        const tdQuantity = document.createElement('td');
        tdQuantity.innerText = quantity;
        const tdPrice = document.createElement('td');

        for (const item of arrayCatalog) {
            if (item.id === itemId) {
                // tdProduct.innerHTML = item.name;
                const img = document.createElement('img');
                img.src = 'img/' + item.id + '.png';
                tdProduct.appendChild(img);
                totalAmount += quantity * item.price;
                tdPrice.innerText = quantity * item.price + ' €';
            }
        }

        tr.appendChild(tdProduct);
        tr.appendChild(tdQuantity);
        tr.appendChild(tdPrice);
    }

    const tfoot = document.createElement('tfoot');
    table.appendChild(tfoot);
    const trFoot = document.createElement('tr');
    tfoot.appendChild(trFoot);
    const tdTotalText = document.createElement('td');
    tdTotalText.innerText = 'TOTAL';
    trFoot.appendChild(tdTotalText);
    const tdBlank = document.createElement('td');
    trFoot.appendChild(tdBlank);
    const tdTotalAmount = document.createElement('td');
    tdTotalAmount.innerText = totalAmount + ' €';
    trFoot.appendChild(tdTotalAmount);


    console.log(cartMap);
}


document.addEventListener('DOMContentLoaded', async () => {

    createSections();

    await renderCards()

    const cartIcon = document.getElementById('cartIcon');
    const closebtn = document.getElementsByClassName('closebtn')[0];
    cartIcon.addEventListener('click', async () => {
        await createCart();
        openCart();
    });


    const cart = document.getElementById('cart');
    // cart.addEventListener('focusout', closeCart);
    document.addEventListener('click', evt => {
        clickOutsideCart(evt);
    });
});

