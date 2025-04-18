"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prepareDocumentDetailsUploadRedux = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.header = exports.stepper = exports.stepsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("../../../../ui-utils/commons");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _scrutinyDetails = require("./applyResource/scrutinyDetails");

var _documentAndNocDetails = require("./applyResource/documentAndNocDetails");

var _summary = require("./summary");

var _footer = require("./applyResource/footer");

var _utils2 = require("../utils");

var _api = require("../../../../ui-utils/api");

var _comparisondialog = require("./comparisondialog");

var _noc = require("../egov-bpa/noc");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "Scrutiny Details", labelKey: "BPA_STEPPER_SCRUTINY_DETAILS_HEADER" }, { labelName: "Document and NOC details", labelKey: "BPA_STEPPER_DOCUMENT_NOC_DETAILS_HEADER" }, { labelName: "Application Summary", labelKey: "BPA_STEPPER_SUMMARY_HEADER" }];

var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Occupancy Certificate New Building Construction",
    labelKey: "BPA_APPLY_FOR_BUILDING_PERMIT_OC_HEADER"
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
    basicDetails: _scrutinyDetails.basicDetails,
    buildingPlanScrutinyDetails: _scrutinyDetails.buildingPlanScrutinyDetails,
    proposedBuildingDetails: _scrutinyDetails.proposedBuildingDetails,
    abstractProposedBuildingDetails: _scrutinyDetails.abstractProposedBuildingDetails
  }
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    documentAndNocDetails: _documentAndNocDetails.documentAndNocDetails,
    nocDetailsApply: _noc.nocDetailsApply
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
    summaryDetails: _summary.summaryDetails,
    nocDetailsApply: _noc.nocDetailsApply
  },
  visible: false
};

var getMdmsData = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var mdmsBody, payload, applicationType;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: (0, _localStorageUtils.getTenantId)(),
                moduleDetails: [{
                  moduleName: "common-masters",
                  masterDetails: [{
                    name: "DocumentType"
                  }, {
                    name: "OwnerType"
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
                    name: "DeviationParams"
                  }]
                }, {
                  moduleName: "NOC",
                  masterDetails: [{
                    name: "DocumentTypeMapping"
                  }]
                }]
              }
            };
            _context.next = 3;
            return (0, _utils2.getBpaMdmsData)(action, state, dispatch, mdmsBody);

          case 3:
            payload = _context.sent;

            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            applicationType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.BPA.ApplicationType[1].code");

            dispatch((0, _actions.prepareFinalObject)("BPA.applicationType", applicationType));
            _context.next = 9;
            return (0, _commons.prepareDocumentsUploadData)(state, dispatch);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function getMdmsData(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var procedToNextStep = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    var toggle, isFormValid, applicationNumber, tenantId, payload;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.cityPickerDialog.props.open", false);

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.cityPickerDialog", "props.open", !toggle));
            _context2.next = 4;
            return (0, _commons.createUpdateOCBpaApplication)(state, dispatch, "INITIATE");

          case 4:
            isFormValid = _context2.sent;

            if (isFormValid) {
              (0, _commons.prepareDocumentsUploadData)(state, dispatch);
              (0, _footer.changeStep)(state, dispatch, "", 1);
            }
            applicationNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.applicationNo");
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.tenantId");
            _context2.next = 10;
            return (0, _commons.getNocSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "sourceRefId", value: applicationNumber }], state);

          case 10:
            payload = _context2.sent;

            dispatch((0, _actions.prepareFinalObject)("Noc", payload.Noc));
            _context2.next = 14;
            return (0, _commons.prepareNOCUploadData)(state, dispatch);

          case 14:
            (0, _utils2.prepareNocFinalCards)(state, dispatch);

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function procedToNextStep(_x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var setSearchResponse = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch, applicationNumber, tenantId, action) {
    var response, edcrRes;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _commons.getAppSearchResults)([{
              key: "tenantId",
              value: tenantId
            }, { key: "applicationNo", value: applicationNumber }]);

          case 2:
            response = _context3.sent;


            dispatch((0, _actions.prepareFinalObject)("BPA", response.BPA[0]));
            _context3.next = 6;
            return (0, _api.edcrHttpRequest)("post", "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + (0, _get2.default)(response, "BPA[0].edcrNumber") + "&tenantId=" + tenantId, "search", []);

          case 6:
            edcrRes = _context3.sent;


            dispatch((0, _actions.prepareFinalObject)("ocScrutinyDetails", edcrRes.edcrDetail[0]));
            dispatch((0, _actions.prepareFinalObject)("BPAs.appdate", (0, _get2.default)(response, "BPA[0].auditDetails.createdTime")));
            _context3.next = 11;
            return (0, _utils2.setProposedBuildingData)(state, dispatch, "ocApply", "ocApply");

          case 11:
            _context3.next = 13;
            return (0, _utils2.edcrDetailsToBpaDetails)(state, dispatch);

          case 13:
            _context3.next = 15;
            return (0, _utils2.applicantNameAppliedByMaping)(state, dispatch, (0, _get2.default)(response, "BPA[0]"), (0, _get2.default)(edcrRes, "edcrDetail[0]"));

          case 15:
            _context3.next = 17;
            return (0, _commons.prepareDocumentsUploadData)(state, dispatch);

          case 17:
            _context3.next = 19;
            return prepareDocumentDetailsUploadRedux(state, dispatch);

          case 19:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function setSearchResponse(_x6, _x7, _x8, _x9, _x10) {
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
            return (0, _commons2.getFileUrlFromAPI)(fileStoreIds);

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
                      title: (0, _commons2.getTransformedLocale)(bpaDoc.dropDownValues.value),
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
                      title: (0, _commons2.getTransformedLocale)(bpaDoc.dropDownValues.value),
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
                }
              });
            });
            previewStoreIds = _jsonpath2.default.query(bpaDocs, "$..[*].*.fileStoreId");

            if (!(previewStoreIds.length > 0)) {
              _context4.next = 23;
              break;
            }

            _context4.next = 20;
            return (0, _commons2.getFileUrlFromAPI)(previewStoreIds);

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
            dispatch((0, _actions.prepareFinalObject)("documentDetailsUploadRedux", bpaDocs));

          case 27:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined);
  }));

  return function prepareDocumentDetailsUploadRedux(_x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

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
              processInstances = (0, _commons2.orderWfProcessInstances)(payload.ProcessInstances);
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

  return function setTaskStatus(_x13, _x14, _x15, _x16, _x17) {
    return _ref5.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch, componentJsonpath) {
    dispatch((0, _actions.prepareFinalObject)("BPA", {}));
    dispatch((0, _actions.prepareFinalObject)("documentsContract", []));
    dispatch((0, _actions.prepareFinalObject)("documentDetailsUploadRedux", {}));
    var tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
    var step = (0, _commons2.getQueryArg)(window.location.href, "step");
    (0, _set2.default)(state, "screenConfiguration.moduleName", "BPA");
    var applicationNumber = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
    getMdmsData(action, state, dispatch);

    if (applicationNumber) {
      setSearchResponse(state, dispatch, applicationNumber, tenantId, action);
    } else {
      var edcrNumber = (0, _commons2.getQueryArg)(window.location.href, "edcrNumber");
      if (edcrNumber) {
        dispatch((0, _actions.prepareFinalObject)("BPA.edcrNumber", edcrNumber));
        (0, _utils2.getOcEdcrDetails)(state, dispatch);
      }
      var today = (0, _utils2.getTodaysDateInYYYMMDD)();
      dispatch((0, _actions.prepareFinalObject)("BPAs.appdate", today));
    }

    var queryObject = [{ key: "tenantId", value: tenantId }, { key: "businessServices", value: "BPA_OC" }];
    (0, _commons2.setBusinessServiceDataToLocalStorage)(queryObject, dispatch);
    setTaskStatus(state, applicationNumber, tenantId, dispatch, componentJsonpath);

    // Code to goto a specific step through URL
    if (step && step.match(/^\d+$/)) {
      var intStep = parseInt(step);
      (0, _set2.default)(action.screenConfig, "components.div.children.stepper.props.activeStep", intStep);
      var formWizardNames = ["formwizardFirstStep", "formwizardSecondStep", "formwizardThirdStep"];
      for (var i = 0; i < 3; i++) {
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
        footer: _footer.footer
      }
    },
    cityPickerDialog: {
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
            popup: (0, _utils.getCommonContainer)({
              header: (0, _utils.getCommonHeader)({
                labelName: "The Risk type in permit order XXXX is high where as the risk type in occupancy is Low , do you want to continue",
                labelKey: "BPA_RISK_TYPE_VALIDATION_WARNING"
              }),
              riskTypeWarning: (0, _utils.getCommonContainer)({
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
                        previousButtonLabel: (0, _utils.getLabel)({
                          labelName: "YES",
                          labelKey: "BPA_ADD_HOC_CHARGES_POPUP_BUTTON_YES"
                        })
                      },
                      onClickDefination: {
                        action: "condition",
                        callBack: procedToNextStep
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
                        previousButtonLabel: (0, _utils.getLabel)({
                          labelName: "NO",
                          labelKey: "BPA_ADD_HOC_CHARGES_POPUP_BUTTON_NO"
                        })
                      },
                      onClickDefination: {
                        action: "condition",
                        callBack: _footer.showRisktypeWarning
                      }
                    }
                  }
                }
              })
            })
          }
        }
      }
    },
    cityPickerDialogofComparison: {
      componentPath: "Dialog",
      props: {
        open: false
        // maxWidth: "md"
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          // props: {
          //   classes: {
          //     root: "city-picker-dialog-style"
          //   }
          // },
          children: {
            popup: _comparisondialog.comparisondialog
          }
        }
      }
    }
  }
};

exports.default = screenConfig;