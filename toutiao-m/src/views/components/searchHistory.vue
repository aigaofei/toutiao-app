<template>
  <div class="searchHistory-container">
    <van-cell title="搜索历史" class="searchSpan">
      <span @click="deleteAll" v-if="searchHistoryItem.length">全部删除</span>
      <span v-else>暂无记录</span>
      <!-- 使用 right-icon 插槽来自定义右侧图标 -->
      <template #right-icon>
        <van-icon name="delete-o" class="delete-o" />
      </template>
    </van-cell>
    <van-cell v-for="(val,index) in searchHistoryItem"
      :key="index"
      >
      <template #title>
        <span @click="toThis(val)" class="custom-title">{{val}}</span>
      </template>
      <template #right-icon>
        <van-icon @click="deleteThis(index)"
        name="cross" class="cross-o" />
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getItem, setItem } from '@/utils/localStorage.js'
export default {
  name: 'searchHistory',
  components: {},
  props: {},
  watch: {},
  computed: {},
  data () {
    return {
      searchHistoryItem: getItem('historyItem') || []
    }
  },
  created () {},
  mounted () {},
  methods: {
    toThis (val) {
      this.$emit('emitVal', val)
    },
    deleteThis (dataThis) {
      this.searchHistoryItem.splice(dataThis, 1)
      setItem('historyItem', this.searchHistoryItem)
    },
    deleteAll () {
      // removeItem('historyItem')
      for (let i = 0; i < this.searchHistoryItem.length; i++) {
        console.log(i)
        // splice 后面不加删除个数，表示删除全部
        // 这里如果指认每次删几个就会总是漏一个，以为i自增的原因
        this.searchHistoryItem.splice(i)
      }
      if (this.searchHistoryItem.length === 0) {
        setItem('historyItem', [])
      }
    }
  }
}
</script>

<style lang="less" scoped>
.searchHistory-container {
  .custom-title {
    padding: 0px 240px 0px 0px;
    text-align: left;
  }
  .delete-o,.cross-o {
    font-size: 16px;
    line-height: 80px;
  }
  .searchSpan {
    // .van-cell__value {
    //   right: -100px;
    // }
    span {
      padding-right: 5px;
      margin-right: 20px;
      font-size: 18px;
    }
  }
  .cross-o {
    width: 160px;
    text-align: right;
  }
  .van-cell {
    padding: 0px 30px !important;
    height: 80px !important;
    line-height: 80px !important;
  }
}
</style>
