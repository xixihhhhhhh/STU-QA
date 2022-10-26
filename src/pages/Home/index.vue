<template>
  <div class="bgc">
    <!--初始界面-->
    <div v-if="initFlag">
      <div class="wapper slogan">
        <div>Nebular</div>
        <div class="small">致一路热爱的你</div>
      </div>
      <div class="wapper gezi">
        <div @click="showIntor">简介</div>
        <div @click="showLogin">登录</div>
        <div @click="showEnroll">注册</div>
        <div @click="gotoSoj">SOJ</div>
      </div>
      <!-- 底部版权信息 -->
      <div class="copyR">
        <div>粤ICP备2022107861号</div>
        <div>粤ICP备2022107861号-1</div>
        <div>@CopyRight STU-ACM</div>
      </div>
    </div>

    <!--登录界面-->
    <div class="loginBox" v-if="loginFlag">
      <!-- 头像区域 -->
      <div class="avatarBox">
        <img src="@/assets/image/2.jpg" alt="" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="loginFormRef" :model="loginForm" :rules="loginFormRules" label-width="0px" class="loginForm">
        <!-- 用户名 -->
        <el-form-item prop="Email">
          <el-input v-model="loginForm.Email" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="Password">
          <el-input v-model="loginForm.Password" prefix-icon="el-icon-user" type="password"></el-input>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="findPassword">找回密码</el-button>
          <el-button type="primary" @click="login" @keyup.enter.native="login">登入</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
      <i class="el-icon-close" @click="closeLogin"></i>
    </div>

    <!--找回密码界面-->
    <div class="findPasswordBox" v-if="findPasswordFlag">
      <!-- 头像区域 -->
      <div class="avatarBox">
        <img src="@/assets/image/2.jpg" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="findPasswordFormRef" :model="findPasswordForm" :rules="findPasswordFormRules" label-width="0px"
        class="loginForm">
        <!-- 邮箱 -->
        <el-form-item prop="Email">
          <el-input v-model="findPasswordForm.Email" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="Verify" class="confirmCode">
          <el-input v-model="findPasswordForm.Verify" prefix-icon="el-icon-s-flag" type="number"
            oninput="if(value.length>6)value=value.slice(0,6)"></el-input>
          <el-button type="primary" @click="getCode1" v-if="codeBtnFlag1">获取验证码</el-button>
          <el-button type="primary" v-else>{{ codeNum }} s 后重发</el-button>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="findPass">找回密码</el-button>
        </el-form-item>
      </el-form>
      <i class="el-icon-close" @click="closefindPassword"></i>
    </div>

    <!--注册界面-->
    <div class="enrollBox" v-if="enrollFlag">
      <!-- 头像区域 -->
      <div class="avatarBox">
        <img src="@/assets/image/2.jpg" />
      </div>
      <!-- 登录表单区域 -->
      <el-form ref="enrollFormRef" :model="enrollForm" :rules="enrollFormRules" label-width="0px" class="enrollForm">
        <!-- 用户名 -->
        <el-form-item prop="Name">
          <el-input v-model="enrollForm.Name" prefix-icon="el-icon-search"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="Password">
          <el-input v-model="enrollForm.Password" prefix-icon="el-icon-user" type="password"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item prop="Email">
          <el-input v-model="enrollForm.Email" prefix-icon="el-icon-s-opportunity"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="Verify" class="confirmCode">
          <el-input v-model="enrollForm.Verify" prefix-icon="el-icon-s-flag" type="number"
            oninput="if(value.length>6)value=value.slice(0,6)"></el-input>
          <el-button type="primary" @click="getCode" v-if="codeBtnFlag">获取验证码</el-button>
          <el-button type="primary" v-else>{{ codeNum }} s 后重发</el-button>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" @click="enroll">注册</el-button>
          <el-button type="info" @click="resetEnrollForm">重置</el-button>
        </el-form-item>
      </el-form>
      <i class="el-icon-close" @click="closeEnroll"></i>
    </div>

    <!--登录注册后的界面-->
    <div v-if="afloginFlag">
      <div class="welc">
        <div class="avatar">
          <img :src="imgurl" />
        </div>
        <div class="nm">用户：{{ name }}，欢迎回来</div>
      </div>
      <div class="wapper gezi">
        <div @click="$router.push('/articleList')">文章</div>
        <div @click="$router.push('/QAlist')">问答</div>
        <div @click="$router.push('/personalPage')">个人</div>
        <div>联系</div>
      </div>
      <!-- 底部版权信息 -->
      <div class="copyR">
        <div>粤ICP备2021079778号</div>
        <div>粤ICP备2021079778号-1</div>
        <div>@CopyRight STU-ACM</div>
      </div>
    </div>

    <div class="introBox" v-if="introFlag">
      <i class="el-icon-close" @click="closeIntro"></i>
      <div>简介</div>
      <div>汕头大学-ACM-博客问答站</div>
      <div class="scro">
        <div v-for="item in list" :key="item.id" class="cont">
          <div>
            <img :src="item.img" />
          </div>
          <div class="abc">
            <div>{{ item.name }}</div>
            <div class="ab">
              <div class="el-icon-user"></div>
              <div>{{ item.posts }}</div>
            </div>
            <div class="ab">
              <div class="el-icon-trophy"></div>
              <div>{{ item.dec }}</div>
            </div>
            <div class="ab">
              <div class="el-icon-link"></div>
              <div>{{ item.email }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { login } from '@/api'
  import { regist } from '@/api'
  import { getUser } from '@/api'
  import { getcode } from '@/api'
  import { findPassword } from '@/api'
  export default {
    data() {
      let checkEmail = (rule, value, cb) => {
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (regEmail.test(value)) {
          return cb()
        }
        cb(new Error('请输入合法的邮箱'))
      }
      return {
        initFlag: true,
        loginFlag: false,
        enrollFlag: false,
        afloginFlag: false,
        introFlag: false,
        codeBtnFlag: true,
        codeBtnFlag1: true,
        findPasswordFlag: false,
        codeNum: 60,
        timer: null,
        name: '',
        baseurl: 'http://106.53.120.252:81/',
        imgurl: '',
        list: [
          {
            id: 1,
            name: 'LUEVE',
            posts: '16级会长',
            dec: '客户端搬砖，腾讯光子',
            email: '724818484@qq.com',
            img: require('../../assets/image/introduceAvatar/1.jpg'),
          },
          {
            id: 2,
            name: 'jpswing',
            posts: '16级成员',
            dec: 'web后端搬砖,ide皮毛,leetcode',
            email: 'abzmglqyp@gmail.com',
            img: require('../../assets/image/introduceAvatar/2.jpg'),
          },
          {
            id: 3,
            name: '梁小顺',
            posts: '16级成员',
            dec: '前端皮毛,iOS皮毛,python bash node.js 三脚本皮毛，字节跳动',
            email: 'qianlanql@qq.com',
            img: require('../../assets/image/introduceAvatar/3.jpg'),
          },
          {
            id: 4,
            name: 'Luuukas',
            posts: '17级会长',
            dec: 'IOS开发.字节跳动',
            email: '2258332934@qq.com',
            img: require('../../assets/image/introduceAvatar/4.jpg'),
          },
          {
            id: 5,
            name: '赵迪',
            posts: '18级会长',
            dec: '天美游戏客户端',
            email: '752654212@qq.com',
            img: require('../../assets/image/introduceAvatar/5.jpg'),
          },
          {
            id: 6,
            name: 'WalterJ',
            posts: '18级成员',
            dec: '精通CNN的拼写,留学',
            email: 'walterj726@gmail.com',
            img: require('../../assets/image/introduceAvatar/6.jpg'),
          },
          {
            id: 7,
            name: 'MagicMarvel',
            posts: '19级成员',
            dec: 'Web前端毛皮都无,Nodejs 毛皮都无',
            email: 'magicmarvel@163.com',
            img: require('../../assets/image/introduceAvatar/7.jpg'),
          },
          {
            id: 8,
            name: 'Louise',
            posts: '19级成员',
            dec: '三维建模皮毛都无、图形学皮毛都无',
            email: '1052912442@qq.com',
            img: require('../../assets/image/introduceAvatar/8.jpg'),
          },
          {
            id: 9,
            name: 'MGAronya',
            posts: '20级会长',
            dec: '呜呜呜,我是fw',
            email: '20jzhang@stu.edu.cn',
            img: require('../../assets/image/introduceAvatar/9.jpg'),
          },
          {
            id: 10,
            name: 'Robot',
            posts: '20级成员',
            dec: '这个人很懒，什么也没留下',
            email: '2078048816@qq.com',
            img: require('../../assets/image/introduceAvatar/10.jpg'),
          },
        ],
        //  这是登入表单的数据绑定对象
        loginForm: {
          Email: '',
          Password: '',
        },
        findPasswordForm: {
          Email: '',
          Verify: '',
        },
        findPasswordFormRules: {
          Email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' },
          ],
          Verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        },
        // 这是表单的验证规则对象
        loginFormRules: {
          Email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' },
          ],
          // 验证密码是否合法
          Password: [
            { required: true, message: '请输入登入密码', trigger: 'blur' },
            {
              min: 6,
              max: 15,
              message: '长度在 6 到 15 个字符',
              trigger: 'blur',
            },
          ],
        },
        enrollForm: {
          Name: '',
          Password: '',
          Email: '',
          Verify: '',
        },
        enrollFormRules: {
          Name: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            {
              min: 3,
              max: 10,
              message: '用户名的长度在3~10个字符之间',
              trigger: 'blur',
            },
          ],
          Password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 6,
              max: 15,
              message: '用户名的长度在6~15个字符之间',
              trigger: 'blur',
            },
          ],
          Email: [
            { required: true, message: '请输入邮箱', trigger: 'blur' },
            { validator: checkEmail, trigger: 'blur' },
          ],
          Verify: [{ required: true, message: '请输入验证码', trigger: 'blur' }],
        },
      }
    },
    methods: {
      showLogin() {
        this.loginFlag = true
        this.initFlag = false
      },
      gotoSoj() {
        window.location.href = 'http://119.91.84.186/'
      },
      showEnroll() {
        this.initFlag = false
        this.enrollFlag = true
      },
      showIntor() {
        this.initFlag = false
        this.introFlag = true
      },
      closeIntro() {
        this.initFlag = true
        this.introFlag = false
      },
      // 点击重置按钮，重置登录表单
      resetLoginForm() {
        this.$refs.loginFormRef.resetFields()
      },
      login() {
        this.$refs.loginFormRef.validate(async (valid) => {
          if (!valid) return false
          const res = await login(this.loginForm)
          if (res.code !== 200) return this.$message.error(res.msg)
          this.$message.success('登录成功')
          window.localStorage.setItem('token', res.data.token)
          window.localStorage.setItem('tokenStartTime', new Date().getTime())
          this.GetUser()
          this.loginFlag = false
          this.afloginFlag = true
        })
      },
      closeLogin() {
        this.loginFlag = false
        this.initFlag = true
        this.loginForm.Email = ''
        this.loginForm.Password = ''
      },
      closefindPassword() {
        this.findPasswordFlag = false
        this.initFlag = true
        this.findPasswordForm.Email = ''
        this.findPasswordForm.Verify = ''
      },
      // 点击重置按钮，重置注册表单
      resetEnrollForm() {
        this.$refs.enrollFormRef.resetFields()
      },
      async getCode() {
        this.codeNum = 30
        this.codeBtnFlag = false
        this.getTime()
        // 检验邮箱之后再发验证码
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (!regEmail.test(this.enrollForm.Email)) {
          return this.$message.error('该邮箱格式不正确！')
        }
        const res = await getcode(this.enrollForm.Email)
        if (res.code === 201) return this.$message.error('该邮箱已经被注册！')
      },
      async getCode1() {
        this.codeNum = 30
        this.codeBtnFlag1 = false
        this.getTime()
        // 检验邮箱之后再发验证码
        const regEmail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/
        if (!regEmail.test(this.findPasswordForm.Email)) {
          return this.$message.error('该邮箱格式不正确！')
        }
        const res = await getcode(this.findPasswordForm.Email)
        if (res.code !== 200) return this.$message.error(res.msg)
      },
      // 新增代码：
      getTime() {
        this.timer && clearTimeout(this.timer)
        this.codeNum--
        if (this.codeNum < 0) {
          this.codeBtnFlag = true
          this.codeBtnFlag1 = true
          return
        }
        this.timer = setTimeout(() => {
          this.getTime()
        }, 1000)
      },
      async findPass() {
        const res = await findPassword(this.findPasswordForm)
        if (res.code !== 200) return this.$message.error(res.msg)
        if (res.code === 200) {
          this.findPasswordForm.Email = ''
          this.findPasswordForm.Verify = ''
          return this.$message.success(res.msg)
        }
      },
      enroll() {
        this.$refs.enrollFormRef.validate(async (valid) => {
          if (!valid) return false
          const data = await regist(this.enrollForm)
          if (data.code !== 200) return this.$message.error(data.msg)
          if (data.code === 200) {
            this.GetUser()
            window.localStorage.setItem('token', data.data.token)
            window.localStorage.setItem('tokenStartTime', new Date().getTime())
            this.enrollFlag = false
            this.afloginFlag = true
            return this.$message.success(data.msg)
          }
        })
      },
      closeEnroll() {
        this.initFlag = true
        this.enrollFlag = false
        this.enrollForm.Name = ''
        this.enrollForm.Password = ''
        this.enrollForm.Email = ''
        this.enrollForm.Verify = ''
      },
      keyDown(e) {
        // 回车则执行登录方法 enter键的ASCII是13
        if (e.keyCode === 13) {
          this.login() // 定义的登录方法
        }
      },
      async GetUser() {
        let res = await getUser()
        console.log(res)
        if (res.code === 200) {
          this.name = res.data.user.Name
          this.imgurl = this.baseurl + res.data.user.Icon
          return this.$message.success('欢迎回来   ' + this.name)
        }
      },
      findPassword() {
        this.loginFlag = false
        this.findPasswordFlag = true
      },
    },
    created() {
      if (window.localStorage.getItem('token')) {
        this.initFlag = false
        this.afloginFlag = true
      }
    },
    mounted() {
      this.GetUser()
      // 绑定监听事件
      window.addEventListener('keydown', this.keyDown)
    },
    destroyed() {
      // 销毁事件
      window.removeEventListener('keydown', this.keyDown, false)
    },
  }
</script>

<style lang="less" scoped>
  .bgc {
    position: fixed;
    top: 0;
    left: 0;
    /*以上三句是让整个span放在屏幕的最左上方*/
    width: 100%;
    height: 100%;
    /*以上两句实现全屏大小*/
    background: url('../../assets/image/bgc1.png') no-repeat center 0;
    /*引入背景图，不重复出现*/
    background-size: cover;
    font-family: Georgia, 'Times New Roman', Times, serif;
  }

  .wapper {
    width: 40.9375rem;
    margin: 0 auto;
  }

  .slogan {
    height: 12.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 40px;
    color: #fff;
    font-weight: 500;
    margin-top: 330px;
  }

  .welc {
    margin-top: 330px;
    margin-bottom: 30px;
  }

  .avatar:hover {
    top: 50px;
    transform: rotate(-10deg);
  }

  .nm {
    width: 400px;
    height: 100px;
    line-height: 100px;
    margin: 0 auto;
    color: #fff;
    text-align: center;
    font-size: 20px;
    border-bottom: 0.5px solid #888;
    border-top: 0.5px solid #888;
    animation: rainbow 1s;
  }

  @keyframes rainbow {
    0% {
      height: 0;
      line-height: 0;
    }

    100% {
      height: 100px;
      line-height: 100px;
    }
  }

  .avatar {
    width: 80px;
    height: 80px;
    margin: 0 auto;
    margin-bottom: 20px;
    border-radius: 50%;
    overflow: hidden;
    transition: all 0.5s;
    cursor: pointer;

    img {
      height: 100%;
      width: 100%;
    }
  }

  .small {
    margin-top: 0.625rem;
    font-size: 0.625rem;
  }

  .gezi {
    height: 3.75rem;
    color: rgb(45, 140, 233);

    div {
      height: 100%;
      width: 25%;
      display: inline-block;
      text-align: center;
      line-height: 3.75rem;
      font-size: 1.25rem;
    }

    div:hover {
      background: skyblue;
      cursor: pointer;
    }
  }

  .copyR div {
    padding-left: 10px;
  }

  .copyR {
    width: 100%;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 10px;
    color: #ccc;
    position: absolute;
    bottom: 0px;
    line-height: 30px;
  }

  .loginBox {
    width: 450px;
    height: 300px;
    background: #121212;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;

    .avatarBox {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    i {
      position: absolute;
      right: 20px;
      font-size: 60px;
      font-weight: 600;
      color: blue;
      cursor: pointer;
    }
  }

  .findPasswordBox {
    width: 450px;
    height: 280px;
    background: #121212;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;

    .avatarBox {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    i {
      position: absolute;
      right: 20px;
      font-size: 60px;
      font-weight: 600;
      color: blue;
      cursor: pointer;
    }
  }

  .loginForm {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 10px 40px;
    box-sizing: border-box;
  }

  .btns {
    display: flex;
    justify-content: flex-end;
  }

  .enrollBox {
    width: 450px;
    height: 400px;
    background: #121212;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: 0.8;

    .avatarBox {
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      position: absolute;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #fff;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: #eee;
      }
    }

    i {
      position: absolute;
      right: 20px;
      font-size: 60px;
      font-weight: 600;
      color: blue;
      cursor: pointer;
    }
  }

  .enrollForm {
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 40px;
    box-sizing: border-box;
  }

  .introBox {
    width: 80%;
    height: 90%;
    margin: auto;
    margin-top: 40px;
    padding-top: 1px;
    color: #fff;
    background-color: rgba(17, 24, 39, 0.5);

    >i {
      font-size: 40px;
      float: right;
      margin: 10px 10px 0 0;
      cursor: pointer;
    }

    >div:first-of-type {
      width: 55px;
      border-bottom: 1px solid #fff;
      font-size: 24px;
      padding-left: 10px;
      margin: 40px 0 0 10px;
    }

    >div:nth-child(3) {
      margin: 10px 0 30px 20px;
      align-items: center;
    }

    >div:nth-last-child(1) {
      height: 480px;
      margin: 0 40px;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      position: relative;
      overflow-y: scroll;
      padding-right: 100px;
      padding-top: 10px;
    }
  }

  .cont {
    width: 800px;
    height: 220px;
    border-bottom: 0.7px solid #ccc;

    >div:first-child {
      height: 90px;
      width: 90px;
      float: left;
      background-color: #fff;
      margin-left: 20px;
      margin-top: 50px;
      border-radius: 50%;
      background-size: cover;
      opacity: 1;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  .abc {
    margin-left: 150px;
    margin-top: 20px;
    opacity: 1;
  }

  .ab {
    align-items: center;
    display: flex;
  }

  .ab div {
    margin-right: 10px;
    margin-top: 20px;
  }

  .scro::-webkit-scrollbar {
    display: none;
  }

  .confirmCode {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .el-input {
      width: 42%;
      margin-right: 100px;
    }
  }
</style>