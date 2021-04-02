const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        showCart: false,
        userSearch: '',
        imgCart: 'https://placehold.it/50x100',
        filtered: [],
        cartItems: [],
        products: [],
        imgCatalog: 'https://placehold.it/200x150'
    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        addProduct(product) {
            this.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result) {
                        let find = this.cartItems.find(el => el.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({ quantity: 1 }, product);
                            this.cartItems.push(prod);
                        }
                    }
                })
        },
        remove(product) {
            this.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result) {
                        if (product.quantity > 1) {
                            product.quantity--;
                        } else {
                            this.cartItems.splice(this.cartItems.indexOf(product), 1);
                        }
                    }
                })
        },
        filter() {
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.product_name));
        }
    },
    mounted() {

        this.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
        this.getJson(`getProducts.json`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    }
})















Vue.component('cart', {
    props: ['cartItems', 'img', 'visibility'],
    template: `<div class="cart-block" v-show="visibility">
                 <p v-if="!cartItems.length">Cart is empty</p>
                 <cart-item 
                 v-for="product of cartItems"  
                 :key="product.id_product"
                 :img="img"
                 :cart-item="product"></cart-item>
             </div>`
});
Vue.component('cart-item', {
    props: ['cartItem', 'img'],
    template: `<div class="cart-item" >
                     <div class="product-bio">
                         <img :src="img" alt="Some image">
                         <div class="product-desc">
                             <p class="product-title">{{cartItem.product_name}}</p>
                             <p class="product-quantity">Quantity: {{cartItem.quantity}}</p>
                             <p class="product-single-price">$ {{cartItem.price}} each</p>
                         </div>
                     </div>
                     <div class="right-block">
                         <p class="product-price">{{cartItem.quantity*cartItem.price}}</p>
                         <button class="del-btn" @click="$parent.$emit('remove', cartItem)">&times;</button>
                     </div>
                 </div>`
});


Vue.component('products', {
    props: ['products', 'img'],
    template: `<div class="products">
            <product 
            v-for="product of products" 
            :key="product.id_product"
            :img="img"
            :product="product"></product>
        </div>`
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `<div class="product-item" >
                <img :src="img" alt="Some img">
                <div class="desc">
                    <h3>{{ product.product_name }}</h3>
                    <p>{{ product.price }} $</p>
                    <button class="buy-btn" @click="$parent.$emit('add-product', product)">Купить</button>
                </div>
            </div>`
});

Vue.component('searchform', {
    props: ['value'],
    template: `
        <input type="text" class="search-field" 
        v-bind:value="value"
        v-on:input="$emit('input', $event.target.value)">
    `
});