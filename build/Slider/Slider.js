'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _keycode = require('keycode');

var _keycode2 = _interopRequireDefault(_keycode);

var _warning = require('warning');

var _warning2 = _interopRequireDefault(_warning);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

var _FocusRipple = require('../internal/FocusRipple');

var _FocusRipple2 = _interopRequireDefault(_FocusRipple);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Verifies min/max range.
 * @param   {Object} props         Properties of the React component.
 * @param   {String} propName      Name of the property to validate.
 * @param   {String} componentName Name of the component whose property is being validated.
 * @returns {Object} Returns an Error if min >= max otherwise null.
 */
var minMaxPropType = function minMaxPropType(props, propName, componentName) {
  for (var _len = arguments.length, rest = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
    rest[_key - 3] = arguments[_key];
  }

  var error = _propTypes2.default.number.apply(_propTypes2.default, [props, propName, componentName].concat(rest));
  if (error !== null) {
    return error;
  }

  if (props.min >= props.max) {
    var errorMsg = propName === 'min' ? 'min should be less than max' : 'max should be greater than min';
    return new Error(errorMsg);
  }
};

/**
 * Verifies value is within the min/max range.
 * @param   {Object} props         Properties of the React component.
 * @param   {String} propName      Name of the property to validate.
 * @param   {String} componentName Name of the component whose property is being validated.
 * @returns {Object} Returns an Error if the value is not within the range otherwise null.
 */
var valueInRangePropType = function valueInRangePropType(props, propName, componentName) {
  for (var _len2 = arguments.length, rest = Array(_len2 > 3 ? _len2 - 3 : 0), _key2 = 3; _key2 < _len2; _key2++) {
    rest[_key2 - 3] = arguments[_key2];
  }

  var error = _propTypes2.default.number.apply(_propTypes2.default, [props, propName, componentName].concat(rest));
  if (error !== null) {
    return error;
  }

  var value = props[propName];
  if (value < props.min || props.max < value) {
    return new Error(propName + ' should be within the range specified by min and max');
  }
};

var crossAxisProperty = {
  x: 'height',
  'x-reverse': 'height',
  y: 'width',
  'y-reverse': 'width'
};

var crossAxisOffsetProperty = {
  x: 'top',
  'x-reverse': 'top',
  y: 'left',
  'y-reverse': 'left'
};

var mainAxisProperty = {
  x: 'width',
  'x-reverse': 'width',
  y: 'height',
  'y-reverse': 'height'
};

var mainAxisMarginFromEnd = {
  x: 'marginRight',
  'x-reverse': 'marginLeft',
  y: 'marginTop',
  'y-reverse': 'marginBottom'
};

var mainAxisMarginFromStart = {
  x: 'marginLeft',
  'x-reverse': 'marginRight',
  y: 'marginBottom',
  'y-reverse': 'marginTop'
};

var mainAxisOffsetProperty = {
  x: 'left',
  'x-reverse': 'right',
  y: 'bottom',
  'y-reverse': 'top'
};

var mainAxisClientProperty = {
  x: 'clientWidth',
  'x-reverse': 'clientWidth',
  y: 'clientHeight',
  'y-reverse': 'clientHeight'
};

var mainAxisClientOffsetProperty = {
  x: 'clientX',
  'x-reverse': 'clientX',
  y: 'clientY',
  'y-reverse': 'clientY'
};

var reverseMainAxisOffsetProperty = {
  x: 'right',
  'x-reverse': 'left',
  y: 'top',
  'y-reverse': 'bottom'
};

var isMouseControlInverted = function isMouseControlInverted(axis) {
  return axis === 'x-reverse' || axis === 'y';
};

var calculateAxis = function calculateAxis(axis, isRtl) {
  if (isRtl) {
    switch (axis) {
      case 'x':
        return 'x-reverse';
      case 'x-reverse':
        return 'x';
    }
  }
  return axis;
};

function getPercent(value, min, max) {
  var percent = (value - min) / (max - min);
  if (isNaN(percent)) {
    percent = 0;
  }

  return percent;
}

var getStyles = function getStyles(props, context, state) {
  var _slider, _track, _filledAndRemaining, _handle, _objectAssign2, _objectAssign3;

  var axis = props.axis,
      disabled = props.disabled,
      max = props.max,
      min = props.min;
  var _context$muiTheme = context.muiTheme,
      isRtl = _context$muiTheme.isRtl,
      _context$muiTheme$sli = _context$muiTheme.slider,
      handleColorZero = _context$muiTheme$sli.handleColorZero,
      handleFillColor = _context$muiTheme$sli.handleFillColor,
      handleSize = _context$muiTheme$sli.handleSize,
      handleSizeDisabled = _context$muiTheme$sli.handleSizeDisabled,
      handleSizeActive = _context$muiTheme$sli.handleSizeActive,
      trackSize = _context$muiTheme$sli.trackSize,
      trackColor = _context$muiTheme$sli.trackColor,
      trackColorSelected = _context$muiTheme$sli.trackColorSelected,
      rippleColor = _context$muiTheme$sli.rippleColor,
      selectionColor = _context$muiTheme$sli.selectionColor;


  var fillGutter = handleSize / 2;
  var disabledGutter = trackSize + handleSizeDisabled / 2;
  var calcDisabledSpacing = disabled ? ' - ' + disabledGutter + 'px' : '';
  var percent = getPercent(state.value, min, max);
  var calculatedAxis = calculateAxis(axis, isRtl);

  var styles = {
    slider: (_slider = {
      touchCallout: 'none',
      userSelect: 'none',
      cursor: 'default'
    }, _defineProperty(_slider, crossAxisProperty[calculatedAxis], handleSizeActive), _defineProperty(_slider, mainAxisProperty[calculatedAxis], '100%'), _defineProperty(_slider, 'position', 'relative'), _defineProperty(_slider, 'marginTop', 24), _defineProperty(_slider, 'marginBottom', 48), _slider),
    track: (_track = {
      position: 'absolute'
    }, _defineProperty(_track, crossAxisOffsetProperty[calculatedAxis], (handleSizeActive - trackSize) / 2), _defineProperty(_track, mainAxisOffsetProperty[calculatedAxis], 0), _defineProperty(_track, mainAxisProperty[calculatedAxis], '100%'), _defineProperty(_track, crossAxisProperty[calculatedAxis], trackSize), _track),
    filledAndRemaining: (_filledAndRemaining = {
      directionInvariant: true,
      position: 'absolute'
    }, _defineProperty(_filledAndRemaining, crossAxisOffsetProperty, 0), _defineProperty(_filledAndRemaining, crossAxisProperty[calculatedAxis], '100%'), _defineProperty(_filledAndRemaining, 'transition', _transitions2.default.easeOut(null, 'margin')), _filledAndRemaining),
    handle: (_handle = {
      directionInvariant: true,
      boxSizing: 'border-box',
      position: 'absolute',
      cursor: 'pointer',
      pointerEvents: 'inherit'
    }, _defineProperty(_handle, crossAxisOffsetProperty[calculatedAxis], 0), _defineProperty(_handle, mainAxisOffsetProperty[calculatedAxis], percent === 0 ? '0%' : percent * 100 + '%'), _defineProperty(_handle, 'zIndex', 1), _defineProperty(_handle, 'margin', {
      x: trackSize / 2 + 'px 0 0 0',
      'x-reverse': trackSize / 2 + 'px 0 0 0',
      y: '0 0 0 ' + trackSize / 2 + 'px',
      'y-reverse': '0 0 0 ' + trackSize / 2 + 'px'
    }[calculatedAxis]), _defineProperty(_handle, 'width', handleSize), _defineProperty(_handle, 'height', handleSize), _defineProperty(_handle, 'backgroundColor', selectionColor), _defineProperty(_handle, 'backgroundClip', 'padding-box'), _defineProperty(_handle, 'border', '0px solid transparent'), _defineProperty(_handle, 'borderRadius', '50%'), _defineProperty(_handle, 'transform', {
      x: 'translate(-50%, -50%)',
      'x-reverse': 'translate(50%, -50%)',
      y: 'translate(-50%, 50%)',
      'y-reverse': 'translate(-50%, -50%)'
    }[calculatedAxis]), _defineProperty(_handle, 'transition', _transitions2.default.easeOut('450ms', 'background') + ', ' + _transitions2.default.easeOut('450ms', 'border-color') + ', ' + _transitions2.default.easeOut('450ms', 'width') + ', ' + _transitions2.default.easeOut('450ms', 'height')), _defineProperty(_handle, 'overflow', 'visible'), _defineProperty(_handle, 'outline', 'none'), _handle),
    handleWhenDisabled: {
      boxSizing: 'content-box',
      cursor: 'not-allowed',
      backgroundColor: trackColor,
      width: handleSizeDisabled,
      height: handleSizeDisabled,
      border: 'none'
    },
    handleWhenPercentZero: {
      border: trackSize + 'px solid ' + handleColorZero,
      backgroundColor: handleFillColor,
      boxShadow: 'none'
    },
    handleWhenPercentZeroAndDisabled: {
      cursor: 'not-allowed',
      width: handleSizeDisabled,
      height: handleSizeDisabled
    },
    handleWhenPercentZeroAndFocused: {
      border: trackSize + 'px solid ' + trackColorSelected
    },
    handleWhenActive: {
      width: handleSizeActive,
      height: handleSizeActive
    },
    ripple: {
      height: handleSize,
      width: handleSize,
      overflow: 'visible'
    },
    rippleWhenPercentZero: {
      top: -trackSize,
      left: -trackSize
    },
    rippleInner: {
      height: '300%',
      width: '300%',
      top: -handleSize,
      left: -handleSize
    },
    rippleColor: {
      fill: percent === 0 ? handleColorZero : rippleColor
    }
  };
  styles.filled = (0, _simpleAssign2.default)({}, styles.filledAndRemaining, (_objectAssign2 = {}, _defineProperty(_objectAssign2, mainAxisOffsetProperty[calculatedAxis], 0), _defineProperty(_objectAssign2, 'backgroundColor', disabled ? trackColor : selectionColor), _defineProperty(_objectAssign2, mainAxisMarginFromEnd[calculatedAxis], fillGutter), _defineProperty(_objectAssign2, mainAxisProperty[calculatedAxis], 'calc(' + percent * 100 + '%' + calcDisabledSpacing + ')'), _objectAssign2));
  styles.remaining = (0, _simpleAssign2.default)({}, styles.filledAndRemaining, (_objectAssign3 = {}, _defineProperty(_objectAssign3, reverseMainAxisOffsetProperty[calculatedAxis], 0), _defineProperty(_objectAssign3, 'backgroundColor', (state.hovered || state.focused) && !disabled ? trackColorSelected : trackColor), _defineProperty(_objectAssign3, mainAxisMarginFromStart[calculatedAxis], fillGutter), _defineProperty(_objectAssign3, mainAxisProperty[calculatedAxis], 'calc(' + (1 - percent) * 100 + '%' + calcDisabledSpacing + ')'), _objectAssign3));

  return styles;
};

var Slider = function (_Component) {
  _inherits(Slider, _Component);

  function Slider() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Slider);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Slider.__proto__ || Object.getPrototypeOf(Slider)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      active: false,
      dragging: false,
      focused: false,
      hovered: false,
      value: 0
    }, _this.track = null, _this.handle = null, _this.handleKeyDown = function (event) {
      var _this$props = _this.props,
          axis = _this$props.axis,
          min = _this$props.min,
          max = _this$props.max,
          step = _this$props.step;
      var isRtl = _this.context.muiTheme.isRtl;


      var calculatedAxis = calculateAxis(axis, isRtl);

      var action = void 0;

      switch ((0, _keycode2.default)(event)) {
        case 'page down':
        case 'down':
          if (calculatedAxis === 'y-reverse') {
            action = 'increase';
          } else {
            action = 'decrease';
          }
          break;
        case 'left':
          if (calculatedAxis === 'x-reverse') {
            action = 'increase';
          } else {
            action = 'decrease';
          }
          break;
        case 'page up':
        case 'up':
          if (calculatedAxis === 'y-reverse') {
            action = 'decrease';
          } else {
            action = 'increase';
          }
          break;
        case 'right':
          if (calculatedAxis === 'x-reverse') {
            action = 'decrease';
          } else {
            action = 'increase';
          }
          break;
        case 'home':
          action = 'min';
          break;
        case 'end':
          action = 'max';
          break;
      }

      if (action) {
        var newValue = void 0;

        // Cancel scroll
        event.preventDefault();

        switch (action) {
          case 'decrease':
            newValue = _this.state.value - step;
            break;
          case 'increase':
            newValue = _this.state.value + step;
            break;
          case 'min':
            newValue = min;
            break;
          case 'max':
            newValue = max;
            break;
        }

        // We need to use toFixed() because of float point errors.
        // For example, 0.01 + 0.06 = 0.06999999999999999
        newValue = parseFloat(newValue.toFixed(5));

        if (newValue > max) {
          newValue = max;
        } else if (newValue < min) {
          newValue = min;
        }

        if (_this.state.value !== newValue) {
          _this.setState({
            value: newValue
          });

          if (_this.props.onChange) {
            _this.props.onChange(event, newValue);
          }
        }
      }
    }, _this.handleDragMouseMove = function (event) {
      _this.onDragUpdate(event, 'mouse');
    }, _this.handleTouchMove = function (event) {
      _this.onDragUpdate(event, 'touch');
    }, _this.handleMouseEnd = function (event) {
      document.removeEventListener('mousemove', _this.handleDragMouseMove);
      document.removeEventListener('mouseup', _this.handleMouseEnd);

      _this.onDragStop(event);
    }, _this.handleTouchEnd = function (event) {
      document.removeEventListener('touchmove', _this.handleTouchMove);
      document.removeEventListener('touchup', _this.handleTouchEnd);
      document.removeEventListener('touchend', _this.handleTouchEnd);
      document.removeEventListener('touchcancel', _this.handleTouchEnd);

      _this.onDragStop(event);
    }, _this.handleTouchStart = function (event) {
      var _this$props2 = _this.props,
          axis = _this$props2.axis,
          disabled = _this$props2.disabled;
      var isRtl = _this.context.muiTheme.isRtl;


      if (disabled) {
        return;
      }

      var calculatedAxis = calculateAxis(axis, isRtl);

      var position = void 0;
      if (isMouseControlInverted(calculatedAxis)) {
        position = _this.getTrackOffset() - event.touches[0][mainAxisClientOffsetProperty[calculatedAxis]];
      } else {
        position = event.touches[0][mainAxisClientOffsetProperty[calculatedAxis]] - _this.getTrackOffset();
      }
      _this.setValueFromPosition(event, position);

      document.addEventListener('touchmove', _this.handleTouchMove);
      document.addEventListener('touchup', _this.handleTouchEnd);
      document.addEventListener('touchend', _this.handleTouchEnd);
      document.addEventListener('touchcancel', _this.handleTouchEnd);

      _this.onDragStart(event);

      // Cancel scroll and context menu
      event.preventDefault();
    }, _this.handleFocus = function (event) {
      _this.setState({
        focused: true
      });

      if (_this.props.onFocus) {
        _this.props.onFocus(event);
      }
    }, _this.handleBlur = function (event) {
      _this.setState({
        focused: false,
        active: false
      });

      if (_this.props.onBlur) {
        _this.props.onBlur(event);
      }
    }, _this.handleMouseDown = function (event) {
      var _this$props3 = _this.props,
          axis = _this$props3.axis,
          disabled = _this$props3.disabled;
      var isRtl = _this.context.muiTheme.isRtl;


      if (disabled) {
        return;
      }

      var calculatedAxis = calculateAxis(axis, isRtl);

      var position = void 0;
      if (isMouseControlInverted(calculatedAxis)) {
        position = _this.getTrackOffset() - event[mainAxisClientOffsetProperty[calculatedAxis]];
      } else {
        position = event[mainAxisClientOffsetProperty[calculatedAxis]] - _this.getTrackOffset();
      }
      _this.setValueFromPosition(event, position);

      document.addEventListener('mousemove', _this.handleDragMouseMove);
      document.addEventListener('mouseup', _this.handleMouseEnd);

      // Cancel text selection
      event.preventDefault();

      // Set focus manually since we called preventDefault()
      _this.handle.focus();

      _this.onDragStart(event);
    }, _this.handleMouseUp = function () {
      if (!_this.props.disabled) {
        _this.setState({
          active: false
        });
      }
    }, _this.handleMouseEnter = function () {
      _this.setState({
        hovered: true
      });
    }, _this.handleMouseLeave = function () {
      _this.setState({
        hovered: false
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Slider, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          valueProp = _props.value,
          defaultValue = _props.defaultValue,
          min = _props.min,
          max = _props.max;


      var value = valueProp;
      if (value === undefined) {
        value = defaultValue !== undefined ? defaultValue : min;
      }

      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }

      this.setState({
        value: value
      });
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.value !== undefined && !this.state.dragging) {
        this.setState({
          value: nextProps.value
        });
      }
    }
  }, {
    key: 'getValue',
    value: function getValue() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI Slider: getValue() method is deprecated.\n      Use the onChange callbacks instead.\n      It will be removed with v0.17.0.') : void 0;

      return this.state.value;
    }
  }, {
    key: 'clearValue',
    value: function clearValue() {
      process.env.NODE_ENV !== "production" ? (0, _warning2.default)(false, 'Material-UI Slider: clearValue() method is deprecated.\n      Use the value property to control the component instead.\n      It will be removed with v0.17.0.') : void 0;

      this.setState({
        value: this.props.min
      });
    }
  }, {
    key: 'getTrackOffset',
    value: function getTrackOffset() {
      var axis = this.props.axis;
      var isRtl = this.context.muiTheme.isRtl;


      var calculatedAxis = calculateAxis(axis, isRtl);

      return this.track.getBoundingClientRect()[mainAxisOffsetProperty[calculatedAxis]];
    }
  }, {
    key: 'onDragStart',
    value: function onDragStart(event) {
      this.setState({
        dragging: true,
        active: true
      });

      if (this.props.onDragStart) {
        this.props.onDragStart(event);
      }
    }
  }, {
    key: 'onDragUpdate',
    value: function onDragUpdate(event, type) {
      var _this2 = this;

      var _props2 = this.props,
          axis = _props2.axis,
          disabled = _props2.disabled;
      var isRtl = this.context.muiTheme.isRtl;


      if (this.dragRunning) {
        return;
      }
      this.dragRunning = true;

      requestAnimationFrame(function () {
        _this2.dragRunning = false;

        var calculatedAxis = calculateAxis(axis, isRtl);
        var source = type === 'touch' ? event.touches[0] : event;

        var position = void 0;
        if (isMouseControlInverted(calculatedAxis)) {
          position = _this2.getTrackOffset() - source[mainAxisClientOffsetProperty[calculatedAxis]];
        } else {
          position = source[mainAxisClientOffsetProperty[calculatedAxis]] - _this2.getTrackOffset();
        }

        if (!disabled) {
          _this2.setValueFromPosition(event, position);
        }
      });
    }
  }, {
    key: 'onDragStop',
    value: function onDragStop(event) {
      this.setState({
        dragging: false,
        active: false
      });

      if (this.props.onDragStop) {
        this.props.onDragStop(event);
      }
    }
  }, {
    key: 'setValueFromPosition',
    value: function setValueFromPosition(event, position) {
      var _props3 = this.props,
          axis = _props3.axis,
          step = _props3.step,
          min = _props3.min,
          max = _props3.max;
      var isRtl = this.context.muiTheme.isRtl;


      var calculatedAxis = calculateAxis(axis, isRtl);
      var positionMax = this.track[mainAxisClientProperty[calculatedAxis]];

      var value = void 0;

      if (position <= 0) {
        value = min;
      } else if (position >= positionMax) {
        value = max;
      } else {
        value = position / positionMax * (max - min);
        value = Math.round(value / step) * step + min;
        value = parseFloat(value.toFixed(5));
      }

      if (this.state.value !== value) {
        this.setState({
          value: value
        });

        if (this.props.onChange) {
          this.props.onChange(event, value);
        }
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props4 = this.props,
          axis = _props4.axis,
          disabled = _props4.disabled,
          disableFocusRipple = _props4.disableFocusRipple,
          max = _props4.max,
          min = _props4.min,
          name = _props4.name,
          onBlur = _props4.onBlur,
          onChange = _props4.onChange,
          onDragStart = _props4.onDragStart,
          onDragStop = _props4.onDragStop,
          onFocus = _props4.onFocus,
          required = _props4.required,
          sliderStyle = _props4.sliderStyle,
          step = _props4.step,
          style = _props4.style,
          propValue = _props4.value,
          other = _objectWithoutProperties(_props4, ['axis', 'disabled', 'disableFocusRipple', 'max', 'min', 'name', 'onBlur', 'onChange', 'onDragStart', 'onDragStop', 'onFocus', 'required', 'sliderStyle', 'step', 'style', 'value']);

      var _state = this.state,
          active = _state.active,
          focused = _state.focused,
          hovered = _state.hovered,
          value = _state.value;
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context, this.state);
      var percent = getPercent(value, min, max);

      var handleStyles = {};
      if (percent === 0) {
        handleStyles = (0, _simpleAssign2.default)({}, styles.handle, styles.handleWhenPercentZero, active && styles.handleWhenActive, (hovered || focused) && !disabled && styles.handleWhenPercentZeroAndFocused, disabled && styles.handleWhenPercentZeroAndDisabled);
      } else {
        handleStyles = (0, _simpleAssign2.default)({}, styles.handle, active && styles.handleWhenActive, disabled && styles.handleWhenDisabled);
      }

      var rippleStyle = (0, _simpleAssign2.default)({}, styles.ripple, percent === 0 && styles.rippleWhenPercentZero);

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)({}, style)) }),
        _react2.default.createElement(
          'div',
          {
            style: prepareStyles((0, _simpleAssign2.default)({}, styles.slider, sliderStyle)),
            onFocus: this.handleFocus,
            onBlur: this.handleBlur,
            onMouseDown: this.handleMouseDown,
            onMouseEnter: this.handleMouseEnter,
            onMouseLeave: this.handleMouseLeave,
            onMouseUp: this.handleMouseUp,
            onTouchStart: this.handleTouchStart,
            onKeyDown: !disabled && this.handleKeyDown
          },
          _react2.default.createElement(
            'div',
            { ref: function ref(node) {
                return _this3.track = node;
              }, style: prepareStyles(styles.track) },
            _react2.default.createElement('div', { style: prepareStyles(styles.filled) }),
            _react2.default.createElement('div', { style: prepareStyles(styles.remaining) }),
            _react2.default.createElement(
              'div',
              {
                ref: function ref(node) {
                  return _this3.handle = node;
                },
                style: prepareStyles(handleStyles),
                tabIndex: 0
              },
              !disabled && !disableFocusRipple && _react2.default.createElement(_FocusRipple2.default, {
                style: rippleStyle,
                innerStyle: styles.rippleInner,
                show: (hovered || focused) && !active,
                color: styles.rippleColor.fill
              })
            )
          )
        ),
        _react2.default.createElement('input', {
          type: 'hidden',
          name: name,
          value: value,
          required: required,
          min: min,
          max: max,
          step: step
        })
      );
    }
  }]);

  return Slider;
}(_react.Component);

Slider.propTypes = {
  /**
   * The axis on which the slider will slide.
   */
  axis: _propTypes2.default.oneOf(['x', 'x-reverse', 'y', 'y-reverse']),
  /**
   * The default value of the slider.
   */
  defaultValue: valueInRangePropType,
  /**
   * Disables focus ripple if set to true.
   */
  disableFocusRipple: _propTypes2.default.bool,
  /**
   * If true, the slider will not be interactable.
   */
  disabled: _propTypes2.default.bool,
  /**
   * The maximum value the slider can slide to on
   * a scale from 0 to 1 inclusive. Cannot be equal to min.
   */
  max: minMaxPropType,
  /**
   * The minimum value the slider can slide to on a scale
   * from 0 to 1 inclusive. Cannot be equal to max.
   */
  min: minMaxPropType,
  /**
   * The name of the slider. Behaves like the name attribute
   * of an input element.
   */
  name: _propTypes2.default.string,
  /** @ignore */
  onBlur: _propTypes2.default.func,
  /**
   * Callback function that is fired when the slider's value changed.
   *
   * @param {object} event KeyDown event targeting the slider.
   * @param {number} newValue The new value of the slider.
   */
  onChange: _propTypes2.default.func,
  /**
   * Callback function that is fired when the slider has begun to move.
   *
   * @param {object} event MouseDown or TouchStart event targeting the slider.
   */
  onDragStart: _propTypes2.default.func,
  /**
   * Callback function that is fired when the slide has stopped moving.
   *
   * @param {object} event MouseEnd or TouchEnd event targeting the slider.
   */
  onDragStop: _propTypes2.default.func,
  /** @ignore */
  onFocus: _propTypes2.default.func,
  /**
   * Whether or not the slider is required in a form.
   */
  required: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the inner slider element.
   */
  sliderStyle: _propTypes2.default.object,
  /**
   * The granularity the slider can step through values.
   */
  step: _propTypes2.default.number,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * The value of the slider.
   */
  value: valueInRangePropType
};
Slider.defaultProps = {
  axis: 'x',
  disabled: false,
  disableFocusRipple: false,
  max: 1,
  min: 0,
  required: true,
  step: 0.01,
  style: {}
};
Slider.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = Slider;