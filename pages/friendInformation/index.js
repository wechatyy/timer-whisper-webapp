

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

  onLoad: function () {

  },
  updateFriend(data, callback) {
    const { id, intimateid, friendid } = this.state;
    wx.request({
      url: `${baseUrl}/friend/updateFriend`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        id: id,
        intimateid: intimateid,
        istop: data.istop ? 1 : 0,
        isreject: data.isreject ? 1 : 0,
        friendid: friendid
      },
      success: res => {
        if (res.data.code === 0) {
          callback();
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
      url: `${baseUrl}/friend/deleteFriend`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendid: this.state.friendid
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
      url: `${baseUrl}/messageRemainNum`,
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
    wx.request({
      url: `${baseUrl}/deleteMessage`,
      method: "Post",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendID: this.state.friendid
      },
      success: res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: "清空成功",
            icon: 'none'
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

  onSwitchChange(flag, e) {
    if (flag === 'refuse') {
      this.setData({
        isOpened: true
      })
    } else {
      this.updateFriend({
        istop: e.detail.value,
        isreject: this.state.refuse
      }, () => {
        this.setData({
          [flag]: e.detail.value
        })
      });
    }
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
      url: `/pages/message/index?friendid=${this.state.friendid}&name=${this.state.friendname}&nowImage=${this.state.imgurl}`
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
