import { API_HOST, API_FIND_FRIEND ,API_BIND_FRIEND, API_QUERY_MESSAGE_LIST, API_UPLOAD_FILE, API_INSTER_MESSAGE} from '../../utils/config.js'
var jsPinYin = require("../../npm/js-pinyin/index.js");
import { toast } from '../../utils/modal'
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
const years = []
const months = []
const days = []
const hours = []
const minutes = []
const hh = date.getHours();
const mm = date.getMinutes();
for (let i = date.getFullYear(); i <= date.getFullYear() + 10; i++) {
  years.push(i)
} 
for (let i = 1; i <= 12; i++) {
  months.push(i)
} 
for (let i = 1; i <= 31; i++) {
  days.push(i)
}
for (var i = 0; i <= 23; i++) {
  if (i <= 9) {
    i = '0' + i;
  }
  hours.push(i);
}
for (var i = 0; i <= 59; i++) {
  if (i <= 9) {
    i = '0' + i;
  }
  minutes.push(i);
}
Page({
  data: {
    scrollTop:0,
    weekDay: weeknew,
    isDateShow: false,
    isAnimate: false,
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hh: date.getHours(),
    mm: date.getMinutes(),
    hh: hh,
    mm: mm,
    timeValue: [hh, mm],
    yearValue: [0, Month - 1, Day - 1],
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    friendID:"",
    isAuth:false,
    userId:'',
    searchValue: '',
    paddingTop: 0,
    systeminfo: {},
    list: [],
    isSearch: false,
    isShowBg: false,
    searchData: [],
    isTopArr: [], // 置顶
    data: [],
    noticeNumberData: {
      messageCount: 0,
      messageNumCount: 0
    },
    indexHeight:'calc(100vh - 348rpx)',
    callBack_id: '',
    callBack_img: '',
    callBack_name: '',
    paddingTop: 0,
    systeminfo: {},
    tabBarHeight: 0,
    isTells:false,
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
    isMsg4Enter: false, // 是否是第四种
    is_clock: false,
    recorderManager: null,
    startPoint: 0,
    voiceMsgVal: '说出悄悄话',
    autoFocus: false,
    isShowTextarea: false,
    messageList: [],
    userId: "",
    duration: 0,
    insertFriendID: 0,
    insertImgUrl: "",
    isPlayVoice: false,
    insertName: "",
    firendName: "",
    isShowVoiceA: false,
    nowImage: "",
    length: 0,
    options: {},
    displayTime: displayTime,
    weekDayNew: weeknew,
    dateNew: timenav,
    timeHours: timeHours,
    isCurDate: false,
    bidisplayTime: '',
    ismessageModal: false,
    msg4_input: "",
    msg4_imgs: []
  },
  onShowMessage() {
    var _this = this; 
    this.setData({
      isDateShow: false,
      isAnimate: true
    });
    setTimeout(function () {
      _this.setData({
        isAnimate: false
      });
    }, 200);
  },
  onSelectDateShow() {
    var _this = this; 
    this.setData({
      isDateShow: true,
      isAnimate: false
    });
    setTimeout(function () {
      _this.setData({
        isAnimate: true
      });
    }, 200);
  },
  onChangeYear(e){ 
    let _this = this;
    let val = e.detail.value;
    let newDate = new Date(_this.data.years[val[0]] + "-" + _this.data.months[val[1]] + "-" + _this.data.days[val[2]]).getDay();
    _this.setData({
      year: _this.data.years[val[0]],
      month: _this.data.months[val[1]],
      day: _this.data.days[val[2]],
      value: val,
      weekDay: weekDay[newDate]
    });
  },
  onChangeTime(e){
    let _this = this;
    let val = e.detail.value; 
    this.setData({
      hh: _this.data.hours[val[0]],
      mm: _this.data.minutes[val[1]],
      timeValue: val
    });
  },
  showMESGfc(){
    this.setData({
      isTells: !this.data.isTells

    })
  },
  onChooseFriend() {
    wx.navigateTo({
      url: "/pages/choosePeople/index"
    });
  },
  onMessageModal(is) {
    this.setData({
      ismessageModal: is
    })
  },
  isModalshow() {
    this.setData({
      ismessageModal: true
    })
  },
  isModalhide() {
    this.setData({
      ismessageModal: false,
      imgUrl:'',
      friendID: '',
      friendName: ''
    })
  },
  //查看图片
  getShowimgs(e) {
    console.log(e)
    let usrIdex = e.currentTarget.dataset.item;
    let list = e.currentTarget.dataset.list;
    wx.previewImage({
      current: usrIdex, // 当前显示图片的http链接
      urls: list // 需要预览的图片http链接列表
    })
  },
  onShowImage() {
    wx.navigateTo({
      url: '/pages/editMesg/index',
    })
    // this.setData({
    //   isChoose: !this.data.isChoose
    // })
  },
  onImageToolClick(e) {
    let _this = this;
    let flag = e.currentTarget.dataset.flag
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
                  isMsg4Enter: false,
                  isShowModal: true,
                  imageValue: urlArr
                }, () => {
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
    return timeStr.slice(0, 4) + '年' + timeStr.slice(5, 7) + '月' + timeStr.slice(8, 10) + '日 '
  },
  openCalendar() {
    console.log(this.data.displayTime)
    var weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    $wuxCalendar().open({
      value: '',
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
  onCurrentDate(e) {
    let val = e.detail
    console.log(e);
    this.setData({
      timeHours: val,
      isCurDate: false
    })
  },
  onCurrCel() {
    this.setData({
      isCurDate: false
    })
  },
  onSendMessage() {
    var _this = this;
    var messageContent = "";
    var messageType = "";
    if (this.data.friendID == ''){
      wx.showToast({
        title: '请选择好友',
        icon: 'none'
      })
      return false
    }
    if (this.data.isInputEnter) {
      messageContent = this.data.inputValue;
      messageType = 1;
    } else if (this.data.isVoiceEnter) {
      messageContent = this.data.voiceValue;
      messageType = 2;
    } else if (this.data.isImageEnter) {
      messageContent = this.data.imageValue.join(',');
      messageType = 3;
    } else if (this.data.isMsg4Enter) {
      let inputStr = this.data.msg4_input;
      let imgsJoin = this.data.msg4_imgs.join(',');
      messageContent = inputStr + "," + imgsJoin
      messageType = 4;
    }
    let _state = this.data,
      year = _state.year,
      month = _state.month,
      day = _state.day,
      hh = _state.hh,
      mm = _state.mm;

    var nowDate = new Date().getTime();
    var dataStr = year + "/" + (month < 10 ? '0' + month : month) + "/" + (day < 10 ? '0' + day : day) + " " + hh + ":" + mm;
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
        token: wx.getStorageSync('token')
      },
      data: {
        friendID: this.data.friendID,
        friendName: this.data.friendName,
        imgUrl: this.data.imgUrl,
        sex: this.data.sex,
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
          // _this.queryMessageList()
          _this.setData({
            inputValue: '',
            imgUrl: '',
            friendID: '',
            friendName: ''
          })
        } else if (res.data.code == 500){
          wx.showToast({
            title: res.data.msg,
            icon: 'none' 
          })
        }else{
          wx.navigateTo({
            url: '/pages/login/index',
          }) 
        }
      },
      fail: function fail() {
        wx.showToast({
          title: '失败',
          icon: 'none'
        })
        this.onMessageModal(false)
      },
      complete: (com) => {
        console.log()
      }
    });
    // this.props.onCancel();
  },
  getSystemInfo() {
    var systemInfo = wx.getSystemInfoSync();
    this.setData({
      paddingTop: systemInfo.statusBarHeight,
      systeminfo: systemInfo
    });
  },
  onPlayVoice(e) {
    console.log(e);
    let item = e.currentTarget.dataset.item
    let self = this
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
  playVoice() {
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
      var isFocus = true;
      var bottomStyle = e.target.height + 'px'; //软键盘的高度
      _this.setData({
        bottomStyle: bottomStyle,
        isFocus: isFocus,
        isChoose: false
      });
    }, 1);
  },
  //输入框失去焦点时触发
  outKeyboard() {
    const commentContent = this.data.commentContent
    this.setData({
      isFocus: false,
      bottomStyle: 0,
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
    if (this.data.inputValue.trim().length !== 0) {
      this.setData({
        isShowModal: true,
        isInputEnter: true,
        isShowTextarea: false,
        isImageEnter: false,
        isMsg4Enter: false,
        autoFocus: false,
      }, () => {
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
      isMsg4Enter: false,
      inputValue: '',
      voiceValue: '',
      imageValue: [],
    })
    if (flag) {
      // this.queryMessageList();
    }
  },
  onInput(e) {
    console.log(e)
    this.setData({
      inputValue: e.detail.value.slice(0, 200)
    })
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
  },
  handleRecordStart(e) {
    console.log(e)
    wx.vibrateLong()
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
    if (this.data.is_clock) {
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
            url: `${API_HOST}` + "/uploadFile",
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
                isMsg4Enter:false,
                isInputEnter:false,
                isImageEnter:false,
                isShowModal: true,
                duration: Math.ceil(res.duration / 1000)
              }, () => {
                _this.isModalshow()
              });
            }
          });
        }
      });
    }
  },
  onChooseFriend() {
    wx.navigateTo({
      url: "/pages/choosePeople/index"
    });
  },
  ontextareaViewClick() {
    this.setData({
      isShowTextarea: true,
      autoFocus: true
    });
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
  getFriendList() {
    wx.request({
      url: `${API_HOST}${API_FIND_FRIEND}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      success: res => {
        if(res.data.code == 50001) {
          wx.setStorageSync('token','')
          this.setData({isAuth:false})
        }
        if(res.data.code === 0) {
          let data = res.data.data;
            const isTopArr = data.filter(v => v.istop);
            const listData = this.data_letter_sort(data.filter(v => !v.istop), 'friendname')
            let list = [];
          let indexList = [];
            Object.keys(listData).forEach(v => {
              list.push({
                title: v,
                key: v,
                items: listData[v]
              })
              indexList.push(v)
            })
            list = list.filter(v => v.items.length > 0)
            this.setData({
              isTopArr: isTopArr,
              list: list,
              data,
              indexList
            })
        }
      },
    })
  },
  data_letter_sort(data, field) {
    var letter_reg = /^[A-Z]$/;
    var list = new Array();
    for (var i = 0; i < data.length; i++) {
      // 添加 # 分组，用来 存放 首字母不能 转为 大写英文的 数据
      list['#'] = new Array();
      // 首字母 转 大写英文
      var letter = jsPinYin.getCamelChars(data[i][field]).substr(0, 1).toUpperCase();
      // 是否 大写 英文 字母
      if (!letter_reg.test(letter)) {
        letter = '#';
      }
      // 创建 字母 分组
      if (!(letter in list)) {
        list[letter] = new Array();
      }
      // 字母 分组 添加 数据
      list[letter].push(data[i]);
    }
    // 转换 格式 进行 排序；
    var resault = new Array();
    for (var key in list) {
      resault.push({
        letter: key,
        list: list[key]
      });
    }
    resault.sort(function (x, y) {
      return x.letter.charCodeAt(0) - y.letter.charCodeAt(0);
    });
    // # 号分组 放最后
    var last_arr = resault[0];
    resault.splice(0, 1);
    last_arr && resault.push(last_arr);

    // 转换 数据 格式
    var json_sort = {};
    for (var i = 0; i < resault.length; i++) {
      json_sort[resault[i].letter] = resault[i].list;
    }

    return json_sort;
  },
  onItemClickToFriendInfo(e) {
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/friendInformation/index?userid=${item.userid}&id=${item.id}&friendid=${item.friendid}&imgurl=${item.imgurl}&friendname=${item.friendname}&remarkname=${item.remarkname}&sex=${item.sex}&istop=${item.istop}&isreject=${item.isreject}&intimate=${item.intimate}&intimateid=${item.intimateid}`
    })
  },
  onItemClickToMessage(e){
    let item = e.currentTarget.dataset.item;
    wx.navigateTo({
      url: `/pages/message/index?friendID=${item.friendid}&friendName=${item.friendname}&remarkname=${item.remarkname}&imgUrl=${item.imgurl}&sex=${item.sex}`
    })
  },
  onLoad:async function (options) {
    this.getSystemInfo()
    this.setData({
      userId: wx.getStorageSync('userId')
    })
    if (options.userId){
      this.setData({userId: options.userId})
      this.showModalfbd()
      // try {
      //   await this.bindFriendFc(options.userId)
      // } catch (error) {}
    }

  },
  onShow:async function (){
    if (!wx.getStorageSync('token')){
      this.setData({isAuth:false})
      // this.showModalfc()
    }else {
      this.getFriendList()
      this.setData({isAuth:true})
    }
  },
  getSystemInfo(){
    var systemInfo = wx.getSystemInfoSync();
    // px转换到rpx的比例
    var pxToRpxScale = 750 / systemInfo.windowWidth;
    // 状态栏的高度
    var ktxStatusHeight = systemInfo.statusBarHeight * pxToRpxScale;
    // 导航栏的高度
    var navigationHeight = 44 * pxToRpxScale;
    // window的宽度
    // let ktxWindowWidth = systemInfo.windowWidth * pxToRpxScale
    // window的高度
    var ktxWindowHeight = systemInfo.windowHeight * pxToRpxScale;
    // 屏幕的高度
    var ktxScreentHeight = systemInfo.screenHeight * pxToRpxScale;
    // 底部tabBar的高度
    var tabBarHeight = ktxScreentHeight - ktxStatusHeight - navigationHeight - ktxWindowHeight;
    this.setData({ 
      paddingTop: systemInfo.statusBarHeight,
      systeminfo: systemInfo,
      tabBarHeight: tabBarHeight
    });
  },
  showModalfbd(){
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '绑定好友后可互发信息',
      confirmText: '绑定',
      showCancel: true,
      cancelText:'取消',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定')
          if (!wx.getStorageSync('token')){
            _this.setData({isAuth:false})
            _this.showModalfc()
          }else {
            _this.bindFriendFc()
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  showModalfc(){
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '你还未登录，登录后可获得完整体验 ',
      confirmText: '一键登录',
      showCancel: false,
      success: function success(res) {
        // 点击一键登录，去授权页面
        if (res.confirm) {
          if (_this.data.userId){
            wx.navigateTo({
              url: "/pages/login/index?userId=" + _this.data.userId
            })
          }else{
            wx.navigateTo({
              url: "/pages/login/index"
            })
          }
        }
      }
    })
  },
    //绑定好友
    bindFriendFc(userId){
      wx.request({
        url: `${API_HOST}${API_BIND_FRIEND}?friendId=${this.data.userId}`,
        method: "POST",
        header: {
          token:  wx.getStorageSync('token')
        },
        data: {
          friendId: this.data.userId
        },
        success: res => {
          console.log(res)
        }
      })
    },
  onShareAppMessage(){
    return {
      title: "定时悄悄话",
      path: "/pages/tellsPeople/index?userId=" + wx.getStorageSync('userId'),
      imageUrl: "/assets/images/common/sharePng.png",
    };
  },
  onPageScroll(event) {
    console.log(event)
    this.setData({
      scrollTop: event.scrollTop
    });
  },
  onScrolls(e){
    console.log(e)
  }
})
