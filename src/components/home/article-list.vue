<template>
<div class="article-list">
  文章列表
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="item in list" :key="item" :title="item" />
  </van-list>
</div>
</template>

<script>
export default {
  name: 'Article-List',
  data () {
    return {
      list: [], // 数据列表
      loading: false, // 控制加载宏的loading状态
      finished: false // 控制建筑结束的状态，当加载结束就显示没有更多
    }
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  methods: {
    onLoad () {
      // 1、请求加载数据
      // 2、 把数据放到list数组中
      // 3、上设置本次加载结束，它才可以判断是否加载下一次，否则会停在这里
      // 4、数据全部加载完成
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      // 1、请求加载数据
      setTimeout(() => {
        // 2、 把数据放到list数组中
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1)
        }
        // 加载状态结束
        // 3、上设置本次加载结束，它才可以判断是否加载下一次，否则会停在这里
        this.loading = false

        // 4、数据全部加载完成
        if (this.list.length >= 40) {
          // 全部完成后，不再触发加载更多
          this.finished = true
        }
      }, 1000)
    }
  }
}
</script>

<style scoped lang="less">
.article-list{
  position: fixed;
  left: 0;
  right: 0px;
  bottom: 50px;
  top: 90px;
  overflow-y: auto;
}
</style>
