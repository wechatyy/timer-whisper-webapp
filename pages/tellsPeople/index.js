
import { API_HOST, API_FIND_FRIEND,API_BIND_FRIEND} from '../../utils/config.js'
var jsPinYin = require("../../npm/js-pinyin/index.js");
Page({
  data: {
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
    indexHeight:'calc(100vh- 348rpx)'
  },
  // data:{
  //   "searchValue": "",
  //   "paddingTop": 20,
  //   "systeminfo": {
  //     "errMsg": "getSystemInfo:ok",
  //     "model": "iPhone 6/7/8 Plus",
  //     "pixelRatio": 3,
  //     "windowWidth": 414,
  //     "windowHeight": 736,
  //     "system": "iOS 10.0.1",
  //     "language": "zh",
  //     "version": "7.0.4",
  //     "screenWidth": 414,
  //     "screenHeight": 736,
  //     "SDKVersion": "2.9.4",
  //     "brand": "devtools",
  //     "fontSizeSetting": 16,
  //     "benchmarkLevel": 1,
  //     "batteryLevel": 100,
  //     "statusBarHeight": 20,
  //     "safeArea": {
  //       "right": 414,
  //       "bottom": 736,
  //       "left": 0,
  //       "top": 20,
  //       "width": 414,
  //       "height": 716
  //     },
  //     "platform": "devtools"
  //   },
  //   "list": [
  //     {
  //       "title": "A",
  //       "key": "A",
  //       "items": [
  //         {
  //           "id": 352,
  //           "userid": 7,
  //           "username": "王。",
  //           "friendid": 14,
  //           "friendname": "aleige",
  //           "sex": 1,
  //           "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/BJnAbDL1SbWxICTBcYyD2CneFhibmzKjOOKwPr6EdJx2z9icTuo4mqyRyyqyE8BjSMULS2DN4Gr7mib0WMmh5y9Nw/132",
  //           "intimateid": 0,
  //           "cohesion": 0,
  //           "istop": 0,
  //           "isreject": 0,
  //           "isdelete": 0,
  //           "deletetime": 0,
  //           "createtime": 20200101140642,
  //           "intimate": null
  //         }
  //       ]
  //     },
  //     {
  //       "title": "P",
  //       "key": "P",
  //       "items": [
  //         {
  //           "id": 172,
  //           "userid": 7,
  //           "username": "王。",
  //           "friendid": 6,
  //           "friendname": "彭彭",
  //           "sex": 1,
  //           "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJiak4wBRE7KYJOpB6rO6b7Lhe2e9mibhibI9n22fdtJibK9Z7tPNvO8ibiamK8Xl6bCoL7xoiaMBvpJMUyQ/132",
  //           "intimateid": 0,
  //           "cohesion": 0,
  //           "istop": 0,
  //           "isreject": 0,
  //           "isdelete": 0,
  //           "deletetime": 0,
  //           "createtime": 20191226192354,
  //           "intimate": null
  //         }
  //       ]
  //     },
  //     {
  //       "title": "X",
  //       "key": "X",
  //       "items": [
  //         {
  //           "id": 343,
  //           "userid": 7,
  //           "username": "王。",
  //           "friendid": 8,
  //           "friendname": "小萌",
  //           "sex": 1,
  //           "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/yBE0LEibfstgITNGUZdL4NeNFPDcUcuphyxLSwib6yKepjaYict98jtwIO0eafSDeaZyZwGk73f5iaza3GAzWOibE3A/132",
  //           "intimateid": 0,
  //           "cohesion": 0,
  //           "istop": 0,
  //           "isreject": 0,
  //           "isdelete": 0,
  //           "deletetime": 0,
  //           "createtime": 20191231013231,
  //           "intimate": null
  //         }
  //       ]
  //     }
  //   ],
  //   "isSearch": false,
  //   "isShowBg": false,
  //   "searchData": [],
  //   "isTopArr": [],
  //   "data": [
  //     {
  //       "id": 172,
  //       "userid": 7,
  //       "username": "王。",
  //       "friendid": 6,
  //       "friendname": "彭彭",
  //       "sex": 1,
  //       "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJiak4wBRE7KYJOpB6rO6b7Lhe2e9mibhibI9n22fdtJibK9Z7tPNvO8ibiamK8Xl6bCoL7xoiaMBvpJMUyQ/132",
  //       "intimateid": 0,
  //       "cohesion": 0,
  //       "istop": 0,
  //       "isreject": 0,
  //       "isdelete": 0,
  //       "deletetime": 0,
  //       "createtime": 20191226192354,
  //       "intimate": null
  //     },
  //     {
  //       "id": 343,
  //       "userid": 7,
  //       "username": "王。",
  //       "friendid": 8,
  //       "friendname": "小萌",
  //       "sex": 1,
  //       "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/yBE0LEibfstgITNGUZdL4NeNFPDcUcuphyxLSwib6yKepjaYict98jtwIO0eafSDeaZyZwGk73f5iaza3GAzWOibE3A/132",
  //       "intimateid": 0,
  //       "cohesion": 0,
  //       "istop": 0,
  //       "isreject": 0,
  //       "isdelete": 0,
  //       "deletetime": 0,
  //       "createtime": 20191231013231,
  //       "intimate": null
  //     },
  //     {
  //       "id": 352,
  //       "userid": 7,
  //       "username": "王。",
  //       "friendid": 14,
  //       "friendname": "aleige",
  //       "sex": 1,
  //       "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/BJnAbDL1SbWxICTBcYyD2CneFhibmzKjOOKwPr6EdJx2z9icTuo4mqyRyyqyE8BjSMULS2DN4Gr7mib0WMmh5y9Nw/132",
  //       "intimateid": 0,
  //       "cohesion": 0,
  //       "istop": 0,
  //       "isreject": 0,
  //       "isdelete": 0,
  //       "deletetime": 0,
  //       "createtime": 20200101140642,
  //       "intimate": null
  //     }
  //   ],
  //   "noticeNumberData": {
  //     "messageCount": 0,
  //     "messageNumCount": 79
  //   },
  //   "anonymousState__temp": "height:736px;width:414px;background:rgba(237, 237, 237, 1)",
  //   "anonymousState__temp2": "padding-top:20px",
  //   "anonymousState__temp3": {
  //     "background": "#ECEDEE"
  //   },
  //   "anonymousState__temp4": "/assets/images/common/add_buddy.png",
  //   "anonymousState__temp5": "padding-top:64px",
  //   "anonymousState__temp6": null,
  //   "anonymousState__temp7": 577.0579710144928,
  //   "__key_": null,
  //   "__preload_": null,
  //   "compid": null,
  //   "extraProps": null,
  //   "__webviewId__": 1,
  //   "$compid__7": "38",
  //   "$compid__8": "39",
  //   "$compid__9": "40",
  //   "$taroCompReady": true,
  //   userId:''
  // },
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
            Object.keys(listData).forEach(v => {
              list.push({
                title: v,
                key: v,
                items: listData[v]
              })
            })
            list = list.filter(v => v.items.length > 0)
            this.setData({
              isTopArr: isTopArr,
              list: list,
              data
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
  }
})
