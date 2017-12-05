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
          <form>

            <div>
              <select class="list" v-model="cardType">
                <option disabled value="">Type of Card</option>
                <option>Visa</option>
                <option>MasterCard</option>
                <option>Amex</option>
                <option>Discover</option>
              </select>
            </div>


            <p :class="{ 'control': true }">
              <!--required|credit_card-->
              <input v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('credit_card') }" v-model="creditCard"
                     data-vv-delay="500" name="creditCard" type="text" placeholder="Credit Card Number" autofocus>
              <span v-show="errors.has('creditCard')" class="help is-danger">Please Enter A Valid Credit Card Number</span>
              <p v-if="isDisabled" class="help is-danger">{{ creditCardMessage }}</p>
            </p>
            <p :class="{ 'control': true }">
              <input v-validate="'required|date_format:MM/YY'" data-vv-delay="200" v-model="dateExpire"
                     :class="{'input': true, 'is-danger': errors.has('expiry') }" name="expiry" type="text" placeholder="MM/YY of Expiration" autofocus>
              <span v-show="errors.has('expiry')" class="help is-danger">Please Enter A Valid Month/Year</span>
              <p v-if="isDisabled" class="help is-danger">{{ expireMessage }}</p>
            </p>
            <p :class="{ 'control': true }">
              <input id="fullName" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('fullName') }"
                     v-model="nameOnCard" data-vv-delay="200" name="fullName" type="text" placeholder="Name As Appears On Card" autofocus>
              <span v-show="errors.has('fullName')" class="help is-danger">{{ errors.first('fullName') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input id="cvv" v-validate="{ required: true, regex: /^[0-9]{3}$/ }" data-vv-delay="200"
                     :class="{'input': true, 'is-danger': errors.has('cvv') }"
                     v-model="cvv" name="cvv" type="text" placeholder="CVV" autofocus>
              <span v-show="errors.has('cvv')" class="help is-danger">{{ errors.first('cvv') }}</span>
            </p>

            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button @click.prevent="submitPayment(clearCart)" type="button" :disabled="isDisabled" class="btn btn-primary">Make Payment</button>
            <button @click.prevent="submitPayment(clearCart)" type="button" :disabled="false" class="btn btn-primary">Use Card On File</button>
          </form>
        </div>

        <div v-if="purchasedStatus" class="modal-body card-wrapper">
          <form action="#">
            <!--required|credit_card-->
            <p><strong>Thank You!</strong> Your Order Has Been Placed. You will receive a confirmation email shortly.</p>


            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>



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
    import Datepicker from 'vuejs-datepicker';

    export default {
        components: {
            Datepicker: Datepicker,
        },
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
                creditCardMessage: 'The Credit Card Number Entered Must be of the Card Type Selected.',
                expireMessage: 'Please select an expire date in the future.',
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
                console.log('------------');
                console.log('1: ' + this.getCreditCardType(this.creditCard, this.cardType));
                console.log('2: ' + !this.errors.any());
                console.log('3: ' + this.creditCard !== '');
                console.log('4: ' + this.dateExpire !== '');
                console.log('5: ' + this.validExpireDate());
                console.log('------------');
                if (!this.errors.any() && this.creditCard !== '' && this.dateExpire !== '' && this.cvv !== '' && this.validExpireDate() &&
                    this.getCreditCardType(this.creditCard, this.cardType)){
                    console.log('this form can submit');
                    return false;
                } else {
                    console.log('this form is still disabled');
                    return true;
                }
            },
        },
        methods: {
            ...mapActions({
                clearCart: 'clearCart',
            }),
            // add callback to change payment modal ui to "purchase complete check email" and clear the cart
            submitPayment(cb) {
                let _this = this;
                console.log(this.cardType);
                let cartID = this.randomString(9);
                let cartInfo = this.formatCartRequest();
                // find way to submit saved data or input data depending on which button clicked
                this.axios.post('http://supplyonthefly.business:8080/capstone-website-api/user/cart/checkout', {
                    sessionId: cartID,
                    cartDate: this.moment(),
                    customerId: this.getUserData.customer.customerId,
                    itemList: cartInfo.cartDetails,
                    paymentMethod: this.cardType,
                    total: cartInfo.cartTotal,
                }).then(function (response) {
                    _this.purchasedStatus = true;
                    _this.purchaseEmail(cartInfo, cartID);
                    console.log(response);
                    cb();
                }).catch(function (error) {
                    console.log(error);
                });
            },
            purchaseEmail(cartInfo, cartID){
                let user = { cartID: cartID, cartInfo: cartInfo, data: this.getUserData };
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
            validExpireDate() {
                let dateArray = this.dateExpire.split('/');
                let month = dateArray[0];
                let year = parseInt(dateArray[1]) + 2000;
                let today = moment();
                let dateToExpire = moment(month + "-03-" + year);
                return today.isBefore(dateToExpire);
            },
            moment: function () {
                return moment(new Date()).format('YYYY-MM-DD'); //'2017-11-20'
            },
            formatCartRequest(){
                let currentCart = this.getCart;
                let cartDetails = [];
                let cartTotal = 0;
                currentCart.map(function(item){
                    cartDetails.push(
                        {
                            price: item.price,
                            quantity: item.cartQuantity,
                            sku: item.sku,
                            total: (item.price * item.cartQuantity),
                            itemLocation: item.location,
                        }
                    );
                    cartTotal += (item.price * item.cartQuantity);
                });
                parseFloat(cartTotal).toFixed(2);
                cartTotal.toString();
                let cartRequest = {
                    cartDetails: cartDetails,
                    cartTotal: cartTotal,
                };
                return cartRequest;
            },
            getCreditCardType(number, cardType) {
                var sel_brand;
                var amex_regex = new RegExp('^3[47][0-9]{0,}$'); //34, 37
                var visa_regex = new RegExp('^4[0-9]{0,}$'); //4
                var discover_regex = new RegExp('^(6011|65|64[4-9]|62212[6-9]|6221[3-9]|622[2-8]|6229[01]|62292[0-5])[0-9]{0,}$'); //6011, 622126-622925, 644-649, 65
                var mastercard_regex = new RegExp('^(5[1-5]|222[1-9]|22[3-9]|2[3-6]|27[01]|2720)[0-9]{0,}$'); //2221-2720, 51-55
                let message = (this.errors);
                console.log(message);
                if (number.match(visa_regex)) {
                    sel_brand = "Visa";
                } else if (number.match(amex_regex)) {
                    sel_brand = "Amex";
                } else if (number.match(mastercard_regex)) {
                    sel_brand = "MasterCard";
                } else if (number.match(discover_regex)) {
                    sel_brand = "Discover";
                } else {
                    sel_brand = "unknown";
                }
                if (sel_brand === cardType && number.toString().length > 12){
                    message.items  = [];
                    return true;
                } else {
                    return false;

                };

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

  .list {
    font-size: 18px;
    width: 100%;
    margin: 10px auto;
    padding: 10px 10px;
  }

  .timeOff {
    text-align: left;
    padding: 0 0 0 8%;
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

  .checkout-price {
    display: inline-block;
    font-size: 16px;
    margin: 15px 20px;
  }

</style>