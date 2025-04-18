"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReceipt = exports.getBill = exports.cancelChallan = exports.showHideConfirmationPopup = exports.callBackForPay = exports.checkChallanStatus = exports.getCommonApplyFooter = exports.checkValueForNA = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _commons = require("egov-common/ui-utils/commons");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _actions3 = require("egov-ui-kit/redux/app/actions");

var _commons3 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _orderBy = require("lodash/orderBy");

var _orderBy2 = _interopRequireDefault(_orderBy);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

require("../../../../index.css");

var _uiUtils = require("../../../../ui-utils");

var _commons4 = require("../../../../ui-utils/commons");

var _utils2 = require("../utils");

var _confirmationDialog = require("./confirmationDialog");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var applicationNumber = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
var tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
var businessService = (0, _commons2.getQueryArg)(window.location.href, "businessService");
var checkValueForNA = exports.checkValueForNA = function checkValueForNA(value) {
  return value == null || value == undefined || value == '' ? "NA" : value;
};

var searchResults = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
    var tenantId, businessService, challanNo, queryObject, challanresponse;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
            businessService = (0, _commons2.getQueryArg)(window.location.href, "businessService");
            challanNo = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
            queryObject = [];

            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "challanNo",
              value: challanNo
            }, {
              key: "businessService",
              value: businessService
            }];

            _context.next = 7;
            return (0, _commons4.getChallanSearchResult)(queryObject);

          case 7:
            challanresponse = _context.sent;

            dispatch((0, _actions2.prepareFinalObject)("Challan", challanresponse.challans[0]));
            dispatch((0, _actions2.prepareFinalObject)("challanStatus", challanresponse.challans[0].applicationStatus));
            if (challanresponse.challans[0].applicationStatus === "ACTIVE") {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.preview.children.cardContent.children.footer.children.cancelButton", "visible", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.preview.children.cardContent.children.footer.children.editButton", "visible", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.preview.children.cardContent.children.serviceDetails.children.cardContent.children.viewOne.children.cancellComment", "visible", false));
            } else if (challanresponse.challans[0].applicationStatus === "CANCELLED") {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.preview.children.cardContent.children.serviceDetails.children.cardContent.children.viewOne.children.cancellComment", "visible", true));
            } else {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.preview.children.cardContent.children.serviceDetails.children.cardContent.children.viewOne.children.cancellComment", "visible", false));
            }

            fetchBill(action, state, dispatch, challanNo, tenantId, businessService);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function searchResults(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
var beforeInitFn = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch, applicationNumber) {
    var tenantId, businessService, challanNo, status, headerrow;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
            businessService = (0, _commons2.getQueryArg)(window.location.href, "businessService");
            challanNo = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
            status = (0, _commons2.getQueryArg)(window.location.href, "status");

            searchResults(action, state, dispatch, applicationNumber);
            headerrow = (0, _utils.getCommonContainer)({
              header: (0, _utils.getCommonHeader)({
                labelName: "Challan Details:",
                labelKey: "CHALLAN_DETAILS"
              }),
              //challanNumberContainer: getCommonContainer({
              challanNumber: {
                uiFramework: "custom-atoms-local",
                moduleName: "egov-uc",
                componentPath: "ApplicationNoContainer",
                props: {
                  number: applicationNumber,
                  label: {
                    labelKey: "PAYMENT_UC_CONSUMER_CODE"
                  }
                }
              },

              helpSection: {
                uiFramework: "custom-atoms",
                componentPath: "Div",

                props: {
                  color: "primary",
                  style: { justifyContent: "flex-end" }
                },
                gridDefination: {
                  xs: 12,
                  sm: 12,
                  align: "right"
                },
                children: downloadprintMenu(state, dispatch, challanNo, tenantId, status)

              }

            });

            (0, _set2.default)(action.screenConfig, "components.div.children.headerDiv.children.header1.children.headertop", headerrow);

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function beforeInitFn(_x4, _x5, _x6, _x7) {
    return _ref2.apply(this, arguments);
  };
}();

var downloadReceipt = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
    var mode = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'download';
    var state = arguments[1];
    var receiptNumber, businessService, receiptQueryString;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            receiptNumber = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Payments[0].paymentDetails[0].receiptNumber", null);
            businessService = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Payments[0].paymentDetails[0].businessService", null);


            if (receiptNumber) {
              receiptQueryString = [{ key: "receiptNumbers", value: receiptNumber }, { key: "tenantId", value: tenantId }, { key: "businessService", value: businessService }];

              (0, _commons.download)(receiptQueryString, mode, "consolidatedreceipt", 'PAYMENT', state);
            }

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined);
  }));

  return function downloadReceipt() {
    return _ref3.apply(this, arguments);
  };
}();

var downloadprintMenu = function downloadprintMenu(state, dispatch, applicationNumber, tenantId, status) {
  var applicationDownloadObject = {
    label: { labelName: "Challan", labelKey: "UC_CHALLAN" },
    link: function link() {
      var Challan = [{ key: "challanNo", value: applicationNumber }, { key: "tenantId", value: tenantId }];
      (0, _utils2.downloadEchallan)(Challan, "CHALLAN-" + applicationNumber + ".pdf");
    },
    leftIcon: "assignment"
  };
  var applicationPrintObject = {
    label: { labelName: "Challan", labelKey: "UC_CHALLAN" },
    link: function link() {
      var Challan = [{ key: "challanNo", value: applicationNumber }, { key: "tenantId", value: tenantId }];
      (0, _utils2.printEchallan)(Challan);
    },
    leftIcon: "assignment"
  };
  var uiCommonPayConfig = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "commonPayInfo");
  var receiptKey = (0, _get2.default)(uiCommonPayConfig, "receiptKey");
  var receiptDownloadObject = {
    label: { labelName: "Receipt", labelKey: "UC_RECEIPT" },
    link: function link() {
      downloadReceipt("download", state);
    },
    leftIcon: "receipt"
  };

  var receiptPrintObject = {
    label: { labelName: "PRINT RECEIPT", labelKey: "UC_RECEIPT" },
    link: function link() {
      downloadReceipt("print", state);
    },
    leftIcon: "receipt"
  };

  var downloadMenu = [];
  var printMenu = [];

  if (status === "PAID") {
    console.info("download challan, for PAID case");
    downloadMenu = [applicationDownloadObject, receiptDownloadObject];
    printMenu = [applicationPrintObject, receiptPrintObject];
  } else {
    //Download challan option
    console.info("download challan, for cancel and active case");
    downloadMenu = [applicationDownloadObject];
    printMenu = [applicationPrintObject];
  }

  return {
    test1: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      visible: !JSON.parse(window.localStorage.getItem('isPOSmachine')),
      props: {
        className: "downloadprint-commonmenu",
        style: { textAlign: "right", display: "flex", paddingTop: "10px" }
      },
      children: {
        downloadMenu: {
          uiFramework: "custom-molecules",
          componentPath: "DownloadPrintButton",
          props: {
            data: {
              label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
              leftIcon: "cloud_download",
              rightIcon: "arrow_drop_down",
              props: {
                variant: "outlined",
                style: {
                  height: "60px", color: "#FE7A51",
                  marginRight: "5px"
                },
                className: "uc-download-button"
              },
              menu: downloadMenu
            }
          }
        },
        printMenu: {
          uiFramework: "custom-molecules",
          componentPath: "DownloadPrintButton",
          props: {
            data: {
              label: { labelName: "PRINT", labelKey: "TL_PRINT" },
              leftIcon: "print",
              rightIcon: "arrow_drop_down",
              props: {
                variant: "outlined",
                style: { height: "60px", color: "#FE7A51" },
                className: "uc-print-button"
              },
              menu: printMenu
            }
          }
        }
      }

    },
    posbuttons: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      visible: JSON.parse(window.localStorage.getItem('isPOSmachine')),

      children: {
        printMiniReceiptButton: {
          componentPath: "Button",
          props: {
            variant: "outlined",
            color: "primary",
            className: "preview-challan-btn"
            //className:"gen-challan-btn"

            // disabled: true
          },
          children: {
            printFormButtonLabel: (0, _utils.getLabel)({
              labelName: "PRINT MINI RECEIPT",
              labelKey: "COMMON_PRINT_MINI_RECEIPT"
            })
          },
          visible: status === "PAID" ? true : false,
          onClickDefination: {
            action: "condition",
            callBack: function callBack() {

              var receiptData = generateMiniReceipt(state);
              try {
                window.Android && window.Android.sendPrintData("printData", JSON.stringify(receiptData));
              } catch (e) {}
            }
          }

        },
        printMiniChallanButton: {
          componentPath: "Button",
          props: {
            variant: "outlined",
            color: "primary",
            className: "preview-challan-btn"

            // disabled: true
          },
          children: {
            printFormButtonLabel: (0, _utils.getLabel)({
              labelName: "PRINT MINI CHALLAN",
              labelKey: "COMMON_PRINT_MINI_CHALLAN"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack() {
              var challanData = generateMiniChallan(state);
              try {
                window.Android && window.Android.sendPrintData("printData", JSON.stringify(challanData));
              } catch (e) {}
            }
          }
        }

      }

    }

  };
};
var estimate = (0, _utils.getCommonGrayCard)({
  estimateSection: (0, _utils2.getFeesEstimateCard)({
    sourceJsonPath: "Demands[0].estimateCardData"
  })
});
var getCommonApplyFooter = exports.getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var userDetails = (0, _utils.getCommonGrayCard)({
  headerDiv: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 12,
          sm: 10
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Consumer Details",
        labelKey: "CONSUMERDETAILS"
      }))
    }
  },
  viewTwo: (0, _utils.getCommonContainer)({
    consumerName: (0, _utils.getLabelWithValue)({
      labelName: "Consumer Name",
      labelKey: "UC_CONS_NAME_LABEL"
    }, {
      jsonPath: "Challan.citizen.name",
      callBack: checkValueForNA
    }),
    consumerMobileNo: (0, _utils.getLabelWithValue)({
      labelName: "Mobile No",
      labelKey: "UC_MOBILE_NO_LABEL"
    }, {
      jsonPath: "Challan.citizen.mobileNumber",
      callBack: checkValueForNA
    }),
    ConsumerHouseNo: (0, _utils.getLabelWithValue)({
      labelName: "Door/House No.",
      labelKey: "UC_DOOR_NO_LABEL"
    }, {
      jsonPath: "Challan.address.doorNo",
      callBack: checkValueForNA
    }),
    ConsumerBuilidingName: (0, _utils.getLabelWithValue)({
      labelName: "Building/Colony Name",
      labelKey: "UC_BLDG_NAME_LABEL"
    }, {
      jsonPath: "Challan.address.buildingName",
      callBack: checkValueForNA
    }),
    ConsumerStreetName: (0, _utils.getLabelWithValue)({
      labelName: "Street Name",
      labelKey: "UC_SRT_NAME_LABEL"
    }, {
      jsonPath: "Challan.address.street",
      callBack: checkValueForNA
    }),
    ConsumerLocMohalla: (0, _utils.getLabelWithValue)({

      labelName: "Mohalla",
      labelKey: "UC_MOHALLA_LABEL"
    }, {
      jsonPath: "Challan.address.locality.code",
      localePrefix: {
        moduleName: (0, _commons2.getQueryArg)(window.location.href, "tenantId") ? (0, _commons2.getQueryArg)(window.location.href, "tenantId").replace('.', '_').toUpperCase() : (0, _localStorageUtils.getTenantId)().replace('.', '_').toUpperCase(),
        masterName: "REVENUE"
      }, callBack: checkValueForNA
    })

  })
});

var checkChallanStatus = exports.checkChallanStatus = function checkChallanStatus(value) {
  return value === "CANCELLED" ? value : "NA";
};

var headerrow = (0, _utils.getCommonContainer)({});

var serviceDetails = (0, _utils.getCommonGrayCard)({

  headerDiv1: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 12,
          sm: 10
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Service Details",
        labelKey: "SERVICEDETAILS"
      }))
    }
  },
  viewOne: (0, _utils.getCommonContainer)({
    serviceName: (0, _utils.getLabelWithValue)({
      labelName: "Service Name",
      labelKey: "UC_SERVICE_CATEGORY_LABEL"
    }, {
      jsonPath: "Challan.businessService",
      localePrefix: {
        moduleName: "BillingService",
        masterName: "BusinessService"
      },
      callBack: checkValueForNA
    }),

    fromDate: (0, _utils.getLabelWithValue)({
      labelName: "From Date",
      labelKey: "UC_FROM_DATE_LABEL"
    }, { jsonPath: "Challan.taxPeriodFrom", callBack: _utils2.convertEpochToDate }),
    toDate: (0, _utils.getLabelWithValue)({
      labelName: "Tp Date",
      labelKey: "UC_TO_DATE_LABEL"
    }, { jsonPath: "Challan.taxPeriodTo", callBack: _utils2.convertEpochToDate }),

    description: (0, _utils.getLabelWithValue)({
      labelName: "Description",
      labelKey: "UC_COMMENT_LABEL"
    }, {
      jsonPath: "Challan.description",
      callBack: checkValueForNA
    }),

    applicationStatus: (0, _utils.getLabelWithValue)({
      labelName: "Application Status",
      labelKey: "CS_INBOX_STATUS_FILTER"
    }, {
      jsonPath: "Challan.applicationStatus",

      callBack: checkValueForNA
    }),
    cancellComment: (0, _utils.getLabelWithValue)({
      labelName: "Reason for Cancellation",
      labelKey: "UC_CANCELL_COMMENT"
    }, {
      jsonPath: "Challan.additionalDetail.cancellComment",
      callBack: checkValueForNA
    })

  })
});

var callBackForPay = exports.callBackForPay = function callBackForPay(state, dispatch) {
  (0, _commons2.getCommonPayUrl)(dispatch, applicationNumber, tenantId, businessService);
};

var showHideConfirmationPopup = exports.showHideConfirmationPopup = function showHideConfirmationPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["search-preview"], "components.div.children.preview.children.cardContent.children.footer.children.cancelConfirmationDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.preview.children.cardContent.children.footer.children.cancelConfirmationDialog", "props.open", !toggle));
};

var cancelChallan = exports.cancelChallan = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(state, dispatch, status) {
    var operation, estimateData, challan, payload, consumerCode, _businessService;

    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            operation = "cancel";
            estimateData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Demands[0].estimateCardData");

            estimateData && estimateData.forEach(function (item, index) {
              dispatch((0, _actions2.prepareFinalObject)("Challan.amount[" + index + "].taxHeadCode", item.info.labelName));
              dispatch((0, _actions2.prepareFinalObject)("Challan.amount[" + index + "].amount", item.value));
            });
            challan = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Challan");

            challan.applicationStatus = status;

            _context4.prev = 5;

            if (!(challan != null)) {
              _context4.next = 11;
              break;
            }

            _context4.next = 9;
            return (0, _uiUtils.httpRequest)("post", "/echallan-services/eChallan/v1/_update", "", [], {
              Challan: challan
            });

          case 9:
            payload = _context4.sent;

            if (payload.challans.length > 0) {
              consumerCode = (0, _get2.default)(payload, "challans[0].challanNo");
              _businessService = (0, _get2.default)(payload, "challans[0].businessService");

              dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=success&tenantId=" + (0, _localStorageUtils.getTenantId)() + "&serviceCategory=" + _businessService + "&challanNumber=" + consumerCode));
            } else {
              console.info("some error  happened while cancelling challan");
              dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));
            }

          case 11:
            _context4.next = 17;
            break;

          case 13:
            _context4.prev = 13;
            _context4.t0 = _context4["catch"](5);

            console.error("error:::" + _context4.t0);
            dispatch((0, _actions.setRoute)("/uc/acknowledgement?purpose=" + operation + "&status=failure"));

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[5, 13]]);
  }));

  return function cancelChallan(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var openUpdateForm = function openUpdateForm(state, dispatch) {
  var tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
  var businessService = (0, _commons2.getQueryArg)(window.location.href, "businessService");
  var consumerCode = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
  dispatch((0, _actions.setRoute)("/uc/newCollection?consumerCode=" + consumerCode + "&tenantId=" + tenantId + "&businessService=" + businessService));
};

var formatTaxHeaders = function formatTaxHeaders() {
  var billDetail = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var formattedFees = [];
  var _billDetail$billAccou = billDetail.billAccountDetails,
      billAccountDetails = _billDetail$billAccou === undefined ? [] : _billDetail$billAccou;

  var billAccountDetailsSorted = (0, _orderBy2.default)(billAccountDetails, ["amount"], ["asce"]);

  formattedFees = billAccountDetailsSorted.map(function (taxHead) {
    return {
      info: {
        labelKey: taxHead.taxHeadCode,
        labelName: taxHead.taxHeadCode
      },
      name: {
        labelKey: taxHead.taxHeadCode,
        labelName: taxHead.taxHeadCode
      },
      value: taxHead.amount
    };
  });
  formattedFees.reverse();
  return formattedFees;
};

var fetchBill = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(action, state, dispatch, consumerCode, tenantId, billBusinessService) {
    var getBillQueryObj, queryObj, fetchBillResponse, paymentObject, bill, estimateData, challanStatus;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            getBillQueryObj = [{ key: "tenantId", value: tenantId }, {
              key: "consumerCode",
              value: consumerCode
            }, {
              key: "service",
              value: billBusinessService
            }];
            queryObj = [{ key: "tenantId", value: tenantId }, {
              key: "consumerCodes",
              value: consumerCode
            }, {
              key: "businessServices",
              value: billBusinessService
            }];
            _context5.next = 4;
            return getBill(getBillQueryObj);

          case 4:
            fetchBillResponse = _context5.sent;
            _context5.next = 7;
            return (0, _commons4.getSearchResults)(queryObj);

          case 7:
            paymentObject = _context5.sent;
            bill = (0, _get2.default)(paymentObject, "Payments[0].paymentDetails[0].bill", null);

            if (bill == null) {
              bill = (0, _get2.default)(fetchBillResponse, "Bill[0]", {});
            }
            estimateData = formatTaxHeaders(bill.billDetails[0]);
            challanStatus = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Challan.applicationStatus", null);

            (0, _set2.default)(estimateData, "payStatus", challanStatus === "PAID" ? true : false);
            dispatch((0, _actions2.prepareFinalObject)("Bill[0]", bill));
            dispatch((0, _actions2.prepareFinalObject)("Demands[0].estimateCardData", estimateData));
            dispatch((0, _actions2.prepareFinalObject)("Payments", (0, _get2.default)(paymentObject, "Payments", null)));

          case 16:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined);
  }));

  return function fetchBill(_x13, _x14, _x15, _x16, _x17, _x18) {
    return _ref5.apply(this, arguments);
  };
}();
var getBill = exports.getBill = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _uiUtils.httpRequest)("post", "/billing-service/bill/v2/_search", "", queryObject);

          case 3:
            response = _context6.sent;
            return _context6.abrupt("return", response);

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);

            console.log(_context6.t0);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function getBill(_x19) {
    return _ref6.apply(this, arguments);
  };
}();

var getReceipt = exports.getReceipt = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            _context7.next = 3;
            return (0, _uiUtils.httpRequest)("post", (0, _commons3.getPaymentSearchAPI)(businessService), "", queryObject);

          case 3:
            response = _context7.sent;
            return _context7.abrupt("return", response);

          case 7:
            _context7.prev = 7;
            _context7.t0 = _context7["catch"](0);

            console.log(_context7.t0);

          case 10:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 7]]);
  }));

  return function getReceipt(_x20) {
    return _ref7.apply(this, arguments);
  };
}();

var generateMiniReceipt = function generateMiniReceipt(state) {

  var ReceiptDataTemp = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Payments[0]");
  var receiptDateFormatted = (0, _commons3.getDateFromEpoch)(ReceiptDataTemp.transactionDate);
  var receiptAmount = ReceiptDataTemp.totalAmountPaid;
  var fromPeriod = (0, _commons3.getDateFromEpoch)(ReceiptDataTemp.paymentDetails[0].bill.billDetails[0].fromPeriod);
  var toPeriod = (0, _commons3.getDateFromEpoch)(ReceiptDataTemp.paymentDetails[0].bill.billDetails[0].toPeriod);
  var consumerName = ReceiptDataTemp.payerName;
  var id = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
  var localizedULBName = "";
  if (id != null) {
    id = id.split(".")[1];
    localizedULBName = id[0].toUpperCase() + id.slice(1);
  };
  var collectorName = "";

  var empInfo = JSON.parse(localStorage.getItem("Employee.user-info"));
  collectorName = empInfo.name;
  var paymentMode = ReceiptDataTemp.paymentMode;

  var UCminiReceiptData = {
    ulbType: localizedULBName,
    receiptNumber: (0, _commons2.getQueryArg)(window.location.href, "applicationNumber"),
    tenantid: (0, _commons2.getQueryArg)(window.location.href, "tenantId"),
    consumerName: consumerName,
    receiptDate: receiptDateFormatted,
    businessService: (0, _commons2.getQueryArg)(window.location.href, "businessService"),
    fromPeriod: fromPeriod,
    toPeriod: toPeriod,
    receiptAmount: receiptAmount,
    paymentMode: paymentMode,
    collectorName: collectorName,
    status: "Paid"
  };

  return UCminiReceiptData;
};

var generateMiniChallan = function generateMiniChallan(state) {
  var ReceiptDataTemp = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Challan");
  var status = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "challanStatus");

  // const todayDate = new Date();
  var challanDateFormatted = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).split(' ').join('-');
  //const challanDateFormatted = todayDate.toString();           
  var fromPeriod = (0, _commons3.getDateFromEpoch)(ReceiptDataTemp.taxPeriodFrom);
  var toPeriod = (0, _commons3.getDateFromEpoch)(ReceiptDataTemp.taxPeriodTo);
  var consumerName = ReceiptDataTemp.citizen.name;
  var id = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
  var localizedULBName = "";
  if (id != null) {
    id = id.split(".")[1];
    localizedULBName = id[0].toUpperCase() + id.slice(1);
  }
  var collectorName = "";

  var empInfo = JSON.parse(localStorage.getItem("Employee.user-info"));
  collectorName = empInfo.name;

  var businessService = (0, _commons2.getQueryArg)(window.location.href, "businessService");

  var estimateData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Demands[0].estimateCardData");
  var amount = [];
  estimateData && estimateData.forEach(function (item, index) {
    amount.push(item.value);
  });
  var totalAmt = 0;

  if (amount.length != 0) {
    totalAmt = amount.reduce(function (total, arr) {
      // return the sum with previous value
      return total + arr;

      // set initial value as 0
    }, 0);
  }

  var UCminiChallanData = {
    ulbType: localizedULBName,
    receiptNumber: (0, _commons2.getQueryArg)(window.location.href, "applicationNumber"),
    tenantid: (0, _commons2.getQueryArg)(window.location.href, "tenantId"),
    consumerName: consumerName,
    businessService: businessService,
    fromPeriod: fromPeriod,
    toPeriod: toPeriod,
    receiptAmount: totalAmt,
    receiptDate: challanDateFormatted,
    collectorName: collectorName,
    status: status
  };
  return UCminiChallanData;
};
var screenConfig = {
  uiFramework: "material-ui",
  name: "search-preview",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    applicationNumber = (0, _commons2.getQueryArg)(window.location.href, "applicationNumber");
    var tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");
    dispatch((0, _actions3.fetchLocalizationLabel)((0, _localStorageUtils.getLocale)(), tenantId, tenantId));
    beforeInitFn(action, state, dispatch, applicationNumber);

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
                sm: 12
              }

            }, headerrow)
          }
        },

        preview: (0, _utils.getCommonCard)({
          estimate: estimate,
          serviceDetails: serviceDetails,
          userDetails: userDetails,
          footer: getCommonApplyFooter({
            cancelButton: {
              componentPath: "Button",
              props: {
                variant: "outlined",
                color: "primary",
                className: "preview-challan-btn"
              },
              children: {
                cancelButtonLabel: (0, _utils.getLabel)({
                  labelName: "Cancel Challan",
                  labelKey: "UC_CANCEL_CHALLAN"
                })
              },
              onClickDefination: {
                action: "condition",
                callBack: function callBack(state, dispatch) {
                  showHideConfirmationPopup(state, dispatch);
                }

              },
              visible: false
            },
            editButton: (0, _defineProperty3.default)({
              componentPath: "Button",
              props: {
                variant: "contained",
                color: "primary",
                className: "preview-challan-btn"

              },
              children: {
                editButtonLabel: (0, _utils.getLabel)({
                  labelName: "Edit Challan",
                  labelKey: "UC_UPDATE_CHALLAN"
                })
              },
              onClickDefination: {
                action: "condition"
                //callBack: callBackForPay,
              },
              visible: false
            }, "onClickDefination", {
              action: "condition",
              callBack: function callBack(state, dispatch) {
                openUpdateForm(state, dispatch);
              }

            }),
            cancelConfirmationDialog: {
              componentPath: "Dialog",
              props: {
                open: false,
                maxWidth: "sm"
              },
              children: {
                dialogContent: {
                  componentPath: "DialogContent",
                  props: {
                    classes: {
                      root: "city-picker-dialog-style"
                      // style: { minHeight: "180px", minWidth: "365px" }
                    } },
                  children: {
                    popup: _confirmationDialog.confirmationDialog
                  }
                }
              }
            }
          })

        })
      }
    }
  }
};

exports.default = screenConfig;