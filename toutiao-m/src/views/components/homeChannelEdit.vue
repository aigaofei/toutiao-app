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
      <van-button @click='closeFlag=!closeFlag' size="small" round type="info" class='edit'>编 辑</van-button>
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
        <van-icon v-if='closeFlag' name="close" class='closeButton' />
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
      v-for='item in allChannelInfoContent' :key='item.id'
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
import { allChannelContent } from '@/api/channel.js'
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
      allChannelData: []
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
    }
  },
  created () {
    console.log(this.isShow + '子组件里的props数据')
    console.log(this.activeChannel)
    this.loadAllChannel()
  },
  mounted () {},
  methods: {
    showPopup () {
      this.show = false
      this.$emit('channel', this.show)
    },
    myChannelButton (index) {
      this.$emit('singleMyChannel', index)
      console.log(index)
      this.showPopup()
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
    pushChannel (data) {
      // this.channelInfo.push(data)
      // this.allChannelData.forEach((item, index) => {
      //   if (item.name === data.name) {
      //     this.allChannelData.splice(index, 1)
      //   }
      // })
      console.log(data.name)
      console.log(this.allChannelData)
      this.$emit('pushChannelButton', data)
      console.log(data)
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
