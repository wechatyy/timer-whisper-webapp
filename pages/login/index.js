
import { API_HOST,API_LOGIN} from '../../utils/config.js'

Page({
  data: {

  },

  async onGetUserInfo(e) {
    console.log(e);
    let userData = e.detail
    let res = await wx.$login()
    console.log(res);
    if (res.code) {
      this.postLogin(res.code,userData)
    }
  },

  postLogin(code, userData) {
    const { avatarUrl, gender, nickName } = userData.userInfo;
    wx.request({
      url: `${API_HOST}${API_LOGIN}?code=${code}`,
      method: "POST",
      data: {
        username: nickName,
        avatarUrl: avatarUrl,
        gender: gender
      },
      success: res => {
        wx.setStorageSync('token', res.data.token.token)
        wx.setStorageSync('userId', res.data.token.userId)
        wx.navigateBack()
      }
    })
  },
  onLoad: function () {

  },


})
