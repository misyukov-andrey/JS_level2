const products = [
    { id: 1, img: 'images/cart-1.png', title: 'Гидроцикл BRP SeaDoo GTI 130hp SE Black Мango', price: '1 049 500' },
    { id: 2, img: 'images/cart-2.png', title: 'Гидроцикл BRP SeaDoo GTI 155hp SE Long Blue Metallic', price: '1 100 475' },
    { id: 3, img: 'images/cart-3.png', title: 'Гидроцикл BRP SeaDoo GTR 230hp X California green', price: '1 323 700' },
    { id: 4, img: 'images/cart-4.png', title: 'Гидроцикл BRP SeaDoo GTR 230hp STD Black / Gulfstream', price: '1 543 000' },
    { id: 5, img: 'images/cart-5.png', title: 'Гидроцикл BRP SeaDoo GTX 300hp LTD Liquid Metal', price: '732 345' },
    { id: 6, img: 'images/cart-6.png', title: 'Гидроцикл BRP SeaDoo Spark 60hp 2 up', price: '857 666' },
    { id: 7, img: 'images/cart-7.png', title: 'Гидроцикл BRP SeaDoo Spark GTS 90hp Rental', price: '1 229 711' },
    { id: 8, img: 'images/cart-8.png', title: 'Гидроцикл BRP SeaDoo WAKE 230hp PRO Teal blue', price: '587 440' },
    { id: 9, img: 'images/cart-9.png', title: 'Гидроцикл Spark 2-UP 900 Ho Ace Chili Pepper', price: '587 440' },
];
const renderProduct = (products) =>
    `<a class="cart__item" href="#">
                <img class="cart__item-img" src="${products.img}" alt="img">
                <h3 class="cart__item-title">${products.title}</h3>
                <p class="cart__item-text">${products.price} руб</p>
    </a>`;


const renderProducts = (list) => {
    document.querySelector('.carts__inner').insertAdjacentHTML('beforeend', list.map(item => renderProduct(item)).join(''));
};

renderProducts(products);