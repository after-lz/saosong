<template>
  <div class="news-edit">
      <news-header>编辑资料</news-header>
      <div class="photo">
          <img :src="$axios.defaults.baseURL + user.head_img" alt="">
          <van-uploader :after-read="afterRead" />
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
          <van-field v-model="value" ref="nickname" placeholder="请输入昵称" />
        </van-cell-group>
      </van-dialog>
      <van-dialog v-model="password" title="编辑密码" show-cancel-button @confirm='updatePassword'>
        <van-cell-group>
          <van-field v-model="newpassword" ref="password" placeholder="请输入新密码" />
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
      <div class="tailor" v-show="isShow">
        <van-button type="primary" class="crop" @click='crop'>裁剪</van-button>
        <van-button type="danger" class="cancel" @click='isShow = false'>取消</van-button>
        <vue-cropper
        ref="aa"
        autoCrop
        autoCropWidth="100"
        autoCropHeight="100"
        fixed
        :img="img">
        </vue-cropper>
      </div>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  created () {
    this.getUserInfo()
  },
  components: {
    VueCropper
  },
  data () {
    return {
      user: '',
      show: false,
      value: '',
      password: false,
      newpassword: '',
      gender: false,
      newgender: '',
      isShow: false,
      img: ''
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
    async shownickname () {
      this.show = true
      this.value = this.user.nickname
      await this.$nextTick()
      this.$refs.nickname.focus()
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
    async showpassword () {
      this.password = true
      this.newpassword = this.user.password
      await this.$nextTick()
      this.$refs.password.focus()
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
    },
    afterRead (file) {
    // 此时可以自行将文件上传至服务器
      if (!this.isTmg(file.file.name)) {
        return this.$toast.fail('请上传正确的图片格式')
      }
      if (file.file.size >= 25 * 1024) {
        return this.$toast.fail('上传图片太大')
      }
      this.isShow = true
      this.img = file.content
    },
    crop () {
      this.$refs.aa.getCropBlob(async blob => {
        const fd = new FormData()
        fd.append('file', blob)
        // console.log(blob)
        const res = await this.$axios.post('/upload', fd)
        // console.log(res)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          this.updateUser({
            head_img: data.url
          })
        }
        this.isShow = false
      })
    },
    isTmg (name) {
      if (name.endsWith('.png') || name.endsWith('.jpg')) {
        return true
      } else {
        return false
      }
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
    position: relative;
      img {
          width: 100%;
          height: 100%;
      }
      .van-uploader {
        position: absolute;
        top: 50px;
        left: 50px;
        transform: translate(-50%,-50%);
        opacity: 0;
      }
    }
    /deep/.van-dialog__content {
      padding: 15px;
      .van-field {
          border:1px solid #ccc
      }
    }
    .tailor {
      width: 100%;
      height: 100%;
      z-index: 999;
      position: fixed;
      top: 0;
      left: 0;
      .crop,
      .cancel {
        position: absolute;
        top: 0;
        z-index: 1;
      }
      .cancel {
        right: 0;
      }
    }
}

</style>
