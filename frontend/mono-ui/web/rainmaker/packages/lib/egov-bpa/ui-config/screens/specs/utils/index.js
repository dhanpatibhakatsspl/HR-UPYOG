"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.applicantNameAppliedByMaping = exports.getOcEdcrDetails = exports.getComparisonResult = exports.getPermitDetails = exports.showComparisonDialog = exports.deviationValidation = exports.ocuupancyType = exports.getLicenseDetails = exports.getConditionsInPermitList = exports.setProposedBuildingData = exports.downloadFeeReceipt = exports.permitOrderNoDownload = exports.revocationPdfDownload = exports.prepareDocumentDetailsUploadRedux = exports.prepareDocsInEmployee = exports.compare = exports.prepareNocFinalCards = exports.prepareNocDocumentsView = exports.getLoggedinUserRole = exports.requiredDocumentsData = exports.getMdmsDataForBpa = exports.getTenantMdmsData = exports.geBpatDetailsFromProperty = exports.getBpaMapLocator = exports.showHideBpaMapPopup = exports.getBpaMdmsData = exports.setNameOfUser = exports.createBill = exports.applyForm = undefined;
exports.gotoHome = exports.showCitizenApplyCityPicker = exports.showApplyCityPicker = exports.getBpaTextToLocalMapping = exports.resetFields = exports.generateBill = exports.createBpaEstimateData = exports.generateBillForBPA = exports.searchBill = exports.getScrutinyDetails = exports.licenceType = exports.residentialType = exports.getRiskType = exports.edcrDetailsToBpaDetails = exports.getBpaDetailsForOwner = exports.getLabelOnlyValue = exports.getCommonGrayCard = exports.showHideAdhocPopup = exports.gotoApplyWithStep = exports.setMobileNoField = exports.checkValueForNA = exports.setOrganizationVisibility = exports.addressDestruct = exports.getTextToLocalMapping = exports.fillOldLicenseData = exports.setLicenseeSubTypeDropdownData = exports.getLicenseeTypeDropdownData = exports.getEpochForDate = exports.sortByEpoch = exports.showCityPicker = exports.setFilteredTradeTypes = exports.getUniqueItemsFromArray = exports.getAllDataFromBillingSlab = exports.getDialogButton = exports.showHideBreakupPopup = exports.setOwnerShipDropDownFieldChange = exports.getDocList = exports.prepareBPAREGDocumentDetailsUploadRedux = exports.updateDropDowns = exports.getTransformedStatus = exports.ifUserRoleMatches = exports.ifUserRoleExists = exports.setValidToFromVisibilityForApply = exports.setValidToFromVisibilityForSV = exports.setMultiOwnerForApply = exports.setMultiOwnerForSV = exports.fetchBill = exports.getBaseURL = exports.getFinancialYearDates = exports.getNextMonthDateInYMD = exports.getHundredYearOldDateForDOB = exports.getEighteenYearOldDateForDOB = exports.getTodaysDateInYYYMMDD = exports.getTodaysDateInYMD = exports.epochToYmdDate = exports.validateFields = exports.getCurrentFinancialYear = exports.createEstimateData = exports.prepareDocumentTypeObj = exports.getUserDataFromUuid = exports.getDetailsForOwner = exports.getDetailsFromProperty = exports.getMdmsData = exports.getHeaderSideText = exports.showHideMapPopup = exports.getMapLocator = exports.getAutoSelector = exports.getReceiptData = exports.convertDateTimeToEpoch = exports.convertDateToEpoch = exports.convertEpochToDate = exports.getReceipt = exports.getBill = exports.getSearchResults = exports.objectToDropdown = exports.commonTransform = exports.getButtonVisibility = exports.getIconStyle = exports.getFeesEstimateCard = exports.onClickPreviousButton = exports.onClickNextButton = exports.getFooterButtons = exports.getSubHeaderLabel = exports.getLocalityHarmedJson = exports.getHygeneLevelJson = exports.getSafetyNormsJson = exports.getCheckBoxJsonpath = exports.getApprovalTextField = exports.getTranslatedLabel = exports.transformById = exports.getContainerWithElement = exports.getApplicationNoContainer = exports.getRadioGroupWithLabel = exports.getRadioButton = exports.getUploadFilesMultiple = exports.getUploadFile = exports.getCheckbox = exports.getTooltip = exports.getAsteric = exports.getCommonApplyFooter = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _axios = require("axios");

var _axios2 = _interopRequireDefault(_axios);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _jsonpath = require("jsonpath");

var _jsonpath2 = _interopRequireDefault(_jsonpath);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _groupBy = require("lodash/groupBy");

var _groupBy2 = _interopRequireDefault(_groupBy);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../ui-utils/api");

var _commons3 = require("../../../../ui-utils/commons");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var getAsteric = exports.getAsteric = function getAsteric() {
  return {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-tradelicence",
    componentPath: "Asteric"
  };
};

var getTooltip = exports.getTooltip = function getTooltip(children, toolTipProps) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      label: children,
      toolTip: {
        componentPath: "Tooltip",
        props: (0, _extends3.default)({}, toolTipProps),
        children: {
          uiFramework: "custom-atoms",
          componentPath: "Icon",
          props: {
            iconName: "info"
          }
        }
      }
    }
  };
};

var getCheckbox = exports.getCheckbox = function getCheckbox(content, jsonPath) {
  var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  return {
    uiFramework: "custom-containers-local",
    moduleName: "egov-tradelicence",
    componentPath: "CheckboxContainer",
    props: (0, _extends3.default)({
      content: content,
      jsonPath: jsonPath
    }, props)
  };
};

var getUploadFile = exports.getUploadFile = {
  uiFramework: "custom-molecules",
  componentPath: "DocumentList",
  props: {
    documents: [{
      name: "Upload Document"
    }]
  }
};

var getUploadFilesMultiple = exports.getUploadFilesMultiple = function getUploadFilesMultiple(jsonPath) {
  return {
    uiFramework: "custom-molecules",
    componentPath: "UploadMultipleFiles",
    props: {
      maxFiles: 4,
      jsonPath: jsonPath,
      inputProps: {
        accept: "image/*, .pdf, .png, .jpeg"
      },
      buttonLabel: "UPLOAD FILES",
      maxFileSize: 5000,
      moduleName: "TL"
    }
  };
};

var getRadioButton = exports.getRadioButton = function getRadioButton(buttons, jsonPath, defaultValue) {
  return {
    uiFramework: "custom-containers",
    componentPath: "RadioGroupContainer",
    props: {
      buttons: buttons,
      jsonPath: jsonPath,
      defaultValue: defaultValue
    }
  };
};

var getRadioGroupWithLabel = exports.getRadioGroupWithLabel = function getRadioGroupWithLabel(label, labelKey, buttons, jsonPath, defaultValue) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      alignItems: "center"
    },

    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 4
        },
        children: {
          div: (0, _utils.getLabel)({
            labelName: label,
            labelKey: labelKey,

            style: {
              fontSize: "14px"
            }
          }),
          asteric: getAsteric()
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 8
        },
        children: {
          div: getRadioButtonGroup(buttons, jsonPath, defaultValue)
        }
      }
    }
  };
};

var getApplicationNoContainer = exports.getApplicationNoContainer = function getApplicationNoContainer(number) {
  return {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-tradelicence",
    componentPath: "ApplicationNoContainer",
    props: {
      number: number
    }
  };
};

var getContainerWithElement = exports.getContainerWithElement = function getContainerWithElement(_ref) {
  var children = _ref.children,
      _ref$props = _ref.props,
      props = _ref$props === undefined ? {} : _ref$props,
      _ref$gridDefination = _ref.gridDefination,
      gridDefination = _ref$gridDefination === undefined ? {} : _ref$gridDefination;

  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: children,
    gridDefination: gridDefination,
    props: (0, _extends3.default)({}, props)
  };
};

var transformById = exports.transformById = function transformById(payload, id) {
  return payload && payload.reduce(function (result, item) {
    result[item[id]] = (0, _extends3.default)({}, item);

    return result;
  }, {});
};

var getTranslatedLabel = exports.getTranslatedLabel = function getTranslatedLabel(labelKey, localizationLabels) {
  var translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && (typeof translatedLabel === "undefined" ? "undefined" : (0, _typeof3.default)(translatedLabel)) === "object" && translatedLabel.hasOwnProperty("message")) translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

var getApprovalTextField = exports.getApprovalTextField = function getApprovalTextField(queryValue) {
  if (queryValue === "reject") {
    return (0, _utils.getTextField)({
      label: {
        labelName: "Comments",
        labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_LABEL"
      },
      placeholder: {
        labelName: "Enter Rejection Comments",
        labelKey: "TL_REJECTION_CHECKLIST_COMMENTS_PLACEHOLDER"
      },
      required: false,
      pattern: "",
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.comments",
      props: {
        style: {
          paddingBottom: 5
        }
      }
    });
  } else if (queryValue === "cancel") {
    return (0, _utils.getTextField)({
      label: {
        labelName: "Comments",
        labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_LABEL"
      },
      placeholder: {
        labelName: "Enter Cancellation Comments",
        labelKey: "TL_CANCEL_CHECKLIST_COMMENTS_PLACEHOLDER"
      },
      required: false,
      pattern: "",
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.comments",
      props: {
        style: {
          paddingBottom: 5
        }
      }
    });
  } else {
    return (0, _utils.getTextField)({
      label: {
        labelName: "Comments",
        labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_LABEL"
      },
      placeholder: {
        labelName: "Enter Approval Comments",
        labelKey: "TL_APPROVAL_CHECKLIST_COMMENTS_PLACEHOLDER_APPR"
      },
      required: false,
      pattern: "",
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.comments",
      props: {
        style: {
          paddingBottom: 5
        }
      }
    });
  }
};

var getCheckBoxJsonpath = exports.getCheckBoxJsonpath = function getCheckBoxJsonpath(queryValue) {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.check";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.check";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.check";
  }
};

var getSafetyNormsJson = exports.getSafetyNormsJson = function getSafetyNormsJson(queryValue) {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.checklist.safetyNorms";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.checklist.safetyNorms";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.checklist.safetyNorms";
  }
};

var getHygeneLevelJson = exports.getHygeneLevelJson = function getHygeneLevelJson(queryValue) {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.checklist.hygieneLevels";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.checklist.hygieneLevels";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.checklist.hygieneLevels";
  }
};

var getLocalityHarmedJson = exports.getLocalityHarmedJson = function getLocalityHarmedJson(queryValue) {
  if (queryValue === "reject") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.rejectDetail.checklist.localityHarmed";
  } else if (queryValue === "cancel") {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.cancelDetail.checklist.localityHarmed";
  } else {
    return "Licenses[0].tradeLicenseDetail.additionalDetail.approveDetail.checklist.localityHarmed";
  }
};

var getSubHeaderLabel = exports.getSubHeaderLabel = function getSubHeaderLabel(queryValue) {
  if (queryValue === "reject") {
    return (0, _utils.getCommonSubHeader)({
      labelName: "Rejection CheckList",
      labelKey: "TL_REJECTION_CHECKLIST_REJ_CHECKLIST"
    });
  } else if (queryValue === "cancel") {
    return {};
  } else {
    return (0, _utils.getCommonSubHeader)({
      labelName: "Approve Checklist",
      labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_APPRV_CHECKLIST"
    });
  }
};

var getFooterButtons = exports.getFooterButtons = function getFooterButtons(queryValue) {
  if (queryValue === "reject") {
    return (0, _utils.getLabel)({
      labelName: "REJECT APPLICATION",
      labelKey: "TL_REJECTION_CHECKLIST_BUTTON_REJ_APPL"
    });
  } else if (queryValue === "cancel") {
    return (0, _utils.getLabel)({
      labelName: "CANCEL TRADE LICENSE",
      labelKey: "TL_COMMON_BUTTON_CANCEL_LICENSE"
    });
  } else {
    return (0, _utils.getLabel)({
      labelName: "APPROVE APPLICATION",
      labelKey: "TL_APPROVAL_CHECKLIST_BUTTON_APPRV_APPL"
    });
  }
};

var onClickNextButton = exports.onClickNextButton = function onClickNextButton(applicationNumber, secondNumber, queryValue, tenantId) {
  switch (queryValue) {
    case "reject":
      return "/tradelicence/acknowledgement?purpose=application&status=rejected&applicationNumber=" + applicationNumber + "&secondNumber=" + secondNumber + "&tenantId=" + tenantId;
    case "cancel":
      return "/tradelicence/acknowledgement?purpose=application&status=cancelled&applicationNumber=" + applicationNumber + "&secondNumber=" + secondNumber + "&tenantId=" + tenantId;
    default:
      return "/tradelicence/acknowledgement?purpose=approve&status=success&applicationNumber=" + applicationNumber + "&secondNumber=" + secondNumber + "&tenantId=" + tenantId;
  }
};

var onClickPreviousButton = exports.onClickPreviousButton = function onClickPreviousButton(queryValue, applicationNumber, tenantId) {
  switch (queryValue) {
    case "reject":
      return "/tradelicence/search-preview?role=approver&status=pending_approval&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
    case "cancel":
      return "/tradelicence/search-preview?role=approver&status=approved&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
    default:
      return "/tradelicence/search-preview?role=approver&status=pending_approval&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
  }
};
var getFeesEstimateCard = function getFeesEstimateCard(props) {
  var sourceJsonPath = props.sourceJsonPath,
      rest = (0, _objectWithoutProperties3.default)(props, ["sourceJsonPath"]);

  return {
    uiFramework: "custom-containers-local",
    moduleName: "egov-bpa",
    componentPath: "EstimateCardContainer",
    props: (0, _extends3.default)({
      sourceJsonPath: sourceJsonPath
    }, rest)
  };
};

exports.getFeesEstimateCard = getFeesEstimateCard;
var style = {
  textfieldIcon: {
    position: "relative",
    top: "25px",
    left: "-249%"
  },
  headerIcon: {
    position: "relative",
    bottom: "2px"
  }
};

var getIconStyle = exports.getIconStyle = function getIconStyle(key) {
  return style[key];
};

// export const showHideAdhocPopup = (state, dispatch) => {
//   let toggle = get(
//     state.screenConfiguration.screenConfig["pay"],
//     "components.adhocDialog.props.open",
//     false
//   );
//   dispatch(handleField("pay", "components.adhocDialog", "props.open", !toggle));
// };

var getButtonVisibility = exports.getButtonVisibility = function getButtonVisibility(status, button) {
  if (status === "APPLIED" && button === "PROCEED TO PAYMENT") return true;
  if (status === "pending_approval" && button === "APPROVE") return true;
  if (status === "pending_approval" && button === "REJECT") return true;
  if (status === "approved" && button === "CANCEL TRADE LICENSE") return true;
  return false;
};

var commonTransform = exports.commonTransform = function commonTransform(object, path) {
  var data = (0, _get2.default)(object, path);
  var transformedData = {};
  data.map(function (a) {
    var splitList = a.code.split(".");
    var ipath = "";
    for (var i = 0; i < splitList.length; i += 1) {
      if (i != splitList.length - 1) {
        if (!(splitList[i] in (ipath === "" ? transformedData : (0, _get2.default)(transformedData, ipath)))) {
          (0, _set2.default)(transformedData, ipath === "" ? splitList[i] : ipath + "." + splitList[i], i < splitList.length - 2 ? {} : []);
        }
      } else {
        (0, _get2.default)(transformedData, ipath).push(a);
      }
      ipath = splitList.slice(0, i + 1).join(".");
    }
  });
  (0, _set2.default)(object, path, transformedData);
  return object;
};

var objectToDropdown = exports.objectToDropdown = function objectToDropdown(object) {
  var dropDown = [];
  for (var variable in object) {
    if (object.hasOwnProperty(variable)) {
      dropDown.push({ code: variable });
    }
  }
  return dropDown;
};

// Search API call
var getSearchResults = exports.getSearchResults = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return (0, _api.httpRequest)("post", "/bpa-services/v1/BPAREG/_search", "", queryObject);

          case 3:
            response = _context.sent;
            return _context.abrupt("return", response);

          case 7:
            _context.prev = 7;
            _context.t0 = _context["catch"](0);

            console.log(_context.t0);
            return _context.abrupt("return", {});

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getSearchResults(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var getBill = exports.getBill = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "/tl-calculator/v1/BPAREG/_getbill", "", queryObject);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

            console.log(_context2.t0);

          case 10:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getBill(_x3) {
    return _ref3.apply(this, arguments);
  };
}();

var getReceipt = exports.getReceipt = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject, businessService) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)(businessService), "", queryObject);

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

            console.log(_context3.t0);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function getReceipt(_x4, _x5) {
    return _ref4.apply(this, arguments);
  };
}();

var convertEpochToDate = exports.convertEpochToDate = function convertEpochToDate(dateEpoch) {
  var dateFromApi = new Date(dateEpoch);
  var month = dateFromApi.getMonth() + 1;
  var day = dateFromApi.getDate();
  var year = dateFromApi.getFullYear();
  month = (month > 9 ? "" : "0") + month;
  day = (day > 9 ? "" : "0") + day;
  return day + "/" + month + "/" + year;
};

var convertDateToEpoch = exports.convertDateToEpoch = function convertDateToEpoch(dateString) {
  var dayStartOrEnd = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "dayend";

  //example input format : "2018-10-02"
  try {
    var parts = dateString.match(/(\d{4})-(\d{1,2})-(\d{1,2})/);
    var DateObj = new Date(Date.UTC(parts[1], parts[2] - 1, parts[3]));
    DateObj.setMinutes(DateObj.getMinutes() + DateObj.getTimezoneOffset());
    if (dayStartOrEnd === "dayend") {
      DateObj.setHours(DateObj.getHours() + 24);
      DateObj.setSeconds(DateObj.getSeconds() - 1);
    }
    return DateObj.getTime();
  } catch (e) {
    return dateString;
  }
};

var convertDateTimeToEpoch = exports.convertDateTimeToEpoch = function convertDateTimeToEpoch(dateTimeString) {
  //example input format : "26-07-2018 17:43:21"
  try {
    // const parts = dateTimeString.match(
    //   /(\d{2})\-(\d{2})\-(\d{4}) (\d{2}):(\d{2}):(\d{2})/
    // );
    var parts = dateTimeString.match(/(\d{2})-(\d{2})-(\d{4}) (\d{2}):(\d{2}):(\d{2})/);
    return Date.UTC(+parts[3], parts[2] - 1, +parts[1], +parts[4], +parts[5]);
  } catch (e) {
    return dateTimeString;
  }
};

var getReceiptData = exports.getReceiptData = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "collection-services/payments/_search", "", queryObject);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            console.log(_context4.t0);
            return _context4.abrupt("return", {});

          case 11:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function getReceiptData(_x7) {
    return _ref5.apply(this, arguments);
  };
}();

var getAutoSelector = exports.getAutoSelector = function getAutoSelector(textScheama) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-tradelicence",
    componentPath: "AutoSelector",
    gridDefination: {
      xs: 6,
      sm: 3
    },
    props: {
      data: []
    }
  };
};

var getMapLocator = exports.getMapLocator = function getMapLocator(textSchema) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-tradelicence",
    componentPath: "MapLocator",
    props: {}
  };
};

var showHideMapPopup = exports.showHideMapPopup = function showHideMapPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.mapsDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.mapsDialog", "props.open", !toggle));
};

var getHeaderSideText = exports.getHeaderSideText = function getHeaderSideText(status) {
  var licenseNo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  switch (status) {
    case "PENDINGDOCVERIFICATION":
      return {
        word1: "Status: ",
        word2: "WF_ARCHITECT_PENDINGDOCVERIFICATION"
      };

    case "PAID":
    case "PENDINGAPPROVAL":
      return { word1: "Status: ", word2: "WF_ARCHITECT_PENDINGAPPROVAL" };
    case "PENDINGPAYMENT":
      return { word1: "Status: ", word2: "WF_ARCHITECT_PENDINGPAYMENT" };
    case "FIELDINSPECTION":
      return { word1: "Status: ", word2: "WF_ARCHITECT_FIELDINSPECTION" };
    case "APPLIED":
      return { word1: "Status: ", word2: "TL_APPLIED" };
    case "REJECTED":
      return { word1: "Status: ", word2: "TL_REJECTED" };
    case "CANCELLED":
      return { word1: "License No: ", word2: "" + licenseNo };
    case "APPROVED":
      return { word1: "License No: ", word2: "" + licenseNo };
    default:
      return { word1: "", word2: "" };
  }
};

var getMdmsData = exports.getMdmsData = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _api.httpRequest)("post", "egov-mdms-service/v1/_get", "", queryObject);

          case 3:
            response = _context5.sent;
            return _context5.abrupt("return", response);

          case 7:
            _context5.prev = 7;
            _context5.t0 = _context5["catch"](0);

            console.log(_context5.t0);
            return _context5.abrupt("return", {});

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function getMdmsData(_x9) {
    return _ref6.apply(this, arguments);
  };
}();

var getDetailsFromProperty = exports.getDetailsFromProperty = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch) {
    var propertyId, cityId, tenantId, payload;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            propertyId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].propertyId", "");
            cityId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.address.tenantId", "");
            tenantId = ifUserRoleExists("CITIZEN") ? cityId : (0, _localStorageUtils.getTenantId)();

            if (tenantId) {
              _context6.next = 7;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please select city to search by property id !!",
              labelKey: "ERR_SELECT_CITY_TO_SEARCH_PROPERTY_ID"
            }, "warning"));
            return _context6.abrupt("return");

          case 7:
            if (!propertyId) {
              _context6.next = 12;
              break;
            }

            _context6.next = 10;
            return (0, _api.httpRequest)("post", "/pt-services-v2/property/_search?tenantId=" + tenantId + "&ids=" + propertyId, "_search", [], {});

          case 10:
            payload = _context6.sent;

            if (payload && payload.Properties && payload.Properties.hasOwnProperty("length")) {
              if (payload.Properties.length === 0) {
                dispatch((0, _actions2.toggleSnackbar)(true, {
                  labelName: "Property is not found with this Property Id",
                  labelKey: "ERR_PROPERTY_NOT_FOUND_WITH_PROPERTY_ID"
                }, "info"));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocPropertyID", "props.value", ""));
              } else {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.value", {
                  value: payload.Properties[0].address.locality.code,
                  label: payload.Properties[0].address.locality.name
                }));
                dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address", payload.Properties[0].address));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.children.cityDropdown", "props.value", payload.Properties[0].address.tenantId));
              }
            }

          case 12:
            _context6.next = 17;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](0);

            console.log(_context6.t0);

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 14]]);
  }));

  return function getDetailsFromProperty(_x10, _x11) {
    return _ref7.apply(this, arguments);
  };
}();

var getDetailsForOwner = exports.getDetailsForOwner = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(state, dispatch, fieldInfo) {
    var cardIndex, ownerNo, owners, oldOwnersArr, matchingOwnerIndex, payload, userInfo, currOwnersArr;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            cardIndex = fieldInfo && fieldInfo.index ? fieldInfo.index : "0";
            ownerNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners[" + cardIndex + "].mobileNumber", "");
            owners = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners", []);
            //owners from search call before modification.

            oldOwnersArr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].tradeLicenseDetail.owners", []);
            //Same no search on Same index

            if (!(ownerNo === owners[cardIndex].userName)) {
              _context7.next = 8;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Owner already added !",
              labelKey: "ERR_OWNER_ALREADY_ADDED"
            }, "error"));
            return _context7.abrupt("return");

          case 8:

            //Same no search in whole array
            matchingOwnerIndex = owners.findIndex(function (item) {
              return item.userName === ownerNo;
            });

            if (!(matchingOwnerIndex > -1)) {
              _context7.next = 14;
              break;
            }

            if (!(0, _isUndefined2.default)(owners[matchingOwnerIndex].userActive) && owners[matchingOwnerIndex].userActive === false) {
              //rearrange
              dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners[" + matchingOwnerIndex + "].userActive", true));
              dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners[" + cardIndex + "].userActive", false));
              //Delete if current card was not part of oldOwners array - no need to save.
              if (oldOwnersArr.findIndex(function (item) {
                return owners[cardIndex].userName === item.userName;
              }) == -1) {
                owners.splice(cardIndex, 1);
                dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", owners));
              }
            } else {
              dispatch((0, _actions2.toggleSnackbar)(true, {
                labelName: "Owner already added !",
                labelKey: "ERR_OWNER_ALREADY_ADDED_1"
              }, "error"));
            }
            return _context7.abrupt("return");

          case 14:
            _context7.next = 16;
            return (0, _api.httpRequest)("post", "/user/_search?tenantId=" + _common2.default.tenantId, "_search", [], {
              tenantId: _common2.default.tenantId,
              userName: "" + ownerNo
            });

          case 16:
            payload = _context7.sent;

            if (payload && payload.user && payload.user.hasOwnProperty("length")) {
              if (payload.user.length === 0) {
                dispatch((0, _actions2.toggleSnackbar)(true, {
                  labelName: "This mobile number is not registered !",
                  labelKey: "ERR_MOBILE_NUMBER_NOT_REGISTERED"
                }, "info"));
              } else {
                userInfo = payload.user && payload.user[0] && JSON.parse(JSON.stringify(payload.user[0]));

                if (userInfo && userInfo.createdDate) {
                  userInfo.createdDate = convertDateTimeToEpoch(userInfo.createdDate);
                  userInfo.lastModifiedDate = convertDateTimeToEpoch(userInfo.lastModifiedDate);
                  userInfo.pwdExpiryDate = convertDateTimeToEpoch(userInfo.pwdExpiryDate);
                }
                currOwnersArr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners", []);


                currOwnersArr[cardIndex] = userInfo;
                if (oldOwnersArr.length > 0) {
                  currOwnersArr.push((0, _extends3.default)({}, oldOwnersArr[cardIndex], {
                    userActive: false
                  }));
                }
                dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", currOwnersArr));
              }
            }

          case 18:
            _context7.next = 23;
            break;

          case 20:
            _context7.prev = 20;
            _context7.t0 = _context7["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, _context7.t0.message, "info"));

          case 23:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 20]]);
  }));

  return function getDetailsForOwner(_x12, _x13, _x14) {
    return _ref8.apply(this, arguments);
  };
}();

// Get user data from uuid API call
var getUserDataFromUuid = exports.getUserDataFromUuid = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(bodyObject) {
    var response;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;

            // const response = await httpRequest(
            //   "post",
            //   "/user/_search",
            //   "",
            //   [],
            //   bodyObject
            // );

            response = (0, _commons2.getUserSearchedResponse)();
            return _context8.abrupt("return", response);

          case 5:
            _context8.prev = 5;
            _context8.t0 = _context8["catch"](0);

            console.log(_context8.t0);
            return _context8.abrupt("return", {});

          case 9:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 5]]);
  }));

  return function getUserDataFromUuid(_x15) {
    return _ref9.apply(this, arguments);
  };
}();

var getStatementForDocType = function getStatementForDocType(docType) {
  switch (docType) {
    case "OWNERIDPROOF":
      return "BPA_UPLOAD_STATEMENT1";
    case "OWNERSHIPPROOF":
      return "BPA_UPLOAD_STATEMENT2";
    case "EXPERIENCEPROOF":
      return "BPA_UPLOAD_STATEMENT3";
    default:
      return "";
  }
};

var prepareDocumentTypeObj = exports.prepareDocumentTypeObj = function prepareDocumentTypeObj(documents) {
  var documentsArr = documents.length > 0 ? documents.reduce(function (documentsArr, item, ind) {
    documentsArr.push({
      name: item,
      required: true,
      jsonPath: "Licenses[0].tradeLicenseDetail.applicationDocuments[" + ind + "]",
      statement: getStatementForDocType(item)
    });
    return documentsArr;
  }, []) : [];
  return documentsArr;
};

//Common functions for Estimate card

var getTaxValue = function getTaxValue(item) {
  return item ? item.amount ? item.amount : item.debitAmount ? -Math.abs(item.debitAmount) : item.crAmountToBePaid ? item.crAmountToBePaid : 0 : 0;
};

var getToolTipInfo = function getToolTipInfo(taxHead, LicenseData) {
  switch (taxHead) {
    case "TL_ADHOC_PENALTY":
      return (0, _get2.default)(LicenseData, "tradeLicenseDetail.adhocPenaltyReason");
    case "TL_ADHOC_REBATE":
      return (0, _get2.default)(LicenseData, "tradeLicenseDetail.adhocExemptionReason");
    default:
      return "";
  }
};

var getEstimateData = function getEstimateData(Bill, getFromReceipt, LicenseData) {
  if (Bill) {
    var billAccountDetails = Bill.billDetails[0].billAccountDetails;

    var transformedData = billAccountDetails.reduce(function (result, item) {
      if (getFromReceipt) {
        item.taxHeadCode && result.push({
          name: {
            labelName: item.taxHeadCode.split("-")[0],
            labelKey: item.taxHeadCode.split("-")[0]
          },
          value: Bill.billDetails[0].amount,
          info: getToolTipInfo(item.taxHeadCode.split("-")[0], LicenseData) && {
            value: getToolTipInfo(item.taxHeadCode.split("-")[0], LicenseData),
            key: getToolTipInfo(item.taxHeadCode.split("-")[0], LicenseData)
          }
        });
      } else {
        item.taxHeadCode && result.push({
          name: {
            labelName: item.taxHeadCode,
            labelKey: item.taxHeadCode
          },
          value: getTaxValue(item),
          info: getToolTipInfo(item.taxHeadCode, LicenseData) && {
            value: getToolTipInfo(item.taxHeadCode, LicenseData),
            key: getToolTipInfo(item.taxHeadCode, LicenseData)
          }
        });
      }
      return result;
    }, []);
    return [].concat((0, _toConsumableArray3.default)(transformedData.filter(function (item) {
      return item.name.labelKey === "TL_TAX";
    })), (0, _toConsumableArray3.default)(transformedData.filter(function (item) {
      return item.name.labelKey !== "TL_TAX";
    })));
  }
};

var getBillingSlabData = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(dispatch, billingSlabIds, tenantId, accessories) {
    var _ref11, accesssoryBillingSlabIds, tradeTypeBillingSlabIds, accessoryUnit, tradeUnit, billingData, queryObject, response, tradeTotal, accessoriesTotal, finalData, accessoryData, tradeUnitData;

    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            _ref11 = billingSlabIds || {}, accesssoryBillingSlabIds = _ref11.accesssoryBillingSlabIds, tradeTypeBillingSlabIds = _ref11.tradeTypeBillingSlabIds;

            if (!(accesssoryBillingSlabIds || tradeTypeBillingSlabIds)) {
              _context9.next = 23;
              break;
            }

            accessoryUnit = accesssoryBillingSlabIds && accesssoryBillingSlabIds.reduce(function (result, item) {
              result.push(item.split("|")[0]);
              return result;
            }, []);
            tradeUnit = tradeTypeBillingSlabIds && tradeTypeBillingSlabIds.reduce(function (result, item) {
              result.push(item.split("|")[0]);
              return result;
            }, []);
            billingData = tradeUnit && [].concat((0, _toConsumableArray3.default)(tradeUnit));

            accessoryUnit && (billingData = [].concat((0, _toConsumableArray3.default)(billingData), (0, _toConsumableArray3.default)(accessoryUnit)));
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "ids", value: billingData && billingData.join(",") }];
            _context9.prev = 7;
            _context9.next = 10;
            return (0, _api.httpRequest)("post", "/tl-calculator/billingslab/_search", "", queryObject);

          case 10:
            response = _context9.sent;
            tradeTotal = 0;
            accessoriesTotal = 0;
            finalData = response && response.billingSlab.reduce(function (result, item) {
              if (item.tradeType) {
                tradeTotal = tradeTotal + item.rate;
                result.tradeUnitData.push({
                  rate: item.rate,
                  category: item.tradeType,
                  type: "trade"
                });
              } else {
                var count = accessories.find(function (accessory) {
                  return item.accessoryCategory === accessory.accessoryCategory;
                }).count;
                accessoriesTotal = accessoriesTotal + item.rate * count;
                result.accessoryData.push({
                  rate: item.rate,
                  total: item.rate * count,
                  category: item.accessoryCategory,
                  type: "accessories"
                });
              }
              return result;
            }, { tradeUnitData: [], accessoryData: [] });
            accessoryData = finalData.accessoryData, tradeUnitData = finalData.tradeUnitData;

            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].billingSlabData.tradeUnitData", tradeUnitData));
            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].billingSlabData.tradeTotal", tradeTotal));
            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].billingSlabData.accessoriesUnitData", accessoryData));
            dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].billingSlabData.accessoriesTotal", accessoriesTotal));
            _context9.next = 23;
            break;

          case 21:
            _context9.prev = 21;
            _context9.t0 = _context9["catch"](7);

          case 23:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined, [[7, 21]]);
  }));

  return function getBillingSlabData(_x16, _x17, _x18, _x19) {
    return _ref10.apply(this, arguments);
  };
}();

var isApplicationPaid = function isApplicationPaid(currentStatus) {
  var isPAID = false;

  if (!(0, _isEmpty2.default)(JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData")))) {
    var buisnessSeviceStates = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"))[0].states;
    for (var i = 0; i < buisnessSeviceStates.length; i++) {
      if (buisnessSeviceStates[i].state === currentStatus) {
        break;
      }
      if (buisnessSeviceStates[i].actions && buisnessSeviceStates[i].actions.filter(function (item) {
        return item.action === "PAY";
      }).length > 0) {
        isPAID = true;
        break;
      }
    }
  } else {
    isPAID = false;
  }

  return isPAID;
};

var createEstimateData = exports.createEstimateData = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(LicenseData, jsonPath, dispatch) {
    var href = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var isgetBill = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var applicationNo, tenantId, businessService, queryObjForGetBill, queryObjForGetReceipt, currentStatus, isPAID, payload, estimateData, accessories, event;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            applicationNo = (0, _get2.default)(LicenseData, "applicationNumber") || (0, _commons.getQueryArg)(href, "applicationNumber");
            tenantId = (0, _get2.default)(LicenseData, "tenantId") || (0, _commons.getQueryArg)(href, "tenantId");
            businessService = "BPAREG"; //Hardcoding Alert

            queryObjForGetBill = [{ key: "tenantId", value: tenantId }, {
              key: "consumerCode",
              value: applicationNo
            }, {
              key: "businessService",
              value: businessService
            }];
            queryObjForGetReceipt = [{ key: "tenantId", value: tenantId }, {
              key: "consumerCodes",
              value: applicationNo
            }];
            currentStatus = LicenseData.status;
            isPAID = isApplicationPaid(currentStatus);

            if (process.env.REACT_APP_NAME !== "Citizen" && window.location.pathname.indexOf("/bpastakeholder/search-preview") > -1) {
              isPAID = true;
            }
            // const payload = getFromReceipt
            //   ? await getReceipt(queryObj.filter(item => item.key !== "businessService"))
            //   : await getBill(queryObj);
            // const estimateData = payload
            //   ? getFromReceipt
            //     ? getEstimateData(payload.Receipt[0].Bill, getFromReceipt, LicenseData)
            //     : payload.billResponse &&
            //       getEstimateData(payload.billResponse.Bill, false, LicenseData)
            //   : [];
            payload = {};
            estimateData = {};

            if (!isgetBill) {
              _context10.next = 17;
              break;
            }

            _context10.next = 13;
            return getBill(queryObjForGetBill);

          case 13:
            payload = _context10.sent;

            estimateData = payload && getEstimateData(payload.billResponse.Bill[0], false, LicenseData);
            _context10.next = 28;
            break;

          case 17:
            if (!isPAID) {
              _context10.next = 23;
              break;
            }

            _context10.next = 20;
            return getReceipt(queryObjForGetReceipt, businessService);

          case 20:
            _context10.t0 = _context10.sent;
            _context10.next = 26;
            break;

          case 23:
            _context10.next = 25;
            return getBill(queryObjForGetBill);

          case 25:
            _context10.t0 = _context10.sent;

          case 26:
            payload = _context10.t0;

            estimateData = payload ? isPAID ? payload && payload.Payments && payload.Payments.length > 0 && getEstimateData(payload.Payments[0].paymentDetails[0].bill, isPAID, LicenseData) : payload && getEstimateData(payload.billResponse.Bill[0], false, LicenseData) : [];

          case 28:
            estimateData = estimateData || [];
            dispatch((0, _actions2.prepareFinalObject)(jsonPath, estimateData));
            accessories = (0, _get2.default)(LicenseData, "tradeLicenseDetail.accessories", []);

            payload && payload.billingSlabIds && getBillingSlabData(dispatch, payload.billingSlabIds, tenantId, accessories);

            /** Waiting for estimate to load while downloading confirmation form */
            event = new CustomEvent("estimateLoaded", { detail: true });

            window.parent.document.dispatchEvent(event);
            /** END */

            return _context10.abrupt("return", payload);

          case 35:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function createEstimateData(_x20, _x21, _x22) {
    return _ref12.apply(this, arguments);
  };
}();

var getCurrentFinancialYear = exports.getCurrentFinancialYear = function getCurrentFinancialYear() {
  var today = new Date();
  var curMonth = today.getMonth();
  var fiscalYr = "";
  if (curMonth >= 3) {
    var nextYr1 = (today.getFullYear() + 1).toString();
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1;
  } else {
    var nextYr2 = today.getFullYear().toString();
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2;
  }
  return fiscalYr;
};

var validateFields = exports.validateFields = function validateFields(objectJsonPath, state, dispatch) {
  var screen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "apply";

  var fields = (0, _get2.default)(state.screenConfiguration.screenConfig[screen], objectJsonPath, {});
  var isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].props && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils2.validate)(screen, (0, _extends3.default)({}, fields[variable], {
        value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, fields[variable].jsonPath)
      }), dispatch, true)) {
        isFormValid = false;
      }
    }
  }
  return isFormValid;
};

var epochToYmdDate = exports.epochToYmdDate = function epochToYmdDate(et) {
  if (!et) return null;
  if (typeof et === "string") return et;
  var date = new Date(Math.round(Number(et)));
  var formattedDate = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
  return formattedDate;
};

var getTodaysDateInYMD = exports.getTodaysDateInYMD = function getTodaysDateInYMD() {
  var date = new Date();
  //date = date.valueOf();
  var month = date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  date = date.getFullYear() + "-" + month + "-" + day;
  // date = epochToYmdDate(date);
  return date;
};

var getTodaysDateInYYYMMDD = exports.getTodaysDateInYYYMMDD = function getTodaysDateInYYYMMDD() {
  var date = new Date();
  var month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  date = date.getFullYear() + "-" + month + "-" + day;
  return date;
};

var getEighteenYearOldDateForDOB = exports.getEighteenYearOldDateForDOB = function getEighteenYearOldDateForDOB() {
  var date = new Date();
  var month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  date = date.getFullYear() - 18 + "-" + month + "-" + day;
  return date;
};

var getHundredYearOldDateForDOB = exports.getHundredYearOldDateForDOB = function getHundredYearOldDateForDOB() {
  var date = new Date();
  var month = date.getMonth() < 10 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1;
  var day = date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
  date = date.getFullYear() - 100 + "-" + month + "-" + day;
  return date;
};

var getNextMonthDateInYMD = exports.getNextMonthDateInYMD = function getNextMonthDateInYMD() {
  //For getting date of same day but of next month
  var date = getTodaysDateInYMD();
  date = date.substring(0, 5) + (parseInt(date.substring(5, 7)) + 1) + date.substring(7, 10);
  return date;
};

var getFinancialYearDates = exports.getFinancialYearDates = function getFinancialYearDates(format, et) {
  /** Return the starting date and ending date (1st April to 31st March)
   *  of the financial year of the given date in ET. If no ET given then
   *  return the dates for the current financial year */
  var date = !et ? new Date() : new Date(et);
  var curMonth = date.getMonth();
  var financialDates = { startDate: "NA", endDate: "NA" };
  if (curMonth > 3) {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = "01/04/" + date.getFullYear().toString();
        financialDates.endDate = "31/03/" + (date.getFullYear() + 1).toString();
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = date.getFullYear().toString() + "-04-01";
        financialDates.endDate = (date.getFullYear() + 1).toString() + "-03-31";
        break;
    }
  } else {
    switch (format) {
      case "dd/mm/yyyy":
        financialDates.startDate = "01/04/" + (date.getFullYear() - 1).toString();
        financialDates.endDate = "31/03/" + date.getFullYear().toString();
        break;
      case "yyyy-mm-dd":
        financialDates.startDate = (date.getFullYear() - 1).toString() + "-04-01";
        financialDates.endDate = date.getFullYear().toString() + "-03-31";
        break;
    }
  }
  return financialDates;
};

var getBaseURL = exports.getBaseURL = function getBaseURL() {
  if (process.env.REACT_APP_NAME !== "Citizen") {
    return "/tradelicence";
  } else {
    return "/tradelicense-citizen";
  }
};

var fetchBill = exports.fetchBill = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(action, state, dispatch) {
    var queryObject, LicensesPayload, payload;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            //For Adhoc
            // Search License
            queryObject = [{ key: "tenantId", value: (0, _commons.getQueryArg)(window.location.href, "tenantId") }, {
              key: "applicationNumber",
              value: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
            }];
            _context11.next = 3;
            return getSearchResults(queryObject);

          case 3:
            LicensesPayload = _context11.sent;
            _context11.t0 = LicensesPayload && LicensesPayload.Licenses;

            if (!_context11.t0) {
              _context11.next = 9;
              break;
            }

            _context11.next = 8;
            return createEstimateData(LicensesPayload.Licenses[0], "LicensesTemp[0].estimateCardData", dispatch, window.location.href);

          case 8:
            _context11.t0 = _context11.sent;

          case 9:
            payload = _context11.t0;

            //set in redux to be used for adhoc
            LicensesPayload && LicensesPayload.Licenses && dispatch((0, _actions2.prepareFinalObject)("Licenses[0]", LicensesPayload.Licenses[0]));

            //initiate receipt object
            payload && payload.billResponse && dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill[0]", payload.billResponse.Bill[0]));

            //set amount paid as total amount from bill - destination changed in CS v1.1
            payload && payload.billResponse && dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill[0].taxAndPayments[0].amountPaid", payload.billResponse.Bill[0].billDetails[0].totalAmount));

            //Collection Type Added in CS v1.1
            payload && payload.billResponse && dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].collectionType", "COUNTER"));

            //set total amount in instrument
            payload && payload.billResponse && dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].instrument.amount", payload.billResponse.Bill[0].billDetails[0].totalAmount));

            //Initially select instrument type as Cash
            dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].instrument.instrumentType.name", "Cash"));

            //set tenantId
            dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].tenantId", (0, _commons.getQueryArg)(window.location.href, "tenantId")));

            //set tenantId in instrument
            dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].instrument.tenantId", (0, _commons.getQueryArg)(window.location.href, "tenantId")));

          case 18:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function fetchBill(_x26, _x27, _x28) {
    return _ref13.apply(this, arguments);
  };
}();

var setMultiOwnerForSV = exports.setMultiOwnerForSV = function setMultiOwnerForSV(action, isIndividual) {
  if (isIndividual) {
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible", true);
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible", false);
  } else {
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible", true);
  }
};

var setMultiOwnerForApply = exports.setMultiOwnerForApply = function setMultiOwnerForApply(state, isIndividual) {
  if (isIndividual) {
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible", true);
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible", false);
  } else {
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwner.visible", false);
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.multiOwnerInstitutional.visible", true);
  }
};

var setValidToFromVisibilityForSV = exports.setValidToFromVisibilityForSV = function setValidToFromVisibilityForSV(action, value) {
  if (value === "PERMANENT") {
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible", false);
  } else {
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible", true);
    (0, _set2.default)(action, "screenConfig.components.div.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible", true);
  }
};

var setValidToFromVisibilityForApply = exports.setValidToFromVisibilityForApply = function setValidToFromVisibilityForApply(state, value) {
  if (value === "PERMANENT") {
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible", false);
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible", false);
  } else {
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewToDate.visible", true);
    (0, _set2.default)(state, "screenConfiguration.screenConfig.apply.components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewTradeDetails.children.cardContent.children.viewOne.children.reviewFromDate.visible", true);
  }
};

var ifUserRoleExists = exports.ifUserRoleExists = function ifUserRoleExists(role) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var roles = (0, _get2.default)(userInfo, "roles");
  var roleCodes = roles ? roles.map(function (role) {
    return role.code;
  }) : [];
  if (roleCodes.indexOf(role) > -1) {
    return true;
  } else return false;
};

var ifUserRoleMatches = exports.ifUserRoleMatches = function ifUserRoleMatches(roleList) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var roles = (0, _get2.default)(userInfo, "roles");
  var roleCodes = roles ? roles.map(function (role) {
    return role.code;
  }) : [];
  var found = roleList.some(function (elem) {
    return roleCodes.includes(elem);
  });
  return !found;
};

var getTransformedStatus = exports.getTransformedStatus = function getTransformedStatus(status) {
  switch (status) {
    case "PAID":
      return "pending_approval";
    case "APPLIED":
      return "pending_payment";
    case "REJECTED":
      return "rejected";
    case "CANCELLED":
      return "cancelled";
    case "APPROVED":
      return "approved";
    default:
      return "";
  }
};

var updateDropDowns = exports.updateDropDowns = function () {
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(payload, action, state, dispatch, queryValue) {
    var tradeSubTypes;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            tradeSubTypes = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.tradeUnits", []);


            if (tradeSubTypes.length > 0) {
              try {
                tradeSubTypes.forEach(function (tradeSubType, i) {
                  var licenseeTradeType = tradeSubType.tradeType;
                  var licenseeType = licenseeTradeType.split(".")[0];
                  var licenseeSubType = licenseeTradeType.split(".")[1];

                  licenseeType && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.tradeUnits[" + i + "].tradeType", licenseeType));

                  if (licenseeType == "ARCHITECT") dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container3.children.counsilForArchNo", "visible", true));else dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container3.children.counsilForArchNo", "visible", false));

                  setLicenseeSubTypeDropdownData(licenseeType, state, dispatch);
                  dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.tradeUnits[" + i + "].tradeType", licenseeTradeType));
                });
              } catch (e) {
                console.log(e);
              }
            }
            setOwnerShipDropDownFieldChange(state, dispatch, payload);

          case 3:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function updateDropDowns(_x29, _x30, _x31, _x32, _x33) {
    return _ref14.apply(this, arguments);
  };
}();

var prepareBPAREGDocumentDetailsUploadRedux = exports.prepareBPAREGDocumentDetailsUploadRedux = function () {
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(state, dispatch) {
    var docs, bpaDocs, uploadedDocs, fileStoreIds, fileUrls;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            docs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPARegDocumentsContract");
            bpaDocs = [];


            if (docs && docs.length > 0) {
              docs.forEach(function (section) {
                section.cards.forEach(function (doc) {
                  var docObj = {};
                  docObj.documentType = section.code;
                  docObj.documentCode = doc.code;
                  docObj.isDocumentRequired = doc.required;
                  docObj.isDocumentTypeRequired = doc.required;
                  bpaDocs.push(docObj);
                });
              });
            }

            uploadedDocs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.applicationDocuments", []);

            if (!(uploadedDocs && uploadedDocs.length > 0)) {
              _context13.next = 16;
              break;
            }

            fileStoreIds = _jsonpath2.default.query(uploadedDocs, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context13.next = 12;
              break;
            }

            _context13.next = 9;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 9:
            _context13.t0 = _context13.sent;
            _context13.next = 13;
            break;

          case 12:
            _context13.t0 = {};

          case 13:
            fileUrls = _context13.t0;

            uploadedDocs.forEach(function (upDoc) {
              bpaDocs.forEach(function (bpaDoc) {
                var bpaDetailsDoc = upDoc.documentType.split('.')[0] + "." + upDoc.documentType.split('.')[1];
                if (bpaDetailsDoc == bpaDoc.documentCode) {
                  var url = fileUrls && fileUrls[upDoc.fileStoreId] && fileUrls[upDoc.fileStoreId].split(",")[0] || "";
                  var name = fileUrls[upDoc.fileStoreId] && decodeURIComponent(fileUrls[upDoc.fileStoreId].split(",")[0].split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
                  bpaDoc.dropDownValues = {};
                  bpaDoc.dropDownValues.value = upDoc.documentType;
                  bpaDoc.documents = [{
                    fileName: name,
                    fileStoreId: upDoc.fileStoreId,
                    fileUrl: url,
                    id: upDoc.id
                  }];
                }
              });
            });
            dispatch((0, _actions2.prepareFinalObject)("bparegDocumentDetailsUploadRedux", bpaDocs));

          case 16:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function prepareBPAREGDocumentDetailsUploadRedux(_x34, _x35) {
    return _ref15.apply(this, arguments);
  };
}();

var getDocList = exports.getDocList = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(state, dispatch) {
    var tradeSubTypes, TradeTypetoRoleMapping, tardetypSeletedTypes, docTyps, bpaDocuments, documentsContract, tempDoc;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            tradeSubTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.tradeUnits");
            TradeTypetoRoleMapping = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.StakeholderRegistraition.TradeTypetoRoleMapping", []);
            tardetypSeletedTypes = [];

            tradeSubTypes.forEach(function (tradeTradeSubType) {
              tardetypSeletedTypes.push((0, _filter2.default)(TradeTypetoRoleMapping, {
                tradeType: tradeTradeSubType.tradeType
              }));
            });

            docTyps = tardetypSeletedTypes[0][0].docTypes;

            if (docTyps && docTyps.length > 0) {
              bpaDocuments = docTyps;
              documentsContract = [];
              tempDoc = {};


              bpaDocuments.forEach(function (doc) {
                var card = {};
                card["code"] = doc.code.split(".")[0];
                card["title"] = doc.code.split(".")[0];
                card["cards"] = [];
                tempDoc[doc.code.split(".")[0]] = card;
              });
              bpaDocuments.forEach(function (doc) {
                var card = {};
                card["name"] = doc.code;
                card["code"] = doc.code;
                card["required"] = doc.required ? true : false;
                tempDoc[doc.code.split(".")[0]].cards.push(card);
              });

              Object.keys(tempDoc).forEach(function (key) {
                documentsContract.push(tempDoc[key]);
              });
              dispatch((0, _actions2.prepareFinalObject)("BPARegDocumentsContract", documentsContract));
            }

          case 6:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function getDocList(_x36, _x37) {
    return _ref16.apply(this, arguments);
  };
}();

var setOwnerShipDropDownFieldChange = exports.setOwnerShipDropDownFieldChange = function setOwnerShipDropDownFieldChange(state, dispatch, payload) {
  var tradeSubOwnershipCat = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory");
  var tradeOwnershipCat = "";
  if (tradeSubOwnershipCat) {
    tradeOwnershipCat = tradeSubOwnershipCat.split(".")[0];
  } else {
    tradeOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.OwnerShipCategoryTransformed[0].code", "");
    tradeSubOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.OwnerShipCategory." + tradeOwnershipCat + "[0].code", "");
    (0, _set2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory", tradeSubOwnershipCat);
    payload && dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.subOwnerShipCategory", payload.Licenses[0].tradeLicenseDetail.subOwnerShipCategory));
  }

  (0, _set2.default)(payload, "LicensesTemp[0].tradeLicenseDetail.ownerShipCategory", tradeOwnershipCat);

  try {
    payload && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.ownerShipCategory", payload.LicensesTemp[0].tradeLicenseDetail.ownerShipCategory));
    dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.common-masters.subOwnerShipCategoryTransformed", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.OwnerShipCategory." + tradeOwnershipCat, [])));

    //handlefield for Type of OwnerShip while setting drop down values as beforeFieldChange won't be callled
    if (tradeOwnershipCat === "INDIVIDUAL") {
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "visible", true));
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional", "visible", false));
    } else {
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "visible", false));
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional", "visible", true));
    }

    //handlefield for type of sub ownership while setting drop down values as beforeFieldChange won't be callled

    if (tradeSubOwnershipCat === "INDIVIDUAL.SINGLEOWNER") {
      var ownerInfoCards = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, //hardcoded to apply screen
      "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items");
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", false));
      if (ownerInfoCards && ownerInfoCards.length > 1) {
        var singleCard = ownerInfoCards.slice(0, 1); //get the first element if multiple cards present

        dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.items", singleCard));
        dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners").slice(0, 1)));
      }
    }

    if (tradeSubOwnershipCat === "INDIVIDUAL.MULTIPLEOWNERS") {
      dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", true));
    }
  } catch (e) {
    console.log(e);
  }
};

var showHideBreakupPopup = exports.showHideBreakupPopup = function showHideBreakupPopup(state, dispatch, screenKey) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig[screenKey], "components.breakUpDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, "components.breakUpDialog", "props.open", !toggle));
};
var getDialogButton = exports.getDialogButton = function getDialogButton(name, key, screenKey) {
  return {
    componentPath: "Button",
    props: {
      color: "primary",
      style: {}
    },
    children: {
      previousButtonLabel: (0, _utils.getLabel)({
        labelName: name,
        labelKey: key
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        showHideBreakupPopup(state, dispatch, screenKey);
      }
      //visible: false
    } };
};

var getAllBillingSlabs = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(tenantId) {
    var payload;
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            _context15.next = 2;
            return (0, _api.httpRequest)("post", "/tl-calculator/billingslab/_search?tenantId=" + tenantId, "_search", [], {});

          case 2:
            payload = _context15.sent;
            return _context15.abrupt("return", payload);

          case 4:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function getAllBillingSlabs(_x38) {
    return _ref17.apply(this, arguments);
  };
}();

var getAllDataFromBillingSlab = exports.getAllDataFromBillingSlab = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(tenantId, dispatch) {
    var payload, processedData, accessories, structureTypes, licenseTypes;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            _context16.next = 2;
            return getAllBillingSlabs(tenantId);

          case 2:
            payload = _context16.sent;
            processedData = payload.billingSlab && payload.billingSlab.reduce(function (acc, item) {
              var accessory = { active: true };
              var tradeType = { active: true };
              if (item.accessoryCategory && item.tradeType === null) {
                accessory.code = item.accessoryCategory;
                accessory.uom = item.uom;
                accessory.rate = item.rate;
                item.rate && item.rate > 0 && acc.accessories.push(accessory);
              } else if (item.accessoryCategory === null && item.tradeType) {
                tradeType.code = item.tradeType;
                tradeType.uom = item.uom;
                tradeType.structureType = item.structureType;
                tradeType.licenseType = item.licenseType;
                tradeType.rate = item.rate;
                !(0, _isUndefined2.default)(item.rate) && item.rate !== null && acc.tradeTypeData.push(tradeType);
              }
              return acc;
            }, { accessories: [], tradeTypeData: [] });
            accessories = getUniqueItemsFromArray(processedData.accessories, "code");
            structureTypes = getUniqueItemsFromArray(processedData.tradeTypeData, "structureType");

            structureTypes = commonTransform({
              StructureType: structureTypes.map(function (item) {
                return { code: item.structureType, active: true };
              })
            }, "StructureType");
            licenseTypes = getUniqueItemsFromArray(processedData.tradeTypeData, "licenseType");

            licenseTypes = licenseTypes.map(function (item) {
              return { code: item.licenseType, active: true };
            });
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.common-masters.StructureType", structureTypes.StructureType));
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.AccessoriesCategory", accessories));
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.licenseType", licenseTypes));
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.common-masters.StructureTypeTransformed", objectToDropdown(structureTypes.StructureType)));
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeType", processedData.tradeTypeData));

          case 14:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function getAllDataFromBillingSlab(_x39, _x40) {
    return _ref18.apply(this, arguments);
  };
}();

var getUniqueItemsFromArray = exports.getUniqueItemsFromArray = function getUniqueItemsFromArray(data, identifier) {
  var uniqueArray = [];
  var map = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = data[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      if (!map.has(item[identifier])) {
        map.set(item[identifier], true); // set any value to Map
        uniqueArray.push(item);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return uniqueArray;
};

var setFilteredTradeTypes = exports.setFilteredTradeTypes = function setFilteredTradeTypes(state, dispatch, licenseType, structureSubtype) {
  var tradeTypeBSlab = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.TradeLicense.TradeType", []);
  var mdmsTradeTypes = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.TradeLicense.MdmsTradeType", []);
  try {
    if (tradeTypeBSlab.length > 0 && mdmsTradeTypes.length > 0) {
      var mdmsTTTransformed = mdmsTradeTypes.reduce(function (acc, item) {
        item.code && (acc[item.code] = item);
        return acc;
      }, {});
      var tradeTypeList = [];
      tradeTypeBSlab.length > 0 && tradeTypeBSlab.forEach(function (item) {
        if (item.code && mdmsTTTransformed[item.code] && mdmsTTTransformed[item.code].applicationDocument) {
          tradeTypeList.push((0, _extends3.default)({}, item, {
            applicationDocument: mdmsTTTransformed[item.code].applicationDocument
          }));
        }
      });
      if (tradeTypeList && tradeTypeList.length > 0) {
        var filteredList = tradeTypeList && tradeTypeList.length > 0 && tradeTypeList.filter(function (item) {
          if (item.licenseType === licenseType && item.structureType === structureSubtype) return true;
        });
        var tradeTypeTransformed = commonTransform({ TradeType: [].concat((0, _toConsumableArray3.default)(filteredList)) }, "TradeType");
        dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.filteredTradeTypeTree", tradeTypeTransformed.TradeType));
        // tradeTypeTransformed.TradeType &&
        //   dispatch(
        //     prepareFinalObject(
        //       "applyScreenMdmsData.TradeLicense.TradeType",
        //       tradeTypeTransformed.TradeType
        //     )
        //   );
        return tradeTypeTransformed;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

var showCityPicker = exports.showCityPicker = function showCityPicker(state, dispatch) {
  var ocCityPicker = (0, _get2.default)(state.screenConfiguration.screenConfig, "home.components.cityPickerDialogForOC.props.open", false);
  if (ocCityPicker) {
    var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["home"], "components.cityPickerDialogForOC.props.open", false);
    dispatch((0, _actions2.handleScreenConfigurationFieldChange)("home", "components.cityPickerDialogForOC", "props.open", !toggle));
  } else {
    var _toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["home"], "components.cityPickerDialog.props.open", false);
    dispatch((0, _actions2.handleScreenConfigurationFieldChange)("home", "components.cityPickerDialog", "props.open", !_toggle));
  }
};
/*
export const applyForm = (state, dispatch) => {
  const tenantId = get(
    state.screenConfiguration.preparedFinalObject,
    "citiesByModule.citizenTenantId"
  );

  const isTradeDetailsValid = validateFields(
    "components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children",
    state,
    dispatch,
    "home"
  );

  if (isTradeDetailsValid) {
    window.location.href =
      process.env.NODE_ENV === "production"
        ? `/citizen/tradelicense-citizen/apply?tenantId=${tenantId}`
        : process.env.REACT_APP_SELF_RUNNING === true
        ? `/egov-ui-framework/tradelicense-citizen/apply?tenantId=${tenantId}`
        : `/tradelicense-citizen/apply?tenantId=${tenantId}`;
  }
};
*/
var sortByEpoch = exports.sortByEpoch = function sortByEpoch(data, order) {
  if (order) {
    return data.sort(function (a, b) {
      return a[a.length - 1] - b[b.length - 1];
    });
  } else {
    return data.sort(function (a, b) {
      return b[b.length - 1] - a[a.length - 1];
    });
  }
};

var getEpochForDate = exports.getEpochForDate = function getEpochForDate(date) {
  var dateSplit = date.split("/");
  return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]).getTime();
};

var getLicenseeTypeDropdownData = exports.getLicenseeTypeDropdownData = function getLicenseeTypeDropdownData(tradeTypes) {
  var tt = [];
  var tradeTypesFiltered = [];
  tradeTypes.forEach(function (tradeType) {
    if (tt.indexOf(tradeType.code.split(".")[0]) == -1) {
      tradeTypesFiltered.push({
        code: tradeType.code.split(".")[0],
        active: true
      });
      tt.push(tradeType.code.split(".")[0]);
    }
  });
  return tradeTypesFiltered;
};

var setLicenseeSubTypeDropdownData = exports.setLicenseeSubTypeDropdownData = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(actionValue, state, dispatch) {
    var tradeTypes, licenceType, selectedTradeType, filterdTradeTypes;
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            tradeTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType", []);
            // dispatch(
            //   prepareFinalObject(
            //     "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
            //     null
            //   )
            // );

            licenceType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType");

            if (licenceType) {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container2.children.licenseeSubType", "props.value", null));
            }

            selectedTradeType = actionValue;
            filterdTradeTypes = [];

            filterdTradeTypes = tradeTypes.filter(function (tradeType) {
              return tradeType.code.split(".")[0] == selectedTradeType && tradeType.code.split(".")[1];
            });
            if (filterdTradeTypes.length == 0) {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container2.children.licenseeSubType", "props.disabled", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container2.children.licenseeSubType", "required", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container2.children.licenseeSubType", "visible", false));

              dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType", selectedTradeType));
            } else {
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container2.children.licenseeSubType", "props.disabled", false));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container2.children.licenseeSubType", "required", true));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container2.children.licenseeSubType", "visible", false));
            }
            dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.tradeSubType", filterdTradeTypes));

          case 8:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function setLicenseeSubTypeDropdownData(_x41, _x42, _x43) {
    return _ref19.apply(this, arguments);
  };
}();

var fillOldLicenseData = exports.fillOldLicenseData = function () {
  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(state, dispatch) {
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            dispatch((0, _actions2.initScreen)("apply", (0, _get2.default)(state.screenConfiguration, "screenConfig.apply", {})));

          case 1:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function fillOldLicenseData(_x44, _x45) {
    return _ref20.apply(this, arguments);
  };
}();

var getTextToLocalMapping = exports.getTextToLocalMapping = function getTextToLocalMapping(label) {
  var localisationLabels = (0, _commons.getTransformedLocalStorgaeLabels)();
  switch (label) {
    case "Application No":
      return (0, _commons.getLocaleLabels)("Application No", "BPA_COMMON_TABLE_COL_APP_NO", localisationLabels);

    case "License No":
      return (0, _commons.getLocaleLabels)("License No", "TL_COMMON_TABLE_COL_LIC_NO", localisationLabels);

    case "Trade Name":
      return (0, _commons.getLocaleLabels)("Trade Name", "TL_COMMON_TABLE_COL_TRD_NAME", localisationLabels);
    case "Owner Name":
      return (0, _commons.getLocaleLabels)("Assigned To", "BPA_COMMON_TABLE_COL_ASSIGN_TO", localisationLabels);

    case "Application Date":
      return (0, _commons.getLocaleLabels)("Application Date", "TL_COMMON_TABLE_COL_APP_DATE", localisationLabels);

    case "Status":
      return (0, _commons.getLocaleLabels)("Status", "TL_COMMON_TABLE_COL_STATUS", localisationLabels);

    case "Applicant Name":
      return (0, _commons.getLocaleLabels)("Applicant Name", "BPA_COMMON_TABLE_COL_APP_NAME", localisationLabels);

    case "Licensee Type":
      return (0, _commons.getLocaleLabels)("Licensee Type", "BPA_COMMON_TABLE_COL_LICENSEE_TYPE", localisationLabels);

    case "INITIATED":
      return (0, _commons.getLocaleLabels)("Initiated,", "WF_BPA_INITIATED", localisationLabels);
    case "APPLIED":
      return (0, _commons.getLocaleLabels)("Applied", "TL_APPLIED", localisationLabels);
    case "PAID":
      return (0, _commons.getLocaleLabels)("Paid", "WF_ARCHITECT_PENDINGAPPROVAL", localisationLabels);
    case "PENDINGDOCVERIFICATION":
      return (0, _commons.getLocaleLabels)("Pending for Document Verification", "WF_ARCHITECT_PENDINGDOCVERIFICATION", localisationLabels);
    case "APPROVED":
      return (0, _commons.getLocaleLabels)("Approved", "WF_BPA_APPROVED", localisationLabels);
    case "REJECTED":
      return (0, _commons.getLocaleLabels)("Rejected", "WF_BPA_REJECTED", localisationLabels);
    case "CANCELLED":
      return (0, _commons.getLocaleLabels)("Cancelled", "WF_BPA_CANCELLED", localisationLabels);
    case "PENDINGAPPROVAL":
      return (0, _commons.getLocaleLabels)("Pending for Approval", "WF_ARCHITECT_PENDINGAPPROVAL", localisationLabels);
    case "PENDINGPAYMENT":
      return (0, _commons.getLocaleLabels)("Pending payment", "WF_ARCHITECT_PENDINGPAYMENT", localisationLabels);

    case "FIELDINSPECTION":
      return (0, _commons.getLocaleLabels)("Pending for Field Inspection", "WF_ARCHITECT_FIELDINSPECTION", localisationLabels);

    case "Search Results for Stakeholder Registration Applications":
      return (0, _commons.getLocaleLabels)("", "BPA_HOME_SEARCH_RESULTS_TABLE_HEADING", localisationLabels);

    case "MY_APPLICATIONS":
      return (0, _commons.getLocaleLabels)("My Applications", "TL_MY_APPLICATIONS", localisationLabels);

    case "Floor Description":
      return (0, _commons.getLocaleLabels)("Floor Description", "BPA_COMMON_TABLE_COL_FLOOR_DES", localisationLabels);

    case "Occupancy/Sub Occupancy":
      return (0, _commons.getLocaleLabels)("Occupancy/Sub Occupancy", "BPA_COMMON_TABLE_COL_OCCUP", localisationLabels);

    case "Buildup Area":
      return (0, _commons.getLocaleLabels)("Buildup Area", "BPA_COMMON_TABLE_COL_BUILD_AREA", localisationLabels);

    case "Floor Area":
      return (0, _commons.getLocaleLabels)("Floor Area", "BPA_COMMON_TABLE_COL_FLOOR_AREA", localisationLabels);

    case "Carpet Area":
      return (0, _commons.getLocaleLabels)("Carpet Area", "BPA_COMMON_TABLE_COL_CARPET_AREA", localisationLabels);

    case "DOCUMENTVERIFY":
      return (0, _commons.getLocaleLabels)("Pending for Document Verification", "WF_FIRENOC_DOCUMENTVERIFY", localisationLabels);

    case "Search Results for BPA Applications":
      return (0, _commons.getLocaleLabels)("Search Results for BPA Applications", "BPA_HOME_SEARCH_RESULTS_TABLE_HEADING", localisationLabels);
    case "DOC_VERIFICATION_PENDING":
      return (0, _commons.getLocaleLabels)("Pending for Document Verification", "WF_BPA_DOC_VERIFICATION_PENDING", localisationLabels);

    case "PENDING_APPL_FEE_PAYMENT":
      return (0, _commons.getLocaleLabels)("Pending for Document Verification", "WF_BPA_PENDING_APPL_FEE_PAYMENT", localisationLabels);

    default:
      return (0, _commons.getLocaleLabels)(label, label, localisationLabels);
  }
};

var addressDestruct = exports.addressDestruct = function addressDestruct(action, state, dispatch) {
  var ownerData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners[0]");
  var permanentAddress = ownerData.permanentAddress,
      permanentCity = ownerData.permanentCity,
      permanentPinCode = ownerData.permanentPinCode;

  var doorNo = permanentAddress.split(",")[0] || null;
  var buildingName = permanentAddress.split(",")[1] || null;
  var street = permanentAddress.split(",")[2] || null;
  var landmark = permanentAddress.split(",")[3] || null;
  var cityfield = permanentAddress.split(",")[4] || null;
  var address = {
    doorNo: doorNo,
    buildingName: buildingName,
    street: street,
    landmark: landmark,
    city: cityfield,
    pincode: permanentPinCode
  };

  dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].userData.address", address));
};

var setOrganizationVisibility = exports.setOrganizationVisibility = function setOrganizationVisibility(action, state, dispatch, ownerShipType) {
  dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.subOwnerShipCategory", ownerShipType));
  var componentPathToHide = ["components.div.children.formwizardFirstStep.children.organizationDetails", "components.div.children.formwizardThirdStep.children.tradeReviewDetails.children.cardContent.children.reviewOrganizationDetails"];
  componentPathToHide && componentPathToHide.map(function (item) {
    (0, _set2.default)(action.screenConfig, item + ".visible", ownerShipType != "INDIVIDUAL");
  });
};

var checkValueForNA = exports.checkValueForNA = function checkValueForNA(value) {
  return value ? value : "NA";
};

var setMobileNoField = exports.setMobileNoField = function setMobileNoField(action, state, dispatch) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var mobileNumber = userInfo.mobileNumber;

  if (mobileNumber) {
    dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners[0].mobileNumber", mobileNumber));
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardSecondStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.getOwnerMobNoField.props.disabled", true);
  }
};

var gotoApplyWithStep = exports.gotoApplyWithStep = function gotoApplyWithStep(state, dispatch, step) {
  var applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
  var applicationNumberQueryString = applicationNumber ? "&applicationNumber=" + applicationNumber : "";
  var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.address.city");
  var ownershipCategory = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.ownershipCategory");
  if (ownershipCategory) {
    var ownerShipMajorType = dispatch((0, _actions2.prepareFinalObject)("BPA.landInfo.ownerShipMajorType", ownershipCategory.split('.')[0]));
  }
  var tenantIdQueryString = tenantId ? "&tenantId=" + tenantId : "";
  var applyUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/egov-bpa/apply?step=" + step + applicationNumberQueryString + tenantIdQueryString : "/egov-bpa/apply?step=" + step + applicationNumberQueryString + tenantIdQueryString;
  dispatch((0, _actions.setRoute)(applyUrl));
};

var showHideAdhocPopup = exports.showHideAdhocPopup = function showHideAdhocPopup(state, dispatch, screenKey) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig[screenKey], "components.adhocDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)(screenKey, "components.adhocDialog", "props.open", !toggle));
};

var getCommonGrayCard = exports.getCommonGrayCard = function getCommonGrayCard(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    children: {
      body: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        children: {
          ch1: (0, _utils.getCommonCard)(children, {
            style: {
              backgroundColor: "rgb(242, 242, 242)",
              boxShadow: "none",
              borderRadius: 0,
              overflow: "visible"
            }
          })
        },
        gridDefination: {
          xs: 12
        }
      }
    },
    gridDefination: {
      xs: 12
    }
  };
};

var getLabelOnlyValue = exports.getLabelOnlyValue = function getLabelOnlyValue(value) {
  var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 6,
      sm: 4
    },
    props: (0, _extends3.default)({
      style: {
        marginBottom: "16px"
      }
    }, props),
    children: {
      value: (0, _utils.getCommonCaption)(value)
    }
  };
};

var getBpaDetailsForOwner = exports.getBpaDetailsForOwner = function () {
  var _ref21 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee19(state, dispatch, fieldInfo) {
    var cardIndex, ownerNo, owners, tenantId, oldOwnersArr, matchingOwnerIndex, ownerTenatID, userTenantId, payload, userInfo, currOwnersArr, ownershipCategory, relationship;
    return _regenerator2.default.wrap(function _callee19$(_context19) {
      while (1) {
        switch (_context19.prev = _context19.next) {
          case 0:
            _context19.prev = 0;
            cardIndex = fieldInfo && fieldInfo.index ? fieldInfo.index : "0";
            ownerNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.owners[" + cardIndex + "].mobileNumber", "");

            if (ownerNo.match((0, _utils.getPattern)("MobileNo"))) {
              _context19.next = 6;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Incorrect Number!",
              labelKey: "ERR_MOBILE_NUMBER_INCORRECT"
            }, "error"));
            return _context19.abrupt("return");

          case 6:
            owners = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.owners", []);
            tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.address.city") || (0, _commons.getQueryArg)(window.location.href, "tenantId") || (0, _localStorageUtils.getTenantId)();
            //owners from search call before modification.

            oldOwnersArr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.owners", []);
            //Same no search on Same index

            if (!(ownerNo === owners[cardIndex].userName)) {
              _context19.next = 12;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Owner has been added already!",
              labelKey: "ERR_OWNER_ALREADY_ADDED_TOGGLE_MSG"
            }, "error"));
            return _context19.abrupt("return");

          case 12:

            //Same no search in whole array
            matchingOwnerIndex = owners.findIndex(function (item) {
              return item.userName === ownerNo;
            });

            if (!(matchingOwnerIndex > -1)) {
              _context19.next = 18;
              break;
            }

            if (!(0, _isUndefined2.default)(owners[matchingOwnerIndex].userActive) && owners[matchingOwnerIndex].userActive === false) {
              //rearrange
              dispatch((0, _actions2.prepareFinalObject)("BPA.landInfo.owners[" + matchingOwnerIndex + "].userActive", true));
              dispatch((0, _actions2.prepareFinalObject)("BPA.landInfo.owners[" + cardIndex + "].userActive", false));
              //Delete if current card was not part of oldOwners array - no need to save.
              if (oldOwnersArr.findIndex(function (item) {
                return owners[cardIndex].userName === item.userName;
              }) == -1) {
                owners.splice(cardIndex, 1);
                dispatch((0, _actions2.prepareFinalObject)("BPA.landInfo.owners", owners));
              }
            } else {
              dispatch((0, _actions2.toggleSnackbar)(true, {
                labelName: "Owner already added!",
                labelKey: "ERR_OWNER_ALREADY_ADDED_1"
              }, "error"));
            }
            return _context19.abrupt("return");

          case 18:
            //New number search only

            ownerTenatID = (0, _localStorageUtils.getTenantId)(), userTenantId = void 0;

            if (ownerTenatID && ownerTenatID.split(".") && ownerTenatID.split(".").length > 0) userTenantId = ownerTenatID.split(".")[0];
            _context19.next = 22;
            return (0, _api.httpRequest)("post", "/user/_search?tenantId=" + tenantId, "_search", [], {
              tenantId: userTenantId ? userTenantId : (0, _localStorageUtils.getTenantId)(),
              userName: "" + ownerNo
            });

          case 22:
            payload = _context19.sent;

            if (payload && payload.user && payload.user.hasOwnProperty("length")) {
              if (payload.user.length === 0) {
                dispatch((0, _actions2.toggleSnackbar)(true, {
                  labelName: "This mobile number is not registered!",
                  labelKey: "ERR_MOBILE_NUMBER_NOT_REGISTERED"
                }, "info"));
              } else {
                userInfo = payload.user && payload.user[0] && JSON.parse(JSON.stringify(payload.user[0]));

                if (userInfo && userInfo.createdDate) {
                  userInfo.createdDate = convertDateTimeToEpoch(userInfo.createdDate);
                  userInfo.lastModifiedDate = convertDateTimeToEpoch(userInfo.lastModifiedDate);
                  userInfo.pwdExpiryDate = convertDateTimeToEpoch(userInfo.pwdExpiryDate);
                }
                currOwnersArr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.owners", []);
                ownershipCategory = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.ownershipCategory");

                if (ownershipCategory && ownershipCategory == "INDIVIDUAL.SINGLEOWNER") {
                  userInfo.isPrimaryOwner = true;
                }
                relationship = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.owners[" + cardIndex + "].relationship");

                if (relationship) {
                  userInfo.relationship = relationship;
                }

                currOwnersArr[cardIndex] = userInfo;
                dispatch((0, _actions2.prepareFinalObject)("BPA.landInfo.owners", currOwnersArr));
              }
            }

          case 24:
            _context19.next = 29;
            break;

          case 26:
            _context19.prev = 26;
            _context19.t0 = _context19["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context19.t0.message, labelKey: _context19.t0.message }, "info"));

          case 29:
          case "end":
            return _context19.stop();
        }
      }
    }, _callee19, undefined, [[0, 26]]);
  }));

  return function getBpaDetailsForOwner(_x47, _x48, _x49) {
    return _ref21.apply(this, arguments);
  };
}();

var edcrDetailsToBpaDetails = exports.edcrDetailsToBpaDetails = function edcrDetailsToBpaDetails(state, dispatch) {
  getRiskType(state, dispatch);
  var path = window.location.href.includes("oc-bpa");
  var scrutinytype = path ? "ocScrutinyDetails" : "scrutinyDetails";

  var applicationType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, scrutinytype + ".appliactionType") || "BUILDING_PLAN_SCRUTINY";

  var serviceType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, scrutinytype + ".applicationSubType") || "NEW_CONSTRUCTION";

  dispatch((0, _actions2.prepareFinalObject)("BPA.applicationType", applicationType));
  dispatch((0, _actions2.prepareFinalObject)("BPA.serviceType", serviceType));
};

var getRiskType = exports.getRiskType = function getRiskType(state, dispatch, forBPA) {
  var path = window.location.href.includes("oc-bpa");
  if (forBPA) {
    path = false;
  }
  var scrutinytype = path ? "ocScrutinyDetails" : "scrutinyDetails";
  var occupancyType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, scrutinytype + ".planDetail.virtualBuilding.occupancyTypes[0].type.name");
  var plotArea = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, scrutinytype + ".planDetail.plot.area");
  var buildingBlocks = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, scrutinytype + ".planDetail.blocks");
  var blocks = buildingBlocks.map(function (item) {
    return item && item.building && item.building.buildingHeight;
  });
  var buildingHeight = Math.max(blocks);
  var riskType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.BPA.RiskTypeComputation");
  var block = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, scrutinytype + ".planDetail.blocks[0].building.occupancies[0].typeHelper.type", []);
  // dispatch(prepareFinalObject("BPA.blocks", [block]));
  var scrutinyRiskType = void 0;
  if (plotArea < riskType[2].toPlotArea && buildingHeight < riskType[2].toBuildingHeight) {
    scrutinyRiskType = "LOW";
  } else if (plotArea >= riskType[1].fromPlotArea && plotArea <= riskType[1].toPlotArea || buildingHeight >= riskType[1].fromBuildingHeight && buildingHeight <= riskType[1].toBuildingHeight) {
    scrutinyRiskType = "MEDIUM";
  } else if (plotArea > riskType[0].fromPlotArea || buildingHeight >= riskType[0].fromBuildingHeight) {
    scrutinyRiskType = "HIGH";
  }
  // if(scrutinyRiskType === "LOW"){
  //   const tenantId = getQueryArg(window.location.href, "tenantId");
  //   const queryObject = [
  //     { key: "tenantId", value: tenantId },
  //     { key: "businessServices", value: "BPA_LOW" }
  //   ];
  //   setBusinessServiceDataToLocalStorage(queryObject, dispatch);
  // }

  dispatch((0, _actions2.prepareFinalObject)("BPA.riskType", scrutinyRiskType));
  return scrutinyRiskType;
};

var residentialType = exports.residentialType = function residentialType(state, dispatch) {
  var resType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.BPA.OccupancyType[0].code");
  if (resType) {
    dispatch((0, _actions2.prepareFinalObject)("BPA.occupancyType", resType));
  }
};

var licenceType = exports.licenceType = function () {
  var _ref22 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee20(state, dispatch) {
    var tradeTypes, userInfo, roles, numberOfRoles, tradeTypesCode, filteredRoles, onlyUnique, unique;
    return _regenerator2.default.wrap(function _callee20$(_context20) {
      while (1) {
        switch (_context20.prev = _context20.next) {
          case 0:
            onlyUnique = function onlyUnique(value, index, self) {
              return self.indexOf(value) === index;
            };

            tradeTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType", []);
            userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
            roles = userInfo.roles;
            numberOfRoles = [];

            roles.forEach(function (role) {
              numberOfRoles.push(role.code.split('_')[1]);
            });
            tradeTypesCode = [];

            tradeTypes.forEach(function (type) {
              tradeTypesCode.push(type.code.split('.')[0]);
            });
            filteredRoles = [];

            numberOfRoles.forEach(function (fRole) {
              tradeTypesCode.forEach(function (fcode) {
                if (fRole === fcode) {
                  filteredRoles.push({ code: fRole });
                }
              });
            });
            unique = filteredRoles.filter(onlyUnique);

            if (unique && unique.length > 1) {
              dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.licenceTypes", unique));
            }

          case 12:
          case "end":
            return _context20.stop();
        }
      }
    }, _callee20, undefined);
  }));

  return function licenceType(_x50, _x51) {
    return _ref22.apply(this, arguments);
  };
}();

var getScrutinyDetails = exports.getScrutinyDetails = function () {
  var _ref23 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee21(state, dispatch, fieldInfo) {
    var scrutinyNo, tenantId, payload, queryObject, bpaSearch, isData, scrutinyData, _tenantId, id, _city, currOwnersArr, occupancyObj;

    return _regenerator2.default.wrap(function _callee21$(_context21) {
      while (1) {
        switch (_context21.prev = _context21.next) {
          case 0:
            _context21.prev = 0;
            scrutinyNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.edcrNumber", "");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.address.city");

            if (!(!scrutinyNo || !scrutinyNo.match((0, _utils.getPattern)("^[a-zA-Z0-9]*$")))) {
              _context21.next = 6;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Incorrect Scrutiny Number!",
              labelKey: "BPA_INCORRECT_SCRUTINY_NUMBER"
            }, "error"));
            return _context21.abrupt("return");

          case 6:
            _context21.next = 8;
            return (0, _api.edcrHttpRequest)("post", "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + scrutinyNo + "&tenantId=" + tenantId, {});

          case 8:
            payload = _context21.sent;
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "edcrNumber",
              value: scrutinyNo
            }];
            _context21.next = 12;
            return (0, _api.httpRequest)("post", "bpa-services/v1/bpa/_search", "", queryObject);

          case 12:
            bpaSearch = _context21.sent;
            isData = true;

            bpaSearch.BPA && bpaSearch.BPA.length > 0 && bpaSearch.BPA.forEach(function (data, index) {
              if (data.edcrNumber === scrutinyNo && data.status != "REJECTED" && data.status != "PERMIT REVOCATION") {
                dispatch((0, _actions2.toggleSnackbar)(true, {
                  labelName: "Application Number already exists",
                  labelKey: "APPLICATION_NUMBER_ALREADY_EXISTS"
                }, "error"));
                isData = false;
              }
            });

            if (!isData) {
              _context21.next = 43;
              break;
            }

            payload = payload.edcrDetail;

            if (!(payload && payload.hasOwnProperty("length"))) {
              _context21.next = 43;
              break;
            }

            if (!(payload.length === 0)) {
              _context21.next = 22;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "This scrutiny number is not registered!",
              labelKey: "ERR_SCRUTINY_NUMBER_NOT_REGISTERED"
            }, "info"));
            _context21.next = 43;
            break;

          case 22:
            scrutinyData = payload && JSON.parse(JSON.stringify(payload));

            if (scrutinyData && scrutinyData.planDetail && scrutinyData.planDetail.applicationDate) {
              scrutinyData.planDetail.applicationDate = convertDateTimeToEpoch(scrutinyData.planDetail.applicationDate);
              scrutinyData.lastModifiedDate = convertDateTimeToEpoch(scrutinyData.lastModifiedDate);
              scrutinyData.pwdExpiryDate = convertDateTimeToEpoch(scrutinyData.pwdExpiryDate);
            }

            _tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.landInfo.address.city");
            id = _tenantId.split('.')[1];
            _city = scrutinyData[0].tenantId;

            if (!(_tenantId === _city)) {
              _context21.next = 42;
              break;
            }

            currOwnersArr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "scrutinyDetails", []);

            currOwnersArr = scrutinyData[0];
            dispatch((0, _actions2.prepareFinalObject)("scrutinyDetails", currOwnersArr));
            occupancyObj = (0, _get2.default)(currOwnersArr, "planDetail.occupancies[0].typeHelper.type", {});

            dispatch((0, _actions2.prepareFinalObject)("BPA.OccupanciesList", [occupancyObj]));
            dispatch((0, _actions2.prepareFinalObject)("scrutinyDetails.planDetail.planInformation.occupancies", occupancyObj.code));
            // await riskType(state, dispatch);
            _context21.next = 36;
            return edcrDetailsToBpaDetails(state, dispatch);

          case 36:
            _context21.next = 38;
            return residentialType(state, dispatch);

          case 38:
            _context21.next = 40;
            return licenceType(state, dispatch);

          case 40:
            _context21.next = 43;
            break;

          case 42:
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Scrutiny number " + scrutinyNo + " is from " + _city,
              labelKey: "Scrutiny number " + scrutinyNo + " is from " + _city
            }, "error"));

          case 43:
            _context21.next = 48;
            break;

          case 45:
            _context21.prev = 45;
            _context21.t0 = _context21["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context21.t0.message, labelKey: _context21.t0.message }, "info"));

          case 48:
          case "end":
            return _context21.stop();
        }
      }
    }, _callee21, undefined, [[0, 45]]);
  }));

  return function getScrutinyDetails(_x52, _x53, _x54) {
    return _ref23.apply(this, arguments);
  };
}();

// export const getMdmsData = async queryObject => {
//   try {
//     const response = await httpRequest(
//       "post",
//       "egov-mdms-service/v1/_get",
//       "",
//       queryObject
//     );
//     return response;
//   } catch (error) {
//     console.log(error);
//     return {};
//   }
// };

// Get user data from uuid API call

var searchBill = exports.searchBill = function () {
  var _ref24 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee22(dispatch, applicationNumber, tenantId) {
    var queryObject, payload, response, billData, estimateData;
    return _regenerator2.default.wrap(function _callee22$(_context22) {
      while (1) {
        switch (_context22.prev = _context22.next) {
          case 0:
            _context22.prev = 0;
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCodes",
              value: applicationNumber
            }];

            // Get Receipt

            _context22.next = 4;
            return (0, _api.httpRequest)("post", "/collection-services/payments/_search", "", queryObject);

          case 4:
            payload = _context22.sent;
            _context22.next = 7;
            return getBill([{
              key: "tenantId",
              value: tenantId
            }, {
              key: "applicationNumber",
              value: applicationNumber
            }]);

          case 7:
            response = _context22.sent;


            // If pending payment then get bill else get receipt
            billData = (0, _get2.default)(payload, "Receipt[0].Bill") || (0, _get2.default)(response, "Bill");


            if (billData) {
              dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill", billData));
              estimateData = createEstimateData(billData[0]);

              estimateData && estimateData.length && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.estimateCardData", estimateData));
            }
            _context22.next = 15;
            break;

          case 12:
            _context22.prev = 12;
            _context22.t0 = _context22["catch"](0);

            console.log(_context22.t0);

          case 15:
          case "end":
            return _context22.stop();
        }
      }
    }, _callee22, undefined, [[0, 12]]);
  }));

  return function searchBill(_x55, _x56, _x57) {
    return _ref24.apply(this, arguments);
  };
}();

// export const createEstimateData = billObject => {
//   const billDetails = billObject && billObject.billDetails;
//   let fees =
//     billDetails &&
//     billDetails[0].billAccountDetails &&
//     billDetails[0].billAccountDetails.map(item => {
//       return {
//         name: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode },
//         value: item.amount,
//         info: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode }
//       };
//     });
//   return fees;
// };

var generateBillForBPA = exports.generateBillForBPA = function () {
  var _ref25 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee23(dispatch, applicationNumber, tenantId, businessService) {
    var queryObj, payload, estimateData;
    return _regenerator2.default.wrap(function _callee23$(_context23) {
      while (1) {
        switch (_context23.prev = _context23.next) {
          case 0:
            _context23.prev = 0;

            if (!(applicationNumber && tenantId)) {
              _context23.next = 7;
              break;
            }

            queryObj = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "consumerCode",
              value: applicationNumber
            }, { key: "businessService", value: businessService }];
            _context23.next = 5;
            return createBill(queryObj, dispatch);

          case 5:
            payload = _context23.sent;

            if (payload && payload.Bill[0]) {
              dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill", payload.Bill));
              estimateData = createBpaEstimateData(payload.Bill[0]);

              estimateData && estimateData.length && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.estimateCardData", estimateData));
            }

          case 7:
            _context23.next = 12;
            break;

          case 9:
            _context23.prev = 9;
            _context23.t0 = _context23["catch"](0);

            console.log(_context23.t0);

          case 12:
          case "end":
            return _context23.stop();
        }
      }
    }, _callee23, undefined, [[0, 9]]);
  }));

  return function generateBillForBPA(_x58, _x59, _x60, _x61) {
    return _ref25.apply(this, arguments);
  };
}();

var createBpaEstimateData = exports.createBpaEstimateData = function createBpaEstimateData(billObject) {
  var billDetails = billObject && billObject.billDetails;
  var fees = billDetails && billDetails[0].billAccountDetails && billDetails[0].billAccountDetails.map(function (item) {
    return {
      name: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode },
      value: item.amount,
      info: { labelName: item.taxHeadCode, labelKey: item.taxHeadCode }
    };
  });
  return fees;
};

var generateBill = exports.generateBill = function () {
  var _ref26 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee24(dispatch, applicationNumber, tenantId) {
    var queryObj, payload, estimateData;
    return _regenerator2.default.wrap(function _callee24$(_context24) {
      while (1) {
        switch (_context24.prev = _context24.next) {
          case 0:
            _context24.prev = 0;

            if (!(applicationNumber && tenantId)) {
              _context24.next = 7;
              break;
            }

            queryObj = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "applicationNumber",
              value: applicationNumber
            }];
            _context24.next = 5;
            return getBill(queryObj);

          case 5:
            payload = _context24.sent;

            if (payload && payload.Bill[0]) {
              dispatch((0, _actions2.prepareFinalObject)("ReceiptTemp[0].Bill", payload.Bill));
              estimateData = createEstimateData(payload.Bill[0]);

              estimateData && estimateData.length && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.estimateCardData", estimateData));
            }

          case 7:
            _context24.next = 12;
            break;

          case 9:
            _context24.prev = 9;
            _context24.t0 = _context24["catch"](0);

            console.log(_context24.t0);

          case 12:
          case "end":
            return _context24.stop();
        }
      }
    }, _callee24, undefined, [[0, 9]]);
  }));

  return function generateBill(_x62, _x63, _x64) {
    return _ref26.apply(this, arguments);
  };
}();

var resetFields = exports.resetFields = function resetFields(state, dispatch) {
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.NOCNo", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.applicationNo", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appNOCAndMobNumContainer.children.ownerMobNo", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.applicationNo", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.fromDate", "props.value", ""));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.div.children.NOCApplication.children.cardContent.children.appStatusAndToFromDateContainer.children.toDate", "props.value", ""));
};

// export const getRequiredDocData = async (action, state, dispatch) => {
//   let tenantId =
//     process.env.REACT_APP_NAME === "Citizen" ? "pb.amritsar" : getTenantId();
//   let mdmsBody = {
//     MdmsCriteria: {
//       tenantId: tenantId,
//       moduleDetails: [
//         {
//           moduleName: "BPA",
//           masterDetails: [{ name: "Documents" }]
//         }
//       ]
//     }
//   };
//   try {
//     let payload = null;
//     // payload = await httpRequest(
//     //   "post",
//     //   "/egov-mdms-service/v1/_search",
//     //   "_search",
//     //   [],
//     //   mdmsBody
//     // );
//     dispatch(prepareFinalObject("searchScreenMdmsData", payload.MdmsRes));
//   } catch (e) {
//     console.log(e);
//   }
// };

var getBpaTextToLocalMapping = exports.getBpaTextToLocalMapping = function getBpaTextToLocalMapping(label) {
  var localisationLabels = (0, _commons.getTransformedLocalStorgaeLabels)();
  switch (label) {
    case "Floor Description":
      return (0, _commons.getLocaleLabels)("Floor Description", "BPA_COMMON_TABLE_COL_FLOOR_DES", localisationLabels);
    case "Level":
      return (0, _commons.getLocaleLabels)("Level", "Level",
      // "BPA_COMMON_TABLE_COL_LEVEL",
      localisationLabels);
    case "Occupancy/Sub Occupancy":
      return (0, _commons.getLocaleLabels)("Occupancy/Sub Occupancy", "BPA_COMMON_TABLE_COL_OCCUP", localisationLabels);
    case "Buildup Area":
      return (0, _commons.getLocaleLabels)("Buildup Area", "BPA_COMMON_TABLE_COL_BUILD_AREA", localisationLabels);
    case "Floor Area":
      return (0, _commons.getLocaleLabels)("Floor Area", "BPA_COMMON_TABLE_COL_FLOOR_AREA", localisationLabels);
    case "Carpet Area":
      return (0, _commons.getLocaleLabels)("Carpet Area", "BPA_COMMON_TABLE_COL_CARPET_AREA", localisationLabels);
    case "Application No":
      return (0, _commons.getLocaleLabels)("Application No", "BPA_COMMON_TABLE_COL_APP_NO", localisationLabels);

    case "Owner Name":
      return (0, _commons.getLocaleLabels)("Owner Name", "BPA_COMMON_TABLE_COL_OWN_NAME_LABEL", localisationLabels);

    case "Application Date":
      return (0, _commons.getLocaleLabels)("Application Date", "BPA_COMMON_TABLE_COL_APP_DATE_LABEL", localisationLabels);

    case "Status":
      return (0, _commons.getLocaleLabels)("Status", "BPA_COMMON_TABLE_COL_STATUS_LABEL", localisationLabels);

    case "INITIATED":
      return (0, _commons.getLocaleLabels)("Initiated,", "WF_BPA_INITIATED", localisationLabels);
    case "APPLIED":
      (0, _commons.getLocaleLabels)("Applied", "NOC_APPLIED", localisationLabels);
    case "PAID":
      (0, _commons.getLocaleLabels)("Paid", "WF_NEWTL_PENDINGAPPROVAL", localisationLabels);

    case "APPROVED":
      return (0, _commons.getLocaleLabels)("Approved", "WF_BPA_APPROVED", localisationLabels);
    case "REJECTED":
      return (0, _commons.getLocaleLabels)("Rejected", "WF_BPA_REJECTED", localisationLabels);
    case "PERMIT REVOCATION":
      return (0, _commons.getLocaleLabels)("PERMIT REVOCATION", "WF_BPA_PERMIT REVOCATION", localisationLabels);
    case "CANCELLED":
      return (0, _commons.getLocaleLabels)("Cancelled", "NOC_CANCELLED", localisationLabels);
    case "PENDINGAPPROVAL ":
      return (0, _commons.getLocaleLabels)("Pending for Approval", "WF_BPA_PENDINGAPPROVAL", localisationLabels);
    case "PENDINGPAYMENT":
      return (0, _commons.getLocaleLabels)("Pending payment", "WF_BPA_PENDINGPAYMENT", localisationLabels);
    case "DOCUMENTVERIFY":
      return (0, _commons.getLocaleLabels)("Pending for Document Verification", "WF_BPA_DOCUMENTVERIFY", localisationLabels);
    case "FIELDINSPECTION":
      return (0, _commons.getLocaleLabels)("Pending for Field Inspection", "WF_BPA_FIELDINSPECTION", localisationLabels);

    case "Search Results for BPA Applications":
      return (0, _commons.getLocaleLabels)("Search Results for BPA Applications", "BPA_HOME_SEARCH_RESULTS_TABLE_HEADING", localisationLabels);

    case "MY_APPLICATIONS":
      return (0, _commons.getLocaleLabels)("My Applications", "TL_MY_APPLICATIONS", localisationLabels);
    case "DOC_VERIFICATION_INPROGRESS":
      return (0, _commons.getLocaleLabels)("Doc Verification Inprogress", "WF_BPA_DOC_VERIFICATION_INPROGRESS", localisationLabels);
    case "FIELDINSPECTION_INPROGRESS":
      return (0, _commons.getLocaleLabels)("Field Inspection Inprogress", "WF_BPA_FIELDINSPECTION_INPROGRESS", localisationLabels);
    case "NOC_VERIFICATION_INPROGRESS":
      return (0, _commons.getLocaleLabels)("Noc Verification Inprogress", "WF_BPA_NOC_VERIFICATION_INPROGRESS", localisationLabels);
    case "APPROVAL_INPROGRESS":
      return (0, _commons.getLocaleLabels)("Approval Inprogress", "WF_BPA_APPROVAL_INPROGRESS", localisationLabels);
    case "PENDING_SANC_FEE_PAYMENT":
      return (0, _commons.getLocaleLabels)("Pending Sanc Fee Payment", "WF_BPA_PENDING_SANC_FEE_PAYMENT", localisationLabels);
    case "INPROGRESS":
      return (0, _commons.getLocaleLabels)("Inprogress", "WF_BPA_INPROGRESS", localisationLabels);
    case "PENDING_APPL_FEE":
      return (0, _commons.getLocaleLabels)("Pedding Application Fee", "WF_BPA_PENDING_APPL_FEE", localisationLabels);
    case "CITIZEN_APPROVAL_INPROCESS":
      return (0, _commons.getLocaleLabels)("Inprogress", "WF_BPA_CITIZEN_APPROVAL_INPROCESS", localisationLabels);
    case "PENDING_FEE":
      return (0, _commons.getLocaleLabels)("Pending Fee Payment", "WF_BPA_PENDING_FEE", localisationLabels);
    case "CITIZEN_ACTION_PENDING_AT_DOC_VERIF":
      return (0, _commons.getLocaleLabels)("Send Back From Doc Verification", "WF_BPA_CITIZEN_ACTION_PENDING_AT_DOC_VERIF", localisationLabels);
    case "CITIZEN_ACTION_PENDING_AT_FI_VERIF":
      return (0, _commons.getLocaleLabels)("Send Back From Field Inspection", "WF_BPA_CITIZEN_ACTION_PENDING_AT_FI_VERIF", localisationLabels);
    case "CITIZEN_ACTION_PENDING_AT_NOC_VERIF":
      return (0, _commons.getLocaleLabels)("Send Back From Noc Verification", "WF_BPA_CITIZEN_ACTION_PENDING_AT_NOC_VERIF", localisationLabels);
    case "BPA_COL_APP_STATUS":
      return (0, _commons.getLocaleLabels)("Application Status", "BPA_COL_APP_STATUS", localisationLabels);
    case "BPA_COL_MODULE_SERVICE":
      return (0, _commons.getLocaleLabels)("Module/Service", "BPA_COL_MODULE_SERVICE", localisationLabels);
    case "BPA_COMMON_SLA":
      return (0, _commons.getLocaleLabels)("SLA(Days Remaining)", "BPA_COMMON_SLA", localisationLabels);
    case "BPA_COL_ASSIGNEDTO":
      return (0, _commons.getLocaleLabels)("Assigned To", "BPA_COL_ASSIGNEDTO", localisationLabels);
    case "BPAREG_SERVICE":
      return (0, _commons.getLocaleLabels)("Stake Holder", "BPAREG_SERVICE", localisationLabels);
    case "BPA_APPLY_SERVICE":
      return (0, _commons.getLocaleLabels)("BPA Apply", "BPA_APPLY_SERVICE", localisationLabels);
    case "WF_BPA_BUILDING_PLAN_SCRUTINY":
      return (0, _commons.getLocaleLabels)("Building Plan Scrutiny", "WF_BPA_BUILDING_PLAN_SCRUTINY", localisationLabels);
    case "WF_BPA_BUILDING_OC_PLAN_SCRUTINY":
      return (0, _commons.getLocaleLabels)("Building Plan OC Scrutiny", "WF_BPA_BUILDING_OC_PLAN_SCRUTINY", localisationLabels);
    case "WF_BPA_NEW_CONSTRUCTION":
      return (0, _commons.getLocaleLabels)("New Contruction", "WF_BPA_NEW_CONSTRUCTION", localisationLabels);
  }
};

var showApplyCityPicker = exports.showApplyCityPicker = function showApplyCityPicker(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["search"], "components.cityPickerDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.cityPickerDialog", "props.open", !toggle));
};

var showCitizenApplyCityPicker = exports.showCitizenApplyCityPicker = function showCitizenApplyCityPicker(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["citizen"], "components.cityPickerDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("citizen", "components.cityPickerDialog", "props.open", !toggle));
};

var city = function city(state, dispatch, tenantId) {
  var city = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPAs[0].BPADetails.plotdetails.citytown");
  if (!city) {
    dispatch((0, _actions2.prepareFinalObject)("BPAs[0].BPADetails.plotdetails.citytown", tenantId));
  }
};
var gotoHome = exports.gotoHome = function gotoHome(state, dispatch) {
  showComparisonDialog(state, dispatch);
  dispatch((0, _actions.setRoute)("/"));
};

var applyForm = exports.applyForm = function applyForm(state, dispatch) {
  var tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "citiesByModule.citizenTenantId");

  var ocCityPicker = (0, _get2.default)(state.screenConfiguration.screenConfig, "home.components.cityPickerDialogForOC.props.open", false);
  if (ocCityPicker) {
    var isOcCityValid = validateFields("components.cityPickerDialogForOC.children.dialogContent.children.popup.children.cityPicker.children", state, dispatch, "home");

    if (isOcCityValid) {
      window.location.href = process.env.NODE_ENV === "production" ? "/citizen/oc-bpa/apply?tenantId=" + tenantId : process.env.REACT_APP_SELF_RUNNING === true ? "/egov-ui-framework/oc-bpa/apply?tenantId=" + tenantId : "/oc-bpa/apply?tenantId=" + tenantId;
    };
  } else {
    var isTradeDetailsValid = validateFields("components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children", state, dispatch, "home");

    if (isTradeDetailsValid) {
      window.location.href = process.env.NODE_ENV === "production" ? "/citizen/egov-bpa/apply?tenantId=" + tenantId : process.env.REACT_APP_SELF_RUNNING === true ? "/egov-ui-framework/egov-bpa/apply?tenantId=" + tenantId : "/egov-bpa/apply?tenantId=" + tenantId;
    };
  }

  city(state, dispatch, tenantId);
};

var createBill = exports.createBill = function () {
  var _ref27 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee25(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee25$(_context25) {
      while (1) {
        switch (_context25.prev = _context25.next) {
          case 0:
            _context25.prev = 0;
            _context25.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill", "", queryObject);

          case 3:
            response = _context25.sent;
            return _context25.abrupt("return", response);

          case 7:
            _context25.prev = 7;
            _context25.t0 = _context25["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context25.t0.message, labelKey: _context25.t0.message }, "error"));
            console.log(_context25.t0, "fetxh");

          case 11:
          case "end":
            return _context25.stop();
        }
      }
    }, _callee25, undefined, [[0, 7]]);
  }));

  return function createBill(_x65, _x66) {
    return _ref27.apply(this, arguments);
  };
}();

var setNameOfUser = exports.setNameOfUser = function setNameOfUser(action, state, dispatch) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var name = userInfo.name;

  if (name) {
    dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners[0].name", name));
    (0, _set2.default)(action.screenConfig, "components.div.children.formwizardSecondStep.children.OwnerInfoCard.children.cardContent.children.tradeUnitCardContainer.children.ownerName.props.disabled", true);
  }
};

var getBpaMdmsData = exports.getBpaMdmsData = function () {
  var _ref28 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee26(action, state, dispatch, mdmsBody) {
    var payload;
    return _regenerator2.default.wrap(function _callee26$(_context26) {
      while (1) {
        switch (_context26.prev = _context26.next) {
          case 0:
            _context26.prev = 0;
            _context26.next = 3;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 3:
            payload = _context26.sent;
            return _context26.abrupt("return", payload);

          case 7:
            _context26.prev = 7;
            _context26.t0 = _context26["catch"](0);

            console.log(_context26.t0);

          case 10:
          case "end":
            return _context26.stop();
        }
      }
    }, _callee26, undefined, [[0, 7]]);
  }));

  return function getBpaMdmsData(_x67, _x68, _x69, _x70) {
    return _ref28.apply(this, arguments);
  };
}();

var showHideBpaMapPopup = exports.showHideBpaMapPopup = function showHideBpaMapPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.mapsDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.mapsDialog", "props.open", !toggle));
};

var getBpaMapLocator = exports.getBpaMapLocator = function getBpaMapLocator(textSchema) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "MapLocator",
    props: {}
  };
};

var geBpatDetailsFromProperty = exports.geBpatDetailsFromProperty = function () {
  var _ref29 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee27(state, dispatch) {
    var propertyId, cityId, tenantId, payload;
    return _regenerator2.default.wrap(function _callee27$(_context27) {
      while (1) {
        switch (_context27.prev = _context27.next) {
          case 0:
            _context27.prev = 0;
            propertyId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.propertyId", "");
            cityId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPAs[0].BPADetails.plotdetails.citytown.value", "");
            tenantId = ifUserRoleExists("CITIZEN") ? cityId : (0, _localStorageUtils.getTenantId)();

            if (tenantId) {
              _context27.next = 7;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Please select city to search by property id !!",
              labelKey: "ERR_SELECT_CITY_TO_SEARCH_PROPERTY_ID"
            }, "warning"));
            return _context27.abrupt("return");

          case 7:
            if (!propertyId) {
              _context27.next = 12;
              break;
            }

            _context27.next = 10;
            return (0, _api.httpRequest)("post", "/pt-services-v2/property/_search?tenantId=" + tenantId + "&ids=" + propertyId, "_search", [], {});

          case 10:
            payload = _context27.sent;

            if (payload && payload.Properties && payload.Properties.hasOwnProperty("length")) {
              if (payload.Properties.length === 0) {
                dispatch((0, _actions2.toggleSnackbar)(true, {
                  labelName: "Property is not found with this Property Id",
                  labelKey: "ERR_PROPERTY_NOT_FOUND_WITH_PROPERTY_ID"
                }, "info"));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocPropertyID", "props.value", ""));
              } else {
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.value", {
                  value: payload.Properties[0].address.locality.code,
                  label: payload.Properties[0].address.locality.name
                }));
                dispatch((0, _actions2.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address", payload.Properties[0].address));
                dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.bpaLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.children.cityDropdown", "props.value", payload.Properties[0].address.tenantId));
              }
            }

          case 12:
            _context27.next = 17;
            break;

          case 14:
            _context27.prev = 14;
            _context27.t0 = _context27["catch"](0);

            console.log(_context27.t0);

          case 17:
          case "end":
            return _context27.stop();
        }
      }
    }, _callee27, undefined, [[0, 14]]);
  }));

  return function geBpatDetailsFromProperty(_x71, _x72) {
    return _ref29.apply(this, arguments);
  };
}();

var tenantData = function () {
  var _ref30 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee28(action, state, dispatch) {
    var mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee28$(_context28) {
      while (1) {
        switch (_context28.prev = _context28.next) {
          case 0:
            mdmsBody = {
              MdmsCriteria: {
                tenantId: _common2.default.tenantId,
                moduleDetails: [{
                  moduleName: "tenant",
                  masterDetails: [{ name: "citymodule" }]
                }]
              }
            };
            _context28.prev = 1;
            _context28.next = 4;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 4:
            payload = _context28.sent;
            return _context28.abrupt("return", payload);

          case 8:
            _context28.prev = 8;
            _context28.t0 = _context28["catch"](1);

            console.log(_context28.t0);

          case 11:
          case "end":
            return _context28.stop();
        }
      }
    }, _callee28, undefined, [[1, 8]]);
  }));

  return function tenantData(_x73, _x74, _x75) {
    return _ref30.apply(this, arguments);
  };
}();

var getTenantMdmsData = exports.getTenantMdmsData = function () {
  var _ref31 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee29(action, state, dispatch) {
    var mdmsRes, tenants;
    return _regenerator2.default.wrap(function _callee29$(_context29) {
      while (1) {
        switch (_context29.prev = _context29.next) {
          case 0:
            _context29.next = 2;
            return tenantData(action, state, dispatch);

          case 2:
            mdmsRes = _context29.sent;
            tenants = mdmsRes && mdmsRes.MdmsRes && mdmsRes.MdmsRes.tenant.citymodule.find(function (item) {
              if (item.code === "BPAAPPLY") return true;
            });

            dispatch((0, _actions2.prepareFinalObject)("citiesByModule.TL", tenants));

          case 5:
          case "end":
            return _context29.stop();
        }
      }
    }, _callee29, undefined);
  }));

  return function getTenantMdmsData(_x76, _x77, _x78) {
    return _ref31.apply(this, arguments);
  };
}();

var getMdmsDataForBpa = exports.getMdmsDataForBpa = function () {
  var _ref32 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee30(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee30$(_context30) {
      while (1) {
        switch (_context30.prev = _context30.next) {
          case 0:
            _context30.prev = 0;
            _context30.next = 3;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "", queryObject);

          case 3:
            response = _context30.sent;
            return _context30.abrupt("return", response);

          case 7:
            _context30.prev = 7;
            _context30.t0 = _context30["catch"](0);

            console.log(_context30.t0);
            return _context30.abrupt("return", {});

          case 11:
          case "end":
            return _context30.stop();
        }
      }
    }, _callee30, undefined, [[0, 7]]);
  }));

  return function getMdmsDataForBpa(_x79) {
    return _ref32.apply(this, arguments);
  };
}();

var requiredDocumentsData = exports.requiredDocumentsData = function () {
  var _ref33 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee31(state, dispatch, action) {
    var mdmsData, applicationNumber, tenantId, queryObject, wfPayload, wfState, appState, appWfState, requiredDocuments, appDocuments, documents, requiredDocTypes, proInstance, nextActions, isVisibleTrue, permitList, _riskType, fieldInfoDocs, riskType, checkListConditions;

    return _regenerator2.default.wrap(function _callee31$(_context31) {
      while (1) {
        switch (_context31.prev = _context31.next) {
          case 0:
            _context31.prev = 0;
            mdmsData = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData");
            applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            queryObject = [{ key: "businessIds", value: applicationNumber }, { key: "tenantId", value: tenantId }];
            _context31.next = 7;
            return (0, _api.httpRequest)("post", "egov-workflow-v2/egov-wf/process/_search", "", queryObject);

          case 7:
            wfPayload = _context31.sent;
            wfState = wfPayload.ProcessInstances[0];
            appState = void 0;
            appWfState = wfState.state.state;

            dispatch((0, _actions2.prepareFinalObject)("applicationProcessInstances", (0, _get2.default)(wfPayload, "ProcessInstances[0]")));

            requiredDocuments = void 0, appDocuments = [];

            if (mdmsData && mdmsData.BPA && wfState) {
              documents = mdmsData.BPA.DocTypeMapping;
              requiredDocTypes = void 0;
              // documents.forEach( doc => {
              //   if(doc.WFState === wfState.state.state){

              appState = appWfState;
              //   }
              // });
            };
            proInstance = wfPayload.ProcessInstances[0];
            nextActions = (0, _get2.default)(proInstance, "nextActions");
            isVisibleTrue = false;

            if (nextActions && nextActions.length > 0) isVisibleTrue = true;
            prepareDocumentsView(state, dispatch, action, appState, isVisibleTrue);
            permitList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.additionalDetails.pendingapproval");

            if (permitList && permitList.length > 0) {
              _riskType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.riskType", "");

              if (_riskType && _riskType != "LOW") {
                (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.permitListSummary.visible", true);
                dispatch((0, _actions2.prepareFinalObject)("permitList", permitList));
              }
            }
            if (isVisibleTrue && wfState.state.state == "FIELDINSPECTION_PENDING" && mdmsData && mdmsData.BPA && mdmsData.BPA.CheckList) {
              fieldInfoDocs = mdmsData.BPA.CheckList;

              prepareFieldDocumentsUploadData(state, dispatch, action, fieldInfoDocs, appWfState);
            }
            riskType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.riskType", "");

            if (isVisibleTrue && wfState.state.state == "PENDINGAPPROVAL" && mdmsData && mdmsData.BPA && mdmsData.BPA.CheckList) {
              if (riskType && riskType !== "LOW") {
                checkListConditions = mdmsData.BPA.CheckList;

                prepareapprovalQstns(state, dispatch, action, checkListConditions, appWfState);
              }
            }
            _context31.next = 27;
            return (0, _commons3.prepareNOCUploadData)(state, dispatch);

          case 27:
            _context31.next = 29;
            return prepareNocFinalCards(state, dispatch, isVisibleTrue);

          case 29:
            _context31.next = 34;
            break;

          case 31:
            _context31.prev = 31;
            _context31.t0 = _context31["catch"](0);

            console.log(_context31.t0);

          case 34:
          case "end":
            return _context31.stop();
        }
      }
    }, _callee31, undefined, [[0, 31]]);
  }));

  return function requiredDocumentsData(_x80, _x81, _x82) {
    return _ref33.apply(this, arguments);
  };
}();

var prepareapprovalQstns = function () {
  var _ref34 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee32(state, dispatch, action, checkListConditions, appWfState) {
    var bpaAppDetails, approvalQuastions, approvalConditions, approvalConditionsWithValue;
    return _regenerator2.default.wrap(function _callee32$(_context32) {
      while (1) {
        switch (_context32.prev = _context32.next) {
          case 0:
            bpaAppDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA", {});
            approvalQuastions = [];

            checkListConditions.forEach(function (wfDoc) {
              if (wfDoc.WFState == appWfState && wfDoc.RiskType === bpaAppDetails.riskType && wfDoc.ServiceType === bpaAppDetails.serviceType && wfDoc.applicationType === bpaAppDetails.applicationType) {
                approvalQuastions = wfDoc.conditions;
                (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.permitConditions.visible", true);
              }
            });
            approvalConditions = approvalQuastions;
            approvalConditionsWithValue = [];

            approvalConditions.forEach(function (condtn) {
              approvalConditionsWithValue.push({
                condition: condtn,
                conditionValue: false
              });
            });
            if (approvalConditions && approvalConditions.length > 0) {
              dispatch((0, _actions2.prepareFinalObject)("permitConditions", approvalConditionsWithValue));
            }

          case 7:
          case "end":
            return _context32.stop();
        }
      }
    }, _callee32, undefined);
  }));

  return function prepareapprovalQstns(_x83, _x84, _x85, _x86, _x87) {
    return _ref34.apply(this, arguments);
  };
}();

var prepareFieldDocumentsUploadData = function () {
  var _ref35 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee33(state, dispatch, action, fieldInfoDocs, appWfState) {
    var documentsDropDownValues, appState, bpaAppDetails, fieldInfo, fieldreqDocuments, applyFieldinspectionQstns, checklistSelect, FieldinspectionQstns, documentsList, docList, bpaDocuments, documentsContract, tempDoc, applyFieldinspectionDocument;
    return _regenerator2.default.wrap(function _callee33$(_context33) {
      while (1) {
        switch (_context33.prev = _context33.next) {
          case 0:
            documentsDropDownValues = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType", []);
            appState = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.status", []);
            bpaAppDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA", {});
            fieldInfo = [];

            fieldInfoDocs.forEach(function (wfDoc) {
              if (wfDoc.WFState == appWfState && wfDoc.RiskType === bpaAppDetails.riskType && wfDoc.ServiceType === bpaAppDetails.serviceType && wfDoc.applicationType === bpaAppDetails.applicationType) {
                fieldInfo.push({ "docTypes": wfDoc.docTypes, "questions": wfDoc.questions });
                (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.fieldinspectionSummary.visible", true);
              }
            });

            fieldreqDocuments = fieldInfo[0].docTypes;
            applyFieldinspectionQstns = fieldInfo[0].questions;
            checklistSelect = [];


            if (applyFieldinspectionQstns && applyFieldinspectionQstns.length > 0) {
              checklistSelect = [{ code: applyFieldinspectionQstns[0].fieldType.split("/")[0], label: "BPA_ADD_HOC_CHARGES_POPUP_BUTTON_" + applyFieldinspectionQstns[0].fieldType.split("/")[0] }, { code: applyFieldinspectionQstns[0].fieldType.split("/")[1], label: "BPA_ADD_HOC_CHARGES_POPUP_BUTTON_" + applyFieldinspectionQstns[0].fieldType.split("/")[1] }, { code: applyFieldinspectionQstns[0].fieldType.split("/")[2], label: "BPA_ADD_HOC_CHARGES_POPUP_BUTTON_" + applyFieldinspectionQstns[0].fieldType.split("/")[2] }];

              FieldinspectionQstns = applyFieldinspectionQstns.map(function (v) {
                return {
                  code: v.question, title: v.question, cards: [{
                    name: v.question, code: v.question, required: true, dropDownValues: {
                      label: "BPA_SELECT_LABEL", required: true, menu: checklistSelect
                    }
                  }]
                };
              });


              dispatch((0, _actions2.prepareFinalObject)("FieldinspectionQstns", FieldinspectionQstns));
            }

            if (fieldreqDocuments && fieldreqDocuments.length > 0) {
              documentsList = [];

              fieldreqDocuments.forEach(function (doc) {
                var code = doc.code;
                doc.dropDownValues = [];
                documentsDropDownValues.forEach(function (value) {
                  var values = value.code.slice(0, code.length);
                  if (code === values) {
                    doc.hasDropdown = true;
                    doc.dropDownValues.push(value);
                  }
                });
                documentsList.push(doc);
              });
              docList = documentsList.filter(function (el) {
                return fieldreqDocuments.some(function (f) {
                  return f.code === el.code;
                });
              });
              bpaDocuments = docList;
              documentsContract = [];
              tempDoc = {};


              bpaDocuments.forEach(function (doc) {
                var card = {};
                card["code"] = doc.code.split(".")[0];
                card["title"] = doc.code.split(".")[0];
                card["cards"] = [];
                tempDoc[doc.code.split(".")[0]] = card;
              });
              bpaDocuments.forEach(function (doc) {
                var card = {};
                card["name"] = doc.code;
                card["code"] = doc.code;
                card["required"] = doc.required ? true : false;
                if (doc.hasDropdown && doc.dropDownValues) {
                  var dropDownValues = {};
                  dropDownValues.label = "BPA_SELECT_DOCS_LABEL";
                  dropDownValues.required = doc.required ? true : false;
                  dropDownValues.menu = doc.dropDownValues.filter(function (item) {
                    return item.active;
                  });
                  dropDownValues.menu = dropDownValues.menu.map(function (item) {
                    return { code: item.code, label: item.code };
                  });
                  card["dropDownValues"] = dropDownValues;
                }
                tempDoc[doc.code.split(".")[0]].cards.push(card);
              });

              Object.keys(tempDoc).forEach(function (key) {
                documentsContract.push(tempDoc[key]);
              });
              applyFieldinspectionDocument = [];

              documentsContract.forEach(function (doc) {
                applyFieldinspectionDocument.push(doc);
              });
              dispatch((0, _actions2.prepareFinalObject)("nocDocumentsContract", applyFieldinspectionDocument));
            }

          case 10:
          case "end":
            return _context33.stop();
        }
      }
    }, _callee33, undefined);
  }));

  return function prepareFieldDocumentsUploadData(_x88, _x89, _x90, _x91, _x92) {
    return _ref35.apply(this, arguments);
  };
}();
var documentMaping = function () {
  var _ref36 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee34(state, dispatch, action, documentsPreview) {
    var fileStoreIds, fileUrls, documentsPreviews;
    return _regenerator2.default.wrap(function _callee34$(_context34) {
      while (1) {
        switch (_context34.prev = _context34.next) {
          case 0:
            fileStoreIds = _jsonpath2.default.query(documentsPreview, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context34.next = 7;
              break;
            }

            _context34.next = 4;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 4:
            _context34.t0 = _context34.sent;
            _context34.next = 8;
            break;

          case 7:
            _context34.t0 = {};

          case 8:
            fileUrls = _context34.t0;
            documentsPreviews = documentsPreview.map(function (doc, index) {
              doc["link"] = fileUrls && fileUrls[doc.fileStoreId] && (0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]) || "";
              doc["name"] = fileUrls[doc.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
              return doc;
            });
            return _context34.abrupt("return", documentsPreviews);

          case 11:
          case "end":
            return _context34.stop();
        }
      }
    }, _callee34, undefined);
  }));

  return function documentMaping(_x93, _x94, _x95, _x96) {
    return _ref36.apply(this, arguments);
  };
}();
var prepareDocumentsView = function () {
  var _ref37 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee35(state, dispatch, action, appState, isVisibleTrue) {
    var documentsPreview, BPA, applicantDocuments, uploadedAppDocuments, otherDocuments, allDocuments, additionalDetail, fieldInspectionDetails, fieldInspectionDocs, fieldInspectionsQstions, fiDocumentsPreview, fieldInspectionDocuments, fileStoreIds, fileUrls, previewDocuments, isEmployee;
    return _regenerator2.default.wrap(function _callee35$(_context35) {
      while (1) {
        switch (_context35.prev = _context35.next) {
          case 0:
            documentsPreview = [];

            // Get all documents from response

            BPA = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA", {});
            applicantDocuments = _jsonpath2.default.query(BPA, "$.documents.*");
            uploadedAppDocuments = [];
            otherDocuments = _jsonpath2.default.query(BPA, "$.additionalDetail.documents.*");
            allDocuments = [].concat((0, _toConsumableArray3.default)(applicantDocuments), (0, _toConsumableArray3.default)(otherDocuments));
            additionalDetail = BPA.additionalDetails, fieldInspectionDetails = void 0, fieldInspectionDocs = [], fieldInspectionsQstions = [];

            if (additionalDetail && additionalDetail["fieldinspection_pending"] && additionalDetail["fieldinspection_pending"].length > 0) {
              fieldInspectionDetails = additionalDetail["fieldinspection_pending"][0];
              fieldInspectionDocs = fieldInspectionDetails.docs;
              fieldInspectionsQstions = fieldInspectionDetails.questions;
            }

            if (!(fieldInspectionDocs && fieldInspectionDocs.length > 0 && fieldInspectionsQstions && fieldInspectionsQstions.length > 0)) {
              _context35.next = 17;
              break;
            }

            fiDocumentsPreview = [];

            fieldInspectionDocs.forEach(function (fiDoc) {
              fiDocumentsPreview.push({
                title: (0, _commons.getTransformedLocale)(fiDoc.documentType),
                fileStoreId: fiDoc.fileStoreId,
                linkText: "View"
              });
            });

            _context35.next = 13;
            return documentMaping(state, dispatch, action, fiDocumentsPreview);

          case 13:
            fieldInspectionDocuments = _context35.sent;

            (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.fieldSummary.visible", true);
            dispatch((0, _actions2.prepareFinalObject)("fieldInspectionDocumentsDetailsPreview", fieldInspectionDocuments));
            dispatch((0, _actions2.prepareFinalObject)("fieldInspectionCheckListDetailsPreview", fieldInspectionsQstions));

          case 17:
            fileStoreIds = _jsonpath2.default.query(allDocuments, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context35.next = 24;
              break;
            }

            _context35.next = 21;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 21:
            _context35.t0 = _context35.sent;
            _context35.next = 25;
            break;

          case 24:
            _context35.t0 = {};

          case 25:
            fileUrls = _context35.t0;

            allDocuments.map(function (doc, index) {
              uploadedAppDocuments.push(doc);
              var obj = {};
              obj.title = (0, _commons.getTransformedLocale)(doc.documentType);
              obj.fileStoreId = doc.fileStoreId;
              obj.linkText = "View";
              obj.wfState = doc.wfState;
              if (doc.auditDetails) {
                obj["createdTime"] = doc.auditDetails.createdTime;
              }

              obj["link"] = fileUrls && fileUrls[doc.fileStoreId] && (0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]) || "";
              obj["name"] = fileUrls[doc.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrls[doc.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
              obj.createdBy = getLoggedinUserRole(doc.wfState);
              obj.additionalDetails = doc.additionalDetails;
              // if(!doc.createdBy){
              //   if (doc.wfState === "SEND_TO_CITIZEN") {
              //     obj.createdBy = "BPA Architect"
              //   }
              //   else if(doc.wfState === "DOC_VERIFICATION_PENDING") {
              //     obj.createdBy = "BPA Document Verifier"
              //   }
              //   else if (doc.wfState === "FIELDINSPECTION_PENDING") {
              //     obj.createdBy = "BPA Field Inspector"   
              //   }
              //   else if (doc.wfState === "NOC_VERIFICATION_PENDING") {
              //     obj.createdBy = "BPA Noc Verifier"    
              //   } else {
              //     obj.createdBy = "BPA Architect"
              //   }
              // } else {
              //   obj.createdBy = doc.createdBy
              // }

              obj['auditDetails'] = doc.auditDetails;
              documentsPreview.push(obj);
              return obj;
            });
            dispatch((0, _actions2.prepareFinalObject)("documentDetailsPreview", documentsPreview));
            previewDocuments = [];
            isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;

            prepareDocsInEmployee(state, dispatch, action, appState, uploadedAppDocuments, documentsPreview, isVisibleTrue);
            // if((isEmployee && isVisibleTrue) || (!isEmployee && isVisibleTrue)) {
            //   prepareDocsInEmployee(state, dispatch, action, appState, uploadedAppDocuments, documentsPreview);
            // } else {
            //   prepareFinalCards(state, dispatch, documentsPreview, [] )
            // }


          case 31:
          case "end":
            return _context35.stop();
        }
      }
    }, _callee35, undefined);
  }));

  return function prepareDocumentsView(_x97, _x98, _x99, _x100, _x101) {
    return _ref37.apply(this, arguments);
  };
}();
var getRequiredMdmsCards = function getRequiredMdmsCards(state, dispatch) {
  var bpaDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA", {});

  var documentMapping = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.BPA.DocTypeMapping", []);

  var documentType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType", []);
};

/**
 * This method will be called to get the current role of logged-in user
 * @param {String} wfState 
 * @returns {String} currentRole
 */
var getLoggedinUserRole = exports.getLoggedinUserRole = function getLoggedinUserRole(wfState) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)()),
      roles = (0, _get2.default)(userInfo, "roles"),
      currentRole = void 0,
      isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;

  if (roles && roles.length == 1) {
    currentRole = roles[0].name;
  } else if (roles && roles.length > 1) {
    if (isEmployee) {
      if (wfState) {
        wfState = wfState.state;
        if (wfState === "SEND_TO_CITIZEN") {
          currentRole = "BPA_ARCHITECT";
        } else if (wfState === "DOC_VERIFICATION_PENDING") {
          currentRole = "BPA_DOC_VERIFIER";
        } else if (wfState === "FIELDINSPECTION_PENDING") {
          currentRole = "BPA_FIELD_INSPECTOR";
        } else if (wfState === "NOC_VERIFICATION_PENDING") {
          currentRole = "BPA_NOC_VERIFIER";
        } else if (window.location.href.includes("noc-search-preview")) {
          currentRole = "BPA_F_NOC_VERIFIER";
        } else {
          currentRole = "BPA_ARCHITECT";
        }
      }
    } else {
      currentRole = roles.find(function (code) {
        return code == "BPA_ARCHITECT";
      });
      if (!currentRole) {
        currentRole = roles[0].name;
      } else {
        currentRole = currentRole.name;
      }
    }
  }

  return currentRole;
};

var getEditableUserRoleforNoc = function getEditableUserRoleforNoc(state, isVisibleTrue) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)()),
      roles = (0, _get2.default)(userInfo, "roles"),
      allowedToUpload = false;
  // let processInstances = get(
  //   state,
  //   "screenConfiguration.preparedFinalObject.applicationProcessInstances",
  //   {}
  // );
  // if(processInstances){
  //  if(processInstances.nextActions.length > 0){
  //   allowedToUpload = true;
  //  }
  // }
  var isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
  roles.map(function (role) {
    if (isEmployee && isVisibleTrue && role.code == "BPA_NOC_VERIFIER") {
      allowedToUpload = true;
    }
    if (window.location.href.includes("egov-bpa/apply") || window.location.href.includes("oc-bpa/apply")) {
      allowedToUpload = true;
    }
  });

  return allowedToUpload;
};

var getUploadedDocsFromNoc = function getUploadedDocsFromNoc(state, dispatch) {
  var nocAppDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Noc", []);
  var applicantDocuments = [];
  nocAppDetails.forEach(function (nocDoc) {
    var documents = _jsonpath2.default.query(nocDoc, "$.documents.*");
    if (documents) {
      applicantDocuments.push(documents);
    }
  });
  return applicantDocuments;
};

var prepareNocDocumentsView = exports.prepareNocDocumentsView = function () {
  var _ref38 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee36(state, dispatch) {
    var documentsPreview, allDocuments, uploadedAppDocuments, fileStoreIds, fileUrls;
    return _regenerator2.default.wrap(function _callee36$(_context36) {
      while (1) {
        switch (_context36.prev = _context36.next) {
          case 0:
            documentsPreview = [];
            _context36.next = 3;
            return getUploadedDocsFromNoc(state, dispatch);

          case 3:
            allDocuments = _context36.sent;
            uploadedAppDocuments = [];
            fileStoreIds = _jsonpath2.default.query(allDocuments, "$.*..fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context36.next = 12;
              break;
            }

            _context36.next = 9;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 9:
            _context36.t0 = _context36.sent;
            _context36.next = 13;
            break;

          case 12:
            _context36.t0 = {};

          case 13:
            fileUrls = _context36.t0;

            allDocuments.map(function (doc) {
              doc.map(function (docs, index) {
                uploadedAppDocuments.push(docs);
                var obj = {};

                obj.title = (0, _commons.getTransformedLocale)(docs.documentType);
                obj.fileStoreId = docs.fileStoreId;
                obj.linkText = "View";
                if (docs.auditDetails) {
                  obj["createdTime"] = docs.auditDetails.createdTime;
                }

                obj["link"] = fileUrls && fileUrls[docs.fileStoreId] && (0, _commons.getFileUrl)(fileUrls[docs.fileStoreId]) || "";
                obj["name"] = fileUrls[docs.fileStoreId] && decodeURIComponent((0, _commons.getFileUrl)(fileUrls[docs.fileStoreId]).split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
                obj.createdBy = getLoggedinUserRole(docs.wfState);
                obj.additionalDetails = docs.additionalDetails;
                obj['auditDetails'] = docs.auditDetails;
                // obj = Object.assign(docs);
                documentsPreview.push(obj);
                return obj;
              });
            });
            dispatch((0, _actions2.prepareFinalObject)("nocDocumentDetailsPreview", documentsPreview));
            return _context36.abrupt("return", documentsPreview);

          case 17:
          case "end":
            return _context36.stop();
        }
      }
    }, _callee36, undefined);
  }));

  return function prepareNocDocumentsView(_x102, _x103) {
    return _ref38.apply(this, arguments);
  };
}();

var prepareNocFinalCards = exports.prepareNocFinalCards = function () {
  var _ref39 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee37(state, dispatch, isVisibleTrue) {
    var mdmsNocDocuments, documentsDropDownValues, nocAppDetails, nocDocumentsContract, nocDocuments, uploadedAppDocuments, requiredDocTypesFromMdms, nocDocsFromMdms, documentsList, finalDoc, finalNocDocs, item, documents, finalDocuments, documentsContract, comparer, documentsCodes, nocBpaDocuments, documentsDocTypes, result, finalDocs, nocDocs, appDocs, nocDocumentsContractFinal;
    return _regenerator2.default.wrap(function _callee37$(_context37) {
      while (1) {
        switch (_context37.prev = _context37.next) {
          case 0:
            mdmsNocDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.NOC.DocumentTypeMapping", []);
            documentsDropDownValues = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType", []);
            nocAppDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Noc", {});
            nocDocumentsContract = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.nocBPADocumentsContract", {});
            nocDocuments = {};
            uploadedAppDocuments = [];
            requiredDocTypesFromMdms = [], nocDocsFromMdms = [];

            nocAppDetails.forEach(function (nocDoc) {
              mdmsNocDocuments.forEach(function (mdmsData) {
                if (mdmsData.applicationType === nocDoc.applicationType && mdmsData.nocType === nocDoc.nocType) {
                  nocDocsFromMdms.push(mdmsData);
                  nocDocuments[nocDoc.nocType] = mdmsData.docTypes;
                  //  nocDocuments[nocDoc.nocType]['documents'] = nocDoc.documents;
                  requiredDocTypesFromMdms.push(mdmsData.nocType);
                }
              });
            });
            console.log('nocDocsFromMdms', nocDocsFromMdms);

            documentsList = [], finalDoc = {}, finalNocDocs = [];

            for (item in nocDocuments) {
              documents = nocDocuments[item];

              if (documents && documents.length > 0) {

                documents.forEach(function (doc) {
                  var card = {};
                  card["code"] = doc.documentType.split(".")[0];
                  card["title"] = doc.documentType.split(".")[0];
                  card["cards"] = [];
                  card["nocType"] = doc.nocType;
                  finalDoc[doc.documentType.split(".")[0]] = card;
                });

                documents.map(function (doc) {
                  doc.dropDownValues = [];
                  documentsDropDownValues.forEach(function (value) {
                    var values = value.code.slice(0, doc.documentType.length);
                    if (doc.documentType === values) {
                      doc.hasDropdown = true;
                      doc.dropDownValues.push(value);
                    }
                  });
                  documentsList.push(doc);
                });
              }
            }

            documentsList.forEach(function (doc) {
              var card = {};
              card["name"] = doc.documentType;
              card["code"] = doc.documentType;
              card["nocType"] = doc.nocType;
              card["required"] = doc.required ? true : false;
              if (doc.hasDropdown && doc.dropDownValues) {
                var dropDownValues = {};
                dropDownValues.label = "BPA_SELECT_DOCS_LABEL";
                dropDownValues.required = doc.required;
                dropDownValues.menu = doc.dropDownValues.filter(function (item) {
                  return item.active;
                });
                dropDownValues.menu = dropDownValues.menu.map(function (item) {
                  return { code: item.code, label: item.code };
                });
                card["dropDownValues"] = dropDownValues;
              }
              finalDoc[doc.documentType.split(".")[0]].cards.push(card);
            });
            if (finalDoc) {
              Object.keys(finalDoc).forEach(function (key) {
                finalNocDocs.push(finalDoc[key]);
              });
            }

            finalDocuments = [], documentsContract = finalNocDocs;

            if (documentsContract && documentsContract.length > 0) {
              comparer = function comparer(otherArray) {
                return function (current) {
                  return otherArray.filter(function (other) {
                    return other == current;
                  }).length == 0;
                };
              };

              documentsCodes = [], nocBpaDocuments = [];


              documentsContract.forEach(function (documents) {
                documents.cards.forEach(function (cardDoc) {
                  documentsCodes.push(cardDoc.code);
                });
              });

              documentsDocTypes = [];

              uploadedAppDocuments.forEach(function (appDoc) {
                if (appDoc && appDoc.documentType) {
                  var code = appDoc.documentType.split('.')[0] + '.' + appDoc.documentType.split('.')[1];
                  documentsDocTypes.push(code);
                }
              });

              result = void 0;

              if (documentsDocTypes && documentsDocTypes.length > 0) {
                documentsCodes.map(function (docs) {
                  documentsDocTypes.map(function (doc) {
                    if (docs === doc) {
                      documentsContract[0].cards.map(function (items) {
                        if (items && items.code === doc) return items.required = false;
                      });
                    }
                  });
                  return docs;
                });
                result = documentsCodes;
              } else {
                result = documentsCodes;
              }

              finalDocs = [];


              documentsContract.forEach(function (doc) {
                var cards = [];

                var _loop = function _loop(i) {
                  var codes = result[i];
                  doc.cards.forEach(function (docCards) {
                    if (docCards.code === codes) {
                      cards.push(docCards);
                    }
                  });
                };

                for (var i = 0; i < result.length > 0; i++) {
                  _loop(i);
                }
                finalDocs.push({
                  cards: cards,
                  code: doc.code,
                  title: doc.code
                });
              });

              if (finalDocs && finalDocs.length > 0) {
                finalDocs.forEach(function (fDoc) {
                  if (fDoc && fDoc.cards && fDoc.cards.length > 0) {
                    finalDocuments.push(fDoc);
                  }
                });
              };

              nocDocs = [], appDocs = [];

              if (finalDocuments && finalDocuments.length > 0) {
                finalDocuments.forEach(function (finalDoc) {
                  if (finalDoc.code == "NOC") {
                    nocDocs.push(finalDoc);
                  } else {
                    appDocs.push(finalDoc);
                  }
                });
              }

              dispatch((0, _actions2.prepareFinalObject)("nocfinalcards", finalNocDocs));
            }
            _context37.next = 17;
            return prepareNocDocumentsView(state, dispatch);

          case 17:
            nocDocumentsContractFinal = _context37.sent;

            dispatchFinalNocCardsForPreview(state, dispatch, nocDocumentsContractFinal, finalNocDocs, isVisibleTrue);

          case 19:
          case "end":
            return _context37.stop();
        }
      }
    }, _callee37, undefined);
  }));

  return function prepareNocFinalCards(_x104, _x105, _x106) {
    return _ref39.apply(this, arguments);
  };
}();

var dispatchFinalNocCardsForPreview = function dispatchFinalNocCardsForPreview(state, dispatch, nocDocuments, nocDocumentsFromMdms, isVisibleTrue) {
  // let mdmsCards = getRequiredMdmsCards(state, dispatch);
  var cards = [];
  var documentCards = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.nocBPADocumentsContract", {});
  var cardReadOnly = getEditableUserRoleforNoc(state, isVisibleTrue);
  console.log(cardReadOnly);
  //let cardReadOnly = false;
  if (documentCards && documentCards.length > 0) {
    cards = documentCards[0].cards;
  }

  for (var i = 0; i < cards.length; i++) {
    cards[i].documents && cards[i].documents.length && cards[i].documents.map(function (fidocs) {
      nocDocuments && nocDocuments.length && nocDocuments.forEach(function (doc) {
        if (doc.fileStoreId === fidocs.fileStoreId) {
          fidocs.link = (0, _get2.default)(doc, "link");
          fidocs.name = (0, _get2.default)(doc, "name");
        }
      });
    });
  }

  if (nocDocumentsFromMdms && nocDocumentsFromMdms.length > 0) {
    var _ref40;

    var allCards = (_ref40 = []).concat.apply(_ref40, (0, _toConsumableArray3.default)(nocDocumentsFromMdms.map(function (_ref41) {
      var cards = _ref41.cards;
      return cards || [];
    })));
    allCards && allCards.map(function (mdmsCard) {
      var found = false;
      for (var i = 0; i < cards.length; i++) {

        if (mdmsCard.code == cards[i].code) {
          cards[i].readOnly = !cardReadOnly;
          var mergedCard = (0, _extends3.default)({}, cards[i], mdmsCard);
          cards[i] = (0, _extends3.default)({}, mergedCard);
          found = true;
        } else {
          cards[i].readOnly = !cardReadOnly;
        }
      }
      if (!found) {
        mdmsCard['readOnly'] = !cardReadOnly;
        cards.push(mdmsCard);
      }
    });

    cards.sort(compare);
  }
  dispatch((0, _actions2.prepareFinalObject)("nocForPreview", cards));
};
var compare = exports.compare = function compare(a, b) {
  // Use toUpperCase() to ignore character casing
  var nocTypeA = a.nocType.toUpperCase();
  var nocTypeB = b.nocType.toUpperCase();
  var comparison = 0;
  if (nocTypeA > nocTypeB) {
    comparison = 1;
  } else if (nocTypeA < nocTypeB) {
    comparison = -1;
  }
  return comparison;
};
var prepareFinalCards = function prepareFinalCards(state, dispatch, documentsPreview, requiredDocsFromMdms, isVisibleTrue) {
  // let mdmsCards = getRequiredMdmsCards(state, dispatch);
  var cards = [];
  documentsPreview.forEach(function (item) {
    item.documentCode = getDocumentCode(item.title);
  });
  var documentCards = (0, _groupBy2.default)(documentsPreview, 'documentCode');
  var bpaDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA", {});
  var cardReadOnly = false;
  if (bpaDetails.status == "INPROGRESS") {
    cardReadOnly = true;
  }

  var sendBackCitizen = true;
  if (bpaDetails.status && bpaDetails.status.includes("CITIZEN_ACTION_PENDING")) {
    sendBackCitizen = false;
  }

  if ((0, _get2.default)(bpaDetails, "status") === "DOC_VERIFICATION_INPROGRESS" && isVisibleTrue) {
    isVisibleTrue = true;
  } else {
    isVisibleTrue = false;
  }

  documentCards && Object.keys(documentCards).map(function (doc) {
    var card = {
      documentCode: doc,
      documents: documentCards[doc],
      wfState: documentCards[doc].wfState,
      readOnly: true
    };
    cards.push(card);
  });
  if (requiredDocsFromMdms.length > 0) {
    var _ref42;

    var allCards = (_ref42 = []).concat.apply(_ref42, (0, _toConsumableArray3.default)(requiredDocsFromMdms.map(function (_ref43) {
      var cards = _ref43.cards;
      return cards || [];
    })));

    allCards && allCards.map(function (mdmsCard) {
      var found = false;
      mdmsCard.documentCode = (0, _commons.getTransformedLocale)(mdmsCard.code);
      for (var i = 0; i < cards.length; i++) {
        if (mdmsCard.documentCode == cards[i].documentCode) {
          var isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
          cards[i].readOnly = isEmployee ? !isVisibleTrue : sendBackCitizen; //(cardReadOnly || !mdmsCard.allow);
          var mergedCard = (0, _extends3.default)({}, cards[i], mdmsCard);
          cards[i] = (0, _extends3.default)({}, mergedCard);
          found = true;
        }
      }

      if (!found) {
        var _isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
        mdmsCard.readOnly = _isEmployee ? !isVisibleTrue : sendBackCitizen; //(cardReadOnly || !mdmsCard.allow);
        cards.push(mdmsCard);
      }
    });
  }
  /**
   * @Todo should be handled at component level
   */
  cards.map(function (card) {
    if (card.documents) {
      card.documents.map(function (item) {
        if (!item.fileName) {
          item.fileName = item.name;
        }
      });
    }
  });
  cards.sort(documentsSorting);
  dispatch((0, _actions2.prepareFinalObject)("finalCardsforPreview", cards));
};
/**
 * 
 * @param {String} documentType 
 * Eg: APPL_ADDRESSPROOF_ELECTRICITYBILL 
 * retrun APPL_ADDRESSPROOF
 */
var getDocumentCode = function getDocumentCode(documentType) {
  var code = (0, _commons.getTransformedLocale)(documentType);
  code = code.substring(0, code.lastIndexOf("_"));
  return code;
};
var prepareDocsInEmployee = exports.prepareDocsInEmployee = function prepareDocsInEmployee(state, dispatch, action, appState, uploadedAppDocuments, documentsPreview, isVisibleTrue) {
  var applicationDocuments = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.BPA.DocTypeMapping", []);
  var documentsDropDownValues = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.common-masters.DocumentType", []);
  var bpaAppDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA", {});

  var documents = [];
  var bpaStatus = (0, _get2.default)(bpaAppDetails, "status");
  var bpaStatusAction = bpaStatus && (0, _get2.default)(bpaAppDetails, "status").includes("CITIZEN_ACTION_PENDING");
  if (bpaStatusAction) {
    appState = "INITIATED";
    (0, _set2.default)(action, "screenConfig.components.div.children.body.children.cardContent.children.applyDocSummary.children.cardContent.children.documentDetailsCard.visible", false);
  }
  applicationDocuments.forEach(function (doc) {
    if (doc.WFState == appState && doc.RiskType === bpaAppDetails.riskType && doc.ServiceType === bpaAppDetails.serviceType && doc.applicationType === bpaAppDetails.applicationType) {
      documents.push(doc.docTypes);
    }
  });

  var documentsList = [];
  if (documents[0] && documents[0].length > 0) {
    documents[0].forEach(function (doc) {
      var code = doc.code;
      doc.dropDownValues = [];
      documentsDropDownValues.forEach(function (value) {
        var values = value.code.slice(0, code.length);
        if (code === values) {
          doc.hasDropdown = true;
          doc.dropDownValues.push(value);
        }
      });
      documentsList.push(doc);
    });
  }
  var bpaDocuments = documentsList;
  var documentsContract = [];
  var tempDoc = {};

  if (bpaDocuments && bpaDocuments.length > 0) {
    bpaDocuments.forEach(function (doc) {
      var card = {};
      card["code"] = doc.code.split(".")[0];
      card["title"] = doc.code.split(".")[0];
      card["cards"] = [];
      tempDoc[doc.code.split(".")[0]] = card;
    });
    bpaDocuments.forEach(function (doc) {
      var card = {};
      card["name"] = doc.code;
      card["code"] = doc.code;
      card["required"] = doc.required ? true : false;
      card["allow"] = doc.allow && JSON.parse(doc.allow) ? true : false;
      card["orderNumber"] = (0, _get2.default)(doc, "order");
      if (doc.hasDropdown && doc.dropDownValues) {
        var dropDownValues = {};
        dropDownValues.label = "BPA_SELECT_DOCS_LABEL";
        dropDownValues.required = doc.required;
        dropDownValues.menu = doc.dropDownValues.filter(function (item) {
          return item.active;
        });
        dropDownValues.menu = dropDownValues.menu.map(function (item) {
          return { code: item.code, label: item.code };
        });
        card["dropDownValues"] = dropDownValues;
      }
      tempDoc[doc.code.split(".")[0]].cards.push(card);
    });
  }

  if (tempDoc) {
    Object.keys(tempDoc).forEach(function (key) {
      documentsContract.push(tempDoc[key]);
    });
  }
  var finalDocuments = [];
  if (documentsContract && documentsContract.length > 0) {
    var comparer = function comparer(otherArray) {
      return function (current) {
        return otherArray.filter(function (other) {
          return other == current;
        }).length == 0;
      };
    };

    var documentsCodes = [],
        nocBpaDocuments = [];

    documentsContract.forEach(function (documents) {
      documents.cards.forEach(function (cardDoc) {
        documentsCodes.push(cardDoc.code);
      });
    });

    var documentsDocTypes = [];
    uploadedAppDocuments.forEach(function (appDoc) {
      if (appDoc && appDoc.documentType) {
        var code = appDoc.documentType.split('.')[0] + '.' + appDoc.documentType.split('.')[1];
        documentsDocTypes.push(code);
      }
    });

    var result = void 0;
    if (documentsDocTypes && documentsDocTypes.length > 0) {
      documentsCodes.map(function (docs) {
        documentsDocTypes.map(function (doc) {
          if (docs === doc) {
            documentsContract[0].cards.map(function (items) {
              if (items && items.code === doc) return items.required = false;
            });
          }
        });
        return docs;
      });
      result = documentsCodes;
    } else {
      result = documentsCodes;
    }

    var finalDocs = [];

    documentsContract.forEach(function (doc) {
      var cards = [];

      var _loop2 = function _loop2(i) {
        var codes = result[i];
        doc.cards.forEach(function (docCards) {
          if (docCards.code === codes) {
            cards.push(docCards);
          }
        });
      };

      for (var i = 0; i < result.length > 0; i++) {
        _loop2(i);
      }
      finalDocs.push({
        cards: cards,
        code: doc.code,
        title: doc.code
      });
    });

    if (finalDocs && finalDocs.length > 0) {
      finalDocs.forEach(function (fDoc) {
        if (fDoc && fDoc.cards && fDoc.cards.length > 0) {
          finalDocuments.push(fDoc);
        }
      });
    };

    var nocDocs = [],
        appDocs = [];
    if (finalDocuments && finalDocuments.length > 0) {
      finalDocuments.forEach(function (finalDoc) {
        if (finalDoc.code == "NOC") {
          nocDocs.push(finalDoc);
        } else {
          appDocs.push(finalDoc);
        }
      });
    }
    var isEmployee = process.env.REACT_APP_NAME === "Citizen" ? false : true;
    if (finalDocuments && finalDocuments.length > 0 && (isEmployee || bpaStatusAction)) {
      // set(
      //   action,
      //   "screenConfig.components.div.children.body.children.cardContent.children.applyDocSummary.children.cardContent.children.uploadedDocumentDetailsCard.visible",
      //   true
      // );
      dispatch((0, _actions2.prepareFinalObject)("documentsContract", finalDocuments));
    }
  }
  console.log('requiredDocsFromMdms', finalDocuments);
  prepareFinalCards(state, dispatch, documentsPreview, finalDocuments, isVisibleTrue);
};

var prepareDocumentDetailsUploadRedux = exports.prepareDocumentDetailsUploadRedux = function () {
  var _ref44 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee38(state, dispatch) {
    var docs, bpaDocs, bpaDetails, uploadedDocs, fileStoreIds, fileUrls, previewStoreIds, previewFileUrls;
    return _regenerator2.default.wrap(function _callee38$(_context38) {
      while (1) {
        switch (_context38.prev = _context38.next) {
          case 0:
            docs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "documentsContract");
            bpaDocs = [];
            bpaDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA", {});
            uploadedDocs = bpaDetails.documents;


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

            if (!(uploadedDocs && uploadedDocs.length > 0)) {
              _context38.next = 27;
              break;
            }

            fileStoreIds = _jsonpath2.default.query(uploadedDocs, "$.*.fileStoreId");

            if (!(fileStoreIds.length > 0)) {
              _context38.next = 13;
              break;
            }

            _context38.next = 10;
            return (0, _commons.getFileUrlFromAPI)(fileStoreIds);

          case 10:
            _context38.t0 = _context38.sent;
            _context38.next = 14;
            break;

          case 13:
            _context38.t0 = {};

          case 14:
            fileUrls = _context38.t0;

            uploadedDocs.forEach(function (upDoc) {
              bpaDocs.forEach(function (bpaDoc) {
                var bpaDetailsDoc = void 0;
                if (upDoc.documentType) bpaDetailsDoc = upDoc.documentType.split('.')[0] + "." + upDoc.documentType.split('.')[1];
                if (bpaDetailsDoc == bpaDoc.documentCode) {
                  var url = fileUrls && fileUrls[upDoc.fileStoreId] && fileUrls[upDoc.fileStoreId].split(",")[0] || "";
                  var name = fileUrls[upDoc.fileStoreId] && decodeURIComponent(fileUrls[upDoc.fileStoreId].split(",")[0].split("?")[0].split("/").pop().slice(13)) || "Document - " + (index + 1);
                  bpaDoc.dropDownValues = {};
                  bpaDoc.dropDownValues.value = upDoc.documentType;
                  if (bpaDoc.previewdocuments) {
                    bpaDoc.previewdocuments.push({
                      title: (0, _commons.getTransformedLocale)(bpaDoc.documentCode),
                      documentType: bpaDoc.dropDownValues.value,
                      name: name,
                      linkText: "View",
                      fileName: name,
                      fileStoreId: upDoc.fileStoreId,
                      fileUrl: url,
                      id: upDoc.id,
                      wfState: upDoc.wfState
                    });
                  } else {
                    bpaDoc.previewdocuments = [{
                      title: (0, _commons.getTransformedLocale)(bpaDoc.documentCode),
                      documentType: bpaDoc.dropDownValues.value,
                      name: name,
                      linkText: "View",
                      fileName: name,
                      fileStoreId: upDoc.fileStoreId,
                      fileUrl: url,
                      id: upDoc.id,
                      wfState: upDoc.wfState
                    }];
                  }
                }
              });
            });
            previewStoreIds = _jsonpath2.default.query(bpaDocs, "$..[*].*.fileStoreId");

            if (!(previewStoreIds.length > 0)) {
              _context38.next = 23;
              break;
            }

            _context38.next = 20;
            return (0, _commons.getFileUrlFromAPI)(previewStoreIds);

          case 20:
            _context38.t1 = _context38.sent;
            _context38.next = 24;
            break;

          case 23:
            _context38.t1 = {};

          case 24:
            previewFileUrls = _context38.t1;


            bpaDocs.forEach(function (doc) {

              if (doc.previewdocuments && doc.previewdocuments.length > 0) {
                doc.previewdocuments.forEach(function (docDetail) {
                  docDetail["link"] = fileUrls[docDetail.fileStoreId];
                  return docDetail;
                });
              }
            });
            dispatch((0, _actions2.prepareFinalObject)("documentDetailsUploadRedux", bpaDocs));

          case 27:
          case "end":
            return _context38.stop();
        }
      }
    }, _callee38, undefined);
  }));

  return function prepareDocumentDetailsUploadRedux(_x107, _x108) {
    return _ref44.apply(this, arguments);
  };
}();

var revocationPdfDownload = exports.revocationPdfDownload = function () {
  var _ref45 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee39(action, state, dispatch) {
    var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Download";
    var bpaDetails, res, fileStoreId, pdfDownload;
    return _regenerator2.default.wrap(function _callee39$(_context39) {
      while (1) {
        switch (_context39.prev = _context39.next) {
          case 0:
            bpaDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA");
            _context39.next = 3;
            return (0, _api.httpRequest)("post", "pdf-service/v1/_create?key=bpa-revocation&tenantId=" + bpaDetails.tenantId.split(".")[0], "", [], { Bpa: [bpaDetails] });

          case 3:
            res = _context39.sent;
            fileStoreId = res.filestoreIds[0];
            _context39.next = 7;
            return (0, _api.httpRequest)("get", "filestore/v1/files/url?tenantId=" + bpaDetails.tenantId.split(".")[0] + "&fileStoreIds=" + fileStoreId, []);

          case 7:
            pdfDownload = _context39.sent;

            if (mode && mode === "Download") {
              window.open(pdfDownload[fileStoreId]);
            } else {
              (0, _commons2.printPdf)(pdfDownload[fileStoreId]);
            }

          case 9:
          case "end":
            return _context39.stop();
        }
      }
    }, _callee39, undefined);
  }));

  return function revocationPdfDownload(_x109, _x110, _x111) {
    return _ref45.apply(this, arguments);
  };
}();

var permitOrderNoDownload = exports.permitOrderNoDownload = function () {
  var _ref46 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee40(action, state, dispatch) {
    var mode = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "Download";
    var bpaDetails, currentDate, payload, detailsOfBpa, Bpa, permitPfKey, res, fileStoreId, pdfDownload, data;
    return _regenerator2.default.wrap(function _callee40$(_context40) {
      while (1) {
        switch (_context40.prev = _context40.next) {
          case 0:
            bpaDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA");
            currentDate = new Date();

            (0, _set2.default)(bpaDetails, "additionalDetails.runDate", convertDateToEpoch(currentDate.getFullYear() + '-' + (currentDate.getMonth() + 1) + '-' + currentDate.getDate()));

            _context40.next = 5;
            return (0, _api.edcrHttpRequest)("post", "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + bpaDetails.edcrNumber + "&tenantId=" + bpaDetails.tenantId, "search", []);

          case 5:
            payload = _context40.sent;
            detailsOfBpa = bpaDetails;

            bpaDetails.edcrDetail = payload.edcrDetail;
            Bpa = bpaDetails;
            permitPfKey = "buildingpermit";


            if (!window.location.href.includes("oc-bpa")) {
              if (bpaDetails && bpaDetails.businessService === "BPA_LOW") {
                permitPfKey = "buildingpermit-low";
              }
            } else if (window.location.href.includes("oc-bpa")) {
              permitPfKey = "occupancy-certificate";
            }
            if (window.location.href.includes("oc-bpa") || window.location.href.includes("BPA.NC_OC_SAN_FEE")) {
              permitPfKey = "occupancy-certificate";
            }
            _context40.next = 14;
            return (0, _api.httpRequest)("post", "pdf-service/v1/_create?key=" + permitPfKey + "&tenantId=" + bpaDetails.tenantId, "", [], { Bpa: [Bpa] });

          case 14:
            res = _context40.sent;
            fileStoreId = res.filestoreIds[0];
            _context40.next = 18;
            return (0, _api.httpRequest)("get", "filestore/v1/files/url?tenantId=" + bpaDetails.tenantId + "&fileStoreIds=" + fileStoreId, []);

          case 18:
            pdfDownload = _context40.sent;

            if (mode && mode === "Download") {
              window.open(pdfDownload[fileStoreId]);
            } else {
              (0, _commons2.printPdf)(pdfDownload[fileStoreId]);
            }

            data = (0, _api.wrapRequestBody)({ BPA: detailsOfBpa });

            (0, _axios2.default)({
              url: '/bpa-services/v1/bpa/_permitorderedcr',
              method: 'POST',
              responseType: 'blob', data: data
              // important
            }).then(function (response) {
              var url = window.URL.createObjectURL(new Blob([response.data]));
              var link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'permitorderedcr.pdf');
              document.body.appendChild(link);
              if (mode && mode === "Download") {
                link.click();
              } else {
                (0, _commons2.printPdf)(link);
              }
            });

          case 22:
          case "end":
            return _context40.stop();
        }
      }
    }, _callee40, undefined);
  }));

  return function permitOrderNoDownload(_x113, _x114, _x115) {
    return _ref46.apply(this, arguments);
  };
}();

var downloadFeeReceipt = exports.downloadFeeReceipt = function () {
  var _ref47 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee41(state, dispatch, status, serviceCode) {
    var mode = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "Download";
    var bpaDetails, queryObject, paymentPayload, payments, res, fileStoreId, pdfDownload;
    return _regenerator2.default.wrap(function _callee41$(_context41) {
      while (1) {
        switch (_context41.prev = _context41.next) {
          case 0:
            bpaDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA");
            queryObject = [{
              key: "tenantId",
              value: bpaDetails.tenantId
            }, {
              key: "consumerCodes",
              value: bpaDetails.applicationNo
            }];
            _context41.next = 4;
            return (0, _api.httpRequest)("post", (0, _commons2.getPaymentSearchAPI)(serviceCode, true), "", queryObject);

          case 4:
            paymentPayload = _context41.sent;
            payments = [];

            //  if(process.env.REACT_APP_NAME == "Citizen") {

            if (window.location.href.includes("oc-bpa")) {
              if (paymentPayload.Payments && paymentPayload.Payments.length > 1) {
                if (serviceCode === "BPA.NC_OC_APP_FEE") {
                  payments.push(paymentPayload.Payments[1]);
                }

                if (serviceCode === "BPA.NC_OC_SAN_FEE") {
                  payments.push(paymentPayload.Payments[0]);
                }
              } else {
                payments.push(paymentPayload.Payments[0]);
              }
            } else {
              if (paymentPayload.Payments && paymentPayload.Payments.length > 1) {
                if (serviceCode === "BPA.NC_APP_FEE") {
                  payments.push(paymentPayload.Payments[1]);
                }

                if (serviceCode === "BPA.NC_SAN_FEE") {
                  payments.push(paymentPayload.Payments[0]);
                }
              } else {
                payments.push(paymentPayload.Payments[0]);
              }
            }
            //  } else {
            //   payments.push(get (paymentPayload, "Payments[0]", []));
            //  }


            _context41.next = 9;
            return (0, _api.httpRequest)("post", "pdf-service/v1/_create?key=consolidatedreceipt&tenantId=" + bpaDetails.tenantId, "", [], { Payments: payments });

          case 9:
            res = _context41.sent;
            fileStoreId = res.filestoreIds[0];
            _context41.next = 13;
            return (0, _api.httpRequest)("get", "filestore/v1/files/url?tenantId=" + bpaDetails.tenantId + "&fileStoreIds=" + fileStoreId, []);

          case 13:
            pdfDownload = _context41.sent;

            if (mode && mode === "Download") {
              window.open(pdfDownload[fileStoreId]);
            } else {
              (0, _commons2.printPdf)(pdfDownload[fileStoreId]);
            }

          case 15:
          case "end":
            return _context41.stop();
        }
      }
    }, _callee41, undefined);
  }));

  return function downloadFeeReceipt(_x117, _x118, _x119, _x120) {
    return _ref47.apply(this, arguments);
  };
}();

var getFloorDetails = function getFloorDetails(index) {
  // let floorNo = ['Ground', 'First', 'Second', 'Third', 'Forth', 'Fifth', 'Sixth', 'Seventh', 'Eighth', 'Ninth', 'Tenth']
  if (index) {
    return "BPA_FLOOR_NAME_" + index;
    // return `${floorNo[index]} floor`;
  }
};

var setProposedBuildingData = exports.setProposedBuildingData = function () {
  var _ref48 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee42(state, dispatch, action, value) {
    var response, occupancyType, BPA, getLocalLabels, subOccupancyType, tableData, _loop3, j;

    return _regenerator2.default.wrap(function _callee42$(_context43) {
      while (1) {
        switch (_context43.prev = _context43.next) {
          case 0:
            response = void 0, occupancyType = void 0, BPA = void 0;
            getLocalLabels = (0, _get2.default)(state, "app.localizationLabels");


            if (value == "ocApply") {
              response = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.ocScrutinyDetails.planDetail.blocks", []);
              occupancyType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.BPA.SubOccupancyType", []);
              BPA = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA", {});
            } else {
              response = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.scrutinyDetails.planDetail.blocks", []);
              occupancyType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreenMdmsData.BPA.SubOccupancyType", []);
              BPA = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA", {});
            }

            subOccupancyType = occupancyType.filter(function (item) {
              return item.active;
            });
            tableData = [];

            if (!(response && response.length > 0)) {
              _context43.next = 16;
              break;
            }

            _loop3 = /*#__PURE__*/_regenerator2.default.mark(function _loop3() {
              var blockName, title, floors, block, occupancyTypeCheck, floorNo, sOccupancyType;
              return _regenerator2.default.wrap(function _loop3$(_context42) {
                while (1) {
                  switch (_context42.prev = _context42.next) {
                    case 0:
                      blockName = (0, _commons.getLocaleLabels)("", "BLOCK");
                      title = "BLOCK_" + (j + 1);
                      floors = response[j] && response[j].building && response[j].building.floors;
                      _context42.next = 5;
                      return floors.map(function (item, index) {
                        var _ref49;

                        return _ref49 = {}, (0, _defineProperty3.default)(_ref49, "Floor Description", getFloorDetails(item.number.toString()) || '-'), (0, _defineProperty3.default)(_ref49, "Level", item.number), (0, _defineProperty3.default)(_ref49, "Occupancy/Sub Occupancy", item.occupancies[0].type || "NA"), (0, _defineProperty3.default)(_ref49, "Buildup Area", item.occupancies[0].builtUpArea || 0), (0, _defineProperty3.default)(_ref49, "Floor Area", item.occupancies[0].floorArea || 0), (0, _defineProperty3.default)(_ref49, "Carpet Area", item.occupancies[0].carpetArea || 0), _ref49;
                      });

                    case 5:
                      block = _context42.sent;
                      occupancyTypeCheck = [], floorNo = response[j].number;

                      if (BPA && BPA.landInfo && BPA.landInfo.unit && BPA.landInfo.unit[j] && BPA.landInfo.unit[j].usageCategory) {
                        sOccupancyType = BPA.landInfo.unit[j].usageCategory.split(",");

                        sOccupancyType.forEach(function (subOcData) {
                          occupancyTypeCheck.push({
                            value: subOcData,
                            label: (0, _commons.getLocaleLabels)("NA", "BPA_SUBOCCUPANCYTYPE_" + (0, _commons.getTransformedLocale)(subOcData), getLocalLabels)
                          });
                        });
                      }

                      if (occupancyTypeCheck && occupancyTypeCheck.length) {
                        tableData.push({ blocks: block, suboccupancyData: subOccupancyType, titleData: title, occupancyType: occupancyTypeCheck, floorNo: floorNo });
                      } else {
                        tableData.push({ blocks: block, suboccupancyData: subOccupancyType, titleData: title, floorNo: floorNo });
                      }

                    case 9:
                    case "end":
                      return _context42.stop();
                  }
                }
              }, _loop3, undefined);
            });
            j = 0;

          case 8:
            if (!(j < response.length)) {
              _context43.next = 13;
              break;
            }

            return _context43.delegateYield(_loop3(), "t0", 10);

          case 10:
            j++;
            _context43.next = 8;
            break;

          case 13:
            ;
            dispatch((0, _actions2.prepareFinalObject)("edcr.blockDetail", tableData));

            return _context43.abrupt("return", tableData);

          case 16:
          case "end":
            return _context43.stop();
        }
      }
    }, _callee42, undefined);
  }));

  return function setProposedBuildingData(_x122, _x123, _x124, _x125) {
    return _ref48.apply(this, arguments);
  };
}();

var getConditionsInPermitList = exports.getConditionsInPermitList = function () {
  var _ref50 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee43(action, state, dispatch) {
    var permitConditions, addedConditions, additionalDetails, permitDetails, finalPermitList;
    return _regenerator2.default.wrap(function _callee43$(_context44) {
      while (1) {
        switch (_context44.prev = _context44.next) {
          case 0:
            permitConditions = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.permitTemp", []);
            addedConditions = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.tempAdded", []);
            additionalDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA.additionalDetails", {});
            permitDetails = [], finalPermitList = [];


            if (permitConditions && permitConditions.length > 0) {
              permitConditions.forEach(function (cndtn) {
                finalPermitList.push(cndtn);
              });
            }

            if (addedConditions && addedConditions.length > 0) {
              addedConditions.forEach(function (cndtn) {
                if (additionalDetails && additionalDetails.pendingapproval && additionalDetails.pendingapproval.length > 0) {
                  if (cndtn && cndtn.isDeleted !== false) {
                    finalPermitList.push(cndtn.conditions);
                  }
                }
              });
            }

            dispatch((0, _actions2.prepareFinalObject)("BPA.additionalDetails.pendingapproval", finalPermitList));

          case 7:
          case "end":
            return _context44.stop();
        }
      }
    }, _callee43, undefined);
  }));

  return function getConditionsInPermitList(_x126, _x127, _x128) {
    return _ref50.apply(this, arguments);
  };
}();

var getLicenseDetails = exports.getLicenseDetails = function () {
  var _ref51 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee44(state, dispatch) {
    var tenantId, userInfo, id, queryObject, License, i, name, tradeType, licenseNumber, tradeTypeWithLocalization;
    return _regenerator2.default.wrap(function _callee44$(_context45) {
      while (1) {
        switch (_context45.prev = _context45.next) {
          case 0:
            tenantId = (0, _localStorageUtils.getTenantId)();
            userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
            id = (0, _get2.default)(userInfo, "id");
            queryObject = [{
              key: "tenantId",
              value: _common2.default.tenantId
            }, {
              key: "id",
              value: id
            }];
            _context45.prev = 4;
            _context45.next = 7;
            return (0, _api.httpRequest)("post", "/tl-services/v1/BPAREG/_search", "", [], queryObject);

          case 7:
            License = _context45.sent;
            i = 0;

          case 9:
            if (!(i <= License.Licenses.length)) {
              _context45.next = 19;
              break;
            }

            if (!(License.Licenses[i].status === "APPROVED")) {
              _context45.next = 16;
              break;
            }

            name = License.Licenses[i].tradeLicenseDetail.owners[0].name;
            tradeType = License.Licenses[i].tradeLicenseDetail.tradeUnits[0].tradeType;
            licenseNumber = License.Licenses[i].licenseNumber;
            tradeTypeWithLocalization = getTextToLocalMapping("TRADELICENSE_TRADETYPE_" + tradeType.split('.')[0].toUpperCase());
            return _context45.abrupt("return", name + "/" + tradeTypeWithLocalization + "/" + licenseNumber);

          case 16:
            i++;
            _context45.next = 9;
            break;

          case 19:
            _context45.next = 25;
            break;

          case 21:
            _context45.prev = 21;
            _context45.t0 = _context45["catch"](4);

            console.log(_context45.t0);
            return _context45.abrupt("return", {});

          case 25:
          case "end":
            return _context45.stop();
        }
      }
    }, _callee44, undefined, [[4, 21]]);
  }));

  return function getLicenseDetails(_x129, _x130) {
    return _ref51.apply(this, arguments);
  };
}();

var ocuupancyType = exports.ocuupancyType = function ocuupancyType(state, dispatch) {
  var occupancyDataObj = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ocScrutinyDetails.planDetail.occupancies[0].typeHelper.type", []);
  var occupancyData = [];
  occupancyData.push({ code: occupancyDataObj.code });
  dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.BPA.occupancyData", occupancyData));
};

var deviationValidation = exports.deviationValidation = function deviationValidation(action, state, dispatch) {
  var APPROVED = "Approved";
  var ALLOW = "Validate and allow";
  var REJECT = "Validate and restrict";
  var INCOMPLETEINFO = "Not enough details";

  var ocScrutinyDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ocScrutinyDetails", {});
  var scrutinyDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "scrutinyDetails", {});
  var ocEDCRDetails = {};
  ocEDCRDetails.edcrDetail = [];
  ocEDCRDetails.edcrDetail[0] = ocScrutinyDetails;

  var eDCRDetails = {};
  eDCRDetails.edcrDetail = [];
  eDCRDetails.edcrDetail[0] = scrutinyDetails;

  var validationParams = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.BPA.DeviationParams");

  var validationResponse = APPROVED;
  var planParam = [],
      ocParam = [];
  if (validationParams) {
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = validationParams[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var paramRecord = _step2.value;


        var firstIndex = paramRecord.paramPath.indexOf("[");
        var lastIndex = paramRecord.paramPath.lastIndexOf("[");

        if (firstIndex !== lastIndex) {
          (function () {
            // To check if the record has multiple sub records like blocks
            var firstpath = paramRecord.paramPath.substring(0, lastIndex);
            var secondpath = paramRecord.paramPath.substring(lastIndex + 4);
            var planRecs = _lodash2.default.get(eDCRDetails, firstpath, []);
            var ocRecs = _lodash2.default.get(ocEDCRDetails, firstpath, []);
            planRecs.forEach(function (element, i) {
              planParam.push(_lodash2.default.get(planRecs[i], secondpath, null));
              ocParam.push(_lodash2.default.get(ocRecs[i], secondpath, null));
            });
          })();
        } else {
          planParam.push(_lodash2.default.get(eDCRDetails, paramRecord.paramPath, null));
          ocParam.push(_lodash2.default.get(ocEDCRDetails, paramRecord.paramPath, null));
        }
        if (planParam && ocParam && planParam.length === ocParam.length) {
          for (var i = 0; i < planParam.length; i++) {
            var diff = 0;
            if (paramRecord.calculationType === "number") {
              diff = Math.abs(ocParam[i] - planParam[i]);
            } else {
              //(paramRecord.calculationType==="percentage"){
              diff = Math.abs(ocParam[i] - planParam[i]) / planParam[i] * 100;
            }

            if (diff > paramRecord.tolerancelimit) {
              if (paramRecord.restrictionType === REJECT) {

                dispatch((0, _actions2.toggleSnackbar)(true, {
                  labelName: "System has to validate and restrict the user from creating the application.",
                  labelKey: "BPA_TOLERANCE_LIMIT_ERROR"
                }, "error"));
              } else {
                validationResponse = ALLOW;
              }
            }
          }
        } else {
          validationResponse = INCOMPLETEINFO;
          break;
        }
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  }

  return validationResponse;
};

var showComparisonDialog = exports.showComparisonDialog = function showComparisonDialog(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], "components.cityPickerDialogofComparison.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.cityPickerDialogofComparison", "props.open", !toggle));
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.cityPickerDialogofComparison.popup", "props.open", !toggle));
};
var getPermitDetails = exports.getPermitDetails = function () {
  var _ref52 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee45(permitNumber, tenantId) {
    var queryObject, response;
    return _regenerator2.default.wrap(function _callee45$(_context46) {
      while (1) {
        switch (_context46.prev = _context46.next) {
          case 0:
            queryObject = [{ key: "tenantId", value: tenantId }, { key: "approvalNo", value: permitNumber }];
            _context46.next = 3;
            return (0, _commons3.getBpaSearchResults)(queryObject);

          case 3:
            response = _context46.sent;

            if (!(response && response.BPA && response.BPA.length > 0)) {
              _context46.next = 8;
              break;
            }

            return _context46.abrupt("return", response.BPA[0]);

          case 8:
            return _context46.abrupt("return", 'NOPERMIT');

          case 9:
          case "end":
            return _context46.stop();
        }
      }
    }, _callee45, undefined);
  }));

  return function getPermitDetails(_x131, _x132) {
    return _ref52.apply(this, arguments);
  };
}();

var permitNumberLink = function () {
  var _ref53 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee46(state, dispatch) {
    var tenantId, appNumber, permitNumber, checkingApp, url, linkDetail;
    return _regenerator2.default.wrap(function _callee46$(_context47) {
      while (1) {
        switch (_context47.prev = _context47.next) {
          case 0:
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            appNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bpaDetails.applicationNo", "");
            permitNumber = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "ocScrutinyDetails.permitNumber", "");
            checkingApp = (0, _localStorageUtils.getTenantId)().split('.')[1] ? "employee" : "citizen";
            url = window.location.origin + "/egov-bpa/search-preview?applicationNumber=" + appNumber + "&tenantId=" + tenantId;
            linkDetail = {
              labelName: "",
              labelKey: ""
            };

            if (process.env.NODE_ENV === "production") {
              if (checkingApp) {
                url = window.location.origin + "/" + checkingApp + "/egov-bpa/search-preview?applicationNumber=" + appNumber + "&tenantId=" + tenantId;
              }
            }
            if (appNumber) {
              linkDetail = {
                labelName: permitNumber,
                labelKey: permitNumber
              };
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.basicDetails.children.cardContent.children.basicDetailsContainer.children.buildingPermitNum", "props.linkDetail", linkDetail));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.summaryDetails.children.cardContent.children.scrutinySummary.children.cardContent.children.basicDetailsContainer.children.buildingPermitNum", "props.linkDetail", linkDetail));
              dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.body.children.cardContent.children.scrutinySummary.children.cardContent.children.basicDetailsContainer.children.buildingPermitNum", "props.linkDetail", linkDetail));
              dispatch((0, _actions2.prepareFinalObject)("BPA.permitNumberLink", url));
            } else {
              dispatch((0, _actions2.prepareFinalObject)("BPA.permitNumberLink", ""));
            }

          case 8:
          case "end":
            return _context47.stop();
        }
      }
    }, _callee46, undefined);
  }));

  return function permitNumberLink(_x133, _x134) {
    return _ref53.apply(this, arguments);
  };
}();

/**
 * This method will be called to retreive the comparison report and vlidate it
 * @return true / false
 */
var getComparisonResult = exports.getComparisonResult = function () {
  var _ref54 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee47(state, dispatch, tenantId, ocEdcrNumber, bpaEdcrNumber) {
    var comparisionRes, comparisionSuccess;
    return _regenerator2.default.wrap(function _callee47$(_context48) {
      while (1) {
        switch (_context48.prev = _context48.next) {
          case 0:
            _context48.next = 2;
            return (0, _api.edcrHttpRequest)("post", "/edcr/rest/dcr/occomparison?tenantId=" + tenantId + "&ocdcrNumber=" + ocEdcrNumber + "&edcrNumber=" + bpaEdcrNumber, "search", []);

          case 2:
            comparisionRes = _context48.sent;
            comparisionSuccess = false;

            if (comparisionRes) {
              comparisionSuccess = comparisionRes.comparisonDetail.status == "Accepted" ? true : false;
              dispatch((0, _actions2.prepareFinalObject)("comparisonDetails", comparisionRes.comparisonDetail));
              dispatch((0, _actions2.prepareFinalObject)("comparisonDetails.report", comparisionRes.comparisonDetail.comparisonReport));
            }
            return _context48.abrupt("return", comparisionSuccess);

          case 6:
          case "end":
            return _context48.stop();
        }
      }
    }, _callee47, undefined);
  }));

  return function getComparisonResult(_x135, _x136, _x137, _x138, _x139) {
    return _ref54.apply(this, arguments);
  };
}();

var getOcEdcrDetails = exports.getOcEdcrDetails = function () {
  var _ref55 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee48(state, dispatch, action) {
    var scrutinyNo, tenantId, ocpayload, bpaDetails, todayDate, comparisionSuccess, edcrPayload, queryObject, bpaSearch, primaryOwnerArray, SHLicenseDetails;
    return _regenerator2.default.wrap(function _callee48$(_context49) {
      while (1) {
        switch (_context49.prev = _context49.next) {
          case 0:
            _context49.prev = 0;
            scrutinyNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "BPA.edcrNumber", "") || (0, _commons.getQueryArg)(window.location.href, "edcrNumber");
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");

            //check format

            if (!(!scrutinyNo || !scrutinyNo.match((0, _utils.getPattern)("^[a-zA-Z0-9]*$")))) {
              _context49.next = 6;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Incorrect Scrutiny Number!",
              labelKey: "BPA_INCORRECT_SCRUTINY_NUMBER"
            }, "error"));
            return _context49.abrupt("return");

          case 6:
            _context49.next = 8;
            return (0, _api.edcrHttpRequest)("post", "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + scrutinyNo + "&tenantId=" + tenantId, {});

          case 8:
            ocpayload = _context49.sent;
            _context49.next = 11;
            return getPermitDetails((0, _get2.default)(ocpayload, "edcrDetail[0].permitNumber"), tenantId);

          case 11:
            bpaDetails = _context49.sent;

            if (!(bpaDetails === 'NOPERMIT')) {
              _context49.next = 15;
              break;
            }

            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Incorrect Permit Number!",
              labelKey: "BPA_INCORRECT_PERMIT_NUMBER"
            }, "error"));
            return _context49.abrupt("return");

          case 15:

            //Check oc edcr date validity less than today
            todayDate = new Date();

            if (!((0, _get2.default)(ocpayload, "edcrDetail[0].permitDate") > todayDate)) {
              _context49.next = 19;
              break;
            }

            //to be checked for the date comparison
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Invalid Permit Date!",
              labelKey: "BPA_INVALID_PERMIT"
            }, "error"));
            return _context49.abrupt("return");

          case 19:
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.footer.children.nextButton", "props.disabled", true));
            _context49.next = 22;
            return getComparisonResult(state, dispatch, tenantId, scrutinyNo, bpaDetails.edcrNumber);

          case 22:
            comparisionSuccess = _context49.sent;

            if (comparisionSuccess) {
              _context49.next = 26;
              break;
            }

            showComparisonDialog(state, dispatch);
            return _context49.abrupt("return");

          case 26:
            dispatch((0, _actions2.handleScreenConfigurationFieldChange)("apply", "components.div.children.footer.children.nextButton", "props.disabled", false));
            //get permit edcr details
            _context49.next = 29;
            return (0, _api.edcrHttpRequest)("post", "/edcr/rest/dcr/scrutinydetails?edcrNumber=" + bpaDetails.edcrNumber + "&tenantId=" + tenantId, {});

          case 29:
            edcrPayload = _context49.sent;

            if (!((0, _get2.default)(ocpayload, "edcrDetail[0].tenantId") !== (0, _get2.default)(edcrPayload, "edcrDetail[0].tenantId"))) {
              _context49.next = 33;
              break;
            }

            //check city using tenantId- is this correct
            dispatch((0, _actions2.toggleSnackbar)(true, {
              labelName: "Invalid City!",
              labelKey: "BPA_INVALID_PERMIT_CITY"
            }, "error"));
            return _context49.abrupt("return");

          case 33:

            //check duplicates
            queryObject = [{
              key: "tenantId",
              value: tenantId
            }, {
              key: "edcrNumber",
              value: scrutinyNo
            }];
            _context49.next = 36;
            return (0, _api.httpRequest)("post", "bpa-services/v1/bpa/_search", "", queryObject);

          case 36:
            bpaSearch = _context49.sent;


            bpaSearch.BPA && bpaSearch.BPA.length > 0 && bpaSearch.BPA.forEach(function (data, index) {
              if (data.edcrNumber === scrutinyNo && data.status != "REJECTED" && data.status != "PERMIT REVOCATION") {
                dispatch((0, _actions2.toggleSnackbar)(true, {
                  labelName: "Application Number already exists",
                  labelKey: "APPLICATION_NUMBER_ALREADY_EXISTS"
                }, "error"));
                return;
              }
            });

            primaryOwnerArray = (0, _get2.default)(bpaDetails, "landInfo.owners").filter(function (owr) {
              return owr && owr.isPrimaryOwner && owr.isPrimaryOwner == true;
            });
            // set(bpaDetails, "applicantName", primaryOwnerArray[0].name);

            dispatch((0, _actions2.prepareFinalObject)("ocScrutinyDetails", (0, _get2.default)(ocpayload, "edcrDetail[0]")));
            dispatch((0, _actions2.prepareFinalObject)("scrutinyDetails", (0, _get2.default)(edcrPayload, "edcrDetail[0]")));
            deviationValidation(action, state, dispatch);
            dispatch((0, _actions2.prepareFinalObject)("bpaDetails", bpaDetails));
            dispatch((0, _actions2.prepareFinalObject)("BPA.landInfo", (0, _get2.default)(bpaDetails, "landInfo", {})));
            setProposedBuildingData(state, dispatch, action, "ocApply");
            _context49.next = 47;
            return getLicenseDetails(state, dispatch);

          case 47:
            SHLicenseDetails = _context49.sent;

            dispatch((0, _actions2.prepareFinalObject)("BPA.appliedBy", SHLicenseDetails));
            dispatch((0, _actions2.prepareFinalObject)("BPA.applicantName", primaryOwnerArray[0].name));
            edcrDetailsToBpaDetails(state, dispatch);
            ocuupancyType(state, dispatch);
            _context49.next = 54;
            return permitNumberLink(state, dispatch, action);

          case 54:
            _context49.next = 59;
            break;

          case 56:
            _context49.prev = 56;
            _context49.t0 = _context49["catch"](0);

            dispatch((0, _actions2.toggleSnackbar)(true, { labelName: _context49.t0.message, labelKey: _context49.t0.message }, "info"));

          case 59:
          case "end":
            return _context49.stop();
        }
      }
    }, _callee48, undefined, [[0, 56]]);
  }));

  return function getOcEdcrDetails(_x140, _x141, _x142) {
    return _ref55.apply(this, arguments);
  };
}();

var applicantNameAppliedByMaping = exports.applicantNameAppliedByMaping = function () {
  var _ref56 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee49(state, dispatch, bpaDetails, ocDetails) {
    var primaryOwnerArray, tenantId, permitDetails, comparisionSuccess, SHLicenseDetails;
    return _regenerator2.default.wrap(function _callee49$(_context50) {
      while (1) {
        switch (_context50.prev = _context50.next) {
          case 0:
            primaryOwnerArray = bpaDetails && (0, _get2.default)(bpaDetails, "landInfo.owners") && (0, _get2.default)(bpaDetails, "landInfo.owners").length > 0 && (0, _get2.default)(bpaDetails, "landInfo.owners").filter(function (owr) {
              return owr && owr.isPrimaryOwner && owr.isPrimaryOwner == true;
            });
            tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
            _context50.next = 4;
            return getPermitDetails((0, _get2.default)(ocDetails, "permitNumber"), tenantId);

          case 4:
            permitDetails = _context50.sent;
            _context50.next = 7;
            return getComparisonResult(state, dispatch, tenantId, ocDetails.edcrNumber, permitDetails.edcrNumber);

          case 7:
            comparisionSuccess = _context50.sent;
            _context50.next = 10;
            return getLicenseDetails(state, dispatch);

          case 10:
            SHLicenseDetails = _context50.sent;

            dispatch((0, _actions2.prepareFinalObject)("bpaDetails", permitDetails));
            if (!SHLicenseDetails) {
              SHLicenseDetails = "NA";
            }
            dispatch((0, _actions2.prepareFinalObject)("BPA.appliedBy", SHLicenseDetails));
            dispatch((0, _actions2.prepareFinalObject)("BPA.applicantName", primaryOwnerArray && primaryOwnerArray[0] && primaryOwnerArray[0].name));
            _context50.next = 17;
            return permitNumberLink(state, dispatch);

          case 17:
            _context50.next = 19;
            return ocuupancyType(state, dispatch);

          case 19:
            _context50.next = 21;
            return residentialType(state, dispatch);

          case 21:
          case "end":
            return _context50.stop();
        }
      }
    }, _callee49, undefined);
  }));

  return function applicantNameAppliedByMaping(_x143, _x144, _x145, _x146) {
    return _ref56.apply(this, arguments);
  };
}();

function documentsSorting(a, b) {
  var orderA = a.orderNumber;
  var orderB = b.orderNumber;
  var comparison = 0;
  if (orderA > orderB) {
    comparison = 1;
  } else if (orderA < orderB) {
    comparison = -1;
  }
  return comparison;
}