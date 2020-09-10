<template>
  <div class="news-search">
    <div class="header">
      <span class="iconfont iconjiantou2" @click="goback"></span>
      <span class="iconfont iconsearch"></span>
      <input type="text" placeholder="通灵兽消失术" v-model="keyword" @input="recommend">
      <span @click="search">搜索</span>
    </div>
    <div class="content" v-if="this.hot.length">
      <div class="recommend" v-for="item in hot" :key="item.id" @click="goSearch(item.title)">
        <span class="left text">{{item.title}}</span>
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <div v-else-if="this.list.length"><news-post v-for="item in list" :key="item.id" :post=item></news-post></div>
    <div v-else>
      <div class="history">
        <p>历史记录</p>
        <div class="historyList">
          <span class="text" v-for="item in history" :key="item" @click="goSearch(item)">{{item}}</span>
        </div>
      </div>
      <div class="hot">
        <p>历史记录</p>
        <div class="hotList">
          <span class="text">唧唧</span>
          <span>哼哼</span>
          <span>喳喳</span>
          <span>嘻嘻</span>
          <span>嘿嘿</span>
          <span>呜呜</span>
          <span>嘤嘤</span>
          <span>咯咯</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  created () {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  data () {
    return {
      list: [],
      keyword: '',
      history: [],
      hot: []
    }
  },
  methods: {
    async search () {
      if (!this.keyword) return this.$toast('请输入搜索关键字')
      const res = await this.$axios.get('/post_search', {
        params: {
          keyword: this.keyword
        }
      })
      // console.log(res.data)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        // console.log(this.list)
      }
      this.history = this.history.filter(item => item !== this.keyword)
      this.history.unshift(this.keyword)
      localStorage.setItem('history', JSON.stringify(this.history))
      this.hot = []
    },
    goback () {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.back()
      }
    },
    goSearch (item) {
      this.keyword = item
      this.search()
    },
    recommend: _.debounce(async function () {
      if (this.keyword === '') return
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.hot = data
        console.log(this.hot)
      }
    }, 1000)
  },
  watch: {
    keyword (value) {
      if (value === '') {
        this.list = []
        this.hot = []
      }
    }
  }
}
</script>

<style lang='less' scoped>
.header {
  display: flex;
  height: 40px;
  padding: 10px;
  line-height: 40px;
  text-align: center;
  span {
    width: 50px;
    font-size: 14px;
  }
  input {
      flex: 1;
      border-radius: 20px;
      widows: 258px;
      height: 38px;
      outline: none;
      border-color: rgba(215, 215, 215, 1);
      border-width: 1px;
      border-style: solid;
      font-size: 13px;
      text-indent: 3em;
  }
  .iconsearch {
    position: absolute;
    left: 15%;
  }
}
.history {
  margin-top: 20px;
  padding: 10px 20px;
  p {
    font-size: 16px;
    font-weight: 700;
  }
  .historyList {
    overflow: hidden;
    span {
        float: left;
        font-size: 12px;
        margin: 10px;
        width: 40%;
    }
  }
}
.hot {
  margin-top: 20px;
  padding: 10px 20px;
  p {
    font-size: 16px;
    font-weight: 700;
  }
  .hotList {
    overflow: hidden;
    span {
        float: left;
        font-size: 12px;
        margin: 10px;
    }
  }
}
.content {
  margin-top: 20px;
  .recommend {
  display: flex;
  height: 30px;
  line-height: 30px;
  margin: 10px 10px 10px 20px;
  border-bottom: 1px solid;
  span {
    font-size: 14px;
    text-indent: 1em;
  }
  .left {
    flex: 1;
  }
  .iconfont {
    width: 30px;
  }
}
}
</style>
