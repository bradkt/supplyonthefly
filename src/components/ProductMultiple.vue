<template>
    <section class="container">
        <div>
            <p :class="{ 'control': true }">
                <input id="search" v-validate="{ required: true, regex: /^[-\w\s]+$/ }" data-vv-delay="5" v-model="searchTerm"
                       :class="{'input': true, 'is-danger': errors.has('fullName') }" name="search" type="text" placeholder="Search">
                <p v-show="errors.has('search')" class="help is-danger">Searches should contain Letters and Numbers only</p>
            </p>
        </div>
        <div v-for="product in filteredProducts" class="productInList">
            <img class="pull-left img-responsive" src="http://via.placeholder.com/300x300" alt="product image">
            <router-link
                    :to="{ name: 'ProductSingle', params: { product: product } }"
                    tag="h4"
                    class="product-title">
                <a>{{ product.title }}</a>
            </router-link>
            <p>Price: ${{ product.price }}</p>
            <h5>In Stock: {{ product.inStock }}</h5>
            <!--<p>{{ product.description }}</p>-->
            <button @click.prevent="addToCart(product)">Add To Cart</button>
            <!--<button @click.prevent="removeFromCart(product)">Remove From Cart</button>-->
        </div>
    </section>
</template>

<script>

    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        props: {
            category: {
                required: true
            }
        },
        name: 'ProductMultiple',
        data () {
            return {
                products: [
                    { id: 111, title: "Samsung tv", inStock: 30, price: "399.99", category: "tv", description: "Lorem ipsum dolor sit amet, an nec disputando suscipiantur, graece consetetur at cum. Usu in saepe discere intellegam, audire perpetua cu vim, est impedit erroribus philosophia et. Porro volumus ne quo. An altera voluptaria mea, his id graeci similique. In per dico illum detraxit, diam erat senserit ut duo, cu populo tractatos complectitur est.\n" +
                    "\n" +
                    "Autem imperdiet mnesarchum cum ea. Ad mea dicat omnes, iuvaret convenire percipitur an eum, offendit quaestio ocurreret per ea. Denique officiis praesent at eos, per natum quidam tritani ex. Ex vix eirmod periculis corrumpit." },
                    { id: 222, title: "Lenovo Labtop", inStock: 30, price: "799.99", category: "computers", description: "Lorem ipsum dolor sit amet, an nec disputando suscipiantur, graece consetetur at cum. Usu in saepe discere intellegam, audire perpetua cu vim, est impedit erroribus philosophia et. Porro volumus ne quo. An altera voluptaria mea, his id graeci similique. In per dico illum detraxit, diam erat senserit ut duo, cu populo tractatos complectitur est.\n" +
                    "\n" +
                    "Autem imperdiet mnesarchum cum ea. Ad mea dicat omnes, iuvaret convenire percipitur an eum, offendit quaestio ocurreret per ea. Denique officiis praesent at eos, per natum quidam tritani ex. Ex vix eirmod periculis corrumpit." },
                    { id: 333, title: "Sony Headphones", inStock: 30, price: "89.99", category: "headphones", description: "Lorem ipsum dolor sit amet, an nec disputando suscipiantur, graece consetetur at cum. Usu in saepe discere intellegam, audire perpetua cu vim, est impedit erroribus philosophia et. Porro volumus ne quo. An altera voluptaria mea, his id graeci similique. In per dico illum detraxit, diam erat senserit ut duo, cu populo tractatos complectitur est.\n" +
                    "\n" +
                    "Autem imperdiet mnesarchum cum ea. Ad mea dicat omnes, iuvaret convenire percipitur an eum, offendit quaestio ocurreret per ea. Denique officiis praesent at eos, per natum quidam tritani ex. Ex vix eirmod periculis corrumpit." }
                ],
                searchTerm: "",
            }
        },

        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
            }),
            filteredProducts() {
                return this.products.filter((product) => {
                    return product.title.match(new RegExp(this.searchTerm, 'i'));
                })
            }
        },
        methods: {
            ...mapActions({
                addToCart: "addToCart",
//                removeFromCart: 'removeFromCart'
            }),
            auth: function(){
                this.$http.get('http://api.openweathermap.org/data/2.5/weather?zip=43215,us&appid=36fb15a33bffa22b2734ce51bdf39239')
                    .then(
                        response => response.json(),
                        response => alert("error")
                    )
                    .then(value => this.info = value);
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    section {
        width: 90%;
        margin: 20px auto 0 auto;
        text-align: center;
        font-family: Helvetica, sans-serif;
    }

    #search {
        height: 35px;
        width: 50%;
    }

    .productInList {
        margin: 10px 10px;
        height: 220px;
        border: 1px rgba(50, 50, 50, 0.3) solid;
        /*width: 45%;*/
    }

    .productInList img {
        width: 220px;
        height: 220px;
    }

    .product-title {
        margin-top: 25px;
    }

    @media only screen and (max-width: 745px) {
        section {
            width: 95%;
        }

        .productInList {
            /*margin: 10px 0px;*/
            /*width: 100%;*/
        }
    }



</style>