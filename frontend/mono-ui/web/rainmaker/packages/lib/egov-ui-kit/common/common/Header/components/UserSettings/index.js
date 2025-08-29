"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _download = require("egov-ui-kit/assets/images/download.png");

var _download2 = _interopRequireDefault(_download);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _LogoutDialog = require("../LogoutDialog");

var _LogoutDialog2 = _interopRequireDefault(_LogoutDialog);

var _commons2 = require("egov-ui-kit/utils/commons");

var _commonMenuItems = require("../NavigationDrawer/commonMenuItems");

var _ClickAwayListener = require("@material-ui/core/ClickAwayListener");

var _ClickAwayListener2 = _interopRequireDefault(_ClickAwayListener);

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-kit/redux/app/actions");

var _api = require("../../../../../utils/api");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var UserSettings = function (_Component) {
  (0, _inherits3.default)(UserSettings, _Component);

  function UserSettings() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, UserSettings);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = UserSettings.__proto__ || Object.getPrototypeOf(UserSettings)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      languageSelected: (0, _localStorageUtils.getLocale)(),
      displayAccInfo: false,
      tenantSelected: (0, _localStorageUtils.getTenantId)(),
      tempTenantSelected: (0, _localStorageUtils.getTenantId)(),
      open: false,
      profilePic: null
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
        width: "102px",
        marginBottom: "24px"
      }
    }, _this.fetchUserPhoto = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var userInfo, tenantId, uuid, userPayload, photoId, fileResponse, fileUrl;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              userInfo = _this.props.userInfo;

              console.log("user6661", userInfo);
              tenantId = userInfo.tenantId;
              uuid = userInfo.uuid;

              if (!(!uuid || !tenantId)) {
                _context.next = 7;
                break;
              }

              return _context.abrupt("return");

            case 7:
              _context.next = 9;
              return (0, _api.httpRequest)("/user/_search", "search", [], {
                uuid: [uuid],
                tenantId: tenantId
              });

            case 9:
              userPayload = _context.sent;

              console.log("userPayyyy", userPayload);
              photoId = userPayload.user[0].photo;

              if (photoId) {
                _context.next = 14;
                break;
              }

              return _context.abrupt("return");

            case 14:
              _context.next = 16;
              return (0, _api.httpRequest)("/filestore/v1/files/url", "", [{ key: "tenantId", value: "pg" }, { key: "fileStoreIds", value: photoId }], {}, {}, {}, true, true);

            case 16:
              fileResponse = _context.sent;

              console.log("fileRess567", fileResponse);
              fileUrl = fileResponse.fileStoreIds[0].url;

              if (fileUrl) {
                _this.setState({ profilePic: fileUrl });
              }
              _context.next = 25;
              break;

            case 22:
              _context.prev = 22;
              _context.t0 = _context["catch"](0);

              console.error("Failed to fetch profile photo", _context.t0);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 22]]);
    })), _this.onChange = function (event, index, value) {
      _this.setState((0, _extends3.default)({}, _this.state, { languageSelected: value }));
      _this.props.fetchLocalizationLabel(value);
    }, _this.handleTenantChange = function () {
      var tenantSelected = _this.state.tempTenantSelected;
      _this.setState((0, _extends3.default)({}, _this.state, { tenantSelected: tenantSelected }));
      (0, _localStorageUtils.setTenantId)(tenantSelected);
      _this.props.setRoute("/");
    }, _this.onTenantChange = function (event, index, value) {
      if (location.pathname.includes("/inbox")) {
        _this.setState((0, _extends3.default)({}, _this.state, { tenantSelected: value }));
        (0, _localStorageUtils.setTenantId)(value);
        _this.props.setRoute("/");
      } else {
        _this.setState((0, _extends3.default)({}, _this.state, { open: true, tempTenantSelected: value }));
      }
    }, _this.handleClose = function () {
      _this.setState((0, _extends3.default)({}, _this.state, { open: false }));
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
    }, _this.handleClose = function (event) {
      // if (this.anchorEl.contains(event.target)) {
      //   return;
      // }
      _this.setState({ displayAccInfo: false });
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(UserSettings, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.fetchUserPhoto();
    }
  }, {
    key: "toggleAccInfo",


    // onUserChange = (event, index, value) => {
    //   const { setRoute } = this.props;


    //   setRoute(value);
    // }

    value: function toggleAccInfo() {
      this.setState({
        displayAccInfo: !this.state.displayAccInfo
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _state = this.state,
          languageSelected = _state.languageSelected,
          displayAccInfo = _state.displayAccInfo,
          tenantSelected = _state.tenantSelected,
          open = _state.open,
          profilePic = _state.profilePic;
      var style = this.style;
      var _props = this.props,
          onIconClick = _props.onIconClick,
          userInfo = _props.userInfo,
          handleItemClick = _props.handleItemClick,
          hasLocalisation = _props.hasLocalisation,
          languages = _props.languages,
          fetchLocalizationLabel = _props.fetchLocalizationLabel,
          isUserSetting = _props.isUserSetting;

      /**
       * Get All tenant id's from (user info -> roles) to populate dropdown
       */

      var tenantIdsList = (0, _get2.default)(userInfo, "roles", []).map(function (role) {
        return role.tenantId;
      });
      tenantIdsList = [].concat((0, _toConsumableArray3.default)(new Set(tenantIdsList)));
      tenantIdsList = tenantIdsList.map(function (tenantId) {
        return { value: tenantId, label: (0, _commons.getLocaleLabels)(tenantId, "TENANT_TENANTS_" + (0, _commons.getTransformedLocale)(tenantId)) };
      });

      return _react2.default.createElement(
        "div",
        { className: "userSettingsContainer" },
        isUserSetting && _react2.default.createElement(_LogoutDialog2.default, {
          logoutPopupOpen: open,
          closeLogoutDialog: this.handleClose,
          logout: this.handleTenantChange,
          oktext: "CORE_CHANGE_TENANT_OK",
          canceltext: "CORE_CHANGE_TENANT_CANCEL",
          title: "CORE_CHANGE_TENANT",
          body: "CORE_CHANGE_TENANT_DESCRIPTION"
        }),
        process.env.REACT_APP_NAME === "Employee" && isUserSetting && _react2.default.createElement(_components.DropDown, {
          onChange: this.onTenantChange,
          listStyle: style.listStyle,
          style: style.baseTenantStyle,
          labelStyle: style.label,
          dropDownData: tenantIdsList,
          value: tenantSelected,
          underlineStyle: { borderBottom: "none" }
        }),
        hasLocalisation && _react2.default.createElement(_components.DropDown, {
          onChange: this.onLanguageChange,
          listStyle: style.listStyle,
          style: style.baseStyle,
          labelStyle: style.label,
          dropDownData: languages,
          value: languageSelected,
          underlineStyle: { borderBottom: "none" }
        }),
        _react2.default.createElement(
          _ClickAwayListener2.default,
          { onClickAway: this.handleClose },
          isUserSetting && _react2.default.createElement(
            "div",
            {
              onClick: function onClick() {
                _this3.toggleAccInfo();
              },
              className: "userSettingsInnerContainer"
            },
            _react2.default.createElement(_components.Image, { width: "33px", circular: true, source: profilePic || _download2.default }),
            _react2.default.createElement(_components.Icon, { action: "navigation", name: "arrow-drop-down", color: "#767676", style: style.arrowIconStyle }),
            _react2.default.createElement(
              "div",
              { className: "user-acc-info" },
              displayAccInfo ? _react2.default.createElement(_components.List, {
                opem: true,
                onItemClick: function onItemClick(item) {
                  handleItemClick(item, false);
                },
                innerDivStyle: style.listInnerDivStyle,
                className: "drawer-list-style",
                items: _commonMenuItems.CommonMenuItems,
                listContainerStyle: { background: "#ffffff" },
                listItemStyle: { borderBottom: "1px solid #e0e0e0" }
              }) : ""
            )
          )
        )
      );
    }
  }]);
  return UserSettings;
}(_react.Component);

var mapStateToProps = function mapStateToProps(_ref3) {
  var app = _ref3.app,
      common = _ref3.common;
  var locale = app.locale;
  var stateInfoById = common.stateInfoById;

  var languages = (0, _get2.default)(stateInfoById, "0.languages", []);
  return { languages: languages, locale: locale };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(route) {
      return dispatch((0, _actions.setRoute)(route));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(UserSettings);