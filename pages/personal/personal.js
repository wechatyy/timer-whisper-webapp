import { API_HOST, API_CUSTOM_LIST, API_USER_INFO } from '../../utils/config.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShowHelp:false,
    isShowFuc:false,
    isShowTd:false,
    layers:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  getUser(){ 
      let _this = this;
      wx.request({
        url: `${API_HOST}${API_USER_INFO}`,
        method: "GET",
        header: {
          token: wx.getStorageSync('token')
        },
        success: function success(res) {
          if (res.data.code == 0) {
            let { userId, username, gender, avatarUrl } = res.data.user
            _this.setData({
              userId,
              username, 
              gender,
              avatarUrl
            })
          } else {
           wx.navigateTo({
             url: '/pages/login/index'
           })
          }
        },
        fail: function fail() {
          wx.showToast({
            title: '失败',
            icon: 'none'
          })
        }
      });
    },
  onToolClick(){
    wx.navigateTo({
      url: '/pages/intimate/index',
    })
  },
  onVersionClick(){
    wx.navigateTo({
      url: '/pages/feedback/index',
    })
  },
  onOpenVip(){
    wx.navigateTo({
      url: '/pages/personal/openvip/index',
    })
  },
  onDevLop() {
    wx.navigateTo({
      url: '/pages/personal/devlop/index',
    })
  },
  onHelpClick(){
    this.setData({
      isShowHelp: true
    });
  },
  onHideHelp(){
    this.setData({
      isShowHelp: false,
      isShowFuc:true,
      layers: true
    });
  },
  onHideFc(){
    this.setData({
      isShowFuc: false,
      isShowTd: true,
      layers: true
    });
  },
  onHideTd(){
    this.setData({ 
      isShowTd: false,
      layers: false
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getUser()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})