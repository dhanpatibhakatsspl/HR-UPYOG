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

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _MenuButton = require("egov-ui-framework/ui-molecules/MenuButton");

var _MenuButton2 = _interopRequireDefault(_MenuButton);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _utils = require("../../ui-config/screens/specs/utils");

var _commons2 = require("../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { getRequiredDocData, showHideAdhocPopup } from "egov-billamend/ui-config/screens/specs/utils"
var Footer = function (_React$Component) {
  (0, _inherits3.default)(Footer, _React$Component);

  function Footer() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Footer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Footer.__proto__ || Object.getPrototypeOf(Footer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Footer, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var downloadMenu = [];
      var _props = this.props,
          connectionNumber = _props.connectionNumber,
          tenantId = _props.tenantId,
          toggleSnackbar = _props.toggleSnackbar,
          applicationNo = _props.applicationNo,
          applicationNos = _props.applicationNos,
          businessService = _props.businessService,
          bill = _props.bill,
          isAmendmentInWorkflow = _props.isAmendmentInWorkflow;

      var editButton = {
        label: "Edit",
        labelKey: "WS_MODIFY_CONNECTION_BUTTON",
        link: function () {
          var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
            var due, errLabel, queryObj, isApplicationApproved;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    // checking for the due amount
                    due = (0, _commons.getQueryArg)(window.location.href, "due");
                    errLabel = applicationNo && applicationNo.includes("WS") ? "WS_DUE_AMOUNT_SHOULD_BE_ZERO" : "SW_DUE_AMOUNT_SHOULD_BE_ZERO";

                    if (!(due && parseInt(due) > 0)) {
                      _context.next = 5;
                      break;
                    }

                    toggleSnackbar(true, {
                      labelName: "Due Amount should be zero!",
                      labelKey: errLabel
                    }, "error");

                    return _context.abrupt("return", false);

                  case 5:

                    // check for the WF Exists
                    queryObj = [{ key: "businessIds", value: applicationNos }, { key: "tenantId", value: tenantId }];
                    _context.next = 8;
                    return (0, _commons2.isWorkflowExists)(queryObj);

                  case 8:
                    isApplicationApproved = _context.sent;

                    if (isApplicationApproved) {
                      _context.next = 12;
                      break;
                    }

                    toggleSnackbar(true, {
                      labelName: "WorkFlow already Initiated",
                      labelKey: "WS_WORKFLOW_ALREADY_INITIATED"
                    }, "error");
                    return _context.abrupt("return", false);

                  case 12:
                    _store2.default.dispatch((0, _actions.setRoute)("/wns/apply?applicationNumber=" + applicationNo + "&connectionNumber=" + connectionNumber + "&tenantId=" + tenantId + "&action=edit&mode=MODIFY"));

                  case 13:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, _this2);
          }));

          return function link() {
            return _ref2.apply(this, arguments);
          };
        }()
      };
      var BillAmendment = {
        label: "Edit",
        labelKey: "WS_BILL_AMENDMENT_BUTTON",
        link: function () {
          var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
            var queryObj;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    // checking for the due amount

                    (0, _utils.showHideAdhocPopup)(_this2.props.state, _store2.default.dispatch, "connection-details");
                    // let due = getQueryArg(window.location.href, "due");
                    // let errLabel = (applicationNo && applicationNo.includes("WS"))?"WS_DUE_AMOUNT_SHOULD_BE_ZERO":"SW_DUE_AMOUNT_SHOULD_BE_ZERO";
                    // if(due && (parseInt(due) > 0)){
                    //   toggleSnackbar(
                    //     true,
                    //     {
                    //       labelName: "Due Amount should be zero!",
                    //       labelKey: errLabel
                    //     },
                    //     "error"
                    //   );

                    //   return false;
                    // }

                    // check for the WF Exists
                    queryObj = [{ key: "businessIds", value: applicationNos }, { key: "tenantId", value: tenantId }];

                    // let isApplicationApproved = await isWorkflowExists(queryObj);
                    // if(!isApplicationApproved){
                    //   toggleSnackbar(
                    //     true,
                    //     {
                    //       labelName: "WorkFlow already Initiated",
                    //       labelKey: "WS_WORKFLOW_ALREADY_INITIATED"
                    //     },
                    //     "error"
                    //   );
                    //   return false;
                    // }
                    // store.dispatch(setRoute(`/wns/apply?applicationNumber=${applicationNo}&connectionNumber=${connectionNumber}&tenantId=${tenantId}&action=edit&mode=MODIFY`));

                  case 2:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, _this2);
          }));

          return function link() {
            return _ref3.apply(this, arguments);
          };
        }()
      };
      //if(applicationType === "MODIFY"){
      downloadMenu && downloadMenu.push(editButton);
      if (businessService && (businessService.includes("ws-services-calculation") || businessService.includes("sw-services-calculation"))) {
        if (bill.Demands && bill.Demands.length > 0 && isAmendmentInWorkflow) {
          downloadMenu && downloadMenu.push(BillAmendment);
        }
      }

      //}
      var buttonItems = {
        label: { labelName: "Take Action", labelKey: "WF_TAKE_ACTION" },
        rightIcon: "arrow_drop_down",
        props: {
          variant: "outlined",
          style: {
            marginRight: 15,
            backgroundColor: "#FE7A51",
            color: "#fff",
            border: "none",
            height: "60px",
            width: "200px"
          }
        },
        menu: downloadMenu
      };

      return _react2.default.createElement(
        "div",
        { className: "wf-wizard-footer", id: "custom-atoms-footer" },
        _react2.default.createElement(
          _uiAtoms.Container,
          null,
          _react2.default.createElement(
            _uiAtoms.Item,
            { xs: 12, sm: 12, className: "wf-footer-container" },
            _react2.default.createElement(_MenuButton2.default, { data: buttonItems })
          )
        )
      );
    }
  }]);
  return Footer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var connectionObj = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection", []);
  /* For WorkFlow check */
  var applicationNos = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applicationNos", []);
  var bill = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BILL_FOR_WNS", "");
  var isAmendmentInWorkflow = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "isAmendmentInWorkflow", true);

  var connectDetailsData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "connectDetailsData");

  if (connectionObj.length === 0) {
    connectionObj = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "SewerageConnection", []);
  }
  var applicationNo = connectionObj && connectionObj.length > 0 ? connectionObj[0].applicationNo : "";
  var businessService = connectDetailsData && connectDetailsData.BillingService && connectDetailsData.BillingService.BusinessService && connectDetailsData.BillingService.BusinessService.length && connectDetailsData.BillingService.BusinessService.map(function (item) {
    return item.businessService;
  });
  return { state: state, applicationNo: applicationNo, applicationNos: applicationNos, businessService: businessService, bill: bill, isAmendmentInWorkflow: isAmendmentInWorkflow };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    toggleSnackbar: function toggleSnackbar(open, message, variant) {
      return dispatch((0, _actions2.toggleSnackbar)(open, message, variant));
    },
    setRoute: function setRoute(route) {
      return dispatch((0, _actions.setRoute)(route));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Footer);