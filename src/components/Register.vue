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
                     data-vv-delay="300" name="firstName" type="text" placeholder="First Name" v-model="firstName" required autofocus>
              <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
            </p>

            <p :class="{ 'control': false }">
              <input id="lastName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('lastName') }"
                     data-vv-delay="300" name="lastName" type="text" placeholder="Last Name" v-model="lastName" required>
              <span v-show="errors.has('lastName')" class="help is-danger">{{ errors.first('lastName') }}</span>
            </p>

            <p :class="{ 'control': true }">
              <input ref="email" id="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
                     data-vv-delay="300" name="email" type="text" placeholder="Email" v-model="email" required>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>
            <p :class="{ 'control': true }">
              <input id="password" v-validate="'required|alpha_num'" :class="{'input': true, 'is-danger': errors.has('password') }"
                     data-vv-delay="300" name="password" type="text" placeholder="Password" v-model="password" required>
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
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
                email: '',
                firstName: '',
                lastName: '',
                password: '',
                headerText: "Supply On The Fly",
            }
        },
        created: function () {

        },
        computed: {
            isDisabled(){
                return this.errors.any() || this.email === '';
            }
        },
        methods: {
            register: function(){
                console.log("You have registered");
//                this.$http.post('http://api.openweathdf39239')
//                    .then(
//                        response => response.json(),
//                        response => alert("error")
//                    )
//                    .then(value => this.info = value);
            }
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