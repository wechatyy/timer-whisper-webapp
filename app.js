
require("./utils/runtime"); // 兼容 async await
require("./utils/wxPromiseApi"); // wx api 处理
App({
  onLaunch: function () {

  },
  globalData: {
    userInfo: null
  }
})