<template>
    <transition>
        <header>
        <div class="navbar-wrapper customHeaderTall"
             :class="{customHeaderShort: this.$route.fullPath === '/' ? false : true}">

            <div class="container">

                <nav class="navbar navbar-static-top">
                    <div class="container">
                        <div class="navbar-header">
                            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
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
                                <li data-toggle="collapse" data-target="#navbar" class="active"><a href="#">Home</a></li>
                                <li data-toggle="collapse" data-target="#navbar"><a href="#about">About</a></li>
                                <li><a data-toggle="modal" data-target="#ContactModal" class="menu-item">Contact</a></li>
                                <li class="dropdown menu-item">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button">Categories <span class="caret"></span></a>
                                    <ul class="dropdown-menu">
                                        <router-link v-for="category in categories"
                                                :to="{ name: 'ProductMultiple', params: { category: category } }"
                                                tag="li"
                                                class="">
                                            <a data-toggle="collapse" data-target="#navbar" href="#">{{ category }}</a>
                                        </router-link>
                                    </ul>
                                </li>
                                <li class="space">|</li>
                                <li v-if="!isLoggedIn" class="menu-item"><a data-toggle="modal" data-target="#LoginModal">Log In</a></li>
                                <li v-if="!isLoggedIn" class="menu-item"><a data-toggle="modal" data-target="#RegisterModal">Register</a></li>
                                <li v-if="isLoggedIn" class="menu-icons">
                                  <router-link
                                  :to="{ name: 'FlyCart' }"
                                  tag="a">
                                  <icon name="shopping-cart" scale="2"></icon>
                                  </router-link>
                                </li>

                                <li v-if="isLoggedIn" class="dropdown menu-icons">
                                    <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button"><icon name="user-circle" scale="2"></icon></a>
                                    <ul class="dropdown-menu">
                                        <li>
                                          <a @click.prevent="logout">Logout</a>
                                        </li>
                                        <li>
                                            <a data-toggle="modal" data-target="#updateInformationModal">Profile Information</a>
                                        </li>
                                        <router-link v-if="getUserData.employee" tag="li" to="/employee_portal">
                                            <a>Employee Portal</a>
                                        </router-link>
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

<!--Contact Modal-->
   <updater></updater>

    </header>
    </transition>
</template>
<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    import login from './Login.vue';
    import register from './Register.vue';
    import contact from './Contact.vue';
    import updater from './updateInformation.vue';

    export default {
        name: 'FlyHeader',
        components: {
            'login': login,
            'register': register,
            'contact': contact,
            'updater': updater,
        },
        data () {
            return {
                headerText: "Supply On The Fly",
                publishImmediatly: false,
                categories: [],
                }
        },
        created: function () {
            this.getCategories();
        },
        watch: {
            isLoggedIn: function () {
                this.$router.push('/');
            }
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
                getCart: 'getCart',
                getCartTotal: 'getCartTotal',
                getUserData: 'getUserData',
            }),

        },
        methods: {
            ...mapActions({
                login: 'login',
                logout: 'logout',
            }),
            getCategories(){
                this.axios.get('http://supplyonthefly.business:8080/capstone-website-api/product/category').then((response) => {
                    this.categories = response.data.list;
                })
            },
        }
    }
</script>

<style scoped>

    .v-enter, .v-leave-to {
        opacity: 0;
    }

    .v-enter-active, .v-leave-active {
        -webkit-transition: opacity 1s;
        -moz-transition: opacity 1s;
        -ms-transition: opacity 1s;
        -o-transition: opacity 1s;
        transition: opacity 1s;
    }


    header {
        /*max-width: 1200px;*/
        background: url("http://www.supplyOnTheFly.site/images/hp-ink-promo-1008x408.jpg") center center no-repeat;
        /*margin: 0 auto;*/
        width: 100%;
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

    .menu-icons:hover, .menu-item:hover {
        cursor: pointer;
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
        background-color: rgba(150, 150, 150, 0.3);
    }

    .dropdown-menu {
        background-color: rgba(50, 50, 50, 0.9);
    }

    .dropdown-menu > li > a:hover, .dropdown-menu > li > a:focus {
        background-color: rgba(150, 150, 150, 0.5);
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

    @media  {
        header {
            width: 100%;
            background-size: cover;
        }
    }

</style>