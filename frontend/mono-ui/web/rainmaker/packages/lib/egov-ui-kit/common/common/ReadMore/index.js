"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ReadMore = function (_React$Component) {
  (0, _inherits3.default)(ReadMore, _React$Component);

  function ReadMore(props) {
    (0, _classCallCheck3.default)(this, ReadMore);

    var _this = (0, _possibleConstructorReturn3.default)(this, (ReadMore.__proto__ || Object.getPrototypeOf(ReadMore)).call(this, props));

    _this.state = {
      charLimit: props.charLimit
    };
    _this.initialState = _this.state;
    return _this;
  }

  (0, _createClass3.default)(ReadMore, [{
    key: "getReadMoreContent",
    value: function getReadMoreContent() {
      var charLimit = this.state.charLimit;
      var _props = this.props,
          children = _props.children,
          readMoreText = _props.readMoreText,
          readLessText = _props.readLessText,
          containerStyle = _props.containerStyle;

      if (children.length > charLimit) {
        return _react2.default.createElement(
          "span",
          { className: "short-text", style: containerStyle },
          children.substr(0, charLimit),
          "...",
          _react2.default.createElement(
            "div",
            { onClick: this.showLongText.bind(this) },
            _react2.default.createElement(_translationNode2.default, { label: readMoreText, labelStyle: { color: "#007bff", cursor: "pointer" } })
          )
        );
      } else if (children.length < charLimit) {
        return _react2.default.createElement(
          "span",
          { className: "short-text", style: containerStyle },
          children
        );
      }
      return _react2.default.createElement(
        "span",
        { className: "short-text", style: containerStyle },
        children,
        _react2.default.createElement(
          "div",
          { onClick: this.showShortText.bind(this) },
          _react2.default.createElement(_translationNode2.default, { label: readLessText, labelStyle: { color: "#007bff", cursor: "pointer" } })
        )
      );
    }
  }, {
    key: "showLongText",
    value: function showLongText() {
      var children = this.props.children;

      this.setState({ charLimit: children.length });
      this.getReadMoreContent();
    }
  }, {
    key: "showShortText",
    value: function showShortText() {
      this.setState(this.initialState);
      this.getReadMoreContent();
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "div",
        null,
        this.getReadMoreContent()
      );
    }
  }]);
  return ReadMore;
}(_react2.default.Component);

ReadMore.propTypes = {
  charLimit: _propTypes2.default.number,
  readMoreText: _propTypes2.default.string,
  readLessText: _propTypes2.default.string,
  children: _propTypes2.default.string.isRequired
};
ReadMore.defaultProps = {
  charLimit: 150,
  readMoreText: "Read more",
  readLessText: "Read less"
};
exports.default = ReadMore;