<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-text="返回"
      left-arrow
      title="黑马头条"
      @click-left="onLeft"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap">
        <van-loading
          color="#3296fa"
          vertical
        >加载中</van-loading>
      </div>
      <!-- /加载中 -->
      <!-- 加载完成-文章详情 -->
      <div class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{this.infoDataInfo.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            src="http://toutiao.itheima.net/images/user_head.jpg"
          />
          <div slot="title" class="user-name">{{this.infoDataInfo.aut_name}}</div>
          <div slot="label" class="publish-date">{{this.infoDataInfo.pubdate}}</div>
          <van-button
            v-if="this.infoDataInfo.is_followed"
            class="follow-btn"
            round
            size="small"
          >已关注</van-button>
          <van-button
            v-else
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
          >关注</van-button>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" v-html="this.infoDataInfo.content" style="font-size:12px;"></div>
        <van-divider>正文结束</van-divider>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="commentShow=true"
          >写评论</van-button>
          <van-icon
            name="comment-o"
            badge="123"
            color="#777"
          />
          <van-icon
            color="#777"
            name="star-o"
          />
          <van-icon
            color="#777"
            name="good-job-o"
          />
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
      </div>
      <!-- /加载完成-文章详情 -->
      <articleComment v-if="commentShow"></articleComment>
      <!-- 加载失败：404 -->
      <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
  </div>
</template>

<script>
import articleComment from '@/views/components/articleComment.vue'
import { articleInfo } from '@/api/article.js'
export default {
  name: 'articleInfo',
  components: {
    articleComment
  },
  // props: {
  //   id: {
  //     require: true,
  //     type: [Number, String, Object] // 当id值超大时，类型为Object
  //   }
  // },
  props: ['id'],
  watch: {},
  computed: {},
  data () {
    return {
      articleId: '',
      infoDataInfo: {},
      commentShow: false
    }
  },
  created () {
    // 下面是第一种获取路由参数的方法
    const id = this.$route.params.id
    console.log(id)
    // console.log(this.id) 获取props里的值--效果都一样
    // 下面是第二种参数获取法
    // 在vue-router文件里找到此组件跳转设定的路由，里面有一个属性功能
    // prop属性开启为true，就可以给在对应的组件里的props里接收使用
    // 【想父给子传值一样使用】
    // ------------------
    // 获取每个id文章的内容
    this.getArticleInfo()
  },
  mounted () {},
  methods: {
    onLeft () {
      this.$router.back()
    },
    async getArticleInfo () {
      try {
        console.log(this.id)
        const { data: infoData } = await articleInfo(this.id)
        console.log(infoData.data)
        this.infoDataInfo = infoData.data
      } catch (err) {
        console.log(err)
        this.$toast('获取对应id的文章内容失败了----')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
.van-nav-bar,
.van-icon,
.van-nav-bar__text {
  color: #fff;
}
</style>
