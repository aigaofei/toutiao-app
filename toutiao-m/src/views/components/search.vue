<template>
  <div class="search-container">
    <!-- 搜索框不能像表单框那样校验 -->
    <form action="/" class="searchForm">
      <van-search
        v-model.trim="searchText"
        show-action
        name="searchName"
        background="#3296fa"
        placeholder="请输入搜索关键词"
        autofocus=true
        clear-trigger="focus"
        maxlength=12
        clearable
        ref="reFocus"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
      />
    </form>
    <search-result :searchData='searchText' v-if='isResultShow'></search-result>
    <search-suggest ref="searchSuggestInfo" @searchSubmit="onSearch" :searchData='searchText' v-else-if="searchText"></search-suggest>
    <search-history @emitVal="getHistoryItem" v-else></search-history>
  </div>
</template>
<script>
import searchHistory from './searchHistory.vue'
import searchResult from './searchResult.vue'
import searchSuggest from './searchSuggest.vue'
import { setItem, getItem } from '@/utils/localStorage.js'
export default {
  name: 'searchIndex',
  components: {
    searchHistory,
    searchResult,
    searchSuggest
  },
  props: {},
  watch: {},
  computed: {},
  data () {
    return {
      searchText: '',
      isResultShow: false,
      searchHistory: getItem('historyItem') || [],
      flag: false
    }
  },
  created () {
    // Map 不能去重数组，只能去重对象
    // Set 可以去重数组
    // const historyData = new Map(2, 44, 1, 5, 1, 2)
    // var first = new Map([[1, 'one'], [2, 'two'], [3, 'three']])
    // var second = new Map([[1, 'uno'], [2, 'dos']])
    // console.log(first)
    // 合并两个 Map 对象时，如果有重复的键值，则后面的会覆盖前面的，对应值即 uno，dos， three
    // var merged = new Map([...first, ...second])
  },
  mounted () {},
  methods: {
    onSearch (val) {
      // try {            表单校验法---search 使用的不是表单
      //   this.$refs.searchRule.validate('searchName')
      // } catch (err) {
      //   this.$toast('转换内容验证失败。。。')
      // }
      console.log(val)
      this.searchText = val
      // 存储收缩历史记录  【方法一：】
      const newItem = this.searchHistory.findIndex((item) => {
        return val === item
      })
      // console.log(newItem)
      if (newItem >= 0) {
        this.searchHistory.splice(newItem, 1)
      }
      this.searchHistory.unshift(val)
      // 搜索记录多余规定个数时从最初开始减掉
      if (this.searchHistory.length > 4) {
        this.searchHistory.pop()
      }
      console.log(...this.searchHistory) // 正常显示
      // console.log(this.searchHistory[newItem]) // 正常显示
      setItem('historyItem', this.searchHistory)
      // 方法二：
      // this.searchHistory.forEach((item, indexVal) => {
      //   if (item === val) {
      //     this.searchHistory.splice(indexVal, 1)
      //   }
      // })
      // this.searchHistory.unshift(val)
      // console.log(...this.searchHistory)
      // 方法三： 【===不能用===】
      // 不能用set,虽然可以去重，但是它只能一次性去重数组
      // 却不能--去重在数组里不停的一个一个加添的情况，因为Set会不停的
      // 将每个当成子元素保存，形成很多嵌套
      // this.searchHistory.unshift(val)
      // console.log(...this.searchHistory)
      // const historyData = new Set([...this.searchHistory])
      // console.log(historyData)
      // this.searchHistory = new Array(historyData)
      // console.log(...this.searchHistory)
      // 关闭显示结果组件
      this.isResultShow = true
    },
    onCancel () {
      this.$toast('---取消成功---')
      this.$router.back()
    },
    onFocus () {
      // this.searchText = ''
      this.isResultShow = false
      if (this.searchText.length > 0) {
        console.log('这里是调用搜索联想的字组件地方---触发了')
        // this.flag = true
        // this.$refs.reFocus.blur()
        // setTimeout(function () {
        // this.$refs.reFocus.focus()
        // this.$refs.searchSuggestInfo.loadSearchSuggestion(this.searchText)
        // this.flag = false
        // }, 2200)
        this.$refs.searchSuggestInfo.loadSearchSuggestion(this.searchText)
      }
      // if (this.searchText) {
      //   console.log('这里是调用搜索联想的字组件地方---触发了')
      // }
      // console.log('这里是调用搜索联想的字组件地方---触发了')
    },
    getHistoryItem (val) {
      this.searchText = val
    }
    // 1-搜索联想建议
    // 2-搜索推荐（搜索结果）
    // 3-历史记录
    // 提示：1和23互斥    23默认同时出现
    // 表单默认获取焦点
    // 搜索栏默认有字体文字
    // 有搜索结果时其它都要隐藏
    // 表单验证
    // 表单防抖节流发送
    // 表单回车提交 或 点击提交按钮 发请求
    // 点击搜索记录 或 搜索结果 都 跳转到目标页面 本页显示搜索结果
    // 同时搜索栏历史内容清空
    // 搜索文字时，联想部分的搜索文字是有色的
    // 清空搜索记录功能

  }
}
</script>

<style lang="less" scoped>
  .search-container {
    position: relative;
    margin-top: 100px;
    height: 87vh;
    overflow-y: auto;
    .searchForm {
      position: fixed;
      top: 0px;
      left: 0px;
      right: 0px;
      z-index: 3;
      .searchResult-container {
      }
    }
    .van-search__action {
      color: #fff;
    }
  }
</style>
