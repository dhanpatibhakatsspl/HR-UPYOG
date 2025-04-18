"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _reactRedux = require("react-redux");

require("./index.css");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _Digit_logo = require("egov-ui-kit/assets/images/Digit_logo.png");

var _Digit_logo2 = _interopRequireDefault(_Digit_logo);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-kit/redux/app/actions");

var _Header = require("egov-ui-kit/common/common/Header");

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import AppBar from "@material-ui/core/AppBar";
var getUlbGradeLabel = function getUlbGradeLabel(ulbGrade) {
  if (ulbGrade) {
    var ulbWiseHeaderName = ulbGrade.toUpperCase();
    if (ulbWiseHeaderName.indexOf(" ") > 0) {
      ulbWiseHeaderName = ulbWiseHeaderName.split(" ").join("_");
    }
    return "ULBGRADE" + "_" + ulbWiseHeaderName;
  }
};

var HeaderContainer = function (_React$Component) {
  (0, _inherits3.default)(HeaderContainer, _React$Component);

  function HeaderContainer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, HeaderContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = HeaderContainer.__proto__ || Object.getPrototypeOf(HeaderContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      languageSelected: (0, _localStorageUtils.getLocale)(),
      toggleMenu: false
    }, _this.style = {
      headerStyle: {
        marginLeft: "-16px",
        paddingTop: "1px"
      }
    }, _this.onLanguageChange = function (event, index, value) {
      //const {setRote} = this.props;
      _this.setState({ languageSelected: value });
      var tenantId = (0, _localStorageUtils.getTenantId)();

      // if (process.env.REACT_APP_NAME === "Citizen") {
      //   const tenantInfo = getQueryArg(window.location.href, "tenantId");
      //   const userInfo = JSON.parse(getUserInfo());
      //   tenantId = userInfo && userInfo.permanentCity;
      //   tenantId = tenantInfo ? tenantInfo : tenantId;
      // }
      _this.props.fetchLocalizationLabel(value, tenantId, tenantId);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(HeaderContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          msevaLogo = _props.msevaLogo,
          defaultTitle = _props.defaultTitle,
          ulbName = _props.ulbName,
          hasLocalisation = _props.hasLocalisation,
          languages = _props.languages,
          fetchLocalizationLabel = _props.fetchLocalizationLabel,
          rest = (0, _objectWithoutProperties3.default)(_props, ["msevaLogo", "defaultTitle", "ulbName", "hasLocalisation", "languages", "fetchLocalizationLabel"]);

      var options = { isHomeScreen: true, hideBackButton: true };
      var style = this.style;

      return _react2.default.createElement(_Header2.default, (0, _extends3.default)({
        hasLocalisation: true,
        className: "rainmaker-header",
        options: options,
        role: "employee",
        isUserSetting: false,
        headerStyle: style.headerStyle,
        msevaLogo: msevaLogo,
        defaultTitle: defaultTitle
      }, rest));
    }
  }]);
  return HeaderContainer;
}(_react2.default.Component);

exports.default = HeaderContainer;