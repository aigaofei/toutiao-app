<template>
  <div class="my-container">
    <van-nav-bar class="searchColor">
      <van-button class="searchButton" to="/search" slot='title' round type="default" icon="search">搜索</van-button>
    </van-nav-bar>
    <!-- 频道列表 -->
    <div class="outerSwiper">
      <van-tabs class="tarBar">
        <van-tab swipeable animated v-model="active" v-for="index in this.data_Channels" :key=index.id :title="index.name">
          <router-view></router-view>
          <homeArticleList :channel="index" ></homeArticleList>
        </van-tab>
        <van-tab title="" class="lastVanTab"> </van-tab>
      </van-tabs>
      <div class="lastSwiper">
        <van-icon @click="show=!show" name="wap-nav" size="30" color="#333333e6" />
      </div>
    </div>
    <!-- 顶部汉堡菜单点击弹出层组件 -->
    <homeChannelEdit :channelInfo='this.data_Channels' v-if='show' :isShow='show' @channel='channelEdit'></homeChannelEdit>
  </div>
</template>

<script>
import { getUserChannels } from '@/api/user.js'
import homeArticleList from '@/views/components/homeArticleList.vue'
import homeChannelEdit from '@/views/components/homeChannelEdit.vue'
export default {
  name: 'homeIndex',
  components: {
    homeArticleList,
    homeChannelEdit
  },
  props: {},
  data () {
    return {
      active: 2,
      data_Channels: {},
      show: false
    }
  },
  computed: {},
  watch: {},
  created () {
    this.loadChannels()
  },
  mounted () {
  },
  methods: {
    async loadChannels () {
      try {
        const dataChannels = await getUserChannels()
        console.log(dataChannels)
        this.data_Channels = dataChannels.data.data.channels
        console.log(this.data_Channels)
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    channelEdit (data) {
      console.log(data + '父组件收到的数据')
      this.show = data
    }
  }
}
</script>

<style lang='less' scoped>
 /deep/ .searchColor {
    position: sticky;
    top: 0;
    background-color: #3296fa;
    .van-nav-bar__title {
      max-width: 100%;
      .van-button__text {
        font-size: 30px;
        color: #fff;
      }
      .van-icon {
        font-size: 33px;
        color: #fff;
      }
    }
    .searchButton {
      width: 555px;
      height: 64px;
      background-color: #5babfb;
      padding-top: 4px;
      border: none;
    }
  }
 /deep/ .tarBar {
    .van-tab {
      border-right: 1px solid #f0f0f0;
      border-bottom: 1px solid #d7d6d6;
      padding: 0 40px;
      .van-tab__text {
        color: #c1c3c3;
      }
      .lastVanTab {
        padding: 0px 52px;
        flex-shrink: 0.5;
      }
    }
    .van-tabs__nav {
      padding-right: 0;
      padding-left: 0;
    }
    .van-tab--active {
      .van-tab__text {
        color: #555555;
      }
    }
    .van-tabs__line {
      width: 40px;
      background-color: #3296fae6 !important;
    }
  }
  .lastSwiper {
    position: fixed;
    top: 94px;
    right: -5px;
    width: 106px;
    height: 80px;
    background-color: #f9f8f8;
    opacity: 0.7;
    z-index: 4;
    .van-icon-wap-nav {
      padding-top: 15px;
      padding-left: 20px;
    }
  }
  /deep/ .outerSwiper {
    .van-tabs__wrap {
      position: sticky;
      top: 90px;
      z-index: 3;
    }
  }
</style>
