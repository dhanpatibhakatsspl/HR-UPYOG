"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _Image = require("../Image");

var _Image2 = _interopRequireDefault(_Image);

var _DropDown = require("../DropDown");

var _DropDown2 = _interopRequireDefault(_DropDown);

var _Label = require("../Label");

var _Label2 = _interopRequireDefault(_Label);

var _Icon = require("../Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _reactRedux = require("react-redux");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _LogoutDialog = require("../../common/common/Header/components/LogoutDialog");

var _LogoutDialog2 = _interopRequireDefault(_LogoutDialog);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  label: {
    color: "#5F5C57",
    fontSize: "14px",
    paddingRight: "0px",
    lineHeight: "20px"
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
    marginRight: "30px",
    width: "120px",
    marginBottom: "24px"
  }
};

var ProfileSection = function (_React$Component) {
  (0, _inherits3.default)(ProfileSection, _React$Component);

  function ProfileSection() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ProfileSection);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ProfileSection.__proto__ || Object.getPrototypeOf(ProfileSection)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      tenantSelected: (0, _localStorageUtils.getTenantId)(),
      tempTenantSelected: (0, _localStorageUtils.getTenantId)(),
      open: false
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
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ProfileSection, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          imgStyle = _props.imgStyle,
          cardStyles = _props.cardStyles,
          nameStyle = _props.nameStyle,
          locationStyle = _props.locationStyle,
          emailIdStyle = _props.emailIdStyle,
          name = _props.name,
          location = _props.location,
          addIconName = _props.addIconName,
          imgSrc = _props.imgSrc,
          addIconStyle = _props.addIconStyle,
          onClickAddPic = _props.onClickAddPic,
          emailId = _props.emailId,
          className = _props.className;
      var _state = this.state,
          tenantSelected = _state.tenantSelected,
          open = _state.open;

      var userInfo = (0, _localStorageUtils.getUserInfo)();
      var roles = JSON.parse((0, _localStorageUtils.getUserInfo)()).roles;
      var tenantIdsList = roles && roles.map(function (role) {
        return role.tenantId;
      });
      tenantIdsList = [].concat((0, _toConsumableArray3.default)(new Set(tenantIdsList)));
      tenantIdsList = tenantIdsList.map(function (tenantId) {
        return { value: tenantId, label: (0, _commons.getLocaleLabels)(tenantId, "TENANT_TENANTS_" + (0, _commons.getTransformedLocale)(tenantId)) };
      });
      return _react2.default.createElement(
        "div",
        { className: "profileSection", style: cardStyles },
        _react2.default.createElement(
          "div",
          { className: "profileContainer", style: { textAlign: "center" } },
          _react2.default.createElement(_Image2.default, { id: "profile-photo", className: "img-Profile", circular: true, style: imgStyle, source: imgSrc }),
          addIconName && _react2.default.createElement(
            "div",
            { style: addIconStyle },
            _react2.default.createElement(_Icon2.default, { id: "profile-upload-icon", action: "image", name: addIconName, onClick: onClickAddPic, color: "#ffffff" })
          ),
          name && _react2.default.createElement(_Label2.default, {
            id: "profile-name",
            className: "name-Profile",
            label: name,
            style: nameStyle,
            labelStyle: { letterSpacing: 0.6 },
            dark: true,
            bold: true
          }),
          process.env.REACT_APP_NAME === "Employee" && _react2.default.createElement(_DropDown2.default, {
            className: "tenant-dropdown",
            onChange: this.onTenantChange,
            listStyle: style.listStyle,
            style: style.baseTenantStyle,
            labelStyle: style.label,
            dropDownData: tenantIdsList,
            value: tenantSelected,
            iconStyle: { right: "-15px", top: "-7px", fill: "#484848" },
            underlineStyle: { borderBottom: "none" }
          }),
          process.env.REACT_APP_NAME === "Citizen" && location && _react2.default.createElement(_Label2.default, { id: "profile-location", className: "loc-Profile", labelPosition: "after", label: location, style: locationStyle }),
          emailId && _react2.default.createElement(_Label2.default, { id: "profile-emailid", className: "loc-Profile", label: emailId, style: emailIdStyle }),
          _react2.default.createElement(_LogoutDialog2.default, {
            logoutPopupOpen: open,
            closeLogoutDialog: this.handleClose,
            logout: this.handleTenantChange,
            oktext: "CORE_CHANGE_TENANT_OK",
            canceltext: "CORE_CHANGE_TENANT_CANCEL",
            title: "CORE_CHANGE_TENANT",
            body: "CORE_CHANGE_TENANT_DESCRIPTION"
          })
        )
      );
    }
  }]);
  return ProfileSection;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(route) {
      return dispatch((0, _actions.setRoute)(route));
    }
  };
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)(ProfileSection);


ProfileSection.propTypes = {
  style: _propTypes2.default.object,
  cardStyles: _propTypes2.default.object,
  nameStyle: _propTypes2.default.object,
  locationStyle: _propTypes2.default.object,
  iconStyle: _propTypes2.default.object,
  onClickAddPic: _propTypes2.default.func
};