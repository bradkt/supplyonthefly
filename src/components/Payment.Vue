<template>
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
        <div v-if="!purchasedStatus" class="modal-body card-wrapper">
          <form action="#">
            <!--required|credit_card-->
            <p :class="{ 'control': true }">
              <input id="cardType" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('fullName') }"
                     v-model="cardType" data-vv-delay="200" name="cardType" type="text" placeholder="Type of Card">
              <span v-show="errors.has('cardType')" class="help is-danger">{{ errors.first('cardType') }}</span>
            </p>
            <p :class="{ 'control': true }">
              <input v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('credit_card') }" v-model="creditCard"
                     data-vv-delay="500" name="creditCard" type="text" placeholder="Credit Card Number">
              <span v-show="errors.has('creditCard')" class="help is-danger">Please Enter A Valid Credit Card Number</span>
            </p>
            <p :class="{ 'control': true }">
              <input v-validate="'required|date_format:MM/YY'" data-vv-delay="200" v-model="dateExpire"
                     :class="{'input': true, 'is-danger': errors.has('expiry') }" name="expiry" type="text" placeholder="MM/YY of Expiration">
              <span v-show="errors.has('expiry')" class="help is-danger">Please Enter A Valid Month/Year</span>
            </p>
            <p :class="{ 'control': true }">
              <input id="fullName" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('fullName') }"
                     v-model="nameOnCard" data-vv-delay="200" name="fullName" type="text" placeholder="Name As Appears On Card">
              <span v-show="errors.has('fullName')" class="help is-danger">{{ errors.first('fullName') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input id="cvv" v-validate="{rules: { regex:  /^[0-9]{3,4}$/}, required: true }" data-vv-delay="200"
                     :class="{'input': true, 'is-danger': errors.has('cvv') }"
                     v-model="cvv" name="cvv" type="text" placeholder="CVV">
              <span v-show="errors.has('cvv')" class="help is-danger">{{ errors.first('cvv') }}</span>
            </p>

            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click.prevent="submitPayment(clearCart)" type="button" :disabled="isDisabled" class="btn btn-primary">Make Payment</button>

          </form>
        </div>

        <div v-if="purchasedStatus" class="modal-body card-wrapper">
          <form action="#">
            <!--required|credit_card-->
            <p><strong>Thank You!</strong> Your Order Has Been Placed. You will receive a confirmation email shortly.</p>


            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click.prevent="submitPayment(clearCart)" type="button" :disabled="true" class="btn btn-primary">Make Payment</button>

          </form>
        </div>
        <div class="modal-footer">
          <div class="login-help">

          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapActions } from 'vuex';
    import { mapGetters } from 'vuex';
    import { Validator } from 'vee-validate';
    import moment from 'moment'

    export default {
        data () {
            return {
                today: this.moment(new Date()),
                productTotal: '',
                saleTotal: '',
                creditCard: '',
                cvv: '',
                dateExpire: '',
                nameOnCard: '',
                cardType: '',
                purchasedStatus : false,
            }
        },
        created: function () {

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

        },
        methods: {
            ...mapActions({
                clearCart: 'clearCart',
            }),
            // add callback to change payment modal ui to "purchase complete check email" and clear the cart
            submitPayment(cb) {
                let _this = this;
                let request = this.formatCartRequest();
                console.log(JSON.stringify(request));
                console.log(request);
                this.axios.post('http://supplyonthefly.business:8080/capstone-website-api/user/cart/checkout', {
                    request
                }).then(function (response) {
                    cb();
                    _this.purchasedStatus = true;
                    _this.purchaseEmail(request);
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
//                    _this.purchasedStatus = true;
//                    cb();
//                    _this.purchaseEmail(request);
                });
            },
            purchaseEmail(request){
                let user = { request: request, data: this.getUserData };
                console.log(user);
                this.axios.post('http://localhost:8081/purchase', {
                    user
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            randomString(i){
                let chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
                let result = '';
                while (i > 0){
                    result += chars[Math.round(Math.random() * (chars.length - 1))];
                    i--
                }
                return result;
            },
            moment: function () {
                return moment(new Date()).format('YYYY-MM-DD'); //'2017-11-20'
            },
            formatCartRequest(){
                let currentCart = this.getCart;
                let cartID = this.randomString(9);

                var cartDetails = {
                    sessionId: cartID,
                    cartDate: this.moment(),
                    customerId: this.getUserData.customer.customerId,
                    itemList: [],
                    paymentMethod: this.cardType,
                    total: '',
                };
                currentCart.map(function(item){
                    cartDetails.itemList.push(
                        {
                            price: item.price,
                            quantity: item.cartQuantity,
//                            sessionId: cartID,
                            sku: item.sku,
                            total: (item.price * item.cartQuantity).toFixed(2),
                            itemLocation: item.location,
                        }
                    );
                    cartDetails.total += (item.price * item.cartQuantity).toFixed(2);
                });
                parseFloat(cartDetails.total);
                console.log(currentCart);
                return cartDetails;
            },
        }
    }
//    {
//        cartDate: "2017-12-10",
//        customerId: "1234567",
//        orderItem: [
//        {
//            price: 12.32,
//            quantity: 2,
//            sessionId: "1234567890",
//            sku: "1234567890",
//            total: 24.64
//        },
//        {
//            price: 12.32,
//            quantity: 1,
//            sessionId: "1234567890",
//            sku: "1234567890",
//            total: 12.32
//        }
//    ],
//        paymentMethod: "Visa",
//        sessionId: "1234567890",
//        total: 36.96
//    }
    //                    customer: {
    //                        cardIssuer: "",
    //                        ccFirstname: "",
    //                        ccLastname: "",
    //                        customerId: this.randomString(9),
    //                        cvv: "",
    //                        expDate: "",
    //                        imageName: "",
    //                        creditcardNumber: ""
    //                    },
    //                    person: {
    //                        address: "140 Louis Lane",
    //                        altEmail: "tracy@thesuper.com",
    //                        city: "Columbus",
    //                        firstname: "Clark",
    //                        lastname: "Kent",
    //                        login: {
    //                            password: "qwerqwer",
    //                            username: "btracy@oneyoungsters.com"
    //                        },
    //                        phoneNumber: "1-800-312-9951",
    //                        registrationDate: "2017-11-02",
    //                        state: "NY",
    //                        zipcode: "12186"
    //                    }
</script>

<style scoped>

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

  .checkout-price {
    display: inline-block;
    font-size: 16px;
    margin: 15px 20px;
  }

</style>