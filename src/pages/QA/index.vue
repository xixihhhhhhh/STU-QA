<template>
  <div class="bgc">
    <img class="bgc2" :src="imgurl" />
    <el-button class="btn2" type="primary" @click="avatarVisible = true">上传背景</el-button>
    <el-button class="btn1" type="primary" @click="initBackr">初始背景</el-button>
    <el-button class="btn" type="primary" @click="dialogVisible = true">切换背景</el-button>
    <div class="conten hidden-xs">
      <div style="height: 80px"></div>
      <div class="icon">
        <router-link to="/home" class="h">Nebular</router-link>
      </div>
      <div class="tabBar">
        <div class="clik" @click="gopermsg">个人</div>
        <div class="clik" @click="goarticle">文章</div>
        <div class="clik" @click="goQalist">问答</div>
        <div class="clik" @click="gotoSoj">SOJ</div>
      </div>
      <router-view></router-view>
    </div>

    <div class="gaodu"></div>

    <el-dialog title="点击图片即可" :visible.sync="dialogVisible" width="42%" append-to-body>

      <div class="imgimg">
        <img v-for="item in srcList" :key="item.value" :src="item.src" @click="clidk(item.value)"></img>
      </div>

    </el-dialog>

    <el-dialog title="上传背景图片" :visible.sync="avatarVisible" width="30%" append-to-body>
      <el-upload class="avatarUploader" action="lei" :http-request="httpRequest" :show-file-list="false" :on-success="handleAvatarSuccess">
        <img v-if="imageUrl1" :src="imageUrl1" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="avatarVisible = false">取 消</el-button>
        <el-button type="primary" @click="uploadAv">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getUserBack } from '@/api'
import { upbUserBack } from '@/api'
import { upbateBackground } from '@/api'
export default {
  data() {
    return {
      mf: '',
      avatarVisible: false,
      initurl: require('../../assets/image/bgc2.jpg'),
      baseurl: 'http://106.53.120.252:82/',
      imgurl: require('../../assets/image/bgc2.jpg'),
      imageUrl1: '',
      dialogVisible: false,
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: [
        { 
          value: 'MGA1.jpg',
          src: 'http://106.53.120.252:82/MGA1.jpg' 
        },
        { 
          value: 'MGA2.jpg',
          src: 'http://106.53.120.252:82/MGA2.jpg' 
        },
        { 
          value: 'MGA3.jpg',
          src: 'http://106.53.120.252:82/MGA3.jpg' 
        },
        { 
          value: 'MGA4.jpg',
          src: 'http://106.53.120.252:82/MGA4.jpg' 
        },
        { 
          value: 'MGA5.jpg',
          src: 'http://106.53.120.252:82/MGA5.jpg' 
        },
        { 
          value: 'MGA6.jpg',
          src: 'http://106.53.120.252:82/MGA6.jpg' 
        },
        { 
          value: 'MGA7.jpg',
          src: 'http://106.53.120.252:82/MGA7.jpg' 
        },
      ],
      value: '',
    }
  },
  methods: {
    clidk(e) {
      this.value = e
      this.changeBackground()
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl1 = URL.createObjectURL(file.raw)
    },
    async httpRequest(item) {
      const isJPG = item.file.type == 'image/jpeg' || item.file.type == 'image/png' || item.file.type == 'image/gif' || item.file.type == 'image/jpeg'
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
      let res = await upbateBackground(this.mf)
      console.log(res)
      this.avatarVisible = false
      window.location.reload()
    },
    async changeBackground() {
      this.imgurl = this.baseurl + this.value
      const res = await upbUserBack(this.value)

      this.dialogVisible = false
      if (res.code === 200) {
        return this.$message.success(res.msg)
      }
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    gotoSoj() {
      window.location.href = 'http://119.91.84.186/'
    },
    gopermsg() {
      this.$router.push('/personalPage')
    },
    goarticle() {
      this.$router.push('/articlelist')
    },
    goQalist() {
      this.$router.push('/QAlist')
    },
    // 翻页后滚动条回到页面顶端
    scrollTop(selector) {
      let element = (selector && document.querySelector(selector)) || window
      element.scrollTo(0, 0)
    },
    async getUserBackground() {
      const { data } = await getUserBack()
      this.imgurl = this.baseurl + data.background
    },
    initBackr() {
      this.imgurl = this.initurl
    },
    changeBackgr(e) {
      console.log(e)
    },
  },
  mounted() {
    this.$bus.$on('gotoTop', () => {
      this.scrollTop('.bgc')
    })
    this.getUserBackground()
  },
}
</script>

<style scoped lang="less">
.bgc {
  position: fixed;
  top: 0;
  left: 0;
  /*以上三句是让整个span放在屏幕的最左上方*/
  width: 100%;
  height: 100%;
  /*以上两句实现全屏大小*/
  background: url('../../assets/image/bgc2.jpg') no-repeat center 0; /*引入背景图，不重复出现*/
  background-size: cover;
  overflow: scroll;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.bgc1 {
  pointer: relative;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.bgc2 {
  position: fixed;
  top: 0;
  left: 0;
  /*以上三句是让整个span放在屏幕的最左上方*/
  width: 100%;
  height: 100%;
  background-size: cover;
  overflow: scroll;
}

.conten {
  width: auto;
  background-color: #ddd;
  margin: 80px 80px;
  opacity: 0.8;
  border-radius: 40px;
}

.icon {
  width: 215px;
  height: 75px;
  font-size: 50px;
  margin-left: 90px;
  font-style: oblique;
  color: skyblue;
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.icon:hover {
  text-shadow: 0 0 10px purple, 0 0 20px blue, 0 0 30px pink, 0 0 40px black;
}

.tabBar {
  width: 90%;
  height: 30px;
  margin: 0px auto;
  display: flex;
  align-items: center;
  border-top: 1px dashed #fff;
}

.tabBar div {
  width: 100%;
}

.clik {
  font-family: Georgia, 'Times New Roman', Times, serif;
}

.clik:hover {
  cursor: pointer;
  color: purple;
}

.h {
  color: rgb(26, 115, 184);
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  .hidden-xs {
    margin: 0 0 0 0;
  }
}

.btn {
  position: absolute;
  right: 10px;
  top: 10px;
}

.btn2 {
  position: absolute;
  right: 230px;
  top: 10px;
}

.btn1 {
  position: absolute;
  right: 120px;
  top: 10px;
}

.gaodu {
  height: 60px;
}
.avatarUploader {
  width: 178px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
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
.imgimg {
  width: 600px;
  height: 600px;
  display: flex;
  flex-flow:wrap;
  img {
    width: 33%;
    height: 33%;
  }
  img:hover {
    cursor:pointer;
  }
}
</style>
