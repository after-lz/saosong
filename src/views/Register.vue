<template>
  <div>
      <news-header>注册</news-header>
      <news-logo></news-logo>
      <van-form @submit="register">
        <van-field
          v-model="user.username"
          label="用户名"
          placeholder="用户名"
          :rules="rules.username"
        />
        <van-field
          v-model="user.nickname"
          label="昵称"
          placeholder="昵称"
          :rules="rules.nickname"
        />
        <van-field
          v-model="user.password"
          type="password"
          label="密码"
          placeholder="密码"
          :rules="rules.password"
        />
        <div style="margin: 16px;">
          <van-button round block type="info" native-type="submit">
            提交
          </van-button>
        </div>
      </van-form>
      <div class="tips"><router-link to="/login">去登录</router-link></div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: {
        username: '',
        password: '',
        nickname: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '用户名长度是5-11位', trigger: 'onChange' }
        ],
        password: [
          { required: true, message: '密码不能为空', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '密码长度为3-9位', trigger: 'onChange' }
        ],
        nickname: [
          { required: true, message: '请输入昵称', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '昵称长度为3-9位', trigger: 'onChange' }
        ]
      }
    }
  },
  methods: {
    async register () {
      // console.log(111)
      const res = await this.$axios.post('/register', {
        username: this.user.username,
        password: this.user.password,
        nickname: this.user.nickname
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.$router.push({
          name: 'login',
          params: this.user
        })
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.tips {
  text-align: right;
  font-size: 15px;
  a {
    color: red;
  }
}
</style>
