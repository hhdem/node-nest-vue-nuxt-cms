<template>
  <div>
    <!-- Preloader Icon -->
    <div class="preloader">
        <div class="loaderInner">
            <div id="top" class="mask">
                <div class="plane"></div>
            </div>
            <div id="middle" class="mask">
                <div class="plane"></div>
            </div>
            <div id="bottom" class="mask">
                <div class="plane"></div>
            </div>
            <p>LOADING...</p>
        </div>
    </div>
    <!-- Preloader Icon -->
    <Header />
    <nuxt />
    <Footer />
    <!-- Back To Top -->
    <a href="#" id="back-to-top">
        <i class="fal fa-angle-double-up"></i>
    </a>
    <!-- Back To Top -->
  </div>
  <!-- Start Include All JS -->
</template>
<script>
import Header from "~/components/Header.vue";
import Footer from "~/components/Footer.vue";

export default {
  components: {
    Header,
    Footer
  }
};
</script>
