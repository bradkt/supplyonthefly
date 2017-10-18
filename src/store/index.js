import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        // make user object and include isloggedin with name, url, etc
        isLoggedIn: false,
        cart: {
            items: [],
            total: 0
        },
    },
    getters: {
        isLoggedIn: (state, getters) => {
            return state.isLoggedIn;
        },
        getCart: (state, getters) => {
            return state.cart.items;
        },
        getCartTotal: (state, getters) => {
            return state.cart.total;
        }
    },
    mutations: {
        login(state) {
            state.isLoggedIn = true;
        },
        logout(state) {
            state.isLoggedIn = false;
        },
        incrementQuantity(state, payload) {
            state.cart.items.map(function(item, i){
                if(item.id == payload.id){
                    item["quantity"] += 1;
                    item["inStock"] -= 1;
                    state.cart.items.splice(i, 1, item);
                }
            });
        },
        decrementQuantity(state, payload) {
            state.cart.items.map(function(item, i){
                if(item.id == payload.id){
                    item["quantity"] -= 1;
                    item["inStock"] += 1;
                    state.cart.items.splice(i, 1, item);
                }
            });
        },
        updateCartTotal(state) {
            state.cart.total = 0;
            state.cart.items.map(function(item){
                state.cart.total += item.quantity * item.price;
            });
        },
        addToCart(state, payload) {
            if (state.cart.items.length == 0 ) {
                payload["quantity"] = 1;
                payload["inStock"] -= 1;
                state.cart.items.push(payload);
            } else {
                let foundInCart = false;
                state.cart.items.map(function(item, i){
                    if(item.id == payload.id) {
                        item["quantity"] += 1;
                        item["inStock"] -= 1;
                        state.cart.items.splice(i, 1, item);
                        foundInCart = true;
                    }
                });
                if (!foundInCart) {
                    payload["quantity"] = 1;
                    state.cart.items.push(payload);
                }
            }
        },
        removeFromCart(state, payload) {
            state.cart.items.map(function(item, i){
                if(item.id == payload.id){
                    state.cart.items.splice(i, 1);
                }
            });
        },
    },
    actions: {
        login({state, commit}) {
            commit('login');
        },
        logout({state, commit}) {
            commit('logout');
        },
        addToCart({ state, commit }, product) {
            commit('addToCart', product);
            commit('updateCartTotal');
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
    }
})