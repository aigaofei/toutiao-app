<template>
  <div class="searchSuggest-container">
    {{searchData}}
    <div>这里不出效果--报错，是后台问题</div>
    <van-cell v-for="(item, index) in this.searchAllData"
    :key=index icon="search"
    @click="onSearch(item)"
    >
      <div slot="title" v-html="youHua(item)"></div>
      <!-- <div slot="title" v-html="item"></div> -->
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestion } from '@/api/search.js'
// 只会将用的打包到结果项目，不会打包全部
// import { debounce } from 'lodash'
export default {
  name: 'searchSuggest',
  components: {},
  props: {
    searchData: {
      type: String,
      required: true
    }
  },
  watch: {
    // 深度监听并且组件一加载就立刻执行一次
    // 普通监听不能深度监听和 不能立即执行
    searchData: {
      // deep: true,
      handler (newVal) {
        console.log(newVal)
      },
      // 使用lodash制作联想建议时防抖【节流】
      // handler: debounce(function (newVal) {
      //   this.loadSearchSuggestion(newVal)
      // }, 300),
      immediate: true
    }
  },
  computed: {},
  data () {
    return {
      searchText: '冬天凉爽',
      searchAllData: []
      // youHuaItem
    }
  },
  created () {},
  mounted () {},
  methods: {
    async  loadSearchSuggestion (newVal) {
      try {
        const { data } = await getSearchSuggestion(newVal)
        console.log(data)
        this.searchAllData = data.data.options
        this.$toast('搜索数据正在获取...')
      } catch (err) {
        if (err.response.status === 507) {
          this.$toast('数据库数据未知，稍后再试...')
        }
        console.log(err)
      }
    },
    youHua (item) {
      // console.log(item)
      // const newSearchAllData = []
      // console.log(this.searchData)  这里正常
      const regExp = new RegExp(this.searchData, 'gi')
      console.log(regExp) // 这里正常
      const global = `<span style="color:red;">${this.searchData}</span>`
      console.log(global) // 这里正常
      // this.searchAllData.forEach(item => {
      //   const newSuggest = this.searchAllData.find(itemInfo => {
      //     return itemInfo.includes(this.searchData)
      //   })
      //   console.log(newSuggest)
      // })
      // console.log(this.searchAllData)
      // console.log(newSearchAllData)
      // 这里问题出在有更多目标元素时，搜索结果不能自动更精确匹配
      // 只能显示最初第一次的全部请求，所以item为空是仍要替换就会报错
      return item.replace(regExp, global)
    },
    onSearch (data) {
      this.$emit('searchSubmit', data)
      console.log(data)
    }
  }
}
</script>

<style lang="less" scoped>
.searchSuggest-container {
  .delete-o,.cross-o {
      font-size: 16px;
      line-height: inherit;
    }
  .searchSpan {
    span {
      margin-right: 5px;
      font-size: 18px;
    }
  }
}
</style>
