<template>
  <div class="my-container">
    <div v-if="user" class="myLogin">
      <div class="userTop">
        <div class="userImage">
          <van-image
          round
          fit="cover"
          :src="require('@/images/cross1.jpg')"
          class="userImg"
          >
            <template v-slot:loading>
              <van-loading type="spinner" size="20" /> -->
            </template>
          </van-image>
          <span class="userH">黑马头条</span>
        </div>
        <van-button class="userBut" type='default' round>编辑资料</van-button>
      </div>
      <div class="userBottom">
        <div class="userInfo">
          <span class="first">79</span>
          <span>头条</span>
        </div>
        <div class="userInfo">
          <span class="first">79</span>
          <span>头条</span>
        </div>
        <div class="userInfo">
          <span class="first">79</span>
          <span>头条</span>
        </div>
        <div class="userInfo">
          <span class="first">79</span>
          <span>头条</span>
        </div>
      </div>
    </div>
    <div v-else class="my-top-image" @click="$router.push('/login')">
      <div class="phone-image"></div>
      <span>登录 / 注册</span>
    </div>
    <van-grid clickable :column-num="2">
      <van-grid-item
      text="收 藏"
      to="/"
      class='textFont'
      >
        <span slot=icon class='toutiao toutiaoshoucang1'></span>
      </van-grid-item>
      <van-grid-item
      text="历 史"
      to="/layout/home"
      class='textFont'
      >
        <span slot=icon class='toutiao toutiaolishi1'></span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" is-link to="/layout/my" />
    <van-cell title="小智同学" is-link to="/layout/my" />
    <van-button @click="userCancels" v-if="$store.state.user" class="userButton" clickable type="default" size="large">退出登录</van-button>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { getSinglePersons } from '@/api/user.js'
export default {
  name: 'myIndex',
  components: {},
  props: {},
  data () {
    return {
      userSingleInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  watch: {},
  created () {
    if (this.user) {
      this.getSingleP()
    }
  },
  mounted () {},
  methods: {
    ...mapMutations(['removeUser']),
    userCancels () {
      // this.$store.commit('removeUser', null)
      this.$dialog.confirm({
        title: '消息提示',
        message: '您确认要退出'
      })
        .then(() => {
          // on confirm
          this.removeUser(null)
          this.$toast.success('退出成功')
        })
        .catch(() => {
          // on cancel
          this.$toast.success('没有退出呢...')
        })
    },
    async getSingleP () {
      try {
        const data = await getSinglePersons()
        this.userSingleInfo = data
      } catch (err) {
        console.log('获取个人资料失败了', err)
        if (err.response.status === 401) {
          this.$toast.success('您的身份未认证，请去注册...')
        } else {
          this.$toast('用户信息错误--或者服务器出错')
        }
      }
    }
  }
}
</script>

<style lang='less' scope>
  .my-container {
    .my-top-image {
      height: 361px;
      background-image: url(@/images/banner.png);
      background-size: cover;
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
        font-size: 30px;
        margin-top: 18px;
      }
    }
    .myLogin {
      height: 361px;
      background-image: url(@/images/banner.png);
      background-size: cover;
      .userTop {
        display: flex;
        justify-content: space-between;
        padding: 78px 32px;
        align-items: center;
        .userImage {
          display:flex;
          align-items: center;
          .userH {
            font-size: 34px;
            color: #ffffff;
            padding-left: 22px;
          }
          .userImg {
            width: 140px;
            height: 140px;
          }
        }
        .userBut {
          height: 38px;
          .van-button__content {
            padding-top: 2px;
            .van-button__text {
              font-size: 24px;
            }
          }
        }
      }
      .userBottom {
        display: flex;
        justify-content: space-evenly;
        position: relative;
        top: -34px;
        .userInfo {
          display: flex;
          flex-direction: column;
          align-items: center;
          color: #ffffff;
          font-size: 28px;
          .first {
            font-size: 38px;
            margin-left: -2px;
          }
        }
      }
    }
    .textFont {
      font-size: 40px;
      .toutiao {
        font-size: 44px;
      }
      .van-grid-item__text {
        padding-top: 8px;
      }
    }
    .userButton {
      color: #d86262;
    }
  }
</style>
