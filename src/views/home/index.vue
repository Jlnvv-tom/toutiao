<template>
<div class="home-container">
  <!-- 导航栏 -->
  <van-nav-bar class="app-nav-bar">
    <van-button
    class="search-btn"
    icon="search"
    slot="title"
    type="info"
    round
    >搜索</van-button>
  </van-nav-bar>
  <!-- 文章频道列表 -->
<!--  标签页组件有一个功能，只要第一次查看标签页的时候才会渲染里面的内容-->
  <van-tabs v-model="active">
    <van-tab
    :title="channel.name"
    v-for="channel in channels"
    :key="channel.id"
    >
<!--      文章列表-->
      <article-list :channel="channel"/>
    </van-tab>
<!--    有api数据是一个for渲染就可以，这里是显示数据，要删掉-->
    <van-tab title="标签1">内容1</van-tab>
    <van-tab title="标签2">内容2</van-tab>
    <van-tab title="标签3">内容3</van-tab>
  </van-tabs>
  <h1>首页页面</h1>
</div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/components/home/article-list'
export default {
  name: 'HomeIndex',
  components: { ArticleList },
  data () {
    return {
      active: 2, // 控制激活的标签
      channels: [] // 存储频道标签列表
    }
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      console.log(data)
    }
  },
  created () {
    this.getUserChannels()
  }
}
</script>

<style scoped  lang="less">
.home-container {
  /deep/.van-nav-bar__title {
    max-width: none;
  }
  .search-btn {
    width: 277px;
    height: 32px;
    background: #5babfb;
    .van-icon {
      font-size: 16px;
    }
    .van-button__text {
      font-size: 14px;
    }
  }
}
</style>
