<template>
  <div class="newscomment">
    <div class="comments">
      <div class="photo">
        <img :src="$axios.defaults.baseURL+comment.user.head_img" alt="">
      </div>
      <div class="info">
        <div class="name">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | now}}</div>
      </div>
      <div class="call" @click="reply">回复</div>
    </div>
    <news-floor :count='count' :comment='comment.parent' v-if="comment.parent"></news-floor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
export default {
  props: {
    comment: Object
  },
  data () {
    return {
      count: this.getCount(0, this.comment)
    }
  },
  methods: {
    reply () {
      this.$bus.$emit('reply', this.comment.id, this.comment.user.nickname)
    },
    getCount (num, data) {
      if (data.parent) {
        return this.getCount(num + 1, data.parent)
      } else {
        return num
      }
    }
  }
}
</script>

<style lang="less" scoped>
.newscomment {
  .comments {
    display: flex;
    padding: 10px;
    .photo {
      width: 35px;
      height: 35px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .call {
      width: 40px;
      font-size: 12px;
      color: #ccc;
    }
    .info {
      flex: 1;
      .name {
        font-size: 14px;
        margin: 0 10px;
      }
      .time {
        color: #ccc;
        font-size: 12px;
        margin-left: 10px;
      }
    }
  }
  .content {
    font-size: 14px;
    padding: 15px;
    margin-bottom: 40px;
    border-bottom: 1px solid #000;
  }
}
</style>
