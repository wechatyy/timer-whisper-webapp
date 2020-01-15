import { API_HOST, API_QUERY_UN_SEND_LIST } from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    messageList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  //查询未送达消息
  queryUnSendList(){
    wx.request({
      url: `${API_HOST}${API_QUERY_UN_SEND_LIST}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      success: res => {
        let messageList = res.data.data;
        console.log(messageList)
        messageList.map((item,index)=>{
          if (item.messagetype == 4) {
            let strmesg = item.messagecontent.split(',')
            item.messagestr = strmesg[0]
            item.messagecontent = strmesg.slice(1)

          }

          item.plantime = this.timestampToTime(item.plantime)
          item.state_temp4 = item.messagetype === 2 ? "/assets/images/common/voice-right.png" : null;
        }) 
        this.setData({
          messageList: messageList
        })
      }
    })
  },
timestampToTime(timestamp){
    var date = new Date(timestamp);
   let Y = date.getFullYear() + '年';
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '月';
  let D = date.getDate() + '日';
  let  h = date.getHours() + ':';
  let  m = date.getMinutes() + ':';
  let  s = date.getSeconds();
    return "将于" + Y + M + D +" "+ h + m + "送达消息" ;//时分秒可以根据自己的需求加上

  },
  //处理时间
  timed(time) {
    var timeStr = time + '';
    return timeStr.slice(0, 4) + '年' + timeStr.slice(4, 6) + '月' + timeStr.slice(6, 8) + '日 ' + timeStr.slice(8, 10) + ':' + timeStr.slice(10, 12);
  },
  onPlayVoice(e){ 
      let item = e.currentTarget.dataset.item
      let self = this
      const innerAudioContext = wx.createInnerAudioContext()
      innerAudioContext.src = item.messagecontent;
      innerAudioContext.play();
      innerAudioContext.onStop(res => {
        console.log(res)
      })
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
    this.queryUnSendList()
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