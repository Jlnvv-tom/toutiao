/**
 * postcss的配置文件
 * postcss 基于Node.js运行的一个处理css的 工具
 * 所以它的配置文件也是运行在node.js中
 */
// postcss配置文件需要导出一个对象

module.exports = {
  // 配置要使用的相关插件
  plugins: {
    // 自动添加浏览器厂商声明前缀，用来兼容不同的浏览器
    // Vuecli 已经在内部首部默认配置了autoprefixer
    // 现在vuecli通过项目中的.browserslistrc 文件来配置要兼容的环境信息
    // autoprefixer: {
    //   browser: ['Android >=4.0','IOS >=8']
    // },
    'postcss-pxtorem': {
      rootValue: 37.5,
      // 需要转换的css属性， *就是所有属性都有转换
      propList: ['*']
    }
  }
}
