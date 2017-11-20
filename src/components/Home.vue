<template>
  <section>

    <hr class="featurette-divider">

    <div class="container marketing">
      <div class="row lead">
        <h2>Browse. Work. Play. Products to fit every need</h2>
      </div>
      <div class="row category-images">

        <div class="col-md-3">
          <img class="round-corners" src="http://www.supplyonthefly.site/product-images/monitor_03.jpg" alt="Generic placeholder image" width="180">
          <h2>Monitors</h2>
          <router-link
                  :to="{ name: 'ProductMultiple', params: { category: 'Monitor' } }"
                  tag="p"
                  class="btn btn-default">
            <a href="#">View details &raquo;</a>
          </router-link>
        </div><!-- /.col-lg-4 -->

        <div class="col-md-3">
          <img class="round-corners" src="http://www.supplyonthefly.site/product-images/printer02.jpg" alt="Generic placeholder image" width="180">
          <h2>Printers</h2>

          <router-link
                 :to="{ name: 'ProductMultiple', params: { category: 'Print' } }"
                 tag="p"
                 class="btn btn-default">
            <a href="#">View details &raquo;</a>
          </router-link>

        </div><!-- /.col-lg-4 -->

        <div class="col-md-3">
          <img class="round-corners" src="http://www.supplyonthefly.site/product-images/keyboard_03.jpg" alt="Generic placeholder image" width="180">
          <h2>Keyboards</h2>
          <router-link
                  :to="{ name: 'ProductMultiple', params: { category: 'Keyboard' } }"
                  tag="p"
                  class="btn btn-default">
            <a href="#">View details &raquo;</a>
          </router-link>
        </div>

        <div class="col-md-3">
          <img class="round-corners" src="http://www.supplyonthefly.site/product-images/laptop_computer_03.jpg" alt="Generic placeholder image" width="180">
          <h2>Laptops</h2>
          <router-link
                  :to="{ name: 'ProductMultiple', params: { category: 'Laptop' } }"
                  tag="p"
                  class="btn btn-default">
            <a href="#">View details &raquo;</a>
          </router-link>
        </div><!-- /.col-lg-4 -->

      </div><!-- /.row -->

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-12">
          <h2 class="featurette-heading">Products so Fabulous <span class="text-muted">It may blow your mind.</span></h2>
          <p class="lead">Supply On the Fly sells only the highest quality products from the most respected brands. You except the best, so that's what you will get from us.</p>
        </div>
        <!--<div class="col-md-5">-->
          <!--<img class="featurette-image img-responsive center-block round-corners" src="http://www.supplyonthefly.site/product-images/binder01.jpg" alt="Generic placeholder image">-->
        <!--</div>-->
      </div>

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-5">
          <img class="featurette-image img-responsive center-block round-corners" src="http://www.supplyonthefly.site/images/fast_shipping.jpg" alt="Generic placeholder image">
        </div>
        <div class="col-md-7">
          <h2 class="featurette-heading">Shipping so fast <span class="text-muted">You will question how it's possible</span></h2>
          <p class="lead">We get it, you do not place orders for product you would like to use one day, it's because you need it... and you need it now. Supply On The Fly has you covered with the quickest delivery in the business.</p>
        </div>

      </div>

      <hr class="featurette-divider">

      <div class="row featurette">
        <div class="col-md-7">
          <h2 class="featurette-heading">Hassle Free Shopping. <span class="text-muted"> Because you just found out that you need this one not that one.</span></h2>
          <p class="lead">If you find that for any reason that you do not want to keep an item return it at no additional cost.</p>
        </div>
        <div class="col-md-5">
          <img class="featurette-image img-responsive center-block round-corners" src="http://www.supplyonthefly.site/images/hassle-free-1.jpg" alt="Generic placeholder image" height="250" width="250">
        </div>
      </div>

      <hr class="featurette-divider">

      <!-- /END THE FEATURETTES -->
    <!--<icon name="language" scale="3"></icon>-->
    </div>
  </section>
</template>

<script>
    export default {
      name: 'home',
      data () {
        return {
        }
      },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  
  .round-corners {
    -webkit-border-radius: 15px;
    -moz-border-radius: 15px;
    border-radius: 15px;
  }

  .lead {
    margin: 15px 0;
  }
</style>
