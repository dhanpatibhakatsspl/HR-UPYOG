"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _IconButton = require("material-ui/IconButton");

var _IconButton2 = _interopRequireDefault(_IconButton);

var _components = require("components");

var _AppBar = require("./components/AppBar");

var _AppBar2 = _interopRequireDefault(_AppBar);

var _LogoutDialog = require("./components/LogoutDialog");

var _LogoutDialog2 = _interopRequireDefault(_LogoutDialog);

var _SortDialog = require("./components/SortDialog");

var _SortDialog2 = _interopRequireDefault(_SortDialog);

var _NavigationDrawer = require("./components/NavigationDrawer");

var _NavigationDrawer2 = _interopRequireDefault(_NavigationDrawer);

var _actions = require("egov-ui-kit/redux/auth/actions");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.css");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// get userInfo role
var Header = function (_Component) {
  (0, _inherits3.default)(Header, _Component);

  function Header() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Header);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Header.__proto__ || Object.getPrototypeOf(Header)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      toggleMenu: false,
      logoutPopupOpen: false,
      sortPopOpen: false,
      right: false,
      left: false,
      ulbLogo: ""
    }, _this.componentDidMount = function () {
      var updateActiveRoute = _this.props.updateActiveRoute;

      var menupath = (0, _localStorageUtils.localStorageGet)("menuPath");
      var menuName = (0, _localStorageUtils.localStorageGet)("menuName");
      updateActiveRoute(menupath, menuName);
    }, _this.componentWillReceiveProps = function (nextProps) {
      var _this$props = _this.props,
          role = _this$props.role,
          userInfo = _this$props.userInfo;

      var permanentCity = (0, _get2.default)(nextProps, "userInfo.permanentCity");
      if ((0, _get2.default)(userInfo, "permanentCity") !== (0, _get2.default)(nextProps, "userInfo.permanentCity")) {
        var tenantId = role.toLowerCase() === "citizen" ? permanentCity ? permanentCity : _common2.default.tenantId : (0, _localStorageUtils.getTenantId)();
        var ulbLogo = "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/" + tenantId + "/logo.png";
        _this.setState({ ulbLogo: ulbLogo });
      }
    }, _this._handleToggleMenu = function () {
      var toggleMenu = _this.state.toggleMenu;

      _this.setState({
        toggleMenu: !toggleMenu
      });
    }, _this._onUpdateMenuStatus = function (status) {
      _this.setState({
        toggleMenu: status
      });
    }, _this._handleBackNavigation = function () {
      _this.props.history.goBack();
    }, _this._handleBackToHome = function () {
      _this.props.history.push('/');
    }, _this._logout = function () {
      _this._closeLogoutDialog();
      _this.props.logout();
    }, _this._closeLogoutDialog = function () {
      _this.setState({
        logoutPopupOpen: false
      });
    }, _this.closeSortDialog = function () {
      _this.setState({
        sortPopOpen: false
      });
    }, _this.onSortClick = function () {
      _this.setState({
        sortPopOpen: true
      });
    }, _this._appBarProps = function () {
      var _this$props$options = _this.props.options,
          isHomeScreen = _this$props$options.isHomeScreen,
          hideBackButton = _this$props$options.hideBackButton;

      var isComplaintType = /(complaint-type)\/?$/.test(window.location.pathname);

      var style = { overflowX: "hidden", width: "initial", overflowY: "hidden" };
      if (isComplaintType) {
        style.boxShadow = "none";
      }

      var iconElementLeft = _react2.default.createElement(
        "div",
        { className: "appbar-left-icon" },
        _react2.default.createElement(
          _IconButton2.default,
          { id: "icon-hamburger" },
          isHomeScreen ? _react2.default.createElement(_components.Icon, { id: "icon-hamburger", action: "custom", name: "hamburger" }) : hideBackButton ? null : _react2.default.createElement(_components.Icon, { id: "back-navigator", action: "navigation", name: "arrow-back" })
        )
      );

      var onLeftIconButtonClick = isHomeScreen ? _this._handleToggleMenu : hideBackButton ? null : _this._handleBackNavigation;
      var onToolBarIconClick = _this._handleToggleMenu;
      var pathname = window.location.pathname;
      onLeftIconButtonClick = pathname && (pathname.includes('/property-tax') || pathname.includes('/home')) ? _this._handleBackToHome : onLeftIconButtonClick;
      return { style: style, iconElementLeft: iconElementLeft, onLeftIconButtonClick: onLeftIconButtonClick, onToolBarIconClick: onToolBarIconClick, isHomeScreen: isHomeScreen };
    }, _this._handleItemClick = function (item, toggleMenu) {
      var route = item.route;
      // close the navigation bar

      toggleMenu && _this._handleToggleMenu();
      //updating route poth in reducerxxxx
      if (item.path) {
        _this.props.updateActiveRoute(item.path, item.path);
      }
      // this logic is a bit shaky!! might break in future
      switch (route.slice(1)) {
        case "logout":
          _this.setState({
            logoutPopupOpen: true
          });
          break;
        case "language-selection":
          break;
        default:
          _this.props.history.push(route);
          break;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  //header related actions


  (0, _createClass3.default)(Header, [{
    key: "render",
    value: function render() {
      var _React$createElement;

      var _state = this.state,
          toggleMenu = _state.toggleMenu,
          logoutPopupOpen = _state.logoutPopupOpen,
          sortPopOpen = _state.sortPopOpen;
      var _onUpdateMenuStatus = this._onUpdateMenuStatus,
          _handleItemClick = this._handleItemClick,
          _logout = this._logout,
          _closeLogoutDialog = this._closeLogoutDialog,
          _appBarProps = this._appBarProps,
          closeSortDialog = this.closeSortDialog,
          onSortClick = this.onSortClick;

      var appBarProps = _appBarProps();
      var _props = this.props,
          className = _props.className,
          role = _props.role,
          cities = _props.cities,
          name = _props.name,
          history = _props.history,
          title = _props.title,
          headerTitle = _props.headerTitle,
          titleAddon = _props.titleAddon,
          fetchLocalizationLabel = _props.fetchLocalizationLabel,
          userInfo = _props.userInfo,
          isHomeScreen = _props.isHomeScreen,
          defaultTitle = _props.defaultTitle,
          refreshButton = _props.refreshButton,
          sortButton = _props.sortButton,
          searchButton = _props.searchButton,
          helpButton = _props.helpButton,
          notificationButton = _props.notificationButton,
          activeRoutePath = _props.activeRoutePath,
          hasLocalisation = _props.hasLocalisation,
          notificationsCount = _props.notificationsCount,
          _props$isUserSetting = _props.isUserSetting,
          isUserSetting = _props$isUserSetting === undefined ? true : _props$isUserSetting,
          msevaLogo = _props.msevaLogo,
          headerStyle = _props.headerStyle;

      var tenantId = role.toLowerCase() === "citizen" ? userInfo.permanentCity : (0, _localStorageUtils.getTenantId)();
      var currentCity = cities.filter(function (item) {
        return item.code === tenantId;
      });
      var ulbLogo = currentCity.length > 0 ? (0, _get2.default)(currentCity[0], "logoId") : "https://s3.ap-south-1.amazonaws.com/pb-egov-assets/pb.amritsar/logo.png";
      return _react2.default.createElement(
        "div",
        { style: headerStyle },
        _react2.default.createElement(_AppBar2.default, (0, _extends3.default)({
          className: className,
          title: title ? title : headerTitle,
          ulbName: name,
          defaultTitle: defaultTitle,
          titleAddon: titleAddon,
          role: role,
          ulbLogo: isUserSetting === false ? msevaLogo : ulbLogo
        }, appBarProps, {
          fetchLocalizationLabel: fetchLocalizationLabel,
          userInfo: userInfo,
          refreshButton: refreshButton,
          sortButton: sortButton,
          searchButton: searchButton,
          helpButton: helpButton,
          notificationButton: notificationButton,
          sortDialogOpen: onSortClick,
          history: this.props.history,
          handleItemClick: _handleItemClick,
          activeRoutePath: activeRoutePath,
          hasLocalisation: hasLocalisation,
          notificationsCount: notificationsCount,
          isUserSetting: isUserSetting
        })),
        _react2.default.createElement(_NavigationDrawer2.default, (_React$createElement = {
          handleItemClick: _handleItemClick,
          onUpdateMenuStatus: _onUpdateMenuStatus,
          toggleMenu: toggleMenu,
          history: history,
          cities: cities,
          userInfo: userInfo,
          fetchLocalizationLabel: fetchLocalizationLabel,
          role: role && role === "citizen" ? "citizen" : "employee",
          isCSR: role === "csr" ? true : false
        }, (0, _defineProperty3.default)(_React$createElement, "isCSR", role === "pgr-admin" ? true : false), (0, _defineProperty3.default)(_React$createElement, "openSecondary", window.innerWidth >= 768 ? true : false), (0, _defineProperty3.default)(_React$createElement, "width", 300), (0, _defineProperty3.default)(_React$createElement, "containerStyle", { zIndex: 1999 }), (0, _defineProperty3.default)(_React$createElement, "isUserSetting", isUserSetting), _React$createElement)),
        _react2.default.createElement(_LogoutDialog2.default, {
          logoutPopupOpen: logoutPopupOpen,
          closeLogoutDialog: _closeLogoutDialog,
          logout: _logout,
          oktext: "CORE_LOGOUTPOPUP_LOGOUT",
          canceltext: "CORE_LOGOUTPOPUP_CANCEL",
          title: "CORE_COMMON_LOGOUT",
          body: "CORE_LOGOUTPOPUP_CONFIRM"
        }),
        _react2.default.createElement(_SortDialog2.default, { sortPopOpen: sortPopOpen, closeSortDialog: closeSortDialog })
      );
    }
  }]);
  return Header;
}(_react.Component);

var getUlbGradeLabel = function getUlbGradeLabel(ulbGrade) {
  if (ulbGrade) {
    var ulbWiseHeaderName = ulbGrade.toUpperCase();
    if (ulbWiseHeaderName.indexOf(" ") > 0) {
      ulbWiseHeaderName = ulbWiseHeaderName.split(" ").join("_");
    }
    return "ULBGRADE" + "_" + ulbWiseHeaderName;
  }
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var cities = state.common.cities || [];
  var notificationsCount = (0, _get2.default)(state.app, "notificationsCount");
  var role = ownProps.role;

  var tenantId = role && role.toLowerCase() === "citizen" ? JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity : (0, _localStorageUtils.getTenantId)();
  var userTenant = cities.filter(function (item) {
    return item.code === tenantId;
  });
  var ulbGrade = userTenant && (0, _get2.default)(userTenant[0], "city.ulbGrade");
  var name = userTenant && (0, _get2.default)(userTenant[0], "code");
  var defaultTitle = ulbGrade && getUlbGradeLabel(ulbGrade);
  var screenKey = window.location.pathname.split("/").pop();
  var headerTitle = (0, _get2.default)(state.screenConfiguration.screenConfig, screenKey + ".components.div.children.header.children.key.props.labelKey");
  return { cities: cities, defaultTitle: defaultTitle, name: name, headerTitle: headerTitle, notificationsCount: notificationsCount };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    logout: function logout() {
      return dispatch((0, _actions.logout)());
    },
    fetchLocalizationLabel: function fetchLocalizationLabel(locale, tenants, tenant) {
      return dispatch((0, _actions2.fetchLocalizationLabel)(locale, tenants, tenant));
    },
    updateActiveRoute: function updateActiveRoute(routepath, menuName) {
      return dispatch((0, _actions2.updateActiveRoute)(routepath, menuName));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Header);