<template>
<div class="layout-container">
<!--  子路由出口-->

<router-view/>
<!--  底部导航栏-->
  <h1>layout页面</h1>
  <van-tabbar v-model="active" route>
    <van-tabbar-item to="/" icon="wap-home">首页</van-tabbar-item>
    <van-tabbar-item to="/qa" icon="chat">问答</van-tabbar-item>
    <van-tabbar-item to="/video"  icon="video">视频</van-tabbar-item>
    <van-tabbar-item to="/my" icon="manager">我的</van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {
      active: 0
    }
  }
}
</script>

<style scoped>

</style>
