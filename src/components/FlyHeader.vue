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
                            <a class="navbar-brand" href="#"><img class="img-responsive header-logo" src="~../assets/supply-on-the-fly-logo-350.png"
                                                                  alt="SOTF Logo" width="200" height="30"></a>
                        </div>
                        <div id="navbar" class="navbar-collapse collapse">
                            <ul class="nav navbar-nav">
                                <li class="active"><a href="#">Home</a></li>
                                <li><a href="#about">About</a></li>
                                <li><a data-toggle="modal" data-target="#ContactModal">Contact</a></li>
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
                                <li class="space">|</li>
                                <li v-if="!getIsLoggedIn"><a data-toggle="modal" data-target="#LoginModal">Log In</a></li>
                                <li v-if="!getIsLoggedIn"><a data-toggle="modal" data-target="#RegisterModal">Register</a></li>
                                <li v-if="getIsLoggedIn" class="menu-icons">
                                  <router-link
                                  :to="{ name: 'FlyCart' }"
                                  tag="a">
                                  <icon name="shopping-cart" scale="2"></icon>
                                  </router-link>
                                </li>

                                <li v-if="getIsLoggedIn" class="dropdown menu-icons">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"><icon name="user-circle" scale="2"></icon></a>
                                    <ul class="dropdown-menu">
                                        <li>
                                          <a @click.prevent="logout">Logout</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>

            </div>
        </div>

<!-- Log In Modal -->
    <login></login>

<!-- Register Modal -->
    <register></register>

<!--Contact Modal-->
     <contact></contact>

    </header>



</template>
<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import login from './Login.vue';
    import register from './Register.vue';
    import contact from './Contact.vue';

    export default {
        name: 'FlyHeader',
        components: {
            'login': login,
            'register': register,
            'contact': contact,
        },
        data () {
            return {
                headerText: "Supply On The Fly",
                publishImmediatly: false,
                categories: {Category1: "Monitors", Category2: "Computer", Category3: "Staples", Category4: "pens",
                    Category5: "printer", Category6: "Notebooks"},
                }
        },
        created: function () {

        },
        computed: {
            ...mapGetters({
                getIsLoggedIn: 'getIsLoggedIn',
                getCart: 'getCart',
                getCartTotal: 'getCartTotal'
            }),
        },
        methods: {
            ...mapActions({
                login: 'login',
                logout: 'logout',
            }),
        }
    }
</script>

<style scoped>

    header {
        width: 100%;
        background: url("http://www.freerangehacks.com/supplyOnTheFly/images/sotf-image-header.jpg") center center no-repeat;
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

    .header-logo {
        border-radius: 5px;
        margin-top: -5px;
    }

    .menu-icons {
        margin: -10px 0px 0 0px;
    }

    .space {
      display: block;
      width: 50px;
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

    button.navbar-toggle, button.navbar-toggle.collapsed{
        background-color: rgba(255,255,255,.6);
        transform-origin: 4px 0px;
        border: solid #ffffff 1px;
    }

    .icon-bar {
        width: 30px;
        height: 2px;
        background-color: rgba(92,92,92,.9);
        margin: 4px 0;
    }

    header .navbar-wrapper .navbar-static-top .container[data-v-aa5c1a1a] {
        background-color: rgba(50, 50, 50, 0.7);
    }

</style>