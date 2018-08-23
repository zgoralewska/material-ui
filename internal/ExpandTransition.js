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

var _TransitionGroup = require('react-transition-group/TransitionGroup');

var _TransitionGroup2 = _interopRequireDefault(_TransitionGroup);

var _ExpandTransitionChild = require('./ExpandTransitionChild');

var _ExpandTransitionChild2 = _interopRequireDefault(_ExpandTransitionChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ExpandTransition = function (_Component) {
  _inherits(ExpandTransition, _Component);

  function ExpandTransition() {
    _classCallCheck(this, ExpandTransition);

    return _possibleConstructorReturn(this, (ExpandTransition.__proto__ || Object.getPrototypeOf(ExpandTransition)).apply(this, arguments));
  }

  _createClass(ExpandTransition, [{
    key: 'renderChildren',
    value: function renderChildren(children) {
      var _props = this.props,
          enterDelay = _props.enterDelay,
          transitionDelay = _props.transitionDelay,
          transitionDuration = _props.transitionDuration,
          expandTransitionChildStyle = _props.expandTransitionChildStyle;

      return _react2.default.Children.map(children, function (child) {
        return _react2.default.createElement(
          _ExpandTransitionChild2.default,
          {
            enterDelay: enterDelay,
            transitionDelay: transitionDelay,
            transitionDuration: transitionDuration,
            key: child.key,
            style: expandTransitionChildStyle
          },
          child
        );
      }, this);
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          children = _props2.children,
          enterDelay = _props2.enterDelay,
          loading = _props2.loading,
          open = _props2.open,
          style = _props2.style,
          transitionDelay = _props2.transitionDelay,
          transitionDuration = _props2.transitionDuration,
          expandTransitionChildStyle = _props2.expandTransitionChildStyle,
          other = _objectWithoutProperties(_props2, ['children', 'enterDelay', 'loading', 'open', 'style', 'transitionDelay', 'transitionDuration', 'expandTransitionChildStyle']);

      var prepareStyles = this.context.muiTheme.prepareStyles;


      var mergedRootStyles = (0, _simpleAssign2.default)({}, {
        position: 'relative',
        overflow: 'hidden',
        height: 'auto'
      }, style);

      var newChildren = loading ? [] : this.renderChildren(children);

      return _react2.default.createElement(
        _TransitionGroup2.default,
        _extends({
          style: prepareStyles(mergedRootStyles),
          component: 'div'
        }, other),
        open && newChildren
      );
    }
  }]);

  return ExpandTransition;
}(_react.Component);

ExpandTransition.propTypes = {
  children: _propTypes2.default.node,
  enterDelay: _propTypes2.default.number,
  expandTransitionChildStyle: _propTypes2.default.object,
  loading: _propTypes2.default.bool,
  open: _propTypes2.default.bool,
  style: _propTypes2.default.object,
  transitionDelay: _propTypes2.default.number,
  transitionDuration: _propTypes2.default.number
};
ExpandTransition.defaultProps = {
  enterDelay: 0,
  transitionDelay: 0,
  transitionDuration: 450,
  loading: false,
  open: false
};
ExpandTransition.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = ExpandTransition;