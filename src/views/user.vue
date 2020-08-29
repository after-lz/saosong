<template>
  <div class="user">
    <div class="header">
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
    <news-nav to="/follow">我的关注
        <template #content>关注的内容</template>
    </news-nav>
    <news-nav>我的跟帖
        <template #content>跟帖/内容</template>
    </news-nav>
    <news-nav>我的收藏
        <template #content>文章/视频</template>
    </news-nav>
    <news-nav>设置
    </news-nav>
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
    const token = localStorage.getItem('token')
    const userid = localStorage.getItem('userid')
    const res = await this.$axios.get(`/user/${userid}`, {
      headers: {
        Authorization: token
      }
    })
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
      // console.log(this.user)
    } else if (statusCode === 401) {
      this.$toast('用户验证失败')
      this.$router.push('/login')
      localStorage.removeItem('token')
      localStorage.removeItem('userid')
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
}
</style>
