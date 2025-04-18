"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _components = require("components");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _LoadingIndicator = require("egov-ui-framework/ui-molecules/LoadingIndicator");

var _LoadingIndicator2 = _interopRequireDefault(_LoadingIndicator);

var _commons = require("egov-ui-framework/ui-utils/commons.js");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ = require(".");

var _counter = require("./counter");

var _counter2 = _interopRequireDefault(_counter);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFields = function getFields() {
  var _name, _mobileNumber, _otp;

  return {
    "name": (_name = { type: "text", pattern: "", placeholder: "PT_FORM3_GUARDIAN_PLACEHOLDER", floatingLabelText: "CORE_COMMON_NAME", className: "textField" }, (0, _defineProperty3.default)(_name, "pattern", (0, _utils.getPattern)("Name")), (0, _defineProperty3.default)(_name, "style", { width: "40%", height: "76px" }), (0, _defineProperty3.default)(_name, "value", ""), (0, _defineProperty3.default)(_name, "errorMessage", ""), (0, _defineProperty3.default)(_name, "error", false), (0, _defineProperty3.default)(_name, "jsonpath", "name"), (0, _defineProperty3.default)(_name, "invalid", "PT_ERR_INVALID_TEXT"), (0, _defineProperty3.default)(_name, "disabled", true), _name),
    "mobileNumber": (_mobileNumber = { type: "text", pattern: "", placeholder: "PT_FORM3_MOBILE_NO_PLACEHOLDER", floatingLabelText: "CS_COMMON_MOBILE_NO", className: "mobileno-field-pt" }, (0, _defineProperty3.default)(_mobileNumber, "pattern", (0, _utils.getPattern)("MobileNo")), (0, _defineProperty3.default)(_mobileNumber, "style", { width: "100%", height: "76px" }), (0, _defineProperty3.default)(_mobileNumber, "value", ""), (0, _defineProperty3.default)(_mobileNumber, "errorMessage", ""), (0, _defineProperty3.default)(_mobileNumber, "error", false), (0, _defineProperty3.default)(_mobileNumber, "jsonpath", "mobileNumber"), (0, _defineProperty3.default)(_mobileNumber, "invalid", "PT_ERR_INVALID_TEXT"), (0, _defineProperty3.default)(_mobileNumber, "disabled", false), _mobileNumber),
    "otp": (_otp = { type: "text", pattern: "", placeholder: "CS_LOGIN_OTP_TEXT", floatingLabelText: "CORE_OTP_OTP", className: "textField" }, (0, _defineProperty3.default)(_otp, "pattern", (0, _utils.getPattern)("ChequeNo")), (0, _defineProperty3.default)(_otp, "style", { width: "100%", height: "76px" }), (0, _defineProperty3.default)(_otp, "value", ""), (0, _defineProperty3.default)(_otp, "errorMessage", ""), (0, _defineProperty3.default)(_otp, "error", false), (0, _defineProperty3.default)(_otp, "jsonpath", "otp"), (0, _defineProperty3.default)(_otp, "invalid", "CS_INVALID_OTP"), (0, _defineProperty3.default)(_otp, "disabled", true), _otp)
  };
};

var AlternateMobileDialog = function (_React$Component) {
  (0, _inherits3.default)(AlternateMobileDialog, _React$Component);

  function AlternateMobileDialog(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, AlternateMobileDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (AlternateMobileDialog.__proto__ || Object.getPrototypeOf(AlternateMobileDialog)).call(this, props));

    _this.handleChange = function (id, value) {
      var _this$state$fields = _this.state.fields,
          fields = _this$state$fields === undefined ? {} : _this$state$fields;

      fields[id].value = value;
      if (value && value.length > 0 && value.match(fields[id].pattern) == null) {
        fields[id].error = true;
        fields[id].errorMessage = fields[id].invalid;
      } else {
        fields[id].error = false;
        fields[id].errorMessage = '';
      }
      _this.setState({
        fields: (0, _extends3.default)({}, fields),
        error: {
          errorMessage: "",
          type: ""
        }
      });
    };

    _this.registerNumber = function () {
      var mobileNumber = _this.state.fields.mobileNumber;
      var _this$props = _this.props,
          _this$props$property = _this$props.property,
          property = _this$props$property === undefined ? {} : _this$props$property,
          _this$props$propertyN = _this$props.propertyNumbers,
          propertyNumbers = _this$props$propertyN === undefined ? {} : _this$props$propertyN;
      var _property$tenantId = property.tenantId,
          tenantId = _property$tenantId === undefined ? "" : _property$tenantId;

      var tenant = _common2.default.tenantId;
      var _propertyNumbers$name = propertyNumbers.name,
          name = _propertyNumbers$name === undefined ? "" : _propertyNumbers$name;

      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json, text/plain, */*");
      myHeaders.append("content-type", "application/json;charset=UTF-8");
      var raw = (0, _extends3.default)({}, (0, _.getRequestInfo)(), {
        "otp": {
          "name": name,
          "permanentCity": tenantId,
          "tenantId": tenant,
          "mobileNumber": mobileNumber.value,
          "type": "register"
        }
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };
      _this.showLoading();
      fetch(window.location.origin + "/user-otp/v1/_send?tenantId=" + tenant, requestOptions).then(function (response) {
        return response.text();
      }).then(function (result) {
        _this.hideLoading();
        var newFields = (0, _extends3.default)({}, _this.state.fields);
        newFields.mobileNumber.disabled = true;
        newFields.otp.disabled = false;
        _this.setState({ fields: (0, _extends3.default)({}, newFields), otpButton: true, verifyButton: false });
        _this.setMessage("PT_SEC_OTP_SENT_SUCEESS", "SUCCESS", true);
      }).catch(function (error) {
        _this.setMessage("PT_SEC_OTP_SENT_FAILURE", "ERROR", true);_this.hideLoading();
      });
    };

    _this.createUser = function () {
      var _this$state$fields2 = _this.state.fields,
          mobileNumber = _this$state$fields2.mobileNumber,
          otp = _this$state$fields2.otp;
      var _this$props2 = _this.props,
          _this$props2$property = _this$props2.property,
          property = _this$props2$property === undefined ? {} : _this$props2$property,
          _this$props2$property2 = _this$props2.propertyNumbers,
          propertyNumbers = _this$props2$property2 === undefined ? {} : _this$props2$property2;
      var _property$tenantId2 = property.tenantId,
          tenantId = _property$tenantId2 === undefined ? "" : _property$tenantId2;

      var tenant = _common2.default.tenantId;
      var _propertyNumbers$name2 = propertyNumbers.name,
          name = _propertyNumbers$name2 === undefined ? "" : _propertyNumbers$name2;

      var myHeaders = new Headers();

      myHeaders.append("accept", "application/json, text/plain, */*");
      myHeaders.append("content-type", "application/json;charset=UTF-8");
      var raw = (0, _extends3.default)({}, (0, _.getRequestInfo)(), {
        "User": {
          "otpReference": otp.value,
          "username": mobileNumber.value,
          "name": name,
          "tenantId": tenantId,
          "permanentCity": tenantId
        }
      });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };

      _this.showLoading();
      fetch(window.location.origin + "/user/citizen/_create?tenantId=" + tenant, requestOptions).then(function (response) {
        return response.text();
      }).then(function (resp) {
        return JSON.parse(resp);
      }).then(function (result) {
        _this.hideLoading();
        if (result.error && result.error.fields[0] && result.error.fields[0].code == "OTP.VALIDATION_UNSUCCESSFUL") {
          _this.setMessage(result.error.fields[0].code, "ERROR", false);
        } else {
          _this.updateProperty(result.access_token);
        }
      }).catch(function (error) {
        console.log('error', error);_this.hideLoading();
      });
    };

    _this.updateProperty = function () {
      var auth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      var myHeaders = new Headers();
      var _this$props3 = _this.props,
          property = _this$props3.property,
          propertyNumbers = _this$props3.propertyNumbers;
      var mobileNumber = _this.state.fields.mobileNumber;


      if (property && property.owners && property.owners.length > 0) {
        property.owners.map(function (owner) {
          if (owner.uuid == propertyNumbers.uuid) {
            owner.alternatemobilenumber = mobileNumber.value;
            property.creationReason = "UPDATE";
          }
        });
      }
      myHeaders.append("accept", "application/json, text/plain, */*");
      myHeaders.append("content-type", "application/json;charset=UTF-8");
      var raw = (0, _extends3.default)({}, (0, _.getRequestInfo)(auth ? auth : localStorage.getItem("token")), {
        "Property": (0, _extends3.default)({}, property)
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };
      _this.showLoading();
      fetch(window.location.origin + "/property-services/property/_addAlternateNumber?", requestOptions).then(function (response) {
        return response.text();
      }).then(function (resp) {
        return JSON.parse(resp);
      }).then(function (result) {
        _this.hideLoading();
        if (result && result.Errors) {
          _this.setMessage(result.Errors[0].code, "ERROR", false);
        } else {
          _this.setMessage("PT_MOBILE_NUM_UPDATED_SUCCESS", "SUCCESS", true);
          setTimeout(function () {
            window.location.href.includes('withoutAuth') ? _this.props.closeDialog() : window.location.reload();
          }, 2500);
        }
      }).catch(function (error) {
        console.log('error', error);_this.hideLoading();
      });
    };

    _this.validateOTP = function () {
      var mobNum = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$state$fields3 = _this.state.fields,
          mobileNumber = _this$state$fields3.mobileNumber,
          otp = _this$state$fields3.otp;

      var tenant = _common2.default.tenantId;
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json, text/plain, */*");
      myHeaders.append("authorization", "Basic ZWdvdi11c2VyLWNsaWVudDo=");
      myHeaders.append("content-type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", mobNum ? mobNum : mobileNumber.value);
      urlencoded.append("password", otp.value);
      urlencoded.append("grant_type", "password");
      urlencoded.append("scope", "read");
      urlencoded.append("tenantId", tenant);
      urlencoded.append("userType", "CITIZEN");

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };
      _this.showLoading();
      fetch(window.location.origin + "/user/oauth/token", requestOptions).then(function (response) {
        return response.text();
      }).then(function (response) {
        return JSON.parse(response);
      }).then(function (result) {
        _this.hideLoading();
        if (result.error && result.error == "invalid_request") {
          _this.setMessage(result.error, "ERROR", false);
        } else if (mobNum) {
          var newFields = (0, _extends3.default)({}, _this.state.fields);
          newFields.otp.value = "";
          _this.props.setProperty(result && result.access_token);
          _this.setState({ fields: (0, _extends3.default)({}, newFields), phase: 1 });
        } else {
          _this.updateProperty(result.access_token);
        }
      }).catch(function (error) {
        console.log('error', error);_this.hideLoading();
      });
    };

    _this.sendPTOTP = function () {
      var _this$props$propertyN2 = _this.props.propertyNumbers,
          propertyNumbers = _this$props$propertyN2 === undefined ? {} : _this$props$propertyN2;

      var tenant = _common2.default.tenantId;
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json, text/plain, */*");
      myHeaders.append("content-type", "application/json;charset=UTF-8");
      var raw = (0, _extends3.default)({}, (0, _.getRequestInfo)(), { "otp": { "mobileNumber": propertyNumbers.mobileNumber, "type": "login", "tenantId": tenant, "userType": "CITIZEN" } });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };
      _this.showLoading();
      fetch(window.location.origin + "/user-otp/v1/_send?tenantId=" + tenant, requestOptions).then(function (response) {
        return response.text();
      }).then(function (resp) {
        return JSON.parse(resp);
      }).then(function (result) {
        _this.hideLoading();
        var newFields = (0, _extends3.default)({}, _this.state.fields);
        newFields.otp.disabled = false;
        _this.setState({ fields: (0, _extends3.default)({}, newFields), secOtpButton: true, continueButton: false });
        _this.setMessage("PT_SEC_OTP_SENT_SUCEESS", "SUCCESS", true);
      }).catch(function (error) {
        console.log('error', error);_this.hideLoading();
      });
    };

    _this.sendOTP = function () {
      var mobileNumber = _this.state.fields.mobileNumber;
      var _this$props$property2 = _this.props.property,
          property = _this$props$property2 === undefined ? {} : _this$props$property2;
      var _property$tenantId3 = property.tenantId,
          tenantId = _property$tenantId3 === undefined ? "" : _property$tenantId3;

      var tenant = _common2.default.tenantId;
      var myHeaders = new Headers();

      myHeaders.append("accept", "application/json, text/plain, */*");
      myHeaders.append("content-type", "application/json;charset=UTF-8");
      var raw = (0, _extends3.default)({}, (0, _.getRequestInfo)(), { "otp": { "mobileNumber": mobileNumber.value, "type": "login", "tenantId": tenant, "userType": "CITIZEN" } });
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: 'follow'
      };
      _this.showLoading();
      fetch(window.location.origin + "/user-otp/v1/_send?tenantId=" + tenant, requestOptions).then(function (response) {
        return response.text();
      }).then(function (resp) {
        return JSON.parse(resp);
      }).then(function (result) {
        _this.hideLoading();
        if (result.error && result.error.fields[0] && result.error.fields[0].code == "OTP.UNKNOWN_USER") {
          _this.setState({ register: true });
          _this.registerNumber();
        } else {
          var newFields = (0, _extends3.default)({}, _this.state.fields);
          newFields.mobileNumber.disabled = true;
          newFields.otp.disabled = false;
          _this.setState({ fields: (0, _extends3.default)({}, newFields), otpButton: true, verifyButton: false });
          _this.setMessage("PT_SEC_OTP_SENT_SUCEESS", "SUCCESS", true);
        }
      }).catch(function (error) {
        console.log('error', error);_this.hideLoading();
      });
    };

    _this.validateAndSendOtp = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var newItem;
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              newItem = { mobileNumber: _this.state.fields.mobileNumber };

              if (!Object.values(newItem).some(function (item) {
                return item.value == "";
              })) {
                _context.next = 7;
                break;
              }

              _this.setMessage("PT_SEC_ENTER_NAME_NUMBER", "ERROR");
              return _context.abrupt("return");

            case 7:
              if (!Object.values(newItem).some(function (item) {
                return item.error;
              })) {
                _context.next = 12;
                break;
              }

              _this.setMessage("PT_ERR_INVALID_TEXT", "ERROR");
              return _context.abrupt("return");

            case 12:
              if (!Object.values(newItem).some(function (item) {
                return item.value == "9999999999";
              })) {
                _context.next = 17;
                break;
              }

              _this.setMessage("PT_ERR_INVALID_TEXT", "ERROR");
              return _context.abrupt("return");

            case 17:
              if (!(_this.props.propertyNumbers.mobileNumber == _this.state.fields.mobileNumber.value)) {
                _context.next = 22;
                break;
              }

              _this.setMessage("PT_SEC_SAME_NUMBER", "ERROR");
              return _context.abrupt("return");

            case 22:
              _this.setMessage();

            case 23:

              _this.sendOTP();

              _context.next = 29;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](0);

              _this.setMessage(_context.t0.message, "ERROR");

            case 29:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 26]]);
    }));
    _this.validateAndUpdatePhase = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
      var newItem;
      return _regenerator2.default.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.prev = 0;
              newItem = { otp: _this.state.fields.otp };

              if (!Object.values(newItem).some(function (item) {
                return item.value == "";
              })) {
                _context2.next = 7;
                break;
              }

              _this.setMessage("PT_INVALID_OTP", "ERROR");
              return _context2.abrupt("return");

            case 7:
              if (!Object.values(newItem).some(function (item) {
                return item.error;
              })) {
                _context2.next = 12;
                break;
              }

              _this.setMessage("PT_INVALID_OTP", "ERROR");
              return _context2.abrupt("return");

            case 12:
              _this.setMessage();

            case 13:

              _this.validateOTP(_this.props.propertyNumbers.mobileNumber);

              _context2.next = 19;
              break;

            case 16:
              _context2.prev = 16;
              _context2.t0 = _context2["catch"](0);

              _this.setMessage(_context2.t0.message, "ERROR");

            case 19:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2, _this2, [[0, 16]]);
    }));
    _this.validateAndCreate = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var newItem;
      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.prev = 0;
              newItem = { otp: _this.state.fields.otp };

              if (!Object.values(newItem).some(function (item) {
                return item.value == "";
              })) {
                _context3.next = 7;
                break;
              }

              _this.setMessage("PT_INVALID_OTP", "ERROR");
              return _context3.abrupt("return");

            case 7:
              if (!Object.values(newItem).some(function (item) {
                return item.error;
              })) {
                _context3.next = 12;
                break;
              }

              _this.setMessage("PT_INVALID_OTP", "ERROR");
              return _context3.abrupt("return");

            case 12:
              _this.setMessage();

            case 13:
              if (_this.state.register) {
                _this.createUser();
              } else {
                _this.validateOTP();
              }
              _context3.next = 19;
              break;

            case 16:
              _context3.prev = 16;
              _context3.t0 = _context3["catch"](0);

              _this.setMessage(_context3.t0.message, "ERROR");

            case 19:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[0, 16]]);
    }));

    _this.setMessage = function () {
      var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var clear = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

      _this.setState({
        error: {
          errorMessage: message,
          type: type
        }
      });
      if (clear) {
        setTimeout(_this.setMessage, 2000);
      }
    };

    _this.showLoading = function () {
      _this.setState({ loadingStatus: 'loading' });
    };

    _this.hideLoading = function () {
      _this.setState({ loadingStatus: 'loaded' });
    };

    _this.state = {
      fields: getFields(),
      register: false,
      clickedElement: 0,
      verifyButton: true,
      loadingStatus: "",
      phase: 0,
      otpButton: false,
      secOtpButton: false,
      continueButton: true,
      error: {
        errorMessage: "",
        type: ""
      }
    };
    return _this;
  }

  (0, _createClass3.default)(AlternateMobileDialog, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.sendPTOTP();
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          _props$propertyNumber = _props.propertyNumbers,
          propertyNumbers = _props$propertyNumber === undefined ? {} : _props$propertyNumber,
          documents = _props.documents;
      var _state = this.state,
          _state$fields = _state.fields,
          fields = _state$fields === undefined ? {} : _state$fields,
          _state$error = _state.error,
          error = _state$error === undefined ? {} : _state$error,
          loadingStatus = _state.loadingStatus,
          phase = _state.phase;
      var _error$errorMessage = error.errorMessage,
          errorMessage = _error$errorMessage === undefined ? "" : _error$errorMessage,
          _error$type = error.type,
          type = _error$type === undefined ? "" : _error$type;

      var key = "mobileNumber";
      var key1 = "otp";
      return _react2.default.createElement(
        _components.Dialog,
        {
          className: "pt-update-popup",
          open: this.props.open,
          isClose: true,
          title: _react2.default.createElement(_translationNode2.default, { label: "PTALTNO_HEADER", fontSize: "24px", labelStyle: { padding: "2%", backgroundColor: "white", paddingLeft: '4%' }, labelClassName: "owner-history" }),
          handleClose: this.props.closeDialog,
          titleStyle: {
            padding: "2%",
            backgroundColor: "white"

          },
          actionsContainerStyle: {
            padding: "2%",
            backgroundColor: "white"
          },
          bodyStyle: {
            padding: "0% 2% 2% 2%",
            backgroundColor: "white"
          }
        },
        _react2.default.createElement(
          "div",
          { className: "pt-update-popup-holder" },
          loadingStatus == "loading" && _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_LoadingIndicator2.default, null)
          ),
          _react2.default.createElement(
            "span",
            { className: "pt-update-static-content" },
            _react2.default.createElement(
              "span",
              null,
              _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_OWNER_NAME", labelStyle: { color: 'rgba(0, 0, 0, 0.604138)', fontSize: "14px" } }),
              _react2.default.createElement(_translationNode2.default, { label: propertyNumbers && propertyNumbers.name, labelStyle: { color: 'rgba(0, 0, 0, 0.875)', fontSize: "16px" } })
            )
          ),
          phase == 0 && _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_translationNode2.default, { label: "ALT_OTPSENTTO", labelStyle: { color: 'rgba(0, 0, 0, 0.875)', fontSize: "16px" } }),
            " ",
            _react2.default.createElement(_translationNode2.default, { label: propertyNumbers && propertyNumbers.mobileNumber && "+91 " + propertyNumbers.mobileNumber, labelStyle: { color: 'rgba(0, 0, 0, 0.875)', fontSize: "16px" } }),
            _react2.default.createElement(
              "div",
              { className: "pt-update-verify-container" },
              _react2.default.createElement(
                "span",
                { style: {
                    height: "100px",
                    display: "flex",
                    alignItems: "center"
                  } },
                " ",
                _react2.default.createElement(_components.TextField, { type: fields[key1].type,
                  placeholder: (0, _commons.getLocaleLabels)(fields[key].placeholder, fields[key1].placeholder),
                  floatingLabelText: (0, _commons.getLocaleLabels)(fields[key1].floatingLabelText, fields[key1].floatingLabelText),
                  className: fields[key1].className /*  */
                  , pattern: fields[key1].pattern,
                  errorText: (0, _commons.getLocaleLabels)(fields[key1].errorMessage, fields[key1].errorMessage),
                  style: fields[key1].style,
                  value: fields[key1].value,
                  disabled: fields[key1].disabled,
                  onChange: function onChange(e) {
                    return _this3.handleChange(key1, e.target.value);
                  } })
              ),
              _react2.default.createElement(
                "div",
                { className: "pt-update-send-otp-container" },
                _react2.default.createElement(
                  "button",
                  { type: "button", disabled: this.state.secOtpButton, style: { marginRight: "5%" }, className: "button-verify-link " + (this.state.secOtpButton && 'jk-update-send-disabled'), onClick: function onClick() {
                      return _this3.sendPTOTP();
                    } },
                  _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_SENDOTP" })
                ),
                this.state.secOtpButton && _react2.default.createElement(
                  _react2.default.Fragment,
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: "CORE_ANOTHER_OTP", labelStyle: { color: 'rgba(0, 0, 0, 0.6)', fontSize: "14px" } }),
                  _react2.default.createElement(_counter2.default, { updateState: function updateState() {
                      return _this3.setState({ secOtpButton: false });
                    }, otpButton: this.state.secOtpButton }),
                  _react2.default.createElement(_translationNode2.default, { label: "CS_RESEND_SECONDS", labelStyle: { color: 'rgba(0, 0, 0, 0.6)', fontSize: "14px" } })
                )
              ),
              _react2.default.createElement(
                "span",
                { style: { display: "flex", marginTop: "10px", marginBottom: '10px', flexDirection: "column" } },
                "           ",
                _react2.default.createElement(_translationNode2.default, { label: "PT_ALT_DIDNT_RECEIVE_OTP", labelStyle: { color: 'rgba(0, 0, 0, 0.6)', fontSize: "14px" } }),
                _react2.default.createElement(_translationNode2.default, { label: "PT_ALT_CONTACT_ULB", labelStyle: { color: 'rgba(0, 0, 0, 0.6)', fontSize: "14px" } })
              ),
              _react2.default.createElement(_translationNode2.default, { label: "PT_ALT_CARRY_DOCS", labelStyle: { color: 'rgba(0, 0, 0, 0.6)', fontSize: "14px" } }),
              documents.map(function (doc) {
                return _react2.default.createElement(_translationNode2.default, { label: "ALT_" + doc.code, labelStyle: { color: 'rgba(0, 0, 0, 0.6)', fontSize: "14px" } });
              }),
              _react2.default.createElement(
                "button",
                { type: "button", disabled: this.state.continueButton, style: { width: '100%', marginTop: "10px" }, className: "button-verify-link", onClick: function onClick() {
                    return _this3.validateAndUpdatePhase();
                  } },
                _react2.default.createElement(_translationNode2.default, { label: "PTALT_CONTINUE" })
              )
            )
          ),
          phase == 1 && _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "span",
              { style: {
                  height: "100px",
                  display: "flex",
                  alignItems: "center"
                } },
              " ",
              _react2.default.createElement(_components.MobileNumberField, { type: fields[key].type,
                placeholder: (0, _commons.getLocaleLabels)(fields[key].placeholder, fields[key].placeholder),
                floatingLabelText: (0, _commons.getLocaleLabels)(fields[key].floatingLabelText, fields[key].floatingLabelText),
                className: fields[key].className /*  */
                , pattern: fields[key].pattern,
                errorText: (0, _commons.getLocaleLabels)(fields[key].errorMessage, fields[key].errorMessage),
                style: fields[key].style,
                disabled: fields[key].disabled,
                value: fields[key].value,
                onChange: function onChange(e) {
                  return _this3.handleChange(key, e.target.value);
                } })
            ),
            _react2.default.createElement(
              "div",
              { className: "pt-update-send-otp-container" },
              _react2.default.createElement(
                "button",
                { type: "button", disabled: this.state.otpButton, style: { marginRight: "5%" }, className: "button-verify-link " + (this.state.otpButton && 'jk-update-send-disabled'), onClick: function onClick() {
                    return _this3.validateAndSendOtp();
                  } },
                _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_SENDOTP" })
              ),
              this.state.otpButton && _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(_translationNode2.default, { label: "CORE_ANOTHER_OTP", labelStyle: { color: 'rgba(0, 0, 0, 0.6)', fontSize: "14px" } }),
                _react2.default.createElement(_counter2.default, { updateState: function updateState() {
                    return _this3.setState({ otpButton: false });
                  }, otpButton: this.state.otpButton }),
                _react2.default.createElement(_translationNode2.default, { label: "CS_RESEND_SECONDS", labelStyle: { color: 'rgba(0, 0, 0, 0.6)', fontSize: "14px" } })
              )
            )
          ),
          !this.state.verifyButton && phase == 1 && _react2.default.createElement(
            "div",
            { className: "pt-update-verify-container" },
            _react2.default.createElement(
              "span",
              { style: {
                  height: "100px",
                  display: "flex",
                  alignItems: "center"
                } },
              " ",
              _react2.default.createElement(_components.TextField, { type: fields[key1].type,
                placeholder: (0, _commons.getLocaleLabels)(fields[key].placeholder, fields[key1].placeholder),
                floatingLabelText: (0, _commons.getLocaleLabels)(fields[key1].floatingLabelText, fields[key1].floatingLabelText),
                className: fields[key1].className /*  */
                , pattern: fields[key1].pattern,
                errorText: (0, _commons.getLocaleLabels)(fields[key1].errorMessage, fields[key1].errorMessage),
                style: fields[key1].style,
                value: fields[key1].value,
                disabled: fields[key1].disabled,
                onChange: function onChange(e) {
                  return _this3.handleChange(key1, e.target.value);
                } })
            ),
            _react2.default.createElement(
              "button",
              { type: "button", disabled: this.state.verifyButton, style: { width: '100%', marginTop: "10px" }, className: "button-verify-link", onClick: function onClick() {
                  return _this3.validateAndCreate();
                } },
              _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_VERUPD_NO" })
            )
          )
        ),
        errorMessage && _react2.default.createElement(
          "div",
          { className: type == "ERROR" ? "error-comp-second-num" : "success-comp-second-num" },
          _react2.default.createElement(_translationNode2.default, { label: errorMessage })
        )
      );
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, state) {
      return (0, _extends3.default)({}, state);
    }
  }]);
  return AlternateMobileDialog;
}(_react2.default.Component);

exports.default = AlternateMobileDialog;