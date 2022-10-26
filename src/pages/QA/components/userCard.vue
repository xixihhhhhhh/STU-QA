<template>
  <div class="rf pic">
    <div class="hh line"></div>
    <div class="hh"></div>
    <div class="avatar">
      <img :src="imgurl" />
    </div>
    <div class="bott">
      <div>{{ user.Name }}</div>
      <div class="email">{{ user.Email }}</div>
      <div class="signature">{{ user.Hobby }}</div>
    </div>
  </div>
</template>

<script>
import { getOneUser } from '@/api'
export default {
  data() {
    return {
      user: {},
      baseurl: 'http://icon.mgaronya.com/',
      imgurl: '',
    }
  },
  props: ['id', 'userprops'],
  methods: {
    async oneUserGet() {
      if (this.userprops.Name !== undefined) {
        this.user = this.userprops
        this.imgurl = this.baseurl + this.user.Icon
      } else {
        let res = await getOneUser(this.id)
        if (res.code == 200) {
          this.user = res.data.user
          this.imgurl = this.baseurl + this.user.Icon
          console.log(this.imgurl)
        }
      }
    },
  },
  created() {
    this.oneUserGet()
  },
}
</script>

<style lang="less" scoped>
.rf {
  float: right;
}
.pic {
  position: relative;
  display: flex;
  flex-direction: row;
  width: 160px;
  height: 240px;
  margin: auto 0;
  box-shadow: 0px 1px 3px rgba(34, 25, 25, 0.2);
  background-color: #fff;
  border-radius: 10%;
  cursor: pointer;
  overflow: hidden;
  transition: all 1s;
  margin-top: 10px;
}
.pic:hover .avatar {
  top: 50px;
  transform: rotate(30deg);
}
.avatar {
  width: 80px;
  height: 80px;
  position: absolute;
  top: 80px;
  left: 40px;
  border-radius: 50%;
  overflow: hidden;
  transition: all 1s;
  img {
    height: 100%;
    width: 100%;
  }
}
.pic:hover .bott {
  bottom: 20px;
}
.hh {
  width: 50%;
  height: 90%;
  margin: auto 0;
}
.line {
  border-right: 0.2px dashed rgb(147, 197, 253);
}
.bott {
  position: absolute;
  bottom: -70px;
  transition: all 1s;
  margin-left: 30px;
  > div:first-child {
    font-weight: 500;
  }
}
.email {
  font-size: 10px;
  margin-top: 5px;
  color: gray;
}
.signature {
  font-size: 10px;
  color: gray;
}
</style>