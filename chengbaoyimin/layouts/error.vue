<template>
  <div>
    <!-- 404 Start -->
    <section class="section-404" style="background-image: url(/images/404-bg.jpg);">
        <div class="middle-404">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 offset-lg-2 col-md-12">
                        <div class="content-404">
                            <img src="/images/404.png" alt="">
                            <h2>抱歉，您访问的页面有问题!</h2>
                            <ul>
                                <li><a href="/">返回城堡移民首页</a></li>
                                <li><a href="/contact">联系我们</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>  
    <!-- 404 End -->
  </div>
</template>

<script>
  export default {
    props: ['error'],
    layout: 'wrong' // you can set a custom layout for the error page
  }
</script>