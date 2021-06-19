<template>
<div class="my-container">
  <!-- 登录状态下的显示 -->
 <van-cell-group v-if="user" class="my-info">
  <van-cell  center class="base-info"  :border="false">
    <van-image
      class="avator"
      slot="icon"
      round
      fit="cover"
      src="https://img01.yzcdn.cn/vant/cat.jpeg"
    />
    <div slot="title" class="name">昵称</div>
    <van-button
    round
    slot="right-icon"
    size="small"
    class="updata-btn"
    >编辑信息</van-button>
  </van-cell>
  <van-grid class="data-info " :border="false">
    <van-grid-item class="data-info-item">
      <div class="text-wrap" slot="text">
        <div class="count">123</div>
        <div class="text">头条</div>
      </div>
    </van-grid-item >
    <van-grid-item class="data-info-item">
      <div class="text-wrap" slot="text">
        <div class="count">123</div>
        <div class="text">关注</div>
      </div>
    </van-grid-item >
    <van-grid-item class="data-info-item">
      <div class="text-wrap" slot="text">
        <div class="count">123</div>
        <div class="text">粉丝</div>
      </div>
    </van-grid-item>
    <van-grid-item class="data-info-item" >
      <div class="text-wrap" slot="text">
        <div class="count">123</div>
        <div class="text">获赞</div>
      </div>
    </van-grid-item>
  </van-grid>
</van-cell-group>
<!-- 未登录状态的显示 -->
<div v-else class="not-login">
    <div @click="$router.push('/login')">
      <img class="mobile" src="../../assets/logo.png" alt="">
    </div>
    <div class="text">登录 / 注册</div>
</div>

<van-grid class="nav-grid" :column-num="2">
  <van-grid-item class="nav-grid-item" icon="star-o" text="收藏" />
  <van-grid-item class="nav-grid-item mb-4" icon="browsing-history-o" text="历史" />
</van-grid>
<van-cell-group>
  <van-cell title="消息通知" is-link to="/" />
  <van-cell class="mb-4" title="小智同学" is-link to="/" />
</van-cell-group>
<van-cell
  v-if="user"
  class="logout-cell"
  title="退出登录"
  @click="onLogout"
  to="login"/>

</div>
</template>

<script>
import { mapState } from 'vuex'
import { getCurrentUser } from '@/api/user'
export default {
  name: 'MyIndex',
  data () {
    return {
      currentUser: {} // 当前登录用户信息
    }
  },
  methods: {
    onLogout () {
      // 提示用户确认退出
      // 确认->处理退出
      this.$dialog.confirm({
        title: '退出提示',
        message: '确认退出吗'
      })
        .then(() => {
          // on confirm确认执行这里
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel退出执行这里
        })
    },
    async loadCurrentUser () {
      const { data } = await getCurrentUser()
      // console.log(data)
      this.currentUser = data.data
    }
  },
  created () {
    this.loadCurrentUser()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped lang='less'>
.my-container {
  background-color: #f5f5f5;
  .my-info {
    background:url('../../assets/bj.jpg') no-repeat;
    background-size: cover;
    .base-info{
      background-color: unset;
      padding-top: 30px;
      padding-bottom: 12px;
      .avator{
        box-sizing: border-box;
        width: 66px;
        height: 66px;
        border: 1px solid #fff;
      }
      .name{
        color: #fff;
        font-size: 16px;
        margin-left: 10px;
      }
      .updata-btn{
        height: 20px;
        color: #666666
      }
    }
    .data-info{
      .van-grid-item{
        height: 65px;
        color: #fff;
        .text-wrap{
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          .count{
            font-size: 22px;
          }
          .text{
            font-size: 15px;
          }
        }
      }
    }
    /deep/ .van-grid-item__content{
      background-color: unset
    }
  }
  .not-login {
    height: 180px;
    background:url('../../assets/bj.jpg') no-repeat;
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .mobile{
      width: 66px;
      height: 66px;
      border-radius: 50%;
      box-sizing: border-box;
      border: 2px solid #fff;
      background-color: #fff
    }
    .text{
      font-size: 14px;
      color: #fff;
    }
  }
  /deep/ .nav-grid{
    .van-grid-item{
      height: 70px;
      .van-icon{
        font-size: 24px;
      }
      .van-icon-star-o{
        color: #eb5253
      }
      .van-icon-browsing-history-o{
        color: #eb5253;
      }
    }
  }
  .logout-cell{
    text-align: center;
    color:  #d86262;
    font-size: 20px;
  }
  .mb-4{
    margin-bottom: 4px;
  }
}
</style>
