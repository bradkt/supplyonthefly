<template>
  <div class="modal fade" id="LoginModal" role="dialog">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
          <h4 class="modal-title">{{ header }}</h4>
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
                     name="password" type="password" placeholder="Password" data-vv-delay="200" v-model="password" required>
              <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
            </p>
          </form>

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          <button :disabled="isDisabled" @click.prevent="authUser" type="submit" class="btn btn-primary">Login</button>
          <div class="login-help">
            <a @click.prevent="forgotLogin">Forgot Password</a><span id="emailhelp" class="hidden"> - Please Supply An Email and Try Again</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    import { mapActions } from 'vuex';
//    import { mapGetters } from 'vuex';

    export default {
//        name: 'Login',
        data () {
            return {
                header: 'Login to Your Account',
                email: '',
                password: '',
                headerText: "Supply On The Fly",
            }
        },
        created: function () {

        },
        computed: {
//            ...mapGetters({
//                addUserData: 'addUserData',
//            }),
            isDisabled(){
                return this.errors.any() || this.email === '';
            },

        },
        methods: {
            ...mapActions({
                login: 'login',
                logout: 'logout',
                addUserData: 'addUserData',
            }),
            authUser() {
//                this.login(); //comment out when login works
                this.axios.get(
                    'http://supplyonthefly.business:8080/capstone-website-api/auth/user/login',
                    {auth: {
                        username: this.email,
                        password: this.password,
                    }
                }
                ).then((response) => {
                            this.login();
                            jQuery('#LoginModal').modal('hide');
                            console.log(response);
                            this.addUserData(response.data);
                        },
                        (error) => {
                            console.log(error);
                        }
                );
            },
            forgotLogin() {
//                jQuery("#password").hide();
                this.header = "Let's Recover Your Password"
                if (this.errors.items.length !== 0){
                    jQuery("#emailhelp").removeClass("hidden");
                } else {
                    this.axios.post('http://localhost:8081/recover', {
                    login: {
                        email: this.email,
                        password: this.randomString(9),
                    },
                })
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {

                        console.log(error);
                    });
                }

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

  .hidden {
    display: none;
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