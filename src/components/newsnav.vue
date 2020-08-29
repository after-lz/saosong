<template>
  <div class="nav" @click='clickFn'>
      <div class="title"><slot></slot></div>
      <div class="content"><slot name="content"></slot></div>
      <div class="arrow">
          <span class="iconfont iconjiantou1"></span>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    clickFn () {
      if (this.to) {
        this.$router.push(this.to)
      }
    }
  },
  props: {
    to: String
  }
}
</script>

<style lang="less" scoped>
.nav {
    display: flex;
    height: 50px;
    align-items: center;
    border-bottom: 1px solid #ccc;
    margin-left: 10px;
    padding: 0 10px;
    font-size: 15px;
    .content {
        flex: 1;
        text-align: right;
    }
    .arrow {
        padding-left: 10px;
    }
}
</style>
