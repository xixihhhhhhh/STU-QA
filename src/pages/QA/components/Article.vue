<template>
  <div class="con">
    <div class="headline">{{ article.title }}</div>
    <div v-html="article.res_long" class="sss"></div>
    <div class='gaodu'>
      
    </div>
  </div>
</template>

<script>
import { getArticle } from '@/api'
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  data() {
    return {
      article: {},
      html: '',
    }
  },
  methods: {
    async articleGet() {
      let result = await getArticle(this.$route.params.id)
      if (result.code == 200) {
        this.article = result.data.article
      }
    },
  },
  mounted() {
    this.articleGet()
  },
  components: { mavonEditor },
}
</script>

<style scoped lang="less">
.con {
  width: 1250px;
  min-height: 1200px;
  margin: 0 auto;
}
.headline {
  height: 2.8125rem;
  padding-left: 40px;
  border-left: 3px solid blue;
  color: rgb(123, 93, 174);
  line-height: 2.8125rem;
  font-size: 18px;
  font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
  transition: all 0.5s;
  margin-bottom: 15px;
  letter-spacing: 3px;
  cursor: pointer;
}
.headline:hover {
  color: red;
  padding-left: 60px;
}
.sss img {
  width: auto;
  height: auto;
}
.sss {
  font-size: 18px;
}
.gaodu {
  height:100px;
}
</style>