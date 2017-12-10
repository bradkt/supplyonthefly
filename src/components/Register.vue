<template>
  <div class="modal fade" id="RegisterModal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">

        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">Register An Account</h4>
        </div>

        <div class="modal-body" v-if="!registerSuccess">
          <form>
            <p :class="{ 'control': true }">
              <input id="firstName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('firstName') }"
                     data-vv-delay="300" name="firstName" type="text" placeholder="First Name" v-model="person.firstName" required autofocus>
              <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
            </p>

            <p :class="{ 'control': false }">
              <input id="lastName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('lastName') }"
                     data-vv-delay="300" name="lastName" type="text" placeholder="Last Name" v-model="person.lastName" required autofocus>
              <span v-show="errors.has('lastName')" class="help is-danger">{{ errors.first('lastName') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="email" id="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
                     data-vv-delay="300" name="email" type="text" placeholder="Email" v-model="person.login.username" required autofocus>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="address" id="address" v-validate="{ required: true, regex: /^[-\w\s]+$/ }" :class="{'input': true, 'is-danger': errors.has('address') }"
                     data-vv-delay="300" name="address" type="text" placeholder="Street Address" v-model="person.address" required>
              <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span autofocus>
            </p>

            <p :class="{ 'control': true }">
              <input ref="city" id="city" v-validate="'required|alpha_spaces'" :class="{'input': true, 'is-danger': errors.has('alpha') }"
                     data-vv-delay="300" name="city" type="text" placeholder="City" v-model="person.city" required>
              <span v-show="errors.has('alpha')" class="help is-danger">{{ errors.first('alpha') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="state" id="state" v-validate="{ required: true, regex: /^[A-Z]{2}$/g }" :class="{'input': true, 'is-danger': errors.has('alpha') }"
                     data-vv-delay="300" name="state" type="text" placeholder="State ex: OH" v-model="person.state" required>
              <span v-show="errors.has('alpha')" class="help is-danger">{{ errors.first('alpha') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="zipcode" id="zipcode" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('numeric') }"
                     data-vv-delay="300" name="zipcode" type="text" placeholder="Zip Code (ex: 43235)" v-model="person.zipcode" required>
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

        <div v-if="registerSuccess" class="modal-body card-wrapper">
          <form>
            <p><strong>{{ RegisterMessage }}</strong></p>
            <p>{{ RegisterSubMessage }}</p>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>

          <button :disabled="isDisabled" @click.prevent="register" class="btn btn-primary">Register</button>
          <div class="login-help">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import moment from 'moment'

    export default {
//        name: 'Register',
        data () {
            return {
                headerText: "Supply On The Fly",
                registerSuccess: false,
                RegisterMessage: 'Thank You For Registering!',
                RegisterSubMessage: 'You will receive a confirmation email shortly. Pick out items today and have them as early as tomorrow!',
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
                    registrationDate: this.moment(), //this.moment(new Date()),
                    login:{
                        password: '',
                        username: '',
                    },
                },
                employee: {
                    department: 'NewHireDepartment',
                    employeeNumber: this.randomString(9),
                    hireDate: this.moment(), //this.moment(new Date()),
                    role: 'NewHireRole',
                },
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
                if (!this.errors.any() && this.person.email !== '' && this.password !== '' && this.firstName !== ''){
                    return false;
                } else {
                    return true;
                }
            },
            verifiedPW(){
                if(this.person.password === this.passwordVerify){
                    return true;
                }
            },
        },
        methods: {
            register: function(){
                if(this.person.login.username.match("@supplyonthefly.")){
                    this.registerEmployee(this.sendEmployeeEmail);
                } else {
                    this.registerCustomer(this.sendCustomerEmail);
                }
            },
            registerCustomer(cb){
                let _this = this;
                this.axios.post('http://supplyonthefly.business:8080/capstone-website-api/user/register/customer', {
                    customer: this.customer,
                    person: this.person,
                }).then(function (response) {
                        cb();
                        console.log(response);
                        _this.registerSuccess = true;
                        _this.clearform();
                }).catch(function (error) {
                    console.log(error);
                });
            },
            registerEmployee(cb){
                let _this = this;
                let password = this.randomString(9);
                this.person.login.password = password;
                this.passwordVerify = password;
                console.log(this.person);
                this.axios.post('http://supplyonthefly.business:8080/capstone-website-api/user/register/employee', {
                    employee: this.employee,
                    person: this.person,
                }).then(function (response) {
                    cb(password);
                    console.log(response);
                    _this.registerSuccess = true;
                    _this.RegisterMessage = 'Thank You for submitting your employee Profile';
                    _this.RegisterSubMessage = 'You will soon receive an email containing your password to login';
                    _this.clearform();
                }).catch(function (error) {
                    console.log(error);
                });
            },
            sendCustomerEmail(){
                let user = this.person;

                this.axios({
                    method: 'post',
                    url: 'http://13.58.119.213:3000/customer',
                    params: {user: user},
                    headers: {'Content-Type': 'multipart/form-data'}
                }).then(function (response) {
                    console.log(response);
                }).catch(function (error) {
                    console.log(error);
                });
            },
            sendEmployeeEmail(password){
                this.person.login.password = password;
                let user = this.person;
                this.axios.post('http://13.58.119.213:3000/employee', {
                    user: user,
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
            clearform(){
                this.person = {
                        altEmail: '',
                        firstName: '',
                        lastName: '',
                        address: '',
                        city: '',
                        zipcode: '',
                        state: '',
                        phoneNumber: '',
                        registrationDate: '',
                        login:{
                        password: '',
                            username: '',
                    },
                },
                this.employee = {
                    department: '',
                        employeeNumber: '',
                        hireDate: '',
                        role: '',
                },
                this.customer = {
                    cardIssuer: '',
                        ccFirstname: '',
                        ccLastname: '',
                        creditcardNumber: '',
                        customerId: '',
                        cvv: '',
                        expDate: '',
                        imageName: '',
                }
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