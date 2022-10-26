<template>
  <div class="w">
    <div class="lf boom">
      <div class="headline" @click="gotomain">{{ item.title }}</div>
      <div class="content">
        <span class="neirong">{{ content }}</span>
        <span class="more" @click="gotomain">...阅读更多</span>
      </div>
      <div class="writer">posted @ {{ item.updated_at }} {{ item.name }}</div>
    </div>
    <userCard :id="item.user_id" userprops="{}" @click.native="gotoMsg" class="hidden-sm hidden-xs hidden-md"></userCard>
  </div>
</template>

<script>
import userCard from './userCard.vue'
export default {
  props: ['item'],
  data() {
    return {
      content: '',
    }
  },
  methods: {
    gotomain() {
      this.$emit('detailPage', this.item.id)
    },
    gotoMsg() {
      this.$router.push({ name: 'usermsg', params: { id: this.item.user_id } })
    },
  },
  components: { userCard },
  mounted() {
    this.content = this.item.content.replace(/<[^<>]+>/g,"");
 
    if (this.content.length > 200 && this.content.length < 400) {
      this.content = this.content.substring(0,200)
    } else if (this.content.length > 400) {
      this.content = this.content.substring(200,400)
    } else {
      this.content = this.content
    }
  },
}
</script>

<style scoped>
.w {
  width: 90%;
  height: 18.75rem;
  margin: 0 auto;
  border-bottom: 1px dashed;
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
  font-family: Georgia, 'Times New Roman', Times, serif;
}
.headline:hover {
  color: red;
  padding-left: 60px;
}

.lf {
  float: left;
  width: 80%;
}
.writer {
  float: right;
  color: gray;
  margin-top: 10px;
}
.content {
  line-height: 25px;
  letter-spacing: 2px;
  font-size: 16px;
  width: 100%;
  font-family: Georgia, 'Times New Roman', Times, serif;
}
.more {
  color: rgb(157, 117, 230);
  padding-left: 10px;
  cursor: pointer;
  font-family: Georgia, 'Times New Roman', Times, serif;
  display: inline;
}
.neirong {
  width: 100%;
  line-height: 20px;
  margin: 0 auto;
  word-wrap: break-word;
  word-break: normal;
}
@media screen and (min-width: 768px) and (max-width: 992px) {
  .hidden-sm {
    display: none;
  }
  .boom {
    width: 100%;
  }
}
@media screen and (max-width: 768px) {
  .hidden-xs {
    display: none;
  }
  .boom {
    width: 100%;
  }
}
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .hidden-md {
    display: none;
  }
  .boom {
    width: 100%;
  }
}
</style>