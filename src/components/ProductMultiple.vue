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
            <img class="pull-left img-responsive" v-bind:src="'http://www.supplyonthefly.site/product-images/' + product.imageName" alt="product image">

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
            <button type="button" data-loading-text="Loading..." class="" :class="{disabledButton: isDisabled(product)}"
                    ref="addToCartButton" :disabled="isDisabled(product)"
                    autocomplete="off" @click.prevent="addToCart(product)">
                <span v-if="product.cartQuantity >= 1">{{ dirtyButtonText }}</span>
                <span v-else>{{ buttonText }}</span>
                </button>
        </div>
        <div v-show="filteredProducts.length == 0" class="emptyProductReturn productInList">
          <h2>There are no products Matching this search.</h2>
        </div>
    </section>
</template>

<script>

    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';
    //https://getbootstrap.com/docs/3.3/javascript/#buttons-stateful


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
                buttonText: 'Add To Cart',
                dirtyButtonText: 'Product In Cart',
            }
        },
        created(){

        },
        beforeCreate: function() {

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
            addProductToCart(){
//                jQuery('.addToCartButton').on('click', function () {
//                    jQuery(this).text('Product In Cart'); // button text will be "finished!"
//                })
//                this.$refs.addToCartButton.innerText = this.dirtyButtonText;
            },
            isDisabled(product){
                if (product.quantity < 1){
                    return true;
                }
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

    .emptyProductReturn h2 {
      margin: 65px 0 0 0;
    }

    .productInList {
        margin: 10px 10px;
        height: 220px;
        border: 1px rgba(50, 50, 50, 0.3) solid;
        /*width: 45%;*/
    }

    .productInList img {
        /*width: 215px;*/
        height: 200px;
    }

    .product-title {
        margin-top: 25px;
    }

    .disabledButton{
        background-color: rgba(221, 64, 64, 0.5);
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