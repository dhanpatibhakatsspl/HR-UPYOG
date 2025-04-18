"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMohallaDetails = exports.prepareDocumentDetailsUploadRedux = exports.formwizardFifthStep = exports.formwizardFourthStep = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.header = exports.stepper = exports.stepsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../utils");

var _footer = require("./applyResource/footer");

var _basicDetails = require("./applyResource/basicDetails");

var _propertyLocationDetails = require("./applyResource/propertyLocationDetails");

var _scrutinyDetails = require("./applyResource/scrutinyDetails");

var _applicantDetails = require("./applyResource/applicantDetails");

var _boundarydetails = require("./applyResource/boundarydetails");

var _documentDetails = require("./applyResource/documentDetails");

var _updateNocDetails = require("./applyResource/updateNocDetails");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _api = require("../../../../ui-utils/api");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("../../../../ui-utils/commons");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _summaryDetails = require("../egov-bpa/summaryDetails");

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _noc = require("./noc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "Basic Details", labelKey: "BPA_STEPPER_BASIC_DETAILS_HEADER" }, { labelName: "Scrutiny Details", labelKey: "BPA_STEPPER_SCRUTINY_DETAILS_HEADER" }, { labelName: "Owner Info", labelKey: "BPA_STEPPER_OWNER_INFO_HEADER" }, { labelName: "Document and NOC details", labelKey: "BPA_STEPPER_DOCUMENT_NOC_DETAILS_HEADER" }, { labelName: "Application Summary", labelKey: "BPA_STEPPER_SUMMARY_HEADER" }];

var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Apply for building permit",
    labelKey: "BPA_APPLY_FOR_BUILDING_PERMIT_HEADER"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-bpa",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "NA"
    },
    visible: false
  }
});

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    basicDetails: _basicDetails.basicDetails,
    bpaLocationDetails: _propertyLocationDetails.bpaLocationDetails,
    detailsofplot: _boundarydetails.detailsofplot
  }
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    buildingPlanScrutinyDetails: _scrutinyDetails.buildingPlanScrutinyDetails,
    proposedBuildingDetails: _scrutinyDetails.proposedBuildingDetails,
    demolitiondetails: _scrutinyDetails.demolitiondetails,
    abstractProposedBuildingDetails: _scrutinyDetails.abstractProposedBuildingDetails
  },
  visible: false
};

var formwizardThirdStep = exports.formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {
    applicantDetails: _applicantDetails.applicantDetails
  },
  visible: false
};

var formwizardFourthStep = exports.formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  children: {
    documentDetails: _documentDetails.documentDetails,
    nocDetailsApply: _noc.nocDetailsApply
  },
  visible: false
};

var formwizardFifthStep = exports.formwizardFifthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  children: {
    bpaSummaryDetails: _summaryDetails.bpaSummaryDetails
  },
  visible: false
};

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "citiesByModule.citizenTenantId.value") || (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _localStorageUtils.getTenantId)(),
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "DocumentType"
                  }, {
                    name: "OwnerType"
                  }, {
                    name: "OwnerShipCategory"
                  }]
                }, {
                  moduleName: "BPA",
                  masterDetails: [{
                    name: "DocTypeMapping"
                  }, {
                    name: "ApplicationType"
                  }, {
                    name: "ServiceType"
                  }, {
                    name: "RiskTypeComputation"
                  }, {
                    name: "OccupancyType"
                  }, {
                    name: "SubOccupancyType"
                  }, {
                    name: "Usages"
                  }, {
                    name: "ProposedLandUse"
                  }, {
                    name: "TownPlanningScheme"
                  }]
                }, {
                  moduleName: "TradeLicense",
                  masterDetails: [{ name: "TradeType", filter: "[?(@.type == \"BPA\")]" }]
                }, {
                  moduleName: "NOC",
                  masterDetails: [{
                    name: "DocumentTypeMapping"
                  }]
                }]
              }
            };
            _context.prev = 2;
            payload = null;
            _context.next = 6;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            _context.next = 12;
            break;

          case 10:
            _context.prev = 10;
            _context.t0 = _context["catch"](2);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[2, 10]]);
  }));

  return function getMdmsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getTodaysDate = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    var today;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            today = (0, _utils2.getTodaysDateInYYYMMDD)();

            dispatch((0, _actions.prepareFinalObject)("BPAs.appdate", today));

          case 2:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getTodaysDate(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getFirstListFromDotSeparated = function getFirstListFromDotSeparated(list) {
  list = list.map(function (item) {
    if (item.active) {
      return item.code.split(".")[0];
    }
  });
  list = [].concat((0, _toConsumableArray3.default)(new Set(list))).map(function (item) {
    return { code: item };
  });
  return list;
};

var setSearchResponse = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, applicationNumber, tenantId, action) {
    var response, edcrNumber, ownershipCategory, appDate, latitude, longitude, edcrRes, riskType, bpaService, queryObject;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _commons2.getAppSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNo", value: applicationNumber }]);

          case 2:
            response = _context3.sent;
            edcrNumber = (0, _get2.default)(response, "BPA[0].edcrNumber");
            ownershipCategory = (0, _get2.default)(response, "BPA[0].landInfo.ownershipCategory");
            appDate = (0, _get2.default)(response, "BPA[0].auditDetails.createdTime");
            latitude = (0, _get2.default)(response, "BPA[0].address.geoLocation.latitude");
            longitude = (0, _get2.default)(response, "BPA[0].address.geoLocation.longitude");


            dispatch((0, _actions.prepareFinalObject)("BPA", response.BPA[0]));
            _context3.next = 11;
            return (0, _api.edcrHttpRequest)("post", "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + edcrNumber + "&tenantId=" + tenantId, "search", []);

          case 11:
            edcrRes = _context3.sent;


            dispatch((0, _actions.prepareFinalObject)("scrutinyDetails", edcrRes.edcrDetail[0]));
            _context3.next = 15;
            return (0, _utils2.edcrDetailsToBpaDetails)(state, dispatch);

          case 15:
            riskType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.riskType");
            bpaService = "BPA";

            if (riskType === "LOW") {
              bpaService = "BPA_LOW";
            }
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: bpaService }];

            (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);

            if (ownershipCategory) {
              dispatch((0, _actions.prepareFinalObject)("BPA.landInfo.ownerShipMajorType", ownershipCategory.split('.')[0]));
            }

            if (latitude && longitude) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.bpaDetailsConatiner.children.tradeLocGISCoord.children.gisTextField", "props.value", latitude + ", " + longitude));
              dispatch((0, _actions.prepareFinalObject)("BPA.landInfo.address.geoLocation.latitude", latitude));
              dispatch((0, _actions.prepareFinalObject)("BPA.landInfo.address.geoLocation.longitude", longitude));
            }
            dispatch((0, _actions.prepareFinalObject)("BPAs.appdate", appDate));
            _context3.next = 25;
            return (0, _commons2.prepareDocumentsUploadData)(state, dispatch);

          case 25:
            _context3.next = 27;
            return prepareDocumentDetailsUploadRedux(state, dispatch);

          case 27:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function setSearchResponse(_x7, _x8, _x9, _x10, _x11) {
    return _ref3.apply(this, arguments);
  };
}();

var prepareDocumentDetailsUploadRedux = exports.prepareDocumentDetailsUploadRedux = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(state, dispatch) {
    var docs, bpaDocs, bpaDetails, uploadedDocs, fileStoreIds, fileUrls, previewStoreIds, previewFileUrls;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            docs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "documentsContract");
            bpaDocs = [];

            if (docs && docs.length > 0) {
              docs.forEach(function (section) {
                section.cards.forEach(function (doc) {
                  var docObj = {};
                  docObj.documentType = section.code;
                  docObj.documentCode = doc.code;
                  if (uploadedDocs && uploadedDocs.length > 0) {
                    docObj.isDocumentRequired = false;
                  } else {
                    docObj.isDocumentRequired = doc.required;
                  }
                  docObj.isDocumentTypeRequired = doc.required;
                  bpaDocs.push(docObj);
                });
              });
            }

            bpaDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA");
            uploadedDocs = bpaDetails.documents;

            if (!(uploadedDocs && uploadedDocs.length > 0)) {
              _context4.next = 27;
              break;
            }

            fileStoreIds = _jsonpath2.default.query(uploadedDocs, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context4.next = 13;
              break;
            }

            _context4.next = 10;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 10:
            _context4.t0 = _context4.sent;
            _context4.next = 14;
            break;

          case 13:
            _context4.t0 = {};

          case 14:
            fileUrls = _context4.t0;

            uploadedDocs.forEach(function (upDoc) {
              bpaDocs.forEach(function (bpaDoc, index) {
                var bpaDetailsDoc = void 0;
                if (upDoc.documentType) bpaDetailsDoc = upDoc.documentType.split('.')[0] + "." + upDoc.documentType.split('.')[1];
                if (bpaDetailsDoc == bpaDoc.documentCode) {
                  var url = fileUrls && fileUrls[upDoc.fileStoreId] && fileUrls[upDoc.fileStoreId].split(",")[0] || "";
                  var name = fileUrls[upDoc.fileStoreId] && decodeURIComponent(fileUrls[upDoc.fileStoreId].split(",")[0].split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
                  bpaDoc.dropDownValues = {};
                  bpaDoc.dropDownValues.value = upDoc.documentType;
                  if (bpaDoc.documents) {
                    bpaDoc.documents.push({
                      title: (0, _commons.getTransformedLocale)(bpaDoc.dropDownValues.value),
                      dropDownValues: bpaDoc.dropDownValues.value,
                      name: name,
                      linkText: "View",
                      fileName: name,
                      fileStoreId: upDoc.fileStoreId,
                      fileUrl: url,
                      wfState: upDoc.wfState,
                      isClickable: false,
                      additionalDetails: upDoc.additionalDetails
                    });
                  } else {
                    bpaDoc.documents = [{
                      title: (0, _commons.getTransformedLocale)(bpaDoc.dropDownValues.value),
                      dropDownValues: bpaDoc.dropDownValues.value,
                      name: name,
                      linkText: "View",
                      fileName: name,
                      fileStoreId: upDoc.fileStoreId,
                      fileUrl: url,
                      wfState: upDoc.wfState,
                      isClickable: false,
                      additionalDetails: upDoc.additionalDetails
                    }];
                  }

                  // if(bpaDoc.documents ){
                  //   bpaDoc.documents.push(
                  //     {
                  //       title: getTransformedLocale(bpaDoc.dropDownValues.value),               
                  //       name: name,
                  //       linkText: "View",
                  //       fileName : name,
                  //       fileStoreId : upDoc.fileStoreId,
                  //       fileUrl : url,
                  //       wfState: upDoc.wfState                                
                  //     }
                  //   );
                  // }else{
                  //   bpaDoc.documents = [
                  //     {
                  //       title: getTransformedLocale(bpaDoc.dropDownValues.value),               
                  //       name: name,
                  //       linkText: "View",
                  //       fileName : name,
                  //       fileStoreId : upDoc.fileStoreId,
                  //       fileUrl : url,
                  //       wfState: upDoc.wfState                                
                  //     }
                  //   ];
                  // }
                }
              });
            });
            previewStoreIds = _jsonpath2.default.query(bpaDocs, "$..[*].*.fileStoreId");

            if (!(previewStoreIds.length > 0)) {
              _context4.next = 23;
              break;
            }

            _context4.next = 20;
            return (0, _commons.getFileUrlFromAPI)(previewStoreIds);

          case 20:
            _context4.t1 = _context4.sent;
            _context4.next = 24;
            break;

          case 23:
            _context4.t1 = {};

          case 24:
            previewFileUrls = _context4.t1;


            bpaDocs.forEach(function (doc) {

              if (doc.documents && doc.documents.length > 0) {
                doc.documents.forEach(function (docDetail) {
                  docDetail["link"] = fileUrls[docDetail.fileStoreId];
                  return docDetail;
                });
              }
            });
            // bpaDocs.forEach(doc => {

            //   if (doc.documents && doc.documents.length > 0) {
            //       doc.documents.forEach(docDetail =>{
            //         docDetail["link"] = fileUrls[docDetail.fileStoreId];
            //         return docDetail;
            //       });
            //   }
            // });
            dispatch((0, _actions.prepareFinalObject)("documentDetailsUploadRedux", bpaDocs));

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function prepareDocumentDetailsUploadRedux(_x12, _x13) {
    return _ref4.apply(this, arguments);
  };
}();
var selectLicenceType = function selectLicenceType(state, dispatch) {
  var value = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.tradeType", "");
  var plotArea = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "scrutinyDetails.planDetail.plot.area");
  var numOfFloors = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "scrutinyDetails.planDetail.blocks[0].building.totalFloors");
  var heighOfTheBuilding = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "scrutinyDetails.planDetail.blocks[0].building.buildingHeight");
  var tradeTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType", []);
  var isTrue = false;
  if (value === "ENGINEER" || value === "SUPERVISOR") {
    tradeTypes.forEach(function (type) {
      if (type.code.split('.')[0] === value) {
        if (type.restrictions) {
          if (plotArea <= type.restrictions.maxPlotArea && heighOfTheBuilding < type.restrictions.maxBulidingheight && numOfFloors <= type.restrictions.maxBulidingheight) {
            isTrue = true;
          } else {
            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Not able to create the application for this role",
              labelKey: "BPA_NOT_ABLE_TO_CREATE_LABEL"
            }, "error"));
          }
        }
      }
    });
  } else {
    if (value != "") {
      isTrue = true;
    } else {
      dispatch((0, _actions.toggleSnackbar)(true, {
        labelName: "Not able to create the application for this role",
        labelKey: "BPA_NOT_ABLE_TO_CREATE_LABEL"
      }, "error"));
    }
  }

  /*if(isTrue) {
    let toggle = get(
      state.screenConfiguration.screenConfig["apply"],
      "components.cityPickerDialog.props.open",
      false
    );
    dispatch(
      handleField("apply", "components.cityPickerDialog", "props.open", !toggle)
    );
    changeStep(state, dispatch, "", 1);
  }*/
};

var setTaskStatus = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(state, applicationNumber, tenantId, dispatch, componentJsonpath) {
    var queryObject, processInstances, payload, sendToArchitect;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            queryObject = [{ key: "businessIds", value: applicationNumber }, { key: "history", value: true }, { key: "tenantId", value: tenantId }];
            processInstances = [];
            _context5.next = 4;
            return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/process/_search", "", queryObject);

          case 4:
            payload = _context5.sent;

            if (payload && payload.ProcessInstances.length > 0) {
              processInstances = (0, _commons.orderWfProcessInstances)(payload.ProcessInstances);
              dispatch((0, _actions.prepareFinalObject)("BPAs.taskStatusProcessInstances", processInstances));

              sendToArchitect = processInstances && processInstances.length > 1 && processInstances[processInstances.length - 1].action || "";


              if (sendToArchitect == "SEND_TO_ARCHITECT") {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", 'components.div.children.taskStatus', "visible", true));
              }
            }

          case 6:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function setTaskStatus(_x14, _x15, _x16, _x17, _x18) {
    return _ref5.apply(this, arguments);
  };
}();

var getMohallaDetails = exports.getMohallaDetails = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch, tenantId) {
    var payload, mohallaData, mohallaLocalePrefix;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _api.httpRequest)("post", "/egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality", "_search", [{ key: "tenantId", value: tenantId }], {});

          case 3:
            payload = _context6.sent;
            mohallaData = payload && payload.TenantBoundary[0] && payload.TenantBoundary[0].boundary && payload.TenantBoundary[0].boundary.reduce(function (result, item) {
              result.push((0, _extends3.default)({}, item, {
                name: tenantId.toUpperCase().replace(/[.]/g, "_") + "_REVENUE_" + item.code.toUpperCase().replace(/[._:-\s\/]/g, "_")
              }));
              return result;
            }, []);

            dispatch((0, _actions.prepareFinalObject)("mohalla.tenant.localities", mohallaData));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.suggestions", mohallaData
            // payload.TenantBoundary && payload.TenantBoundary[0].boundary
            ));
            mohallaLocalePrefix = {
              moduleName: tenantId,
              masterName: "REVENUE"
            };

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.localePrefix", mohallaLocalePrefix));
            _context6.next = 13;
            break;

          case 11:
            _context6.prev = 11;
            _context6.t0 = _context6["catch"](0);

          case 13:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 11]]);
  }));

  return function getMohallaDetails(_x19, _x20, _x21) {
    return _ref6.apply(this, arguments);
  };
}();
var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch, componentJsonpath) {

    dispatch((0, _actions.prepareFinalObject)("BPA", {}));
    dispatch((0, _actions.prepareFinalObject)("documentsContract", []));
    dispatch((0, _actions.prepareFinalObject)("documentDetailsUploadRedux", {}));
    dispatch((0, _actions.prepareFinalObject)("BPA.OccupanciesList", []));
    var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var step = (0, _commons.getQueryArg)(window.location.href, "step");

    //Set Module Name
    (0, _set2.default)(state, "screenConfiguration.moduleName", "BPA");
    (0, _utils2.getTenantMdmsData)(action, state, dispatch).then(function (response) {
      dispatch((0, _actions.prepareFinalObject)("BPA.landInfo.address.city", tenantId));
    });

    var isEdit = true;
    if (step || step == 0) {
      isEdit = false;
    }
    if (applicationNumber && isEdit) {
      setSearchResponse(state, dispatch, applicationNumber, tenantId, action);
    } else {
      var edcrNumber = (0, _commons.getQueryArg)(window.location.href, "edcrNumber");
      if (edcrNumber) {
        dispatch((0, _actions.prepareFinalObject)("BPA.edcrNumber", edcrNumber));
        (0, _utils2.getScrutinyDetails)(state, dispatch);
        getMohallaDetails(state, dispatch, tenantId);
      }
      (0, _utils2.setProposedBuildingData)(state, dispatch);
      getTodaysDate(action, state, dispatch);
      var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: "BPA" }];
      (0, _commons.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);
    }

    // Set MDMS Data
    getMdmsData(action, state, dispatch).then(function (response) {
      // Set Dropdowns Data
      var ownershipCategory = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.OwnerShipCategory", []);
      ownershipCategory = getFirstListFromDotSeparated(ownershipCategory);
      dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.DropdownsData.OwnershipCategory", ownershipCategory));
    });
    dispatch((0, _actions2.fetchLocalizationLabel)((0, _localStorageUtils.getLocale)(), tenantId, tenantId));
    setTaskStatus(state, applicationNumber, tenantId, dispatch, componentJsonpath);
    // Code to goto a specific step through URL
    if (step && step.match(/^\d+$/)) {
      var intStep = parseInt(step);
      (0, _set2.default)(action.screenConfig, "components.div.children.stepper.props.activeStep", intStep);
      var formWizardNames = ["formwizardFirstStep", "formwizardSecondStep", "formwizardThirdStep", "formwizardFourthStep", "formwizardFifthStep"];
      for (var i = 0; i < 5; i++) {
        (0, _set2.default)(action.screenConfig, "components.div.children." + formWizardNames[i] + ".visible", i == step);
        (0, _set2.default)(action.screenConfig, "components.div.children.footer.children.previousButton.visible", step != 0);
      }
    }
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 10
              }
            }, header)
          }
        },
        stepper: stepper,
        taskStatus: {
          moduleName: "egov-workflow",
          uiFramework: "custom-containers-local",
          componentPath: "WorkFlowContainer",
          visible: false,
          componentJsonpath: 'components.div.children.taskStatus',
          props: {
            dataPath: "BPA",
            moduleName: "BPA",
            updateUrl: "/bpa-services/v1/bpa/_update"
          }
        },
        formwizardFirstStep: formwizardFirstStep,
        formwizardSecondStep: formwizardSecondStep,
        formwizardThirdStep: formwizardThirdStep,
        formwizardFourthStep: formwizardFourthStep,
        formwizardFifthStep: formwizardFifthStep,
        footer: _footer.footer
      }
    }
    /*cityPickerDialog :{
      componentPath: "Dialog",
      props: {
        open: false,
        maxWidth: "md"
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          props: {
            classes: {
              root: "city-picker-dialog-style"
            }
          },
          children: {
            popup: getCommonContainer({
              header: getCommonHeader({
                labelName: "Select Licensee Type",
                labelKey: "BPA_SELECT_LICENSE_TYPE_LABEL"
              }),
              cityPicker: getCommonContainer({
                licenceDropdown: getSelectField({
                  label: {
                    labelName: "Licensee Type",
                    labelKey: "BPA_LICENSE_TYPE_LABEL"
                  },
                  placeholder: {
                    labelName: "Select Licensee Type",
                    labelKey: "BPA_SELECT_LICENSE_TYPE_LABEL"
                  },
                  jsonPath: "BPA.tradeType",
                  sourceJsonPath: "applyScreenMdmsData.licenceTypes",
                  required: true,
                  gridDefination: {
                    xs: 12,
                    sm: 12
                  }
                }),
                div: {
                  uiFramework: "custom-atoms",
                  componentPath: "Div",
                  children: {
                    selectButton: {
                      componentPath: "Button",
                      props: {
                        variant: "contained",
                        color: "primary",
                        style: {
                          width: "40px",
                          height: "20px",
                          marginRight: "4px",
                          marginTop: "16px"
                        }
                      },
                      children: {
                        previousButtonLabel: getLabel({
                          labelName: "SELECT",
                          labelKey: "BPA_CITIZEN_SELECT_BUTTON"
                        })
                      },
                      onClickDefination: {
                        action: "condition",
                        callBack: selectLicenceType
                      }
                    },
                    cancelButton: {
                      componentPath: "Button",
                      props: {
                        variant: "outlined",
                        color: "primary",
                        style: {
                          width: "40px",
                          height: "20px",
                          marginRight: "4px",
                          marginTop: "16px"
                        }
                      },
                      children: {
                        previousButtonLabel: getLabel({
                          labelName: "CANCEL",
                          labelKey: "BPA_CITIZEN_CANCEL_BUTTON"
                        })
                      },
                      onClickDefination: {
                        action: "condition",
                        callBack: showApplyLicencePicker
                      }
                    }
                  }
                }
              })
            })
          }
        }
      }
    },*/
  }
};

exports.default = screenConfig;