<template>
    <div class="channel-edit">
      <van-cell :border="false">
          <div slot="title" class="channel-item">我的频道</div>
          <van-button
          type='danger'
          plain
          round
          size='mini'
          >编辑</van-button>
      </van-cell>
      <van-grid  :column-num="4" :gutter="10">
        <van-grid-item
        class="grid-item"
        v-for="(channel,id) in userChannels"
        :key="id"
        :text="channel.name" />
      </van-grid>
      <van-cell center :border="false">
        <div slot="title" class="channel-item">编辑频道</div>
      </van-cell>
      <van-grid :column-num="4" :gutter="10">
        <van-grid-item
          class="grid-item"
          v-for="(channel,index) in recommendChannels"
          :key="index"
          :text="channel.name"/>
      </van-grid>
    </div>
</template>

<script>
import { getAllChannels } from '@/api/channel'

export default {
  name: 'ChannelEdit',
  data () {
    return {
      allChannels: [] // 所有频道列表数据
    }
  },
  props: {
    userChannels: {
      type: Array,
      required: true
    }
  },
  created () {
    this.loadAllChannel()
  },
  computed: {
    // 计算属性会根据内部依赖的变化而从新求值
    // 思路：所有频道 -我的频道 =剩下的推荐频道
    // 推荐频道列表
    recommendChannels () {
      // filter方发，过滤数据，根据返回的布尔值 true来收集数据
      return this.allChannels.filter(channel => {
        // 判断channel是否属于用户频道
        // find方发查找满足条件的单个元素
        // filter 返回为true的数组,find返回满足条件的元素
        return !this.userChannels.find(userChannel => {
          // 找到满足该条件的元素
          return userChannel.id === channel.id
        })
      })

      // // 可以使用遍历数组的方法来做,会比较不整洁
      // const arr = []
      // // 遍历所有频道
      // this.allChannels.forEach(channel => {
      //   let flag = false
      //   for (let i = 0; i < this.userChannels.length; i++) {
      //     if (this.userChannels[i].id !== channel.id) {
      //       // 所有频道中的频道项属于用户频道
      //       flag = true
      //       break
      //     }
      //   }
      //   if (!flag) {
      //     arr.push(channel)
      //   }
      // })
      // return arr
    }
  },
  methods: {
    async loadAllChannel () {
      const { data } = await getAllChannels()
      this.allChannels = data.data.channels
      console.log(data)
    },
    onAdd (channel) {
      this.userChannels.push(channel)
      // 数据持久化
      // todo
    }
  }
}
</script>

<style lang="less" scoped>
.channel-edit{
    padding-top: 56px;
    .channel-item{
        font-size: 18px;
        color: #333333;
    }
    .grid-item{
        width: 80px;
        height: 43px;
       /deep/.van-grid-item__content{
           background-color: #f4f5f6;
           .van-grid-item__text{
               font-size: 14px;
               color: #222;
           }
       }
    }
}
</style>
