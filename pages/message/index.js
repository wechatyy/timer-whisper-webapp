
import { API_HOST, API_QUERY_MESSAGE_LIST,API_UPLOAD_FILE} from '../../utils/config.js'
import {toast} from '../../utils/modal'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    paddingTop: 0,
    systeminfo: {},
    tabBarHeight: 0,
    isFocus: false,
    bottomStyle: 0,
    isVoice: false,
    textareaHeight: 60,
    isChoose: false,
    isShowModal: false,
    inputValue: '',
    voiceValue: '',
    imageValue: [],
    isInputEnter: false, // 是否是文字
    isVoiceEnter: false, // 是否是音频
    isImageEnter: false, // 是否是图片
    is_clock: false,
    recorderManager: null,
    startPoint: 0,
    voiceMsgVal: '说出悄悄话',
    autoFocus: false,
    isShowTextarea: false, 
    messageList: [],
    userId: "",
    // noticeNumberData: {
    //   messageCount: 0,
    //   messageNumCount: 0
    // },
    duration: 0,
    insertFriendID: 0,
    insertImgUrl: "",
    isPlayVoice: false,
    insertName: "",
    firendName: "",
    isShowVoiceA: false,
    nowImage: "",
    length: 0,
    options:{}
  },
  ontextareaViewClick () {
    this.setData({
      isShowTextarea: true,
      autoFocus: true
    });
  },
  queryMessageList() {
    wx.request({
      url: `${API_HOST}${API_QUERY_MESSAGE_LIST}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendID: this.data.options.friendid
      },
      success: res => {
        console.log(res);
        if (res.data.code == 0) {
          this.setData({
            messageList: res.data.data,
          })
          setTimeout(() => {
            this.setData({
              length: res.data.data.length - 1
            })
          }, 200)
        } else {
          toast(res.data.msg)
        }
      },
      fail: () => {
        toast("或取消息失败")
      }
    })
  },
  onPlayVoice(e) {
    console.log(e);
    let item = e.currentTarget.dataset.item
    let self =this
    this.setData({
      isPlayVoice: true,
      inputValue: ""
    })
    const innerAudioContext = wx.createInnerAudioContext()
    innerAudioContext.src = item.messagecontent;
    innerAudioContext.play();
    innerAudioContext.onStop(res => {
      console.log(res)
      this.setData({
        isPlayVoice: false,
      })
    })
  },
  onImageClick(item) {
    // wx.navigateTo({
    //   url: `/pages/friendInformation/index?id=${item.id}&friendid=${item.friendid}&imgurl=${item.imgurl}&friendname=${item.friendname}&sex=${item.sex}&istop=${item.istop}&isreject=${item.isreject}&intimate=${item.intimate}&intimateid=${item.intimateid}`
    // })
  },
  onSwitchModel() {
    this.setData({
      isVoice: !this.data.isVoice,
      inputValue: '',
      isChoose: false
    });
    if (this.data.isVoice) {
      this.setData({
        autoFocus: true,
        isShowTextarea: true
      })
    }
  },
    // input聚焦时触发
    openKeyboard(e) {
      setTimeout(() => {
        const isFocus = true
        const bottomStyle = e.target.height + 'px'  //软键盘的高度
        this.setData({
          bottomStyle,
          isFocus,
          isChoose: false,
        })
      }, 1)
    },
    //输入框失去焦点时触发
    outKeyboard() {
      const commentContent = this.data.commentContent
      this.setData({
        isFocus: false,
        bottomStyle: commentContent ? '0' : '-80rpx',
        isShowTextarea: false,
        autoFocus: false,
        textareaHeight: 60
      })
    },
    onLineChange(e) {
      this.setData({
        textareaHeight: e.detail.height < 60 ? 60 : e.detail.height + 18
      })
    },
    onConfirm() {
      if (this.data.inputValue.trim().length !== 0) {
        this.setData({
          isShowModal: true,
          isInputEnter: true,
          isShowTextarea: false,
          autoFocus: false,
        })
      }
    },
  
    onCancel(flag) {
      this.setData({
        isShowModal: false,
        isInputEnter: false,
        isVoiceEnter: false,
        isImageEnter: false,
        inputValue: '',
        voiceValue: '',
        imageValue: [],
      })
      if (flag) {
        this.queryMessageList();
      }
    },
    onInput(e) {
      this.setData({
        inputValue: e.detail.value.slice(0, 200)
      })
    },
    ontextareaViewClick() {
      this.setData({
        isShowTextarea: true,
        autoFocus: true,
      })
    },
    onShowImage() {
      this.setData({
        isChoose: !this.data.isChoose
      })
    },
    onImageToolClick(e) {
      let flag =e.currentTarget.dataset.flag
      wx.chooseImage({
        sourceType: [flag],
        success: res => {
          let successNum = 0;
          // tempFilePath可以作为img标签的src属性显示图片
          const tempFilePaths = res.tempFilePaths;
          const urlArr = [];
          for (var index in tempFilePaths) {
            wx.uploadFile({
              url: `${API_HOST}${API_UPLOAD_FILE}`,
              filePath: tempFilePaths[index],
              name: 'file',
              header: {
                token: wx.getStorageSync('token')
              },
              success: uploadRes => {
                successNum++;
                if (JSON.parse(uploadRes.data).code === 0) {
                  const url = JSON.parse(uploadRes.data).url
                  urlArr.push(`${API_HOST.replace('api', '')}/${url}`)
                }
              },
              complete: () => {
                if (successNum === tempFilePaths.length) {
                  this.setData({
                    isImageEnter: true,
                    isShowModal: true,
                    imageValue: urlArr
                  })
                }
              }
            })
          };
        }
      })
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      options,
      userId: wx.getStorageSync('userId'),
      friendID: options.friendid,
      firendName: options.name,
      nowImage: options.nowImage
    })

    this.queryMessageList()

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