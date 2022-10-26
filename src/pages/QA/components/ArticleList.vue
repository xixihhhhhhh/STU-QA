<template>
  <div class="con">
    <card v-for="article in articleList" :key="article.id" :item="article" @detailPage="detailPage"></card>
    <el-pagination layout="prev, pager, next" :total="total" :page-size="5" class="page" @current-change="pagechange"> </el-pagination>
    <div class="taxian"></div>
  </div>
</template>

<script>
import card from './card.vue'
import { getArticleList } from '@/api'
export default {
  components: { card },
  data() {
    return {
      queryInfo: {
        pageSize: '5',
        pageNum: '1',
      },
      articleList: [],
      total: 0,
    }
  },
  methods: {
    pagechange(e) {
      this.queryInfo.pageNum = e
      this.getArticle()
      this.$bus.$emit('gotoTop')
    },
    async getArticle() {
      let res = await getArticleList(this.queryInfo)
      if (res.code == 200) {
        this.articleList = res.data.articles
        this.total = res.data.total
      }
    },
    detailPage(e) {
      this.$router.push({ name: 'article', params: { id: e } })
    },
  },
  mounted() {
    this.getArticle()
  },
}
</script>

<style lang="less" scoped>
.con {
  position: relative;
  min-height: 1200px;
}
.page {
  position: absolute;
  margin-top: 20px;
  right: 50px;
}
.taxian {
  height: 200px;
}
</style>