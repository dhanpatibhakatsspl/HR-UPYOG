"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _styles = require("@material-ui/core/styles");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _LabelContainer = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

require("./index.css");

var _utils2 = require("../../ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

var SingleApplication = function (_React$Component) {
  (0, _inherits3.default)(SingleApplication, _React$Component);

  function SingleApplication() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SingleApplication);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SingleApplication.__proto__ || Object.getPrototypeOf(SingleApplication)).call.apply(_ref, [this].concat(args))), _this), _this.componentDidMount = function () {}, _this.setBusinessServiceDataToLocalStorage = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject) {
        var toggleSnackbar, payload;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                toggleSnackbar = _this.props.toggleSnackbar;
                _context.prev = 1;
                _context.next = 4;
                return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/businessservice/_search", "_search", queryObject);

              case 4:
                payload = _context.sent;

                (0, _localStorageUtils.localStorageSet)("businessServiceData", JSON.stringify((0, _get2.default)(payload, "BusinessServices")));
                return _context.abrupt("return", (0, _get2.default)(payload, "BusinessServices"));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](1);

                toggleSnackbar(true, {
                  labelName: "Not authorized to access Business Service!",
                  labelKey: "ERR_NOT_AUTHORISED_BUSINESS_SERVICE"
                }, "error");

              case 12:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[1, 9]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.onCardClick = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(item) {
        var _this$props, moduleName, toggleSnackbar, setRoute, wfCode, businessServiceQueryObject, userInfo, roles, businessService;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props = _this.props, moduleName = _this$props.moduleName, toggleSnackbar = _this$props.toggleSnackbar, setRoute = _this$props.setRoute;

                if (!(moduleName === "BIRTH")) {
                  _context2.next = 5;
                  break;
                }

                if (item.status == "PAID_DOWNLOAD" || item.status == "PAID") setRoute("/uc-citizen/search?applicationNumber=" + item.applicationNumber);
                _context2.next = 59;
                break;

              case 5:
                if (!(moduleName === "LAMS")) {
                  _context2.next = 13;
                  break;
                }

                _context2.t0 = item.status;
                _context2.next = _context2.t0 === "APPLIED" ? 9 : _context2.t0 === "APPROVED" ? 9 : _context2.t0 === "REJECTED" ? 9 : _context2.t0 === "CEO-EXAMINATION" ? 9 : _context2.t0 === "DEO-EXAMINATION" ? 9 : _context2.t0 === "PDDE-EXAMINATION" ? 9 : _context2.t0 === "DGDE-EXAMINATION" ? 9 : _context2.t0 === "MOD-EXAMINATION" ? 9 : _context2.t0 === "CITIZEN-REVIEW" ? 9 : 9;
                break;

              case 9:
                setRoute("/lams-common/search-preview?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId);
                return _context2.abrupt("break", 11);

              case 11:
                _context2.next = 59;
                break;

              case 13:
                if (!(moduleName === "TL")) {
                  _context2.next = 20;
                  break;
                }

                wfCode = (0, _get2.default)(item, "workflowCode");
                businessServiceQueryObject = [{ key: "tenantId", value: (0, _get2.default)(item, "tenantId") }, {
                  key: "businessServices",
                  value: wfCode
                }];

                _this.setBusinessServiceDataToLocalStorage(businessServiceQueryObject);
                switch (item.status) {
                  case "INITIATED":
                    setRoute("/tradelicense-citizen/apply?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId);
                  default:
                    setRoute("/tradelicence/search-preview?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId);
                }
                _context2.next = 59;
                break;

              case 20:
                if (!(moduleName === "FIRENOC")) {
                  _context2.next = 24;
                  break;
                }

                switch (item.fireNOCDetails.status) {
                  case "INITIATED":
                    setRoute("/fire-noc/apply?applicationNumber=" + item.fireNOCDetails.applicationNumber + "&tenantId=" + item.tenantId);
                  default:
                    setRoute("/fire-noc/search-preview?applicationNumber=" + item.fireNOCDetails.applicationNumber + "&tenantId=" + item.tenantId);
                }
                _context2.next = 59;
                break;

              case 24:
                if (!(moduleName === "BPAREG")) {
                  _context2.next = 53;
                  break;
                }

                userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
                roles = (0, _get2.default)(userInfo, "roles");

                if (!(item.serviceType === "BPAREG")) {
                  _context2.next = 36;
                  break;
                }

                _context2.t1 = item.status;
                _context2.next = _context2.t1 === "INITIATED" ? 31 : 33;
                break;

              case 31:
                setRoute("/bpastakeholder-citizen/apply?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId);
                return _context2.abrupt("break", 34);

              case 33:
                setRoute("/bpastakeholder/search-preview?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId);

              case 34:
                _context2.next = 51;
                break;

              case 36:
                if (!(item.serviceType === "BPA_OC")) {
                  _context2.next = 45;
                  break;
                }

                _context2.t2 = item.appStatus;
                _context2.next = _context2.t2 === "INITIATED" ? 40 : 42;
                break;

              case 40:
                if (roles && roles.length == 1 && roles[0].code == "CITIZEN") {
                  setRoute("/oc-bpa/search-preview?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId + "&type=" + item.type);
                } else {
                  setRoute("/oc-bpa/apply?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId);
                }
                return _context2.abrupt("break", 43);

              case 42:
                setRoute("/oc-bpa/search-preview?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId + "&type=" + item.type);

              case 43:
                _context2.next = 51;
                break;

              case 45:
                _context2.t3 = item.appStatus;
                _context2.next = _context2.t3 === "INITIATED" ? 48 : 50;
                break;

              case 48:
                if (roles && roles.length == 1 && roles[0].code == "CITIZEN") {
                  setRoute("/egov-bpa/search-preview?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId + "&type=" + item.type);
                } else {
                  setRoute("/egov-bpa/apply?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId);
                }
                return _context2.abrupt("break", 51);

              case 50:
                setRoute("/egov-bpa/search-preview?applicationNumber=" + item.applicationNumber + "&tenantId=" + item.tenantId + "&type=" + item.type);

              case 51:
                _context2.next = 59;
                break;

              case 53:
                if (!(moduleName === "PT-MUTATION")) {
                  _context2.next = 59;
                  break;
                }

                if (!item.acknowldgementNumber) {
                  _context2.next = 59;
                  break;
                }

                _context2.next = 57;
                return (0, _commons.getApplicationType)(item.acknowldgementNumber, item.tenantId, item.creationReason);

              case 57:
                businessService = _context2.sent;

                if (businessService) {
                  // navigateToApplication(businessService, this.props.history, item.acknowldgementNumber, item.tenantId, item.propertyId);
                  if (businessService == 'PT.MUTATION') {
                    setRoute("/pt-mutation/search-preview?applicationNumber=" + item.acknowldgementNumber + "&propertyId=" + item.propertyId + "&tenantId=" + item.tenantId);
                  } else if (businessService == 'PT.CREATE') {
                    setRoute("/property-tax/application-preview?propertyId=" + item.propertyId + "&applicationNumber=" + item.acknowldgementNumber + "&tenantId=" + item.tenantId + "&type=property");
                  } else {}
                } else {
                  toggleSnackbar(true, {
                    labelName: "Business service returns empty response!",
                    labelKey: "BND_NO_BUSINESS_SERVICE"
                  }, "error");
                }

              case 59:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.onButtonCLick = function () {
      var _this$props2 = _this.props,
          setRoute = _this$props2.setRoute,
          homeURL = _this$props2.homeURL;

      setRoute(homeURL);
    }, _this.generatevalidity = function (item) {
      var validFrom = item.validFrom ? (0, _utils.convertEpochToDate)((0, _get2.default)(item, "validFrom")) : "NA";
      var validTo = item.validTo ? (0, _utils.convertEpochToDate)((0, _get2.default)(item, "validTo")) : "NA";
      var validity = validFrom + " - " + validTo;
      return validity;
    }, _this.generateLabelKey = function (content, item) {
      var LabelKey = "";
      if (content.prefix && content.suffix) {
        LabelKey = "" + content.prefix + (0, _get2.default)(item, content.jsonPath, "").replace(/[._:-\s\/]/g, "_") + content.suffix;
      } else if (content.prefix) {
        LabelKey = "" + content.prefix + (0, _get2.default)(item, content.jsonPath, "").replace(/[._:-\s\/]/g, "_");
      } else if (content.suffix) {
        LabelKey = "" + (0, _get2.default)(item, content.jsonPath, "").replace(/[._:-\s\/]/g, "_") + content.suffix;
      } else {
        LabelKey = content.label === "PT_MUTATION_CREATION_DATE" ? "" + (0, _commons.epochToDate)((0, _get2.default)(item, content.jsonPath, "")) : "" + (0, _get2.default)(item, content.jsonPath, "");
      }
      if (content.isDate) {
        LabelKey = "" + (0, _commons.epochToDate)((0, _get2.default)(item, content.jsonPath, ""));
      }
      return LabelKey;
    }, _this.onDownloadCertClicked = function (item) {
      var callPostPaymentActivity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
      var certificateDowloadHandler = _this.props.certificateDowloadHandler;

      certificateDowloadHandler(item.fileStoreId);
      if (callPostPaymentActivity) (0, _utils2.postPaymentActivity)({ consumerCode: item.applicationNumber, tenantId: item.tenantId, businessService: item.applicationCategory == "Birth" ? "BIRTH_CERT" : "DEATH_CERT" }, false);
    }, _this.onDownloadReceiptClicked = function (item) {
      var downloadReceiptHandler = _this.props.downloadReceiptHandler;

      downloadReceiptHandler(item.applicationNumber, item.tenantId);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SingleApplication, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          searchResults = _props.searchResults,
          classes = _props.classes,
          contents = _props.contents,
          moduleName = _props.moduleName,
          setRoute = _props.setRoute;

      return _react2.default.createElement(
        "div",
        { className: "application-card" },
        searchResults && searchResults.length > 0 ? searchResults.map(function (item) {
          return _react2.default.createElement(
            _Card2.default,
            { className: classes.card },
            _react2.default.createElement(
              _CardContent2.default,
              null,
              _react2.default.createElement(
                "div",
                null,
                contents.map(function (content) {
                  return _react2.default.createElement(
                    _Grid2.default,
                    { container: true, style: { marginBottom: 12 } },
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: content.label,
                        fontSize: 14,
                        style: {
                          fontSize: 14,
                          color: "rgba(0, 0, 0, 0.60"
                        }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: _this3.generateLabelKey(content, item),
                        fontSize: 14,
                        checkValueForNA: _utils.checkValueForNA,
                        style: {
                          fontSize: 14,
                          color: "rgba(0, 0, 0, 0.87"
                        }
                      })
                    )
                  );
                }),
                moduleName === "TL" && _react2.default.createElement(
                  "div",
                  null,
                  _react2.default.createElement(
                    _Grid2.default,
                    { container: true, style: { marginBottom: 12 } },
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: "TL_COMMON_TABLE_VALIDITY",
                        fontSize: 14,
                        style: {
                          fontSize: 14,
                          color: "rgba(0, 0, 0, 0.60"
                        }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: _this3.generatevalidity(item),
                        fontSize: 14,
                        checkValueForNA: _utils.checkValueForNA,
                        style: {
                          fontSize: 14,
                          color: "rgba(0, 0, 0, 0.87"
                        }
                      })
                    )
                  )
                ),
                _react2.default.createElement(
                  "div",
                  { style: { display: "flex" } },
                  item.status == "FREE_DOWNLOAD" && item.fileStoreId && item.fileStoreId != "EXPIRED" && /* <Link to={this.onCardClick(item)}> */
                  _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                      "div",
                      { style: { cursor: "pointer", paddingLeft: "0px", padding: "2px" }, onClick: function onClick() {
                          _this3.onDownloadCertClicked(item, false);
                        } },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: "BND_DOWNLOAD_CERTIFICATE",
                        textTransform: "uppercase",
                        style: {
                          color: "#fe7a51",
                          fontSize: 14,
                          textTransform: "uppercase"
                        }
                      })
                    )
                  ),
                  (item.status == "PAID" || item.status == "PAID_DOWNLOAD" || item.status == "PAID_PDF_GENERATED") && item.fileStoreId && item.fileStoreId != "EXPIRED" && /* <Link to={this.onCardClick(item)}> */
                  _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                      "div",
                      { style: { cursor: "pointer", paddingLeft: "0px", padding: "2px" }, onClick: function onClick() {
                          _this3.onDownloadCertClicked(item);
                        } },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelKey: "BND_DOWNLOAD_CERTIFICATE",
                        textTransform: "uppercase",
                        style: {
                          color: "#fe7a51",
                          fontSize: 14,
                          textTransform: "uppercase"
                        }
                      })
                    )
                  ),
                  (item.status == "PAID" || item.status == "PAID_DOWNLOAD" || item.status == "PAID_PDF_GENERATED") && !item.fileStoreId && /* <Link to={this.onCardClick(item)}> */
                  _react2.default.createElement(
                    "div",
                    { style: { cursor: "pointer", paddingLeft: "0px", padding: "4px" }, onClick: function onClick() {
                        location.reload();
                      } },
                    _react2.default.createElement(_LabelContainer2.default, {
                      labelKey: "BND_CERT_GEN_ERROR",
                      textTransform: "uppercase",
                      style: {
                        color: "#ff6f6f",
                        fontSize: 14
                      }
                    })
                  ),
                  (item.status == "PAID" || item.status == "PAID_DOWNLOAD" || item.status == "PAID_PDF_GENERATED") && /* <Link to={this.onCardClick(item)}> */
                  _react2.default.createElement(
                    "div",
                    { style: { cursor: "pointer", paddingLeft: "10px !important", padding: "2px", marginLeft: "5px" }, onClick: function onClick() {
                        var url = _this3.onDownloadReceiptClicked(item);
                        // setRoute(url);
                      } },
                    _react2.default.createElement(_LabelContainer2.default, {
                      labelKey: "BND_GET_RECIEPT",
                      textTransform: "uppercase",
                      style: {
                        color: "#fe7a51",
                        fontSize: 14,
                        textTransform: "uppercase"
                      }
                    })
                  )
                )
              )
            )
          );
        }) : _react2.default.createElement(
          "div",
          { className: "no-assessment-message-cont" },
          _react2.default.createElement(_LabelContainer2.default, {
            labelKey: "No results Found!",
            style: { marginBottom: 10 }
          })
        )
      );
    }
  }]);
  return SingleApplication;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var searchResultsRaw = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchResults", []);
  var searchResults = (0, _orderBy2.default)(searchResultsRaw, ["auditDetails.lastModifiedTime"], ["desc"]);
  searchResults = searchResults ? searchResults : searchResultsRaw;
  var screenConfig = (0, _get2.default)(state.screenConfiguration, "screenConfig");
  return { screenConfig: screenConfig, searchResults: searchResults };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(path) {
      return dispatch((0, _actions.setRoute)(path));
    },
    toggleSnackbar: function toggleSnackbar(open, message, type) {
      return dispatch((0, _actions2.toggleSnackbar)(open, message, type));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(SingleApplication));