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

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _components = require("egov-ui-kit/components");

var _api = require("egov-ui-kit/utils/api");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _lodash = require("lodash");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _alternateMobileDialog = require("./alternateMobileDialog");

var _alternateMobileDialog2 = _interopRequireDefault(_alternateMobileDialog);

require("./index.css");

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
        "RequestInfo": {
            "apiId": "Rainmaker",
            "ver": ".01",
            "ts": "",
            "action": "_create",
            "did": "1",
            "key": "",
            "msgId": "20170310130900|" + localStorage.getItem("locale"),
            "authToken": auth
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
                    { className: "button-verify", style: { "float": "none", "display": "flex", "height": "20px" }, onClick: function onClick() {
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
                    { className: "button-verify", style: { "float": "none" }, onClick: function onClick() {
                            return openDialog();
                        } },
                    "  LINK"
                )
            );
        case "LINKNUM":
            return _react2.default.createElement(
                "div",
                { className: "text-alter-link" },
                _react2.default.createElement(_translationNode2.default, { label: "PT_SEC_LINK_NO_TEXT", fontSize: "16px", labelStyle: { color: "#FE7A51", fontWeight: '400' } }),
                _react2.default.createElement(
                    "button",
                    { type: "button", className: "button-alter-link", onClick: function onClick() {
                            return openDialog();
                        } },
                    _react2.default.createElement(_translationNode2.default, { label: "PT_SEC_LINK_NO_BTN" })
                )
            );
        default:
            return _react2.default.createElement("span", null);
    }
};

var AlternateMobile = function (_React$Component) {
    (0, _inherits3.default)(AlternateMobile, _React$Component);

    function AlternateMobile(props) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, AlternateMobile);

        var _this = (0, _possibleConstructorReturn3.default)(this, (AlternateMobile.__proto__ || Object.getPrototypeOf(AlternateMobile)).call(this, props));

        _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var resp;
            return _regenerator2.default.wrap(function _callee$(_context) {
                while (1) {
                    switch (_context.prev = _context.next) {
                        case 0:
                            _this.loadProperty();
                            _context.next = 3;
                            return _this.getMDMS();

                        case 3:
                            resp = _context.sent;

                            _this.setState({ documents: (0, _lodash.get)(resp, "MdmsRes.PropertyTax.UpdateNumber[0].documents", []) });

                        case 5:
                        case "end":
                            return _context.stop();
                    }
                }
            }, _callee, _this2);
        }));
        _this.getMDMS = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var mdmsResp;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
                while (1) {
                    switch (_context2.prev = _context2.next) {
                        case 0:
                            if (!(window && window.mdmsResponse && window.mdmsResponse['doc'])) {
                                _context2.next = 4;
                                break;
                            }

                            return _context2.abrupt("return", window.mdmsResponse['doc']);

                        case 4:
                            _context2.next = 6;
                            return (0, _api.httpRequest)("egov-mdms-service/v1/_search", "search", [], {
                                "MdmsCriteria": {
                                    "tenantId": _common2.default.tenantId,
                                    "moduleDetails": [{
                                        "moduleName": "PropertyTax",
                                        "masterDetails": [{
                                            "name": "UpdateNumber"
                                        }]
                                    }]
                                }
                            });

                        case 6:
                            mdmsResp = _context2.sent;

                            window.mdmsResponse = window.mdmsResponse || {};
                            window.mdmsResponse['doc'] = mdmsResp;
                            return _context2.abrupt("return", window.mdmsResponse['doc']);

                        case 10:
                        case "end":
                            return _context2.stop();
                    }
                }
            }, _callee2, _this2);
        }));

        _this.getProperty = function () {
            var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryParams, propertyId) {
                var cache = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
                var customRequestInfo, property;
                return _regenerator2.default.wrap(function _callee3$(_context3) {
                    while (1) {
                        switch (_context3.prev = _context3.next) {
                            case 0:
                                if (!(window && window.propertyResponse && window.propertyResponse[propertyId] && !cache)) {
                                    _context3.next = 4;
                                    break;
                                }

                                return _context3.abrupt("return", window.propertyResponse[propertyId]);

                            case 4:
                                customRequestInfo = {};

                                if (window.location.pathname.includes('withoutAuth')) {
                                    customRequestInfo = {
                                        apiId: "Rainmaker",
                                        ver: ".01",
                                        ts: "",
                                        action: "_search",
                                        did: "1",
                                        key: "",
                                        authToken: cache ? cache : null
                                    };
                                    if (!cache) {
                                        queryParams.push({ key: "locality", value: localStorage.getItem("pt-searched-locality") });
                                    }
                                }

                                _context3.next = 8;
                                return (0, _api.httpRequest)("property-services/property/_search", "search", queryParams, {}, [], customRequestInfo);

                            case 8:
                                property = _context3.sent;

                                window.propertyResponse = window.propertyResponse || {};
                                window.propertyResponse[propertyId] = property;
                                return _context3.abrupt("return", window.propertyResponse[propertyId]);

                            case 12:
                            case "end":
                                return _context3.stop();
                        }
                    }
                }, _callee3, _this2);
            }));

            return function (_x2, _x3) {
                return _ref3.apply(this, arguments);
            };
        }();

        _this.componentWillUnmount = function () {
            window.propertyResponse = {};
        };

        _this.setProperty = function () {
            var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
                var auth = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                var _this$props, _this$props$propertyI, propertyId, _this$props$tenantId, tenantId, queryParams, propertyResponse;

                return _regenerator2.default.wrap(function _callee4$(_context4) {
                    while (1) {
                        switch (_context4.prev = _context4.next) {
                            case 0:
                                _this$props = _this.props, _this$props$propertyI = _this$props.propertyId, propertyId = _this$props$propertyI === undefined ? "" : _this$props$propertyI, _this$props$tenantId = _this$props.tenantId, tenantId = _this$props$tenantId === undefined ? "" : _this$props$tenantId;
                                queryParams = [{ key: "propertyIds", value: propertyId }, { key: "tenantId", value: tenantId }];
                                _context4.next = 4;
                                return _this.getProperty(queryParams, propertyId, auth);

                            case 4:
                                propertyResponse = _context4.sent;

                                _this.setState({ property: propertyResponse.Properties[0] });

                            case 6:
                            case "end":
                                return _context4.stop();
                        }
                    }
                }, _callee4, _this2);
            }));

            return function () {
                return _ref4.apply(this, arguments);
            };
        }();

        _this.loadProperty = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5() {
            var _this$props2, _this$props2$property, propertyId, _this$props2$tenantId, tenantId, queryParams, propertyNumbers, propertyResponse, _propertyResponse$Pro, owners, newOwner;

            return _regenerator2.default.wrap(function _callee5$(_context5) {
                while (1) {
                    switch (_context5.prev = _context5.next) {
                        case 0:
                            _this$props2 = _this.props, _this$props2$property = _this$props2.propertyId, propertyId = _this$props2$property === undefined ? "" : _this$props2$property, _this$props2$tenantId = _this$props2.tenantId, tenantId = _this$props2$tenantId === undefined ? "" : _this$props2$tenantId;
                            queryParams = [{ key: "propertyIds", value: propertyId }, { key: "tenantId", value: tenantId }];
                            propertyNumbers = {};

                            if (!(propertyId !== "" && tenantId !== "")) {
                                _context5.next = 12;
                                break;
                            }

                            _context5.next = 6;
                            return _this.getProperty(queryParams, propertyId);

                        case 6:
                            propertyResponse = _context5.sent;

                            _this.setState({ property: propertyResponse.Properties[0] });
                            _propertyResponse$Pro = propertyResponse.Properties[0].owners, owners = _propertyResponse$Pro === undefined ? [] : _propertyResponse$Pro;
                            newOwner = owners.find(function (owner) {
                                return owner.status == "ACTIVE";
                            }) || {};

                            propertyNumbers = {
                                "id": newOwner.id,
                                "uuid": newOwner.uuid,
                                "name": newOwner.name,
                                "mobileNumber": window.location.pathname.includes('withoutAuth') ? localStorage.getItem('pay-bill-mobile') : newOwner.mobileNumber,
                                "type": "owner"
                            };
                            /* this.setState({ propertyNumbers: propertyNumbers, showWarning: true }); */
                            _this.setState({ propertyNumbers: propertyNumbers, showWarning: !owners.some(function (owner) {
                                    return owner.alternatemobilenumber && owner.status == "ACTIVE";
                                }) });

                        case 12:
                        case "end":
                            return _context5.stop();
                    }
                }
            }, _callee5, _this2);
        }));

        _this.toggleDialog = function () {
            _this.setState({ open: !_this.state.open });
        };

        _this.state = {
            open: false,
            propertyId: "",
            tenantId: "",
            showWarning: false,
            documents: [],
            property: {},
            propertyNumbers: {}
        };
        return _this;
    }

    (0, _createClass3.default)(AlternateMobile, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var _state = this.state,
                _state$property = _state.property,
                property = _state$property === undefined ? {} : _state$property,
                showWarning = _state.showWarning,
                propertyNumbers = _state.propertyNumbers,
                open = _state.open,
                documents = _state.documents;

            var isWithoutAuth = window.location.href.includes('withoutAuth');
            return property && property.status == "ACTIVE" && isWithoutAuth && _react2.default.createElement(
                "div",
                null,
                showWarning && VerifyButton(this.props.type, this.toggleDialog),
                open && _react2.default.createElement(_alternateMobileDialog2.default, {
                    open: open,
                    documents: documents,
                    setProperty: this.setProperty,
                    propertyNumbers: propertyNumbers,
                    property: property,
                    closeDialog: function closeDialog() {
                        _this3.toggleDialog();
                    }
                })
            );
        }
    }]);
    return AlternateMobile;
}(_react2.default.Component);

exports.default = AlternateMobile;