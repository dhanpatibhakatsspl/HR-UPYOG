"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.resetOCFields = exports.getBuildingDetails = exports.getMdmsDataForOc = exports.fetchMDMSOCData = exports.fetchMDMSData = exports.getMdmsData = exports.submitFields = exports.validateForm = exports.resetFields = exports.getSearchResultsfromEDCRWithApplcationNo = exports.uuidv4 = exports.fetchDataForStakeHolder = exports.fetchData = undefined;

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api.js");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api2 = require("../../../../ui-utils/api");

var _commons2 = require("../../../../ui-utils/commons");

var _utils = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var userTenant = (0, _localStorageUtils.getTenantId)(); // import { httpRequest } from "../../../../../ui-utils";

var userUUid = (0, _get2.default)(JSON.parse((0, _localStorageUtils.getUserInfo)()), "uuid");
var fetchData = exports.fetchData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var fromMyApplicationPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var response, myApplicationsCount;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dispatch((0, _actions2.prepareFinalObject)("searchResults", []));
            dispatch((0, _actions2.prepareFinalObject)("myApplicationsCount", 0));

            _context.next = 4;
            return getSearchResultsfromEDCR(action, state, dispatch);

          case 4:
            response = _context.sent;

            try {
              if (response && response.edcrDetail) {
                dispatch((0, _actions2.prepareFinalObject)("searchResults", response.edcrDetail));
                dispatch((0, _actions2.prepareFinalObject)("myApplicationsCount", response.edcrDetail.length));
                myApplicationsCount = response.edcrDetail.length;

                if (fromMyApplicationPage) {
                  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("my-applications", "components.div.children.header.children.key", "props.dynamicArray", myApplicationsCount ? [myApplicationsCount] : [0]));
                }
              }
            } catch (error) {}

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function fetchData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var fetchDataForStakeHolder = exports.fetchDataForStakeHolder = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var fromMyApplicationPage = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var response, searchConvertedArray;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            dispatch((0, _actions2.prepareFinalObject)("searchResults", []));
            dispatch((0, _actions2.prepareFinalObject)("myApplicationsCount", 0));

            _context2.next = 4;
            return getSearchResultsfromEDCR(action, state, dispatch);

          case 4:
            response = _context2.sent;

            try {
              if (response && response.edcrDetail && response.edcrDetail.length > 0) {
                dispatch((0, _actions2.prepareFinalObject)("searchResults", response.edcrDetail));
                dispatch((0, _actions2.prepareFinalObject)("myApplicationsCount", response.edcrDetail.length));

                searchConvertedArray = [];

                response.edcrDetail.forEach(function (element) {
                  var _searchConvertedArray;

                  var planReportUrl = element.planReport;
                  var dxfFileurl = element.dxfFile;
                  var planReportUrlValue = void 0,
                      dxfFileurlValue = void 0;
                  planReportUrlValue = !planReportUrl.includes("https") && window.location.href.includes("https") ? planReportUrl.replace(/http/g, "https") : planReportUrl;
                  dxfFileurlValue = !dxfFileurl.includes("https") && window.location.href.includes("https") ? dxfFileurl.replace(/http/g, "https") : dxfFileurl;
                  searchConvertedArray.push((_searchConvertedArray = {}, (0, _defineProperty3.default)(_searchConvertedArray, "EDCR_COMMON_TABLE_APPL_NO", element.applicationNumber || "-"), (0, _defineProperty3.default)(_searchConvertedArray, "EDCR_COMMON_TABLE_SCRUTINY_NO", (element.edcrNumber === "null" ? "NA" : element.edcrNumber) || "NA"), (0, _defineProperty3.default)(_searchConvertedArray, "EDCR_COMMON_TABLE_CITY_LABEL", element.tenantId.split('.')[1] || "-"), (0, _defineProperty3.default)(_searchConvertedArray, "EDCR_COMMON_TABLE_APPL_NAME", element.planDetail.planInformation.applicantName || "-"), (0, _defineProperty3.default)(_searchConvertedArray, "EDCR_COMMON_TABLE_COL_STATUS", element.status || "-"), (0, _defineProperty3.default)(_searchConvertedArray, "EDCR_DOWNLOAD_REPORT", (0, _commons.getLocaleLabels)("DOWNLOAD SCRUTINY REPORT", "EDCR_DOWNLOAD_REPORT")), (0, _defineProperty3.default)(_searchConvertedArray, "EDCR_DOWNLOAD_BUILDING_PLAN", (0, _commons.getLocaleLabels)("DOWNLOAD BUILDING PLAN(DXF)", "EDCR_DOWNLOAD_BUILDING_PLAN")), (0, _defineProperty3.default)(_searchConvertedArray, "EDCR_DOWNLOAD_REPORT1", planReportUrlValue), (0, _defineProperty3.default)(_searchConvertedArray, "EDCR_DOWNLOAD_BUILDING_PLAN1", dxfFileurlValue), _searchConvertedArray));
                });

                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("my-applications-stakeholder", "components.div.children.applicationsCard", "props.data", searchConvertedArray));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("my-applications-stakeholder", "components.div.children.applicationsCard", "props.rows", searchConvertedArray.length));
              }
            } catch (error) {}

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function fetchDataForStakeHolder(_x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var uuidv4 = exports.uuidv4 = function uuidv4() {
  return require("uuid/v4")();
};

var moveToSuccess = function moveToSuccess(state, dispatch, edcrDetail, isOCApp) {
  var applicationNo = edcrDetail.transactionNumber;

  var tenantId = edcrDetail.tenantId;
  var edcrNumber = (0, _get2.default)(edcrDetail, "edcrNumber");

  var purpose = isOCApp ? "ocapply" : "apply";
  var status = edcrDetail.status === "Accepted" ? "success" : "rejected";
  if (edcrDetail.status == "Aborted") {
    status = "aborted";
  }
  // let url = `/edcrscrutiny/acknowledgement?purpose=${purpose}&status=${status}&applicationNumber=${applicationNo}&tenantId=${tenantId}`;
  if (isOCApp) {
    var ocApplyPath = (0, _get2.default)(state.screenConfiguration, "screenConfig.acknowledgement.components.div.children.gotoHomeFooter.children.ocCreateApp.onClickDefination.path", "");
    if (ocApplyPath) {
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.gotoHomeFooter.children.ocCreateApp", "onClickDefination.path", "/oc-bpa/apply?tenantId=" + tenantId + "&edcrNumber=" + edcrNumber));
    }
  } else {
    var _ocApplyPath = (0, _get2.default)(state.screenConfiguration, "screenConfig.acknowledgement.components.div.children.gotoHomeFooter.children.bpaCreateApp.onClickDefination.path", "");
    if (_ocApplyPath) {
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("acknowledgement", "components.div.children.gotoHomeFooter.children.bpaCreateApp", "onClickDefination.path", "/egov-bpa/apply?tenantId=" + tenantId + "&edcrNumber=" + edcrNumber));
    }
  }
  var url = "/edcrscrutiny/acknowledgement?purpose=" + purpose + "&status=" + status + "&applicationNumber=" + applicationNo + "&tenantId=" + tenantId + "&edcrNumber=" + edcrNumber;
  dispatch((0, _actions.setRoute)(url));
};

var getSearchResultsfromEDCR = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
    var EDCRHost, authToken, response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            EDCRHost = "";
            authToken = (0, _localStorageUtils.getAccessToken)();
            _context3.next = 5;
            return _axios2.default.post(EDCRHost + "/edcr/rest/dcr/scrutinydetails?tenantId=" + (0, _localStorageUtils.getTenantId)(), {
              RequestInfo: {
                apiId: "1",
                ver: "1",
                ts: "01-01-2017 01:01:01",
                action: "create",
                did: "jh",
                key: "",
                msgId: "gfcfc",
                correlationId: "wefiuweiuff897",
                authToken: authToken,
                userInfo: {
                  id: userUUid,
                  tenantId: userTenant
                }
              }
            }, { headers: { "Content-Type": "application/json" } });

          case 5:
            response = _context3.sent;
            return _context3.abrupt("return", response.data);

          case 9:
            _context3.prev = 9;
            _context3.t0 = _context3["catch"](0);
            return _context3.abrupt("return", null);

          case 12:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 9]]);
  }));

  return function getSearchResultsfromEDCR(_x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

var getSearchResultsfromEDCRWithApplcationNo = exports.getSearchResultsfromEDCRWithApplcationNo = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(applicationNumber, tenantId) {
    var EDCRHost, authToken, response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            EDCRHost = "";
            authToken = (0, _localStorageUtils.getAccessToken)();
            _context4.next = 5;
            return _axios2.default.post(EDCRHost + "/edcr/rest/dcr/scrutinydetails?tenantId=" + tenantId + "&transactionNumber=" + applicationNumber, {
              RequestInfo: {
                apiId: "1",
                ver: "1",
                ts: "01-01-2017 01:01:01",
                action: "create",
                did: "jh",
                key: "",
                msgId: "gfcfc",
                correlationId: "wefiuweiuff897",
                authToken: authToken,
                userInfo: {
                  id: userUUid,
                  tenantId: userTenant
                }
              }
            }, { headers: { "Content-Type": "application/json" } });

          case 5:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 9:
            _context4.prev = 9;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", null);

          case 12:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 9]]);
  }));

  return function getSearchResultsfromEDCRWithApplcationNo(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();

var scrutinizePlan = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(state, dispatch) {
    var screenConfiguration, preparedFinalObject, isOCApp, tenantId, appliactionType, applicationSubType, userInfo, edcrNumber, edcrRequest, transactionNumber, applicantName, file, permitNumber, permitDate, comparisonEdcrNumber, url, bodyFormData, authToken, response, data;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;

            dispatch((0, _actions2.toggleSpinner)());

            screenConfiguration = state.screenConfiguration;
            preparedFinalObject = screenConfiguration.preparedFinalObject;
            isOCApp = window.location.href.includes("ocapply");
            tenantId = (0, _get2.default)(preparedFinalObject, "Scrutiny[0].tenantId");
            appliactionType = isOCApp ? "BUILDING_OC_PLAN_SCRUTINY" : "BUILDING_PLAN_SCRUTINY";
            applicationSubType = "NEW_CONSTRUCTION";
            userInfo = { id: userUUid, tenantId: userTenant }, edcrNumber = "";


            if (isOCApp) {
              userInfo = { id: userUUid, tenantId: tenantId }, edcrNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bpaDetails.edcrNumber");
            } else {
              userInfo = { id: userUUid, tenantId: userTenant };
            }

            edcrRequest = {
              transactionNumber: "",
              edcrNumber: edcrNumber,
              planFile: null,
              tenantId: "",
              RequestInfo: {
                apiId: "",
                ver: "",
                ts: "",
                action: "",
                did: "",
                authToken: "",
                key: "",
                msgId: "",
                correlationId: "",
                userInfo: userInfo
              }
            };
            //generate trx no

            transactionNumber = uuidv4();
            //

            applicantName = (0, _get2.default)(preparedFinalObject, "Scrutiny[0].applicantName");
            file = (0, _get2.default)(preparedFinalObject, "Scrutiny[0].buildingPlan[0]");
            permitNumber = (0, _get2.default)(preparedFinalObject, "Scrutiny[0].permitNumber");
            permitDate = (0, _get2.default)(preparedFinalObject, "bpaDetails.approvalDate");
            comparisonEdcrNumber = (0, _get2.default)(preparedFinalObject, "bpaDetails.edcrNumber");


            edcrRequest = (0, _extends3.default)({}, edcrRequest, { tenantId: tenantId });
            edcrRequest = (0, _extends3.default)({}, edcrRequest, { transactionNumber: transactionNumber });
            edcrRequest = (0, _extends3.default)({}, edcrRequest, { applicantName: applicantName });
            edcrRequest = (0, _extends3.default)({}, edcrRequest, { appliactionType: appliactionType });
            edcrRequest = (0, _extends3.default)({}, edcrRequest, { applicationSubType: applicationSubType });

            url = "/edcr/rest/dcr/scrutinize?tenantId=" + tenantId;

            if (isOCApp) {
              edcrRequest = (0, _extends3.default)({}, edcrRequest, { permitDate: permitDate });
              edcrRequest = (0, _extends3.default)({}, edcrRequest, { permitNumber: permitNumber });
              edcrRequest = (0, _extends3.default)({}, edcrRequest, { comparisonEdcrNumber: comparisonEdcrNumber });
            }

            bodyFormData = new FormData();

            bodyFormData.append("edcrRequest", JSON.stringify(edcrRequest));
            bodyFormData.append("planFile", file);
            authToken = (0, _localStorageUtils.getAccessToken)();
            _context5.next = 30;
            return (0, _axios2.default)({
              method: "post",
              url: url,
              data: bodyFormData,
              headers: { "Content-Type": "multipart/form-data", "auth-token": authToken }
            });

          case 30:
            response = _context5.sent;

            if (response) {
              data = response.data;

              if (data.edcrDetail) {
                dispatch((0, _actions2.prepareFinalObject)("edcrDetail", data.edcrDetail));
                dispatch((0, _actions2.toggleSpinner)());
                moveToSuccess(state, dispatch, data.edcrDetail[0], isOCApp);
              }
            }
            _context5.next = 38;
            break;

          case 34:
            _context5.prev = 34;
            _context5.t0 = _context5["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context5.t0.message }, "error"));
            dispatch((0, _actions2.toggleSpinner)());

          case 38:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 34]]);
  }));

  return function scrutinizePlan(_x14, _x15) {
    return _ref5.apply(this, arguments);
  };
}();

var resetFields = exports.resetFields = function resetFields(state, dispatch) {
  var filedata = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Scrutiny[0].buildingPlan[0]");

  if ((typeof filedata === "undefined" ? "undefined" : (0, _typeof3.default)(filedata)) === "object" && !Array.isArray(filedata)) {
    window.location.reload();
  } else {
    dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails.children.applicantName", "props.value", ""));
    dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails.children.dropdown", "props.value", { name: "", code: "" }));
  }
  dispatch((0, _actions2.prepareFinalObject)("Scrutiny[0].buildingPlan[0]", []));
  dispatch((0, _actions2.prepareFinalObject)("Scrutiny[0].tenantId", ""));
  dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].uploadedDocsInRedux[0]", []));
};

var validateForm = exports.validateForm = function validateForm(state, dispatch) {
  var screenKey = window.location.href.includes("ocapply") ? "ocapply" : "apply";
  var isInputDataValid = (0, _utils.validateFields)("components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails.children", state, dispatch, screenKey);

  if (screenKey == "ocapply") {
    var applicantName = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Scrutiny[0].applicantName", "");
    if (!applicantName) {
      var errorMessage = {
        labelName: "Please fill date and permit number and click on search",
        labelKey: "ERR_FILL_MANDATORY_FIELDS_PERMIT_SEARCH"
      };
      dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));
      return;
    }
  }

  var filedata = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Scrutiny[0].buildingPlan[0]");
  var isDocValid = false;
  isDocValid = filedata && (typeof filedata === "undefined" ? "undefined" : (0, _typeof3.default)(filedata)) === "object" && !Array.isArray(filedata);

  return isDocValid && isInputDataValid;
};

var submitFields = exports.submitFields = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch) {
    var a, errorMessage;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!validateForm(state, dispatch)) {
              _context6.next = 6;
              break;
            }

            _context6.next = 3;
            return scrutinizePlan(state, dispatch);

          case 3:
            a = _context6.sent;
            _context6.next = 8;
            break;

          case 6:
            errorMessage = {
              labelName: "Please fill all mandatory fields and upload the documents!",
              labelKey: "ERR_FILL_MANDATORY_FIELDS_UPLOAD_DOCS"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));

          case 8:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined);
  }));

  return function submitFields(_x16, _x17) {
    return _ref6.apply(this, arguments);
  };
}();

var getMdmsData = exports.getMdmsData = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7() {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _localStorageUtils.getTenantId)(),
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{ name: "citymodule" }]
                }]
              }
            };
            _context7.prev = 1;
            _context7.next = 4;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context7.sent;
            return _context7.abrupt("return", payload);

          case 8:
            _context7.prev = 8;
            _context7.t0 = _context7["catch"](1);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[1, 8]]);
  }));

  return function getMdmsData() {
    return _ref7.apply(this, arguments);
  };
}();

var fetchMDMSData = exports.fetchMDMSData = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(action, state, dispatch) {
    var mdmsRes, TenantList;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.next = 2;
            return getMdmsData(dispatch);

          case 2:
            mdmsRes = _context8.sent;
            TenantList = [];

            if (mdmsRes && mdmsRes.MdmsRes && mdmsRes.MdmsRes.tenant) {
              mdmsRes.MdmsRes.tenant.citymodule.forEach(function (element) {
                if (element.code === "BPAREG") {
                  element.tenants.forEach(function (tenant) {
                    TenantList.push({ code: tenant.code, name: tenant.code });
                  });
                }
              });
            }
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.tenantData", TenantList));

          case 6:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined);
  }));

  return function fetchMDMSData(_x18, _x19, _x20) {
    return _ref8.apply(this, arguments);
  };
}();

var fetchMDMSOCData = exports.fetchMDMSOCData = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(action, state, dispatch) {
    var mdmsRes, tenants;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _context9.next = 2;
            return getMdmsDataForOc(dispatch);

          case 2:
            mdmsRes = _context9.sent;

            if (mdmsRes && mdmsRes.MdmsRes) {
              tenants = mdmsRes.MdmsRes.tenant.citymodule.find(function (item) {
                if (item.code === "BPAAPPLY") return true;
              });

              mdmsRes.MdmsRes.tenantData = tenants.tenants;
              dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData", mdmsRes.MdmsRes));
            }

          case 4:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function fetchMDMSOCData(_x21, _x22, _x23) {
    return _ref9.apply(this, arguments);
  };
}();

var getMdmsDataForOc = exports.getMdmsDataForOc = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10() {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _localStorageUtils.getTenantId)(),
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{ name: "citymodule" }]
                }, {
                  moduleName: "BPA",
                  masterDetails: [{ name: "ServiceType" }]
                }]
              }
            };
            _context10.prev = 1;
            _context10.next = 4;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context10.sent;
            return _context10.abrupt("return", payload);

          case 8:
            _context10.prev = 8;
            _context10.t0 = _context10["catch"](1);

          case 10:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[1, 8]]);
  }));

  return function getMdmsDataForOc() {
    return _ref10.apply(this, arguments);
  };
}();

var visibleHiddenSearchFields = function () {
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(state, dispatch, isTrue) {
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            if (isTrue) {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails", "visible", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.buttonContainer", "visible", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.ocScrutinyDetailsContainer", "visible", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.dummyDiv2", "visible", true));
            } else {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails", "visible", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.buttonContainer", "visible", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.ocScrutinyDetailsContainer", "visible", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.dummyDiv2", "visible", false));
            }

          case 1:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function visibleHiddenSearchFields(_x24, _x25, _x26) {
    return _ref11.apply(this, arguments);
  };
}();

var getBuildingDetails = exports.getBuildingDetails = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(state, dispatch, fieldInfo) {
    var permitNum, permitDate, tenantId, errorMessage, queryObject, response, dateFromApi, month, day, year, date, edcrRes, SHLicenseDetails, primaryOwnerArray, _errorMessage;

    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            permitNum = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Scrutiny[0].permitNumber", "");
            permitDate = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Scrutiny[0].permitDate", "");
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Scrutiny[0].tenantId", "");

            if (!(!permitDate || !permitNum || !tenantId)) {
              _context12.next = 7;
              break;
            }

            errorMessage = {
              labelName: "Please fill all date, permit number and city then click on search",
              labelKey: "ERR_FILL_MANDATORY_FIELDS_PERMIT_SEARCH"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, errorMessage, "warning"));
            return _context12.abrupt("return");

          case 7:
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "approvalNo", value: permitNum }, { key: "permitDate", value: (0, _utils.convertDateToEpoch)(permitDate) }];
            _context12.next = 10;
            return (0, _commons2.getBpaSearchResults)(queryObject);

          case 10:
            response = _context12.sent;

            if (!((0, _get2.default)(response, "BPA[0].edcrNumber") == undefined)) {
              _context12.next = 15;
              break;
            }

            visibleHiddenSearchFields(state, dispatch, false);
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "No Records Found",
              labelKey: "BPA_NO_REC_FOUND_LABEL"
            }, "error"));
            return _context12.abrupt("return");

          case 15:
            dateFromApi = new Date((0, _get2.default)(response, "BPA[0].approvalDate"));
            month = dateFromApi.getMonth() + 1;
            day = dateFromApi.getDate();
            year = dateFromApi.getFullYear();

            month = (month > 9 ? "" : "0") + month;
            day = (day > 9 ? "" : "0") + day;
            date = year + "-" + month + "-" + day;

            if (!(permitNum === (0, _get2.default)(response, "BPA[0].approvalNo") && date === permitDate)) {
              _context12.next = 44;
              break;
            }

            _context12.next = 25;
            return (0, _api2.edcrHttpRequest)("post", "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + (0, _get2.default)(response, "BPA[0].edcrNumber") + "&tenantId=" + tenantId, "search", []);

          case 25:
            edcrRes = _context12.sent;
            _context12.next = 28;
            return (0, _utils.getLicenseDetails)(state, dispatch);

          case 28:
            SHLicenseDetails = _context12.sent;

            if (!((0, _get2.default)(edcrRes, "edcrDetail[0]") && SHLicenseDetails)) {
              _context12.next = 33;
              break;
            }

            visibleHiddenSearchFields(state, dispatch, true);
            _context12.next = 36;
            break;

          case 33:
            visibleHiddenSearchFields(state, dispatch, false);
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "No Records Found",
              labelKey: "BPA_NO_REC_FOUND_LABEL"
            }, "error"));
            return _context12.abrupt("return");

          case 36:
            (0, _set2.default)(response, "BPA[0].serviceType", "NEW_CONSTRUCTION");
            primaryOwnerArray = (0, _get2.default)(response, "BPA[0].landInfo.owners").filter(function (owr) {
              return owr && owr.isPrimaryOwner && owr.isPrimaryOwner == true;
            });

            dispatch((0, _actions2.prepareFinalObject)("Scrutiny[0].applicantName", primaryOwnerArray.length && primaryOwnerArray[0].name));
            dispatch((0, _actions2.prepareFinalObject)("bpaDetails", (0, _get2.default)(response, "BPA[0]")));
            dispatch((0, _actions2.prepareFinalObject)("scrutinyDetails", edcrRes.edcrDetail[0]));
            dispatch((0, _actions2.prepareFinalObject)("bpaDetails.appliedBy", SHLicenseDetails));
            _context12.next = 47;
            break;

          case 44:
            _errorMessage = {
              labelName: "Please select approval date",
              labelKey: "ERR_FILL_EDCR_PERMIT_INCORRECT_DATE"
            };

            dispatch((0, _actions2.toggleSnackbar)(true, _errorMessage, "warning"));
            return _context12.abrupt("return");

          case 47:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function getBuildingDetails(_x27, _x28, _x29) {
    return _ref12.apply(this, arguments);
  };
}();

var resetOCFields = exports.resetOCFields = function resetOCFields(state, dispatch) {
  var applicantName = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Scrutiny[0].applicantName");
  var filedata = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Scrutiny[0].buildingPlan[0]");

  if (applicantName || (typeof filedata === "undefined" ? "undefined" : (0, _typeof3.default)(filedata)) === "object" && !Array.isArray(filedata)) {
    window.location.reload();
  }

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails.children.buildingPermitDate", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails.children.buildingPermitNum", "props.value", ""));
  dispatch((0, _actions2.prepareFinalObject)("Scrutiny[0].buildingPlan[0]", []));
  dispatch((0, _actions2.prepareFinalObject)("Scrutiny[0].permitDate", ""));
  dispatch((0, _actions2.prepareFinalObject)("Scrutiny[0].permitNumber", ""));
  dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].uploadedDocsInRedux[0]", []));
};