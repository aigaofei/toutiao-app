<template>
  <div class="articleList-container">
    <van-pull-refresh success-duration="1300" :success-text="successInfo" v-model="refreshing" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        :error-text="errorText"
      >
        <van-cell v-for="(item, index) in articleListInfo"
        :key="index"
        is-link
        @click="toThisArticle(item.art_id)"
        >
        <!-- 下面是第二种路由跳转 -->
        <!-- :to="'/articleInfo/' + item.art_id" -->
        <!-- <template slot='title'  -->
        <div class="articleContentMany" v-if='item.cover.type === 3'>
          <div class="articleTitle articleTitleMany">{{item.title}}</div>
          <div class="articleImage" >
            <div class="images" v-for='(imageItem, index) in item.cover.images' :key='index'>
              <van-image
                width="100"
                height="100"
                :src="imageItem"
                fit="cover"
              />
            </div>
          </div>
        </div>
        <div class="articleContentOne" v-else-if='item.cover.type === 1'>
          <div class="articleTitle">{{item.title}}</div>
          <div class="articleImage articleImageOne" >
            <div class="images" v-for='(imageItem, index) in item.cover.images' :key='index'>
              <van-image
                width="100"
                height="100"
                :src="imageItem"
                fit="cover"
              />
            </div>
          </div>
        </div>
        <div class="articleTitle noImage" v-else>{{item.title}}</div>
        <div class="articleFoot">
          <span class='articleTop'>置顶：</span>
          <span>{{item.aut_name}}</span>
          <span>{{item.comm_count}} 评论</span>
          <span>{{item.pubdate | relativeTime}}</span>
        </div>
        </van-cell>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  components: {},
  // props: ['channel'],
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  watch: {},
  computed: {},
  data () {
    return {
      articleListInfo: [],
      loading: false,
      finished: false,
      refreshing: false,
      error: false,
      successInfo: '刷新成功',
      articleParameter: {
        channel_id: this.channel.id,
        timestamp: Date.now()
      },
      errorText: '请求失败，点击重新加载'
    }
  },
  created () {
  },
  mounted () {},
  methods: {
    async onLoad () {
      try {
        // 异步更新数据
        const { data: { data } } = await getArticles(this.articleParameter)
        console.log(data.results)
        // console.log(data)
        const dataInfo = data.results
        // this.articleListInfo.push(...dataInfo)
        // 加载状态结束
        this.loading = false
        // 用每次加载的【数据长度】来判断是否完全加载完毕
        this.articleParameter.timestamp = data.pre_timestamp
        if (dataInfo.length < 10) {
          // 数据全部加载完成
          this.finished = true
          console.log('数据已全部加载完毕.....')
        } else {
          // this.articleParameter.timestamp = data.pre_timestamp
          this.articleListInfo.push(...dataInfo)
          // console.log(dataInfo.length)
        }
      } catch (err) {
        // 加载状态结束
        this.loading = false
        if (err.response.status === 400) {
          this.error = true// 使错误后继续重新加载
          this.$toast('网络不好，请稍后再试.....')
        }
      }
    },
    onRefresh () {
      try {
        // 清空列表数据
        this.finished = false
        // 将 loading 设置为 true，表示处于加载状态
        this.loading = true
        this.refreshing = false
        // 重新加载数据
        this.onLoad()
      } catch (err) {
        this.successInfo = '无网络，尝试重刷新...'
      }
    },
    toThisArticle (id) {
      this.$router.push(`/articleInfo/${id}`)
    }
  }
}
</script>

<style lang="less" scoped>
  .articleList-container {
    padding: 10px 0 70px;
    // height: (650/6.67)vh;
    height: 94vh;
    overflow-y: auto;
    .articleContentMany {
      .articleImage {
        display: flex;
        justify-content: space-between;
      }
      padding: 14px 6px;
    }
    .articleContentOne {
      display: flex;
      justify-content: space-between;
      // padding-left: 35px;
    }
    .articleTitle {
      font-size: 36px;
    }
    .articleTitleMany {
      padding-bottom: 12px;
    }
    .articleImageOne {
      padding-left: 14px;
    }
    .articleFoot {
      font-size: 10px;
      span {
        margin: 0px 12px;
        display: inline-block;
      }
    }
    .articleTop {
      color: red;
      margin: 0px 0px !important;
    }
    .noImage {
      padding-bottom: 15px;
    }
  }
</style>
