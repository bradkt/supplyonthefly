<template>
  <transition>
    <section>
      <!-- First Container -->
      <div class="container-fluid bg-1 text-center">
        <h3 class="mission text-center">Our mission is to provide all your office supply needs at a competitive price with the fastest shipping in the industry.</h3>
      </div>

      <!-- Second Container -->
      <div class="container-fluid bg-2 text-center">
        <h3 class="margin">Company History</h3>
        <img class="img-responsive header-image" src="../assets/supply-on-the-fly-logo.png" alt="SOFT Logo">
        <p>Supply on the Fly is an office supply company established in 1992 by James Howlett, on the concept of providing customers with office products in a swift and timely manner. At a young age James knew he could provide faster delivery times and lower prices with superior service that the competition, especially to the local business community. At 19 years of age James quit college and set out on his entrepreneurial journey.</p>
        <p>Having delivered to the local business for many years, James acquired a sense for what local businesses needed from a supply company and more importantly, he learned they wanted it fast. Armed with this knowledge he converted his garage into Supply on the Fly’s first distribution center in and began to take orders. Working out of his garage he served the Columbus, Ohio market with same day or next day delivery of office supplies. As the company’s reputation for great service at a competitive price spread, companies from other markets began to place orders with Supply on the Fly; because of our commitment to excellence, these customers receive the same level of service as the local customer. As word of the great prices and lightning fast delivery spread, so did the company.</p>

      </div>

      <!-- Third Container (Grid) -->
      <div class="container-fluid bg-3 text-center">
        <h3 class="margin">Where To Find Us?</h3><br>
        <div class="row">
          <div class="col-sm-4 social-1">
            <h1><a href="https://www.facebook.com/SupplyFlyUS">Facebook</a></h1>
          </div>
          <div class="col-sm-4 social-2">
            <h1><a href="https://twitter.com/SupplyFlyUS">Twitter</a></h1>
          </div>
          <div class="col-sm-4 social-3">
            <h1><a href="https://www.youtube.com/channel/UCxgrC3ob8EQ0j-3zRDvH1kg">Google</a></h1>
          </div>
        </div>
      </div>

    </section>
  </transition>
</template>

<script>
    export default {
        name: 'About',
        data() {
            return {
                Text: "Our Mission"
            };
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

  .mission {
    width: 80%;
    margin: 5px auto;
  }

  .header-image {
    margin: 0 auto
  }

  p {
    font-size: 16px;
    margin: 25px 0 10px 0;
  }

  .margin {
    margin-bottom: 45px;
  }
  .bg-1 {
    background-color: #00BEC5;
    color: #ffffff;
  }
  .bg-2 {
    background-color: #474e5d; /* Dark Blue */
    color: #ffffff;
  }
  .bg-2 p {
    width: 85%;
    margin: 45px auto 5px auto;
  }
  .bg-3 {
    background-color: #ffffff; /* White */
    color: #555555;
  }
  .container-fluid {
    padding-top: 70px;
    padding-bottom: 70px;
  }
  .social-1 {
    background-color: #40a4c5;
  }

  .social-1 a {
    color: #ffffff;
  }

  .social-2 {
    background-color: #3289b0; /* Dark Blue */
  }

  .social-2 a {
    color: #ffffff;
  }

  .social-3 {
    background-color: #ff1437; /* White */
  }

  .social-3 a {
    color: #ffffff;
  }

</style>