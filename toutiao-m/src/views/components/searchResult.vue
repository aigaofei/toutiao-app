<template>
<!-- 最外层标签是上拉加载更多 -->
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    class="searchResult-container"
    :error.sync="error"
    error-text="请求失败，点击重新加载"
    @load="onLoad"
  >
    <van-cell is-link to="index">
      <!-- 使用 title 插槽来自定义标题 -->
      <template #title>
        <span class="custom-title">宝贵的青春。。。。。</span>
      </template>
    </van-cell>
    <van-cell v-for="item in this.resultDataInfo"
    :key="item.art_id"
    :title="item.title"
    @click="toThisGlobal(item.results)"
    />
  </van-list>
</template>

<script>
import { getSearchResult } from '@/api/search.js'
export default {
  name: 'searchResult',
  components: {},
  props: {
    searchData: {
      type: String,
      required: true
    }
  },
  watch: {},
  computed: {},
  data () {
    return {
      loading: false, // 这里表示默认是开启请求的 --true为结束
      finished: false,
      error: false,
      dataRefresh: {
        page: 1,
        per_page: 11,
        q: this.searchData
      },
      resultDataInfo: [] // 这是搜索结果数据
    }
  },
  created () {},
  mounted () {},
  methods: {
    onLoad () {
      // 异步更新数据
      this.loadResult(this.dataRefresh)
    },
    async loadResult (info) {
      try {
        const { data: resultData } = await getSearchResult(info)
        console.log(resultData.data)
        // 数据全部加载完成
        // console.log(resultData.data.results) 正常
        this.resultDataInfo.push(...resultData.data.results)
        // console.log(this.resultDataInfo) 正常
        const count = info.page * info.per_page
        console.log(count)
        if (count >= resultData.data.total_count) {
          this.finished = true
          return false
        }
        info.page += 1
        // 加载状态结束
        this.loading = false
        return false
      } catch (err) {
        console.log(err)
        if (err.response.status === 400) {
          console.log('参数错误....')
        }
        this.$toast('获取数据失败....气死你吗？')
        // 加载失败，关闭loading 并 打开错误提示
        this.error = true
        this.loading = false
        return false
      }
    },
    toThisGlobal (itemData) {
      console.log('去到目标页面' + itemData)
    }
  }
}
</script>

<style lang="less" scoped>
.searchResult-container {
  margin-top: 0.33333rem;
  .custom-title {
      margin-right: 4px;
      vertical-align: middle;
  }
}
</style>
