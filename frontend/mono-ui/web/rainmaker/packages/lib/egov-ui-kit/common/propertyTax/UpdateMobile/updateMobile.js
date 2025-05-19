"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getRequestInfo = undefined;

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

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _components = require("egov-ui-kit/components");

var _api = require("egov-ui-kit/utils/api");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

var _updateMobileDialog = require("./updateMobileDialog");

var _updateMobileDialog2 = _interopRequireDefault(_updateMobileDialog);

var _warningPopup = require("./warningPopup");

var _warningPopup2 = _interopRequireDefault(_warningPopup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var editIconStyle = (0, _defineProperty3.default)({
  fill: "#767676",
  width: 19,
  height: 20,
  marginRight: 8
}, "fill", "#fe7a51");

var getRequestInfo = exports.getRequestInfo = function getRequestInfo() {
  var auth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return {
    RequestInfo: {
      apiId: "Rainmaker",
      ver: ".01",
      ts: "",
      action: "_create",
      did: "1",
      key: "",
      msgId: "20170310130900|" + localStorage.getItem("locale"),
      authToken: auth
    }
  };
};

var VerifyButton = function VerifyButton(type, openDialog) {
  switch (type) {
    case "UPDATE":
      return _react2.default.createElement(
        "span",
        null,
        _react2.default.createElement(
          "button",
          { className: "button-verify", style: { float: "none", display: "flex", height: "20px" }, onClick: function onClick() {
              return openDialog();
            } },
          " ",
          _react2.default.createElement(_components.Icon, { style: editIconStyle, action: "image", name: "edit" }),
          " ",
          _react2.default.createElement(_translationNode2.default, { label: "PT_EDIT" })
        )
      );
    case "VERIFIED":
      return _react2.default.createElement(
        "span",
        null,
        _react2.default.createElement(
          "button",
          { className: "button-verify", style: { float: "none" }, onClick: function onClick() {
              return openDialog();
            } },
          " ",
          "LINK"
        )
      );
    default:
      return _react2.default.createElement("span", null);
  }
};

var UpdateMobile = function (_React$Component) {
  (0, _inherits3.default)(UpdateMobile, _React$Component);

  function UpdateMobile(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, UpdateMobile);

    var _this = (0, _possibleConstructorReturn3.default)(this, (UpdateMobile.__proto__ || Object.getPrototypeOf(UpdateMobile)).call(this, props));

    _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this.loadProperty();

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.componentDidUpdate = function (prevProps, prevState, snapshot) {
      var _this$props = _this.props,
          _this$props$propertyI = _this$props.propertyId,
          propertyId = _this$props$propertyI === undefined ? "" : _this$props$propertyI,
          _this$props$tenantId = _this$props.tenantId,
          tenantId = _this$props$tenantId === undefined ? "" : _this$props$tenantId,
          isAlternate = _this$props.isAlternate;
      var _prevProps$propertyId = prevProps.propertyId,
          prevPropertyId = _prevProps$propertyId === undefined ? "" : _prevProps$propertyId,
          _prevProps$tenantId = prevProps.tenantId,
          prevTenantId = _prevProps$tenantId === undefined ? "" : _prevProps$tenantId;

      /* if (propertyId != prevPropertyId || tenantId != prevTenantId) { */

      !_this.state.loading && !_this.state.loaded && _this.loadProperty();
      // }

      if (_this.props.type == "WARNING" && _this.props.showWarning == true && prevProps.showWarning == false) {
        var _this$state$property$ = _this.state.property.owners,
            owners = _this$state$property$ === undefined ? [] : _this$state$property$;

        var propertyNumbers = {};
        owners = owners && owners.filter(function (owner) {
          return owner.status == "ACTIVE";
        });

        if (_this.props.number === "NA") {
          owners.filter(function (owner) {
            return owner.alternatemobilenumber == null;
          }).map(function (owner, index) {
            if (index == 0) {
              propertyNumbers = {
                id: owner.id,
                uuid: owner.uuid,
                name: owner.name,
                mobileNumber: "NA",
                type: "owner"
              };
            }
          });
        }

        owners && owners.map(function (owner) {
          var numb = isAlternate ? owner.alternatemobilenumber : owner.mobileNumber;
          if (numb == _this.props.number) {
            propertyNumbers = {
              id: owner.id,
              uuid: owner.uuid,
              name: owner.name,
              mobileNumber: numb,
              type: "owner"
            };
          }
        });

        _this.setState({
          invalidNumber: true,
          propertyNumbers: propertyNumbers,
          loading: false,
          loaded: true
        });
      }
    };

    _this.getProperty = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryParams, propertyId) {
        var property;
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(window && window.propertyResponse && window.propertyResponse[propertyId])) {
                  _context2.next = 4;
                  break;
                }

                return _context2.abrupt("return", window.propertyResponse[propertyId]);

              case 4:
                _context2.next = 6;
                return (0, _api.httpRequest)("property-services/property/_search", "search", queryParams, {});

              case 6:
                property = _context2.sent;

                window.propertyResponse = window.propertyResponse || {};
                window.propertyResponse[propertyId] = property;
                return _context2.abrupt("return", window.propertyResponse[propertyId]);

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    _this.componentWillUnmount = function () {
      _this.setState({
        loading: false,
        loaded: false
      });
      window.propertyResponse = {};
    };

    _this.loadProperty = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
      var _this$props2, _this$props2$property, propertyId, _this$props2$tenantId, tenantId, number, updateNumberConfig, isAlternate, queryParams, propertyResponse, _propertyResponse$Pro, owners, propertyNumbers;

      return _regenerator2.default.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _this.setState({ loading: true });
              _this$props2 = _this.props, _this$props2$property = _this$props2.propertyId, propertyId = _this$props2$property === undefined ? "" : _this$props2$property, _this$props2$tenantId = _this$props2.tenantId, tenantId = _this$props2$tenantId === undefined ? "" : _this$props2$tenantId, number = _this$props2.number, updateNumberConfig = _this$props2.updateNumberConfig, isAlternate = _this$props2.isAlternate;
              queryParams = [{ key: "propertyIds", value: propertyId }, { key: "tenantId", value: tenantId }];

              if (!(propertyId !== "" && tenantId !== "")) {
                _context3.next = 13;
                break;
              }

              _context3.next = 6;
              return _this.getProperty(queryParams, propertyId);

            case 6:
              propertyResponse = _context3.sent;

              _this.setState({ property: propertyResponse.Properties[0] });
              _propertyResponse$Pro = propertyResponse.Properties[0].owners, owners = _propertyResponse$Pro === undefined ? [] : _propertyResponse$Pro;
              propertyNumbers = {};

              owners = owners && owners.filter(function (owner) {
                return owner.status == "ACTIVE";
              });
              owners && owners.map(function (owner) {
                var numb = isAlternate ? owner.alternatemobilenumber : owner.mobileNumber;

                if (_this.props.number === "NA") {
                  owners.filter(function (owner) {
                    return owner.alternatemobilenumber == null;
                  }).map(function (owner, index) {
                    if (index == 0) {
                      propertyNumbers = {
                        id: owner.id,
                        uuid: owner.uuid,
                        name: owner.name,
                        mobileNumber: "NA",
                        type: "owner"
                      };
                    }
                  });
                }

                if (process.env.REACT_APP_NAME !== "Citizen") {
                  if (number == updateNumberConfig.invalidNumber || !number.match(updateNumberConfig["invalidPattern"])) {
                    /* !this.state.skipped&&this.setState({ invalidNumber: true }); */
                  }
                }
                if (numb == number) {
                  if (number == updateNumberConfig.invalidNumber || !number.match(updateNumberConfig["invalidPattern"]) && number == JSON.parse((0, _localStorageUtils.getUserInfo)()).mobileNumber) {
                    /* !this.state.skipped&&this.setState({ invalidNumber: true }); */
                  }
                  propertyNumbers = {
                    id: owner.id,
                    uuid: owner.uuid,
                    name: owner.name,
                    mobileNumber: numb,
                    type: "owner"
                  };
                }
              });
              _this.setState({
                propertyNumbers: propertyNumbers,
                loading: false,
                loaded: true
              });

            case 13:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2);
    }));

    _this.toggleDialog = function () {
      _this.setState({ open: !_this.state.open });
    };

    _this.canShowEditOption = function () {
      // const {isAlternate}=this.props;
      if (window.location.href.includes("/property-tax/property") || window.location.href.includes("/property-tax/my-properties/property")) {
        if (process.env.REACT_APP_NAME === "Citizen") {
          var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)()) || {};
          if (userInfo.mobileNumber && userInfo.mobileNumber == _this.props.number) {
            return true;
          } else if (userInfo.mobileNumber && _this.props.number === "NA" && _this.state.property && _this.state.property.owners && _this.state.property.owners.findIndex(function (owner) {
            return owner.status == "ACTIVE" && owner.mobileNumber == userInfo.mobileNumber;
          }) !== -1) {
            return true;
          } else {
            return false;
          }
        }
        return true;
      }
      return false;
    };

    _this.state = {
      open: false,
      propertyId: "",
      tenantId: "",
      property: {},
      skipped: false,
      loading: false,
      loaded: false,
      invalidNumber: false,
      propertyNumbers: {}
    };
    return _this;
  }

  (0, _createClass3.default)(UpdateMobile, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          _props$propertyId = _props.propertyId,
          propertyId = _props$propertyId === undefined ? "" : _props$propertyId,
          _props$tenantId = _props.tenantId,
          tenantId = _props$tenantId === undefined ? "" : _props$tenantId,
          closeDue = _props.closeDue,
          _props$isAlternate = _props.isAlternate,
          isAlternate = _props$isAlternate === undefined ? false : _props$isAlternate;
      var _state = this.state,
          _state$property = _state.property,
          property = _state$property === undefined ? {} : _state$property,
          _state$propertyNumber = _state.propertyNumbers,
          propertyNumbers = _state$propertyNumber === undefined ? {} : _state$propertyNumber;

      return property && property.status == "ACTIVE" && _react2.default.createElement(
        "div",
        null,
        this.canShowEditOption() && VerifyButton(this.props.type, this.toggleDialog),
        this.state.open && _react2.default.createElement(_updateMobileDialog2.default, {
          open: this.state.open,
          isAlternate: isAlternate,
          documents: this.props.updateNumberConfig.documents,
          loadProperty: this.loadProperty,
          property: property,
          propertyNumbers: propertyNumbers,
          closeDialog: function closeDialog() {
            _this3.toggleDialog();
            closeDue && closeDue();
          }
        }),
        this.state.invalidNumber && this.canShowEditOption() && _react2.default.createElement(_warningPopup2.default, {
          propertyId: propertyId,
          tenantId: tenantId,
          closeDue: closeDue,
          open: this.state.invalidNumber ? true : false,
          closeDialog: function closeDialog() {
            _this3.setState({ invalidNumber: false, skipped: true });
            closeDue && closeDue();
          },
          updateNum: function updateNum() {
            _this3.setState({ invalidNumber: false });
            _this3.toggleDialog();
          }
        })
      );
    }
  }]);
  return UpdateMobile;
}(_react2.default.Component);

exports.default = UpdateMobile;