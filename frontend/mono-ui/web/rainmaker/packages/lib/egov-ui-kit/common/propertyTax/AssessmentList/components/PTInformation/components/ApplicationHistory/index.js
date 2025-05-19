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

var _recompose = require("recompose");

var _reactRouterDom = require("react-router-dom");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _api = require("egov-ui-kit/utils/api");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _HistoryCard = require("../../../../../Property/components/HistoryCard");

var _HistoryCard2 = _interopRequireDefault(_HistoryCard);

var _AssessmentHistory = require("../AssessmentHistory");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _PTCommon = require("egov-ui-kit/utils/PTCommon");

var _commons = require("egov-ui-kit/utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var labelStyle = {
    letterSpacing: 1.2,
    fontWeight: "500",
    lineHeight: "35px",
    cursor: "pointer"
};

var ApplicationHistory = function (_Component) {
    (0, _inherits3.default)(ApplicationHistory, _Component);

    function ApplicationHistory(props) {
        var _this2 = this;

        (0, _classCallCheck3.default)(this, ApplicationHistory);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ApplicationHistory.__proto__ || Object.getPrototypeOf(ApplicationHistory)).call(this, props));

        _this.getUniqueList = function () {
            var list = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

            // let newList = [];
            // list.map(element => {
            //   if (!JSON.stringify(newList).includes(JSON.stringify(element.acknowldgementNumber))) {
            //     newList.push(element);
            //   }
            // })
            // return newList;
            var propertyObject = {};
            list.map(function (property) {
                if (!propertyObject[property.acknowldgementNumber]) {
                    propertyObject[property.acknowldgementNumber] = (0, _extends3.default)({}, property);
                } else if (propertyObject[property.acknowldgementNumber].status == 'INACTIVE') {
                    propertyObject[property.acknowldgementNumber] = (0, _extends3.default)({}, propertyObject[property.acknowldgementNumber]);
                } else if (propertyObject[property.acknowldgementNumber].status == 'INWORKFLOW' || property.status == 'INACTIVE') {
                    propertyObject[property.acknowldgementNumber] = (0, _extends3.default)({}, property);
                }
            });
            return Object.values(propertyObject);
        };

        _this.getPropertyResponse = function () {
            var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(propertyId, tenantId, dialogName) {
                var prepareFinalObject, queryObject, payload;
                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                prepareFinalObject = _this.props.prepareFinalObject;
                                queryObject = [{ key: "propertyIds", value: propertyId }, { key: "tenantId", value: tenantId }, { key: "audit", value: true }];
                                _context.prev = 2;
                                _context.next = 5;
                                return (0, _api.httpRequest)("property-services/property/_search", "_search", queryObject);

                            case 5:
                                payload = _context.sent;

                                prepareFinalObject("propertiesAudit", payload.Properties);

                                if (!(payload && payload.Properties.length > 0)) {
                                    _context.next = 10;
                                    break;
                                }

                                payload.Properties = _this.getUniqueList(payload.Properties.sort(function (y, x) {
                                    return x.auditDetails.lastModifiedTime - y.auditDetails.lastModifiedTime;
                                }));
                                return _context.abrupt("return", payload.Properties);

                            case 10:
                                _context.next = 15;
                                break;

                            case 12:
                                _context.prev = 12;
                                _context.t0 = _context["catch"](2);

                                console.log(_context.t0);

                            case 15:
                            case "end":
                                return _context.stop();
                        }
                    }
                }, _callee, _this2, [[2, 12]]);
            }));

            return function (_x2, _x3, _x4) {
                return _ref.apply(this, arguments);
            };
        }();

        _this.navigateToApplication = function () {
            var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(acknowldgementNumber, tenantId, creationReason, history, propertyId) {
                var businessService;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                _context2.next = 2;
                                return (0, _commons.getApplicationType)(acknowldgementNumber, tenantId, creationReason);

                            case 2:
                                businessService = _context2.sent;

                                (0, _commons.navigateToApplication)(businessService, history, acknowldgementNumber, tenantId, propertyId);

                            case 4:
                            case "end":
                                return _context2.stop();
                        }
                    }
                }, _callee2, _this2);
            }));

            return function (_x5, _x6, _x7, _x8, _x9) {
                return _ref2.apply(this, arguments);
            };
        }();

        _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
            var _this$props, propertyId, tenantId, history;

            return _regenerator2.default.wrap(function _callee3$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            _this$props = _this.props, propertyId = _this$props.propertyId, tenantId = _this$props.tenantId, history = _this$props.history;

                            if (propertyId) {
                                _this.getPropertyResponse(propertyId, tenantId).then(function (response) {

                                    if (response && response.length > 0) {
                                        var applicationHistoryItem = [];
                                        applicationHistoryItem = response.map(function (item) {
                                            return _react2.default.createElement(
                                                "div",
                                                null,
                                                (0, _AssessmentHistory.getFullRow)("PT_PROPERTY_APPLICATION_NO", item.acknowldgementNumber ? item.acknowldgementNumber : "NA", 12),
                                                (0, _AssessmentHistory.getFullRow)("PT_PROPERTY_ID_NO", item.propertyId ? item.propertyId : "NA", 12),
                                                (0, _AssessmentHistory.getFullRow)("PT_MUTATION_APPLICATION_TYPE", item.creationReason ? item.creationReason : "NA", 12),
                                                (0, _AssessmentHistory.getFullRow)("PT_MUTATION_CREATION_DATE", item.auditDetails && item.auditDetails.createdTime ? (0, _utils.convertEpochToDate)(item.auditDetails.createdTime) : "NA", 12),
                                                (0, _AssessmentHistory.getFullRow)("PT_MUTATION_STATUS", item.status ? item.status : "NA", 12),
                                                _react2.default.createElement(
                                                    "div",
                                                    { className: "application-history", style: { float: "left", marginLeft: "15px" } },
                                                    _react2.default.createElement(
                                                        "a",
                                                        {
                                                            onClick: function onClick() {
                                                                _this.navigateToApplication(item.acknowldgementNumber, item.tenantId, item.creationReason, history, item.propertyId);
                                                            }
                                                        },
                                                        _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_VIEW_DETAILS", color: "rgb(254, 122, 81)", fontSize: "16px", height: "40px", labelStyle: labelStyle })
                                                    )
                                                )
                                            );
                                        });
                                        if (applicationHistoryItem.length > 0) {
                                            _this.setState({ applicationHistoryItem: applicationHistoryItem });
                                        }
                                    }
                                }).catch(function (e) {
                                    console.log("error---", e);
                                });
                            }

                        case 2:
                        case "end":
                            return _context3.stop();
                    }
                }
            }, _callee3, _this2);
        }));

        _this.state = {
            items: [],
            showItems: false,
            errorMessage: "PT_APPLICATION_HISTORY_ERROR",
            applicationHistoryItem: []
        };
        return _this;
    }

    (0, _createClass3.default)(ApplicationHistory, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            var _props = this.props,
                propertyId = _props.propertyId,
                tenantId = _props.tenantId;
            var applicationHistoryItem = this.state.applicationHistoryItem;

            var items = this.state.showItems ? this.state.items : [];
            var errorMessage = this.state.showItems && items.length == 0 ? this.state.errorMessage : '';
            return _react2.default.createElement(_HistoryCard2.default, { header: 'PT_APPLICATION_HISTORY', items: items, errorMessage: errorMessage, onHeaderClick: function onHeaderClick() {
                    if (applicationHistoryItem) _this3.setState({ showItems: !_this3.state.showItems, items: applicationHistoryItem });
                } });
        }
    }]);
    return ApplicationHistory;
}(_react.Component);

var getIdFromUrl = function getIdFromUrl(ownProps) {
    var idFromUrl = {};
    var location = ownProps.location;
    var search = location.search;

    idFromUrl.propertyId = (0, _PTCommon.getQueryValue)(search, "propertyId");
    idFromUrl.tenantId = (0, _PTCommon.getQueryValue)(search, "tenantId");
    return idFromUrl;
};

var mapStateToProps = function mapStateToProps(state, ownProps) {
    // const { Bill = [], Payments = [] } = state.properties || {};
    var propertyId = decodeURIComponent(ownProps.match.params.propertyId);
    var tenantId = decodeURIComponent(ownProps.match.params.tenantId);
    propertyId = !propertyId || propertyId === "undefined" ? getIdFromUrl(ownProps).propertyId : propertyId;
    tenantId = !tenantId || tenantId === "undefined" ? getIdFromUrl(ownProps).tenantId : tenantId;
    return {
        propertyId: propertyId,
        tenantId: tenantId
    };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
    return {
        prepareFinalObject: function prepareFinalObject(jsonPath, value) {
            return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
        }
    };
};

exports.default = (0, _recompose.compose)(_reactRouterDom.withRouter, (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps))(ApplicationHistory);