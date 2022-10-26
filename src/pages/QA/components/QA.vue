<template>
  <div class="con">
    <div class="headline">{{ post.title }}</div>
    <div class="ques">The Question</div>
    <div v-html="post.res_long" class="sss"></div>
    <div class="ques">
      <span>All Answer</span>
      <el-button type="primary" @click=";(answerVisible = true), (threadFlag = false)">回答</el-button>
    </div>
    <el-card v-if="answerVisible" class="answerCon">
      <div class="firRow">
        <span>发布回答</span>
        <i class="el-icon-close" @click="answerVisible = falsethreadFlag = true"></i>
      </div>
      <div>
        <mavon-editor v-model="content" :placeholder="placeholder" @change="change" />
        <el-button type="primary" class="sumbitBtn" @click="submitThread">提交</el-button>
      </div>
    </el-card>
    <div v-if="threadFlag">
      <div v-for="thread in threads" :key="thread.id">
        <div class="thre" v-highlight>
          <div v-html="thread.res_long" class="sss md"></div>
          <UserCard :id="thread.user_id" userprops="{}" class="ab" @click.native="gotoMsg(thread.user_id)"></UserCard>
          <el-button class="btn" type="primary" v-if="email === thread.email" @click="threadDelete(post.id, thread.id)">删除跟帖</el-button>
        </div>
      </div>
    </div>
    <div class="chengkai"></div>
  </div>
</template>

<script>
import { getUser } from '@/api'
import { getPost } from '@/api'
import { getThreads } from '@/api'
import { createthread } from '@/api'
import { deleteThread } from '@/api'
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import UserCard from './userCard.vue'
import 'mavon-editor/dist/markdown/github-markdown.min.css'
export default {
  data() {
    return {
      email: '',
      post: {},
      threads: [],
      answerVisible: false,
      content: '',
      threadFlag: true,
      res_long: '',
      placeholder: 'Ctrl + Alt + c 是代码块, F10开启全屏编辑模式',
    }
  },
  methods: {
    async posteGet() {
      let res = await getPost(this.$route.params.id)
      if (res.code == 200) {
        this.post = res.data.post
      }
      let res1 = await getThreads(this.$route.params.id)
      if (res1.code == 200) {
        this.threads = res1.data.threads
      }
    },
    async userGet() {
      let res = await getUser()
      this.email = res.data.user.Email
    },
    change(value, render) {
      this.res_long = render
    },
    async submitThread() {
      if (this.content.length < 5) {
        return this.$message.error('内容太短了！')
      }
      let res = await createthread(this.$route.params.id, { content: this.content, res_long: this.res_long })
      if (res.code == 200) {
        this.answerVisible = false
        this.threadFlag = true
        this.posteGet()
        this.content = ''
        this.res_long = ''
        return this.$message.success('跟帖成功！')
      }
    },
    gotoMsg(id) {
      this.$router.push({ name: 'usermsg', params: { id: id } })
    },
    async threadDelete(postid, id) {
      const confirmResult = await this.$confirm('此操作将永久删除该跟帖,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      let res = await deleteThread(postid, id)
      if (res.code === 200) {
        this.content = ''
        this.res_long = ''
        this.posteGet()
        return this.$message.success('删除跟帖成功！')
      }
    },
  },
  created() {
    this.posteGet()
    this.userGet()
  },
  components: { mavonEditor, UserCard },
}
</script>

<style scoped lang="less">
.con {
  width: 1250px;
  min-height: 1200px;
  margin: 0 auto;
  position: relative;
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
.ques {
  height: 60px;
  margin-top: 20px;
  margin-bottom: 20px;
  font-style: oblique;
  color: purple;
  font-family: 'Courier New', Courier, monospace;
  font-size: 22px;
  font-weight: 600;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px blue dashed;
  span:hover {
    color: red;
  }
}
.answerCon {
  width: 100%;
  background-color: #eee;
  margin-bottom: 100px;
}
.firRow {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #000;
  span {
    width: 100%;
    font-size: 23px;
    margin-left: 10px;
  }
  i {
    font-size: 32px;
    font-weight: 600;
    margin-right: 10px;
    cursor: pointer;
  }
}
.secondRow {
  height: 40px;
  font-size: 28px;
  margin: 10px 0 10px 1055px;
}
.sumbitBtn {
  float: right;
  margin: 10px 0 10px 0;
}
.elinp {
  width: 97%;
  font-size: 21px;
  background-color: #fff;
}
.thre {
  min-height: 300px;
  position: relative;
  display: flex;
  border-bottom: 1px dashed blue;
  margin-bottom: 40px;
}
.md {
  flex: 1;
  margin: 10px 10px 10px 0;
}
.ab {
  position: absolute;
  right: 0;
  top: -20px;
}
.btn {
  position: absolute;
  right: 25px;
  bottom: 10px;
}
.chengkai {
  height: 100px;
}
.sss img {
  width: auto;
  height: auto;
}
.sss {
  font-size: 18px;
}
</style>
