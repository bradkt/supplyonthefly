<template>

    <header>

        <div class="navbar-wrapper customHeaderTall"
             :class="{customHeaderShort: this.$route.fullPath === '/' ? false : true}">

            <div class="container">

                <nav class="navbar navbar-static-top">
                    <div class="container">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                                <span class="sr-only">Toggle navigation</span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                                <span class="icon-bar"></span>
                            </button>
                            <a class="navbar-brand" href="#">{{ headerText }}</a>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <ul class="nav navbar-nav">
                                <li class="active"><a href="#">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a href="#contact">Contact</a></li>
                                <li class="dropdown">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Categories <span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <router-link v-for="category in categories"
                                                :to="{ name: 'ProductMultiple', params: { category: category } }"
                                                tag="li"
                                                class="">
                                            <a href="#">{{ category }}</a>
                                        </router-link>
                                    </ul>
                                </li>
                            </ul>
                            <div v-if="!getIsLoggedIn">
                                <button type="button" class="btn" data-toggle="modal" data-target="#LoginModal">
                                    Log In
                                </button>
                                <button type="button" class="btn" data-toggle="modal" data-target="#RegisterModal">
                                    Register
                                </button>
                            </div>
                            <div v-else class="menu-icons">
                                <router-link
                                        :to="{ name: 'FlyCart' }"
                                        tag="a"
                                        >
                                    <span class="glyphicon glyphicon-shopping-cart"></span>
                                </router-link>
                                <a href="#">

                                </a>
                                <a @click.prevent="logout" alt="Log Out">
                                    <span class="glyphicon glyphicon-user"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>

            </div>
        </div>




        <!-- Log In Modal -->
        <div class="modal fade" id="LoginModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                        <h4 class="modal-title">Login to Your Account</h4>
                    </div>
                    <div class="modal-body">

                        <form>
                            <p :class="{ 'control': true }">
                                <input id="login-email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('login-email') }" name="login-email" type="text" placeholder="Email">
                                <span v-show="errors.has('login-email')" class="help is-danger">{{ errors.first('login-email') }}</span>
                            </p>
                            <p :class="{ 'control': true }">
                                <input id="login-password" v-validate="'required|alpha_num'" :class="{'input': true, 'is-danger': errors.has('login-password') }" name="login-password" type="text" placeholder="Password">
                                <span v-show="errors.has('login-password')" class="help is-danger">{{ errors.first('login-password') }}</span>
                            </p>
                        </form>

                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button @click.prevent="login" :disabled="errors.any()" type="button" class="btn btn-primary">Login</button>
                        <div class="login-help">
                            <a href="#">Register</a> - <a href="#">Forgot Password</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Register Modal -->
        <div class="modal fade" id="RegisterModal" tabindex="-1" role="dialog">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
                        <h4 class="modal-title">Register An Account</h4>
                    </div>
                    <div class="modal-body">
                        <form>

                            <p :class="{ 'control': true }">
                                <input id="firstName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('firstName') }" name="firstName" type="text" placeholder="First Name">
                                <span v-show="errors.has('firstName')" class="help is-danger">{{ errors.first('firstName') }}</span>
                            </p>

                            <p :class="{ 'control': true }">
                                <input id="lastName" v-validate="'required|alpha'" :class="{'input': true, 'is-danger': errors.has('lastName') }" name="lastName" type="text" placeholder="Last Name">
                                <span v-show="errors.has('lastName')" class="help is-danger">{{ errors.first('lastName') }}</span>
                            </p>

                            <p :class="{ 'control': true }">
                                <input id="email" v-validate="'required|email'" :class="{'input': true, 'is-danger': errors.has('email') }" name="email" type="text" placeholder="Email">
                                <span v-show="errors.has('email')" class="help is-danger">{{ errors.first('email') }}</span>
                            </p>
                            <p :class="{ 'control': true }">
                                <input id="password" v-validate="'required|alpha_num'" :class="{'input': true, 'is-danger': errors.has('password') }" name="password" type="text" placeholder="Password">
                                <span v-show="errors.has('password')" class="help is-danger">{{ errors.first('password') }}</span>
                            </p>
                        </form>


                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <!--make this a register function-->
                        <button @click.prevent="login" :disabled="errors.any()" type="button" class="btn btn-primary">Register</button>
                        <div class="login-help">
                            <a href="#">Log In</a> - <a href="#">Forgot Password</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </header>



</template>
<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        name: 'FlyHeader',
        data () {
            return {
                username: '',
                password: '',
                headerText: "Supply On The Fly",
                publishImmediatly: false,
                categories: {Category1: "Monitors", Category2: "Computer", Category3: "Staples", Category4: "pens",
                    Category5: "printer", Category6: "Notebooks"},
                }
        },
        created() {
//                this.$http.get('http://api.openweathermap.org/data/2.5/weather?zip=43215,us&appid=36fb15a33bffa22b2734ce51bdf39239')
//                    .then(
//                        response => response.json(),
//                        response => alert("error")
//                    )
//                    .then(value => this.categories = value);
        },
        computed: {
            ...mapGetters({
                getIsLoggedIn: 'getIsLoggedIn',
                getCart: 'getCart',
                getCartTotal: 'getCartTotal'
            })
        },
        methods: {
            ...mapActions({
                login: 'login',
                logout: 'logout',
            })
        }
    }
</script>

<style scoped>

    header {
        width: 100%;
        background: url("../assets/sotf-image-header.jpg") center center no-repeat;
        background-size: cover;
    }

    .customHeaderTall {
        height: 500px;
    }

    .customHeaderShort{
        height: 200px;
    }

    header .navbar-wrapper .btn {
        display: inline;
        margin: 10px 5px 0 5px;
    }

    header .navbar-wrapper .navbar-static-top .container {
        background-color: rgba(50, 50, 50, 0.3);
    }

    header .navbar-wrapper a {
        color: white;
    }

    #LoginModal input[type=text], input[type=password],
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

    #LoginModal input[type=text]:hover, input[type=password]:hover
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

    .menu-icons span {
        margin: 10px 15px 0 15px;
    }

    .glyphicon {
        font-size: 30px;
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