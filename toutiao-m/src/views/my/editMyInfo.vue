<template>
  <div class="editMyInfo-container">
    <!-- 顶部导航栏 -->
    <van-nav-bar
      title="编辑资料"
      left-text="返回"
      right-text="确认"
      left-arrow
      class="editInfo"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <!-- 个人信息内容 -->
    <!-- 头像 -->
    <van-cell title="头像" @click="userImage">
    <!-- 使用 right-icon 插槽来自定义右侧图标 -->
    <!-- 这些文件信息可以通过 oversize 事件获取 -->
        <input @change="changeImage" type="file" hidden ref="userInfo"/>
        <van-image
          round
          class="userImage"
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <template #right-icon>
          <van-icon name="arrow" class="arrow"/>
        </template>
    </van-cell>
    <!-- popup弹出框展示上传图片 -->
    <van-popup v-model="isShowAll" position="bottom"
    class="showImage" :style="{ height: '70%' }">
      <updatePhoto :userImage = img
      @closeUserImage = "isShowAll=$event"
      v-if="isShowAll"
      >
      </updatePhoto>
    </van-popup>
    <!-- 昵称 -->
    <van-cell @click="replacePetName" title="昵称"
    is-link arrow-direction="down"
    :value="petNameValue" />
    <van-field
      v-model="petNameValue"
      center
      clearable
      label="新昵称"
      placeholder="请输入新昵称名字"
      v-if="petName"
    >
      <template #button>
        <van-button @click="petConfirm" size="small" type="primary">确认</van-button>
      </template>
    </van-field>
    <!-- 介绍 -->
    <van-cell title="介绍" is-link/>
    <van-cell class="introduce" value="本人 至今，各项达标，成绩优秀，适合各项比赛运动，多次取得优异成绩" />
    <!-- 性别 -->
    <van-cell title="性别" value="男" is-link/>

    <!-- 生日 -->
    <van-field
      readonly
      clickable
      name="calendar"
      :value="personData"
      label="生日"
      placeholder="点击选择日期"
      @click="showCalendar = true"
    />
    <van-calendar v-model="showCalendar" @confirm="onConfirm" />
    <!-- 地区 -->
    <van-field
      readonly
      clickable
      name="area"
      :value="value"
      label="地区选择"
      placeholder="点击选择省市区"
      @click="showArea = true"
    />
    <van-popup v-model="showArea" position="bottom">
      <van-area
        :area-list="areaList"
        @confirm="onConfirmArea"
        @cancel="showArea = false"
      />
    </van-popup>
  </div>
</template>

<script>
import updatePhoto from '@/views/components/updatePhoto.vue'
import { areaList } from '@vant/area-data'
export default {
  name: 'editMyInfo',
  components: {
    updatePhoto
  },
  props: {},
  watch: {},
  computed: {},
  data () {
    return {
      personData: '',
      showCalendar: false,
      showPicker: false,
      value: '',
      showArea: false,
      areaList: areaList, // 数据格式见 Area 组件文档
      petName: false,
      petNameValue: '留念',
      isShowAll: false,
      img: null // 传给子组件预览的图片
    }
  },
  created () {},
  mounted () {},
  methods: {
    onClickLeft () {
      this.$router.back()
    },
    // 头部导航确认提交
    onClickRight () {
      this.$dialog.confirm({
        title: '标题',
        message: '弹窗内容'
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        })
    },
    // 日期确认
    onConfirm (date) {
      console.log(date)
      this.value = `${date.getMonth() + 1}/${date.getDate()}`
      this.showCalendar = false
    },
    // 地区确认
    onConfirmArea (values) {
      this.value = values
        .filter((item) => !!item)
        .map((item) => item.name)
        .join('/')
      this.showArea = false
      console.log(this.value)
    },
    replacePetName () {
      this.petName = true
    },
    petConfirm () {
      this.petName = false
    },
    userImage () {
      console.log('修改图片内容...')
      this.$refs.userInfo.click()
    },
    changeImage () {
      this.img = null
      const userImageInfo = this.$refs.userInfo.files[0]
      // console.log(userImageInfo) // 会的到照片的除路径的基本信息
      const data = window.URL.createObjectURL(userImageInfo)
      console.log(data)
      this.img = data
      this.isShowAll = true
      this.$refs.userInfo.value = ''
      console.log(this.$refs.userInfo.files[0])
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
/deep/  .editInfo {
    background-color: #3296fa;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-nav-bar,.van-icon,.van-nav-bar__text {
      color: #fff;
    }
  }
  .userImage {
    width: 60px;
    height: 60px;
    margin-right: 15px;
  }
  .search-icon {
    font-size: 16px;
    line-height: inherit;
  }
  .arrow {
    padding-top: 5px;
  }
  .showImage {
    height: '100%';
    background-color: rgba(0,0,0,.5);
  }
</style>
