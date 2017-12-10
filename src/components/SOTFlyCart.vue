<template>
  <transition>
    <section class="container">
        <div class="cart-summary">
            <span>Welcome {{ getUserData.person.firstname || '' }}</span>
            <span v-if="isLoggedIn">
                <span>Product Total: {{ getCartTotal.toFixed(2) }}</span>
                <button v-if="getCartTotal > 0" type="button" class="btn" data-toggle="modal" data-target="#CheckoutModal">
                    Purchase
                </button>
            </span>
            <span v-else class="">
                <span class="btn">Log in To Purchase Cart</span>
            </span>
        </div>
        <div v-if="getCart.length === 0">
          <div class="emptyCart">
            <h3>Your Cart Is Empty</h3>
          </div>
        </div>
        <div v-for="product in getCart" class="productInCart">
            <img class="pull-left" v-bind:src="'http://www.supplyonthefly.site/product-images/' + product.imageName" alt="Generic placeholder image">
            <router-link
                    :to="{ name: 'ProductSingle', params: { product: product } }"
                    tag="h4"
                    class="product-title">
                <a>{{ product.name }}</a>
            </router-link>
            <p>Price: {{ product.price }}</p>
            <p class="quantity-controls">
                <span>Quantity: {{ product.cartQuantity }}</span>
                <span @click="incrementQuantity(product)"><icon name="arrow-up" scale="1"></icon></span>
                <span @click="decrementQuantity(product)"><icon name="arrow-down" scale="1"></icon></span>
            </p>
            <!--<button @click.prevent="addToCart">Add To Cart</button> make button to increase inventory-->
            <button @click.prevent="removeFromCart(product)">Remove From Cart</button>
        </div>

      <hr> <!--Previous Products-->

      <div v-if="previousCart.length > 0">
        <div class="previousCartheader">
          <span class="lead">Products recently in your Cart</span>
          <button @click.prevent="clearPreviousCartItems">Clear Previous Products</button>
        </div>
          <div v-for="product in previousCart" class="productPreviousInCart">
            <img class="pull-left" v-bind:src="'http://www.supplyonthefly.site/product-images/' + product.imageName" alt="SOTF image">
            <span class="cart-details pull-left">
              <router-link
                      :to="{ name: 'ProductSingle', params: { product: product } }"
                      tag="span"
                      class="product-title">
                <a>{{ product.name }}</a>
              </router-link>
              <span>Price: {{ product.price }}</span>
              <button @click.prevent="addToCart(product)" class="">Return To Cart</button>
            </span>
          </div>
      </div>
      <!-- Checkout Modal -->
      <Payment></Payment>

    </section>
  </transition>
</template>

<script>

    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import { Validator } from 'vee-validate';
    import Payment from './Payment.vue';

    export default {
        name: "FlyCart",
        components: {
            'Payment': Payment,
        },
        data() {
            return {
            };
        },
        created(){

        },
        beforeRouteEnter(to, from, next){
            next(vm => {
                if(!vm.isLoggedIn){
                    return next('/');
                }
            });
        },
        beforeRouteLeave(to, from, next){
            let oldCart = JSON.parse(window.localStorage.getItem('myCart'));
            if (this.getCart.length > oldCart.length) {
                window.localStorage.setItem('myCart', JSON.stringify(this.getCart));
            }
            next();
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
                getCart: 'getCart',
                getCartTotal: 'getCartTotal',
                getUserData: 'getUserData',
            }),
            isDisabled(){
                return this.errors.any() || this.creditCard === '';
            },
            previousCart(){
                let oldCart = JSON.parse(window.localStorage.getItem('myCart')) || [];
                let currentCart = this.getCart;
                let newArray = [];

                if (currentCart.length === 0) {
                    return oldCart;
                }

                oldCart.map(function(item){
                    let match = false;
                    currentCart.map(function (cartItem) {
                        if (item.sku === cartItem.sku) {
                            match = true;
                        }
                    })
                    if (!match){
                        newArray.push(item)
                    }
                });
                return newArray;
            },

        },
        methods: {
            ...mapActions({
                addToCart: "addToCart",
                removeFromCart: 'removeFromCart',
                incrementQuantity: 'incrementQuantity',
                decrementQuantity: 'decrementQuantity',
            }),
            clearPreviousCartItems(){
                window.localStorage.setItem('myCart', JSON.stringify([]));
                this.previousCart = [];
            }
        }
    }

</script>

<style scoped>

  .v-enter, .v-leave-to {
    opacity: 0;
  }

  .v-enter-active, .v-leave-active {
    -webkit-transition: opacity 2s;
    -moz-transition: opacity 2s;
    -ms-transition: opacity 2s;
    -o-transition: opacity 2s;
    transition: opacity 2s;
  }

    section {
        font-family: Helvetica, sans-serif;
    }

    .emptyCart{
      height: 70px;
      border: 1px dashed #00BEC5;
    }

    .lead{
      font-size: 18px;
      margin: 10px 15px;
    }
    .productInCart {
        margin: 4px 0;
        height: 220px;
        border: 1px rgba(50, 50, 50, 0.3) solid;
    }

    .productInCart img {
      margin: 10px 0 0 10px;
      height: 190px;
    }

    .previousCartheader {
      height: 50px;
    }

    .previousCartheader button {
      margin: 0 0 0 30px;
    }

    .productPreviousInCart {
      position: relative;
      margin: 4px 0;
      height: 90px;
      border: 1px rgba(50, 50, 50, 0.3) solid;
    }

    .productPreviousInCart img {
      height: 80px;
      margin: 5px 80px;
    }

    .productPreviousInCart .cart-details {
      display: inline-block;
      padding: 30px 0 0 0;
    }

    .productPreviousInCart .cart-details span {
      margin: 0px 5px;
    }

    .productPreviousInCart .cart-details button {
      display: inline-block;
      padding: 10px 10px 10px 10px;
      position: absolute;
      right: 10px;
      top: 20px;
    }

    .productInCart h4 {
       margin-top: 40px;
    }

    .cart-summary span {
      display: inline-block;
      margin: 10px 30px;
      font-size: 16px;
    }

    .quantity-controls span {
      margin: 5px 10px;
    }

    .glyphicon {
      font-size: 18px;
    }

</style>