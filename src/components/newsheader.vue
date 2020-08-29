<template>
    <div class="my-header">
        <div class="back" @click = goback>
            <span class="iconfont iconjiantou2"></span>
        </div>
        <div class="title"><slot></slot></div>
        <div class="black"></div>
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
.my-header {
    display: flex;
    height: 120px;
    line-height: 120px;
    text-align: center;
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
</style>
