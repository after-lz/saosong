<template>
  <div class="comment">
    <news-header>我的跟帖</news-header>
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
      <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :immediate-check="false"
      @load="onLoad"
      >
        <div class="reply" v-for='item in commentlist' :key='item.id'>
          <div v-if='item.parent?true:false'>
            <p class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</p>
            <div class="reply_title" v-if='item.parent'>
              <p class="reply_info">回复： {{item.parent.user.nickname}}</p>
              <p class="reply_source">{{item.parent.content}}</p>
            </div>
          </div>
          <p class="now">{{item.content}}</p>
          <div class="source">
            <div class="source_info text" @click="$router.push(`/news/${item.post.id}`)">
                <span>原文：{{item.post.title}}</span>
            </div>
            <div class="source_icon">
                <span class="iconfont iconjiantou1"></span>
            </div>
          </div>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
export default {
  created () {
    this.update()
  },
  data () {
    return {
      commentlist: [],
      loading: false,
      finished: false,
      pageIndex: 1,
      pageSize: 6,
      refreshing: false
    }
  },
  methods: {
    async update () {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.commentlist = [...this.commentlist, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
        this.refreshing = false
      }
    },
    onLoad () {
      setTimeout(() => {
        // console.log(123)
        this.pageIndex++
        this.update()
      }, 1000)
    },
    onRefresh () {
      setTimeout(() => {
        this.commentlist = []
        this.pageIndex = 1
        this.loading = true
        this.finished = false
        this.update()
      }, 1000)
    }
  }
}
</script>

<style lang="less" socped>
.comment {
    .quiz {
        align-items: center;
        padding: 10px;
        border-bottom: 2px solid #b5a0a0;
        p {
          font-size: 14px;
          margin: 10px 0;
        }
        .time {
          color: #b5a0a0;
        }
        .quiz_info {
          color: #000;
        }
        .source {
          display: flex;
          font-size: 14px;
          .source_icon {
              color:#b5a0a0;
          }
          .source_info {
              flex: 1;
              color: #b5a0a0;
          }
        }

    }
    .reply {
        align-items: center;
        padding: 10px;
        border-bottom: 2px solid #b5a0a0;
        .time {
          color: #b5a0a0;
          font-size: 14px;
          margin-bottom: 10px;
        }
        .reply_title {
            background-color: #e4e4e4;
            padding: 15px;
            p {
               color:#b5a0a0;
               margin: 10px 0;
            }
            .reply_info {
                font-size: 12px;
            }
            .reply_source {
                font-size: 14px;
            }
        }
        .now {
            color: #000;
            font-size:15px;
            margin: 10px 0;
        }
        .source {
          display: flex;
          font-size: 14px;
          .source_icon {
              color:#b5a0a0;
          }
          .source_info {
              flex: 1;
              color: #b5a0a0;
          }
        }
    }
}
</style>
