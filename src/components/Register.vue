<template>
  <div class="modal fade" id="RegisterModal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">Register An Account</h4>
        </div>
        <div class="modal-body">
          <form>

            <p :class="{ 'control': true }">
              <input id="firstName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('firstName') }"
                     data-vv-delay="300" name="firstName" type="text" placeholder="First Name" v-model="person.firstName" required autofocus>
              <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
            </p>

            <p :class="{ 'control': false }">
              <input id="lastName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('lastName') }"
                     data-vv-delay="300" name="lastName" type="text" placeholder="Last Name" v-model="person.lastName" required>
              <span v-show="errors.has('lastName')" class="help is-danger">{{ errors.first('lastName') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="email" id="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
                     data-vv-delay="300" name="email" type="text" placeholder="Email" v-model="person.login.username" required>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="address" id="address" v-validate="{ required: true, regex: /^[-\w\s]+$/ }" :class="{'input': true, 'is-danger': errors.has('address') }"
                     data-vv-delay="300" name="address" type="text" placeholder="Street Address" v-model="person.address" required>
              <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="city" id="city" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('alpha') }"
                     data-vv-delay="300" name="city" type="text" placeholder="City" v-model="person.city" required>
              <span v-show="errors.has('alpha')" class="help is-danger">{{ errors.first('alpha') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="state" id="state" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('alpha') }"
                     data-vv-delay="300" name="state" type="text" placeholder="State ex: OH" v-model="person.state" required>
              <span v-show="errors.has('alpha')" class="help is-danger">{{ errors.first('alpha') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="zipcode" id="zipcode" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('numeric') }"
                     data-vv-delay="300" name="zipcode" type="text" placeholder="Zip Code" v-model="person.zipcode" required>
              <span v-show="errors.has('numeric')" class="help is-danger">{{ errors.first('numeric') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="phone" id="phoneNumber" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('numeric') }"
                     data-vv-delay="300" name="phone" type="text" placeholder="Phone (ex: 6145555555)" v-model="person.phoneNumber" required>
              <span v-show="errors.has('numeric')" class="help is-danger">{{ errors.first('numeric') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input id="password" v-validate="'required|alpha_num'" :class="{'input': true, 'is-danger': errors.has('password') }"
                     data-vv-delay="300" name="password" type="password" placeholder="Password" v-model="person.login.password" required>
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </p>
            <p :class="{ 'control': true }">
              <input id="passwordVerify" v-validate="'required|confirmed:password'" :class="{'input': true, 'is-danger': errors.has('passwordVerify') }"
                     data-vv-delay="300" data-vv-as="password" name="passwordVerify" type="password" placeholder="Verify Password" required>
              <span v-show="errors.has('passwordVerify')" class="help is-danger">{{ errors.first('passwordVerify') }}</span>
            </p>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

          <button :disabled="isDisabled" @click.prevent="register" type="submit" class="btn btn-primary">Register</button>
          <div class="login-help">
            <!--<a href="#">Forgot Password</a>-->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    export default {
//        name: 'Register',
        data () {
            return {
                // rename all these to match the person object,
                //then employees and coustomers will need their own update endpoint
                //this can be the same as update password when match email
                headerText: "Supply On The Fly",
                passwordVerify: '',
                person: {
                    altEmail: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    zipcode: '',
                    state: '',
                    phoneNumber: '',
                    registrationDate: "2017-11-02",
                    login:{
                        password: '',
                        username: '',
                    },
                },
                employee: {
                    department: 'NewHireDepartment',
                    employeeNumber: this.randomString(9),
                    hireDate: '2014-10-10',
                    role: 'NewHireRole',
                },
                //{"department":"Accounting","employeeNumber":"0000000000","hireDate":"2014-10-10","role":"position"}
                customer: {
                    cardIssuer: '',
                        ccFirstname: '',
                        ccLastname: '',
                        creditcardNumber: '',
                        customerId: this.randomString(9),
                        cvv: '',
                        expDate: '',
                        imageName: '',
                },
            }
        },
        created: function () {

        },
        computed: {
            isDisabled(){
//                return this.errors.any() || this.person.email === '';
                return false;
            },
            verifiedPW(){
                if(this.person.password === this.passwordVerify){
                    return true;
                }
//                else{
//                    return false;
//                }
            },
        },
        methods: {
            register: function(){
                if(this.person.login.username.match("supplyonthefly")){
                    this.registerEmployee(this.sendEmployeeEmail);
                } else {
                    this.registerCustomer(this.sendCustomerEmail);
                }
            },
            registerCustomer(cb){
                console.log('register Customer call');

                this.axios.post('http://supplyonthefly.business:8080/capstone-website-api/user/register/customer', {
                    customer: this.customer,
                    person: this.person,
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
                })
                    .then(function (response) {
                        cb();
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
//                this.sendCustomerEmail();
            },
            registerEmployee(cb){
                console.log('register Employee call');

                this.person.login.password = this.randomString(9);
                console.log(this.person.login);
                this.axios.post('http://supplyonthefly.business:8080/capstone-website-api/user/register/employee', {
                    employee: this.employee,
                    person: this.person,
//                    employee: {
//                        department: "",
//                        employeeNumber: this.randomString(9),//
//                        hireDate: "2017-11-02",
//                        role: "",
//                    },
//                    person: {
//                        address: "140 Louis Lane",
//                        altEmail: "tracy@oneonesupplyonthefly.com",
//                        city: "Columbus",
//                        firstname: "Clark",
//                        lastname: "Kent",
//                        login: {
//                            password: "qwerqwer",
//                            username: "tracy@supplyonthefly.com"
//                        },
//                        phoneNumber: "1-800-322-5951",
//                        registrationDate: "2017-11-02",
//                        state: "OH",
//                        zipcode: "43235"
//                    }
                })
                .then(function (response) {
                    cb();
                    console.log(response);
                })
                .catch(function (error) {

                    console.log(error);
                });
//                this.sendEmployeeEmail();
            },
            sendCustomerEmail(){

                this.axios.post('http://localhost:8081/customer', {

                    user: this.person,

                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {

                    console.log(error);
                });
            },
            sendEmployeeEmail(){
                this.axios.post('http://localhost:8081/employee', {

                    user: this.person,

                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {

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
            }

        }
    }

//    credit_card : {
//        cardIssuer: "",
//            ccFirstname: "",
//            ccLastname: "",
//            customerId: this.customer.customerId,
//            cvv: "",
//            expDat: "",
//            imageName: "",
//    },

</script>

<style scoped>

  #RegisterModal input[type=text], input[type=email], input[type=password] {
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

  #RegisterModal input[type=text]:hover, input[type=email]:hover, input[type=password]:hover {
    border: 1px solid #b9b9b9;
    border-top: 1px solid #a0a0a0;
    -moz-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
    box-shadow: inset 0 1px 2px rgba(0,0,0,0.1);
  }

  .modal-footer {
    text-align: center;
  }

  .modal-footer button, .modal-footer .login-help {
    margin: 15px 0 0 0;
  }

  .menu-icons {
    margin: -10px 0px 0 0px;
  }

</style>