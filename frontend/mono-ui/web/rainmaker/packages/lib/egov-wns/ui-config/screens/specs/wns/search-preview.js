"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.processBillsSearch = exports.summaryScreen = exports.taskDetails = exports.reviewDocumentDetails = exports.reviewModificationsDetails = exports.reviewOwnerDetails = exports.reviewConnectionDetails = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _generatePDF = require("egov-ui-kit/utils/pdfUtils/generatePDF");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons2 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _acknowledgement = require("../wns/acknowledgement");

var _adhocPopup = require("./applyResource/adhocPopup");

var _reviewDocuments = require("./applyResource/review-documents");

var _reviewOwner = require("./applyResource/review-owner");

var _reviewTrade = require("./applyResource/review-trade");

var _reviewConnectionDetails = require("./applyResource/reviewConnectionDetails");

var _reviewModificationsEffective = require("./applyResource/reviewModificationsEffective");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
var service = (0, _commons.getQueryArg)(window.location.href, "service");
var serviceModuleName = service === _commons2.serviceConst.WATER ? "NewWS1" : "NewSW1";
var serviceUrl = serviceModuleName === "NewWS1" ? "/ws-services/wc/_update" : "/sw-services/swc/_update";
var redirectQueryString = "applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
var isAlreadyEdited = (0, _commons.getQueryArg)(window.location.href, "edited", false);
var editredirect = "apply?" + redirectQueryString + "&action=edit";
var headerLabel = "WS_TASK_DETAILS";

var resetData = function resetData() {
  applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
  service = (0, _commons.getQueryArg)(window.location.href, "service");
  serviceModuleName = service === _commons2.serviceConst.WATER ? "NewWS1" : "NewSW1";
  serviceUrl = serviceModuleName === "NewWS1" ? "/ws-services/wc/_update" : "/sw-services/swc/_update";
  redirectQueryString = "applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
  editredirect = isAlreadyEdited ? "apply?" + redirectQueryString + "&action=edit&edited=true" : "apply?" + redirectQueryString + "&action=edit";
  if ((0, _commons2.isModifyMode)()) {
    redirectQueryString += '&mode=MODIFY';
    editredirect += '&mode=MODIFY&modeaction=edit';
    if (service === _commons2.serviceConst.WATER) {
      headerLabel = "WS_MODIFY_TASK_DETAILS";
    } else {
      headerLabel = "SW_MODIFY_TASK_DETAILS";
    }
  }
};

var headerrow = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelKey: headerLabel
  }),
  application: (0, _utils.getCommonContainer)({
    applicationNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-wns",
      componentPath: "ApplicationNoContainer",
      props: {
        number: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
      }
    }
  }),
  connection: (0, _utils.getCommonContainer)({
    connectionNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-wns",
      componentPath: "ConsumerNoContainer",
      props: {
        number: ""
      }
    }

  })
});

var beforeInitFn = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch, applicationNumber) {
    var queryObj, Response, processInstanceAppStatus, nextActions, applyScreenObject, parsedObject, _estimate, connectionNumber, queryObjectForEst, viewBillTooltip, _queryObjectForEst, _viewBillTooltip, multipleRoadTypeCardPath, mutipleRoadTypeValues, a, connectionType, status, checkUserExist, checkExistStatus, userInfo, roles, checkUserList, checkStatus, printCont, data, obj;

    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // dispatch(handleField("apply",
            // "components",
            // "div", {}));
            // dispatch(handleField("search",
            // "components",
            // "div", {}));
            dispatch((0, _actions.unMountScreen)("apply"));
            dispatch((0, _actions.unMountScreen)("search"));
            dispatch((0, _actions.prepareFinalObject)("WaterConnection", []));
            dispatch((0, _actions.prepareFinalObject)("SewerageConnection", []));
            dispatch((0, _actions.prepareFinalObject)("WaterConnectionOld", []));
            dispatch((0, _actions.prepareFinalObject)("SewerageConnectionOld", []));
            // localStorage.setItem("WS_ADDITIONAL_DETAILS_FOR_DATA", JSON.stringify({}));
            // localStorage.setItem("IS_WS_ADDITIONAL_DETAILS_FOR_DATA", JSON.stringify(false));
            queryObj = [{ key: "businessIds", value: applicationNumber }, { key: "history", value: true }, { key: "tenantId", value: tenantId }];

            if ((0, _commons.getQueryArg)(window.location.href, "service", null) != null) {
              resetData();
            }

            _context3.next = 10;
            return (0, _commons2.getWorkFlowData)(queryObj);

          case 10:
            Response = _context3.sent;
            processInstanceAppStatus = Response.ProcessInstances[0].state.applicationStatus;
            nextActions = Response.ProcessInstances[0].nextActions;
            //Search details for given application Number

            if (!applicationNumber) {
              _context3.next = 93;
              break;
            }

            // hiding the Additional details for citizen. ,,
            if (process.env.REACT_APP_NAME === "Citizen" && processInstanceAppStatus && (processInstanceAppStatus === 'INITIATED' || processInstanceAppStatus === "PENDING_FOR_CITIZEN_ACTION" || processInstanceAppStatus === 'PENDING_FOR_DOCUMENT_VERIFICATION')) {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.props.style", { display: "none" });
            }

            if ((0, _commons.getQueryArg)(window.location.href, "edited")) {
              _context3.next = 20;
              break;
            }

            _context3.next = 18;
            return searchResults(action, state, dispatch, applicationNumber, processInstanceAppStatus);

          case 18:
            _context3.next = 60;
            break;

          case 20:
            applyScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen");

            applyScreenObject.applicationNo.includes("WS") ? applyScreenObject.service = _commons2.serviceConst.WATER : applyScreenObject.service = _commons2.serviceConst.SEWERAGE;
            parsedObject = parserFunction((0, _commons2.findAndReplace)(applyScreenObject, "NA", null));

            dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", parsedObject));
            if (applyScreenObject.service = _commons2.serviceConst.SEWERAGE) dispatch((0, _actions.prepareFinalObject)("SewerageConnection[0]", parsedObject));
            _estimate = void 0;

            if (processInstanceAppStatus === "CONNECTION_ACTIVATED") {
              connectionNumber = parsedObject.connectionNo;

              (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.connection.children.connectionNumber.props.number", connectionNumber);
            } else {
              (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.connection.children.connectionNumber.visible", false);
            }

            if (!(processInstanceAppStatus === "PENDING_FOR_FIELD_INSPECTION")) {
              _context3.next = 56;
              break;
            }

            queryObjectForEst = [{
              applicationNo: applicationNumber,
              tenantId: tenantId,
              waterConnection: parsedObject
            }];

            if (!parsedObject.applicationNo.includes("WS")) {
              _context3.next = 43;
              break;
            }

            _context3.next = 32;
            return (0, _commons2.waterEstimateCalculation)(queryObjectForEst, dispatch);

          case 32:
            _estimate = _context3.sent;
            viewBillTooltip = [];

            if (!(_estimate !== null && _estimate !== undefined)) {
              _context3.next = 41;
              break;
            }

            if (!(_estimate.Calculation.length > 0)) {
              _context3.next = 41;
              break;
            }

            _context3.next = 38;
            return processBills(_estimate, viewBillTooltip, dispatch);

          case 38:
            // viewBreakUp 
            _estimate.Calculation[0].billSlabData = _.groupBy(_estimate.Calculation[0].taxHeadEstimates, 'category');
            _estimate.Calculation[0].appStatus = processInstanceAppStatus;
            dispatch((0, _actions.prepareFinalObject)("dataCalculation", _estimate.Calculation[0]));

          case 41:
            _context3.next = 55;
            break;

          case 43:
            _queryObjectForEst = [{
              applicationNo: applicationNumber,
              tenantId: tenantId,
              sewerageConnection: parsedObject
            }];
            _context3.next = 46;
            return (0, _commons2.swEstimateCalculation)(_queryObjectForEst, dispatch);

          case 46:
            _estimate = _context3.sent;
            _viewBillTooltip = [];

            if (!(_estimate !== null && _estimate !== undefined)) {
              _context3.next = 55;
              break;
            }

            if (!(_estimate.Calculation.length > 0)) {
              _context3.next = 55;
              break;
            }

            _context3.next = 52;
            return processBills(_estimate, _viewBillTooltip, dispatch);

          case 52:
            // viewBreakUp 
            _estimate.Calculation[0].billSlabData = _.groupBy(_estimate.Calculation[0].taxHeadEstimates, 'category');
            _estimate.Calculation[0].appStatus = processInstanceAppStatus;
            dispatch((0, _actions.prepareFinalObject)("dataCalculation", _estimate.Calculation[0]));

          case 55:
            if (_estimate !== null && _estimate !== undefined) {
              (0, _utils2.createEstimateData)(_estimate.Calculation[0].taxHeadEstimates, "taxHeadEstimates", dispatch, {}, {});
            }

          case 56:
            if (!(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].connectionHolders") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].connectionHolders") === 'NA') {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFive.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewSix.visible", true);
            } else {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewSix.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFive.visible", true);
            }

            // Multiple roadtype cards validations
            multipleRoadTypeCardPath = "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTen.props.items";
            mutipleRoadTypeValues = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreen.roadCuttingInfo", []);

            if (mutipleRoadTypeValues && mutipleRoadTypeValues.length > 0) {
              for (a = 0; a < mutipleRoadTypeValues.length; a++) {
                if (mutipleRoadTypeValues[a].emptyObj) {
                  (0, _set2.default)(action.screenConfig, multipleRoadTypeCardPath + "[" + a + "].item" + a + ".children.reviewArea.props.visible", false);
                  (0, _set2.default)(action.screenConfig, multipleRoadTypeCardPath + "[" + a + "].item" + a + ".children.reviewArea.visible", false);
                  (0, _set2.default)(action.screenConfig, multipleRoadTypeCardPath + "[" + a + "].item" + a + ".children.reviewRoadType.props.visible", false);
                  (0, _set2.default)(action.screenConfig, multipleRoadTypeCardPath + "[" + a + "].item" + a + ".children.reviewRoadType.visible", false);
                } else {
                  (0, _set2.default)(action.screenConfig, multipleRoadTypeCardPath + "[" + a + "].item" + a + ".children.reviewArea.props.visible", true);
                  (0, _set2.default)(action.screenConfig, multipleRoadTypeCardPath + "[" + a + "].item" + a + ".children.reviewArea.visible", true);
                  (0, _set2.default)(action.screenConfig, multipleRoadTypeCardPath + "[" + a + "].item" + a + ".children.reviewRoadType.props.visible", true);
                  (0, _set2.default)(action.screenConfig, multipleRoadTypeCardPath + "[" + a + "].item" + a + ".children.reviewRoadType.visible", true);
                }
              }
            }

          case 60:
            connectionType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].connectionType");

            if (connectionType === "Metered") {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterId.visible", true);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterInstallationDate.visible", true);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewInitialMeterReading.visible", true);
            } else {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterId.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterInstallationDate.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewInitialMeterReading.visible", false);
            }

            if ((0, _commons2.isModifyMode)()) {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.estimate.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSeven.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewEight.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewNine.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTen.visible", false);
            } else {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewModificationsDetails.visible", false);
            }

            status = (0, _utils2.getTransformedStatus)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].applicationStatus"));

            checkUserExist = function () {
              var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(roles) {
                var checkList, filterList;
                return _regenerator2.default.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        checkList = ["SW_FIELD_INSPECTOR", "WS_APPROVER", "WS_FIELD_INSPECTOR", "SW_APPROVER"];
                        filterList = [];

                        checkList.map(function (list) {
                          var filterData = roles.filter(function (role) {
                            return role.code == list;
                          });
                          if (filterData.length > 0) {
                            filterList.push(filterData[0].code);
                          }
                        });
                        return _context.abrupt("return", filterList);

                      case 4:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function checkUserExist(_x5) {
                return _ref2.apply(this, arguments);
              };
            }();

            checkExistStatus = function () {
              var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(processInstances) {
                var checkStatus;
                return _regenerator2.default.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        checkStatus = processInstances.filter(function (state) {
                          return state && state.state && state.state.applicationStatus == "PENDING_FOR_PAYMENT";
                        });
                        return _context2.abrupt("return", checkStatus.length > 0 ? checkStatus : []);

                      case 2:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2, undefined);
              }));

              return function checkExistStatus(_x6) {
                return _ref3.apply(this, arguments);
              };
            }();

            userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
            roles = (0, _get2.default)(userInfo, "roles");
            _context3.next = 70;
            return checkUserExist((0, _cloneDeep2.default)(roles));

          case 70:
            checkUserList = _context3.sent;
            _context3.next = 73;
            return checkExistStatus((0, _cloneDeep2.default)(Response.ProcessInstances));

          case 73:
            checkStatus = _context3.sent;

            if (checkUserList.length > 0 && checkStatus.length == 0 && process.env.REACT_APP_NAME !== "Citizen" && nextActions.length > 0) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.taskDetails.children.cardContent.children.estimate.children.cardContent.children.addPenaltyRebateButton", "visible", true));
            }

            printCont = (0, _acknowledgement.downloadPrintContainer)(action, state, dispatch, processInstanceAppStatus, applicationNumber, tenantId);

            (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.helpSection.children", printCont);

            data = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject");
            obj = setStatusBasedValue(status);

            // Get approval details based on status and set it in screenconfig

            if (!(status === "APPROVED" || status === "REJECTED" || status === "CANCELLED")) {
              _context3.next = 89;
              break;
            }

            (0, _set2.default)(action, "screenConfig.components.div.children.taskDetails.children.cardContent.children.approvalDetails.visible", true);

            if (!(0, _get2.default)(data, "WaterConnection[0].documents")) {
              _context3.next = 86;
              break;
            }

            _context3.next = 84;
            return (0, _commons.setDocuments)(data, "WaterConnection[0].documents", "LicensesTemp[0].verifyDocData", dispatch, 'NewWS1');

          case 84:
            _context3.next = 87;
            break;

          case 86:
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.taskDetails.children.cardContent.children.approvalDetails.children.cardContent.children.viewTow.children.lbl", "visible", false));

          case 87:
            _context3.next = 90;
            break;

          case 89:
            (0, _set2.default)(action, "screenConfig.components.div.children.taskDetails.children.cardContent.children.approvalDetails.visible", false);

          case 90:

            if (status === "cancelled") (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.helpSection.children.cancelledLabel.visible", true);

            setActionItems(action, obj);
            if ((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].additionalDetails.locality", null) === null) {
              dispatch((0, _actions.prepareFinalObject)("WaterConnection[0].additionalDetails.locality", (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].property.address.locality.code")));
            }

          case 93:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function beforeInitFn(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

var titleText = "";

var setStatusBasedValue = function setStatusBasedValue(status) {
  switch (status) {
    case "approved":
      return {
        titleText: "Review the Trade License",
        titleKey: "WS_REVIEW_TRADE_LICENSE",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["WS_APPROVER"]
        }
      };
    case "pending_payment":
      return {
        titleText: "Review the Application and Proceed",
        titleKey: "WS_REVIEW_APPLICATION_AND_PROCEED",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["WS_CEMP"]
        }
      };
    case "pending_approval":
      return {
        titleText: "Review the Application and Proceed",
        titleKey: "WS_REVIEW_APPLICATION_AND_PROCEED",
        titleVisibility: true,
        roleDefination: {
          rolePath: "user-info.roles",
          roles: ["WS_APPROVER"]
        }
      };
    case "cancelled":
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };
    case "rejected":
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };

    default:
      return {
        titleText: "",
        titleVisibility: false,
        roleDefination: {}
      };
  }
};

var estimate = (0, _utils.getCommonGrayCard)({
  header: (0, _utils.getCommonSubHeader)({ labelKey: "WS_TASK_DETAILS_FEE_ESTIMATE" }),
  estimateSection: (0, _utils2.getFeesEstimateOverviewCard)({
    sourceJsonPath: "dataCalculation"
    // isCardrequired: true
  }),
  buttonView: (0, _utils2.getDialogButton)("VIEW BREAKUP", "WS_PAYMENT_VIEW_BREAKUP", "search-preview"),
  addPenaltyRebateButton: {
    componentPath: "Button",
    props: {
      color: "primary",
      style: {}
    },
    children: {
      previousButtonLabel: (0, _utils.getLabel)({
        labelKey: "WS_PAYMENT_ADD_REBATE_PENALTY"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        // const adhocAmount = get(
        //   state.screenConfiguration.preparedFinalObject,
        //   "WaterConnection[0].additionalDetails.adhocPenalty"
        // );
        // const rebateAmount = get(
        //   state.screenConfiguration.preparedFinalObject,
        //   "WaterConnection[0].additionalDetails.adhocRebate"
        // );
        // const adhocAmountTemp = get(
        //   state.screenConfiguration.preparedFinalObject,
        //   "WaterConnectionTemp[0].additionalDetails.adhocPenalty"
        // );
        // const rebateAmountTemp = get(
        //   state.screenConfiguration.preparedFinalObject,
        //   "WaterConnectionTemp[0].additionalDetails.adhocRebate"
        // );
        // let isAdhocOrRebateValue = true;
        // if(adhocAmountTemp || rebateAmountTemp) { isAdhocOrRebateValue = false }
        // if(adhocAmount || adhocAmount) { isAdhocOrRebateValue = false }
        // if (!isAdhocOrRebateValue) {
        //   let WaterConnectionTemp = cloneDeep( get(state.screenConfiguration.preparedFinalObject, "WaterConnectionTemp[0].additionalDetails"));
        //   showHideAdhocPopup(state, dispatch, "search-preview", isAdhocOrRebateValue, WaterConnectionTemp);
        // } else {
        //   showHideAdhocPopup(state, dispatch, "search-preview", isAdhocOrRebateValue, {});
        // }

        (0, _utils2.showHideAdhocPopup)(state, dispatch, "search-preview", true);
      }
    },
    visible: false
  }
});

var reviewConnectionDetails = exports.reviewConnectionDetails = (0, _reviewTrade.getReviewConnectionDetails)(false);

var reviewOwnerDetails = exports.reviewOwnerDetails = (0, _reviewOwner.getReviewOwner)(false);

var reviewModificationsDetails = exports.reviewModificationsDetails = (0, _reviewModificationsEffective.reviewModificationsEffective)(process.env.REACT_APP_NAME !== "Citizen");

var reviewDocumentDetails = exports.reviewDocumentDetails = (0, _reviewDocuments.getReviewDocuments)(false);

// let approvalDetails = getApprovalDetails(status);
var title = (0, _utils.getCommonTitle)({ labelName: titleText });

var setActionItems = function setActionItems(action, object) {
  (0, _set2.default)(action, "screenConfig.components.div.children.taskDetails.children.cardContent.children.title", (0, _utils.getCommonTitle)({
    labelName: (0, _get2.default)(object, "titleText"),
    labelKey: (0, _get2.default)(object, "titleKey")
  }));
  (0, _set2.default)(action, "screenConfig.components.div.children.taskDetails.children.cardContent.children.title.visible", (0, _get2.default)(object, "titleVisibility"));
  (0, _set2.default)(action, "screenConfig.components.div.children.taskDetails.children.cardContent.children.title.roleDefination", (0, _get2.default)(object, "roleDefination"));
};

var taskDetails = exports.taskDetails = (0, _utils.getCommonCard)({
  title: title,
  estimate: estimate,
  reviewConnectionDetails: reviewConnectionDetails,
  reviewDocumentDetails: reviewDocumentDetails,
  reviewOwnerDetails: reviewOwnerDetails,
  reviewModificationsDetails: reviewModificationsDetails
});

var summaryScreen = exports.summaryScreen = (0, _utils.getCommonCard)({
  reviewConnectionDetails: reviewConnectionDetails,
  reviewModificationsDetails: reviewModificationsDetails,
  reviewDocumentDetails: reviewDocumentDetails,
  reviewOwnerDetails: reviewOwnerDetails
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var status = (0, _commons.getQueryArg)(window.location.href, "status");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    //Todo
    var list = ["NewTL", "ModifySWConnection", "NewSW1", "NewWS1", "ModifyWSConnection"];
    var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: list }];

    (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);
    //To set the application no. at the  top
    (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.application.children.applicationNumber.props.number", applicationNumber);
    // if (status !== "pending_payment") {
    //   set(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.viewBreakupButton.visible", false);
    // }
    if ((0, _commons2.isModifyMode)()) {
      serviceModuleName = service === _commons2.serviceConst.WATER ? "ModifyWSConnection" : "ModifySWConnection";
    }

    (0, _set2.default)(action, "screenConfig.components.adhocDialog.children.popup", _adhocPopup.adhocPopup);
    (0, _generatePDF.loadUlbLogo)(tenantId);
    beforeInitFn(action, state, dispatch, applicationNumber);
    (0, _set2.default)(action, "screenConfig.components.div.children.headerDiv.children.header1.children.application.children.applicationNumber.props.number", applicationNumber);
    (0, _set2.default)(action, 'screenConfig.components.div.children.taskStatus.props.dataPath', service === _commons2.serviceConst.WATER ? "WaterConnection" : "SewerageConnection");
    (0, _set2.default)(action, 'screenConfig.components.div.children.taskStatus.props.moduleName', serviceModuleName);
    (0, _set2.default)(action, 'screenConfig.components.div.children.taskStatus.props.updateUrl', serviceUrl);
    (0, _set2.default)(action, 'screenConfig.components.div.children.taskStatus.props.bserviceTemp', service === _commons2.serviceConst.WATER ? "WS.ONE_TIME_FEE" : "SW.ONE_TIME_FEE");
    (0, _set2.default)(action, 'screenConfig.components.div.children.taskStatus.props.redirectQueryString', redirectQueryString);
    isAlreadyEdited = (0, _commons.getQueryArg)(window.location.href, "edited", false);
    editredirect = isAlreadyEdited ? "apply?" + redirectQueryString + "&action=edit&edited=true" : "apply?" + redirectQueryString + "&action=edit";
    (0, _set2.default)(action, 'screenConfig.components.div.children.taskStatus.props.editredirect', editredirect);
    if (isAlreadyEdited) {
      if (applicationNumber.includes("WS")) {
        (0, _set2.default)(action, "screenConfig.components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFour.props.scheama.children.cardContent.children.serviceCardContainerForSW.visible", false);
        (0, _set2.default)(action, "screenConfig.components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFour.props.scheama.children.cardContent.children.serviceCardContainerForWater.visible", true);
        (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSixVS.visible", false);
        (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSixWS.visible", true);
      }
      if (applicationNumber.includes("SW")) {
        (0, _set2.default)(action, "screenConfig.components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFour.props.scheama.children.cardContent.children.serviceCardContainerForSW.visible", true);
        (0, _set2.default)(action, "screenConfig.components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFour.props.scheama.children.cardContent.children.serviceCardContainerForWater.visible", false);
        (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSixVS.visible", true);
        (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSixWS.visible", false);
      }
    }
    return action;
  },

  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css search-preview"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header1: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 8
              }
            }, headerrow),
            helpSection: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              props: {
                color: "primary",
                style: { justifyContent: "flex-end" //, dsplay: "block"
                } },
              gridDefination: {
                xs: 12,
                sm: 4,
                align: "right"
              }
            }
          }
        },
        taskStatus: {
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          moduleName: "egov-workflow",
          // visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
          props: {
            dataPath: service === _commons2.serviceConst.WATER ? "WaterConnection" : "SewerageConnection",
            moduleName: serviceModuleName,
            updateUrl: serviceUrl,
            baseUrlTemp: 'wns',
            bserviceTemp: service === _commons2.serviceConst.WATER ? "WS.ONE_TIME_FEE" : "SW.ONE_TIME_FEE",
            redirectQueryString: redirectQueryString,
            editredirect: editredirect,
            beforeSubmitHook: function beforeSubmitHook(data) {
              data = data[0];
              (0, _set2.default)(data, 'propertyId', (0, _get2.default)(data, 'property.propertyId', null));
              data.assignees = [];
              if (data.assignee) {
                data.assignee.forEach(function (assigne) {
                  data.assignees.push({
                    uuid: assigne
                  });
                });
              }
              data.processInstance = {
                documents: data.wfDocuments,
                assignes: data.assignees,
                comment: data.comment,
                action: data.action
              };
              data.waterSource = (0, _commons2.getWaterSource)(data.waterSource, data.waterSubSource);
              // data.roadCuttingInfo = data.roadCuttingInfos || [];
              // data.roadCuttingInfos = [];
              // let additionalDetailsformdata = JSON.parse(localStorage.getItem("WS_ADDITIONAL_DETAILS"));
              // if(additionalDetailsformdata) {
              //   set(data, 'additionalDetails', additionalDetailsformdata );
              //   localStorage.removeItem("WS_ADDITIONAL_DETAILS");
              // }

              return data;
            }
          }
        },
        snackbarWarningMessage: _reviewConnectionDetails.snackbarWarningMessage,
        taskDetails: taskDetails
      }
    },
    breakUpDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "ViewBreakupContainer",
      props: {
        open: false,
        maxWidth: "md",
        screenKey: "search-preview"
      }
    },
    adhocDialog: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-wns",
      componentPath: "DialogContainer",
      props: {
        open: false,
        maxWidth: "sm",
        screenKey: "search-preview"
      },
      children: {
        popup: {}
      }
    }
  }
};

//----------------- search code (feb17)---------------------- //
var searchResults = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(action, state, dispatch, applicationNumber, processInstanceAppStatus) {
    var queryObjForSearch, viewBillTooltip, estimate, payload, checkFeeEstimateVisible, getValuesofAdhoc, adhocDetails, getAddtionalDetails, isVisible, convPayload, queryObjectForEst, queryObjectForSearch, roadCuttingInfos, connectionNumber, connectionNo, queryObjForSearchApplications, oldApplicationPayload, waterSource, _getValuesofAdhoc, _adhocDetails, _getAddtionalDetails, _isVisible, additionalDetailsformdata, _roadCuttingInfos, _connectionNo, _queryObjForSearchApplications, _oldApplicationPayload, _connectionNumber, _convPayload, _queryObjectForEst2, _queryObjectForSearch;

    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            queryObjForSearch = [{ key: "tenantId", value: tenantId }, { key: "applicationNumber", value: applicationNumber }];
            viewBillTooltip = [], estimate = void 0, payload = [];

            checkFeeEstimateVisible = function () {
              var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(wsDatas) {
                var dataDetails;
                return _regenerator2.default.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        dataDetails = wsDatas[0].applicationType.includes("NEW");
                        return _context4.abrupt("return", dataDetails);

                      case 2:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4, undefined);
              }));

              return function checkFeeEstimateVisible(_x12) {
                return _ref5.apply(this, arguments);
              };
            }();

            if (!(service === _commons2.serviceConst.WATER)) {
              _context5.next = 54;
              break;
            }

            payload = [];
            _context5.next = 7;
            return (0, _commons2.getSearchResults)(queryObjForSearch);

          case 7:
            payload = _context5.sent;

            (0, _set2.default)(payload, 'WaterConnection[0].service', service);

            getValuesofAdhoc = localStorage.getItem("WS_ADDITIONAL_DETAILS_FOR_DATA");
            adhocDetails = getValuesofAdhoc ? JSON.parse(getValuesofAdhoc) : {};
            getAddtionalDetails = (0, _get2.default)(payload, "WaterConnection[0]", {});


            if (adhocDetails && adhocDetails.additionalDetails && getAddtionalDetails && getAddtionalDetails.additionalDetails && adhocDetails.applicationNo == getAddtionalDetails.applicationNo) {
              getAddtionalDetails.additionalDetails.adhocPenalty = parseFloat(adhocDetails.additionalDetails.adhocPenalty);
              getAddtionalDetails.additionalDetails.adhocPenaltyComment = adhocDetails.additionalDetails.adhocPenaltyComment;
              getAddtionalDetails.additionalDetails.adhocPenaltyReason = adhocDetails.additionalDetails.adhocPenaltyReason;
              getAddtionalDetails.additionalDetails.adhocRebate = parseFloat(adhocDetails.additionalDetails.adhocRebate);
              getAddtionalDetails.additionalDetails.adhocRebateComment = adhocDetails.additionalDetails.adhocRebateComment;
              getAddtionalDetails.additionalDetails.adhocRebateReason = adhocDetails.additionalDetails.adhocRebateReason;
              (0, _set2.default)(payload, 'WaterConnection[0].additionalDetails', getAddtionalDetails.additionalDetails);
            }

            _context5.next = 15;
            return checkFeeEstimateVisible((0, _cloneDeep2.default)(payload.WaterConnection));

          case 15:
            isVisible = _context5.sent;

            if (isVisible) {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.estimate.visible", true);
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.taskDetails.children.cardContent.children.estimate", "visible", true));
            } else {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.estimate.visible", false);
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.taskDetails.children.cardContent.children.estimate", "visible", false));
            }
            // let additionalDetailsformdata = JSON.parse(localStorage.getItem("WS_ADDITIONAL_DETAILS"));
            // if(additionalDetailsformdata) {
            //   set(payload, 'WaterConnection[0].additionalDetails', additionalDetailsformdata );
            // }
            convPayload = (0, _commons2.findAndReplace)(payload, "NA", null);
            queryObjectForEst = [{
              applicationNo: applicationNumber,
              tenantId: tenantId,
              waterConnection: convPayload.WaterConnection[0]
            }];
            queryObjectForSearch = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: applicationNumber }, { key: "Service", value: "WS.ONE_TIME_FEE" }];

            (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFour.props.items[0].item0.children.cardContent.children.serviceCardContainerForSW.visible", false);
            (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFour.props.items[0].item0.children.cardContent.children.serviceCardContainerForWater.visible", true);
            (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSixVS.visible", false);
            (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSixWS.visible", true);
            if (payload !== undefined && payload !== null) {
              roadCuttingInfos = (0, _get2.default)(payload, "WaterConnection[0].roadCuttingInfo", null);

              if (payload.WaterConnection[0] && Array.isArray(payload.WaterConnection[0].roadCuttingInfo) && payload.WaterConnection[0].roadCuttingInfo.length > 0) {
                payload.WaterConnection[0].roadCuttingInfo = Array.isArray(payload.WaterConnection[0].roadCuttingInfo) && payload.WaterConnection[0].roadCuttingInfo.filter(function (info) {
                  return info.status == "ACTIVE";
                });
              } else if ((0, _get2.default)(payload, "WaterConnection[0].roadCuttingInfo", null) == null) {
                (0, _set2.default)(payload, "WaterConnection[0].roadCuttingInfo", []);
              }
              dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", payload.WaterConnection[0]));
              dispatch((0, _actions.prepareFinalObject)("WaterConnection[0].roadCuttingInfos", roadCuttingInfos));
              dispatch((0, _actions.prepareFinalObject)("waterConnectionTemp[0]", payload.WaterConnection[0]));
              if ((0, _get2.default)(payload, "WaterConnection[0].property.status", "") !== "ACTIVE") {
                (0, _set2.default)(action.screenConfig, "components.div.children.snackbarWarningMessage.children.clickHereLink.props.propertyId", (0, _get2.default)(payload, "WaterConnection[0].property.propertyId", ""));
                (0, _set2.default)(action.screenConfig, "components.div.children.snackbarWarningMessage.children.clickHereLink.visible", true);
              }
              if (!payload.WaterConnection[0].connectionHolders || payload.WaterConnection[0].connectionHolders === 'NA') {
                (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFive.visible", false);
                (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewSix.visible", true);
              } else {
                (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewSix.visible", false);
                (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFive.visible", true);
              }
            }
            if (processInstanceAppStatus === "CONNECTION_ACTIVATED") {
              connectionNumber = payload.WaterConnection[0].connectionNo;

              (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.connection.children.connectionNumber.props.number", connectionNumber);
            } else {
              (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.connection.children.connectionNumber.visible", false);
            }

            // to set documents 

            if (!(payload.WaterConnection[0].documents !== null && payload.WaterConnection[0].documents !== "NA")) {
              _context5.next = 29;
              break;
            }

            _context5.next = 29;
            return (0, _commons.setDocuments)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].documents", "DocumentsData", dispatch, "WS");

          case 29:
            if (window.location.href.includes("mode=MODIFY")) {
              _context5.next = 40;
              break;
            }

            _context5.next = 32;
            return (0, _commons2.waterEstimateCalculation)(queryObjectForEst, dispatch);

          case 32:
            estimate = _context5.sent;

            if (!(estimate !== null && estimate !== undefined)) {
              _context5.next = 40;
              break;
            }

            if (!(estimate.Calculation.length > 0)) {
              _context5.next = 40;
              break;
            }

            _context5.next = 37;
            return processBills(estimate, viewBillTooltip, dispatch);

          case 37:
            // viewBreakUp 
            estimate.Calculation[0].billSlabData = _.groupBy(estimate.Calculation[0].taxHeadEstimates, 'category');
            estimate.Calculation[0].appStatus = processInstanceAppStatus;
            dispatch((0, _actions.prepareFinalObject)("dataCalculation", estimate.Calculation[0]));

          case 40:
            if (!(0, _commons2.isModifyMode)()) {
              _context5.next = 52;
              break;
            }

            connectionNo = payload.WaterConnection[0].connectionNo;
            queryObjForSearchApplications = [{ key: "tenantId", value: tenantId }, { key: "connectionNumber", value: connectionNo }, { key: "isConnectionSearch", value: true }];
            _context5.next = 45;
            return (0, _commons2.getSearchResults)(queryObjForSearchApplications);

          case 45:
            oldApplicationPayload = _context5.sent;

            oldApplicationPayload.WaterConnection = oldApplicationPayload.WaterConnection.sort(function (row1, row2) {
              return row2.auditDetails.createdTime - row1.auditDetails.createdTime;
            });
            if (oldApplicationPayload.WaterConnection.length > 1) {
              oldApplicationPayload.WaterConnection.shift();
            }
            waterSource = oldApplicationPayload.WaterConnection[0].waterSource || '';

            oldApplicationPayload.WaterConnection[0].waterSource = waterSource.includes("null") ? "NA" : waterSource.split(".")[0];
            oldApplicationPayload.WaterConnection[0].waterSubSource = waterSource.includes("null") ? "NA" : waterSource.split(".")[1];
            if (oldApplicationPayload.WaterConnection.length > 0) {
              dispatch((0, _actions.prepareFinalObject)("WaterConnectionOld", oldApplicationPayload.WaterConnection));
            }

          case 52:
            _context5.next = 110;
            break;

          case 54:
            if (!(service === _commons2.serviceConst.SEWERAGE)) {
              _context5.next = 110;
              break;
            }

            payload = [];
            _context5.next = 58;
            return (0, _commons2.getSearchResultsForSewerage)(queryObjForSearch, dispatch);

          case 58:
            payload = _context5.sent;

            payload.SewerageConnections[0].service = service;

            _getValuesofAdhoc = localStorage.getItem("WS_ADDITIONAL_DETAILS_FOR_DATA");
            _adhocDetails = _getValuesofAdhoc ? JSON.parse(_getValuesofAdhoc) : {};
            _getAddtionalDetails = (0, _get2.default)(payload, "SewerageConnections[0]", {});


            if (_adhocDetails && _adhocDetails.additionalDetails && _getAddtionalDetails && _getAddtionalDetails.additionalDetails && _adhocDetails.applicationNo == _getAddtionalDetails.applicationNo) {
              _getAddtionalDetails.additionalDetails.adhocPenalty = parseFloat(_adhocDetails.additionalDetails.adhocPenalty);
              _getAddtionalDetails.additionalDetails.adhocPenaltyComment = _adhocDetails.additionalDetails.adhocPenaltyComment;
              _getAddtionalDetails.additionalDetails.adhocPenaltyReason = _adhocDetails.additionalDetails.adhocPenaltyReason;
              _getAddtionalDetails.additionalDetails.adhocRebate = parseFloat(_adhocDetails.additionalDetailsadhocRebate);
              _getAddtionalDetails.additionalDetails.adhocRebateComment = _adhocDetails.additionalDetails.adhocRebateComment;
              _getAddtionalDetails.additionalDetails.adhocRebateReason = _adhocDetails.additionalDetails.adhocRebateReason;
              (0, _set2.default)(payload, 'SewerageConnections[0].additionalDetails', _getAddtionalDetails.additionalDetails);
            }

            _context5.next = 66;
            return checkFeeEstimateVisible((0, _cloneDeep2.default)(payload.SewerageConnections));

          case 66:
            _isVisible = _context5.sent;

            if (_isVisible) {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.estimate.visible", true);
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.taskDetails.children.cardContent.children.estimate", "visible", true));
            } else {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.estimate.visible", false);
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.taskDetails.children.cardContent.children.estimate", "visible", false));
            }
            additionalDetailsformdata = JSON.parse(localStorage.getItem("WS_ADDITIONAL_DETAILS"));

            if (additionalDetailsformdata) {
              (0, _set2.default)(payload, 'SewerageConnections[0].additionalDetails', additionalDetailsformdata);
            }
            (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFour.props.items[0].item0.children.cardContent.children.serviceCardContainerForSW.visible", true);
            (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFour.props.items[0].item0.children.cardContent.children.serviceCardContainerForWater.visible", false);
            (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSixVS.visible", true);
            (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewSixWS.visible", false);

            if (!(payload !== undefined && payload !== null)) {
              _context5.next = 91;
              break;
            }

            _roadCuttingInfos = (0, _get2.default)(payload, "SewerageConnections[0].roadCuttingInfo", null);

            if (payload.SewerageConnections[0] && Array.isArray(payload.SewerageConnections[0].roadCuttingInfo) && payload.SewerageConnections[0].roadCuttingInfo.length > 0) {
              payload.SewerageConnections[0].roadCuttingInfo = Array.isArray(payload.SewerageConnections[0].roadCuttingInfo) && payload.SewerageConnections[0].roadCuttingInfo.filter(function (info) {
                return info.status == "ACTIVE";
              });
            } else if ((0, _get2.default)(payload, "SewerageConnections[0].roadCuttingInfo", null) == null) {
              (0, _set2.default)(payload, "SewerageConnections[0].roadCuttingInfo", []);
            }
            dispatch((0, _actions.prepareFinalObject)("SewerageConnection[0]", payload.SewerageConnections[0]));
            dispatch((0, _actions.prepareFinalObject)("WaterConnection[0]", payload.SewerageConnections[0]));
            dispatch((0, _actions.prepareFinalObject)("SewerageConnection[0].roadCuttingInfos", _roadCuttingInfos));
            dispatch((0, _actions.prepareFinalObject)("WaterConnection[0].roadCuttingInfos", _roadCuttingInfos));
            dispatch((0, _actions.prepareFinalObject)("waterConnectionTemp[0]", payload.SewerageConnections[0]));
            if (!payload.SewerageConnections[0].connectionHolders || payload.SewerageConnections[0].connectionHolders === 'NA') {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFive.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewSix.visible", true);
            } else {
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewSix.visible", false);
              (0, _set2.default)(action.screenConfig, "components.div.children.taskDetails.children.cardContent.children.reviewConnectionDetails.children.cardContent.children.viewFive.visible", true);
            }

            if (!(0, _commons2.isModifyMode)()) {
              _context5.next = 91;
              break;
            }

            _connectionNo = payload.SewerageConnections[0].connectionNo;
            _queryObjForSearchApplications = [{ key: "tenantId", value: tenantId }, { key: "connectionNumber", value: _connectionNo }, { key: "isConnectionSearch", value: true }];
            _context5.next = 88;
            return (0, _commons2.getSearchResultsForSewerage)(_queryObjForSearchApplications, dispatch);

          case 88:
            _oldApplicationPayload = _context5.sent;

            _oldApplicationPayload.SewerageConnections = _oldApplicationPayload.SewerageConnections.filter(function (row) {
              return row.applicationType !== "MODIFY_SEWERAGE_CONNECTION";
            });
            if (_oldApplicationPayload.SewerageConnections.length > 0) {
              dispatch((0, _actions.prepareFinalObject)("SewerageConnectionOld[0]", _oldApplicationPayload.SewerageConnections[0]));
              dispatch((0, _actions.prepareFinalObject)("WaterConnectionOld[0]", _oldApplicationPayload.SewerageConnections[0]));
            }

          case 91:
            //connection number display
            if (processInstanceAppStatus === "CONNECTION_ACTIVATED") {
              _connectionNumber = payload.SewerageConnections[0].connectionNo;

              (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.connection.children.connectionNumber.props.number", _connectionNumber);
            } else {
              (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.connection.children.connectionNumber.visible", false);
            }

            // to set documents 

            if (!(payload.SewerageConnections[0].documents !== null && payload.SewerageConnections[0].documents !== "NA")) {
              _context5.next = 95;
              break;
            }

            _context5.next = 95;
            return (0, _commons.setDocuments)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].documents", "DocumentsData", dispatch, "WS");

          case 95:
            _convPayload = (0, _commons2.findAndReplace)(payload, "NA", null);
            _queryObjectForEst2 = [{
              applicationNo: applicationNumber,
              tenantId: tenantId,
              sewerageConnection: _convPayload.SewerageConnections[0]
            }];
            _queryObjectForSearch = [{ key: "tenantId", value: tenantId }, { key: "consumerCode", value: applicationNumber }, { key: "Service", value: "SW.ONE_TIME_FEE" }];

            if (window.location.href.includes("mode=MODIFY")) {
              _context5.next = 110;
              break;
            }

            _context5.next = 101;
            return (0, _commons2.swEstimateCalculation)(_queryObjectForEst2, dispatch);

          case 101:
            estimate = _context5.sent;

            if (!(estimate !== null && estimate !== undefined)) {
              _context5.next = 110;
              break;
            }

            if (!(estimate.Calculation.length > 0)) {
              _context5.next = 109;
              break;
            }

            _context5.next = 106;
            return processBills(estimate, viewBillTooltip, dispatch);

          case 106:
            // viewBreakUp 
            estimate.Calculation[0].billSlabData = _.groupBy(estimate.Calculation[0].taxHeadEstimates, 'category');
            estimate.Calculation[0].appStatus = processInstanceAppStatus;
            dispatch((0, _actions.prepareFinalObject)("dataCalculation", estimate.Calculation[0]));

          case 109:
            (0, _utils2.createEstimateData)(estimate.Calculation[0].taxHeadEstimates, "taxHeadEstimates", dispatch, {}, {});

          case 110:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function searchResults(_x7, _x8, _x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var parserFunction = function parserFunction(obj) {
  var _parsedObject;

  var parsedObject = (_parsedObject = {
    roadCuttingArea: parseInt(obj.roadCuttingArea),
    meterInstallationDate: (0, _utils2.convertDateToEpoch)(obj.meterInstallationDate),
    connectionExecutionDate: (0, _utils2.convertDateToEpoch)(obj.connectionExecutionDate),
    proposedWaterClosets: parseInt(obj.proposedWaterClosets),
    proposedToilets: parseInt(obj.proposedToilets)
  }, (0, _defineProperty3.default)(_parsedObject, "roadCuttingArea", parseInt(obj.roadCuttingArea)), (0, _defineProperty3.default)(_parsedObject, "additionalDetails", {
    initialMeterReading: obj.additionalDetails !== undefined && obj.additionalDetails.initialMeterReading !== undefined ? parseFloat(obj.additionalDetails.initialMeterReading) : null,
    detailsProvidedBy: obj.additionalDetails !== undefined && obj.additionalDetails.detailsProvidedBy !== undefined && obj.additionalDetails.detailsProvidedBy !== null ? obj.additionalDetails.detailsProvidedBy : ""
  }), (0, _defineProperty3.default)(_parsedObject, "dateEffectiveFrom", (0, _utils2.convertDateToEpoch)(obj.dateEffectiveFrom)), (0, _defineProperty3.default)(_parsedObject, "noOfTaps", parseInt(obj.noOfTaps)), (0, _defineProperty3.default)(_parsedObject, "proposedTaps", parseInt(obj.proposedTaps)), (0, _defineProperty3.default)(_parsedObject, "plumberInfo", obj.plumberInfo === null || obj.plumberInfo === "NA" ? [] : obj.plumberInfo), _parsedObject);
  obj = (0, _extends3.default)({}, obj, parsedObject);
  return obj;
};

var processBills = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(data, viewBillTooltip, dispatch) {
    var des, obj, groupBillDetails, appNumber, dataArray, finalArray;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            des = void 0, obj = void 0, groupBillDetails = [];
            appNumber = data.Calculation[0].applicationNo;

            data.Calculation[0].taxHeadEstimates.forEach(function () {
              var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(element) {
                var cessKey, body, res;
                return _regenerator2.default.wrap(function _callee6$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        cessKey = element.taxHeadCode;
                        body = void 0;

                        if (service === _commons2.serviceConst.WATER || appNumber.includes("WS")) {
                          body = { "MdmsCriteria": { "tenantId": tenantId, "moduleDetails": [{ "moduleName": "ws-services-calculation", "masterDetails": [{ "name": cessKey }] }] } };
                        } else {
                          body = { "MdmsCriteria": { "tenantId": tenantId, "moduleDetails": [{ "moduleName": "sw-services-calculation", "masterDetails": [{ "name": cessKey }] }] } };
                        }
                        _context6.next = 5;
                        return (0, _commons2.getDescriptionFromMDMS)(body, dispatch);

                      case 5:
                        res = _context6.sent;

                        if (res !== null && res !== undefined && res.MdmsRes !== undefined && res.MdmsRes !== null) {
                          if (service === _commons2.serviceConst.WATER || appNumber.includes("WS")) {
                            des = res.MdmsRes["ws-services-calculation"];
                          } else {
                            des = res.MdmsRes["sw-services-calculation"];
                          }
                          if (des !== null && des !== undefined && des[cessKey] !== undefined && des[cessKey][0] !== undefined && des[cessKey][0] !== null) {
                            groupBillDetails.push({ key: cessKey, value: des[cessKey][0].description, amount: element.estimateAmount, order: element.order });
                          } else {
                            groupBillDetails.push({ key: cessKey, value: 'Please put some description in mdms for this Key', amount: element.estimateAmount, category: element.category });
                          }
                        }

                      case 7:
                      case "end":
                        return _context6.stop();
                    }
                  }
                }, _callee6, undefined);
              }));

              return function (_x16) {
                return _ref7.apply(this, arguments);
              };
            }());
            obj = { bill: groupBillDetails };
            viewBillTooltip.push(obj);
            dataArray = [{ total: data.Calculation[0].totalAmount }];
            finalArray = [{ description: viewBillTooltip, data: dataArray }];

            dispatch((0, _actions.prepareFinalObject)("viewBillToolipData", finalArray));

          case 8:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined);
  }));

  return function processBills(_x13, _x14, _x15) {
    return _ref6.apply(this, arguments);
  };
}();

var processBillsSearch = exports.processBillsSearch = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(data, viewBillTooltip, dispatch, applicationNumber) {
    var des, obj, groupBillDetails, appNumber, dataArray, finalArray;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            des = void 0, obj = void 0, groupBillDetails = [];
            appNumber = applicationNumber;

            data.Bill[0].billDetails[0].billAccountDetails.forEach(function () {
              var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(element) {
                var cessKey, body, res;
                return _regenerator2.default.wrap(function _callee8$(_context8) {
                  while (1) {
                    switch (_context8.prev = _context8.next) {
                      case 0:
                        cessKey = element.taxHeadCode;
                        body = void 0;

                        if (service === _commons2.serviceConst.WATER || appNumber.includes("WS")) {
                          body = { "MdmsCriteria": { "tenantId": tenantId, "moduleDetails": [{ "moduleName": "ws-services-calculation", "masterDetails": [{ "name": cessKey }] }] } };
                        } else {
                          body = { "MdmsCriteria": { "tenantId": tenantId, "moduleDetails": [{ "moduleName": "sw-services-calculation", "masterDetails": [{ "name": cessKey }] }] } };
                        }
                        _context8.next = 5;
                        return (0, _commons2.getDescriptionFromMDMS)(body, dispatch);

                      case 5:
                        res = _context8.sent;

                        if (res !== null && res !== undefined && res.MdmsRes !== undefined && res.MdmsRes !== null) {
                          if (service === _commons2.serviceConst.WATER || appNumber.includes("WS")) {
                            des = res.MdmsRes["ws-services-calculation"];
                          } else {
                            des = res.MdmsRes["sw-services-calculation"];
                          }
                          if (des !== null && des !== undefined && des[cessKey] !== undefined && des[cessKey][0] !== undefined && des[cessKey][0] !== null) {
                            groupBillDetails.push({ key: cessKey, value: des[cessKey][0].description, amount: element.amount, order: element.order });
                          } else {
                            groupBillDetails.push({ key: cessKey, value: 'Please put some description in mdms for this Key', amount: element.amount, category: element.category });
                          }
                        }

                      case 7:
                      case "end":
                        return _context8.stop();
                    }
                  }
                }, _callee8, undefined);
              }));

              return function (_x21) {
                return _ref9.apply(this, arguments);
              };
            }());
            obj = { bill: groupBillDetails };
            viewBillTooltip.push(obj);
            dataArray = [{ total: data.Bill[0].totalAmount }];
            finalArray = [{ description: viewBillTooltip, data: dataArray }];

            dispatch((0, _actions.prepareFinalObject)("viewBillToolipData", finalArray));

          case 8:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function processBillsSearch(_x17, _x18, _x19, _x20) {
    return _ref8.apply(this, arguments);
  };
}();
exports.default = screenConfig;