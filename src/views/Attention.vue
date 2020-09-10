<template>
  <div class="attention">
    <news-header>我的关注</news-header>
    <div class="list" v-for='item in fllow' :key='item.id' >
      <div class="photo">
          <img :src="$axios.defaults.baseURL+item.head_img" alt="">
      </div>
      <div class="info">
        <p class="name">{{item.nickname}}</p>
        <p class="time">{{item.create_date | time('YYYY-DD-MM HH:mm')}}</p>
      </div>
      <div class="concern">
        <van-button type="default" round @click='onfocus(item.id)'>取消关注</van-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  created () {
    this.load()
  },
  data () {
    return {
      fllow: ''
      //   id: ''
    }
  },
  methods: {
    async load () {
      const res = await this.$axios.get('/user_follows')
      // console.log(res.data.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.fllow = data
      // console.log(this.fllow)
      }
    },
    /* onfocus (id) {
      this.id = id
      this.$dialog.confirm({
        title: '温馨提示',
        message: '取消关注'
      })
        .then(async () => {
          const res = await this.$axios.get(`/user_unfollow/${this.id}`)
          //  console.log(res)
          const { message, statusCode } = res.data
          if (statusCode === 200) {
            this.$toast(message)
          }
        })
        .catch(() => {
          this.$toast('取消操作')
        })
    } */
    async onfocus (id) {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '取消关注'
        })
      } catch {
        return this.$toast('取消操作')
      }
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      //  console.log(res)
      const { message, statusCode } = res.data
      if (statusCode === 200) {
        this.$toast(message)
        this.load()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.list {
    display: flex;
    align-items: center;
    padding: 15px;
    border-bottom: 1px solid #ccc;
    .photo {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 10px;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .concern {
        font-size: 14px;
    }
    .info {
        flex: 1;
        .name {
            font-size: 16px;
            margin-bottom: 5px;
        }
        .time {
            font-size: 14px;
        }
    }
}
</style>
