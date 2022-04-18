<template>
  <div>
        <!-- Blog Start -->
        <section class="blogpage-section" style="padding-top: 200px;">
            <div class="container">
                <div class="row">
                    <div class="col-lg-8 col-md-7">
                        <div class="single-post-area">
                            <div class="article-title">
                                {{ article.title }}
                            </div>
                            <div class="article-meta">
                                <span>{{ article.updatedAt|formatDate('yyyy年MM月dd日')}}</span>
                            </div>
                            <div class="post-thumb text-center">
                                <img :src="staticHost + article.pic">
                            </div>
                            <div v-html="article.content" class="content-area"></div>
                            <div class="post-tags">
                                <h5>Tags:</h5>
                                <a href="#">Bisy LMS</a>
                                <a href="#">Design</a>
                                <a href="#">General</a>
                            </div>
                            <div class="post-share">
                                <h5>Share:</h5>
                                <a class="fac" href="#"><i class="social_facebook"></i></a>
                                <a class="twi" href="#"><i class="social_twitter"></i></a>
                                <a class="goo" href="#"><i class="social_googleplus"></i></a>
                            </div>
                            
                        </div>
                        
                        
                    </div>
                    <div class="col-lg-4 col-md-5">
                        <div class="blog-sidebar">
                            <aside class="widget widget-categories">
                                <h3 class="widget-title">资讯分类</h3>
                                <ul>
                                    <li><nuxt-link :to="{path: '/articles',query:{page:1}}" >全部</nuxt-link></li>
                                    <li v-for="cat in articleCategories" :key="cat.id"><nuxt-link :to="{path: '/articles',query:{page:1, category:cat.id}}" >{{cat.name}}</nuxt-link></li>
                                    <!-- <li><a href="#">Marketing</a><span>(15)</span></li> -->
                                </ul>
                            </aside>
                            <h3 class="widget-title">最新发布</h3>
                            <div class="post-item-1" v-for="lastArt in lastestArticles"  :key="lastArt.id">
                                <router-link :to="{name: 'article-id', params: { id: lastArt.id }}" exact>
                                    <img :src="staticHost + lastArt.pic" class="img-fluid">
                                </router-link>
                                <div class="b-post-details2">
                                    <router-link :to="{name: 'article-id', params: { id: lastArt.id }}" exact>
                                        {{ lastArt.title}}
                                    </router-link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Blog End -->
  </div>
</template>

<script>
import articleAPI from "../../api/article";
export default {
  watchQuery: ["id"],
  data: () => ({
    article: {},
    articleCategories: [],
    lastestArticles: [],
  }),
  async fetch() {
      console.info("fetch run");
    const { id = "" } = this.$route.params;
    this.fetchArticle(id);
    this.fetchLastestArticles({outerId:id});
  },
  async created() {
    console.info('article id activated');
    const { id = "" } = this.$route.params;
    if (!id) {
        this.$router.push("/articles");
    } else {
      this.fetchArticle(id);
      this.fetchCategoryList({page:1});
      this.fetchLastestArticles({outerId:id});
    }
  },
  head() {
    return {
      title: this.article.title + ' - 城堡移民',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.article.intro+this.article.title
        }
      ]
    };
  },
  computed: {
    staticHost() {
      return this.$store.state.staticHost;
    }
  },
  methods: {
    async fetchArticle(id) {
      this.isProcessing = true;
      try {
        const { data, statusText } = await articleAPI.getArticleDetail({
          id,
        });
        if (statusText !== "OK") {
          throw new Error(statusText);
        }
        this.isProcessing = false;
        this.article = data;
        this.article.pic = data.pic.replace("public/", "/");
        this.comments = data.comments;
      } catch (error) {
        this.isProcessing = false;
        console.error(error);
        this.$router.push({
            path: `/articles`
        });
        Toast.fire({
          icon: "error",
          title: "無法获取，請稍後再試",
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
    async fetchLastestArticles({ page = 1, keyword = null, limit = 3, category = null, outerId = null }) {
        const { data, statusText } = await articleAPI.getLastestArticles({
          page,
          limit,
          keyword,
          category,
          outerId
        });
        if (statusText == "OK" && data) {
            console.info('fetchLastestArticles ', data);
            this.lastestArticles = data.data.map(v => {
                const pic = v.pic;
                if (pic) {
                    // 替换图片路径中的public
                    v.pic = pic.replace("public/", "/");
                }
                return v;
            });
        }
    }
  }
};
</script>
