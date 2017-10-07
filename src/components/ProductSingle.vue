<template>
    <section>
        <div>
            <icon name="language" scale="3"></icon>
        </div>
        <div>
            <h2>{{ product.title }}</h2>
            <p>{{ product.inStock }}</p>
            <p>{{ product.price }}</p>
            <p>{{ product.description }}</p>
            <button @click.prevent="addToCart(product)">Add To Cart</button>
            <button @click.prevent="removeFromCart(product)">Remove From Cart</button>
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
                publishImmediatly: false,
            }
        },

        computed: {
            ...mapGetters({
                getIsLoggedIn: 'getIsLoggedIn',
            })
        },
        methods: {
            ...mapActions({
                addToCart: 'addToCart',
                removeFromCart: 'removeFromCart'
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
        margin-top: 200px;
        text-align: center;
        font-family: Helvetica, sans-serif;

    }

</style>