<template>
    <section>
        <div>
            <img class="img-responsive" src="http://via.placeholder.com/250x250" alt="Generic placeholder image" width="250" height="250">
        </div>
        <div>
            <h2>{{ product.title }}</h2>
            <p>{{ product.inStock }}</p>
            <p>{{ product.price }}</p>
            <p>{{ product.description }}</p>
            <button @click.prevent="addToCart(product)">Add To Cart</button>
        </div>
    </section>
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
                publishImmediatly: false,
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
            auth: function(){
                this.axios.get('').then((response) => {
                    console.log(response.data)
                })
            }
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

    section {
        margin: 40px auto;
        width: 70%;
        text-align: center;
        font-family: Helvetica, sans-serif;
    }

    @media only screen and (max-width: 745px) {
        section {
            width: 95%;
        }
    }

</style>