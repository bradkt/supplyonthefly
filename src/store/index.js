import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // make user object and include isloggedin with name, url, etc
        // isLoggedIn: false,
        user: {
            isLoggedIn: false,
            data: {},
        },
        cart: {
            items: [],
            total: 0,
        },
        products: {
            list: [],
        },
    },
    getters: {
        isLoggedIn: (state, getters) => {
            return state.user.isLoggedIn;
        },
        getCart: (state, getters) => {
            return state.cart.items;
        },
        getCartTotal: (state, getters) => {
            return state.cart.total;
        },
        getProducts: (state, getters) => {
            return state.products;
        },
        getUserData: (state, getters) => {
            return state.user.data;
        },
    },
    mutations: {
        login(state) {
            state.user.isLoggedIn = true;
        },
        logout(state) {
            state.user.isLoggedIn = false;
        },
        clearCart(state) {
            state.cart.items = [];
            state.cart.total = 0;
        },
        addUserData(state, payload) {
            state.user.data = payload;
        },
        incrementQuantity(state, payload) {
            state.cart.items.map(function(item, i){
                if(item.sku == payload.sku){
                    item["cartQuantity"] += 1;
                    item["quantity"] -= 1;
                    state.cart.items.splice(i, 1, item);
                }
            });
        },
        decrementQuantity(state, payload) {
            state.cart.items.map(function(item, i){
                if(item.sku == payload.sku){
                    item["cartQuantity"] -= 1;
                    item["quantity"] += 1;
                    state.cart.items.splice(i, 1, item);
                }
            });
        },
        updateCartTotal(state) {
            state.cart.total = 0;
            state.cart.items.map(function(item){
                state.cart.total += item.cartQuantity * item.price;
            });
        },
        addToCart(state, payload) {
            if (state.cart.items.length == 0 ) {
                payload["cartQuantity"] = 1;
                payload["quantity"] -= 1;
                state.cart.items.push(payload);
            } else {
                let foundInCart = false;
                state.cart.items.map(function(item, i){
                    if(item.sku == payload.sku) {
                        //should this be payload rather than item? maybe need to increment both?
                        item["cartQuantity"] += 1;
                        item["quantity"] -= 1;
                        state.cart.items.splice(i, 1, item);
                        foundInCart = true;
                    }
                });
                if (!foundInCart) {
                    payload["cartQuantity"] = 1;
                    payload["quantity"] -= 1;
                    state.cart.items.push(payload);
                }
            }
        },
        removeFromCart(state, payload) {
            state.cart.items.map(function(item, i){
                if(item.sku == payload.sku){
                    state.cart.items.splice(i, 1);
                }
            });
        },
        updateProducts(state, payload) {
            payload.filter((product, i, self) => {
                if (product['sku'] !== undefined) {
                    if (product['sku'] !== self[i + 1]['sku']) {
                        state.products.list.push(product);
                    }
                }
            })
        },
    },
    actions: {
        login({state, commit}) {
            commit('login');
        },
        logout({state, commit}) {
            commit('logout');
        },
        clearCart({state, commit}) {
            commit('logout');
        },
        addToCart({ state, commit }, product) {
            //// actionA ({ commit }) {
            //     return new Promise((resolve, reject) => {
            //         setTimeout(() => {
            //             commit('someMutation')
            //             resolve()
            //         }, 1000)
            //     })
            //// } then we can do .then and call method to update button text.
            commit('addToCart', product);
            commit('updateCartTotal');
        },
        addUserData({state, commit}, data) {
            commit('addUserData', data);
        },
        removeFromCart({state, commit}, product) {
            commit('removeFromCart', product);
            commit('updateCartTotal');
        },
        incrementQuantity({state, commit}, product) {
            commit('incrementQuantity', product);
            commit('updateCartTotal');
        },
        decrementQuantity({state, commit}, product) {
            commit('decrementQuantity', product);
            commit('updateCartTotal');
        },
        updateProducts({state, commit}, products) {
            commit('updateProducts', products);
        },
    }
})