<template>
  <div class='login-container'>
    <van-nav-bar
      class='page-nav-bar'
      title="登录"
      safe-area-inset-top='true'
    >
    <template #left>
      <van-icon name="cross" size="18" class='back'/>
      <span @click='$router.back()' >返回</span>
    </template>
    </van-nav-bar>
    <van-form @submit="onSubmit" ref='sendCode'>
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type: Number
        maxlength= '11'
        :rules=mobileValidate
        class='loginField'
      >
      <span slot='left-icon' class='toutiao toutiaoshouji1'></span>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        type:Number
        maxlength= '6'
        :rules=codeValidate
        class='loginFont'
      >
      <span slot='left-icon' class='toutiao toutiaoyanzhengma'></span>
      <template #button>
        <van-button v-if='flag' native-type='button' @click='onSendCode' class='yan' round size="small" type="default">发送验证码</van-button>
        <van-count-down @finish= 'flag = true' v-else :time="time" format="ss 秒" />
      </template>
      </van-field>
      <div class='sub'>
        <van-button class='submit' block type="info" native-type="submit"><span class='subLog'>登录</span></van-button>
      </div>
    </van-form>
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
    // 2 表单验证
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      // 1 获取表单数据
      const user = this.user
      // 3 提交表单内容
      try {
        const { data: { data } } = await login(user)
        this.$toast.success('加载成功')
        // 登录成功的token码--全局存储在vuex容器里
        this.$store.commit('setUser', data)
        console.log(data)
      } catch (err) {
        if (err.response.status === 400) {
          // Toast.fail('加载失败，请再次尝试')
          this.$toast.fail('加载失败，请再次尝试')
        } else {
          this.$toast.fail('服务器忙,请稍后重试')
        }
      }
    },
    // 4 根据反馈信息后续操作
    async onSendCode () {
      // 1 校验手机号
      console.log('发送验证码触发')
      try {
        await this.$refs.sendCode.validate('mobile')
        this.$toast.success('通过')
        this.backTime()
      } catch (err) {
        return this.$toast.fail('不对的加载---')
      }
      // this.$refs.sendCode.resetValidation('code')
      // 重置验证信息这个怎么用？？？？？？？？？？？？？？？？？？？
      // console.log(this.$refs.sendCode.resetValidation('mobile'))
      // console.log(this.mobileValidate[0].message = 'jose934')
      // 2 发送请求，显示倒计时
      // 3 收到响应
    },
    async backTime () {
      this.flag = false
      try {
        await sendCode(this.user.mobile)
        this.$toast.success('验证码合适...')
      } catch (err) {
        this.flag = true
        if (err.response.status === 404) {
          this.$toast.fail('手机号不正确')
        } else if (err.response.status === 429) {
          this.$toast.fail('访问次数太频繁，稍后再试')
        } else {
          this.$toast.fail('其它错误，联系后端人员')
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
    }
    .van-button__text {
      color: #666666;
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
  }
</style>
