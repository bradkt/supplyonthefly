<template>
    <transition>
        <section>
            <div>
                <img class="img-responsive text-center" v-bind:src="'http://www.supplyonthefly.site/product-images/' + product.imageName" alt="product image">
            </div>
            <div>
                <h2>{{ product.name }}</h2>
                <p>SKU: {{ product.sku }}</p>
                <p>Price: ${{ product.price }}</p>
                <h5>In Stock: {{ product.quantity }}</h5>
                <p>{{ product.description }}</p>
                <button @click.prevent="addToCart(product)">
                    <span v-if="product.cartQuantity >= 1">{{ dirtyButtonText }}</span>
                    <span v-else>{{ buttonText }}</span>
                </button>
            </div>
        </section>
    </transition>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { mapActions } from 'vuex';

    export default {
        props: {
            product: {
                required: true
            }
        },
        name: 'ProductSingle',
        data () {
            return {
                isLoggedIn: this.isLoggedIn,
                buttonText: 'Add To Cart',
                dirtyButtonText: 'Product In Cart',
            }
        },
        computed: {
            ...mapGetters({
                isLoggedIn: 'isLoggedIn',
            })
        },
        methods: {
            ...mapActions({
                addToCart: 'addToCart',
                removeFromCart: 'removeFromCart'
            }),
        }
    }
</script>

<style scoped>

    .v-enter, .v-leave-to {
        opacity: 0;
    }

    .v-enter-active, .v-leave-active {
        -webkit-transition: opacity 2s;
        -moz-transition: opacity 2s;
        -ms-transition: opacity 2s;
        -o-transition: opacity 2s;
        transition: opacity 2s;
    }

    section {
        margin: 40px auto;
        width: 70%;
        text-align: center;
        font-family: Helvetica, sans-serif;
    }

    img {
        height: 350px;
        margin: 0 auto;
    }

    @media only screen and (max-width: 745px) {
        section {
            width: 95%;
        }
    }

</style>