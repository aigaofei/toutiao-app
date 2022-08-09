<template>
  <div class="channelEdit-container">
    <van-popup
      @click-close-icon="showPopup"
      v-model="show"
      closeable
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '100%' }"
      :close-on-popstate= 'true'
      :close-on-click-overlay= 'false'
      :safe-area-inset-bottom= 'true'
      class="popup"
    >
    <div class='myChannelContent'>
      <span>我的频道列表</span>
      <van-button @click='toggleButton'
      size="small" round type="info"
      class='edit'>{{closeFlag === true ? '完 成' : '编 辑'}}</van-button>
    </div>
    <div class="myChannelButton">
      <van-button
      class='single mySingleButtonMargin'
      size="normal"
      type="default"
      v-for='(item, index) in channelInfo'
      :key=index
      :class="[{activeColor:index===activeChannel}]"
      @click="myChannelButton(index)"
      >
        <van-icon v-if='closeFlag && index !==0' name="close" class='closeButton' />
        {{item.name}}
      </van-button>
      <!-- <van-button class='single mySingleButtonMargin' size="normal" type="default">
        <van-icon v-if='closeFlag' name="close" class='closeButton' /> 大数据</van-button>
      <van-button class='single mySingleButtonMargin' size="normal" type="default">
        <van-icon v-if='closeFlag' name="close" class='closeButton' /> JAVA</van-button>
      <van-button class='single mySingleButtonMargin' size="normal" type="default">
        <van-icon v-if='closeFlag' name="close" class='closeButton' /> HTML</van-button>
      <van-button class='single mySingleButtonMargin' size="normal" type="default">
        <van-icon v-if='closeFlag' name="close" class='closeButton' /> 区块链</van-button> -->
    </div>
    <div class='channelRecommend'>
      <span>频道推荐</span>
    </div>
    <div class="channelButton">
      <van-button icon="plus"
      class='single singleButtonMargin'
      size="normal" type="default"
      v-for="(item) in allChannelInfoContent" :key='item.id'
      @click="pushChannel(item)"
      >
      {{item.name}}
      </van-button>
      <!-- <van-button icon="plus" class='single singleButtonMargin' size="normal" type="default">前端</van-button>
      <van-button icon="plus" class='single singleButtonMargin' size="normal" type="default">JAVA</van-button>
      <van-button icon="plus" class='single singleButtonMargin' size="normal" type="default">HTML</van-button>
      <van-button icon="plus" class='single singleButtonMargin' size="normal" type="default">区块链</van-button> -->
    </div>
    </van-popup>
  </div>
</template>

<script>
import { allChannelContent, postChannelContent, postDeleteChannelContent } from '@/api/channel.js'
import { mapState } from 'vuex'
import { getItem } from '@/utils/localStorage.js'
export default {
  name: 'homeChannelEdit',
  components: {},
  // props: ['isShow', 'activeChannel', 'channelInfo'],
  props: {
    isShow: {
      require: true
    },
    activeChannel: {
      require: true,
      type: Number
    },
    channelInfo: {
      require: true,
      type: Array
    }
  },
  data () {
    return {
      show: this.isShow,
      closeFlag: false,
      allChannelData: [],
      putChannel: []
    }
  },
  watch: {},
  computed: {
    allChannelInfoContent () {
    // 创建一个新的频道数组
    // const allChannel = []
    // console.log(this.channelInfo)
    // 查找符合条件的内容
    // 这种连续循环只能用递归方法
    // this.allChannelData.forEach(item => {
    //   this.channelInfo.forEach(dataItem => {
    //     if (item.name !== dataItem.name) {
    //       allChannel.forEach(itemInfo => {
    //         if (itemInfo.name.indexOf(item.name) === -1) {
    //           allChannel.push(item)
    //         }
    //       })
    //     }
    //   })
    // })
      const allChannel = []
      this.allChannelData.forEach(item => {
        const dataInfo = this.channelInfo.find(info => {
          return item.name === info.name
        })
        // console.log(dataInfo)
        if (!dataInfo) {
          allChannel.push(item)
        }
      })
      // console.log(allChannel)
      return allChannel
    },
    ...mapState(['user'])
  },
  created () {
    console.log(this.isShow + '子组件里的props数据')
    console.log(this.activeChannel)
    this.loadAllChannel()
    console.log(this.user)
  },
  mounted () {},
  methods: {
    showPopup () {
      this.show = false
      this.$emit('channel', this.show)
    },
    myChannelButton (index) {
      if (this.closeFlag === false) {
        this.$emit('singleMyChannel', index)
        this.showPopup()
        console.log(index)
        return false
      }
      if (index === 0) {
        return false
      }
      if (index <= this.activeChannel) {
        this.$emit('currentActive', -1)
      }
      this.$emit('deleteMyChannel', index)
      console.log(index + '-----要删除的频道按钮索引')
    },
    async loadAllChannel () {
      try {
        const { data: { data } } = await allChannelContent()
        // console.log(data.channels)
        this.allChannelData = data.channels
      } catch (err) {
        this.$toast('所有频道内容获取失败')
      }
    },
    async pushChannel (channelData) {
      // this.channelInfo.push(data)
      // this.allChannelData.forEach((item, index) => {
      //   if (item.name === data.name) {
      //     this.allChannelData.splice(index, 1)
      //   }
      // })
      console.log(channelData.id)
      // 下面是获取所有频道内容
      // console.log(this.allChannelData)
      if (this.user) {
        console.log(this.channelInfo.length + '登录后随时添加的总频道数')
        try {
          const { data: { data } } = await postChannelContent({
            id: channelData.id,
            seq: this.channelInfo.length
          })
          console.log(data.channels[0])
          console.log(this.channelInfo.length)
          console.log(this.channelInfo)
          console.log('请求数据成功----')
          // 将返回来的数据存到自己本地里--返回的数据时添加目标的id和顺序
          this.$emit('pushChannelButton', channelData)
        } catch (err) {
          this.$toast('获取频道数据失败，心情不好....')
        }
        return false
      }
      // 下面这行是将它交给父级组件，未登陆时可在本地持久化
      this.$emit('pushChannelButton', channelData)
    },
    // 做的是登录时--我的频道里面删除的内容后--发送的请求
    async toggleButton () {
      this.closeFlag = !this.closeFlag
      console.log(this.closeFlag)
      // 下面是登陆后---操作删除频道后保存到数据库的提交
      if (this.user) {
        console.log(this.channelInfo.length)
        if (!this.closeFlag) {
          const deleteAllChannel = getItem('myChannelInfo')
          console.log(deleteAllChannel)
          const submitChannels = []
          deleteAllChannel.forEach((item, index) => {
            submitChannels.push({
              id: item.id,
              seq: index
            })
          })
          // 查看删除后剩下的频道参数
          console.log(submitChannels)
          try {
            // 第一种方法是在编辑按钮为false时删除目标频道
            const { data: { data } } = await postDeleteChannelContent(submitChannels)
            console.log(data.channels[0])
            console.log(this.channelInfo.length)
            console.log(this.channelInfo)
            console.log('请求数据成功----')
            // 第二种是在编辑按钮为false时，提交剩下频道按钮
            // const { data: { data } } = await postChannelContent(submitChannels)
            // console.log(data.channels[0])
            // console.log(this.channelInfo.length)
            // console.log(this.channelInfo)
            // console.log('请求数据成功----')
            // 将返回来的数据存到自己本地里--返回的数据时添加目标的id和顺序
            this.$emit('deleteChannelButton')
            // 第三种方法是--在编辑按钮为false时，先全部删除，再将剩下的全部提交
            // 由于是接口问题--上面表面是将所剩的内容提交，实际
            // 是将我的列表初始清空了，只剩推荐一个频道
            // 所以下面用除了推荐频道，将剩下的频道再提交一般的迂回做法完成
            // 再获取一次本地持久存储的数据，排掉第一个，留下剩余
            const deleteAllChannel = getItem('myChannelInfo')
            console.log(deleteAllChannel)
            console.log('上面是目前本地持久的--频道数据')
            deleteAllChannel.splice(0, 1)
            const submitChannel = []
            deleteAllChannel.forEach((item) => {
              submitChannel.push({
                id: item.id,
                seq: deleteAllChannel.length
              })
            })
            console.log(submitChannel)
            // 循环一次提交一次
            // 这里千万不能直接调用，因为外表相同--内部逻辑不通
            // this.pushChannel(submitChannel)
            submitChannel.forEach(async item => {
              await postChannelContent(item)
              this.$emit('deleteChannelButton')
            })
            // 查看删除后剩下的频道参数
            console.log(submitChannel)
            // // 重新再提交一遍--除--第一项的其它数据
            // // 这里调用的是提交添加按钮的方法
            // const { data: { data: data1 } } = await postChannelContent(submitChannel)
            // console.log(data1.channels[0])
            // console.log(this.channelInfo.length)
            // console.log(this.channelInfo)
            // this.$emit('deleteChannelButton')
          } catch (err) {
            this.$toast('获取频道数据失败，心情不好....')
          }
          return false
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
 /deep/ .popup {
    padding-top: 50px;
    top: 0px;
    .myChannelContent {
        padding: 60px 20px 30px;
        display: flex;
        justify-content: space-between;
        font-size: 34px;
        .edit {
          height: 44px;
          border: 0;
          padding: 0px 28px;
          line-height: -0.46667rem;
          .van-button__text {
            font-size: 12px;
          }
        }
    }
    .myChannelButton {
      flex-wrap: wrap;
      justify-content: space-evenly;
      .van-button__icon {
        font-size: 0.2rem;
      }
      .mySingleButtonMargin {
        margin: 10px 10px;
        padding: 0px 38px;
        .closeButton {
          position: absolute;
          top: -16px;
          right: -10px;
          font-size: 30px;
        }
      }
    }
    .channelButton {
      .singleButtonMargin {
        margin: 10px 10px;
        padding: 0px 29px;
      }
      .van-button__icon {
        font-size: 20px;
      }
    }
   .channelRecommend {
      span {
        font-size: 34px;
      }
    }
    .single {
      line-height: 0px;
      border: 0;
      background-color: #f1f0f0;
      .van-button--normal {
        font-size: 20px;
        padding: 0px 15px;
      }
      .van-button {
        padding: 0px 19px !important;
        height: 20px;
      }
    }
    .activeColor {
      color: red;
    }
  }
</style>
