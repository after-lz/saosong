<template>
  <div class="header">
    <div class="placeholder"></div>
    <div class="my-header">
      <div class="back" @click = goback>
          <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="title"><slot></slot></div>
      <div class="black"></div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    goback () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  .placeholder {
  width: 100%;
  height: 50px;
  }
  .my-header {
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: rgb(235, 235, 235);
    z-index: 999;
    .back,
    .black {
        width: 50px;
    }
    .title {
        flex: 1;
        font-size: 18px;
        font-weight: 700;
    }
  }
}
</style>
