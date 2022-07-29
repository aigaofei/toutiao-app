<template>
  <div class="my-container">
    <div class="my-top-image" @click="$router.push('/login')">
      <div class="phone-image"></div>
      <span>登录 / 注册</span>
    </div>
    <van-grid clickable :column-num="2">
      <van-grid-item icon="home-o" text="路由跳转" to="/" />
      <van-grid-item icon="search" text="URL 跳转" url="/vant/mobile.html" />
    </van-grid>
  </div>
</template>

<script>
export default {
  name: 'myIndex',
  components: {},
  props: {},
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang='less' scope>
  .my-container {
    .my-top-image {
      height: 361px;
      background-image: url(@/images/banner.png);
      background-size: cover;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .phone-image{
        background-image: url(@/images/mobile.png);
        height: 135px;
        width: 135px;
        background-size: cover;
        margin-top: 18px;
      }
      span {
        color: #ffffff;
        font-size: 22px;
        margin-top: 18px;
      }
    }
  }
</style>
