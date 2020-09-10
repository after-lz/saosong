<template>
  <div class="news">
    <div class="header">
      <div class="back">
          <span class="iconfont iconjiantou2" @click='$router.back()'></span>
      </div>
      <div class="logo">
          <span class="iconfont iconnew"></span>
      </div>
      <div class="title">
        <div class="attention" v-if="post.has_follow" @click="unfollow">已关注</div>
        <div class="cancel" v-else @click="follow">关注</div>
      </div>
    </div>
    <div class="content">
      <div class="title">{{post.title}}</div>
      <span class="name">{{post.user.nickname}}</span>
      <span class="time">{{post.user.create_date | time}}</span>
      <div class="msg" v-if="post.type === 1" v-html="post.content"></div>
      <video v-else :src="getUrl(post.content)" controls></video>
      <div class="link">
        <div class="dianzan" @click="haslike">
          <span class="iconfont icondianzan"></span>{{post.like_length || 0}}
        </div>
        <div class="zhuanfa">
          <span class="iconfont iconweixin"></span>微信
        </div>
      </div>
    </div>
    <div class="comment">
      <div class="title">精彩跟帖</div>
      <news-comment :comment='item' v-for="item in commentList" :key="item.id" @reply='onreply'></news-comment>
    </div>
    <div class="footer" v-if="isShowTextarea">
      <input type="text" placeholder="回复" @focus="focusFn">
      <div class="links">
        <span class="iconfont iconpinglun-"><i>{{post.comment_length}}</i></span>
        <span class="iconfont iconshoucang" :class="{starColor:post.has_star}" @click="like"></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
    </div>
    <div class="footer-textarea" v-else>
      <textarea :placeholder="'回复: ' + replynickname" ref="textarea" v-model="content"></textarea>
      <van-button type="danger" @click="publish">发送</van-button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      post: {
        user: {}
      },
      commentList: [],
      isShowTextarea: true,
      content: '',
      replynickname: '',
      replyid: ''
    }
  },
  created () {
    this.getInfo()
    this.postComment()
    this.$bus.$on('reply', this.onreply)
  },
  destroyed () {
    this.$bus.$off('reply', this.onreply)
  },
  methods: {
    async getInfo () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post/${id}`)
      //   console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
        // console.log(this.post)
      }
    },
    getUrl (url) {
      const div = document.createElement('div')
      div.innerHTML = url
      return div.innerText
    },
    async follow () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        this.$toast('请先登录')
        return
      }
      const res = await this.$axios.get(`/user_follows/${this.post.user.id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async unfollow () {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async haslike () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        this.$toast('请先登录')
        return
      }
      const res = await this.$axios.get(`/post_like/${this.post.id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200 && message === '点赞成功') {
        this.$toast(message)
        this.post.like_length++
        document.querySelector('.icondianzan').classList.add('active')
      } else {
        this.$toast(message)
        this.post.like_length--
        document.querySelector('.icondianzan').classList.remove('active')
      }
    },
    async postComment () {
      const id = this.$route.params.id
      const res = await this.$axios.get(`/post_comment/${id}`)
      // console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentList = data
        // console.log(this.commentList)
      }
    },
    async like () {
      const token = localStorage.getItem('token')
      if (!token) {
        this.$router.push({
          path: '/login',
          query: {
            back: true
          }
        })
        this.$toast('请先登录')
        return
      }
      const res = await this.$axios.get(`/post_star/${this.post.id}`)
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      }
    },
    async focusFn () {
      this.isShowTextarea = false
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async publish () {
      const res = await this.$axios.post(`/post_comment/${this.post.id}`, {
        content: this.content,
        parent_id: this.replyid
      })
      // console.log(res.data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.postComment()
        this.isShowTextarea = true
        this.content = ''
        this.replyid = ''
        this.replynickname = ''
      }
    },
    async onreply (id, nickname) {
      // console.log(id, nickname)
      this.isShowTextarea = false
      await this.$nextTick()
      this.$refs.textarea.focus()
      this.replynickname = '@' + nickname
      this.replyid = id
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  text-align: center;
  padding: 0 20px;
    .back {
        width: 30px;
        span {
            font-size: 16px;
            line-height: 50px;
        }
    }
    .logo {
        flex: 1;
        text-align: left;
        span {
          font-size: 60px;
          line-height: 50px;
        }
    }
    .title {
        padding: 10px;
        .attention {
          width: 80px;
          height: 30px;
          border: 1px solid #000;
          font-size: 14px;
          text-align: center;
          border-radius: 15px;
          line-height: 30px;
        }
        .cancel {
          width: 80px;
          height: 30px;
          border: 1px solid #fff;
          font-size: 14px;
          text-align: center;
          border-radius: 15px;
          line-height: 30px;
          background-color: rgb(180, 57, 57);
          color: aliceblue;
        }
    }
}
.content {
    padding: 10px;
    .title{
      font-size: 20px;
      font-weight: 700;
    }
    span {
      font-size: 14px;
      color: #cccccc;
      margin-right: 10px;
    }
    .msg {
      font-size: 16px;
      line-height: 2;
    }
}
.link {
    text-align: center;
    margin: 20px;
    .dianzan,
    .zhuanfa {
      display: inline-block;
      width: 80px;
      height:30px;
      line-height:30px;
      text-align: center;
      font-size: 14px;
      border: 1px solid #ccc;
      border-radius: 15px;
    }
    .zhuanfa {
      margin-left: 80px;
      span {
          color: lime;
      }
    }
}
.comment {
  border-top: 3px solid #ccc;
}
.active {
  color: red !important;
}
video {
  width: 100%;
}
/deep/ img {
  width: 100%;
}
.starColor {
  color: red;
}
.comment {
  .title {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    margin-top: 10px;
   }
}
.footer {
  width: 100%;
  display: flex;
  position: fixed;
  bottom: 0;
  height: 50px;
  border-top: 1px solid #ccc;
  padding: 10px;
  justify-content: space-around;
  align-items: center;
  background-color: #ccc;
  input {
    width: 250px;
    height: 30px;
    border-radius: 25px;
    text-indent: 1em;
    font-size: 14px;
  }
  .links {
    span {
      position: relative;
      font-size:20px ;
      margin: 0 5px;
      i {
        position: absolute;
        top: -50%;
        left: 50%;
        height: 16px;
        border-radius: 8px;
        background-color: red;
        color: #ccc;
        font-size: 12px;
        padding: 0 5px 0 3px;
      }
    }
  }
}
.footer-textarea {
  padding: 10px;
  display: flex;
  justify-content: space-around;
  align-items: flex-end;
  textarea {
    width: 261px;
    height: 90px;
    border-radius: 10px;
    background-color: #ccc;
    font-size: 14px;
    padding: 5px;
  }
  .van-button {
    width: 59px;
    height: 26px;
    border-radius: 10px;
    font-size: 12px;
  }
}
</style>
