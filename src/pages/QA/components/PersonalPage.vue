<template>
  <div class="con">
    <div class="append" @click="showAside">
      <div class="el-icon-plus"></div>
    </div>
    <div class="main">
      <transition enter-active-class="animate__animated animate__fadeInRight" leave-active-class="animate__animated  animate__fadeOutLeft">
        <div class="left" v-if="showAsideFlag">
          <div @click="showMyArticle">
            <div :class="{ active: isActive === 0 }"></div>
            <p>我的文章</p>
          </div>
          <div @click="showMyQA">
            <div :class="{ active: isActive === 1 }"></div>
            <p>我的提问</p>
          </div>
          <div @click="showMyThread">
            <div :class="{ active: isActive === 4 }"></div>
            <p>我的回答</p>
          </div>
          <div @click="upbatePersonMsg">
            <div :class="{ active: isActive === 2 }"></div>
            <p>修改个人信息</p>
          </div>
          <div @click="showlogout">
            <div :class="{ active: isActive === 3 }"></div>
            <p>注销</p>
          </div>
        </div>
      </transition>
      <div class="right" :class="{ hhh: !showAsideFlag, anima1: showMyArticleFlag }" v-if="showMyArticleFlag">
        <div @click="artPubFlag = true">
          <i class="el-icon-plus"></i>
        </div>
        <div v-for="item in article" :key="item.id" class="tls">
          <h3 @click="gotoArticle(item.id)">{{ item.title }}</h3>
          <div>
            <span @click="articleUpbate(item.id)">修改</span>
            <span @click="articleDelete(item.id)">删除</span>
          </div>
        </div>
        <el-pagination layout="prev, pager, next" :total="articles.length" class="page" :page-size="5" @current-change="changeCurrent1"> </el-pagination>
      </div>
      <div class="right" :class="{ hhh: !showAsideFlag, anima: showMyQAFlag }" v-if="showMyQAFlag">
        <div @click="qaPubFlag = true">
          <i class="el-icon-plus"></i>
        </div>
        <div v-for="item in post" :key="item.id">
          <h3 @click="gotoQA(item.id)">{{ item.title }}</h3>
          <div>
            <span @click="QAUpbate(item.id)">修改</span>
            <span @click="QAdelete(item.id)">删除</span>
          </div>
        </div>
        <el-pagination layout="prev, pager, next" :total="posts.length" class="page" :page-size="5" @current-change="changeCurrent2"> </el-pagination>
      </div>
      <div class="right1" :class="{ hhh: !showAsideFlag, anima2: showMyThreadFlag }" v-if="showMyThreadFlag">
        <div v-for="(item, index) in threadName" :key="index" class="tls">
          <h3 @click="gotoQA(item.id)">{{ item.title }}</h3>
          <div>
            <span @click="threadUpbate(item.id, item.thread_id)">修改</span>
            <span @click="DeleteThread(item.id, item.thread_id)">删除</span>
          </div>
        </div>
        <el-pagination layout="prev, pager, next" :total="threads.length" class="page" :page-size="5" @current-change="changeCurrent3"> </el-pagination>
      </div>
      <el-card class="permsg" v-if="showPermsg" :class="{ hhh: !showAsideFlag, anima: showPermsg }">
        <el-form :model="userForm" :rules="rules" ref="userForm" label-width="100px" class="demouserForm" label-position="top">
          <el-form-item label="用户名" label-width="200px">
            <el-input v-model="userForm.Newname"></el-input>
          </el-form-item>
          <el-form-item label="博客名">
            <el-input v-model="userForm.Newblog"></el-input>
          </el-form-item>
          <el-form-item label="QQ">
            <el-input v-model="userForm.Newqq" type="number"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userForm.Newsex">
              <el-radio :label="true" :value="true">男</el-radio>
              <el-radio :label="false" :value="false">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="邮箱" prop="Newemail">
            <el-input v-model="userForm.Newemail"></el-input>
          </el-form-item>
          <el-form-item label="籍贯">
            <el-input v-model="userForm.Newaddress"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="Newtelephone">
            <el-input v-model="userForm.Newtelephone"></el-input>
          </el-form-item>
          <el-form-item label="爱好">
            <el-input v-model="userForm.Newhobby"></el-input>
          </el-form-item>
          <el-form-item label="旧密码">
            <el-input v-model="passwordForm.first"></el-input>
          </el-form-item>
          <el-form-item label="新密码">
            <el-input v-model="passwordForm.second"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('userForm')">立即修改</el-button>
            <el-button type="primary" @click="upbatePassword">修改密码</el-button>
          </el-form-item>
        </el-form>
        <div class="card">
          <userCard :userprops="user"></userCard>
          <div>
            <el-button type="primary" @click="avatarVisible = true"><i class="el-icon-camera-solid"></i>修改头像</el-button>
          </div>
        </div>
      </el-card>
      <div class="logout" v-if="showLogoutFlag" :class="{ kuan: !showAsideFlag, anima: showLogoutFlag }">
        <div class="logoutbtn" @click="logout">
          <h2>我要注销！！！！</h2>
        </div>
        <div class="logouttex">这将清除您的cookie和登录状态</div>
        <div class="chengkai"></div>
      </div>
    </div>
    <el-dialog title="上传头像" :visible.sync="avatarVisible" width="30%" append-to-body>
      <el-upload class="avatarUploader" action="lei" :http-request="httpRequest" :show-file-list="false" :on-success="handleAvatarSuccess">
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="avatarVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadAv">确 定</el-button>
      </span>
    </el-dialog>
    <div v-if="artPubFlag" class="artiCotain">
      <div>
        <span>文章发布</span>
        <i class="el-icon-close" @click="artPubFlag = false"></i>
      </div>
      <div>
        <span>文章标题：</span>
        <el-input v-model="articleForm.title" maxlength="20"></el-input>
      </div>
      <div v-highlight>
        <mavon-editor :placeholder="placeholder" @change="change1" v-model="articleForm.content" />
        <el-button type="primary" class="sumbitBtn" @click="SubmitArticle">提交</el-button>
        <div class="gao"></div>
      </div>
    </div>
    <div v-if="artUpbaFlag" class="artiCotain">
      <div>
        <span>文章更新</span>
        <i class="el-icon-close" @click="artUpbaFlag = false"></i>
      </div>
      <div>
        <span>文章标题：</span>
        <el-input v-model="articleForm.title" maxlength="20"></el-input>
      </div>
      <div v-highlight>
        <mavon-editor v-model="articleForm.content" :placeholder="placeholder" @change="change1" />
        <el-button type="primary" class="sumbitBtn" @click="UpbateArticle">更新</el-button>
      </div>
    </div>
    <div v-if="qaPubFlag" class="artiCotain">
      <div>
        <span>提问发布</span>
        <i class="el-icon-close" @click="qaPubFlag = false"></i>
      </div>
      <div>
        <span>问题标题：</span>
        <el-input v-model="qaForm.title" maxlength="20"></el-input>
      </div>
      <div>
        <mavon-editor :placeholder="placeholder" @change="change2" v-model="qaForm.content" />
        <el-button type="primary" class="sumbitBtn" @click="QAsubmit">提交</el-button>
        <div class="gao"></div>
      </div>
    </div>
    <div v-if="qaUpbaFlag" class="artiCotain">
      <div>
        <span>提问更新</span>
        <i class="el-icon-close" @click="qaUpbaFlag = false"></i>
      </div>
      <div>
        <span>问题标题：</span>
        <el-input v-model="qaForm.title" maxlength="20"></el-input>
      </div>
      <div>
        <mavon-editor :placeholder="placeholder" @change="change2" v-model="qaForm.content" />
        <el-button type="primary" class="sumbitBtn" @click="UpbateQA">更新</el-button>
      </div>
    </div>
    <div v-if="threadUpbateFlag" class="artiCotain1">
      <div>
        <span>跟帖跟新</span>
        <i class="el-icon-close" @click="threadUpbateFlag = false"></i>
      </div>
      <div>
        <mavon-editor v-model="threadForm.content" :placeholder="placeholder" @change="change3" />
        <el-button type="primary" class="sumbitBtn" @click="UpbateThread">更新</el-button>
      </div>
    </div>
    <p class="gaodu"></p>
  </div>
</template>

<script>
import userCard from './userCard.vue'
import 'animate.css'
import { getUser } from '@/api'
import { getArticle } from '@/api'
import { getPost } from '@/api'
import { upbateUser } from '@/api'
import { upbateAvatar } from '@/api'
import { submitArticle } from '@/api'
import { upbateArticle } from '@/api'
import { submitQA } from '@/api'
import { upbateQA } from '@/api'
import { upbateThread } from '@/api'
import { deleteArticle } from '@/api'
import { deleteQA } from '@/api'
import { deleteThread } from '@/api'
import { updatepass } from '@/api'
import { getPersonalArticles } from '@/api'
import { getPersonalPosts } from '@/api'
import { getPersonalThreads } from '@/api'
// 导入组件 及 组件样式
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
export default {
  data() {
    let checkEmail = (rule, value, cb) => {
      const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
      if (regEmail.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的邮箱'))
    }
    let checkMobile = (rule, value, cb) => {
      const regMobile = /^(0|86|17951)?(13[0-9]|15[0123456789]|17[678]|18[0-9]|14[57])[0-9]{8}$/
      if (regMobile.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法的手机号'))
    }
    return {
      html: '',
      user: {},
      mf: '',
      isActive: 0,
      showAsideFlag: true,
      showMyArticleFlag: true,
      showMyThreadFlag: false,
      showMyQAFlag: false,
      showPermsg: false,
      showLogoutFlag: false,
      avatarFlag: false,
      avatarVisible: false,
      quesDiaVisible: false,
      artPubFlag: false,
      qaPubFlag: false,
      artUpbaFlag: false,
      qaUpbaFlag: false,
      threadUpbateFlag: false,
      articles: [],
      article: [],
      posts: [],
      post: [],
      threads: [],
      thread: [],
      threadName: [],
      imageUrl: '',
      articleForm: {
        title: '',
        content: '',
        res_long: '',
      },
      passwordForm: {
        first: '',
        second: '',
      },
      qaForm: {
        title: '',
        content: '',
        res_long: '',
      },
      threadForm: {
        content: '',
        res_long: '',
      },
      placeholder: 'Ctrl + Alt + c 是代码块, F10开启全屏编辑模式',
      userForm: {
        Newname: '',
        Newblog: '',
        Newqq: '',
        Newsex: '',
        Newemail: '',
        Newaddress: '',
        Newtelephone: '',
        Newhobby: '',
      },
      rules: {
        Newemail: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          { validator: checkEmail, trigger: 'blur' },
        ],
        Newtelephone: [{ validator: checkMobile, trigger: 'blur' }],
      },
    }
  },
  methods: {
    change1(value, render) {
      this.articleForm.res_long = render
    },
    change2(value, render) {
      this.qaForm.res_long = render
    },
    change3(value, render) {
      this.threadForm.res_long = render
    },
    showMyArticle() {
      this.isActive = 0
      this.showMyArticleFlag = true
      this.showMyQAFlag = false
      this.showPermsg = false
      this.showLogoutFlag = false
      this.showMyThreadFlag = false
    },
    showMyThread() {
      this.isActive = 4
      this.showMyArticleFlag = false
      this.showMyQAFlag = false
      this.showPermsg = false
      this.showLogoutFlag = false
      this.showMyThreadFlag = true
    },
    showMyQA() {
      this.isActive = 1
      this.showMyArticleFlag = false
      this.showMyQAFlag = true
      this.showPermsg = false
      this.showLogoutFlag = false
      this.showMyThreadFlag = false
    },
    upbatePersonMsg() {
      this.isActive = 2
      this.showMyArticleFlag = false
      this.showMyQAFlag = false
      this.showPermsg = true
      this.showLogoutFlag = false
      this.showMyThreadFlag = false
    },
    showlogout() {
      this.isActive = 3
      this.showMyArticleFlag = false
      this.showMyQAFlag = false
      this.showPermsg = false
      this.showLogoutFlag = true
      this.showMyThreadFlag = false
    },
    showAside() {
      this.showAsideFlag = !this.showAsideFlag
    },
    submitForm(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return false
        let result = await upbateUser(this.userForm)
        if (result.code !== 200) return this.$message.error(result.msg)
        return this.$message.success(result.msg)
      })
    },
    initForm() {
      this.userForm.Newname = this.user.Name
      this.userForm.Newemail = this.user.Email
      this.userForm.Newtelephone = this.user.Telephone
      this.userForm.Newqq = this.user.QQ
      this.userForm.Newsex = this.user.Sex
      this.userForm.Newaddress = this.user.Address
      this.userForm.Newhobby = this.user.Hobby
      this.userForm.Newblog = this.user.Blog
    },
    async logout() {
      const confirmResult = await this.$confirm('此操作将注销,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消注销')
      }
      window.localStorage.removeItem('token')
      this.$router.push('/home')
      return this.$message.success('注销成功！')
    },
    gotoArticle(e) {
      this.$router.push({ name: 'article', params: { id: e } })
    },
    gotoQA(e) {
      this.$router.push({ name: 'qa', params: { id: e } })
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    httpRequest(item) {
      const isJPG = item.file.type == 'image/jpeg' || item.file.type == 'image/png' || item.file.type == 'image/gif' || item.file.type == 'image/jpg'
      const isLt2M = item.file.size / 1024 / 1024 < 2
      if (!isJPG) {
        return this.$message.error('上传图片只能是 JPG 或 PNG 或 jpeg 或 gif格式!')
      }
      if (!isLt2M) {
        return this.$message.error('上传图片大小不能超过 2MB!')
      }
      //图片格式大小信息没问题 执行上传图片的方法
      if (isJPG && isLt2M == true) {
        //定义FormData对象 存储文件
        let mf = new FormData()
        //将图片文件放入mf
        mf.append('file', item.file)
        this.mf = mf
      }
    },
    async uploadAv() {
      let res = await upbateAvatar(this.mf)
      this.avatarVisible = false
      let res1 = await getUser()
      if (res1.code === 200) this.user = res1.data.user
      window.location.reload()
    },
    // 创建文章
    async SubmitArticle() {
      if (this.articleForm.title.length <= 3) {
        return this.$message.error('标题太短啦...最少四个字符哟!')
      }
      if (this.articleForm.content.length <= 5) {
        return this.$message.error('内容太短啦！')
      }
      let result = await submitArticle(this.articleForm)
      if (result.code !== 200) {
        this.articleForm.title = ''
        this.articleForm.content = ''
        this.articleForm.res_long = ''
        return this.$message.error(result.msg)
      }
      this.artPubFlag = false
      this.userGet()
      this.articleForm.title = ''
      this.articleForm.content = ''
      this.articleForm.res_long = ''
      return this.$message.success(result.msg)
    },
    // 创建帖子
    async QAsubmit() {
      if (this.qaForm.title.length <= 3) {
        return this.$message.error('标题太短啦...最少四个字符哟!')
      }
      if (this.qaForm.content.length <= 5) {
        return this.$message.error('内容太短啦！')
      }
      let result = await submitQA(this.qaForm)
      if (result.code !== 200) {
        this.qaForm.title = ''
        this.qaForm.content = ''
        this.qaForm.res_long = ''
        return this.$message.error('创建帖子失败!')
      }
      this.qaPubFlag = false
      this.userGet()
      this.qaForm.title = ''
      this.qaForm.content = ''
      this.qaForm.res_long = ''
      return this.$message.success('创建帖子成功!')
    },
    changeCurrent1(e) {
      this.article = this.articles.slice(5 * (e - 1), 5 * e)
    },
    changeCurrent2(e) {
      this.post = this.posts.slice(5 * (e - 1), 5 * e)
    },
    changeCurrent3(e) {
      this.thread = this.threads.slice(5 * (e - 1), 5 * e)
      this.GetThreadName()
    },
    async articleDelete(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该文章,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      let res = await deleteArticle(id)
      if (res.code === 200) {
        this.userGet()
        return this.$message.success('删除文章成功！')
      }
    },
    async QAdelete(id) {
      const confirmResult = await this.$confirm('此操作将永久删除该帖子,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      let res = await deleteQA(id)
      if (res.code === 200) {
        this.userGet()
        return this.$message.success('删除帖子成功！')
      }
    },
    async articleUpbate(id) {
      const res = await getArticle(id)
      this.articleForm.title = res.data.article.title
      this.articleForm.content = res.data.article.content
      this.articleForm.id = id
      this.artUpbaFlag = true
    },
    async QAUpbate(id) {
      const res = await getPost(id)
      this.qaForm.title = res.data.post.title
      this.qaForm.content = res.data.post.content
      this.qaForm.id = id
      this.qaUpbaFlag = true
    },
    async threadUpbate(id, thread_id) {
      const res = await getPost(id)
      for (let i = 0; i < res.data.threads.length; i++) {
        if (res.data.threads[i].id === thread_id) {
          this.threadForm.id = id
          this.threadForm.thread_id = thread_id
          this.threadForm.content = res.data.threads[i].content
        }
      }
      this.threadUpbateFlag = true
    },
    async UpbateArticle() {
      await upbateArticle(this.articleForm.id, this.articleForm)
      this.userGet()
      this.articleForm.title = ''
      this.articleForm.content = ''
      this.articleForm.res_long = ''
      this.artUpbaFlag = false
      return this.$message.success('更新文章成功!')
    },
    async UpbateQA() {
      await upbateQA(this.qaForm.id, { title: this.qaForm.title, content: this.qaForm.content, pt: true, res_long: this.qaForm.res_long })
      this.userGet()
      this.qaForm.title = ''
      this.qaForm.content = ''
      this.qaForm.res_long = ''
      this.qaUpbaFlag = false
      return this.$message.success('更新帖子成功!')
    },
    async UpbateThread() {
      const res = await upbateThread(this.threadForm.thread_id, { content: this.threadForm.content, res_long: this.threadForm.res_long })
      if (res.code !== 200) return this.$message.error(res.msg)
      this.userGet()
      this.threadForm.content = ''
      this.threadForm.res_long = ''
      this.threadUpbateFlag = false
      return this.$message.success(res.msg)
    },
    async GetThreadName() {
      this.threadName = []
      for (let i = 0; i < this.thread.length; i++) {
        const res = await getPost(this.thread[i].post_id)
        this.threadName.push({ title: res.data.post.title + '          ' + this.thread[i].content.substring(0, 3), thread_id: this.thread[i].id, id: this.thread[i].post_id })
      }
    },
    async userGet() {
      let res = await getUser()
      if (res.code === 200) {
        this.user = res.data.user
        this.initForm()
      }
      let res1 = await getPersonalArticles()
      if (res1.code === 200) {
        this.articles = res1.data.articles
        this.article = this.articles.slice(0, 5)
      }
      let res2 = await getPersonalPosts()
      if (res2.code === 200) {
        this.posts = res2.data.posts
        this.post = this.posts.slice(0, 5)
      }
      let res3 = await getPersonalThreads()
      if (res3.code === 200) {
        this.threads = res3.data.threads
        this.thread = this.threads.slice(0, 5)
      }
      this.GetThreadName()
    },
    async DeleteThread(id, thread_id) {
      const confirmResult = await this.$confirm('此操作将永久删除该跟帖,是否继续', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch((err) => err)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已经取消删除')
      }
      let res = await deleteThread(thread_id)
      if (res.code === 200) {
        this.userGet()
        return this.$message.success(res.msg)
      }
      if (res.code !== 200) return this.$message.error(res.msg)
    },
    async upbatePassword() {
      const res = await updatepass(this.passwordForm)
      if (res.code !== 200) return this.$message.error(res.msg)
      if (res.code === 200) {
        this.passwordForm.first = ''
        this.passwordForm.second = ''
        return this.$message.success(res.msg)
      }
    },
  },
  created() {
    this.userGet()
  },
  components: { userCard, mavonEditor },
}
</script>

<style lang="less" scoped>
.append {
  height: 40px;
  margin: 30px 40px;

  div {
    width: 40px;
    height: 40px;
    border-radius: 20px;
    font-size: 40px;
  }

  div:hover {
    cursor: pointer;
    background-color: gray;
  }
}

.main {
  position: relative;
  display: flex;
}

.left {
  height: 1000px;
  width: 200px;
  margin-left: 40px;
  border-left: 0.5px solid blue;
  border-top: 0.1px solid #eee;
  color: green;
  animation-duration: 1s;
  position: absolute;

  > div {
    height: 20px;
    margin-top: 100px;
    position: relative;

    div {
      width: 16px;
      height: 16px;
      border-radius: 50%;
      border: 2px solid black;
      position: absolute;
      left: -10px;
    }

    p {
      padding-left: 20px;
    }
  }

  > div:first-child {
    margin-top: 200px;
  }

  > div:hover {
    cursor: pointer;
  }

  > div:hover div {
    background-color: green;
  }
}

.active {
  background-color: green;
}

.right {
  width: 1276px;
  margin-top: 80px;
  border-radius: 10px;
  color: #666;
  font-size: 200px;
  transition: all 4s linear;
  margin-left: 200px;
  margin-right: 100px;
  box-sizing: border-box;
  position: relative;

  > div {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    margin-bottom: 20px;
  }

  > div:first-child {
    width: 95%;
    cursor: pointer;
    border: 2px solid skyblue;
  }

  > div:not(:first-child) {
    width: 95%;
    font-size: 20px;
    background-color: #fff;
    color: #333;
    border: 1px #333 solid;
    transition: all 0.1s linear;
    position: relative;

    div {
      width: 100px;
      position: absolute;
      bottom: 50px;
      font-size: 16px;
      color: red;
      justify-content: space-between;
      display: none;
    }

    div:hover {
      cursor: pointer;
    }
  }

  > div:not(:first-child):hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    font-size: 30px;
  }

  > div:not(:first-child):hover div {
    display: flex;
  }

  div:not(:first-child) h3:hover {
    cursor: pointer;
  }
}

.right:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: #eee;
  background-color: #fff;
}

.right1 {
  width: 1276px;
  margin-top: 80px;
  border-radius: 10px;
  color: #666;
  font-size: 200px;
  transition: all 4s linear;
  margin-left: 200px;
  margin-right: 100px;
  box-sizing: border-box;
  position: relative;

  > div {
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 20px;
    margin-bottom: 20px;
  }

  > div {
    width: 95%;
    font-size: 20px;
    background-color: #fff;
    color: #333;
    border: 1px #333 solid;
    transition: all 0.1s linear;
    position: relative;

    div {
      width: 100px;
      position: absolute;
      bottom: 50px;
      font-size: 16px;
      color: red;
      justify-content: space-between;
      display: none;
    }

    div:hover {
      cursor: pointer;
    }
  }

  > div:hover {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
    font-size: 30px;
  }

  > div:hover div {
    display: flex;
  }

  div h3:hover {
    cursor: pointer;
  }
}

.right1:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  color: #eee;
  background-color: #fff;
}

.page {
  width: 300px !important;
  height: 50px !important;
  position: absolute;
  left: 700px;
  margin-top: 20px;
  background-color: gray;
}

.hhh {
  margin-left: 100px !important;
}

@keyframes rainbow {
  0% {
    transform: translateY(-1000px);
  }

  50% {
    transform: translateY(0);
  }
}

@keyframes rainbow1 {
  0% {
    transform: translateY(-1000px);
  }

  50% {
    transform: translateY(0);
  }
}

.anima {
  animation: rainbow 1s;
}

.anima1 {
  animation: rainbow1 1s;
}

.anima2 {
  animation: rainbow1 1s;
}

.permsg {
  width: 1400px;
  height: 1250px;
  position: relative;
  margin-left: 200px;
  margin-right: 100px;
  transition: all 2s linear;
}

.demouserForm {
  width: 80%;
}

.logoutbtn {
  width: 250px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border: 1px solid #222;
  margin-bottom: 10px;
}

.logoutbtn:hover {
  cursor: pointer;
  color: red;
  background-color: #fff;
}

.logout {
  margin: 200px 0 0 700px;
  transition: all 2s linear;
}

.logouttex {
  color: red;
  display: flex;
  justify-content: center;
}

.kuan {
  margin-left: 650px;
}

.card {
  position: absolute;
  top: 100px;
  right: 20px;
  display: flex;
  flex-direction: column;

  div {
    display: flex;
    justify-content: center;
    margin-top: 10px;
  }
}

.avatarUploader {
  width: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.gao {
  margin-top: 40px;
  height: 40px;
}

el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatarUploader:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.con {
  position: relative;
  min-height: 1200px;
}

.artiCotain1 {
  width: 100%;
  min-height: 1500px;
  background-color: #eee;
  position: absolute;
  top: -210px;

  div:first-child {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin: 20px 20px 20px;
    border-bottom: 1px solid #000;

    span {
      font-size: 26px;
      margin-left: 10px;
    }

    i {
      font-size: 34px;
      font-weight: 600;
      margin-right: 10px;
      cursor: pointer;
    }
  }
}

.artiCotain {
  width: 100%;
  min-height: 1500px;
  background-color: #eee;
  position: absolute;
  top: -210px;

  div:first-child {
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    margin: 20px 20px 20px;
    border-bottom: 1px solid #000;

    span {
      font-size: 26px;
      margin-left: 10px;
    }

    i {
      font-size: 34px;
      font-weight: 600;
      margin-right: 10px;
      cursor: pointer;
    }
  }

  div:nth-child(2) {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;

    span {
      width: 80px;
      margin-left: 30px;
    }

    .el-input {
      width: 30%;
    }
  }
}

.elinp {
  width: 97%;
  font-size: 21px;
  background-color: #fff;
}

.sumbitBtn {
  float: right;
  margin-right: 20px;
}

.gaodu {
  height: 100px;
}

.chengkai {
  height: 600px;
}
</style>
