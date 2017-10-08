<template>
  <section>
    <!-- First Container -->
    <div class="container-fluid bg-1 text-center">
      <h3>Our mission is to provide all your office supply needs at a competitive price with the fastest shipping in the industry.</h3>
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
      <h3 class="margin">Where To Us?</h3><br>
      <div class="row">
        <div class="col-sm-4 social-1">
          <h1>Facebook</h1>
          <!--<img class="" src="http://via.placeholder.com/150x150" alt="Generic placeholder image" width="150" height="150">-->
        </div>
        <div class="col-sm-4 social-2">
          <h1>Twitter</h1>
          <!--<img class="" src="http://via.placeholder.com/150x150" alt="Generic placeholder image" width="150" height="150">-->
        </div>
        <div class="col-sm-4 social-3">
          <h1>Google</h1>
          <!--<img class="" src="http://via.placeholder.com/150x150" alt="Generic placeholder image" width="150" height="150">-->
        </div>
      </div>
    </div>

  </section>
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

  section {


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
    color: #ffffff;
  }
  .social-2 {
    background-color: #3289b0; /* Dark Blue */
    color: #ffffff;
  }
  .social-3 {
    background-color: #ff1437; /* White */
    color: #ffffff;
  }

</style>