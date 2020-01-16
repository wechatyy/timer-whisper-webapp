import { API_HOST, API_EDIT_RENAME, API_UPDATE_FRIEND, API_DEL_FRIEND, API_DEL_MESSAGE, API_MESSAGE_REMAIN_NUM } from '../../utils/config.js'

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
    count: 0,
    isOpens: false,
    commVal:'',
    isDone:false
  },
  onSearchMessage() {
    wx.navigateTo({
      url: '/pages/served/index'
      // url: "/pages/chatRecord/index"
    });
  },

  onLoad: function (options) {
    console.log(options);
    if (options){
      this.setData({
        userid: options.userid,
        friendid: options.friendid,
        friendname: options.friendname,
        remarkname:options.remarkname,
        id: options.id,
        imgurl: options.imgurl,
        intimate: options.intimate,
        intimateid: options.intimateid,
        isreject: options.isreject == 1 ? true : false,
        istop: options.istop == 1 ? true : false,
        sex: options.sex,
        commVal: options.remarkname != "null" ? options.remarkname : ''
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
        } else if(res.data.code === 50001){
          _this.showModalfc()
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
    let _this =this
    wx.request({
      url: `${API_HOST}${API_DEL_FRIEND}`,
      method: "POST",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        id: this.data.id
      },
      success: res => {
        if (res.data.code === 0) {
          wx.navigateBack({
            delta: 1
          })
        } else if(res.data.code === 50001){
          _this.showModalfc()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
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
              url: "/pages/login/index?userId=" + _this.data.id
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
  // messageRemainNum(friendid) {
  //   wx.request({
  //     url: `${API_HOST}${API_MESSAGE_REMAIN_NUM}`,
  //     header: {
  //       token: wx.getStorageSync('token')
  //     },
  //     data: {
  //       userId: friendid
  //     },
  //     success: res => {
  //       if (res.data.code === 0) {
  //         this.setData({
  //           count: res.data.count
  //         })
  //       } else {
  //         wx.showToast({
  //           title: res.data.msg,
  //           icon: 'none'
  //         })
  //       }
  //     }
  //   })
  // },

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
        }else if(res.data.code === 50001){
          _this.showModalfc()
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      }
    })
  },
  // 更新备注
  onEditName() {
    let _this = this;
    wx.request({
      url: `${API_HOST}${API_EDIT_RENAME}`,
      method: "Post",
      header: {
        token: wx.getStorageSync('token')
      },
      data: {
        friendId: this.data.friendid,
        remark:this.data.commVal,
      },
      success: res => {
        if (res.data.code === 0) {
          wx.showToast({
            title: "更新成功",
            icon: 'none',
            success:()=>{
              _this.setData({
                isOpens: false,
                remarkname: _this.data.commVal
              })
              _this.setData({
                commVal:'',
              })
            }
          })
        }else if(res.data.code === 50001){
          _this.showModalfc()
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
      url: `/pages/message/index?friendID=${this.data.friendid}&friendName=${this.data.friendname}&imgUrl=${this.data.imgurl}&sex=${this.data.sex}&remarkname=${this.data.remarkname}`
    })
  },

  onActionClose() {
    this.setData({
      isClearOpened: false,
      isDeleteOpened: false,
      isOpened: false,
    })
  },

  onSetCommen() {
    wx.navigateTo({
      url: `/pages/friendInformation/setCommon?friendID=${this.data.friendid}&remarkname=${this.data.remarkname}&friendName=${this.data.friendname}`,
    })
  },
  onCloseOpens(){
    this.setData({
      isOpens:false
    })
  },
  changComm(e){
    console.log(e)
    let _this = this;
    _this.setData({
      commVal: e.detail.value
    },()=>{
      if (_this.data.commVal.length>0){
        _this.setData({
          isDone:true
        })
      }else{
        _this.setData({
          commVal: _this.data.remarkname != "null" ? _this.data.remarkname: ''
        })
      }
    })
  },
  okCommt(){
    if (this.data.isDone){
      this.onEditName()
      // this.setData({
      //   isOpens: false,
      //   commVal:''
      // })
    }else{
      this.setData({
        isOpens: false,

      })
    }
  }
})
