'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _simpleAssign = require('simple-assign');

var _simpleAssign2 = _interopRequireDefault(_simpleAssign);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _transitions = require('../styles/transitions');

var _transitions2 = _interopRequireDefault(_transitions);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context) {
  var _context$muiTheme = context.muiTheme,
      inkBar = _context$muiTheme.inkBar,
      isRtl = _context$muiTheme.isRtl;


  return {
    root: {
      left: props.left,
      width: props.width,
      bottom: 0,
      display: 'block',
      backgroundColor: props.color || inkBar.backgroundColor,
      height: 2,
      marginTop: -2,
      position: 'relative',
      transition: _transitions2.default.easeOut('1s', isRtl ? 'right' : 'left')
    }
  };
}

var InkBar = function (_Component) {
  _inherits(InkBar, _Component);

  function InkBar() {
    _classCallCheck(this, InkBar);

    return _possibleConstructorReturn(this, (InkBar.__proto__ || Object.getPrototypeOf(InkBar)).apply(this, arguments));
  }

  _createClass(InkBar, [{
    key: 'render',
    value: function render() {
      var style = this.props.style;
      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      return _react2.default.createElement('div', { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) });
    }
  }]);

  return InkBar;
}(_react.Component);

InkBar.propTypes = {
  color: _propTypes2.default.string,
  left: _propTypes2.default.string.isRequired,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  width: _propTypes2.default.string.isRequired
};
InkBar.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = InkBar;