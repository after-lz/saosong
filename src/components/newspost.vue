<template>
  <div class="newspost" @click='$router.push(`/news/${post.id}`)'>
    <div class="video" v-if="post.type === 2">
      <div class="title">{{post.title}}</div>
      <div class="content">
        <span class="iconfont iconshipin"></span>
        <img :src="$url(post.cover[0].url)" alt="">
      </div>
      <div class="message">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
    <div class="news" v-else-if="post.cover.length > 0 && post.cover.length < 3">
      <div class="content">
        <p>{{post.title}}</p>
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
      <div class="photo">
        <img :src="$url(post.cover[0].url)" alt="">
      </div>
    </div>
    <div class="new" v-else-if="post.cover.length >= 3">
      <p class="title">{{post.title}}</p>
      <div class="photo">
          <img :src="post.cover[0].url" alt="">
          <img :src="post.cover[1].url" alt="">
          <img :src="post.cover[2].url" alt="">
      </div>
      <div class="message">
        <span>{{post.user.nickname}}</span>
        <span>{{post.comment_length}}跟帖</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: Object
  }
}
</script>

<style lang="less" scoped>
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
.video {
  padding: 10px;
  border-bottom: 1px solid #ccc;
  .title {
    font-size: 16px;
  }
  .content {
    width: 340px;
    height: 170px;
    position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      span {
        position: absolute;
        width: 50px;
        height: 50px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        border-radius: 50%;
        text-align: center;
        font-size: 50px;
        background-color: rgba(255, 255, 255, .3);
        color: #fff;
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
</style>
