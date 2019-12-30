"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _baseComponent = require("../helpers/baseComponent.js");

var _baseComponent2 = _interopRequireDefault(_baseComponent);

var _classNames4 = require("../helpers/classNames.js");

var _classNames5 = _interopRequireDefault(_classNames4);

var _gestures = require("../helpers/gestures.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _baseComponent2.default)({
  relations: {
    '../swipe-action-group/index': {
      type: 'ancestor'
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-swipe'
    },
    autoClose: {
      type: Boolean,
      value: false
    },
    disabled: {
      type: Boolean,
      value: false
    },
    left: {
      type: Array,
      value: [],
      observer: 'updateBtns'
    },
    right: {
      type: Array,
      value: [],
      observer: 'updateBtns'
    },
    useSlots: {
      type: Boolean,
      value: false
    },
    data: {
      type: null,
      value: null
    }
  },
  data: {
    index: 0,
    swiping: false,
    showCover: false,
    offsetStyle: ''
  },
  computed: {
    classes: ['prefixCls, swiping', function (prefixCls, swiping) {
      var wrap = (0, _classNames5.default)(prefixCls, _defineProperty({}, prefixCls + "--swiping", swiping));
      var cover = prefixCls + "__cover";
      var left = (0, _classNames5.default)(prefixCls + "__actions", _defineProperty({}, prefixCls + "__actions--left", true));
      var right = (0, _classNames5.default)(prefixCls + "__actions", _defineProperty({}, prefixCls + "__actions--right", true));
      var action = prefixCls + "__action";
      var text = prefixCls + "__text";
      var content = prefixCls + "__content";

      return {
        wrap: wrap,
        cover: cover,
        left: left,
        right: right,
        action: action,
        text: text,
        content: content
      };
    }]
  },
  methods: {
    updated: function updated(index) {
      if (this.data.index !== index) {
        this.setData({ index: index });
      }
    },
    onCloseSwipe: function onCloseSwipe() {
      var parent = this.getRelationNodes('../swipe-action-group/index')[0];

      if (parent) {
        parent.onCloseSwipe(this.data.index);
      }
    },
    getContentEasing: function getContentEasing(value, limit) {
      // limit content style left when value > actions width
      var delta = Math.abs(value) - Math.abs(limit);
      var isOverflow = delta > 0;
      var factor = limit > 0 ? 1 : -1;

      if (isOverflow) {
        value = limit + Math.pow(delta, 0.85) * factor;
        return Math.abs(value) > Math.abs(limit) ? limit : value;
      }

      return value;
    },
    setStyle: function setStyle(value) {
      var limit = value > 0 ? this.btnsLeftWidth : -this.btnsRightWidth;
      var left = this.getContentEasing(value, limit);
      var offsetStyle = "left: " + left + "px";
      var showCover = Math.abs(value) > 0;

      if (this.data.offsetStyle !== offsetStyle || this.data.showCover !== showCover) {
        this.setData({ offsetStyle: offsetStyle, showCover: showCover });
      }
    },
    updateBtns: function updateBtns() {
      var _this = this;

      var prefixCls = this.data.prefixCls;

      var query = wx.createSelectorQuery().in(this);
      query.select("." + prefixCls + "__actions--left").boundingClientRect();
      query.select("." + prefixCls + "__actions--right").boundingClientRect();
      query.exec(function (rects) {
        var _rects = _slicedToArray(rects, 2),
            left = _rects[0],
            right = _rects[1];

        _this.btnsLeftWidth = left ? left.width : 0;
        _this.btnsRightWidth = right ? right.width : 0;
      });
    },
    onTap: function onTap(e) {
      var type = e.currentTarget.dataset.type;

      var params = _extends({}, e.currentTarget.dataset, {
        buttons: this.data[type],
        data: this.data.data
      });

      if (this.data.autoClose) {
        this.onClose();
      }

      this.triggerEvent('click', params);
    },
    onAcitons: function onAcitons() {
      if (this.data.autoClose) {
        this.onClose();
      }
    },
    onOpen: function onOpen(value, openedLeft, openedRight) {
      if (!this.openedLeft && !this.openedRight) {
        this.triggerEvent('open');
      }

      this.openedLeft = openedLeft;
      this.openedRight = openedRight;
      this.setStyle(value);
    },
    onClose: function onClose() {
      if (this.openedLeft || this.openedRight) {
        this.triggerEvent('close');
      }

      this.openedLeft = false;
      this.openedRight = false;
      this.setStyle(0);
    },
    onOpenLeft: function onOpenLeft() {
      this.onOpen(this.btnsLeftWidth, true, false);
    },
    onOpenRight: function onOpenRight() {
      this.onOpen(-this.btnsRightWidth, true, false);
    },
    onTouchStart: function onTouchStart(e) {
      if (this.data.disabled || (0, _gestures.getPointsNumber)(e) > 1) return;
      this.start = (0, _gestures.getTouchPoints)(e);
      this.onCloseSwipe();
    },
    onTouchMove: function onTouchMove(e) {
      if (this.data.disabled || (0, _gestures.getPointsNumber)(e) > 1) return;

      this.move = (0, _gestures.getTouchPoints)(e);

      var deltaX = this.move.x - this.start.x;
      var direction = (0, _gestures.getSwipeDirection)(this.start.x, this.move.x, this.start.y, this.move.y);
      var isLeft = direction === 'Left';
      var isRight = direction === 'Right';

      if (!isLeft && !isRight) return;

      var _data = this.data,
          left = _data.left,
          right = _data.right,
          useSlots = _data.useSlots;


      this.needShowRight = isLeft && (useSlots || right.length > 0);
      this.needShowLeft = isRight && (useSlots || left.length > 0);

      if (this.needShowLeft || this.needShowRight) {
        this.swiping = true;
        this.setData({ swiping: true });
        this.setStyle(deltaX);
      }
    },
    onTouchEnd: function onTouchEnd(e) {
      if (this.data.disabled || (0, _gestures.getPointsNumber)(e) > 1 || !this.swiping) return;

      this.end = (0, _gestures.getTouchPoints)(e);

      var deltaX = this.end.x - this.start.x;
      var needOpenRight = this.needShowRight && Math.abs(deltaX) > this.btnsRightWidth / 2;
      var needOpenLeft = this.needShowLeft && Math.abs(deltaX) > this.btnsLeftWidth / 2;

      if (needOpenRight) {
        this.onOpenRight();
      } else if (needOpenLeft) {
        this.onOpenLeft();
      } else {
        this.onClose();
      }

      this.swiping = false;
      this.setData({ swiping: false });

      this.needShowLeft = false;
      this.needShowRight = false;
    },
    noop: function noop() {}
  },
  created: function created() {
    this.btnsLeftWidth = 0;
    this.btnsRightWidth = 0;
    this.openedLeft = false;
    this.openedRight = false;
    this.needShowLeft = false;
    this.needShowRight = false;
  },
  ready: function ready() {
    this.updateBtns();
  }
});