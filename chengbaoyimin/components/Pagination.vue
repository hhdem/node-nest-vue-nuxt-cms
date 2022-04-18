<template>
<div class="row">
    <div class="col-lg-12 text-center">
      <div class="bisylms-pagination">
      <div class="pages" v-if="count<=11">
        <nuxt-link v-for="item in count"
                   :key="item"
                   :class="currentPage===item?'active':''"
                   :to="{path: path,query:{page:item,keyword:keyword,category:category}}">{{item}}</nuxt-link>
      </div>
      <div class="pages" v-else>
        <template v-if="currentPage <= 6">
          <nuxt-link v-for="item in 10"
                     :key="item"
                     :class="currentPage===item?'active':''"
                     :to="{path: path,query:{page:item,keyword:keyword,category:category}}">{{item}}</nuxt-link>
          <nuxt-link :to="{path: path,query:{page:currentPage+9>count?count:currentPage+9,keyword:keyword,category:category}}">...</nuxt-link>
          <nuxt-link v-if="count>11" :to="{path: path,query:{page:count,keyword:keyword,category:category}}">{{count}}</nuxt-link>
        </template>
        <template v-else>
          <nuxt-link :to="{path: path,query:{page:'1',keyword:keyword,category:category}}">1</nuxt-link>
          <nuxt-link :to="{path: path,query:{page:currentPage-9<1?1:currentPage-9,keyword:keyword,category:category}}">...</nuxt-link>
          <template v-if="currentPage + 5 < count">
            <nuxt-link v-for="item in getArr(currentPage-4,currentPage)"
                       :key="item"
                       :to="{path: path,query:{page:item,keyword:keyword,category:category}}">{{item}}</nuxt-link>
            <nuxt-link v-for="item in getArr(currentPage+1,currentPage+4)"
                       :key="item"
                       :class="currentPage===item?'active':''"
                       :to="{path: path,query:{page:item,keyword:keyword,category:category}}">{{item}}</nuxt-link>
            <nuxt-link :to="{path: path,query:{page:currentPage+9>count?count:currentPage+9,keyword:keyword,category:category}}">...</nuxt-link>
            <nuxt-link :to="{path: path,query:{page:count,keyword:keyword,category:category}}">{{count}}</nuxt-link>
          </template>
          <template v-else>
            <nuxt-link v-for="item in getArr(count-9,count)"
                       :key="item"
                       :class="currentPage===item?'active':''"
                       :to="{path: path,query:{page:item,keyword:keyword,category:category}}">{{item}}</nuxt-link>
          </template>
        </template>
      </div>
    </div>
    </div>
    </div>
</template>

<script>
  export default {
    name: 'Pagination',
    props: {
      path: {
        type: String,
        value: ''
      },
      pageSize: {
        type: Number,
        default: 10
      },
      currentPage:{
        type:Number,
        default: 1
      },
      total:{
        type:Number
      },
      keyword: {
        type: String,
        value: ''
      },
      category: {
        type: String,
        value: ''
      }
    },
    computed:{
      count(){
        return Math.ceil(this.total/this.pageSize);
      }
    },
    methods:{
      getArr(firstNum,lastNum){
        let arr=[];
        for(let i=firstNum;i<=lastNum;i++){
          arr.push(i);
        }
        return arr;
      }
    }
  }
</script>