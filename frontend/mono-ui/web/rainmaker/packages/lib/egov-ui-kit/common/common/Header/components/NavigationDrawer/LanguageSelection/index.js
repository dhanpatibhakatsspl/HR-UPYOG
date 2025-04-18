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

var _components = require("components");

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LanguageSelection = function (_Component) {
  (0, _inherits3.default)(LanguageSelection, _Component);

  function LanguageSelection() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, LanguageSelection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = LanguageSelection.__proto__ || Object.getPrototypeOf(LanguageSelection)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      value: (0, _localStorageUtils.getLocale)()
    }, _this.onClick = function (value) {
      _this.setState({ value: value });
      _this.props.fetchLocalizationLabel(value);
    }, _this.styles = {
      selectedLabelStyle: {
        color: "#ffffff"
      },
      selectedStyle: {
        backgroundColor: "#fe7a51",
        border: "1px solid #fe7a51"
      },
      defaultStyle: {
        border: "1px solid #fe7a51",
        borderRadius: "1px",
        marginRight: "4.65%",
        height: "30px",
        lineHeight: "30px",
        width: "28.48%",
        minWidth: "inherit",
        padding: 0
      },
      defaultLabelStyle: {
        textTransform: "none",
        fontWeight: "500",
        color: "#484848",
        verticalAlign: "initial",
        padding: 0
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(LanguageSelection, [{
    key: "render",
    value: function render() {
      var styles = this.styles,
          onClick = this.onClick;
      var languages = this.props.languages;
      var value = this.state.value;

      return (
        // <div className="drawer-button-toggle-container">
        _react2.default.createElement(
          "div",
          { className: "rainmaker-displayInline", style: { marginTop: 10, marginLeft: 4 } },
          _react2.default.createElement(_components.Icon, { style: { height: "24px", width: "21px" }, action: "action", name: "language" }),
          _react2.default.createElement(
            "div",
            { style: { marginLeft: 12, width: "100%" } },
            _react2.default.createElement(_translationNode2.default, {
              className: "menuStyle with-childs",
              containerStyle: { marginLeft: 0, marginBottom: 10, marginRight: 80 },
              label: "ACTION_TEST_LANGUAGE",
              color: "rgba(0, 0, 0, 0.87)"
            }),
            _react2.default.createElement(_components.ButtonGroup, {
              items: languages,
              onClick: onClick,
              selected: value,
              defaultStyle: styles.defaultStyle,
              defaultLabelStyle: styles.defaultLabelStyle,
              selectedStyle: styles.selectedStyle,
              selectedLabelStyle: styles.selectedLabelStyle,
              multiple: false
            })
          )
        )
      );
    }
  }]);
  return LanguageSelection;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref2) {
  var common = _ref2.common;
  var stateInfoById = common.stateInfoById;

  var languages = (0, _get2.default)(stateInfoById, "0.languages", []);
  return { languages: languages };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(LanguageSelection);