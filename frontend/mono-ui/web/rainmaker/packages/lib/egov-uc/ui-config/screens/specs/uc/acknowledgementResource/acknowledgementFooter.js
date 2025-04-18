"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.acknowledgementFailureFooter = exports.acknowledgementSuccesFooter = exports.getRedirectionURL = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _recieptPdf = require("../../utils/recieptPdf");

var _utils2 = require("../../utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _commons2 = require("egov-ui-kit/utils/commons");

require("../../../../../index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};
var getRedirectionURL = exports.getRedirectionURL = function getRedirectionURL() {
  var redirectionURL = (0, _utils2.ifUserRoleExists)("CITIZEN") ? "/inbox" : "/uc/newCollection";

  return redirectionURL;
};
var acknowledgementSuccesFooter = exports.acknowledgementSuccesFooter = getCommonApplyFooter({
  goToHomeButton: {
    componentPath: "Button",
    props: {
      // variant: "contained",
      // color: "primary",
      variant: "outlined",
      color: "primary",
      className: "gen-challan-btn"
      // style: {
      //   minWidth: "200px",
      //   height: "48px",
      //   marginRight: "16px"
      // }
    },
    children: {
      downloadReceiptButtonLabel: (0, _utils.getLabel)({
        labelName: "Go To Home",
        labelKey: "UC_BUTTON_GO_TO_HOME"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        goToHome(state, dispatch);
      }
    }
  },
  printMiniChallanButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      // className: "apply-wizard-footer-right-button",
      className: "gen-challan-btn"

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
      callBack: function callBack(state, dispatch) {
        var challanData = generateMiniChallan(state, dispatch);
        try {
          window.Android && window.Android.sendPrintData("printData", JSON.stringify(challanData));
        } catch (e) {}
      }
    },
    visible: JSON.parse(window.localStorage.getItem('isPOSmachine'))
  },
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className: "gen-challan-btn"
      // style: {
      //   minWidth: "200px",
      //   height: "48px",
      //   marginRight: "16px"
      // }
    },
    children: {
      payButtonLabel: (0, _utils.getLabel)({
        labelName: "PROCEED TO PAYMENT",
        labelKey: "UC_BUTTON_PAY"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {

        var challanNo = (0, _commons.getQueryArg)(window.location.href, "challanNumber");
        var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
        var businessService = (0, _commons.getQueryArg)(window.location.href, "serviceCategory");
        console.info("businessService=", businessService, "tenantId=", tenantId, "challanNo=", challanNo);
        if (businessService != null && tenantId != null && challanNo != null) {
          (0, _commons.getCommonPayUrl)(dispatch, challanNo, tenantId, businessService);
        } else {

          dispatch((0, _actions.setRoute)("/uc/newCollection"));
        }
      }
    }
  }
});
var acknowledgementFailureFooter = exports.acknowledgementFailureFooter = getCommonApplyFooter({
  nextButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      },
      className: "gen-challan-btn"
    },
    children: {
      goToHomeButtonLabel: (0, _utils.getLabel)({
        labelName: "Go To Home",
        labelKey: "UC_BUTTON_GO_TO_HOME"
      })
    },
    onClickDefination: {
      action: "page_change",
      path: "" + getRedirectionURL()
    }
  }
});

var viewReceipt = function viewReceipt(state, dispatch) {
  (0, _recieptPdf.generateReciept)(state, dispatch);
};

var goToHome = function goToHome(state, dispatch) {
  dispatch((0, _actions2.prepareFinalObject)("Challan", []));
  dispatch((0, _actions.setRoute)("" + getRedirectionURL()));
};

var generateMiniChallan = function generateMiniChallan(state, dispatch) {
  var ReceiptDataTemp = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Challan");

  var challanDateFormatted = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).split(' ').join('-');
  var fromPeriod = (0, _commons2.getDateFromEpoch)(ReceiptDataTemp.taxPeriodFrom);
  var toPeriod = (0, _commons2.getDateFromEpoch)(ReceiptDataTemp.taxPeriodTo);
  var consumerName = ReceiptDataTemp.consumerName;
  var id = (0, _commons.getQueryArg)(window.location.href, "tenantId");
  var localizedULBName = "";
  if (id != null) {
    id = id.split(".")[1];
    localizedULBName = id[0].toUpperCase() + id.slice(1);
  }
  var collectorName = "";

  var empInfo = JSON.parse(localStorage.getItem("Employee.user-info"));
  collectorName = empInfo.name;

  var businessService = (0, _commons.getQueryArg)(window.location.href, "serviceCategory");
  var totalAmt = ReceiptDataTemp.amount.reduce(function (total, arr) {
    // return the sum with previous value
    return total + arr.amount;

    // set initial value as 0
  }, 0);

  var UCminiChallanData = {
    ulbType: localizedULBName,
    receiptNumber: (0, _commons.getQueryArg)(window.location.href, "challanNumber"),
    tenantid: (0, _commons.getQueryArg)(window.location.href, "tenantId"),
    consumerName: consumerName,
    businessService: businessService,
    fromPeriod: fromPeriod,
    toPeriod: toPeriod,
    receiptAmount: totalAmt,
    receiptDate: challanDateFormatted,
    collectorName: collectorName,
    status: "Active"
  };

  return UCminiChallanData;
  // return UCminiChallanBuilder(UCminiChallanData);
};

// const UCminiChallanBuilder=(h)=> {
//   var NEXTLINE = "&&";
//   let challanString = "     " + h["ulbType"];
//   challanString = challanString + NEXTLINE + "        Collection Receipt" + NEXTLINE;
//   challanString = challanString + "******************************************" + NEXTLINE;

//   challanString = challanString + " Receipt No    : " + h["receiptNumber"] + NEXTLINE;
//   challanString = challanString + " Receipt Date  : " + h["challanDate"] + NEXTLINE;
//   challanString = challanString + " Consumer Name : " + h["consumerName"] + NEXTLINE; 

//   challanString = challanString + " Category      : " + h["businessService"] + NEXTLINE;
//   challanString = challanString + " From Period   : " + h["fromPeriod"] + NEXTLINE;
//   challanString = challanString + " To Period     : " + h["toPeriod"] + NEXTLINE;
//   challanString = challanString + " Paid Amount   : Rs." + h["receiptAmount"] + NEXTLINE;
//   challanString = challanString + " Created By: " + h["collectorName"] + NEXTLINE;
//   challanString = challanString + "******************************************" + NEXTLINE; 
//   //console.log(challanString.replace(/&&/g, "\n"));

//   return "egov://print/" + challanString;
// };