
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
let timeHours = `${Hours}:${Minutes}:00`
var recorderManager = wx.getRecorderManager();
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
  formatDate(time) {
    let now = new Date(time)
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    return year + "-" + month + "-" + date + " " + hour + ":" + minute;
  } ,
  queryMessageList() {
    let _this = this
    wx.request({
      url: `${API_HOST}${API_QUERY_MESSAGE_LIST}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendID: this.data.options.friendID
        // friendID: 6

      },
      success: res => {
        if (res.data.code == 0) {
          res.data.data.forEach((item,index)=>{
            item.plantime = _this.formatDate(item.plantime)
            if (item.messagetype == 3 ){
              item.messagecontent = item.messagecontent.split(',')
            }
          })
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
  playVoice(){
    let _this = this; 
    this.setData({
      isPlayVoice: true
    }); 
    console.log(123) 
    const InnerAudioContext = wx.createInnerAudioContext()
    InnerAudioContext.src = this.data.voiceValue;
    InnerAudioContext.play();
    InnerAudioContext.onEnded(function () {
      _this.setData({
        isPlayVoice: false
      });
    });

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
      let _this = this
      setTimeout(function () {
        // var isFocus = true;
       // var bottomStyle = e.target.height + 'px'; //软键盘的高度
        _this.setData({
         // bottomStyle: bottomStyle,
          // isFocus: isFocus,
          isChoose: false
        });
      }, 1);
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
    console.log(e);
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
    var dataStr = `${_this.data.bidisplayTime ? _this.data.bidisplayTime:_this.dta.displayTime} ${_this.data.timeHours}:00`;
    console.log(displayTime,timeHours);
    console.log(dataStr);
    var selectDate = new Date(dataStr.replace(/-/g, '/')).getTime();
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
        voiceTime: this.data.duration,
        planTime: selectDate
      },
      success: function success(res) {
        
        if (res.data.code == 0) {
          wx.showToast({
            title: '发送成功',
          })
          _this.onMessageModal(false)
          _this.queryMessageList()
          _this.setData({
            inputValue:''
          })
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
  handleRecordStart(e) {
    console.log(e)
    this.setData({
      startPoint: e.touches[0],
      touchStart: e.timeStamp,
      voiceMsgVal: '松开 结束',
      isShowVoiceA: true,
      is_clock: true
    })
    
    // this.setData({
    //   is_clock: true,
    //   startPoint: e.touches[0],
    //   voiceMsgVal: '松开 结束',
    //   isShowVoiceA: true
    // });
    var options = {
      format: 'mp3'
    };
    recorderManager.start(options);
  },
  handleTouchMove(e) {
    console.log(e)
    // console.log(Math.abs(e.touches[e.touches.length - 1].clientY - this.state.startPoint.clientY) > 25)
    if (Math.abs(e.touches[e.touches.length - 1].clientY - this.data.startPoint.clientY) > 25) {
      this.setData({
        is_clock: false,
        voiceMsgVal: '说出悄悄话',
        isShowVoiceA: false
      });
    }
  },
  handleRecordStop(e) {
    console.log(e)
    let _this = this;
    this.setData({
      touchEnd: e.timeStamp,
      voiceMsgVal: '说出悄悄话',
      isShowVoiceA: false
    })
    // let touchTimes = this.data.touchEnd - this.data.touchStart;
    recorderManager.stop();
    if (this.data.is_clock){
      recorderManager.onStop(function (res) {
        if (res.duration < 2000) {
         wx.showToast({
            title: '录音时间太短，请长按录音',
            icon: 'none',
            duration: 2000
          });
        } else {
          var tempFilePath = res.tempFilePath; 
          console.log(tempFilePath);
         wx.showLoading({
            title: '语音检索中'
          });
          wx.uploadFile({
            url: `${API_HOST}`+ "/uploadFile",
            filePath: tempFilePath,
            name: 'file',
            header: {
              token: wx.getStorageSync('token')
            },
            success: function success(uploadRes) {
              setTimeout(function () {
               wx.hideLoading();
              }, 500);
              var url = JSON.parse(uploadRes.data).url;
              _this.setData({
                voiceValue: API_HOST.replace('api', '') + "/" + url,
                isVoiceEnter: true,
                isShowModal: true,
                duration: Math.ceil(res.duration/1000)
              },()=>{
                _this.isModalshow()
              });
            }
          });
        }
      });
    }
  },
  onChooseFriend(){
    wx.navigateTo({
      url: "/pages/choosePeople/index"
    });
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