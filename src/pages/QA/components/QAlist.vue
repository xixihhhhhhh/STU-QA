<template>
  <div class="con">
    <card v-for="post in postList" :key="post.id" :item="post" @detailPage="detailPage"></card>
    <el-pagination layout="prev, pager, next" :total="total" :page-size="5" class="page" @current-change="pagechange"> </el-pagination>
    <div class="taxian"></div>
  </div>
</template>

<script>
import card from './card.vue'
import { getPostList } from '@/api'
export default {
  components: { card },
  data() {
    return {
      queryInfo: {
        pageSize: '5',
        pageNum: '1',
      },
      postList: [],
      total: 0,
    }
  },
  methods: {
    pagechange(e) {
      this.queryInfo.pageNum = e
      this.getPost()
      this.$bus.$emit('gotoTop')
    },
    async getPost() {
      let res = await getPostList(this.queryInfo)
      if (res.code == 200) {
        this.postList = res.data.posts
        this.total = res.data.total
      }
    },
    detailPage(e) {
      this.$router.push({ name: 'qa', params: { id: e } })
    },
  },
  mounted() {
    this.getPost()
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