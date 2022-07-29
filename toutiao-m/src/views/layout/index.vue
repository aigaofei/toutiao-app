<template>
  <div class="layout-container">
    <router-view></router-view>
    <!-- 底部导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item to='/home'>
        <i slot='icon' class='toutiao toutiaoshouye'></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to='/qa'>
        <i slot='icon' class='toutiao toutiaowenda1'></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item to='/video'>
        <i slot='icon' class='toutiao toutiaoshipin1'></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item to='/my'>
        <i slot='icon' class='toutiao toutiaowode1'></i>
        <span>我的</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layoutIndex',
  components: {},
  props: {},
  data () {
    return {
      active: 0
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scoped>
.layout-container {
  i.toutiao {
    font-size: 40px;
    color: #707070;
  }
  span {
    font-size: 20px;
  }
}
</style>
