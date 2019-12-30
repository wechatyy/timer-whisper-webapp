'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * 获取系统信息
 */

var systemInfo = null;

var getSystemInfo = exports.getSystemInfo = function getSystemInfo(isForce) {
  if (!systemInfo || isForce) {
    try {
      systemInfo = wx.getSystemInfoSync();
    } catch (e) {/* Ignore */}
  }

  return systemInfo;
};

// iPhoneX 竖屏安全区域
var safeAreaInset = exports.safeAreaInset = {
  top: 88, // StatusBar & NavBar
  left: 0,
  right: 0,
  bottom: 34 // Home Indicator
};

var isIPhoneX = function isIPhoneX(_ref) {
  var model = _ref.model,
      platform = _ref.platform;

  return (/iPhone X/.test(model) && platform === 'ios'
  );
};

var checkIPhoneX = exports.checkIPhoneX = function checkIPhoneX(isForce) {
  return isIPhoneX(getSystemInfo(isForce));
};