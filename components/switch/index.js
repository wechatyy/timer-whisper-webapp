"use strict";

var _baseComponent = require("../helpers/baseComponent.js");

var _baseComponent2 = _interopRequireDefault(_baseComponent);

var _classNames2 = require("../helpers/classNames.js");

var _classNames3 = _interopRequireDefault(_classNames2);

var _eventsMixin = require("../helpers/eventsMixin.js");

var _eventsMixin2 = _interopRequireDefault(_eventsMixin);

var _colors = require("../helpers/colors.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

(0, _baseComponent2.default)({
  useField: true,
  behaviors: [(0, _eventsMixin2.default)()],
  relations: {
    '../field/index': {
      type: 'ancestor'
    }
  },
  properties: {
    prefixCls: {
      type: String,
      value: 'wux-switch'
    },
    value: {
      type: Boolean,
      value: false,
      observer: function observer(newVal) {
        if (this.hasFieldDecorator) return;
        this.updated(newVal);
      }
    },
    disabled: {
      type: Boolean,
      value: false
    },
    color: {
      type: String,
      value: 'balanced',
      observer: 'updateStyle'
    }
  },
  data: {
    inputStyle: '',
    inputChecked: false
  },
  computed: {
    classes: ['prefixCls, inputChecked, disabled', function (prefixCls, inputChecked, disabled) {
      var _classNames;

      var wrap = (0, _classNames3.default)(prefixCls);
      var input = (0, _classNames3.default)(prefixCls + "__input", (_classNames = {}, _defineProperty(_classNames, prefixCls + "__input--checked", inputChecked), _defineProperty(_classNames, prefixCls + "__input--disabled", disabled), _classNames));

      return {
        wrap: wrap,
        input: input
      };
    }]
  },
  methods: {
    updated: function updated(inputChecked) {
      if (this.data.inputChecked !== inputChecked) {
        this.setData({ inputChecked: inputChecked });
      }
    },
    onTap: function onTap(e) {
      var _data = this.data,
          inputChecked = _data.inputChecked,
          disabled = _data.disabled;

      var newInputChecked = !inputChecked;

      if (disabled) return;

      this.triggerEvent('change', { value: newInputChecked });
    },
    updateStyle: function updateStyle(color) {
      var newColor = (0, _colors.isPresetColor)(color);
      var inputStyle = "border-color: " + newColor + "; background-color: " + newColor + ";";

      this.setData({ inputStyle: inputStyle });
    }
  },
  attached: function attached() {
    this.updateStyle(this.data.color);
  }
});