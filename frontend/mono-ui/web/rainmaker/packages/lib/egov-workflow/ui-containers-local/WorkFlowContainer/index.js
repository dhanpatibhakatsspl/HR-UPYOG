"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions3 = require("egov-ui-kit/redux/common/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _uiMoleculesLocal = require("../../ui-molecules-local");

var _TaskStatusContainer = require("../TaskStatusContainer");

var _TaskStatusContainer2 = _interopRequireDefault(_TaskStatusContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");

var WorkFlowContainer = function (_React$Component) {
  (0, _inherits3.default)(WorkFlowContainer, _React$Component);

  function WorkFlowContainer() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, WorkFlowContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = WorkFlowContainer.__proto__ || Object.getPrototypeOf(WorkFlowContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      action: ""
    }, _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var _this$props, prepareFinalObject, toggleSnackbar, applicationNumber, tenantId, queryObject, payload, processInstances;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _this$props = _this.props, prepareFinalObject = _this$props.prepareFinalObject, toggleSnackbar = _this$props.toggleSnackbar;
              applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
              tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
              queryObject = [{ key: "businessIds", value: applicationNumber }, { key: "history", value: true }, { key: "tenantId", value: tenantId }];
              _context.prev = 4;
              _context.next = 7;
              return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/process/_search", "", queryObject);

            case 7:
              payload = _context.sent;

              if (payload && payload.ProcessInstances.length > 0) {
                processInstances = (0, _commons.orderWfProcessInstances)(payload.ProcessInstances);

                (0, _commons.addWflowFileUrl)(processInstances, prepareFinalObject);
              } else {
                toggleSnackbar(true, {
                  labelName: "Workflow returned empty object !",
                  labelKey: "WRR_WORKFLOW_ERROR"
                }, "error");
              }
              _context.next = 14;
              break;

            case 11:
              _context.prev = 11;
              _context.t0 = _context["catch"](4);

              toggleSnackbar(true, {
                labelName: "Workflow returned empty object !",
                labelKey: "WRR_WORKFLOW_ERROR"
              }, "error");

            case 14:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2, [[4, 11]]);
    })), _this.onClose = function () {
      _this.setState({
        open: false
      });
    }, _this.getPurposeString = function (action) {
      switch (action) {
        case "APPLY":
          return "purpose=apply&status=success";
        case "FORWARD":
        case "RESUBMIT":
          return "purpose=forward&status=success";
        case "MARK":
          return "purpose=mark&status=success";
        case "VERIFY":
          return "purpose=verify&status=success";
        case "REJECT":
          return "purpose=application&status=rejected";
        case "CANCEL":
          return "purpose=application&status=cancelled";
        case "APPROVE":
          return "purpose=approve&status=success";
        case "SENDBACK":
          return "purpose=sendback&status=success";
        case "REFER":
          return "purpose=refer&status=success";
        case "SENDBACKTOCITIZEN":
          return "purpose=sendbacktocitizen&status=success";
        case "SUBMIT_APPLICATION":
          return "purpose=apply&status=success";
        case "RESUBMIT_APPLICATION":
          return "purpose=forward&status=success";
        case "SEND_BACK_TO_CITIZEN":
          return "purpose=sendback&status=success";
        case "VERIFY_AND_FORWARD":
          return "purpose=forward&status=success";
        case "SEND_BACK_FOR_DOCUMENT_VERIFICATION":
        case "SEND_BACK":
        case "SEND_BACK_FOR_FIELD_INSPECTION":
          return "purpose=sendback&status=success";
        case "APPROVE_FOR_CONNECTION":
          return "purpose=approve&status=success";
        case "APPROVE_CONNECTION":
          return "purpose=approve&status=success";
        case "ACTIVATE_CONNECTION":
          return "purpose=activate&status=success";
        case "REVOCATE":
          return "purpose=application&status=revocated";
        case "VOID":
          return "purpose=application&status=voided";
        case "REOPEN":
          return "purpose=reopen&status=success";
      }
    }, _this.wfUpdate = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(label) {
        var _this$props2, toggleSnackbar, preparedFinalObject, dataPath, moduleName, updateUrl, redirectQueryString, beforeSubmitHook, tenant, data, removedDocs, owners, accessories, tradeUnits, i, applicationNumber, payload, path, licenseNumber;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props2 = _this.props, toggleSnackbar = _this$props2.toggleSnackbar, preparedFinalObject = _this$props2.preparedFinalObject, dataPath = _this$props2.dataPath, moduleName = _this$props2.moduleName, updateUrl = _this$props2.updateUrl, redirectQueryString = _this$props2.redirectQueryString, beforeSubmitHook = _this$props2.beforeSubmitHook;
                tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
                data = (0, _get2.default)(preparedFinalObject, dataPath, []);

                if (moduleName === "NewTL") {
                  if ((0, _commons.getQueryArg)(window.location.href, "edited")) {
                    removedDocs = (0, _get2.default)(preparedFinalObject, "LicensesTemp[0].removedDocs", []);

                    if (data[0] && data[0].commencementDate) {
                      data[0].commencementDate = (0, _utils.convertDateToEpoch)(data[0].commencementDate, "dayend");
                    }
                    owners = (0, _get2.default)(data[0], "tradeLicenseDetail.owners");

                    owners = owners && _this.convertOwnerDobToEpoch(owners) || [];
                    (0, _set2.default)(data[0], "tradeLicenseDetail.owners", owners);
                    (0, _set2.default)(data[0], "tradeLicenseDetail.applicationDocuments", [].concat((0, _toConsumableArray3.default)((0, _get2.default)(data[0], "tradeLicenseDetail.applicationDocuments", [])), (0, _toConsumableArray3.default)(removedDocs)));

                    // Accessories issue fix by Gyan
                    accessories = (0, _get2.default)(data[0], "tradeLicenseDetail.accessories");
                    tradeUnits = (0, _get2.default)(data[0], "tradeLicenseDetail.tradeUnits");

                    (0, _set2.default)(data[0], "tradeLicenseDetail.tradeUnits", (0, _commons.getMultiUnits)(tradeUnits));
                    (0, _set2.default)(data[0], "tradeLicenseDetail.accessories", (0, _commons.getMultiUnits)(accessories));
                  }
                }
                if (dataPath === "BPA") {
                  data.workflow.assignes = [];
                  if (data.workflow.assignee) {
                    data.workflow.assignes = data.workflow.assignee;
                  }
                  if (data.workflow && data.workflow.varificationDocuments) {
                    for (i = 0; i < data.workflow.varificationDocuments.length; i++) {
                      data.workflow.varificationDocuments[i].fileStore = data.workflow.varificationDocuments[i].fileStoreId;
                    }
                  }
                  if ((0, _get2.default)(data, "workflow.comment")) {
                    data.workflow.comments = (0, _get2.default)(data, "workflow.comment");
                  }
                }
                if (dataPath == 'Property') {
                  if (data.workflow && data.workflow.wfDocuments) {
                    data.workflow.documents = data.workflow.wfDocuments;
                  }
                }
                if (moduleName === "Amendment") {
                  data.workflow = {};
                  data.workflow.documents = (0, _get2.default)(data[0], "wfDocuments", []);
                  data.workflow.comment = (0, _get2.default)(data[0], "comment", "");
                  data.workflow.assignee = (0, _get2.default)(data[0], "assignee", []);
                  data.workflow.action = (0, _get2.default)(data[0], "action", "");
                  data.workflow.businessId = (0, _get2.default)(data, "amendmentId", "");
                  data.workflow.tenantId = (0, _get2.default)(data, "tenantId", "");
                  data.workflow.businessService = "BS.AMENDMENT";
                  data.workflow.moduleName = "BS";
                }

                applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");

                _this.props.showSpinner();
                _context2.prev = 9;

                if (!beforeSubmitHook) {
                  _context2.next = 24;
                  break;
                }

                if (!(moduleName === "BPA" || moduleName === "BPA_OC" || moduleName === "BPA_LOW")) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 14;
                return beforeSubmitHook(data);

              case 14:
                data = _context2.sent;
                _context2.next = 24;
                break;

              case 17:
                if (!(moduleName == "FIRENOC" || moduleName == "FireNOCs")) {
                  _context2.next = 23;
                  break;
                }

                _context2.next = 20;
                return beforeSubmitHook(data);

              case 20:
                data = _context2.sent;
                _context2.next = 24;
                break;

              case 23:
                data = beforeSubmitHook(data);

              case 24:

                if (window.location.href.includes("wns/search-preview")) {
                  if (data.roadCuttingInfo && data.roadCuttingInfo.length > 0) {
                    data.roadCuttingInfo = [];
                    data.roadCuttingInfo = data.roadCuttingInfos || [];
                    data.roadCuttingInfos = [];
                  }
                }
                if ((0, _get2.default)(preparedFinalObject, "FireNOCs[0].fireNOCDetails.action") === "SENDBACKTOCITIZEN") {
                  (0, _set2.default)(data[0], 'fireNOCDetails.status', "CITIZENACTIONREQUIRED");
                  (0, _set2.default)(data[0], 'fireNOCDetails.additionalDetail.assignee', [(0, _get2.default)(preparedFinalObject, "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].uuid", "")]);
                }

                _context2.next = 28;
                return (0, _api.httpRequest)("post", updateUrl, "", [], (0, _defineProperty3.default)({}, dataPath, data));

              case 28:
                payload = _context2.sent;


                _this.setState({
                  open: false
                });
                payload = payload == '' ? true : payload;

                if (!payload) {
                  _context2.next = 46;
                  break;
                }

                path = "";

                _this.props.hideSpinner();

                if (!(moduleName == "PT.CREATE" || moduleName == "PT.UPDATE" || moduleName == "PT.LEGACY")) {
                  _context2.next = 37;
                  break;
                }

                _this.props.setRoute("/pt-mutation/acknowledgement?" + _this.getPurposeString(label) + "&moduleName=" + moduleName + "&applicationNumber=" + (0, _get2.default)(payload, 'Properties[0].acknowldgementNumber', "") + "&tenantId=" + (0, _get2.default)(payload, 'Properties[0].tenantId', ""));
                return _context2.abrupt("return");

              case 37:
                if (!(moduleName == "ASMT")) {
                  _context2.next = 40;
                  break;
                }

                _this.props.setRoute("/pt-mutation/acknowledgement?" + _this.getPurposeString(label) + "&moduleName=" + moduleName + "&applicationNumber=" + (0, _get2.default)(payload, 'Assessments[0].assessmentNumber', "") + "&tenantId=" + (0, _get2.default)(payload, 'Assessments[0].tenantId', ""));
                return _context2.abrupt("return");

              case 40:
                if (!(moduleName == 'Amendment')) {
                  _context2.next = 43;
                  break;
                }

                _this.props.setRoute("acknowledgement?" + _this.getPurposeString(label) + "&applicationNumber=" + applicationNumber + "&tenantId=" + tenant + "&businessService=" + (0, _get2.default)(payload, 'Amendments[0].businessService', ""));
                return _context2.abrupt("return");

              case 43:
                if (moduleName === "NewTL") path = "Licenses[0].licenseNumber";else if (moduleName === "FIRENOC") path = "FireNOCs[0].fireNOCNumber";else path = "Licenses[0].licenseNumber";
                licenseNumber = (0, _get2.default)(payload, path, "");

                if (redirectQueryString) {
                  _this.props.setRoute("acknowledgement?" + _this.getPurposeString(label) + "&" + redirectQueryString);
                } else {
                  _this.props.setRoute("acknowledgement?" + _this.getPurposeString(label) + "&applicationNumber=" + applicationNumber + "&tenantId=" + tenant + "&secondNumber=" + licenseNumber + "&moduleName=" + moduleName);
                }

              case 46:
                _context2.next = 52;
                break;

              case 48:
                _context2.prev = 48;
                _context2.t0 = _context2["catch"](9);

                _this.props.hideSpinner();
                if (moduleName === "BPA") {
                  toggleSnackbar(true, {
                    labelName: "Documents Required",
                    labelKey: _context2.t0.message
                  }, "error");
                } else {
                  toggleSnackbar(true, {
                    labelName: "Please fill all the mandatory fields!",
                    labelKey: _context2.t0.message
                  }, "error");
                }

              case 52:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2, [[9, 48]]);
      }));

      return function (_x) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.createWorkFLow = function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(label, isDocRequired) {
        var _this$props3, toggleSnackbar, dataPath, preparedFinalObject, data, appendToPath, documents;

        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _this$props3 = _this.props, toggleSnackbar = _this$props3.toggleSnackbar, dataPath = _this$props3.dataPath, preparedFinalObject = _this$props3.preparedFinalObject;
                data = {};


                if (dataPath == "BPA" || dataPath == "Assessment" || dataPath == "Property" || dataPath === "Noc") {

                  data = (0, _get2.default)(preparedFinalObject, dataPath, {});
                } else {
                  data = (0, _get2.default)(preparedFinalObject, dataPath, []);
                  data = data[0];
                }
                //setting the action to send in RequestInfo
                appendToPath = "";

                if (dataPath === "FireNOCs") {
                  appendToPath = "fireNOCDetails.";
                } else if (dataPath === "Assessment" || dataPath === "Property" || dataPath === "BPA" || dataPath === "Noc") {
                  appendToPath = "workflow.";
                } else {
                  appendToPath = "";
                }

                (0, _set2.default)(data, appendToPath + "action", label);

                if (isDocRequired) {
                  documents = (0, _get2.default)(data, "wfDocuments");

                  if (dataPath === "BPA") {
                    documents = (0, _get2.default)(data, "workflow.varificationDocuments");
                  }
                  if (documents && documents.length > 0) {
                    _this.wfUpdate(label);
                  } else {
                    toggleSnackbar(true, { labelName: "Please Upload file !", labelKey: "ERR_UPLOAD_FILE" }, "error");
                  }
                } else {
                  _this.wfUpdate(label);
                }

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, _this2);
      }));

      return function (_x2, _x3) {
        return _ref4.apply(this, arguments);
      };
    }(), _this.getRedirectUrl = function (action, businessId, moduleName) {
      var isAlreadyEdited = (0, _commons.getQueryArg)(window.location.href, "edited");
      var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");
      var _this$props4 = _this.props,
          ProcessInstances = _this$props4.ProcessInstances,
          baseUrlTemp = _this$props4.baseUrlTemp,
          bserviceTemp = _this$props4.bserviceTemp,
          preparedFinalObject = _this$props4.preparedFinalObject;
      var _preparedFinalObject$ = preparedFinalObject.PTApplication,
          PTApplication = _preparedFinalObject$ === undefined ? {} : _preparedFinalObject$;
      var propertyId = PTApplication.propertyId;

      var applicationStatus = void 0;
      if (ProcessInstances && ProcessInstances.length > 0) {
        applicationStatus = (0, _get2.default)(ProcessInstances[ProcessInstances.length - 1], "state.applicationStatus");
      }
      // needs to remove this initialization if all other module integrated this changes.
      var baseUrl = baseUrlTemp ? baseUrlTemp : "";
      var bservice = bserviceTemp ? bserviceTemp : "";

      if (moduleName === "FIRENOC") {
        baseUrl = "fire-noc";
        bservice = "FIRENOC";
      } else if (moduleName === "BPA" || moduleName === "BPA_LOW" || moduleName === "BPA_OC") {
        baseUrl = "egov-bpa";
        if (moduleName === "BPA") {
          bservice = applicationStatus == "PENDING_APPL_FEE" ? "BPA.NC_APP_FEE" : "BPA.NC_SAN_FEE";
        } else if (moduleName === "BPA_OC") {
          bservice = applicationStatus == "PENDING_APPL_FEE" ? "BPA.NC_OC_APP_FEE" : "BPA.NC_OC_SAN_FEE";
        } else {
          bservice = "BPA.LOW_RISK_PERMIT_FEE";
        }
      } else if (moduleName === "PT") {
        bservice = "PT";
      } else if (moduleName === "PT.CREATE" || moduleName === "PT.UPDATE" || moduleName === "PT.LEGACY") {
        return "/property-tax/assessment-form?assessmentId=0&purpose=update&propertyId=" + propertyId + "&tenantId=" + tenant + "&mode=WORKFLOWEDIT";
      } else if (moduleName === "PT.MUTATION") {
        bservice = "PT.MUTATION";
        baseUrl = "pt-mutation";
      } else if (!baseUrl && !bservice) {
        baseUrl = process.env.REACT_APP_NAME === "Citizen" ? "tradelicense-citizen" : "tradelicence";
        bservice = "TL";
      }
      var payUrl = "/egov-common/pay?consumerCode=" + businessId + "&tenantId=" + tenant;
      switch (action) {
        case "PAY":
          return bservice ? payUrl + "&businessService=" + bservice : payUrl;
        case "EDIT":
          return isAlreadyEdited ? "/" + baseUrl + "/apply?applicationNumber=" + businessId + "&tenantId=" + tenant + "&action=edit&edited=true&workflowService=" + moduleName : "/" + baseUrl + "/apply?applicationNumber=" + businessId + "&tenantId=" + tenant + "&action=edit&workflowService=" + moduleName;
      }
    }, _this.getHeaderName = function (action) {
      return {
        labelName: action + " Application",
        labelKey: "WF_" + action + "_APPLICATION"
      };
    }, _this.getEmployeeRoles = function (nextAction, currentAction, moduleName) {
      var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));
      var data = (0, _find2.default)(businessServiceData, { businessService: moduleName });
      var roles = [];
      if (nextAction === currentAction) {
        data.states && data.states.forEach(function (state) {
          state && state.actions && state.actions.length > 0 && state.actions.forEach(function (action) {
            roles = [].concat((0, _toConsumableArray3.default)(roles), (0, _toConsumableArray3.default)(action.roles));
          });
        });
      } else {
        var states = data && data.states && (0, _find2.default)(data.states, { uuid: nextAction });
        states && states.actions && states.actions.length > 0 && states.actions.forEach(function (action) {
          roles = [].concat((0, _toConsumableArray3.default)(roles), (0, _toConsumableArray3.default)(action.roles));
        });
      }
      roles = [].concat((0, _toConsumableArray3.default)(new Set(roles)));
      roles.indexOf("*") > -1 && roles.splice(roles.indexOf("*"), 1);
      return roles.toString();
    }, _this.checkIfTerminatedState = function (nextStateUUID, moduleName) {
      var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));
      var data = businessServiceData && businessServiceData.length > 0 ? (0, _find2.default)(businessServiceData, { businessService: moduleName }) : [];
      var nextState = data && data.states && data.states.length > 0 && (0, _find2.default)(data.states, { uuid: nextStateUUID });

      var isLastState = data ? nextState && nextState.isTerminateState : false;
      return isLastState;
    }, _this.checkIfDocumentRequired = function (nextStateUUID, moduleName) {
      var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));
      var data = (0, _find2.default)(businessServiceData, { businessService: moduleName });
      var nextState = data && data.states && (0, _find2.default)(data.states, { uuid: nextStateUUID });
      return nextState && nextState.docUploadRequired;
    }, _this.getActionIfEditable = function (status, businessId, moduleName, applicationState) {
      var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));
      var data = (0, _find2.default)(businessServiceData, { businessService: moduleName });
      var state = applicationState ? data && data.states && (0, _find2.default)(data.states, { applicationStatus: status, state: applicationState }) : data && data.states && (0, _find2.default)(data.states, { applicationStatus: status });
      var actions = [];
      state && state.actions && state.actions.length > 0 && state.actions.forEach(function (item) {
        actions = [].concat((0, _toConsumableArray3.default)(actions), (0, _toConsumableArray3.default)(item.roles));
      });
      var userRoles = JSON.parse((0, _localStorageUtils.getUserInfo)()).roles;
      var roleIndex = userRoles.findIndex(function (item) {
        if (actions.indexOf(item.code) > -1) return true;
      });

      var editAction = {};
      // state.isStateUpdatable = true; // Hardcoded configuration for PT mutation Edit
      if (state && state.isStateUpdatable && actions.length > 0 && roleIndex > -1) {
        editAction = {
          buttonLabel: "EDIT",
          moduleName: moduleName,
          tenantId: state.tenantId,
          isLast: true,
          buttonUrl: _this.props.editredirect ? _this.props.editredirect : _this.getRedirectUrl("EDIT", businessId, moduleName)
        };
      }
      return editAction;
    }, _this.prepareWorkflowContract = function (data, moduleName) {
      var _this3 = _this,
          getRedirectUrl = _this3.getRedirectUrl,
          getHeaderName = _this3.getHeaderName,
          checkIfTerminatedState = _this3.checkIfTerminatedState,
          getActionIfEditable = _this3.getActionIfEditable,
          checkIfDocumentRequired = _this3.checkIfDocumentRequired,
          getEmployeeRoles = _this3.getEmployeeRoles;

      var businessService = moduleName === data[0].businessService ? moduleName : data[0].businessService;
      var businessId = (0, _get2.default)(data[data.length - 1], "businessId");
      var applicationState = (0, _get2.default)(data[data.length - 1], "state.state");
      var filteredActions = [];

      filteredActions = (0, _get2.default)(data[data.length - 1], "nextActions", []).filter(function (item) {
        return item.action != "ADHOC";
      });
      var applicationStatus = (0, _get2.default)(data[data.length - 1], "state.applicationStatus");
      var actions = (0, _orderBy2.default)(filteredActions, ["action"], ["desc"]);

      actions = actions.map(function (item) {
        return {
          buttonLabel: item.action,
          moduleName: data[data.length - 1].businessService,
          isLast: item.action === "PAY" ? true : false,
          buttonUrl: getRedirectUrl(item.action, businessId, businessService),
          dialogHeader: getHeaderName(item.action),
          showEmployeeList: process.env.REACT_APP_NAME === "Citizen" ? false : businessService === "NewWS1" || businessService === "ModifyWSConnection" || businessService === "ModifySWConnection" || businessService === "NewSW1" ? !checkIfTerminatedState(item.nextState, businessService) && item.action !== "SEND_BACK_TO_CITIZEN" && item.action !== "APPROVE_CONNECTION" && item.action !== "APPROVE_FOR_CONNECTION" && item.action !== "RESUBMIT_APPLICATION" : !checkIfTerminatedState(item.nextState, businessService) && item.action !== "SENDBACKTOCITIZEN",
          roles: getEmployeeRoles(item.nextState, item.currentState, businessService),
          isDocRequired: checkIfDocumentRequired(item.nextState, businessService)
        };
      });
      actions = actions.filter(function (item) {
        return item.buttonLabel !== 'INITIATE';
      });
      var editAction = getActionIfEditable(applicationStatus, businessId, businessService, applicationState);
      editAction.buttonLabel && actions.push(editAction);
      return actions;
    }, _this.convertOwnerDobToEpoch = function (owners) {
      var updatedOwners = owners && owners.map(function (owner) {
        return (0, _extends3.default)({}, owner, {
          dob: owner && owner !== null && (0, _utils.convertDateToEpoch)(owner.dob, "dayend")
        });
      }).filter(function (item) {
        return item && item !== null;
      });
      return updatedOwners;
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(WorkFlowContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          ProcessInstances = _props.ProcessInstances,
          prepareFinalObject = _props.prepareFinalObject,
          dataPath = _props.dataPath,
          moduleName = _props.moduleName;

      var workflowContract = ProcessInstances && ProcessInstances.length > 0 && this.prepareWorkflowContract(ProcessInstances, moduleName);
      var showFooter = true;
      if (moduleName === 'BPA' || moduleName === 'BPA_LOW' || moduleName === 'BPA_OC') {
        showFooter = process.env.REACT_APP_NAME === "Citizen" ? false : true;
      }
      if (moduleName === 'Noc' && window.location.href.includes("isFromBPA=true")) {
        showFooter = false;
      }

      return _react2.default.createElement(
        "div",
        null,
        ProcessInstances && ProcessInstances.length > 0 && _react2.default.createElement(_TaskStatusContainer2.default, { ProcessInstances: ProcessInstances, moduleName: moduleName }),
        showFooter && _react2.default.createElement(_uiMoleculesLocal.Footer, {
          handleFieldChange: prepareFinalObject,
          variant: "contained",
          color: "primary",
          onDialogButtonClick: this.createWorkFLow,
          contractData: workflowContract,
          dataPath: dataPath,
          moduleName: moduleName
        })
      );
    }
  }]);
  return WorkFlowContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var workflow = preparedFinalObject.workflow;

  var _ref5 = workflow || [],
      ProcessInstances = _ref5.ProcessInstances;

  return { ProcessInstances: ProcessInstances, preparedFinalObject: preparedFinalObject };
};

var mapDispacthToProps = function mapDispacthToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(path, value) {
      return dispatch((0, _actions2.prepareFinalObject)(path, value));
    },
    toggleSnackbar: function toggleSnackbar(open, message, variant) {
      return dispatch((0, _actions2.toggleSnackbar)(open, message, variant));
    },
    setRoute: function setRoute(route) {
      return dispatch((0, _actions.setRoute)(route));
    },
    showSpinner: function showSpinner() {
      return dispatch((0, _actions3.showSpinner)());
    },
    hideSpinner: function hideSpinner() {
      return dispatch((0, _actions3.hideSpinner)());
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispacthToProps)(WorkFlowContainer);