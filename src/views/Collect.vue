<template>
  <div class="collect">
    <news-header>我的收藏</news-header>
<!--     <div class="news" v-for='item in data' :key='item.id'>
      <div class="content">
        <p>{{item.title}}</p>
        <span>{{item.user.nickname}}</span>
        <span>{{item.comments.length}}跟帖</span>
      </div>
      <div class="photo">
        <img :src="$url(item.cover[0].url)" alt="">
      </div>
    </div> -->
    <news-post v-for="item in data" :key="item.id" :post=item></news-post>
  </div>
</template>

<script>
export default {
  async created () {
    const res = await this.$axios.get('/user_star')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.data = data
      //  给数据新增个comment_length属性,方便newspost组件获取跟帖数据
      this.data.forEach(item => {
        item.comment_length = item.comments.length
      })
      // console.log(this.data)
    }
  },
  data () {
    return {
      data: ''
    }
  }
}
</script>

<style lang="less" scoped>
.collect {
  .news {
      display: flex;
      padding: 10px;
      border-bottom: 1px solid #ccc;
    .photo {
        img {object-fit: cover;
          width: 120px;
          height: 75px;
        }
    }
    .content {
      flex: 1;
      padding: 5px 0;
      span {
        font-size: 14px;
        color: #ccc;
        margin-right: 10px;
      }
      p {
          font-size: 16px;
      }
    }
  }
  .new {
    padding: 10px;
    border-bottom: 1px solid #ccc;
    p {
      font-size: 15px;
    }
    .photo {
        display: flex;
        justify-content: space-between;
        margin: 10px 0;
      img {
          width: 115px;
          height: 75px;
      }
    }
    .message {
      span {
        font-size: 14px;
        color: #ccc;
        margin-right: 10px;
      }
    }
  }
}
</style>
