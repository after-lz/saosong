<template>
  <div class="user">
    <div class="header" @click='clickFn'>
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + user.head_img" alt="">
      </div>
      <div class="info">
        <div class="name">
            <span v-if="user.gender===1" class="iconfont iconxingbienan"></span>
            <span v-else class="iconfont iconxingbienv"></span>
            <span>{{user.nickname}}</span>
        </div>
        <div class="time">{{user.create_date | time}}</div>
      </div>
      <div class="arrow">
          <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <news-nav to="/attention">我的关注
        <template #content>关注的内容</template>
    </news-nav>
    <news-nav to="/comment">我的跟帖
        <template #content>跟帖/内容</template>
    </news-nav>
    <news-nav to="/collect">我的收藏
        <template #content>文章/视频</template>
    </news-nav>
    <news-nav to="/edit">设置
    </news-nav>
    <div class="button" @click='logout'>
      <van-button type="danger" block>退出登录</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  async created () {
    const userid = localStorage.getItem('userid')
    const res = await this.$axios.get(`/user/${userid}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
    }
  },
  methods: {
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定退出登录吗?'
        })
      } catch {
        return this.$toast('取消退出')
      }
      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
      this.$toast('退出成功')
    },
    clickFn () {
      this.$router.push('/edit')
    }
  }
}
</script>

<style lang="less" scoped>
.user {
    .header {
        display: flex;
        padding: 20px 10px;
        align-items: center;
        .avatar {
            width: 70px;
            height: 70px;
            border-radius: 50%;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
            }
        }
        .arrow {
            width: 50px;
        }
        .info {
            flex: 1;
            padding-left: 20px;
            font-size: 14px;
            .name {
                span {
                    margin-right: 5px;
                }
            }
            .time {
                margin-top: 10px;
            }
            .iconxingbienan {
                color: skyblue;
            }
            .iconxingbienv {
                color: pink;
            }
        }
    }
    .button {
      padding: 20px;
    }
}
</style>
