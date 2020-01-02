
import { API_HOST,API_FIND_FRIEND} from '../../utils/config.js'
Page({
  // data: {
  //   searchValue: '',
  //   paddingTop: 0,
  //   systeminfo: {},
  //   list: [],
  //   isSearch: false,
  //   isShowBg: false,
  //   searchData: [],
  //   isTopArr: [], // 置顶
  //   data: [],
  //   noticeNumberData: {
  //     messageCount: 0,
  //     messageNumCount: 0
  //   }
    
  // },
  data:{
    "searchValue": "",
    "paddingTop": 20,
    "systeminfo": {
      "errMsg": "getSystemInfo:ok",
      "model": "iPhone 6/7/8 Plus",
      "pixelRatio": 3,
      "windowWidth": 414,
      "windowHeight": 736,
      "system": "iOS 10.0.1",
      "language": "zh",
      "version": "7.0.4",
      "screenWidth": 414,
      "screenHeight": 736,
      "SDKVersion": "2.9.4",
      "brand": "devtools",
      "fontSizeSetting": 16,
      "benchmarkLevel": 1,
      "batteryLevel": 100,
      "statusBarHeight": 20,
      "safeArea": {
        "right": 414,
        "bottom": 736,
        "left": 0,
        "top": 20,
        "width": 414,
        "height": 716
      },
      "platform": "devtools"
    },
    "list": [
      {
        "title": "A",
        "key": "A",
        "items": [
          {
            "id": 352,
            "userid": 7,
            "username": "王。",
            "friendid": 14,
            "friendname": "aleige",
            "sex": 1,
            "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/BJnAbDL1SbWxICTBcYyD2CneFhibmzKjOOKwPr6EdJx2z9icTuo4mqyRyyqyE8BjSMULS2DN4Gr7mib0WMmh5y9Nw/132",
            "intimateid": 0,
            "cohesion": 0,
            "istop": 0,
            "isreject": 0,
            "isdelete": 0,
            "deletetime": 0,
            "createtime": 20200101140642,
            "intimate": null
          }
        ]
      },
      {
        "title": "P",
        "key": "P",
        "items": [
          {
            "id": 172,
            "userid": 7,
            "username": "王。",
            "friendid": 6,
            "friendname": "彭彭",
            "sex": 1,
            "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJiak4wBRE7KYJOpB6rO6b7Lhe2e9mibhibI9n22fdtJibK9Z7tPNvO8ibiamK8Xl6bCoL7xoiaMBvpJMUyQ/132",
            "intimateid": 0,
            "cohesion": 0,
            "istop": 0,
            "isreject": 0,
            "isdelete": 0,
            "deletetime": 0,
            "createtime": 20191226192354,
            "intimate": null
          }
        ]
      },
      {
        "title": "X",
        "key": "X",
        "items": [
          {
            "id": 343,
            "userid": 7,
            "username": "王。",
            "friendid": 8,
            "friendname": "小萌",
            "sex": 1,
            "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/yBE0LEibfstgITNGUZdL4NeNFPDcUcuphyxLSwib6yKepjaYict98jtwIO0eafSDeaZyZwGk73f5iaza3GAzWOibE3A/132",
            "intimateid": 0,
            "cohesion": 0,
            "istop": 0,
            "isreject": 0,
            "isdelete": 0,
            "deletetime": 0,
            "createtime": 20191231013231,
            "intimate": null
          }
        ]
      }
    ],
    "isSearch": false,
    "isShowBg": false,
    "searchData": [],
    "isTopArr": [],
    "data": [
      {
        "id": 172,
        "userid": 7,
        "username": "王。",
        "friendid": 6,
        "friendname": "彭彭",
        "sex": 1,
        "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJiak4wBRE7KYJOpB6rO6b7Lhe2e9mibhibI9n22fdtJibK9Z7tPNvO8ibiamK8Xl6bCoL7xoiaMBvpJMUyQ/132",
        "intimateid": 0,
        "cohesion": 0,
        "istop": 0,
        "isreject": 0,
        "isdelete": 0,
        "deletetime": 0,
        "createtime": 20191226192354,
        "intimate": null
      },
      {
        "id": 343,
        "userid": 7,
        "username": "王。",
        "friendid": 8,
        "friendname": "小萌",
        "sex": 1,
        "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/yBE0LEibfstgITNGUZdL4NeNFPDcUcuphyxLSwib6yKepjaYict98jtwIO0eafSDeaZyZwGk73f5iaza3GAzWOibE3A/132",
        "intimateid": 0,
        "cohesion": 0,
        "istop": 0,
        "isreject": 0,
        "isdelete": 0,
        "deletetime": 0,
        "createtime": 20191231013231,
        "intimate": null
      },
      {
        "id": 352,
        "userid": 7,
        "username": "王。",
        "friendid": 14,
        "friendname": "aleige",
        "sex": 1,
        "imgurl": "https://wx.qlogo.cn/mmopen/vi_32/BJnAbDL1SbWxICTBcYyD2CneFhibmzKjOOKwPr6EdJx2z9icTuo4mqyRyyqyE8BjSMULS2DN4Gr7mib0WMmh5y9Nw/132",
        "intimateid": 0,
        "cohesion": 0,
        "istop": 0,
        "isreject": 0,
        "isdelete": 0,
        "deletetime": 0,
        "createtime": 20200101140642,
        "intimate": null
      }
    ],
    "noticeNumberData": {
      "messageCount": 0,
      "messageNumCount": 79
    },
    "anonymousState__temp": "height:736px;width:414px;background:rgba(237, 237, 237, 1)",
    "anonymousState__temp2": "padding-top:20px",
    "anonymousState__temp3": {
      "background": "#ECEDEE"
    },
    "anonymousState__temp4": "/assets/images/common/add_buddy.png",
    "anonymousState__temp5": "padding-top:64px",
    "anonymousState__temp6": null,
    "anonymousState__temp7": 577.0579710144928,
    "__key_": null,
    "__preload_": null,
    "compid": null,
    "extraProps": null,
    "__webviewId__": 1,
    "$compid__7": "38",
    "$compid__8": "39",
    "$compid__9": "40",
    "$taroCompReady": true
  },
  getFriendList() {
    wx.request({
      url: `${API_HOST}${API_FIND_FRIEND}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      success: res => {
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
        this.setState({
          isTopArr: isTopArr,
          list: list,
          data
        })
      }
    })
  },
  onItemClick(item) {
    wx.navigateTo({
      url: `/pages/friendInformation/index?id=${item.id}&friendid=${item.friendid}&imgurl=${item.imgurl}&friendname=${item.friendname}&sex=${item.sex}&istop=${item.istop}&isreject=${item.isreject}&intimate=${item.intimate}&intimateid=${item.intimateid}`
    })
  },
  onLoad: function () {

  },

})
