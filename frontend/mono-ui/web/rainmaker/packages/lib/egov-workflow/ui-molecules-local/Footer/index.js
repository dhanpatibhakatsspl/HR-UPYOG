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

var _api = require("egov-ui-framework/ui-utils/api");

var _actions3 = require("egov-ui-kit/redux/common/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _ = require("../");

var _commons = require("../../ui-utils/commons");

var _downloadItems = require("./downloadItems");

require("./index.css");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Footer = function (_React$Component) {
  (0, _inherits3.default)(Footer, _React$Component);

  function Footer() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Footer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Footer.__proto__ || Object.getPrototypeOf(Footer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      data: {},
      employeeList: []
      //responseLength: 0
    }, _this.getDownloadData = function () {
      var _this$props = _this.props,
          dataPath = _this$props.dataPath,
          state = _this$props.state;

      var data = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject." + dataPath);

      var _ref2 = data && data[0] || "",
          status = _ref2.status,
          applicationNumber = _ref2.applicationNumber;

      return {
        label: "Download",
        leftIcon: "cloud_download",
        rightIcon: "arrow_drop_down",
        props: { variant: "outlined", style: { marginLeft: 10 } },
        menu: (0, _downloadItems.getDownloadItems)(status, applicationNumber, state).downloadMenu
        // menu: ["One ", "Two", "Three"]
      };
    }, _this.getPrintData = function () {
      var _this$props2 = _this.props,
          dataPath = _this$props2.dataPath,
          state = _this$props2.state;

      var data = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject." + dataPath);

      var _ref3 = data && data[0] || "",
          status = _ref3.status,
          applicationNumber = _ref3.applicationNumber;

      return {
        label: "Print",
        leftIcon: "print",
        rightIcon: "arrow_drop_down",
        props: { variant: "outlined", style: { marginLeft: 10 } },
        // menu: ["One ", "Two", "Three"]
        menu: (0, _downloadItems.getDownloadItems)(status, applicationNumber, state).printMenu
      };
    }, _this.openActionDialog = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(item) {
        var _this$props3, handleFieldChange, setRoute, dataPath, employeeList, applicationNumber, tenantId, url, _tenantId, queryObj, payload;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props3 = _this.props, handleFieldChange = _this$props3.handleFieldChange, setRoute = _this$props3.setRoute, dataPath = _this$props3.dataPath;
                employeeList = [];

                if (item.buttonLabel === "ACTIVATE_CONNECTION") {
                  if (item.moduleName === "NewWS1" || item.moduleName === "NewSW1") {
                    item.showEmployeeList = false;
                  }
                }
                if (dataPath === "BPA") {
                  handleFieldChange(dataPath + ".comment", "");
                  handleFieldChange(dataPath + ".wfDocuments", []);
                  handleFieldChange(dataPath + ".assignees", "");
                } else if (dataPath === "FireNOCs") {
                  handleFieldChange(dataPath + "[0].fireNOCDetails.additionalDetail.comment", "");
                  handleFieldChange(dataPath + "[0].fireNOCDetails.additionalDetail.assignee", []);
                  handleFieldChange(dataPath + "[0].fireNOCDetails.additionalDetail.wfDocuments", []);
                } else if (dataPath === "Property") {
                  handleFieldChange(dataPath + ".workflow.comment", "");
                  handleFieldChange(dataPath + ".workflow.assignes", []);
                  handleFieldChange(dataPath + ".workflow.wfDocuments", []);
                } else {
                  handleFieldChange(dataPath + "[0].comment", "");
                  handleFieldChange(dataPath + "[0].wfDocuments", []);
                  handleFieldChange(dataPath + "[0].assignee", []);
                }

                applicationNumber = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
                tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");

                if (item.moduleName == "FIRENOC" && item.buttonLabel == "APPLY") {
                  setRoute("/fire-noc/apply?applicationNumber=" + applicationNumber + "&tenantId=" + tenantId);
                }

                if (!item.isLast) {
                  _context.next = 15;
                  break;
                }

                url = process.env.NODE_ENV === "development" ? item.buttonUrl : item.buttonUrl;

                /* Quick fix for edit mutation application */

                if (!url.includes('pt-mutation/apply')) {
                  _context.next = 13;
                  break;
                }

                url = url + '&mode=MODIFY';
                window.location.href = url.replace("/pt-mutation/", '');
                return _context.abrupt("return");

              case 13:

                setRoute(url);
                return _context.abrupt("return");

              case 15:
                if (!(item.showEmployeeList && process.env.REACT_APP_NAME !== "Citizen")) {
                  _context.next = 22;
                  break;
                }

                _tenantId = (0, _localStorageUtils.getTenantId)();
                queryObj = [{
                  key: "roles",
                  value: item.roles
                }, {
                  key: "tenantId",
                  value: _tenantId
                }, {
                  key: "isActive",
                  value: true
                }];
                _context.next = 20;
                return (0, _api.httpRequest)("post", "/egov-hrms/employees/_search", "", queryObj);

              case 20:
                payload = _context.sent;

                employeeList = payload && payload.Employees.map(function (item, index) {
                  var name = (0, _get2.default)(item, "user.name");
                  return {
                    value: item.uuid,
                    label: name
                  };
                });

              case 22:

                _this.setState({ open: true, data: item, employeeList: employeeList });

              case 23:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2);
      }));

      return function (_x) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.onClose = function () {
      _this.setState({
        open: false
      });
    }, _this.renewTradelicence = function () {
      var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(financialYear, tenantId, routeUrl) {
        var _this$props4, setRoute, state, toggleSnackbar, licences, nextFinancialYear, AllLicences, wfCode, response, renewedapplicationNo, licenseNumber;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props4 = _this.props, setRoute = _this$props4.setRoute, state = _this$props4.state, toggleSnackbar = _this$props4.toggleSnackbar;
                licences = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses");

                _this.props.showSpinner();
                _context2.next = 5;
                return (0, _commons.getNextFinancialYearForRenewal)(financialYear);

              case 5:
                nextFinancialYear = _context2.sent;
                AllLicences = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "AllLicences", []);

                if (!(nextFinancialYear && AllLicences && Array.isArray(AllLicences))) {
                  _context2.next = 12;
                  break;
                }

                if (!(AllLicences.filter(function (licence) {
                  return licence.financialYear == nextFinancialYear;
                }).length > 0)) {
                  _context2.next = 12;
                  break;
                }

                _this.props.hideSpinner();

                toggleSnackbar(true, {
                  labelName: "Please fill all the mandatory fields!",
                  labelKey: "TL_RENEWAL_APPLICATION_EXITS_ALREADY"
                }, "error");
                return _context2.abrupt("return");

              case 12:
                if (!routeUrl) {
                  _context2.next = 15;
                  break;
                }

                _this.props.setRoute(routeUrl);
                return _context2.abrupt("return");

              case 15:
                wfCode = "DIRECTRENEWAL";

                (0, _set2.default)(licences[0], "action", "INITIATE");
                (0, _set2.default)(licences[0], "workflowCode", wfCode);
                (0, _set2.default)(licences[0], "applicationType", "RENEWAL");
                (0, _set2.default)(licences[0], "financialYear", nextFinancialYear);

                _context2.prev = 20;
                _context2.next = 23;
                return (0, _api.httpRequest)("post", "/tl-services/v1/_update", "", [], {
                  Licenses: licences
                });

              case 23:
                response = _context2.sent;
                renewedapplicationNo = (0, _get2.default)(response, "Licenses[0].applicationNumber");
                licenseNumber = (0, _get2.default)(response, "Licenses[0].licenseNumber");

                _this.props.hideSpinner();
                setRoute("/tradelicence/acknowledgement?purpose=DIRECTRENEWAL&status=success&applicationNumber=" + renewedapplicationNo + "&licenseNumber=" + licenseNumber + "&FY=" + nextFinancialYear + "&tenantId=" + tenantId + "&action=" + wfCode);
                _context2.next = 34;
                break;

              case 30:
                _context2.prev = 30;
                _context2.t0 = _context2["catch"](20);

                _this.props.hideSpinner();
                toggleSnackbar(true, {
                  labelName: "Please fill all the mandatory fields!",
                  labelKey: _context2.t0 && _context2.t0.message || _context2.t0
                }, "error");

              case 34:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[20, 30]]);
      }));

      return function (_x2, _x3, _x4) {
        return _ref5.apply(this, arguments);
      };
    }(), _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Footer, [{
    key: "render",
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          contractData = _props.contractData,
          handleFieldChange = _props.handleFieldChange,
          onDialogButtonClick = _props.onDialogButtonClick,
          dataPath = _props.dataPath,
          moduleName = _props.moduleName,
          state = _props.state,
          dispatch = _props.dispatch;
      var _state = this.state,
          open = _state.open,
          data = _state.data,
          employeeList = _state.employeeList;
      var isDocRequired = data.isDocRequired;

      var appName = process.env.REACT_APP_NAME;
      var downloadMenu = contractData && contractData.map(function (item) {
        var buttonLabel = item.buttonLabel,
            moduleName = item.moduleName;

        return {
          labelName: { buttonLabel: buttonLabel },
          labelKey: "WF_" + appName.toUpperCase() + "_" + moduleName.toUpperCase() + "_" + buttonLabel,
          link: function link() {
            (moduleName === "NewTL" || moduleName === "EDITRENEWAL") && buttonLabel === "APPLY" ? onDialogButtonClick(buttonLabel, isDocRequired) : _this3.openActionDialog(item);
          }
        };
      });

      if (moduleName === "NewTL") {
        var status = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].status");
        var applicationType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].applicationType");
        var applicationNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].applicationNumber");
        var tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tenantId");
        var financialYear = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].financialYear");
        var licenseNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].licenseNumber");
        var responseLength = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "licenseCount", 1);

        var rolearray = (0, _localStorageUtils.getUserInfo)() && JSON.parse((0, _localStorageUtils.getUserInfo)()).roles.filter(function (item) {
          if (item.code == "TL_CEMP" && item.tenantId === tenantId || item.code == "CITIZEN") return true;
        });
        var rolecheck = rolearray.length > 0 ? true : false;
        var validTo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].validTo");
        var currentDate = Date.now();
        var duration = validTo - currentDate;
        var renewalPeriod = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "renewalPeriod");
        if (rolecheck && (status === "APPROVED" || status === "EXPIRED") && duration <= renewalPeriod) {
          var editButton = {
            label: "Edit",
            labelKey: "WF_TL_RENEWAL_EDIT_BUTTON",
            link: function link() {
              var baseURL = process.env.REACT_APP_NAME === "Citizen" ? "/tradelicense-citizen/apply" : "/tradelicence/apply";
              var routeUrl = baseURL + "?applicationNumber=" + applicationNumber + "&licenseNumber=" + licenseNumber + "&tenantId=" + tenantId + "&action=EDITRENEWAL";
              // this.props.setRoute(
              //   `${baseURL}?applicationNumber=${applicationNumber}&licenseNumber=${licenseNumber}&tenantId=${tenantId}&action=EDITRENEWAL`
              // );
              _this3.renewTradelicence(financialYear, tenantId, routeUrl);
            }
          };

          var submitButton = {
            label: "Submit",
            labelKey: "WF_TL_RENEWAL_SUBMIT_BUTTON",
            link: function link() {
              _this3.renewTradelicence(financialYear, tenantId);
            }
          };
          if (responseLength > 1) {
            if (applicationType !== "NEW") {
              downloadMenu && downloadMenu.push(editButton);
              downloadMenu && downloadMenu.push(submitButton);
            }
          } else if (responseLength === 1) {

            downloadMenu && downloadMenu.push(editButton);
            downloadMenu && downloadMenu.push(submitButton);
          }
        }
      }
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
        !(0, _isEmpty2.default)(downloadMenu) && _react2.default.createElement(
          _uiAtoms.Container,
          null,
          _react2.default.createElement(
            _uiAtoms.Item,
            { xs: 12, sm: 12, className: "wf-footer-container" },
            _react2.default.createElement(_MenuButton2.default, { data: buttonItems })
          )
        ),
        _react2.default.createElement(_.ActionDialog, {
          open: open,
          onClose: this.onClose,
          dialogData: data,
          dropDownData: employeeList,
          handleFieldChange: handleFieldChange,
          onButtonClick: onDialogButtonClick,
          dataPath: dataPath
        })
      );
    }
  }]);
  return Footer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  return { state: state };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(url) {
      return dispatch((0, _actions.setRoute)(url));
    },
    toggleSnackbar: function toggleSnackbar(open, message, variant) {
      return dispatch((0, _actions2.toggleSnackbar)(open, message, variant));
    },
    showSpinner: function showSpinner() {
      return dispatch((0, _actions3.showSpinner)());
    },
    hideSpinner: function hideSpinner() {
      return dispatch((0, _actions3.hideSpinner)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Footer);