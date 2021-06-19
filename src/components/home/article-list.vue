<template>
<div class="article-list">
  <van-pull-refresh
    v-model="isRefreshLoading"
    :success-text="refreshSuccessText"
    :success-duration="1500"
    @refresh="onRefresh">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <article-item
        v-for="(article, index) in articles"
        :key="index"
        :article="article"
      />
      <!-- <van-cell
      v-for="(article, index) in articles"
      :key="index"
      :title="article.title" /> -->
    </van-list>
  </van-pull-refresh>
</div>
</template>

<script>
import { getArticles } from '@/api/article'
import ArticleItem from '@/components/article/article-item'

export default {
  name: 'Article-List',
  components: { ArticleItem },
  data () {
    return {
      articles: [], // 数据列表
      loading: false, // 控制加载宏的loading状态
      finished: false, // 控制建筑结束的状态，当加载结束就显示没有更多
      timestamp: null, // 获取下一页数据的时间戳
      isRefreshLoading: false, // 下拉刷新的loading状态
      refreshSuccessText: '' // 下拉刷新成功的提示文本

    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    async onLoad () {
      // 1、请求加载数据
      const { data } = await getArticles({
        channel_id: this.channel.id, // 频道ID
        timestamp: this.timestamp || Date.now(), // 时间戳
        with_top: 1 // 是否包含置顶，1-包，0-不包
      })
      // 2、 把数据放到articles数组中
      const { results } = data.data
      this.articles.push(...results)
      console.log(results)
      // this.articles.push(...data.data.results)
      // 3、上设置本次加载结束，它才可以判断是否加载下一次，否则会停在这里
      this.loading = false
      // 4、数据全部加载完成
      // 如果还有数据更新获取更多，
      if (results.length) {
        this.timestamp = data.data.pre_timestamp
      } else {
        // 没有数据了，把加载状态设置结束，不再句法加载更多
        this.finished = true
      }
    },
    async onRefresh () {
      // 下拉刷新，组件自己就会踢死loading状态
      // 1、请求获取数据
      const { data } = await getArticles({
        channel_id: this.channel_id, // 频道ID
        timestamp: Date.now(), // 不同时间戳给给不同数据，且数据不为空
        with_top: 1
      })

      // 2、把数据放到数据列表中，--往顶部追加
      // this.articles.unshift(...data.data.results)
      const { results } = data.data
      this.articles.unshift(...results)

      // 3、关闭刷新状态loading
      this.isRefreshLoading = false
      // 更新提示更新了多少数据
      this.refreshSuccessText = `更新了${results.length}条数据`
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  position: fixed;
  left: 0;
  right: 0px;
  top: 90px;
  bottom: 50px;
  overflow-y: auto;
}
</style>
