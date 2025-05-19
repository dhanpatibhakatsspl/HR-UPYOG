"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _counter = require("./counter");

var _counter2 = _interopRequireDefault(_counter);

require("./index.css");

var _updateMobile = require("./updateMobile");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getFields = function getFields() {
  var _name, _mobileNumber, _otp;

  return {
    name: (_name = {
      type: "text",
      pattern: "",
      placeholder: "PT_FORM3_GUARDIAN_PLACEHOLDER",
      floatingLabelText: "CORE_COMMON_NAME",
      className: "textField"
    }, (0, _defineProperty3.default)(_name, "pattern", (0, _utils.getPattern)("Name")), (0, _defineProperty3.default)(_name, "style", { width: "40%", height: "76px" }), (0, _defineProperty3.default)(_name, "value", ""), (0, _defineProperty3.default)(_name, "errorMessage", ""), (0, _defineProperty3.default)(_name, "error", false), (0, _defineProperty3.default)(_name, "jsonpath", "name"), (0, _defineProperty3.default)(_name, "invalid", "PT_ERR_INVALID_TEXT"), (0, _defineProperty3.default)(_name, "disabled", true), _name),
    mobileNumber: (_mobileNumber = {
      type: "text",
      pattern: "",
      placeholder: "PT_FORM3_MOBILE_NO_PLACEHOLDER",
      floatingLabelText: "CS_COMMON_MOBILE_NO",
      className: "mobileno-field-pt"
    }, (0, _defineProperty3.default)(_mobileNumber, "pattern", (0, _utils.getPattern)("MobileNo")), (0, _defineProperty3.default)(_mobileNumber, "style", { width: "100%", height: "76px" }), (0, _defineProperty3.default)(_mobileNumber, "value", ""), (0, _defineProperty3.default)(_mobileNumber, "errorMessage", ""), (0, _defineProperty3.default)(_mobileNumber, "error", false), (0, _defineProperty3.default)(_mobileNumber, "jsonpath", "mobileNumber"), (0, _defineProperty3.default)(_mobileNumber, "invalid", "PT_ERR_INVALID_TEXT"), (0, _defineProperty3.default)(_mobileNumber, "disabled", false), _mobileNumber),
    otp: (_otp = {
      type: "text",
      pattern: "",
      placeholder: "CS_LOGIN_OTP_TEXT",
      floatingLabelText: "CORE_OTP_OTP",
      className: "textField"
    }, (0, _defineProperty3.default)(_otp, "pattern", (0, _utils.getPattern)("ChequeNo")), (0, _defineProperty3.default)(_otp, "style", { width: "100%", height: "76px" }), (0, _defineProperty3.default)(_otp, "value", ""), (0, _defineProperty3.default)(_otp, "errorMessage", ""), (0, _defineProperty3.default)(_otp, "error", false), (0, _defineProperty3.default)(_otp, "jsonpath", "otp"), (0, _defineProperty3.default)(_otp, "invalid", "CS_INVALID_OTP"), (0, _defineProperty3.default)(_otp, "disabled", true), _otp)
  };
};

var UpdateMobileDialog = function (_React$Component) {
  (0, _inherits3.default)(UpdateMobileDialog, _React$Component);

  function UpdateMobileDialog(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, UpdateMobileDialog);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UpdateMobileDialog.__proto__ || Object.getPrototypeOf(UpdateMobileDialog)).call(this, props));

    _this.handleChange = function (id, value) {
      var _this$state$fields = _this.state.fields,
          fields = _this$state$fields === undefined ? {} : _this$state$fields;

      fields[id].value = value;
      if (value && value.length > 0 && value.match(fields[id].pattern) == null) {
        fields[id].error = true;
        fields[id].errorMessage = fields[id].invalid;
      } else {
        fields[id].error = false;
        fields[id].errorMessage = "";
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
      var raw = (0, _extends3.default)({}, (0, _updateMobile.getRequestInfo)(), {
        otp: {
          name: name,
          permanentCity: tenantId,
          tenantId: tenant,
          mobileNumber: mobileNumber.value,
          type: "register"
        }
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow"
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
        _this.setMessage("PT_SEC_OTP_SENT_FAILURE", "ERROR", true);
        _this.hideLoading();
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
      var raw = (0, _extends3.default)({}, (0, _updateMobile.getRequestInfo)(), {
        User: {
          otpReference: otp.value,
          username: mobileNumber.value,
          name: name,
          tenantId: tenantId,
          permanentCity: tenantId
        }
      });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow"
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
          _this.updateProperty();
        }
      }).catch(function (error) {
        console.log("error", error);
        _this.hideLoading();
      });
    };

    _this.updateProperty = function () {
      var myHeaders = new Headers();
      var _this$props3 = _this.props,
          property = _this$props3.property,
          propertyNumbers = _this$props3.propertyNumbers,
          isAlternate = _this$props3.isAlternate;
      var mobileNumber = _this.state.fields.mobileNumber;


      if (property && property.owners && property.owners.length > 0) {
        property.owners.map(function (owner) {
          if (owner.uuid == propertyNumbers.uuid) {
            if (isAlternate) {
              owner.alternatemobilenumber = mobileNumber.value;
            } else {
              owner.mobileNumber = mobileNumber.value;
            }

            property.creationReason = "UPDATE";
            var documents = _this.state.documents.filter(function (document) {
              return document.uploaded;
            }) || [];
            if (property.documents) {
              var docuNames = documents.map(function (doc) {
                return doc.code;
              });
              property.documents = property.documents.filter(function (document) {
                return !docuNames.includes(document.documentType);
              });
            } else {
              property.documents = [];
            }
            property.documents = [].concat((0, _toConsumableArray3.default)(property.documents), (0, _toConsumableArray3.default)(documents.map(function (doc) {
              return {
                documentType: doc.code,
                documentUid: doc.fileStoreId,
                fileStoreId: doc.fileStoreId
              };
            })));
          }
        });
      }
      myHeaders.append("accept", "application/json, text/plain, */*");
      myHeaders.append("content-type", "application/json;charset=UTF-8");
      var raw = (0, _extends3.default)({}, (0, _updateMobile.getRequestInfo)(localStorage.getItem("token")), {
        Property: (0, _extends3.default)({}, property)
      });

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow"
      };
      _this.showLoading();
      fetch(window.location.origin + "/property-services/property/" + (isAlternate ? "_addAlternateNumber" : "_update") + "?", requestOptions).then(function (response) {
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
            window.location.reload();
          }, 2500);
        }
      }).catch(function (error) {
        console.log("error", error);
        _this.hideLoading();
      });
    };

    _this.validateOTP = function () {
      var _this$state$fields3 = _this.state.fields,
          mobileNumber = _this$state$fields3.mobileNumber,
          otp = _this$state$fields3.otp;
      var _this$props$property2 = _this.props.property,
          property = _this$props$property2 === undefined ? {} : _this$props$property2;
      var _property$tenantId3 = property.tenantId,
          tenantId = _property$tenantId3 === undefined ? "" : _property$tenantId3;

      var tenant = _common2.default.tenantId;
      var myHeaders = new Headers();
      myHeaders.append("accept", "application/json, text/plain, */*");
      myHeaders.append("authorization", "Basic ZWdvdi11c2VyLWNsaWVudDo=");
      myHeaders.append("content-type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("username", mobileNumber.value);
      urlencoded.append("password", otp.value);
      urlencoded.append("grant_type", "password");
      urlencoded.append("scope", "read");
      urlencoded.append("tenantId", tenant);
      urlencoded.append("userType", "CITIZEN");

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow"
      };
      _this.showLoading();
      fetch(window.location.origin + "/user/oauth/token", requestOptions).then(function (response) {
        return response.text();
      }).then(function (result) {
        _this.hideLoading();
        if (result.error && result.error == "invalid_request") {
          _this.setMessage(result.error, "ERROR", false);
        } else {
          _this.updateProperty();
        }
      }).catch(function (error) {
        console.log("error", error);
        _this.hideLoading();
      });
    };

    _this.sendOTP = function () {
      var mobileNumber = _this.state.fields.mobileNumber;
      var _this$props$property3 = _this.props.property,
          property = _this$props$property3 === undefined ? {} : _this$props$property3;
      var _property$tenantId4 = property.tenantId,
          tenantId = _property$tenantId4 === undefined ? "" : _property$tenantId4;

      var tenant = _common2.default.tenantId;
      var myHeaders = new Headers();

      myHeaders.append("accept", "application/json, text/plain, */*");
      myHeaders.append("content-type", "application/json;charset=UTF-8");
      var raw = (0, _extends3.default)({}, (0, _updateMobile.getRequestInfo)(), { otp: { mobileNumber: mobileNumber.value, type: "login", tenantId: tenant, userType: "CITIZEN" } });
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(raw),
        redirect: "follow"
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
        console.log("error", error);
        _this.hideLoading();
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
              if (!(_this.props.propertyNumbers.mobileNumber == _this.state.fields.mobileNumber.value)) {
                _context.next = 17;
                break;
              }

              _this.setMessage("PT_SEC_SAME_NUMBER", "ERROR");
              return _context.abrupt("return");

            case 17:
              _this.setMessage();

            case 18:
              if (process.env.REACT_APP_NAME !== "Citizen") {
                _this.updateProperty();
              } else {
                _this.sendOTP();
              }
              _context.next = 24;
              break;

            case 21:
              _context.prev = 21;
              _context.t0 = _context["catch"](0);

              _this.setMessage(_context.t0.message, "ERROR");

            case 24:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[0, 21]]);
    }));
    _this.validateAndCreate = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
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
              if (_this.state.register) {
                _this.createUser();
              } else {
                _this.validateOTP();
              }
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

    _this.setDocFileDetails = function (ind, file, fileStoreId) {
      ind = _this.state.clickedElement != "IDENTITYPROOF" ? 0 : 1;
      var documents = _this.state.documents;
      documents[ind].fileName = file.name;
      documents[ind].fileStoreId = fileStoreId;
      documents[ind].uploaded = true;
      _this.setState({ documents: documents });
      _this.hideLoading();
    };

    _this.showLoading = function () {
      _this.setState({ loadingStatus: "loading" });
    };

    _this.hideLoading = function () {
      _this.setState({ loadingStatus: "loaded" });
    };

    _this.state = {
      fields: getFields(),
      register: false,
      documentsUploaded: [],
      documents: [],
      clickedElement: 0,
      verifyButton: true,
      loadingStatus: "",
      otpButton: false,
      error: {
        errorMessage: "",
        type: ""
      }
    };
    return _this;
  }

  (0, _createClass3.default)(UpdateMobileDialog, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props$propertyNumber = this.props.propertyNumbers,
          propertyNumbers = _props$propertyNumber === undefined ? {} : _props$propertyNumber;
      var _state = this.state,
          _state$fields = _state.fields,
          fields = _state$fields === undefined ? {} : _state$fields,
          _state$error = _state.error,
          error = _state$error === undefined ? {} : _state$error,
          documents = _state.documents,
          loadingStatus = _state.loadingStatus;
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
          title: _react2.default.createElement(_translationNode2.default, {
            label: "PTUPNO_HEADER",
            fontSize: "24px",
            labelStyle: { padding: "2%", backgroundColor: "white", paddingLeft: "4%" },
            labelClassName: "owner-history"
          }),
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
              _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_OWNER_NAME", labelStyle: { color: "rgba(0, 0, 0, 0.604138)", fontSize: "14px" } }),
              _react2.default.createElement(_translationNode2.default, { label: propertyNumbers && propertyNumbers.name, labelStyle: { color: "rgba(0, 0, 0, 0.875)", fontSize: "16px" } })
            ),
            _react2.default.createElement(
              "span",
              { style: { marginRight: "15%" } },
              propertyNumbers && propertyNumbers.mobileNumber != "NA" && _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_CURR_NO", labelStyle: { color: "rgba(0, 0, 0, 0.873302)", fontSize: "14px" } }),
              propertyNumbers && propertyNumbers.mobileNumber != "NA" && _react2.default.createElement(_translationNode2.default, {
                label: propertyNumbers && propertyNumbers.mobileNumber && "+91 " + propertyNumbers.mobileNumber,
                labelStyle: { color: "rgba(0, 0, 0, 0.875)", fontSize: "16px" }
              })
            )
          ),
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "span",
              {
                style: {
                  height: "100px",
                  display: "flex",
                  alignItems: "center"
                }
              },
              " ",
              _react2.default.createElement(_components.MobileNumberField, {
                type: fields[key].type,
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
                }
              })
            ),
            process.env.REACT_APP_NAME !== "Citizen" && _react2.default.createElement(
              "div",
              { style: { marginTop: "10px" } },
              documents.map(function (document, ind) {
                return _react2.default.createElement(
                  "div",
                  null,
                  _react2.default.createElement(_translationNode2.default, { label: document.code, labelStyle: { color: "#000000DF", fontSize: "16px" } }),
                  _react2.default.createElement(_translationNode2.default, { label: "PT_ATTACH_RESTRICTIONS_SIZE" }),
                  _react2.default.createElement(
                    "div",
                    { className: "pt-document-upload-holder" },
                    _react2.default.createElement(
                      "div",
                      { "class": "pt-update-button-wrap" },
                      _react2.default.createElement(
                        "label",
                        { "class": "pt-update-upload-button", "for": document.documentType },
                        (0, _commons.getLocaleLabels)("EVENTS_UPLOAD_FILE", "EVENTS_UPLOAD_FILE")
                      ),
                      _react2.default.createElement("input", {
                        id: document.documentType,
                        accept: document.inputProps.accept,
                        type: "file",
                        onChange: function onChange(e) {
                          return (0, _commons.handleFileUpload)(e, function () {
                            for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
                              props[_key] = arguments[_key];
                            }

                            var i = ind;
                            _this3.setDocFileDetails.apply(_this3, [i].concat(props));
                          }, { inputProps: document.inputProps, maxFileSize: document.maxFileSize, moduleName: "PT" }, function () {
                            _this3.setState({ loadingStatus: "loading", clickedElement: document.documentType });
                          });
                        },
                        onClick: function onClick(event) {
                          event.target.value = null;
                        }
                      })
                    ),
                    document.fileName && _react2.default.createElement(_translationNode2.default, { className: "pt-uploaded-document-label", label: document.fileName })
                  )
                );
              })
            ),
            process.env.REACT_APP_NAME !== "Citizen" && _react2.default.createElement(
              "div",
              { className: "pt-update-verify-container", style: { marginTop: "25px" } },
              _react2.default.createElement(
                "button",
                { type: "button", style: { width: "100%" }, className: "button-verify-link", onClick: function onClick() {
                    return _this3.validateAndSendOtp();
                  } },
                _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_VER_NO" })
              )
            ),
            process.env.REACT_APP_NAME === "Citizen" && _react2.default.createElement(
              "div",
              { className: "pt-update-send-otp-container" },
              _react2.default.createElement(
                "button",
                {
                  type: "button",
                  disabled: this.state.otpButton,
                  style: { marginRight: "5%" },
                  className: "button-verify-link " + (this.state.otpButton && "jk-update-send-disabled"),
                  onClick: function onClick() {
                    return _this3.validateAndSendOtp();
                  }
                },
                _react2.default.createElement(_translationNode2.default, { label: "PTUPNO_SENDOTP" })
              ),
              this.state.otpButton && _react2.default.createElement(
                _react2.default.Fragment,
                null,
                _react2.default.createElement(_translationNode2.default, { label: "CORE_ANOTHER_OTP", labelStyle: { color: "rgba(0, 0, 0, 0.6)", fontSize: "14px" } }),
                _react2.default.createElement(_counter2.default, { updateState: function updateState() {
                    return _this3.setState({ otpButton: false });
                  }, otpButton: this.state.otpButton }),
                _react2.default.createElement(_translationNode2.default, { label: "CS_RESEND_SECONDS", labelStyle: { color: "rgba(0, 0, 0, 0.6)", fontSize: "14px" } })
              )
            )
          ),
          process.env.REACT_APP_NAME === "Citizen" && !this.state.verifyButton && _react2.default.createElement(
            "div",
            { className: "pt-update-verify-container" },
            _react2.default.createElement(
              "span",
              {
                style: {
                  height: "100px",
                  display: "flex",
                  alignItems: "center"
                }
              },
              " ",
              _react2.default.createElement(_components.TextField, {
                type: fields[key1].type,
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
                }
              })
            ),
            _react2.default.createElement(
              "button",
              {
                type: "button",
                disabled: this.state.verifyButton,
                style: { width: "100%", marginTop: "10px" },
                className: "button-verify-link",
                onClick: function onClick() {
                  return _this3.validateAndCreate();
                }
              },
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
      return (0, _extends3.default)({}, state, { documents: props.documents });
    }
  }]);
  return UpdateMobileDialog;
}(_react2.default.Component);

exports.default = UpdateMobileDialog;