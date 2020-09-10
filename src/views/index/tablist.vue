<template>
  <div class="tablist">
    <div class="header">
      <div class="back">
          <span class="iconfont iconjiantou2" @click='$router.back()'></span>
      </div>
      <div class="title">栏目管理</div>
    </div>
    <div class="active">
      <p>点击删除以下频道</p>
      <div class="list">
        <div class="item" v-for="item in activeList" :key='item.id' @click='del(item.id)'>{{item.name}}</div>
      </div>
    </div>
    <div class="deactive">
      <p>点击添加以下频道</p>
      <div class="list">
        <div class="item" v-for="item in deactiveList" :key='item.id' @click='add(item.id)'>{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async created () {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    const res = await this.$axios.get('/category')
    // console.log(res)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeList = data
      // console.log(this.activeList)
    }
  },
  data () {
    return {
      activeList: [],
      deactiveList: []
    }
  },
  methods: {
    del (id) {
      if (this.activeList.length <= 4) return
      const str = this.activeList.findIndex(item => item.id === id)
      this.deactiveList.push(this.activeList[str])
      this.activeList.splice(str, 1)
    },
    add (id) {
      const str = this.deactiveList.findIndex(item => item.id === id)
      this.activeList.push(this.deactiveList[str])
      this.deactiveList.splice(str, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler () {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 50px;
  line-height: 50px;
  text-align: center;
  padding: 0 20px;
    .back {
        width: 30px;
        span {
            font-size: 16px;
        }
    }
    .title {
        flex: 1;
        font-size: 16px;
    }
}
.deactive,
.active {
    padding: 10px;
  p {
    font-size: 14px;
    color: #ccc;
  }
  .list {
      overflow: hidden;
    .item {
        float: left;
        width: 60px;
        height: 30px;
        line-height: 30px;
        border: 1px solid #ccc;
        font-size: 14px;
        text-align: center;
        margin: 10px;
    }
  }
}
</style>
