"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAcknowledgementCard = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _cardCoontentConstants = require("./cardCoontentConstants");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var style = {
  bodyBox: {
    marginLeft: 16,
    flex: 2
  },
  tailText: {
    color: "rgba(0, 0, 0, 0.6000000238418579)",
    fontSize: 16,
    fontWeight: 400
  },
  tailNumber: {
    fontSize: 24,
    fontWeight: 500
  },
  tailBox: {
    textAlign: "right",
    justifyContent: "center",
    flex: 1
  },
  bodySub: {
    marginTop: "8px",
    marginBottom: "0px",
    color: "rgba(0, 0, 0, 0.60)",
    fontFamily: "Roboto"
  },
  container: {
    display: "flex",
    minHeight: "106px",
    justifyContent: "center",
    alignItems: "center"
  }
};

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

var constructFooterObj = function constructFooterObj(footerUrlConfig) {
  var footerObj = {};
  for (var key in footerUrlConfig) {
    footerObj[key] = {
      props: {
        className: "apply-wizard-footer1",
        variant: "outlined",
        color: "primary",
        style: {
          minWidth: "180px",
          height: "48px",
          color: "#fff",
          backgroundolor: " #FE7A51"
        }
      },
      ButtonLabel: {
        labelName: footerUrlConfig[key].labelName,
        labelKey: footerUrlConfig[key].labelKey
      },
      onClickDefination: {
        action: "page_change",
        path: "" + footerUrlConfig[key].url
      }
    };
  }
  return footerObj;
};

var getCurrentFinancialYear = function getCurrentFinancialYear() {
  var today = new Date();
  var curMonth = today.getMonth();
  var fiscalYr = "";
  if (curMonth > 3) {
    var nextYr1 = (today.getFullYear() + 1).toString();
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1;
  } else {
    var nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2;
  }
  return fiscalYr;
};

var downloadprintMenu = function downloadprintMenu(downloadMenu, printMenu) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "downloadprint-commonmenu",
      style: { textAlign: "right", display: "flex" }
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
              variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: "5px" }, className: "tl-download-button"
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
            props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" },
            menu: printMenu
          }
        }
      }

    }
  };
};

var getHeader = function getHeader(applicationNumber, moduleName) {
  return (0, _utils.getCommonContainer)({
    header: (0, _utils.getCommonHeader)({
      labelName: "Application for " + moduleName + " (" + getCurrentFinancialYear() + ")", //later use getFinancialYearDates
      labelKey: (0, _commons.getTransformedLocale)(moduleName + "_COMMON_APPLY_HEADER_LABEL")
    }),
    applicationNumber: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-firenoc",
      componentPath: "ApplicationNoContainer",
      props: {
        number: applicationNumber
      },
      visible: true
    }
  });
};

var getAcknowledgementCardContent = function getAcknowledgementCardContent(purpose, status, applicationNumber, moduleName, secondNumber) {
  var ackCardContentObj = {
    "icon": status === "success" ? "done" : "close",
    "backgroundColor": status === "success" ? "#39CB74" : "#d32f2f"
  };
  var ackObj = (0, _cardCoontentConstants.construtCardCongtentObj)(moduleName, purpose, status);
  for (var key in ackObj) {
    ackCardContentObj[key] = {
      labelName: ackObj[key].labelName,
      labelKey: ackObj[key].labelKey
    };
  }
  ackCardContentObj["number"] = applicationNumber;
  if (secondNumber && purpose == "approve" && status == "success") {
    ackCardContentObj["number"] = secondNumber;
  }
  return ackCardContentObj;
};

var getAcknowledgementCard = exports.getAcknowledgementCard = function getAcknowledgementCard(_ref) {
  var state = _ref.state,
      dispatch = _ref.dispatch,
      purpose = _ref.purpose,
      status = _ref.status,
      applicationNumber = _ref.applicationNumber,
      secondNumber = _ref.secondNumber,
      tenant = _ref.tenant,
      moduleName = _ref.moduleName,
      footerUrlConfig = _ref.footerUrlConfig,
      downloadMenu = _ref.downloadMenu,
      printMenu = _ref.printMenu;

  return {
    header: {
      labelName: "Application for " + moduleName + " (" + getCurrentFinancialYear() + ")", //later use getFinancialYearDates
      labelKey: (0, _commons.getTransformedLocale)(moduleName + "_COMMON_APPLY_HEADER_LABEL"),
      downloadButton: downloadMenu ? true : false,
      printButton: printMenu ? true : false,
      applicationNumber: applicationNumber,
      downloadPrintContainerClass: "downloadprint-commonmenu",
      downloadButtonProps: {
        label: { labelName: "DOWNLOAD", labelKey: "TL_DOWNLOAD" },
        leftIcon: "cloud_download",
        rightIcon: "arrow_drop_down",
        props: {
          variant: "outlined", style: { height: "60px", color: "#FE7A51", marginRight: "5px" }, className: "tl-download-button"
        },
        menu: downloadMenu
      },
      printButtonProps: {
        label: { labelName: "PRINT", labelKey: "TL_PRINT" },
        leftIcon: "print",
        rightIcon: "arrow_drop_down",
        props: { variant: "outlined", style: { height: "60px", color: "#FE7A51" }, className: "tl-print-button" },
        menu: printMenu
      }
    },
    body: (0, _extends3.default)({}, acknowledgementCard(getAcknowledgementCardContent(purpose, status, applicationNumber, moduleName, secondNumber))),
    footer: [].concat((0, _toConsumableArray3.default)(footerUrlConfig))
  };
};

var acknowledgementCard = function acknowledgementCard() {
  var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref2$icon = _ref2.icon,
      icon = _ref2$icon === undefined ? "done" : _ref2$icon,
      _ref2$backgroundColor = _ref2.backgroundColor,
      backgroundColor = _ref2$backgroundColor === undefined ? "#39CB74" : _ref2$backgroundColor,
      header = _ref2.header,
      body = _ref2.body,
      tailText = _ref2.tailText,
      number = _ref2.number;

  return {
    avatarStyle: {
      width: "72px",
      height: "72px",
      backgroundColor: backgroundColor
    },
    iconStyle: { fontSize: "50px" },
    iconName: icon,
    iconSize: "50px",
    headerLabelName: header.labelName,
    headerLabelKey: header.labelKey,
    paragraphStyle: style.bodySub,
    paragraphLableName: body.labelName,
    paragraphLabelKey: body.labelKey,
    tailText: tailText,
    tailNumber: number
  };
};

// export default getAcknowledgementCard;