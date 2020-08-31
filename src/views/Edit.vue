<template>
  <div class="news-edit">
      <news-header>编辑资料</news-header>
      <div class="photo">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <news-nav @aa='shownickname'>昵称
          <template #content>{{user.nickname}}</template>
      </news-nav>
      <news-nav @aa='showpassword'>密码
          <template #content>******</template>
      </news-nav>
      <news-nav @aa='showgender'>性别
          <template #content>{{user.gender === 0 ? '女':'男'}}</template>
      </news-nav>
      <!-- 提示框 -->
      <van-dialog v-model="show" title="编辑昵称" show-cancel-button @confirm='updateNickname'>
        <van-cell-group>
          <van-field v-model="value" placeholder="请输入昵称" />
        </van-cell-group>
      </van-dialog>
      <van-dialog v-model="password" title="编辑密码" show-cancel-button @confirm='updatePassword'>
        <van-cell-group>
          <van-field v-model="newpassword" placeholder="请输入新密码" />
        </van-cell-group>
      </van-dialog>
      <van-dialog v-model="gender" title="修改性别" show-cancel-button @confirm='updateGender'>
        <van-radio-group v-model="newgender">
          <van-cell-group>
            <van-cell title="男" clickable @click="newgender = 1">
              <template #right-icon>
                <van-radio :name="1" />
              </template>
            </van-cell>
            <van-cell title="女" clickable @click="newgender = 0">
              <template #right-icon>
                <van-radio :name="0" />
              </template>
            </van-cell>
          </van-cell-group>
        </van-radio-group>
      </van-dialog>
  </div>
</template>

<script>
export default {
  created () {
    this.getUserInfo()
  },
  data () {
    return {
      user: '',
      show: false,
      value: '',
      password: false,
      newpassword: '',
      gender: false,
      newgender: ''
    }
  },
  methods: {
    async getUserInfo () {
      const userid = localStorage.getItem('userid')
      const res = await this.$axios.get(`/user/${userid}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.user = data
        // console.log(this.user)
      }
    },
    clickFn () {
      this.$emit('click')
    },
    shownickname () {
      this.show = true
      this.value = this.user.nickname
    },
    async updateUser (data) {
      const userid = localStorage.getItem('userid')
      const res = await this.$axios.post(`/user_update/${userid}`, data)
      if (res.data.statusCode === 200) {
        this.getUserInfo()
        this.$toast.success('修改成功')
      }
    },
    async updateNickname () {
      this.updateUser({ nickname: this.value })
    },
    showpassword () {
      this.password = true
      this.newpassword = this.user.password
    },
    async updatePassword () {
      this.updateUser({ password: this.newpassword })
    },
    showgender () {
      this.gender = true
      this.newgender = this.user.gender
    },
    async updateGender () {
      this.updateUser({ gender: this.newgender })
    }
  }
}
</script>

<style lang="less" scoped>
.news-edit {
    .photo {
    margin: 30px auto;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
      img {
          width: 100%;
          height: 100%;
      }
    }
    /deep/.van-dialog__content {
      padding: 15px;
      .van-field {
          border:1px solid #ccc
      }
    }
}

</style>
