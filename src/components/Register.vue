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
                     data-vv-delay="300" name="firstName" type="text" placeholder="First Name" v-model="user.firstName" required autofocus>
              <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
            </p>

            <p :class="{ 'control': false }">
              <input id="lastName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('lastName') }"
                     data-vv-delay="300" name="lastName" type="text" placeholder="Last Name" v-model="user.lastName" required>
              <span v-show="errors.has('lastName')" class="help is-danger">{{ errors.first('lastName') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="email" id="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
                     data-vv-delay="300" name="email" type="text" placeholder="Email" v-model="user.email" required>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="address" id="address" v-validate="{ required: true, regex: /^[-\w\s]+$/ }" :class="{'input': true, 'is-danger': errors.has('address') }"
                     data-vv-delay="300" name="address" type="text" placeholder="Street Address" v-model="user.address" required>
              <span v-show="errors.has('address')" class="help is-danger">{{ errors.first('address') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="city" id="city" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('alpha') }"
                     data-vv-delay="300" name="city" type="text" placeholder="City" v-model="user.city" required>
              <span v-show="errors.has('alpha')" class="help is-danger">{{ errors.first('alpha') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="zip" id="zip" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('numeric') }"
                     data-vv-delay="300" name="zip" type="text" placeholder="Zip" v-model="user.zip" required>
              <span v-show="errors.has('numeric')" class="help is-danger">{{ errors.first('numeric') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="phone" id="phone" v-validate="'required|numeric'" :class="{'input': true, 'is-danger': errors.has('numeric') }"
                     data-vv-delay="300" name="phone" type="text" placeholder="Phone (ex: 614-555-5555)" v-model="user.phone" required>
              <span v-show="errors.has('numeric')" class="help is-danger">{{ errors.first('numeric') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input id="password" v-validate="'required|alpha_num'" :class="{'input': true, 'is-danger': errors.has('password') }"
                     data-vv-delay="300" name="password" type="password" placeholder="Password" v-model="user.password" required>
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
                user: {
                    email: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    city: '',
                    zip: '',
                    phone: '',
                    password: '',
//                    passwordVerify: '',
                },
                headerText: "Supply On The Fly",
            }
        },
        created: function () {

        },
        computed: {
            isDisabled(){
                return this.errors.any()// || this.user.email === '';
            },
            verifiedPW(){
                if(this.user.password === this.user.passwordVerify){
                    return true;
                }
                else{
                    return false;
                }
            },

        },
        methods: {
            register: function(){
                console.log(this.user);
                this.axios.post('http://supplyonthefly.business:8080/capstone-website-api/register', {
                    firstname: this.user.firstName,
                    lastname: this.user.lastName,
                    email: this.user.email,
                    phone: this.user.phone,
                    address: this.user.address,
                    city: this.user.city,
                    zip: this.user.zip,
                    password: this.user.password,
                })
                .then(function (response) {
                    console.log(response);
                })
                .catch(function (error) {
                    console.log(error);
                });
            },

        }
    }

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