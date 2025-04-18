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

var _components = require("components");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _Digit_logo = require("egov-ui-kit/assets/images/Digit_logo.png");

var _Digit_logo2 = _interopRequireDefault(_Digit_logo);

var _msevaPunjab = require("egov-ui-kit/assets/images/mseva-punjab.png");

var _msevaPunjab2 = _interopRequireDefault(_msevaPunjab);

var _actions = require("egov-ui-kit/redux/app/actions");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _Toolbar = require("material-ui/Toolbar");

var _Toolbar2 = _interopRequireDefault(_Toolbar);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _commons3 = require("../utils/commons");

var _localStorageUtils2 = require("../utils/localStorageUtils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getUlbGradeLabel = function getUlbGradeLabel(ulbGrade) {
  if (ulbGrade) {
    var ulbWiseHeaderName = ulbGrade.toUpperCase();
    if (ulbWiseHeaderName.indexOf(" ") > 0) {
      ulbWiseHeaderName = ulbWiseHeaderName.split(" ").join("_");
    }
    return "ULBGRADE" + "_" + ulbWiseHeaderName;
  }
};
// import AppBar from "@material-ui/core/AppBar";


var withoutAuthorization = function withoutAuthorization(redirectionUrl) {
  return function (Component) {
    var Wrapper = function (_React$Component) {
      (0, _inherits3.default)(Wrapper, _React$Component);

      function Wrapper() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, Wrapper);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
          languageSelected: (0, _localStorageUtils.getLocale)() || "en_IN"
        }, _this.style = {
          baseStyle: {
            background: "#ffffff",
            height: "65px",
            marginRight: "30px",
            width: "98px",
            marginBottom: "24px"
          },
          label: {
            color: "#5F5C57",
            fontSize: "12px",
            paddingRight: "0px"
          },
          arrowIconStyle: {
            marginTop: "7px",
            marginLeft: "10px"
          },
          iconStyle: {
            marginRight: "30px"
          },
          listStyle: {
            display: "block"
          },
          listInnerDivStyle: {
            padding: "10px",
            display: "flex",
            alignItems: "center"
          },
          baseTenantStyle: {
            background: "#ffffff",
            height: "65px",
            marginRight: "30px",
            width: "120px",
            marginBottom: "24px"
          },
          titleStyle: { fontSize: "20px", fontWeight: 500 },
          headerStyle: {
            position: "absolute",
            width: "100%"
          }
        }, _this.onLanguageChange = function (event, index, value) {
          //const {setRote} = this.props;
          _this.setState({ languageSelected: value });
          var tenantId = (0, _localStorageUtils.getTenantId)();

          if (process.env.REACT_APP_NAME === "Citizen") {
            var tenantInfo = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
            var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
            tenantId = userInfo && userInfo.permanentCity;
            tenantId = tenantInfo ? tenantInfo : tenantId;
          }
          var resetList = [];
          var newList = JSON.stringify(resetList);
          (0, _localStorageUtils.setStoredModulesList)(newList);
          var locale = (0, _localStorageUtils.getLocale)();
          var resultArray = [];
          (0, _actions.setLocalizationLabels)(locale, resultArray);
          _this.props.fetchLocalizationLabel(value, tenantId, tenantId);
        }, _this.checkForPublicSeach = function () {
          return (0, _commons.isPublicSearch)();
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
      }

      (0, _createClass3.default)(Wrapper, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          if (this.props.authenticated && !(0, _commons.isPublicSearch)()) {
            if (!this.props.isOpenLink) {
              this.props.history.push(redirectionUrl);
            }
          }
          (0, _localStorageUtils2.setModule)((0, _commons3.getModuleName)());
          var locale = (0, _commons2.getQueryArg)(window.location.href, "locale") || "en_IN";
          if ((0, _commons.isPublicSearch)() && locale !== "en_IN") {
            (0, _localStorageUtils.setLocale)(locale);
            this.onLanguageChange(locale);
          }
        }
      }, {
        key: "render",
        value: function render() {
          var _props = this.props,
              isOpenLink = _props.isOpenLink,
              ulbLogo = _props.ulbLogo,
              defaultTitle = _props.defaultTitle,
              ulbName = _props.ulbName,
              hasLocalisation = _props.hasLocalisation,
              languages = _props.languages,
              rest = (0, _objectWithoutProperties3.default)(_props, ["isOpenLink", "ulbLogo", "defaultTitle", "ulbName", "hasLocalisation", "languages"]);
          var languageSelected = this.state.languageSelected;

          var isPublicSearch = this.checkForPublicSeach();
          var logoClassName = isPublicSearch ? "citizen-header-logo public-search-logo" : "citizen-header-logo";
          var style = this.style;

          return _react2.default.createElement(
            "div",
            null,
            isOpenLink ? _react2.default.createElement(
              "div",
              { className: "rainmaker-header-cont", style: isPublicSearch ? style.headerStyle : { position: "relative" } },
              _react2.default.createElement(
                "div",
                { style: { lineHeight: "64px" } },
                _react2.default.createElement(
                  _components.AppBar,
                  (0, _extends3.default)({
                    className: "rainmaker-header",
                    title: _react2.default.createElement(
                      "div",
                      { className: "citizen-header-logo-label" },
                      _react2.default.createElement(
                        "div",
                        { className: logoClassName },
                        _react2.default.createElement("img", { src: ulbLogo ? ulbLogo : pbLogo, onError: function onError(event) {
                            return event.target.setAttribute("src", pbLogo);
                          } })
                      ),
                      !isPublicSearch && _react2.default.createElement(
                        "div",
                        { className: "rainmaker-displayInline" },
                        _react2.default.createElement(_translationNode2.default, {
                          containerStyle: { marginLeft: "10px" },
                          className: "screenHeaderLabelStyle appbar-municipal-label",
                          label: ulbName && "TENANT_TENANTS_" + ulbName.toUpperCase().replace(/[.]/g, "_")
                        }),
                        _react2.default.createElement(_translationNode2.default, {
                          containerStyle: { marginLeft: "4px" },
                          className: "screenHeaderLabelStyle appbar-municipal-label",
                          label: defaultTitle
                        })
                      )
                    ),
                    titleStyle: style.titleStyle
                  }, rest),
                  _react2.default.createElement(
                    _Toolbar2.default,
                    { className: "app-toolbar", style: { padding: "0px", height: "64px", background: "#ffffff" } },
                    hasLocalisation && _react2.default.createElement(
                      "div",
                      { className: "userSettingsContainer" },
                      _react2.default.createElement(_components.DropDown, {
                        onChange: this.onLanguageChange,
                        listStyle: style.listStyle,
                        style: style.baseStyle,
                        labelStyle: style.label,
                        dropDownData: languages,
                        value: languageSelected,
                        underlineStyle: { borderBottom: "none" }
                      })
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "appbar-right-logo" },
                    _react2.default.createElement("img", { src: _Digit_logo2.default })
                  )
                )
              ),
              _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(Component, this.props)
              )
            ) : _react2.default.createElement(Component, this.props)
          );
        }
      }]);
      return Wrapper;
    }(_react2.default.Component);

    var mapStateToProps = function mapStateToProps(state) {
      var authenticated = state.auth.authenticated;

      var _ref2 = state.common || [],
          stateInfoById = _ref2.stateInfoById;

      var hasLocalisation = false;
      var defaultUrl = process.env.REACT_APP_NAME === "Citizen" ? "/user/register" : "/user/login";
      var isOpenLink = window.location.pathname.includes("openlink") || window.location.pathname.includes("withoutAuth");
      var cities = state.common.cities || [];
      var tenantId = (0, _localStorageUtils.getTenantId)() || process.env.REACT_APP_DEFAULT_TENANT_ID;
      var userTenant = cities && cities.filter(function (item) {
        return item.code === tenantId;
      });
      var ulbGrade = userTenant && (0, _get2.default)(userTenant[0], "city.ulbGrade");
      var ulbName = userTenant && (0, _get2.default)(userTenant[0], "code");
      var defaultTitle = ulbGrade && getUlbGradeLabel(ulbGrade);
      var ulbLogo = (0, _commons.isPublicSearch)() ? _msevaPunjab2.default : userTenant.length > 0 ? (0, _get2.default)(userTenant[0], "logoId") : "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb.amritsar/logo.png";
      if (stateInfoById && stateInfoById.length > 0) {
        hasLocalisation = stateInfoById[0].hasLocalisation;
        defaultUrl = stateInfoById[0].defaultUrl;
      }
      var languages = (0, _get2.default)(stateInfoById, "0.languages", []);

      return { authenticated: authenticated, hasLocalisation: hasLocalisation, defaultUrl: defaultUrl, isOpenLink: isOpenLink, ulbLogo: ulbLogo, ulbName: ulbName, defaultTitle: defaultTitle, languages: languages };
    };
    var mapDispatchToProps = function mapDispatchToProps(dispatch) {
      return {
        // logout: () => dispatch(logout()),
        fetchLocalizationLabel: function fetchLocalizationLabel(locale, tenants, tenant) {
          return dispatch((0, _actions.fetchLocalizationLabel)(locale, tenants, tenant));
        }
        // updateActiveRoute: (routepath, menuName) => dispatch(updateActiveRoute(routepath, menuName)),
      };
    };

    return (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Wrapper);
  };
};

exports.default = withoutAuthorization;