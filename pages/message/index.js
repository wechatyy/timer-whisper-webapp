
import { API_HOST, API_QUERY_MESSAGE_LIST, API_UPLOAD_FILE,API_INSTER_MESSAGE} from '../../utils/config.js'
import {toast} from '../../utils/modal'
import { $wuxCalendar } from '../../components/wux/index'
let date = new Date();
let Year = date.getFullYear();
let Month = date.getMonth();
let Day = date.getDate();
let Hours = date.getHours();
let Minutes = date.getMinutes();
let weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
let displayTime = `${Year}-${Month + 1}-${Day}`
let timenav = `${Year}年${Month + 1}月${Day}日` 
let weeknew = weekDay[date.getDay()]
let timeHours = `${Hours}:${Minutes}`
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
    options:{},
    displayTime: displayTime,
    weekDayNew: weeknew,
    dateNew: timenav,
    timeHours: timeHours,
    isCurDate:false,
    bidisplayTime:'',
    ismessageModal:false
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
        friendID: this.data.options.friendID
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
          wx.navigateTo({
            url: '/pages/login/index',
          })
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
      let _this = this;
      console.log(this.data.inputValue)
      if (this.data.inputValue.trim().length !== 0) {
        this.setData({
          isShowModal: true,
          isInputEnter: true,
          isShowTextarea: false,
          isImageEnter:false,
          autoFocus: false,
        },()=>{
          console.log(2342342)
          _this.onMessageModal(true);
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
      console.log(e)
      this.setData({
        inputValue: e.detail.value.slice(0, 200)
      })
    }, 
    ontextareaViewClick() {
      console.log(1321)
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
      let _this = this;
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
                  console.log(123)
                  _this.setData({
                    isInputEnter: false,
                    isVoiceEnter: false, 
                    isImageEnter: true, 
                    isShowModal: true,
                    imageValue: urlArr
                  },()=>{
                    _this.isModalshow()
                  })
                }
              }
            })
          };
        }
      })
    },
  timed(timeStr) { 
    return  timeStr.slice(0, 4) + '年' + timeStr.slice(5, 7) + '月' + timeStr.slice(8, 10) + '日 ' 
},
  openCalendar(){
    console.log(this.data.displayTime)
    var weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    $wuxCalendar().open({
      value:'',
      minDate: this.data.displayTime,
      onChange: (values, displayValues) => {
        let newData = new Date(displayValues[0]).getDay()
        let weekDayNew = weekDay[newData]
        let dateNew = this.timed(displayValues[0])
        console.log('onChange', values, displayValues)
        this.setData({
          bidisplayTime: displayValues[0],
          weekDayNew: weekDayNew,
          dateNew: dateNew,
          isCurDate: true
        })
      },
    })
  },
  onCurrentDate(e){
    let val = e.detail
    this.setData({
      timeHours: val,
      isCurDate: false
    })
  },
  onCurrCel(){
    this.setData({
      isCurDate: false
    })
  },
  onSendMessage() {
    var _this = this; 
    var messageContent = "";
    var messageType = "";
    if (this.data.isInputEnter) {
      messageContent = this.data.inputValue;
      messageType = 1;
    } else if (this.data.isVoiceEnter) {
      messageContent = this.data.voiceValue;
      messageType = 2;
    } else {
      messageContent = this.data.imageValue.join(',');
      messageType = 3;
    }   
    var nowDate = new Date().getTime();
    var dataStr = `${_this.data.bidisplayTime ? _this.data.bidisplayTime:displayTime} ${timeHours}`;
    var selectDate = new Date(dataStr).getTime();
    console.log(nowDate, selectDate, dataStr);
    console.log(nowDate <= selectDate);
    if (selectDate <= nowDate) {
      wx.showToast({
        title: '请勿选择之前的时间',
        icon: 'none'
      })
      return false;
    }
    wx.request({
      url: `${API_HOST}${API_INSTER_MESSAGE}`,
      method: "POST",
      header: {
        token:wx.getStorageSync('token')
      },
      data: {
        friendID: this.data.options.friendID,
        friendName: this.data.options.friendName,
        imgUrl: this.data.options.imgUrl,
        sex: this.data.options.sex,
        messageContent: messageContent,
        messageType: messageType,
        voiceTime: this.data.duration / 1000,
        planTime: selectDate
      },
      success: function success(res) {
        
        if (res.data.code == 0) {
          wx.showToast({
            title: '发送成功',
          })
          _this.onMessageModal(false)
        } else {
          wx.navigateTo({
            url: '/pages/login/index',
          })
          // _this5.props.onCancel(true);
        }
      },
      fail: function fail() {
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
        this.onMessageModal(false)
      },
      complete:(com)=>{
        console.log()
      }
    });
    // this.props.onCancel();
  },
  onMessageModal(is){
    this.setData({
      ismessageModal:is
    })
  },
  isModalshow() {
    this.setData({
      ismessageModal: true
    })
  },
  isModalhide() {
    this.setData({
      ismessageModal: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options); 
    this.setData({
      options,
      userId: wx.getStorageSync('userId')
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