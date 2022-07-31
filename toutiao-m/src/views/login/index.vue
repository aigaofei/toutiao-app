<template>
  <div class='login-container'>
    <van-nav-bar
      class='page-nav-bar'
      title="登录"
    >
    <template #left>
      <van-icon name="cross" size="18" class='back'/>
      <span @click='$router.back()' >返回</span>
    </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref='sendCodes'>
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        maxlength='11'
        :rules=mobileValidate
        class='loginField'
      >
      <span slot='left-icon' class='toutiao toutiaoshouji1'></span>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type='Number'
        maxlength= '6'
        :rules=codeValidate
        class='loginFont'
      >
      <span slot='left-icon' class='toutiao toutiaoyanzhengma'></span>
      <template #button>
        <van-button v-if='flag'
          native-type='button'
          @click='onSendCode'
          class='yan'
          round
          size="small"
          type="default"
        >
        发送验证码
        </van-button>
        <van-count-down
          @finish="flag=true"
          v-else
          :time="time"
          format="ss 秒"
        />
      </template>
      </van-field>
      <div class='sub'>
        <van-button
        class='submit'
        block
        type="info"
        native-type="submit"
        >
        <span class='subLog'>登录</span></van-button>
      </div>
    </van-form>
    <div class="buttomInfo">隐私声明</div>
  </div>
</template>

<script>
import { login, sendCode } from '@/api/user.js'
export default {
  name: 'loginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      mobileValidate: [{
        required: true,
        message: '请输入合法手机号',
        trigger: 'onBlur'
      }, {
        pattern: /^[1][3,4,5,7,8,9][0-9]{9}$/,
        message: '手机号规则不合法'
      }],
      codeValidate: [{
        required: true,
        message: '请输入正确的验证码',
        trigger: 'onBlur'
      }, {
        pattern: /^\d{6}$/,
        message: '验证码规则不合法'
      }],
      flag: true,
      time: 6000
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        // 1 获取表单数据
        const user = this.user
        // 3 提交表单内容
        // console.log(user)
        const { data: { data } } = await login(user)
        this.$toast.success('加载成功')
        // 登录成功的token码--全局存储在vuex容器里
        this.$store.commit('setUser', data)
        console.log(data)
        this.$router.push('/layout')
      } catch (err) {
        if (err.response.status === '507') {
          console.log('服务器忙，请稍后重试')
        } else if (err.response.status === 400) {
          console.log('请求数据有误，请仔细检查')
        } else {
          console.log('未知错误，气死你')
          this.$toast.fail('...错误啦...')
        }
      }
    },
    async onSendCode () {
      // const user = this.user
      console.log('发送验证码')
      try {
        this.$refs.sendCodes.validate('mobile')
      } catch (e) {
        return this.$toast('验证码发送失败')
      }
      this.flag = false
      try {
        await sendCode(this.user.mobile)
        this.$toast.success('手机号码已发送，请稍等...')
      } catch (err) {
        console.log('发送失败', err)
        if (err.response.status === 404) {
          this.$toast.fail('手机号码无效')
        } else if (err.response.status === 429) {
          this.$toast.fail('1分钟后才可以发送')
        } else if (err.response.status === 507) {
          this.$toast.fail('服务器数据库异常，稍后再试...')
        } else {
          this.$toast.fail('未知错误...')
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
  .login-container {
    span {
      padding-left: 10px;
      color: #fff;
      line-height: 52px;
      font-size: 24px;
    }
    .back {
      color: #fff;
      font-size: 24px !important;
    }
    .toutiao {
      font-size: 37px;
      color: #666666;
    }
    .yan {
      background-color: #ededef;
      width: 190px;
      height: 48px;
      line-height: 48px;
      font-size: 28px;
      .van-button__text {
        padding: 0;
        color: #666666;
      }
    }
    .loginField {
      line-height: 90px;
      padding-top: 0;
      padding-bottom: 0;
    }
    .sub {
      margin: 50px 30px 0;
      color: #f7faff;
      .submit {
        border: none;
        background-color: #6db4fb;
        .subLog {
          color:#ffffff;
        }
      }
    }
    .buttomInfo {
      position: relative;
      bottom: -840px;
      font-size: 24px;
      transform: translateX(50%);
      left: -46px;
    }
  }
</style>
