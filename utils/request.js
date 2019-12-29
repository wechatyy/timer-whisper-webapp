import {
  API_HOST
} from './config';
import {
  alert,
  toast
} from './modal.js';
import {
  wxLogin
} from './wxLogin.js'
/**
 * 通用 HTTPS 请求封装
 * 返回 Promise
 * @params method 方法
 * @params api 链接
 * @params data 参数
 * @params header 头部
 * @params { showLoadingMask, loadingTitle }
 * @params showLoading 是否将展示 Loading，默认为展示
 * @params showLoadingMask 是否将 loading 设置为模态，在 showLoading=true 时有效
 * @params loadingTitle Loading 提示文案
 */
function httpRequest(
  method,
  uri,
  data = {},
  header = {}, {
    showLoading = false,
    showLoadingMask = false,
    loadingTitle = '加载中',
    is_alert = false
  } = {}) {
  return new Promise((resolve, reject) => {
    let realUrl = API_HOST + uri;
    setTimeout(function () {
      if (showLoading) {
        wx.showLoading({
          title: loadingTitle,
          mask: showLoadingMask
        });
      }
    }, 0)

    // 将参数对象中的 undefined,null,NaN 剔除
    for (let prop in data) {
      if (data[prop] == null) {
        delete data[prop];
      }
    }
    var retryTimes = 3;
    startRequset(realUrl, data, method, commonHeader, showLoading, resolve, retryTimes, reject, is_alert)
  });
}

async function startRequset(realUrl, data, method, commonHeader, showLoading, resolve, retryTimes, reject, is_alert) {
  if (retryTimes-- < 0) {
    toast('网络有点问题，请稍后再试');
    return;
  }

  // 添加授权-
  commonHeader['token'] =wx.getStorageSync('token') || '';
  wx.request({
    url: realUrl,
    data: data,
    method: method,
    header: commonHeader,
    success(res) { // 服务端返回任何 http 状态码都会进入 success 回调
      let statusCode = res.data.code;
      let respData = res.data;
      if (showLoading) {
        wx.hideLoading();
      }
      if (statusCode == 200 ) {
        resolve(respData);
      } else if (statusCode == 400) {
        alert(respData['msg'] || '请求错误');
      } else if (statusCode == 404) {
        toast(respData['msg'] || '访问的资源不存在');
      } else if (statusCode == 401) {
        wxLogin().then(res => {
          startRequset(realUrl, data, method, commonHeader, showLoading, resolve, retryTimes)
        })
      }  else if (statusCode >= 500 && statusCode < 600) {
        toast('网络有点问题，请稍后再试');
      } else {
        reject(statusCode)
      }
    },
    fail(err) { // 仅当断网、DNS 异常等网络错误时回调
      toast('网络似乎有问题');
    },
    complete() {
      if (showLoading) {
        wx.hideLoading();
      }
    }
  });
}

// 公共参数
function addParams(data) {
  data.token = wx.getStorageSync("toekn")
  return data
}

function httpGet(url, data = {}, header, options) {
  data = addParams(data)
  return httpRequest('GET', url, data, header, options);
}

function httpPost(url, data = {}, header, options) {
  return httpRequest('POST', `${url}`, data, header, options);
}

module.exports = {
  httpGet,
  httpPost
};