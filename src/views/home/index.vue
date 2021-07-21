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
  <van-tabs v-model="active" class="channel-tabs">
    <van-tab
    :title="channel.name"
    v-for="channel in channels"
    :key="channel.id"
    >
      <!--      文章列表-->
    <article-list :channel="channel"/>
    </van-tab>
    <!-- 汉堡按钮的位置添加一个和他等宽的空白tab来占位，flex-shrink=0; -->
    <div slot="nav-right" class="wap-nav-placeholder"></div>
    <div
    slot="nav-right"
    @click="isChannelEditShow = true"
    class="wap-nav-wrap">
      <van-icon name="wap-nav" />
    </div>
    <!--    有api数据是一个for渲染就可以，这里是显示数据，要删掉-->
    <!-- <van-tab title="标签1">内容1</van-tab>
    <van-tab title="标签2">内容2</van-tab>
    <van-tab title="标签3">内容3</van-tab> -->
  </van-tabs>
  <van-popup
    v-model="isChannelEditShow"
    class="channel-edit-popup"
    close-icon="close"
    position="bottom"
    closeable
    close-icon-position='top-left'
    ：style='height: 100%'
  >
    <channel-edit
    :user-channels="channels"/>
  </van-popup>
</div>
</template>

<script>
import { getUserChannels } from '@/api/user'
import ArticleList from '@/components/home/article-list'
import ChannelEdit from '@/components/article/channel-edit'
export default {
  name: 'HomeIndex',
  components: { ArticleList, ChannelEdit },
  data () {
    return {
      active: 2, // 控制激活的标签
      channels: [], // 存储频道标签列表
      isChannelEditShow: false // 设置弹出层的显示状态
    }
  },
  methods: {
    async loadChannels () {
      const { data } = await getUserChannels()
      // console.log(data.data.channels)
      this.channels = data.data.channels
    }
  },
  created () {
    this.loadChannels()
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
  .channel-tabs{
   /deep/ .van-tab{
      border-right: 1px solid #edeff3;
      border-bottom: 1px solid #edeff3;
    }
    /deep/.van-tabs__line{
      bottom: 20px;
      height: 3px;
      background-color: #3296fa;
    }
  }
  .channel-edit-popup{
    height: 100%;
  }
  .wap-nav-placeholder{
    width: 33px;
    flex-shrink: 0;
  }
  .wap-nav-wrap{
    position:fixed;
    right: 0;
    width: 33px;
    height: 44px;
    // line-height: 44px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    opacity: 0.9;
    .van-icon{
      font-size: 30px
    }
  }
}
</style>
