<template>
    <div class="col-lg-6">
        <div class="post-item-1">
            <img :src="staticHost + article.pic" class="img-fluid">
            <div class="b-post-details">
                <div class="bp-meta">
                    <a href="#"><i class="icon_clock_alt"></i>April 22, 2222</a>
                    <a href="#"><i class="icon_chat_alt"></i>6 Comments</a>
                </div>
                <h3>
                    <router-link :to="{name: 'article-id', params: { id: article.id }}" exact>
                        {{ article.title}}
                    </router-link>

                    <!-- <a href="/article-detail">{{article.title}}</a> -->
                </h3>
                <router-link :to="{name: 'article-id', params: { id: article.id }}" class="read-more" exact>
                        Read More<i class="arrow_right"></i>
                    </router-link>
                <!-- <a class="read-more" href="/article-detail">Read More<i class="arrow_right"></i></a> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
  name: "ArticleItem",
  props: {
    initialItem: {
      type: Object,
      required: true,
    },
  },
  computed: {
        staticHost() {
            return this.$store.state.staticHost;
        }
    },
  data() {
    return {
      article: this.initialItem,
    };
  },
}
</script>