<template>
<div >
<!-- Banner Start -->
        <section class="page-banner-nocover single-p-banner" style="background-image: url(/images/banner3.jpg);">
            <div class="container">
                <div class="row">
                    <div class="col-lg-5 title-banner">
                        <a class="post-cate" href="#">城堡移民</a>
                        <h2 class="banner-title">
                            联系我们
                        </h2>
                    </div>
                </div>
            </div>
        </section>  
        <!-- Banner End -->

    <!-- Package Start -->
    <section class="package-section" style="background-image: url(/images/home/package-bg.jpg);">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h2 class="sec-title"><span>联系方式</span></h2>
                </div>
            </div>
            <div class="row justify-content-center">
                <div class="col-md-4">
                    <div class="icon-contacts pb-3">
                        <h5 class="align-left mbr-fonts-style display-7">
                            我们欢迎任何咨询
                        </h5>
                        <p class="mbr-text align-left mbr-fonts-style display-7">
                            电话: (+86) 173 5795 4271
                        </p>
                        <p class="mbr-text align-left mbr-fonts-style display-7">
                            电子邮箱: chengbaoyimin@gmail.com
                        </p>
                    </div>
                </div>
                <div class="col-md-8">
                    
                    <div class="row">
                        <div class="col-4">
                            <p class="mbr-text align-left mbr-fonts-style display-7">
                                微信: chengbaoyimin
                            </p>
                            <img src="/images/vx.jpeg" class="img-fluid" alt="">
                        </div>
                        <div class="col-4">
                            <p class="mbr-text align-left mbr-fonts-style display-7">
                                QQ: 3580920897
                            </p>
                            <img src="/images/qq.jpeg" class="img-fluid" alt="">
                        </div>
                        <div class="col-4">
                            <p class="mbr-text align-left mbr-fonts-style display-7">
                                公众号: chengbaoimmi
                            </p>
                            <img src="/images/gzh.jpg" class="img-fluid" alt="">
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
    <!-- Package End -->

        <!-- Cta Start -->
        <section class="cta-section" style="background-image: url(/images/home2/cta-bg.jpg);padding: 150px 0 150px;">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 ">
                        <div class="contact-form">
                            <h4>给我们留言</h4>
                            <p id="msg">所有有效留言都将在8小时内获得电话或邮件形式的回复</p>
                            <form id="customerForm" onsubmit="return false" action="#" class="row">
                                <div class="col-md-12">
                                    <input type="text" name="showname" placeholder="姓名">
                                </div>
                                <div class="col-md-6">
                                    <input type="email" name="email" placeholder="电子邮箱">
                                </div>
                                <div class="col-md-6">
                                    <input type="number" name="mobile" placeholder="电话">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" name="wx" placeholder="微信">
                                </div>
                                <div class="col-md-6">
                                    <input type="text" name="qq" placeholder="QQ">
                                </div>
                                <div class="col-md-12">
                                    <textarea name="note" placeholder="详细个人信息"></textarea>
                                </div>
                                <div class="col-md-6">
                                        <label for="terms-conditions">
                                            当您提交咨询则表明您已经阅读相关的 <a href="/privacy" target="_blank">隐私协议</a>      
                                        </label>
                                </div>
                                <div class="col-md-6 text-right">
                                    <button id="d1" type="button" @click.stop.prevent="handleSubmit()" class="bisylms-btn-2">提交咨询</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Cta End -->
</div>
</template>
<script>
export default {
  data: () => ({
    slide: 0,
    feature: [],
    banner: [],
    list: []
  }),
  methods: {
      async handleSubmit() {
        try {
            const array = $("#customerForm").serializeArray(); // Encodes the set of form elements as an array of names and values.
            const json = {};
            $.each(array, function () {
                json[this.name] = this.value || null;
            });
            const data = await this.$http.$post(`api/customers`, json);
            $('#msg').html('您的咨询信息已经提交，感谢您的信任，我们会在8小时内通过您留下的联系方式与您联系').addClass('text-primary');
        } catch (error) {
            $('#msg').html('请确保填写相关信息后再进行提交').addClass('text-warning');
        }
        // $.ajax({
        //     url:'https://www.chengbaoyimin.com/customer/save',  // url参数可以不写，默认就是当前页面打开的地址
        //     type:'POST',
        //     data:$("#customerForm").serialize(),
        //     success:function (data) {
        //         $('#msg').html('您的咨询信息已经提交，感谢您的信任，我们会在8小时内通过您留下的联系方式与您联系').addClass('text-primary');
        //     }
        // });
      }
  }
};
</script>