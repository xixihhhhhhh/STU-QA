<template>
  <div>
    <el-card class="card">
      <el-form :model="user" label-width="100px" class="demouser" label-position="top">
        <el-form-item label="用户名" label-width="200px">
          <el-input v-model="user.Name" disabled></el-input>
        </el-form-item>
        <el-form-item label="博客名">
          <el-input v-model="user.Blog" disabled></el-input>
        </el-form-item>
        <el-form-item label="QQ">
          <el-input v-model="user.QQ" type="number" disabled></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="user.Sex" disabled>
            <el-radio :label="true" :value="true">男</el-radio>
            <el-radio :label="false" :value="false">女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="user.Email" disabled></el-input>
        </el-form-item>
        <el-form-item label="籍贯">
          <el-input v-model="user.Address" disabled></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="user.Telephone" disabled></el-input>
        </el-form-item>
        <el-form-item label="爱好">
          <el-input v-model="user.Hobby" disabled></el-input>
        </el-form-item>
      </el-form>
      <div class="gaodu"></div>
    </el-card>
    <div class="gaodu"></div>
  </div>
</template>

<script>
import { getOneUser } from '@/api'
export default {
  data() {
    return {
      user: {}
    }
  },
  methods: {
    async oneUserGet() {
      let res = await getOneUser(this.$route.params.id)
      if (res.code == 200) {
        this.user = res.data.user
      }
    },
  },
  created() {
    this.oneUserGet()
  }
}
</script>

<style lang="less" scoped>
.demouser {
  width: 90%;
  margin: 0 auto;
}
.card {
  width: 90%;
  margin: 40px auto 100px auto;
}
/deep/
input[disabled],input:disabled,input.disabled{
  -webkit-text-fill-color: black;
  background: #F5F7FA;
  -webkit-opacity:1;
  opacity: 1;
  cursor: not-allowed;
}
.gaodu {
  height: 40px;
}
</style>