<template>
  <div class="updatePhoto-container" @click="$emit('closeUserImage', false)">
    <img :src="userImage" ref="image"/>
    <div class="console">
      <span @click="onCancel">取消</span><span @click="onConfirm">确认</span>
    </div>
  </div>
</template>

<script>
import 'cropper/dist/cropper.css'
import Cropper from 'cropperjs/dist/cropper.min.js'
export default {
  name: 'updatePhoto',
  components: {},
  data () {
    return {
      cropper: null
    }
  },
  props: ['userImage'],
  watch: {
    // userImage: {
    //   handler: function (newVal, oldVal) {
    //     this.newUser = newVal
    //     console.log(newVal)
    //     console.log(oldVal)
    //   }
    // },
    // immediate: true
  },
  computed: {},
  created () {
  },
  mounted () {
    const image = this.$refs.image
    this.cropper = new Cropper(image, {
      // aspectRatio: 1 / 1,
      // crop (event) {
      //   console.log(event.detail.x)
      // }
      viewMode: 1,
      dragMode: 'move',
      aspectRatio: 1,
      // autoCropArea: 1,
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      movable: true
    })
    // console.log(cropper) // 会得到裁剪图片所有信息
  },
  methods: {
    onCancel () {
      this.newUser = false
      this.$emit('closeUserImage', false)
    },
    onConfirm () {
      // 第一种方法： 将下面数据交给服务端裁切
      // console.log(this.cropper.getData()) // 得到裁切数据
      // 第二种方法： 前端裁切
      // getCroppedCanvas 方法--不兼容低版本pc端
      // const blob = this.userImage
      this.cropper.getCroppedCanvas().toBlob(async blob => {
        const formData = new FormData()
        formData.append('photo', blob)
        console.log(blob)
        // 调用上传接口：
        // const { data } = await updateUserImage(formData)
        // console.log(data) // 返回的就是裁切后的图片地址
      })
    }
  }
}
</script>

<style lang="less" scoped>
  img {
    width: 100%;
    display: block;
  }
  .console {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    width: 100%;
    span {
      padding: 30px 30px;
      color: #fff;
      font-size: 20px;
    }
  }
</style>
