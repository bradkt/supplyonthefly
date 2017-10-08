<template>
    <section class="container">
        <div class="cart-summary">
            <span>{{ Title }}</span>
            <span v-if="getIsLoggedIn">
                <span>Product Total: {{ getCartTotal.toFixed(2) }}</span>
                <button type="button" class="btn" data-toggle="modal" data-target="#CheckoutModal">
                    Purchase
                </button>
            </span>
            <span v-else class="">
                <span class="btn">Log in To Purchase Cart</span>
            </span>
            <!--<icon name="language" scale="3"></icon>-->
        </div>
        <div v-for="product in getCart" class="productInCart">
            <img class="pull-left" src="http://via.placeholder.com/218x218" alt="Generic placeholder image" width="218" height="218">
            <router-link
                    :to="{ name: 'ProductSingle', params: { product: product } }"
                    tag="h4"
                    class="product-title">
                <a>{{ product.title }}</a>
            </router-link>
            <p>Price: {{ product.price }}</p>
            <p class="quantity-controls">
                <span>Quantity: {{ product.quantity }}</span>
                <span @click="incrementQuantity(product)" class="glyphicon glyphicon-circle-arrow-up"></span>
                <span @click="decrementQuantity(product)" class="glyphicon glyphicon-circle-arrow-down"></span>
            </p>
            <!--<button @click.prevent="addToCart">Add To Carth5>utton> make button to increase inventory-->
            <button @click.prevent="removeFromCart(product)">Remove From Cart</button>
        </div>


        <!-- Checkout Modal -->
        <div class="modal fade" id="CheckoutModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                        <h4 class="modal-title">Check Out</h4>
                    </div>
                    <span class="checkout-price">Product Total:
                      <span v-model="productTotal" class="checkout-num">${{ getCartTotal.toFixed(2) }}
                      </span>
                    </span>
                    <span class="checkout-price">Total Sale:
                      <span v-model="saleTotal" class="checkout-num">${{ ( getCartTotal + (getCartTotal * .1)).toFixed(2) }}</span>
                    </span>
                    <div class="modal-body card-wrapper">
                      <form action="#">

                        <p :class="{ 'control': true }">
                        <input v-validate="'required|credit_card'" :class="{'input': true, 'is-danger': errors.has('credit_card') }"
                               data-vv-delay="700" name="creditCard" type="text" placeholder="Credit Card Number">
                        <span v-show="errors.has('creditCard')" class="help is-danger">Please Enter A Valid Credit Card Number</span>
                        </p>
                        <p :class="{ 'control': true }">
                          <input v-validate="'required|date_format:MM/YY'" data-vv-delay="700"
                                 :class="{'input': true, 'is-danger': errors.has('expiry') }" name="expiry" type="text" placeholder="MM/YY of Expiration">
                          <span v-show="errors.has('expiry')" class="help is-danger">Please Enter A Valid Month/Year</span>
                        </p>
                        <p :class="{ 'control': true }">
                          <input id="fullName" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('fullName') }"
                                 data-vv-delay="700" name="fullName" type="text" placeholder="Name As Appears On Card">
                          <span v-show="errors.has('fullName')" class="help is-danger">{{ errors.first('fullName') }}</span>
                        </p>

                        <p :class="{ 'control': true }">
                          <input id="cvv" v-validate="{rules: { regex:  /^[0-9]{3,4}$/}, required: true }" data-vv-delay="700"
                                 :class="{'input': true, 'is-danger': errors.has('cvv') }"
                                 name="cvv" type="text" placeholder="CVV">
                          <span v-show="errors.has('cvv')" class="help is-danger">{{ errors.first('cvv') }}</span>
                        </p>

                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button @click.prevent="submitPayment" type="button" :disabled="errors.any()" class="btn btn-primary">Make Payment</button>

                      </form>
                    </div>
                    <div class="modal-footer">
                        <div class="login-help">

                        </div>
                    </div>
                </div>
            </div>
        </div>

    </section>
</template>

<script>

    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import { Validator } from 'vee-validate';

    export default {
        name: "FlyCart",
        data() {
            return {
                Title: "Brad's Cart",
                products: [],
                productTotal: "",
                saleTotal: "",
            };
        },
        ready: function() {


        },
        computed: {
            ...mapGetters({
                getIsLoggedIn: 'getIsLoggedIn',
                getCart: 'getCart',
                getCartTotal: 'getCartTotal',
            }),
        },
        methods: {
            ...mapActions({
                addToCart: "addToCart",
                removeFromCart: 'removeFromCart',
                incrementQuantity: 'incrementQuantity',
                decrementQuantity: 'decrementQuantity',
            }),
            submitPayment() {
                console.log(this.productTotal, this.saleTotal);
            },
        }
    }

</script>

<style scoped>

    section {
        font-family: Helvetica, sans-serif;
        /*background-color: rgba(50, 50, 50, 0.1);*/
    }

    .productInCart {
        margin: 4px 0;
        height: 220px;
        border: 1px rgba(50, 50, 50, 0.3) solid;
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

    .checkout-price {
      display: inline-block;
      font-size: 16px;
      margin: 15px 20px;
    }

    .checkout-num {
      font-size: 18px;
    }

    #CheckoutModal input[type=text], input[type=password] {
        height: 44px;
        font-size: 16px;
        width: 100%;
        margin-bottom: 10px;
        /*background: #fff;*/
        border: 1px solid #d9d9d9;
        border-top: 1px solid #c0c0c0;
        padding: 0 8px;
        box-sizing: border-box;
    }

    #CheckoutModal input[type=text]:hover, input[type=password]:hover {
        border: 1px solid #b9b9b9;
        border-top: 1px solid #a0a0a0;
        -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
        -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
        box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    }

</style>