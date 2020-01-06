import { API_HOST, API_UPLOAD_FILE, API_UPDATE_FRIEND, API_DEL_FRIEND, API_DEL_MESSAGE, API_MESSAGE_REMAIN_NUM } from '../../utils/config.js'

Page({
  data: {
    paddingTop: 0,
    systeminfo: {},
    top: false,
    refuse: false,
    isOpened: false,
    isClearOpened: false,
    isDeleteOpened: false,
    id: "",
    sex: "",
    imgurl: "",
    friendname: "",
    intimateid: "",
    friendid: "",
    count: 0
  },

  onLoad: function (options) {
    if (options){
      this.setData({
        userid: options.userid,
        friendid: options.friendid,
        friendname: options.friendname,
        id: options.id,
        imgurl: options.imgurl,
        intimate: options.intimate,
        intimateid: options.intimateid,
        isreject: options.isreject == 1 ? true : false,
        istop: options.istop == 1 ? true : false,
        sex: options.sex
      },()=>{
        this.messageRemainNum(options.friendid)
      }) 
    }
    
  },
  updateFriend() {
    const { id, intimateid, friendid } = this.data;
    wx.request({
      url: `${API_HOST}${API_UPDATE_FRIEND}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        id: id,
        intimateid: intimateid,
        istop: this.data.istop ? 1 : 0,
        isreject: this.data.isreject ? 1 : 0,
        friendid: friendid
      },
      success: res => {
        if (res.data.code === 0) {
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  deleteFriend() {
    wx.request({
      url: `${API_HOST}${API_DEL_FRIEND}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        id: this.data.friendid
      },
      success: res => {
        if (res.data.code === 0) {
          wx.navigateBack({
            delta: 1
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  messageRemainNum(friendid) {
    wx.request({
      url: `${API_HOST}${API_MESSAGE_REMAIN_NUM}`,
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        userId: friendid
      },
      success: res => {
        if (res.data.code === 0) {
          this.setData({
            count: res.data.count
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  deleteMessage() {
    let _this = this;
    wx.request({
      url: `${API_HOST}${API_DEL_MESSAGE}`,
      method: "Post",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendID: this.data.friendid
      },
      success: res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: "清空成功",
            icon: 'none',
            success:()=>{
              _this.setData({
                isClearOpened: false
              })
            }
          })
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },

  onSwitchChange(e) {
    this.setData({
      istop: e.detail
    },()=>{
      this.updateFriend();
    })
  },
  onSwitchReject(e){
    this.setData({
      isreject: e.detail
    }, () => {
      this.updateFriend();
    })
  },
  onActionCancel() {
    this.setData({
      isOpened: false,
      isClearOpened: false,
      isDeleteOpened: false,
    })
  },

  onActionClick() {
    this.setData({
      isOpened: false
    })
    this.updateFriend({
      istop: this.state.top,
      isreject: !this.state.refuse
    }, () => {
      this.setData({
        refuse: !this.state.refuse
      })
    });
  },

  onClearMessage() {
    this.setData({
      isClearOpened: true
    })
  },

  onActionMsgClick() {
    this.setData({
      isClearOpened: false
    })
    this.deleteMessage();
  },

  onDeleteFriend() {
    this.setData({
      isDeleteOpened: true
    })
  },

  onActionDeleteClick() {
    this.setData({
      isDeleteOpened: false
    })
    this.deleteFriend();
  },

  onButtonClick() {
    wx.navigateTo({
      url: `/pages/message/index?friendID=${this.data.friendid}&friendName=${this.data.friendname}&imgUrl=${this.data.imgurl}&sex=${this.data.sex}`
    })
  },

  onActionClose() {
    this.setData({
      isClearOpened: false,
      isDeleteOpened: false,
      isOpened: false,
    })
  },

  onSearchMessage() {
    wx.navigateTo({
      url: `/pages/chatRecord/index`
    })
  }

})
