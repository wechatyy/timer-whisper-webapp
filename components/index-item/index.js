"use strict";

var _baseComponent = require("../helpers/baseComponent.js");

var _baseComponent2 = _interopRequireDefault(_baseComponent);

var _classNames = require("../helpers/classNames.js");

var _classNames2 = _interopRequireDefault(_classNames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _baseComponent2.default)({
  relations: {
    '../index/index': {
      type: 'parent'
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-index-item'
    },
    name: {
      type: String,
      value: ''
    }
  },
  data: {
    index: 0,
    top: 0,
    height: 0
  },
  computed: {
    classes: ['prefixCls', function (prefixCls) {
      var wrap = (0, _classNames2.default)(prefixCls);
      var hd = prefixCls + "__hd";
      var bd = prefixCls + "__bd";

      return {
        wrap: wrap,
        hd: hd,
        bd: bd
      };
    }]
  },
  methods: {
    updated: function updated(index) {
      var _this = this;

      var className = "." + this.data.prefixCls;
      wx.createSelectorQuery().in(this).select(className).boundingClientRect(function (rect) {
        if (!rect) return;

        _this.setData({
          top: rect.top,
          height: rect.height,
          index: index
        });
      }).exec();
    }
  }
});