<template>
<div >
        <!-- Blog Start -->
        <section class="blogpage-section" style="padding-top: 200px;">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-7">
                        <div class="row">
                            <ArticleItem v-for="article in articleList" :key="article.id" :initial-item="article" />
                        </div>
                        <Pagination 
                            :path="path"
                            :page-size="limit"
                            :current-page="page"
                            :total="total"
                            :keyword="keyword"
                            :category="category"
                            v-if="total>limit"/>
                    </div>
                    <div class="col-lg-4 col-md-5">
                        <div class="blog-sidebar">
                            <aside class="widget widget-search">
                                <form class="search-form" @submit.prevent.stop="handleSubmit">
                                    <input type="search" name="keyword" v-model="keyword" placeholder="Search...">
                                    <button type="submit"><i class="ti-search"></i></button>
                                </form>
                            </aside>
                            <aside class="widget widget-categories">
                                <h3 class="widget-title">Categories</h3>
                                <ul>
                                    <li><nuxt-link :to="{path: path,query:{page:1}}" :class="!category?'active':''" >全部</nuxt-link></li>
                                    <li v-for="cat in articleCategories" :key="cat.id"><nuxt-link :to="{path: path,query:{page:1, category:cat.id}}" :class="cat.id===category?'active':''" >{{cat.name}}</nuxt-link></li>
                                    <!-- <li><a href="#">Marketing</a><span>(15)</span></li> -->
                                </ul>
                            </aside>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Blog End -->
</div>
</template>
<script>
import Pagination from "../components/Pagination";
import { Toast } from "../plugins/sweetalert2";
import ArticleItem from "../components/ArticleItem";
import articleAPI from "../api/article";
export default {
    watchQuery: ["page", "keyword", "limit", "category"],
    components: {
        ArticleItem,
        Pagination
    },
    data() {
        return {
        articleList: [],
        articleCategories: [],
        total: 0,
        limit: 10,
        page: 1,
        keyword: "",
        category: "",
        currentPage: 1,
        totalPage: -1,
        isProcessing: false,
        };
    },
    // created() {
    //     const { page, keyword, limit, category } = this.$route.query;
    //     this.category = category;
    //     console.info('created ', this.$route.query);
    //     this.fetchArticle({ page, keyword, limit, category });
    //     this.fetchCategoryList({page:1});
    // },
    async asyncData({query}) {
        const { page, keyword, limit, category } = query;
        try {
                const {data, statusText, status} = await articleAPI.getArticles({
                    page,
                    limit,
                    keyword,
                    category,
                });
                if (statusText !== "OK") {
                    throw new Error(statusText);
                }
                // this.articleList = data.data;
                var articleList = data.data.map(v => {
                    const pic = v.pic;

                    if (pic) {
                        // 替换图片路径中的public
                        v.pic = pic.replace("public/", "/");
                    }
                    return v;
                });
                // this.total = data.total;
                // // this.search = data.search;
                // this.currentPage = data.currentPage;
                var total = data.total;


                const {data1, statusText1, status1} = await articleAPI.getArticleCategories({
                    page:1,
                });
                var articleCategories = data1.data;
                
                return {articleList, total, articleCategories}
                // this.pinyinFirstLetter = pinyinFirstLetter;
            } catch (error) {
                console.error(error);
                Toast.fire({
                icon: "error",
                title: "無法取得列表，請稍後再試",
                });
            }

    },
    beforeRouteUpdate(to, from, next) {
        const { page, keyword, limit, category } = to.query;
        this.category = category;
        console.info('beforeRouteUpdate ', to.query);
        this.fetchArticle({ page, keyword, limit, category });
    },
    computed:{
      path(){
        return "/articles";
      }
    },
    methods: {
        async fetchArticle({ page = 1, keyword = null, limit = 10, category = null }) {
            this.isProcessing = true;
            try {
                const {data, statusText, status} = await articleAPI.getArticles({
                    page,
                    limit,
                    keyword,
                    category,
                });
                if (statusText !== "OK") {
                    throw new Error(statusText);
                }
                // this.articleList = data.data;
                this.articleList = data.data.map(v => {
                    const pic = v.pic;

                    if (pic) {
                        // 替换图片路径中的public
                        v.pic = pic.replace("public/", "/");
                    }
                    return v;
                });
                // this.total = data.total;
                // // this.search = data.search;
                // this.currentPage = data.currentPage;
                this.total = data.total;
                this.isProcessing = false;
                // this.pinyinFirstLetter = pinyinFirstLetter;
            } catch (error) {
                console.error(error);
                this.isProcessing = false;
                Toast.fire({
                icon: "error",
                title: "無法取得列表，請稍後再試",
                });
            }
        },
        async fetchCategoryList({ page = 1, keyword = null, limit = 999 }) {
            const {data, statusText, status} = await articleAPI.getArticleCategories({
                page,
                limit,
                keyword,
            });
            this.articleCategories = data.data;
        },
        handleSubmit (e) {
            // if (!this.keyword) {
            //     Toast.fire({
            //     type: 'warning',
            //     title: '請填搜索關鍵詞'
            //     })
            //     return
            // }
            const form = e.target
            const formData = new FormData(form)
            for (let [name, value] of formData.entries()) {
                console.log(name + ': ' + value)
            }
            this.fetchArticle({ page: this.page, limit: this.limit, keyword: this.keyword, category: this.category });
        }
    }
};
</script>
