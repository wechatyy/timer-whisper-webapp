// pages/editMesg/index.js
import { API_HOST, API_FEEDBACK_ADDFEED, API_UPLOAD_FILE } from '../../utils/config.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    strInput:'',
    fileList:[],
    isDone:false,
    feedbackimg: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  contionsInout(e){
    console.log(e)
    let _this = this;
    let val = e.detail.value
    _this.setData({
      strInput:val
    },()=>{
      if (_this.data.strInput == '' && _this.data.feedbackimg.length == 0){
        _this.setData({
          isDone: false
        })
      }else{
        _this.setData({
          isDone: true
        })
      }
    })
  },
  afterRead(event) {
    let _this = this
    const { file } = event.detail;
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    console.log(file)
    wx.uploadFile({
      url: `${API_HOST}${API_UPLOAD_FILE}`, // 仅为示例，非真实的接口地址
      filePath: file.path,
      name: 'file',
      header: {
        token: wx.getStorageSync('token')
      },
      success(res) {
        let data = JSON.parse(res.data)
        const { feedbackimg = [], fileList = [] } = _this.data;
        feedbackimg.push(`${API_HOST.replace('api', '')}${data.url}`);
        _this.setData({
          feedbackimg,
          isDone: true
        });
      },
      complete(){ 
      }
    });
  },
  //删除图片
  delImgs(e) {
    console.log(e)
    let _this = this;
    _this.data.feedbackimg.splice(e.detail.index, 1)
    _this.setData({
      feedbackimg: _this.data.feedbackimg, 
    },()=>{
      if (_this.data.strInput == '' && _this.data.feedbackimg.length == 0){
        _this.setData({
          isDone: false
        })
      }else{
        _this.setData({
          isDone: true
        })
      }
    }) 
  },
  onDoen(){
    let _this = this;
    var pages = getCurrentPages();
    var prevPage = pages[pages.length -2];
    if(_this.data.isDone){
      prevPage.setData({
        msg4_input: _this.data.strInput,
        msg4_imgs: _this.data.feedbackimg,
        ismessageModal:true,
        isMsg4Enter:true,
        isInputEnter: false, // 是否是文字
        isVoiceEnter: false, // 是否是音频
        isImageEnter: false, // 是否是图片 
      },()=>{
        wx.navigateBack({
          delta: 1
        })
      })
    }else{

    }
  },
  //取消
  oncloes(){
    wx.navigateBack({
      delta:1
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