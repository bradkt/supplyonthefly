<template>
  <div id="app">
    <fly-header></fly-header>
    <router-view></router-view>
    <fly-footer></fly-footer>
  </div>
</template>

<script>

  import { mapActions } from 'vuex';

  export default {
      name: 'app',
      created: function () {
          this.axios.get('http://supplyonthefly.business:8080/capstone-website-api/product').then((response) => {
              this.updateProducts(response.data.productList);
          });
          if (window.localStorage.getItem('myCart') === '' || window.localStorage.getItem('myCart') === null){
              window.localStorage.setItem('myCart', JSON.stringify([]));
          }
      },
      methods: {
          ...mapActions({
              updateProducts: "updateProducts",
          }),
      }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>
