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

var _Avatar = require('../Avatar');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function getStyles(props, context) {
  var card = context.muiTheme.card;


  return {
    root: {
      padding: 16,
      fontWeight: card.fontWeight,
      boxSizing: 'border-box',
      position: 'relative',
      whiteSpace: 'nowrap'
    },
    text: {
      display: 'inline-block',
      verticalAlign: 'top',
      whiteSpace: 'normal',
      paddingRight: '90px'
    },
    avatar: {
      marginRight: 16
    },
    title: {
      color: props.titleColor || card.titleColor,
      display: 'block',
      fontSize: 15
    },
    subtitle: {
      color: props.subtitleColor || card.subtitleColor,
      display: 'block',
      fontSize: 14
    }
  };
}

var CardHeader = function (_Component) {
  _inherits(CardHeader, _Component);

  function CardHeader() {
    _classCallCheck(this, CardHeader);

    return _possibleConstructorReturn(this, (CardHeader.__proto__ || Object.getPrototypeOf(CardHeader)).apply(this, arguments));
  }

  _createClass(CardHeader, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          actAsExpander = _props.actAsExpander,
          avatarProp = _props.avatar,
          children = _props.children,
          closeIcon = _props.closeIcon,
          expandable = _props.expandable,
          openIcon = _props.openIcon,
          showExpandableButton = _props.showExpandableButton,
          style = _props.style,
          subtitle = _props.subtitle,
          subtitleColor = _props.subtitleColor,
          subtitleStyle = _props.subtitleStyle,
          textStyle = _props.textStyle,
          title = _props.title,
          titleColor = _props.titleColor,
          titleStyle = _props.titleStyle,
          iconStyle = _props.iconStyle,
          other = _objectWithoutProperties(_props, ['actAsExpander', 'avatar', 'children', 'closeIcon', 'expandable', 'openIcon', 'showExpandableButton', 'style', 'subtitle', 'subtitleColor', 'subtitleStyle', 'textStyle', 'title', 'titleColor', 'titleStyle', 'iconStyle']);

      var prepareStyles = this.context.muiTheme.prepareStyles;

      var styles = getStyles(this.props, this.context);

      var avatar = avatarProp;

      if ((0, _react.isValidElement)(avatarProp)) {
        avatar = _react2.default.cloneElement(avatar, {
          style: (0, _simpleAssign2.default)(styles.avatar, avatar.props.style)
        });
      } else if (avatar !== null) {
        avatar = _react2.default.createElement(_Avatar2.default, { src: avatarProp, style: styles.avatar });
      }

      return _react2.default.createElement(
        'div',
        _extends({}, other, { style: prepareStyles((0, _simpleAssign2.default)(styles.root, style)) }),
        avatar,
        _react2.default.createElement(
          'div',
          { style: prepareStyles((0, _simpleAssign2.default)(styles.text, textStyle)) },
          _react2.default.createElement(
            'span',
            { style: prepareStyles((0, _simpleAssign2.default)(styles.title, titleStyle)) },
            title
          ),
          _react2.default.createElement(
            'span',
            { style: prepareStyles((0, _simpleAssign2.default)(styles.subtitle, subtitleStyle)) },
            subtitle
          )
        ),
        children
      );
    }
  }]);

  return CardHeader;
}(_react.Component);

CardHeader.muiName = 'CardHeader';
CardHeader.propTypes = {
  /**
   * If true, a click on this card component expands the card.
   */
  actAsExpander: _propTypes2.default.bool,
  /**
   * This is the [Avatar](/#/components/avatar) element to be displayed on the Card Header.
   * If `avatar` is an `Avatar` or other element, it will be rendered.
   * If `avatar` is a string, it will be used as the image `src` for an `Avatar`.
   */
  avatar: _propTypes2.default.node,
  /**
   * Can be used to render elements inside the Card Header.
   */
  children: _propTypes2.default.node,
  /**
   * Can be used to pass a closeIcon if you don't like the default expandable close Icon.
   */
  closeIcon: _propTypes2.default.node,
  /**
   * If true, this card component is expandable.
   */
  expandable: _propTypes2.default.bool,
  /**
   * Override the iconStyle of the Icon Button.
   */
  iconStyle: _propTypes2.default.object,
  /**
   * Can be used to pass a openIcon if you don't like the default expandable open Icon.
   */
  openIcon: _propTypes2.default.node,
  /**
   * If true, this card component will include a button to expand the card.
   */
  showExpandableButton: _propTypes2.default.bool,
  /**
   * Override the inline-styles of the root element.
   */
  style: _propTypes2.default.object,
  /**
   * Can be used to render a subtitle in Card Header.
   */
  subtitle: _propTypes2.default.node,
  /**
   * Override the subtitle color.
   */
  subtitleColor: _propTypes2.default.string,
  /**
   * Override the inline-styles of the subtitle.
   */
  subtitleStyle: _propTypes2.default.object,
  /**
   * Override the inline-styles of the text.
   */
  textStyle: _propTypes2.default.object,
  /**
   * Can be used to render a title in Card Header.
   */
  title: _propTypes2.default.node,
  /**
   * Override the title color.
   */
  titleColor: _propTypes2.default.string,
  /**
   * Override the inline-styles of the title.
   */
  titleStyle: _propTypes2.default.object
};
CardHeader.defaultProps = {
  avatar: null
};
CardHeader.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
exports.default = CardHeader;