<template>
  <div class="news">
    <div class="header">
      <div class="logo">
          <span class="iconfont iconnew"></span>
      </div>
      <div class="content">
        <div class="search" @click="$router.push('/search')"><span class="iconfont iconsearch">  搜索新闻</span></div>
      </div>
      <div class="user" @click="$router.push('/user')">
          <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-sticky class="more-sticky">
      <div class="more" @click="$router.push('/tablist')">
        <span class="iconfont iconlianjie"></span>
      </div>
    </van-sticky>
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in tabList" :key='item.id'>
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
          v-model="loading"
          :finished="finished"
          finished-text="没有更多了"
          :immediate-check="false"
          @load="onLoad"
          >
            <news-post :post='item' v-for="item in newsList" :key="item.id"></news-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'index',
  created () {
    this.update()
  },
  data () {
    return {
      active: 0,
      tabList: [],
      pageIndex: 1,
      pageSize: 5,
      newsList: [],
      loading: false,
      finished: false,
      refreshing: false
    }
  },
  methods: {
    async update () {
      const activeList = JSON.parse(localStorage.getItem('activeList'))
      if (activeList) {
        this.tabList = activeList
        this.getList(this.tabList[0].id)
        return
      }
      const res = await this.$axios.get('/category')
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.tabList = data
        // console.log(this.tabList)
        this.getList(this.tabList[0].id)
      }
    },
    async getList (id) {
      const res = await this.$axios.get('/post', {
        params: {
          category: id,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        if (this.pageIndex === 1) { this.newsList = [] }
        this.newsList = [...this.newsList, ...data]
        // console.log(this.newsList)
        this.loading = false
        this.refreshing = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
      }
    },
    onLoad () {
      setTimeout(() => {
        this.pageIndex++
        this.getList(this.tabList[this.active].id)
      }, 1000)
    },
    onRefresh () {
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.newsList = []
        this.getList(this.tabList[this.active].id)
      }, 1000)
    }
  },
  watch: {
    active (value) {
      this.newsList = []
      this.pageIndex = 1
      this.finished = false
      this.loading = true
      setTimeout(() => {
        this.getList(this.tabList[value].id)
      }, 1000)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
    display: flex;
    text-align: center;
    height: 50px;
    line-height: 50px;
    background-color: brown;
    .logo,
    .user {
      width: 70px;
      height: 50px;
    }
    .logo {
      span {
        font-size: 50px;
      }
    }
    .user {
      span {
        font-size: 24px;
      }
    }
    .content {
        flex: 1;
        padding: 8px;
        .search {
          width: 100%;
          height: 100%;
          background-color: cornsilk;
          border-radius: 20px;
          line-height: 30px;
        }
    }
}
/deep/ .van-tabs__wrap {
  width: 85%;
}
.more {
  width: 15%;
  height: 44px;
  position: absolute;
  right: 0;
  z-index: 999;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
}
.more-sticky {
  /deep/ .van-sticky--fixed {
    z-index: 100;
  }
}
</style>
