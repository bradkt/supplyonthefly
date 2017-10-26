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
                <a>{{ product.name }}</a>
            </router-link>
            <p>SKU: {{ product.sku }}</p>
            <p>Price: ${{ product.price }}</p>
            <h5>In Stock: {{ product.quantity }}</h5>
            <p>{{ product.description }}</p>
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
                searchTerm: '',
            }
        },
        created(){

        },
        beforeCreate: function() {
            console.log("before - created");
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
                getProducts: 'getProducts',
            }),
            filteredProducts(){
                return this.getProducts.list.filter((product) => {
                    return product.name.match(new RegExp(this.searchTerm, 'i'));
                })
            }
        },
        methods: {
            ...mapActions({
                addToCart: "addToCart",
            }),
            auth: function(){
                this.axios.get('').then((response) => {
                    console.log(response.data)
                })
            },
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