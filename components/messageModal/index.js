"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _class, _temp2;

var _index = require("../../npm/@tarojs/taro-weapp/index.js");

var _index2 = _interopRequireDefault(_index);

var _api = require("../../api.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var weekDay = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];

var MessageModal = (_temp2 = _class = function (_BaseComponent) {
  _inherits(MessageModal, _BaseComponent);

  function MessageModal() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, MessageModal);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = MessageModal.__proto__ || Object.getPrototypeOf(MessageModal)).call.apply(_ref, [this].concat(args))), _this), _this.$usedState = ["anonymousState__temp", "anonymousState__temp2", "anonymousState__temp3", "anonymousState__temp4", "anonymousState__temp5", "anonymousState__temp6", "anonymousState__temp7", "anonymousState__temp8", "anonymousState__temp9", "isDateShow", "isAnimate", "isInput", "isVoice", "isImage", "imageValue", "insertImgUrl", "inputValue", "insertName", "year", "month", "day", "weekDay", "years", "months", "days", "value", "hours", "minutes", "hh", "mm", "timeValue", "innerAudioContext", "isPlayVoice", "voiceValue", "friendID", "duration", "__fn_onClick"], _this.onChange = function (e) {
      var val = e.detail.value;
      var newDate = new Date(_this.state.years[val[0]] + "-" + _this.state.months[val[1]] + "-" + _this.state.days[val[2]]).getDay();
      _this.setState({
        year: _this.state.years[val[0]],
        month: _this.state.months[val[1]],
        day: _this.state.days[val[2]],
        value: val,
        weekDay: weekDay[newDate]
      });
    }, _this.customComponents = [], _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(MessageModal, [{
    key: "_constructor",
    value: function _constructor() {
      _get(MessageModal.prototype.__proto__ || Object.getPrototypeOf(MessageModal.prototype), "_constructor", this).apply(this, arguments);
      var date = new Date();
      var years = [];
      var months = [];
      var days = [];
      var hours = [];
      var minutes = [];
      for (var i = date.getFullYear(); i <= date.getFullYear() + 10; i++) {
        years.push(i);
      }
      for (var _i = 1; _i <= 12; _i++) {
        months.push(_i);
      }
      for (var _i2 = 1; _i2 <= 31; _i2++) {
        days.push(_i2);
      }
      for (var _i3 = 0; _i3 <= 23; _i3++) {
        var hour = _i3;
        if (hour <= 9) {
          hour = '0' + hour;
        }
        hours.push(hour);
      }
      for (var _i4 = 0; _i4 <= 59; _i4++) {
        var minute = _i4;
        if (minute <= 9) {
          minute = '0' + minute;
        }
        minutes.push(minute);
      }
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hh = date.getHours();
      var mm = date.getMinutes();
      var newDate = new Date(date.getFullYear() + "-" + month + "-" + day).getDay();
      this.state = {
        years: years,
        year: date.getFullYear(),
        months: months,
        month: month,
        days: days,
        day: day,
        value: [0, month - 1, day - 1],
        hours: hours,
        minutes: minutes,
        hh: hh,
        mm: mm,
        timeValue: [hh, mm],
        isDateShow: false,
        isAnimate: false,
        innerAudioContext: _index2.default.createInnerAudioContext(),
        isPlayVoice: false,
        weekDay: weekDay[newDate]
      };
      this.$$refs = new _index2.default.RefsArray();
    }
  }, {
    key: "onChangeTime",
    value: function onChangeTime(e) {
      var val = e.detail.value;
      console.log(val);
      this.setState({
        hh: this.state.hours[val[0]],
        mm: this.state.minutes[val[1]],
        timeValue: val
      });
    }
  }, {
    key: "onSelectDateShow",
    value: function onSelectDateShow() {
      var _this2 = this;

      this.setState({
        isDateShow: true,
        isAnimate: false
      });
      setTimeout(function () {
        _this2.setState({
          isAnimate: true
        });
      }, 200);
    }
  }, {
    key: "onShowMessage",
    value: function onShowMessage() {
      var _this3 = this;

      this.setState({
        isDateShow: false,
        isAnimate: true
      });
      setTimeout(function () {
        _this3.setState({
          isAnimate: false
        });
      }, 200);
    }
  }, {
    key: "playVoice",
    value: function playVoice() {
      var _this4 = this;

      this.setState({
        isPlayVoice: true
      });
      var innerAudioContext = this.state.innerAudioContext;

      innerAudioContext.src = this.props.voiceValue;
      innerAudioContext.play();
      innerAudioContext.onStop(function () {
        _this4.setState({
          isPlayVoice: false
        });
      });
    }
  }, {
    key: "onChooseFriend",
    value: function onChooseFriend() {
      this.props.onChooseFriend();
    }
  }, {
    key: "onSendMessage",
    value: function onSendMessage() {
      var _this5 = this;

      var messageContent = "";
      var messageType = "";
      if (this.props.isInput) {
        messageContent = this.props.inputValue;
        messageType = 1;
      } else if (this.props.isVoice) {
        messageContent = this.props.voiceValue;
        messageType = 2;
      } else {
        messageContent = this.props.imageValue.join(',');
        messageType = 3;
      }
      var _state = this.state,
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
        this.showToast("请勿选择之前的时间");
        return false;
      }
      _index2.default.request({
        url: _api.baseUrl + "/insterMessage",
        method: "POST",
        header: {
          token: _index2.default.getStorageSync('token')
        },
        data: {
          friendID: this.props.friendID,
          messageContent: messageContent,
          messageType: messageType,
          voiceTime: this.props.duration / 1000,
          planTime: Number('' + year + (month < 10 ? '0' + month : month) + (day < 10 ? '0' + day : day) + hh + mm)
        },
        success: function success(res) {
          if (res.data.code != 0) {
            _this5.showToast(res.data.msg);
          } else {
            _this5.props.onCancel(true);
          }
        },
        fail: function fail() {
          _this5.showToast("失败");
        }
      });
      this.props.onCancel();
    }
  }, {
    key: "showToast",
    value: function showToast() {
      var content = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '失败';

      _index2.default.showToast({
        title: content,
        icon: 'none'
      });
    }
  }, {
    key: "_createData",
    value: function _createData() {
      this.__state = arguments[0] || this.state || {};
      this.__props = arguments[1] || this.props || {};
      var __isRunloopRef = arguments[2];
      var __prefix = this.$prefix;
      ;

      var _state2 = this.__state,
          isDateShow = _state2.isDateShow,
          isAnimate = _state2.isAnimate,
          year = _state2.year,
          month = _state2.month,
          day = _state2.day,
          hh = _state2.hh,
          mm = _state2.mm,
          isPlayVoice = _state2.isPlayVoice,
          weekDay = _state2.weekDay;
      var _props = this.__props,
          onCancel = _props.onCancel,
          inputValue = _props.inputValue,
          isInput = _props.isInput,
          isVoice = _props.isVoice,
          isImage = _props.isImage,
          imageValue = _props.imageValue,
          insertImgUrl = _props.insertImgUrl,
          duration = _props.duration,
          insertName = _props.insertName;

      console.log(insertImgUrl, insertName);
      var anonymousState__temp = isVoice ? isPlayVoice ? "/assets/images/common/voice_black.gif" : "/assets/images/common/voice2.png" : null;
      var anonymousState__temp2 = isVoice ? Math.ceil(duration / 1000) : null;
      var anonymousState__temp3 = insertImgUrl ? (0, _index.internal_inline_style)({ color: 'rgba(30,39,55,1)' }) : null;
      var anonymousState__temp4 = Number(hh) < 10 ? '0' + Number(hh) : Number(hh);
      var anonymousState__temp5 = Number(mm) < 10 ? '0' + Number(mm) : Number(mm);
      var anonymousState__temp6 = "/assets/images/common/cancel.png";
      var anonymousState__temp7 = "/assets/images/common/send.png";
      var anonymousState__temp8 = "/assets/images/common/cancel.png";
      var anonymousState__temp9 = "/assets/images/common/enter.png";
      Object.assign(this.__state, {
        anonymousState__temp: anonymousState__temp,
        anonymousState__temp2: anonymousState__temp2,
        anonymousState__temp3: anonymousState__temp3,
        anonymousState__temp4: anonymousState__temp4,
        anonymousState__temp5: anonymousState__temp5,
        anonymousState__temp6: anonymousState__temp6,
        anonymousState__temp7: anonymousState__temp7,
        anonymousState__temp8: anonymousState__temp8,
        anonymousState__temp9: anonymousState__temp9,
        isInput: isInput,
        isVoice: isVoice,
        isImage: isImage,
        imageValue: imageValue,
        insertImgUrl: insertImgUrl,
        inputValue: inputValue,
        insertName: insertName
      });
      return this.__state;
    }
  }, {
    key: "funPrivatedzzzz",
    value: function funPrivatedzzzz() {
      return this.props.onCancel.apply(undefined, Array.prototype.slice.call(arguments, 1));
    }
  }]);

  return MessageModal;
}(_index.Component), _class.$$events = ["playVoice", "onChooseFriend", "onSelectDateShow", "funPrivatedzzzz", "onSendMessage", "onChange", "onChangeTime", "onShowMessage"], _class.$$componentPath = "components/messageModal/index", _temp2);
exports.default = MessageModal;

Component(require('../../npm/@tarojs/taro-weapp/index.js').default.createComponent(MessageModal));