<template>
  <div>
    <news-floor :comment="comment.parent" :count='count-1' v-if="comment.parent"></news-floor>
    <div class="newsfloor">
      <div class="info">
        <span class="serial">{{count}}</span>
        <span class="name">{{comment.user.nickname}}</span>
        <span class="time">{{comment.create_date | now}}</span>
        <span class="call" @click="reply">回复</span>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  /* name: 'news-floor', */
  props: {
    comment: Object,
    count: Number
  },
  methods: {
    reply () {
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    }
  }
}
</script>

<style lang="less" scoped>
.newsfloor {
    padding: 10px;
    margin: 0 15px;
    border: 1px solid #ccc;
  .info {
      height: 20px;
      line-height: 20px;
      text-align: center;
      .serial {
        float: left;
        width: 20px;
        font-size: 13px;
      }
      .name {
        float: left;
        font-size: 14px;
        margin-right: 10px;
      }
      .time {
        float: left;
        font-size: 12px;
        color: #ccc;
      }
      .call {
        float: right;
        width: 30px;
        font-size: 12px;
        color: #ccc;
      }
  }
  .content {
    font-size: 15px;
    margin-top: 10px;
  }
}
</style>
