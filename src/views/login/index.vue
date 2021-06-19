<template>
<div class="login-container">
  <van-nav-bar
    class="app-nav-bar"
    title="登录页面"
    left-arrow
    @click-left="$router.back()"
  />
  <!-- 使用vant的表单登录表单验证 -->
  <!--1、 用van-form 组件在外层包裹表单项 van-field，
  2、绑定sumbmit事件
  3、使用field的rules属性定义校验规则-->
  <van-form
    @submit="onLogin"
    :show-error="false"
    :show-error-message="false"
    @failed="onFailed"
    validata-first
    ref="login-form"
    >
    <!--  输入框-->
    <van-field
      v-model="user.mobile"
      left-icon="smile-o"
      placeholder="请输入手机号"
      name="mobile"
      :rules="formRules.mobile"
    />
    <van-field
      v-model="user.code"
      clearable
      icon-prefix="iconfont"
      left-icon="icon-shouji"
      placeholder="请输入验证码"
      name="code"
      :rules="formRules.code"
    >
      <template #button>
        <van-count-down
        :time="1000*60"
        format=" ss s"
        v-if="isCountDownShow"
        @finish="isCountDownShow = false"
        />
        <van-button
        v-else
        size="small"
        type="info"
        :loading="isSendSmsLoading"
        @click.prevent="onSendSms"
        >发送验证码</van-button>
      </template>
    </van-field>
    <!--  登录按钮-->
    <div class="login-btn-wrap">
      <van-button
        class="login-btn"
        type="info"
        block
      >登录</van-button>
    </div>
  </van-form>
</div>
</template>

<script>
import { login, sendSms } from '@/api/user'
import { Toast } from 'vant'

export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111', // 手机号
        code: '246810' // 验证码
      },
      isCountDownShow: false, // 控制倒计时按钮和发送按钮的显示状态
      isSendSmsLoading: false, // 发送验证码按钮的loading状态
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '手机号码格式错误' }
        ],
        code: [
          { required: true, message: '请输入验证码' },
          { pattern: /^\d{6}$/, message: '验证码格式错误' }
        ]
      }
    }
  },
  methods: {
    async onLogin () {
      Toast.loading({
        message: '登录中...',
        forbidClick: true, // 禁止背景点击
        duration: 0 // 持续时间
      })
      // 1、找到数据接口
      // 2、封装请求方法
      // 3、请求验证登录
      try {
        const res = await login(this.user)
        console.log(res)
        Toast.success('登录成功')
        // 将后端返回的用户登录状态（token等数据)放到Vuex容器中
        this.$store.commit('setUser', res.data.data)

        // 登录成功，跳转为原来的页面
        this.$router.back() // 先用，有更好的方法
      } catch (err) {
        console.log('登录失败', err)
        Toast.fail('登录失败!')
      }
      // 4、处理响应结果
    },
    onFailed (error) {
      if (error.errors[0]) {
        this.$toast({
          message: error.errors[0].message,
          position: 'top' // 防止手机键盘挡住提示消息
        })
      }
    },
    async onSendSms () {
      try {
        // 1、校验手机号码
        await this.$refs['login-form'].validata('mobile')
        // 验证通过，请求发送验证码
        this.isSendSmsLoading = true // 展示按钮的loading状态，防止网络慢用户多次点击触发发送行为
        const res = await sendSms(this.user.mobile)
        console.log(res)

        // 请求发送验证码->隐藏发送按钮、显示倒计时
        this.isCountDownShow = true
      } catch (err) {
        // try里面任代码错误都会进入catch
        // 不同错误需要不同的提示，那就需要判断
        let message = ''
        if (err && err.response && err.response.status === 429) {
          // 发送短信失败的错误提示
          message = '发送太频繁了，请稍后重试'
        } else if (err.name === 'mobile') {
          // 表单验证失败的错误提示
          message = err.message
        } else {
          // 未知的错误
          message = '发送失败，请稍后重试'
        }
        // 吐司提示框提示用户
        this.$toast({
          message,
          position: 'top'
        })
      }
      // 无论发送验证码成功还是失败，最后都有关闭发送按钮的loading状态
      this.isSendSmsLoading = false
      // this.$refs['login-form'].validata('mobile').then(
      //   data => {
      //     console.log(data);
      //   }
      // )
      // 1、验证手机号码
      // 2、验证通过、请求发送验证码->用户接收短信-输入验证码-请求登录
      // 3、请求发送验证码->隐藏发送按钮、显示倒计时
      // 4、倒计时结束-隐藏倒计时-显示发送按钮
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
  .login-btn-wrap {
    padding: 26px 16px;
  }
  .login-btn {
    background-color: cornflowerblue;
    border: none;
    .van-button__text {
      font-size: 18px;
    }
  }
}
</style>
