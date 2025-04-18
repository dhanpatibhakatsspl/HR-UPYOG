"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMdmsData = exports.getData = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.header = exports.stepper = exports.stepsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _api = require("../../../../ui-utils/api");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _actions2 = require("egov-ui-kit/redux/app/actions");

var _documentDetails = require("./applyResource/documentDetails");

var _footer = require("./applyResource/footer");

var _summary = require("./applyResource/summary");

var _summary2 = _interopRequireDefault(_summary);

var _amountDetails = require("./applyResource/amountDetails");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _docData = require("./applyResource/docData");

var _utils2 = require("../utils");

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "Amount Details", labelKey: "BILL_STEPPER_AMOUNT_DETAILS_HEADER" }, { labelName: "Documents", labelKey: "BILL_STEPPER_DOCUMENTS_HEADER" }, { labelName: "Summary", labelKey: "BILL_STEPPER_SUMMARY_HEADER" }];

var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Generate Note",
    labelKey: "BILL_APPLY_FOR_BILL"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-billamend",
    componentPath: "ConsumerNo",
    props: {
      number: "NA",
      label: { labelValue: "Consumer No.", labelKey: "BILL_CONSUMER_NO" }
    }
    // visible: false
  }
});

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {
    AddAdjustmentAmount: _amountDetails.AddAdjustmentAmount,
    AddDemandRevisionBasis: _amountDetails.AddDemandRevisionBasis
  }
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {
    documentDetails: _documentDetails.documentDetails
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
    summary: _summary2.default
  },
  visible: false
};

var setSearchResponse = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch, action) {
    var connectionNumber, businessService, tenantId, fetBill, billDetails, totalAmount, searchedBill;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            connectionNumber = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
            businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
            tenantId = (0, _localStorageUtils.getTenantId)() || (0, _commons.getQueryArg)(window.location.href, "businessService");
            _context.next = 5;
            return (0, _utils2.searchBill)(state, dispatch, action, [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCode",
              value: connectionNumber
            }, {
              key: "service",
              value: businessService
            }]);

          case 5:
            fetBill = _context.sent;


            if (fetBill && fetBill.Bill && fetBill && fetBill.Bill.length > 0) {
              billDetails = (0, _get2.default)(fetBill, "Bill[0].billDetails[0].billAccountDetails", []);
              totalAmount = (0, _get2.default)(fetBill, "Bill[0].billDetails[0].amount", 0);
              searchedBill = { "TOTAL": totalAmount };

              billDetails && billDetails.map && billDetails.map(function (item) {
                searchedBill[item.taxHeadCode] = item.amount;
              });
              dispatch((0, _actions.prepareFinalObject)("searchBillDetails-bill", searchedBill));
            } else {
              dispatch((0, _actions.prepareFinalObject)("searchBillDetails-bill", {}));
            }

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function setSearchResponse(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var getData = exports.getData = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return getMdmsData(action, state, dispatch);

          case 2:
            _context2.next = 4;
            return setSearchResponse(state, dispatch, action);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function getData(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getMdmsData = exports.getMdmsData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
    var connectionNumber, businessService, tenantId, mdmsBody, payload, taxHeadMasterMdmsDetails, taxHeadMasterDetails, billTaxHeadMasterDetails;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            connectionNumber = (0, _commons.getQueryArg)(window.location.href, "connectionNumber");
            businessService = (0, _commons.getQueryArg)(window.location.href, "businessService");
            tenantId = (0, _localStorageUtils.getTenantId)() || (0, _commons.getQueryArg)(window.location.href, "tenantId");
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "BillAmendment",
                  masterDetails: [{ name: "documentObj" }, { name: "DemandRevisionBasis" }]
                }, {
                  moduleName: "common-masters",
                  masterDetails: [{ name: "DocumentType" }]
                }, {
                  moduleName: "BillingService",
                  masterDetails: [{ name: "TaxHeadMaster" }]
                }]
              }
            };
            _context3.prev = 4;
            payload = null;
            _context3.next = 8;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 8:
            payload = _context3.sent;
            taxHeadMasterMdmsDetails = (0, _get2.default)(payload, "MdmsRes.BillingService.TaxHeadMaster", []), taxHeadMasterDetails = void 0;

            if (taxHeadMasterMdmsDetails && taxHeadMasterMdmsDetails.length > 0) {
              taxHeadMasterDetails = taxHeadMasterMdmsDetails.filter(function (service) {
                return service.service == businessService;
              });
              billTaxHeadMasterDetails = taxHeadMasterDetails.filter(function (data) {
                return data.IsBillamend == true;
              });

              if (billTaxHeadMasterDetails && billTaxHeadMasterDetails.length > 0) {
                billTaxHeadMasterDetails.map(function (bill) {
                  bill.reducedAmountValue = 0;
                  bill.additionalAmountValue = 0;
                  bill.taxHeadCode = bill.code;
                });
              }
              dispatch((0, _actions.prepareFinalObject)("fetchBillDetails", billTaxHeadMasterDetails, []));
            } else {
              dispatch((0, _actions.prepareFinalObject)("fetchBillDetails", []));
            }
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData", payload.MdmsRes));
            dispatch((0, _actions.prepareFinalObject)("Amendment.consumerCode", connectionNumber));
            dispatch((0, _actions.prepareFinalObject)("Amendment.tenantId", tenantId));
            dispatch((0, _actions.prepareFinalObject)("Amendment.businessService", businessService));
            dispatch((0, _actions.prepareFinalObject)("BILL.AMOUNTTYPE", "reducedAmount"));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.headerDiv.children.header.children.applicationNumber", "props.number", connectionNumber));
            _context3.next = 21;
            break;

          case 19:
            _context3.prev = 19;
            _context3.t0 = _context3["catch"](4);

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[4, 19]]);
  }));

  return function getMdmsData(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

var screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch, componentJsonpath) {
    dispatch((0, _actions.prepareFinalObject)("BILL", {}));
    dispatch((0, _actions.prepareFinalObject)("Amendment", {}));
    dispatch((0, _actions.prepareFinalObject)("AmendmentTemp", {}));
    dispatch((0, _actions.prepareFinalObject)("documentsUploadRedux", {}));
    dispatch((0, _actions.prepareFinalObject)("documentsContract", []));
    dispatch((0, _actions.prepareFinalObject)("AmendmentTemp.isPreviousDemandRevBasisValue", true));
    getData(action, state, dispatch).then(function (responseAction) {});

    var step = (0, _commons.getQueryArg)(window.location.href, "step");
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
            dataPath: "",
            moduleName: "",
            updateUrl: ""
          }
        },
        formwizardFirstStep: formwizardFirstStep,
        formwizardSecondStep: formwizardSecondStep,
        formwizardThirdStep: formwizardThirdStep,
        footer: _footer.footer
      }
    },
    billAmdAlertDialog: {
      componentPath: "Dialog",
      props: {
        open: false,
        maxWidth: "sm"
      },
      children: {
        dialogTitle: {
          componentPath: "DialogTitle",
          children: {
            popup: (0, _utils.getCommonContainer)({
              billamdHeader: (0, _utils.getCommonHeader)({
                labelName: "Confirm change",
                labelKey: "BILL_CONFIRM_CHANGE_HEADER"
              })
            })
          }
        },
        dialogContent: {
          componentPath: "DialogContent",
          props: {
            classes: {
              root: "city-picker-dialog-style"
            }
          },
          children: {
            popup: (0, _utils.getCommonContainer)({
              billamdSubheader: (0, _utils.getCommonSubHeader)({
                labelName: "Changing the Demand Revision basis will erase the previosly selected values.",
                labelKey: "BILL_CONFIRM_CHANGE_SUB_HEADER"
              }),
              billamdSubheader1: (0, _utils.getCommonSubHeader)({
                labelName: "Are you sure want to proceed?",
                labelKey: "BILL_CONFIRM_CHANGE_SUB_HEADER_1"
              }),
              billAmdDialogPicker: (0, _utils.getCommonContainer)({
                div: {
                  uiFramework: "custom-atoms",
                  componentPath: "Div",
                  children: {
                    selectButton: {
                      componentPath: "Button",
                      props: {
                        variant: "outlined",
                        color: "primary",
                        style: {
                          width: "110px",
                          height: "30px",
                          marginRight: "4px",
                          marginTop: "16px"
                        }
                      },
                      children: {
                        previousButtonLabel: (0, _utils.getLabel)({
                          labelName: "CANCEL",
                          labelKey: "BILL_CANCEL_BUTTON"
                        })
                      },
                      onClickDefination: {
                        action: "condition",
                        callBack: _utils2.cancelPopUp
                      }
                    },
                    cancelButton: {
                      componentPath: "Button",
                      props: {
                        variant: "contained",
                        color: "primary",
                        style: {
                          width: "100px",
                          height: "30px",
                          marginRight: "4px",
                          marginTop: "16px"
                        }
                      },
                      children: {
                        previousButtonLabel: (0, _utils.getLabel)({
                          labelName: "OK",
                          labelKey: "BILL_OK_BUTTON"
                        })
                      },
                      onClickDefination: {
                        action: "condition",
                        callBack: _utils2.procedToNextStep
                      }
                    }
                  }
                }
              })
            })
          }
        }
      }
    }
  }
};

exports.default = screenConfig;