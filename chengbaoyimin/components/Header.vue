<template>
  <!-- Header Start -->
  <header class="header-02 sticky">
      <!-- Topbar Start -->
      <div class="topbar">
          <div class="container">
              <div class="row">
                  <div class="col-12">
                      <div class="topinfo text-left left">
                          <p><i class="icon_chat"></i>微信: chengbaoyimin  QQ: 3580920897</p>
                      </div>
                      <div class="text-right">
                          <a href="/contact" class="bisylms-btn-2"><i class="icon_phone"></i> (+86) 17357954271</a>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      <!-- Topbar End -->
      <div class="tophead container">
          <div class="row">
              <div class="col-lg-12">
                  <nav class="navbar navbar-expand-lg">
                      <!-- logo Start-->
                      <a class="navbar-brand" href="/">
                          <img src="/images/logo.png" alt="">
                      </a>
                      <!-- logo End-->

                      <!-- Moblie Btn Start -->
                      <button class="navbar-toggler" type="button">
                          <i class="fal fa-bars"></i>
                      </button>
                      <!-- Moblie Btn End -->

                      <!-- Nav Menu Start -->
                      <div class="collapse navbar-collapse">
                          <ul class="navbar-nav">
                              <li >
                                  <a href="/" v-bind:class="{ active: path=='/'}">首页</a>
                              </li>
                              <li >
                                  <a href="/articles" v-bind:class="{ active: path=='/articles'}">欧洲新闻快讯</a>
                              </li>
                              <li >
                                  <a href="/about-slovak" v-bind:class="{ active: path=='/about-slovak'}">为什么是斯洛伐克</a>
                                  
                              </li>
                              <li class="menu-item-has-children">
                                  <a href="javascript:void(0);" v-bind:class="{ active: path=='/project1'||path=='/project2'}">项目介绍</a>
                                  <ul class="sub-menu">
                                      <li><a href="/project1" v-bind:class="{ active: path=='/project1'}">创业项目</a></li>
                                      <li><a href="/project2" v-bind:class="{ active: path=='/project2'}">购买商业房产</a></li>
                                  </ul>
                              </li>
                              <li >
                                  <a href="/about" v-bind:class="{ active: path=='/about'}">为什么选城堡移民</a>
                                  
                              </li>
                              <li>
                                  <a href="/contact" v-bind:class="{ active: path=='/contact'}">联系我们</a>
                              </li>
                          </ul>
                      </div>
                      <!-- Nav Menu End -->

                  </nav>
              </div>
          </div>
      </div>
  </header>
  <!-- Header End -->
</template>
<script>
export default {
  data() {
    return {
      path: this.$route.path
    };
  },
};
</script>
