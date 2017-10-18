<template>
  <div class="modal fade" id="LoginModal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">Login to Your Account</h4>
        </div>
        <div class="modal-body">

          <form @submit.prevent="isDisabled">
            <p :class="{ 'control': true }">
              <input ref="email" id="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }"
                     name="email" type="text" placeholder="Email" v-model="email" data-vv-delay="200" required autofocus>
              <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
            </p>
            <p :class="{ 'control': true }">
              <input id="password" v-validate="'required|alpha_num'" :class="{'input': true, 'is-danger': errors.has('password') }"
                     name="password" type="text" placeholder="Password" data-vv-delay="200" v-model="password" required>
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </p>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button :disabled="isDisabled" @click.prevent="authLogin" type="submit" class="btn btn-primary">Login</button>
          <div class="login-help">
            <a href="#">Forgot Password</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapActions } from 'vuex';

    export default {
//        name: 'Login',
        data () {
            return {
                email: '',
                password: '',
                headerText: "Supply On The Fly",
            }
        },
        created: function () {

        },
        computed: {
            isDisabled(){
                return this.errors.any() || this.email === '';
            },

        },
        methods: {
            ...mapActions({
                login: 'login',
                logout: 'logout',
            }),
            authLogin(){
                console.log("You have logged in");
//                this.$http.post('http://api.openweathdf39239')
//                    .then(
//                        response => response.json(),
//                        response => alert("error")
//                    )
//                    .then(value => this.info = value);
                this.login();
            }
        }
    }

</script>

<style scoped>

  #LoginModal input[type=text], input[type=password] {
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

  #LoginModal input[type=text]:hover, input[type=password]:hover {
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

  .fa-icon {
    margin: 10px 10px;
  }

  .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {
    background-color: rgba(50, 50, 50, 0.3);
    border-color: #337ab7;
  }

  .nav > li > a:hover, .nav > li > a:focus {
    background-color: rgba(150, 50, 50, 0.3);
  }

  .dropdown-menu {
    background-color: rgba(50, 50, 50, 0.9);
  }

  .dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {
    background-color: rgba(150, 50, 50, 0.5);
  }

</style>