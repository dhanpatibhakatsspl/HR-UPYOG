"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pageResetAndChange = exports.updateOwnerShipEdit = exports.updateStructureTypes = exports.updateMdmsDropDowns = exports.triggerUpdateByKey = exports.checkValueForNA = exports.getTextToLocalMapping = exports.fillOldLicenseData = exports.getTradeTypeDropdownData = exports.getEpochForDate = exports.sortByEpoch = exports.applyForm = exports.showCityPicker = exports.setFilteredTradeTypes = exports.getUniqueItemsFromArray = exports.getAllDataFromBillingSlab = exports.getDialogButton = exports.showHideBreakupPopup = exports.getDocList = exports.getTransformedStatus = exports.ifUserRoleExists = exports.setValidToFromVisibilityForApply = exports.setValidToFromVisibilityForSV = exports.setMultiOwnerForApply = exports.setMultiOwnerForSV = exports.fetchBill = exports.getBaseURL = exports.getFinancialYearDates = exports.getNextMonthDateInYMD = exports.epochToYmdDate = exports.validateFields = exports.getnextFinancialYear = exports.getCurrentFinancialYear = exports.createEstimateData = exports.prepareDocumentTypeObj = exports.downloadCertificateForm = exports.downloadAcknowledgementForm = exports.applyRequiredValidation = exports.validateOwners = exports.getDetailsForOwner = exports.getDetailsFromProperty = exports.getMdmsData = exports.getHeaderSideText = exports.showHideMapPopup = exports.getMapLocator = exports.getAutoSelector = exports.getReceiptData = exports.convertDateTimeToEpoch = exports.convertDateToEpoch = exports.convertEpochToDate = exports.getReceipt = exports.calculateBill = exports.getBill = exports.getSearchResults = exports.objectToDropdown = exports.commonTransform = exports.getButtonVisibility = exports.showHideAdhocPopup = exports.getIconStyle = exports.getFeesEstimateCard = exports.onClickPreviousButton = exports.onClickNextButton = exports.getFooterButtons = exports.getSubHeaderLabel = exports.getLocalityHarmedJson = exports.getHygeneLevelJson = exports.getSafetyNormsJson = exports.getCheckBoxJsonpath = exports.getApprovalTextField = exports.getTranslatedLabel = exports.transformById = exports.getContainerWithElement = exports.getApplicationNoContainer = exports.getRadioGroupWithLabel = exports.getRadioButton = exports.getUploadFilesMultiple = exports.getUploadFile = exports.getCheckbox = exports.getTooltip = exports.getAsteric = exports.getCommonApplyFooter = undefined;

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

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _commons = require("egov-common/ui-utils/commons");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../ui-utils/api");

require("./index.css");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

var _commons3 = require("egov-ui-kit/utils/commons");

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
      buttonLabel: { labelName: "UPLOAD FILES", labelKey: "TL_UPLOAD_FILES_BUTTON" },
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
    moduleName: "egov-tradelicence",
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

var showHideAdhocPopup = exports.showHideAdhocPopup = function showHideAdhocPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["pay"], "components.adhocDialog.props.open", false);
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("pay", "components.adhocDialog", "props.open", !toggle));
};

var getButtonVisibility = exports.getButtonVisibility = function getButtonVisibility(status, button) {
  if (status === "CITIZENACTIONREQUIRED" && button === "RESUBMIT") return true;
  if (status === "pending_payment" && button === "PROCEED TO PAYMENT") return true;
  if (status === "pending_approval" && button === "APPROVE") return true;
  if (status === "pending_approval" && button === "REJECT") return true;
  if (status === "approved" && button === "CANCEL TRADE LICENSE") return true;
  if (status === "APPROVED" && button === "APPROVED") return true;
  if (status === "EXPIRED" && button === "EXPIRED") return true;
  if (status === "PENDINGPAYMENT" && button === "PENDINGPAYMENT") return true;
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
            return (0, _api.httpRequest)("post", "/tl-services/v1/_search", "", queryObject);

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
            return (0, _api.httpRequest)("post", "/billing-service/bill/v2/_fetchbill", "", queryObject);

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
var calculateBill = exports.calculateBill = function () {
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "/tl-calculator/v1/_getbill", "", queryObject);

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

  return function calculateBill(_x4) {
    return _ref4.apply(this, arguments);
  };
}();
var getReceipt = exports.getReceipt = function () {
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", (0, _commons3.getPaymentSearchAPI)('TL'), "", queryObject);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);

            console.log(_context4.t0);

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function getReceipt(_x5) {
    return _ref5.apply(this, arguments);
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
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.prev = 0;
            _context5.next = 3;
            return (0, _api.httpRequest)("post", (0, _commons3.getPaymentSearchAPI)('TL'), "", queryObject);

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

  return function getReceiptData(_x7) {
    return _ref6.apply(this, arguments);
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
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.mapsDialog", "props.open", !toggle));
};

var getHeaderSideText = exports.getHeaderSideText = function getHeaderSideText(status) {
  var licenseNo = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  switch (status) {
    case "PAID":
    case "PENDINGAPPROVAL":
      return { word1: "Status: ", word2: "WF_NEWTL_PENDINGAPPROVAL" };
    case "PENDINGPAYMENT":
      return { word1: "Status: ", word2: "WF_NEWTL_PENDINGPAYMENT" };
    case "FIELDINSPECTION":
      return { word1: "Status: ", word2: "WF_NEWTL_FIELDINSPECTION" };
    case "APPLIED":
      return { word1: "Status: ", word2: "TL_APPLIED" };
    case "REJECTED":
      return { word1: "Status: ", word2: "TL_REJECTED" };
    case "CANCELLED":
      return { word1: "Trade License No: ", word2: "" + licenseNo };
    case "APPROVED":
      return { word1: "Trade License No: ", word2: "" + licenseNo };
    default:
      return { word1: "", word2: "" };
  }
};

var getMdmsData = exports.getMdmsData = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.prev = 0;
            _context6.next = 3;
            return (0, _api.httpRequest)("post", "egov-mdms-service/v1/_search", "", [], queryObject);

          case 3:
            response = _context6.sent;
            return _context6.abrupt("return", response);

          case 7:
            _context6.prev = 7;
            _context6.t0 = _context6["catch"](0);

            console.log(_context6.t0);
            return _context6.abrupt("return", {});

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 7]]);
  }));

  return function getMdmsData(_x9) {
    return _ref7.apply(this, arguments);
  };
}();

var getDetailsFromProperty = exports.getDetailsFromProperty = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(state, dispatch) {
    var propertyId, cityId, tenantId, payload;
    return _regenerator2.default.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _context7.prev = 0;
            propertyId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].propertyId", "");
            cityId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.address.tenantId", "");
            tenantId = ifUserRoleExists("CITIZEN") ? cityId : (0, _localStorageUtils.getTenantId)();

            if (tenantId) {
              _context7.next = 7;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please select city to search by property id !!",
              labelKey: "ERR_SELECT_CITY_TO_SEARCH_PROPERTY_ID"
            }, "warning"));
            return _context7.abrupt("return");

          case 7:
            if (!propertyId) {
              _context7.next = 12;
              break;
            }

            _context7.next = 10;
            return (0, _api.httpRequest)("post", "/pt-services-v2/property/_search?tenantId=" + tenantId + "&ids=" + propertyId, "_search", [], {});

          case 10:
            payload = _context7.sent;

            if (payload && payload.Properties && payload.Properties.hasOwnProperty("length")) {
              if (payload.Properties.length === 0) {
                dispatch((0, _actions.toggleSnackbar)(true, {
                  labelName: "Property is not found with this Property Id",
                  labelKey: "ERR_PROPERTY_NOT_FOUND_WITH_PROPERTY_ID"
                }, "info"));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocPropertyID", "props.value", ""));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.value", {
                  value: payload.Properties[0].address.locality.code,
                  label: payload.Properties[0].address.locality.name
                }));
                dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address", payload.Properties[0].address));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.children.cityDropdown", "props.value", payload.Properties[0].address.tenantId));
              }
            }

          case 12:
            _context7.next = 17;
            break;

          case 14:
            _context7.prev = 14;
            _context7.t0 = _context7["catch"](0);

            console.log(_context7.t0);

          case 17:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 14]]);
  }));

  return function getDetailsFromProperty(_x10, _x11) {
    return _ref8.apply(this, arguments);
  };
}();

var getDetailsForOwner = exports.getDetailsForOwner = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(state, dispatch, fieldInfo) {
    var cardIndex, ownerNo, owners, oldOwnersArr, matchingOwnerIndex, payload, userInfo, currOwnersArr;
    return _regenerator2.default.wrap(function _callee8$(_context8) {
      while (1) {
        switch (_context8.prev = _context8.next) {
          case 0:
            _context8.prev = 0;
            cardIndex = fieldInfo && fieldInfo.index ? fieldInfo.index : "0";
            ownerNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners[" + cardIndex + "].mobileNumber", "");
            owners = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners", []);
            //owners from search call before modification.

            oldOwnersArr = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].tradeLicenseDetail.owners", []);
            //Same no search on Same index

            if (!(ownerNo === owners[cardIndex].userName)) {
              _context8.next = 8;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Owner already added !",
              labelKey: "ERR_OWNER_ALREADY_ADDED"
            }, "error"));
            return _context8.abrupt("return");

          case 8:

            //Same no search in whole array
            matchingOwnerIndex = owners.findIndex(function (item) {
              return item.userName === ownerNo;
            });

            if (!(matchingOwnerIndex > -1)) {
              _context8.next = 14;
              break;
            }

            if (!(0, _isUndefined2.default)(owners[matchingOwnerIndex].userActive) && owners[matchingOwnerIndex].userActive === false) {
              //rearrange
              dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners[" + matchingOwnerIndex + "].userActive", true));
              dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners[" + cardIndex + "].userActive", false));
              //Delete if current card was not part of oldOwners array - no need to save.
              if (oldOwnersArr.findIndex(function (item) {
                return owners[cardIndex].userName === item.userName;
              }) == -1) {
                owners.splice(cardIndex, 1);
                dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", owners));
              }
            } else {
              dispatch((0, _actions.toggleSnackbar)(true, {
                labelName: "Owner already added !",
                labelKey: "ERR_OWNER_ALREADY_ADDED_1"
              }, "error"));
            }
            return _context8.abrupt("return");

          case 14:
            _context8.next = 16;
            return (0, _api.httpRequest)("post", "/user/_search?tenantId=" + _common2.default.tenantId, "_search", [], {
              tenantId: _common2.default.tenantId,
              userName: "" + ownerNo
            });

          case 16:
            payload = _context8.sent;

            if (payload && payload.user && payload.user.hasOwnProperty("length")) {
              if (payload.user.length === 0) {
                dispatch((0, _actions.toggleSnackbar)(true, {
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
                // if (oldOwnersArr.length > 0) {
                //   currOwnersArr.push({
                //     ...oldOwnersArr[cardIndex],
                //     userActive: false
                //   });
                // }
                dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", currOwnersArr));
                // dispatch(
                //   prepareFinalObject(
                //     `Licenses[0].tradeLicenseDetail.owners[0].mobileNumber`,
                //     ownerNo
                //   )
                // );
                validateOwners(state, dispatch);
              }
            }

          case 18:
            _context8.next = 23;
            break;

          case 20:
            _context8.prev = 20;
            _context8.t0 = _context8["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, _context8.t0.message, "info"));

          case 23:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 20]]);
  }));

  return function getDetailsForOwner(_x12, _x13, _x14) {
    return _ref9.apply(this, arguments);
  };
}();

var validateOwners = exports.validateOwners = function validateOwners(state, dispatch) {
  var ownersJsonPath = "";
  var owners = [];
  var ownership = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory", "INDIVIDUAL");
  ownership = ownership.split(".")[0];
  if (ownership === "INDIVIDUAL") {
    ownersJsonPath = "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items";
    owners = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, ownersJsonPath, []);
    for (var i = 0; i < owners.length; i++) {
      var obj = owners[i]["item" + i].children.cardContent.children.tradeUnitCardContainer.children;
      applyRequiredValidation(obj, state, dispatch);
    }
  } else {
    ownersJsonPath = "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional";
    owners = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, ownersJsonPath, []);
    var _obj = owners.children.cardContent.children.tradeUnitCardContainerInstitutional.children;
    applyRequiredValidation(_obj, state, dispatch);
  }
};

var applyRequiredValidation = exports.applyRequiredValidation = function applyRequiredValidation(obj, state, dispatch) {
  Object.keys(obj).map(function (item) {
    var jsonPath = obj[item].jsonPath;
    var componentJsonpath = obj[item].componentJsonpath;
    var isFieldValid = obj[item].isFieldValid;
    var value = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, jsonPath, null);
    if (value && !isFieldValid) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", componentJsonpath, "props.error", false));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", componentJsonpath, "props.helperText", ""));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", componentJsonpath, "isFieldValid", true));
    }
  });
};

var getStatementForDocType = function getStatementForDocType(docType) {
  switch (docType) {
    case "OWNERIDPROOF":
      return "TL_OWNERIDPROOF_NOTE";
    case "OWNERSHIPPROOF":
      return "TL_OWNERSHIPPROOF_NOTE";
    case "OWNERPHOTO":
      return "TL_OWNERPHOTO_NOTE";
    default:
      return "";
  }
};

var downloadAcknowledgementForm = exports.downloadAcknowledgementForm = function downloadAcknowledgementForm(Licenses) {
  var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "download";


  var queryStr = [{ key: "key", value: "tlapplication" }, { key: "tenantId", value: _common2.default.tenantId }];
  var DOWNLOADRECEIPT = {
    GET: {
      URL: "/pdf-service/v1/_create",
      ACTION: "_get"
    }
  };
  try {
    (0, _api.httpRequest)("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Licenses: Licenses }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' }).then(function (res) {
      res.filestoreIds[0];
      if (res && res.filestoreIds && res.filestoreIds.length > 0) {
        res.filestoreIds.map(function (fileStoreId) {
          (0, _commons.downloadReceiptFromFilestoreID)(fileStoreId, mode);
        });
      } else {
        console.log("Error In Acknowledgement form Download");
      }
    });
  } catch (exception) {
    alert('Some Error Occured while downloading Acknowledgement form!');
  }
};

var downloadCertificateForm = exports.downloadCertificateForm = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(Licenses) {
    var mode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'download';
    var tenantId, applicationNumber, applicationType, queryStr, DOWNLOADRECEIPT, queryObject, LicensesPayload, updatedLicenses, oldFileStoreId;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            tenantId = (0, _get2.default)(Licenses[0], "tenantId");
            applicationNumber = (0, _get2.default)(Licenses[0], "applicationNumber");
            applicationType = Licenses && Licenses.length > 0 ? (0, _get2.default)(Licenses[0], "applicationType") : "NEW";
            queryStr = [{ key: "key", value: applicationType === "RENEWAL" ? "tlrenewalcertificate" : "tlcertificate" }, { key: "tenantId", value: _common2.default.tenantId }];
            DOWNLOADRECEIPT = {
              GET: {
                URL: "/pdf-service/v1/_create",
                ACTION: "_get"
              }
            };
            queryObject = [{ key: "tenantId", value: tenantId }, {
              key: "applicationNumber",
              value: applicationNumber
            }];
            _context9.next = 8;
            return getSearchResults(queryObject);

          case 8:
            LicensesPayload = _context9.sent;
            updatedLicenses = (0, _get2.default)(LicensesPayload, "Licenses");
            oldFileStoreId = (0, _get2.default)(updatedLicenses[0], "fileStoreId");

            if (oldFileStoreId) {
              (0, _commons.downloadReceiptFromFilestoreID)(oldFileStoreId, mode);
            } else {
              try {
                (0, _api.httpRequest)("post", DOWNLOADRECEIPT.GET.URL, DOWNLOADRECEIPT.GET.ACTION, queryStr, { Licenses: Licenses }, { 'Accept': 'application/json' }, { responseType: 'arraybuffer' }).then(function (res) {
                  res.filestoreIds[0];
                  if (res && res.filestoreIds && res.filestoreIds.length > 0) {
                    res.filestoreIds.map(function (fileStoreId) {
                      (0, _commons.downloadReceiptFromFilestoreID)(fileStoreId, mode);
                    });
                  } else {
                    console.log("Error In Acknowledgement form Download");
                  }
                });
              } catch (exception) {
                alert('Some Error Occured while downloading Acknowledgement form!');
              }
            }

          case 12:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function downloadCertificateForm(_x16) {
    return _ref10.apply(this, arguments);
  };
}();

var prepareDocumentTypeObj = exports.prepareDocumentTypeObj = function prepareDocumentTypeObj(documents) {
  var documentsArr = documents.length > 0 ? documents.reduce(function (documentsArr, item, ind) {
    documentsArr.push((0, _extends3.default)({}, item, {
      jsonPath: "Licenses[0].tradeLicenseDetail.applicationDocuments[" + ind + "]"
    }));
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

var getEstimateData = function getEstimateData(ResponseData, isPaid, LicenseData) {
  if (ResponseData) {
    // const extraData = ["TL_COMMON_REBATE", "TL_COMMON_PEN"].map(item => {
    //   return {
    //     name: {
    //       labelName: item,
    //       labelKey: item
    //     },
    //     value: null,
    //     info: getToolTipInfo(item, LicenseData) && {
    //       value: getToolTipInfo(item, LicenseData),
    //       key: getToolTipInfo(item, LicenseData)
    //     }
    //   };
    // });
    var billAccountDetails = ResponseData.billDetails[0].billAccountDetails;

    var transformedData = billAccountDetails.reduce(function (result, item) {
      if (isPaid) {
        item.accountDescription && result.push({
          name: {
            labelName: item.accountDescription.split("-")[0],
            labelKey: item.accountDescription.split("-")[0]
          },
          // value: getTaxValue(item)            
          value: item.amount,
          info: getToolTipInfo(item.accountDescription.split("-")[0], LicenseData) && {
            value: getToolTipInfo(item.accountDescription.split("-")[0], LicenseData),
            key: getToolTipInfo(item.accountDescription.split("-")[0], LicenseData)
          }
        });
        item.taxHeadCode && result.push({
          name: {
            labelName: item.taxHeadCode,
            labelKey: item.taxHeadCode
          },
          // value: getTaxValue(item),
          value: item.amount,
          info: getToolTipInfo(item.taxHeadCode, LicenseData) && {
            value: getToolTipInfo(item.taxHeadCode, LicenseData),
            key: getToolTipInfo(item.taxHeadCode, LicenseData)
          }
        });
      } else {
        item.taxHeadCode && result.push({
          name: {
            labelName: item.taxHeadCode,
            labelKey: item.taxHeadCode
          },
          value: item.amount,
          // value: getTaxValue(item),
          // value : get(ResponseData , "totalAmount"),
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
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(dispatch, billingSlabIds, tenantId, accessories) {
    var _ref12, accesssoryBillingSlabIds, tradeTypeBillingSlabIds, accessoryUnit, tradeUnit, billingData, queryObject, response, tradeTotal, accessoriesTotal, finalData, accessoryData, tradeUnitData;

    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            _ref12 = billingSlabIds || {}, accesssoryBillingSlabIds = _ref12.accesssoryBillingSlabIds, tradeTypeBillingSlabIds = _ref12.tradeTypeBillingSlabIds;

            if (!(accesssoryBillingSlabIds || tradeTypeBillingSlabIds)) {
              _context10.next = 24;
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
            _context10.prev = 7;
            _context10.next = 10;
            return (0, _api.httpRequest)("post", "/tl-calculator/billingslab/_search", "", queryObject);

          case 10:
            response = _context10.sent;
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

            dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].billingSlabData.tradeUnitData", tradeUnitData));
            dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].billingSlabData.tradeTotal", tradeTotal));
            dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].billingSlabData.accessoriesUnitData", accessoryData));
            dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].billingSlabData.accessoriesTotal", accessoriesTotal));
            _context10.next = 24;
            break;

          case 21:
            _context10.prev = 21;
            _context10.t0 = _context10["catch"](7);

            dispatch((0, _actions.toggleSnackbar)(open, {
              lableName: "Billing Slab error!",
              labelKey: "ERR_BILLING_SLAB_ERROR"
            }, "error"));

          case 24:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined, [[7, 21]]);
  }));

  return function getBillingSlabData(_x18, _x19, _x20, _x21) {
    return _ref11.apply(this, arguments);
  };
}();

var isApplicationPaid = function isApplicationPaid(currentStatus, workflowCode) {
  var isPAID = false;
  if (currentStatus === "CITIZENACTIONREQUIRED") {
    return isPAID;
  }
  var businessServiceData = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData"));

  if (!(0, _isEmpty2.default)(businessServiceData)) {
    var tlBusinessService = JSON.parse((0, _localStorageUtils.localStorageGet)("businessServiceData")).filter(function (item) {
      return item.businessService === workflowCode;
    });
    var states = tlBusinessService && tlBusinessService.length > 0 && tlBusinessService[0].states;
    for (var i = 0; i < states.length; i++) {
      if (states[i].state === currentStatus) {
        break;
      }
      if (states[i].actions && states[i].actions.filter(function (item) {
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
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(LicenseData, jsonPath, dispatch) {
    var href = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var getFromReceipt = arguments[4];
    var workflowCode, applicationNo, tenantId, businessService, queryObj, getBillQueryObj, currentStatus, isPAID, fetchBillResponse, payload, estimateData, accessories, getBillResponse, event;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            workflowCode = (0, _get2.default)(LicenseData, "workflowCode") ? (0, _get2.default)(LicenseData, "workflowCode") : "NewTL";
            applicationNo = (0, _get2.default)(LicenseData, "applicationNumber") || (0, _commons2.getQueryArg)(href, "applicationNumber");
            tenantId = (0, _get2.default)(LicenseData, "tenantId") || (0, _commons2.getQueryArg)(href, "tenantId");
            businessService = "TL"; //Hardcoding Alert

            queryObj = [{ key: "tenantId", value: tenantId }, {
              key: "consumerCodes",
              value: applicationNo
            }, {
              key: "businessService",
              value: businessService
            }];
            getBillQueryObj = [{ key: "tenantId", value: tenantId }, {
              key: "consumerCode",
              value: applicationNo
            }, {
              key: "businessService",
              value: businessService
            }];
            currentStatus = LicenseData.status;
            isPAID = isApplicationPaid(currentStatus, workflowCode);
            _context11.next = 10;
            return getBill(getBillQueryObj);

          case 10:
            fetchBillResponse = _context11.sent;

            if (!isPAID) {
              _context11.next = 17;
              break;
            }

            _context11.next = 14;
            return getReceipt(queryObj.filter(function (item) {
              return item.key !== "businessService";
            }));

          case 14:
            _context11.t0 = _context11.sent;
            _context11.next = 18;
            break;

          case 17:
            _context11.t0 = fetchBillResponse && fetchBillResponse.Bill && fetchBillResponse.Bill[0];

          case 18:
            payload = _context11.t0;
            estimateData = payload ? isPAID ? payload && payload.Payments && payload.Payments.length > 0 && getEstimateData(payload.Payments[0].paymentDetails[0].bill, isPAID, LicenseData) : payload && getEstimateData(payload, false, LicenseData) : [];

            estimateData = estimateData || [];
            (0, _set2.default)(estimateData, "payStatus", isPAID);
            dispatch((0, _actions.prepareFinalObject)(jsonPath, estimateData));
            accessories = (0, _get2.default)(LicenseData, "tradeLicenseDetail.accessories", []);

            if (!payload) {
              _context11.next = 29;
              break;
            }

            _context11.next = 27;
            return calculateBill(getBillQueryObj);

          case 27:
            getBillResponse = _context11.sent;

            getBillResponse && getBillResponse.billingSlabIds && getBillingSlabData(dispatch, getBillResponse.billingSlabIds, tenantId, accessories);

          case 29:

            /** Waiting for estimate to load while downloading confirmation form */
            event = new CustomEvent("estimateLoaded", { detail: true });

            window.parent.document.dispatchEvent(event);
            /** END */

            return _context11.abrupt("return", payload);

          case 32:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function createEstimateData(_x22, _x23, _x24) {
    return _ref13.apply(this, arguments);
  };
}();

var getCurrentFinancialYear = exports.getCurrentFinancialYear = function getCurrentFinancialYear() {
  var today = new Date();
  var curMonth = today.getMonth();
  var fiscalYr = "";
  if (curMonth >= 3) {
    var nextYr1 = (today.getFullYear() + 1).toString();
    var nextYr1format = nextYr1.substring(2, 4);
    fiscalYr = today.getFullYear().toString() + "-" + nextYr1format;
  } else {
    var nextYr2 = today.getFullYear().toString();
    var nextYr2format = nextYr2.substring(2, 4);
    fiscalYr = (today.getFullYear() - 1).toString() + "-" + nextYr2format;
  }
  return fiscalYr;
};

var getnextFinancialYear = exports.getnextFinancialYear = function getnextFinancialYear(year) {
  var nextFY = year.substring(0, 2) + (parseInt(year.substring(2, 4)) + 1) + year.substring(4, 5) + (parseInt(year.substring(5, 7)) + 1);
  return nextFY;
};

var validateFields = exports.validateFields = function validateFields(objectJsonPath, state, dispatch) {
  var screen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "apply";

  var fields = (0, _get2.default)(state.screenConfiguration.screenConfig[screen], objectJsonPath, {});
  var isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].componentPath != "DynamicMdmsContainer" && fields[variable].props && fields[variable].jsonPath && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils2.validate)(screen, (0, _extends3.default)({}, fields[variable], {
        value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, fields[variable].jsonPath)
      }), dispatch, true)) {
        isFormValid = false;
      } else if (fields[variable] && fields[variable].componentPath == "DynamicMdmsContainer" && fields[variable].props) {
        (function () {
          var _fields$variable$prop = fields[variable].props,
              masterName = _fields$variable$prop.masterName,
              moduleName = _fields$variable$prop.moduleName,
              rootBlockSub = _fields$variable$prop.rootBlockSub,
              dropdownFields = _fields$variable$prop.dropdownFields;

          var isIndex = fields[variable].index || 0;
          dropdownFields.forEach(function (item, i) {
            var isValid = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + isIndex + "]." + item.key, '');
            if (isValid == '' || isValid == 'none') {
              isFormValid = false;
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", fields[variable].componentJsonpath + ".props.dropdownFields[" + i + "]", "isRequired", true));
            }
          });
        })();
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

var getNextMonthDateInYMD = exports.getNextMonthDateInYMD = function getNextMonthDateInYMD() {
  //For getting date of same day but of next month
  var date = (0, _commons2.getTodaysDateInYMD)();
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
  var _ref14 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(action, state, dispatch) {
    var queryObject, LicensesPayload, payload;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            //For Adhoc
            // Search License
            queryObject = [{ key: "tenantId", value: (0, _commons2.getQueryArg)(window.location.href, "tenantId") }, {
              key: "applicationNumber",
              value: (0, _commons2.getQueryArg)(window.location.href, "applicationNumber")
            }];
            _context12.next = 3;
            return getSearchResults(queryObject);

          case 3:
            LicensesPayload = _context12.sent;
            _context12.t0 = LicensesPayload && LicensesPayload.Licenses;

            if (!_context12.t0) {
              _context12.next = 9;
              break;
            }

            _context12.next = 8;
            return createEstimateData(LicensesPayload.Licenses[0], "LicensesTemp[0].estimateCardData", dispatch, window.location.href);

          case 8:
            _context12.t0 = _context12.sent;

          case 9:
            payload = _context12.t0;

            //set in redux to be used for adhoc
            LicensesPayload && LicensesPayload.Licenses && dispatch((0, _actions.prepareFinalObject)("Licenses[0]", LicensesPayload.Licenses[0]));

            //initiate receipt object
            payload && payload.billResponse && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0]", payload.billResponse.Bill[0]));

            //set amount paid as total amount from bill - destination changed in CS v1.1
            payload && payload.billResponse && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].taxAndPayments[0].amountPaid", payload.billResponse.Bill[0].billDetails[0].totalAmount));

            //Collection Type Added in CS v1.1
            payload && payload.billResponse && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].Bill[0].billDetails[0].collectionType", "COUNTER"));

            //set total amount in instrument
            payload && payload.billResponse && dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.amount", payload.billResponse.Bill[0].billDetails[0].totalAmount));

            //Initially select instrument type as Cash
            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.instrumentType.name", "Cash"));

            //set tenantId
            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].tenantId", (0, _commons2.getQueryArg)(window.location.href, "tenantId")));

            //set tenantId in instrument
            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.tenantId", (0, _commons2.getQueryArg)(window.location.href, "tenantId")));

          case 18:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined);
  }));

  return function fetchBill(_x27, _x28, _x29) {
    return _ref14.apply(this, arguments);
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

var getDocList = exports.getDocList = function getDocList(state, dispatch) {
  var tradeUnits = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.tradeUnits[0]");

  var documentObj = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.documentObj");
  var documentTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.DocumentType");

  var applicationType = (0, _commons2.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" ? "RENEWAL" : (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].applicationType", "NEW");
  var documentObjArray = documentObj && tradeUnits && documentObj.filter(function (item) {
    return item.tradeType === tradeUnits.tradeType.split(".")[0];
  });

  var filteredDocTypes = documentObjArray[0].allowedDocs.reduce(function (acc, item, index) {
    documentTypes.find(function (document, index) {
      if (document.code === item.documentType) acc.push((0, _extends3.default)({}, documentTypes[index]));
    });
    return acc;
  }, []);
  var applicationDocArray = filteredDocTypes && filteredDocTypes.reduce(function (result, item) {
    var transformedDocObj = documentObjArray[0].allowedDocs.filter(function (docObj) {
      return docObj.documentType === item.code;
    })[0];
    if (transformedDocObj.applicationType.includes(applicationType)) {
      result.push({
        code: item.code,
        maxFileSize: item.maxFileSize,
        required: transformedDocObj.required,
        formatProps: {
          accept: item.allowedFormat.join(",")
        },
        description: "COMMON_" + item.code + "_DESCRIPTION",
        statement: "COMMON_" + item.code + "_STATEMENT"
      });
    }
    return result;
  }, []);

  var applicationDocument = prepareDocumentTypeObj(applicationDocArray);
  dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].applicationDocuments", applicationDocument));

  //REARRANGE APPLICATION DOCS FROM TL SEARCH IN EDIT FLOW
  var applicationDocs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.applicationDocuments", []);
  var applicationDocsReArranged = applicationDocs && applicationDocs.length && applicationDocument.reduce(function (acc, item) {
    var index = applicationDocs.findIndex(function (i) {
      return i.documentType === item.code;
    });
    if (index > -1) {
      acc.push(applicationDocs[index]);
    }
    return acc;
  }, []);
  applicationDocsReArranged && dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.applicationDocuments", applicationDocsReArranged));
};

var showHideBreakupPopup = exports.showHideBreakupPopup = function showHideBreakupPopup(state, dispatch, screenKey) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig[screenKey], "components.breakUpDialog.props.open", false);
  dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, "components.breakUpDialog", "props.open", !toggle));
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
  var _ref15 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(tenantId) {
    var payload;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.next = 2;
            return (0, _api.httpRequest)("post", "/tl-calculator/billingslab/_search?tenantId=" + tenantId, "_search", [], {});

          case 2:
            payload = _context13.sent;
            return _context13.abrupt("return", payload);

          case 4:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined);
  }));

  return function getAllBillingSlabs(_x30) {
    return _ref15.apply(this, arguments);
  };
}();

var getAllDataFromBillingSlab = exports.getAllDataFromBillingSlab = function () {
  var _ref16 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee14(tenantId, dispatch) {
    var payload, processedData, accessories, structureTypes, licenseTypes;
    return _regenerator2.default.wrap(function _callee14$(_context14) {
      while (1) {
        switch (_context14.prev = _context14.next) {
          case 0:
            _context14.next = 2;
            return getAllBillingSlabs(tenantId);

          case 2:
            payload = _context14.sent;
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
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.common-masters.StructureType", structureTypes.StructureType));
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.TradeLicense.AccessoriesCategory", accessories));
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.TradeLicense.licenseType", licenseTypes));
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.common-masters.StructureTypeTransformed", objectToDropdown(structureTypes.StructureType)));
            dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeType", processedData.tradeTypeData));

          case 14:
          case "end":
            return _context14.stop();
        }
      }
    }, _callee14, undefined);
  }));

  return function getAllDataFromBillingSlab(_x31, _x32) {
    return _ref16.apply(this, arguments);
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
        dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.TradeLicense.filteredTradeTypeTree", tradeTypeTransformed.TradeType));
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
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["home"], "components.cityPickerDialog.props.open", false);
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("home", "components.cityPickerDialog", "props.open", !toggle));
};

var applyForm = exports.applyForm = function applyForm(state, dispatch, action) {
  var tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "citiesByModule.citizenTenantId");
  var reqDocUi = (0, _get2.default)(state, "screenConfiguration.screenConfig.home.components.adhocDialog.children.popup", []);
  (0, _set2.default)(reqDocUi, 'children.footer.children.footerChildElement.children.applyButton.onClickDefination', {
    action: "condition",
    callBack: function callBack(state, dispatch) {
      dispatch((0, _actions.prepareFinalObject)('documentsUploadRedux', {}));
      var applyUrl = process.env.NODE_ENV === "production" ? "/tradelicense-citizen/apply?tenantId=" + tenantId : process.env.REACT_APP_SELF_RUNNING === true ? "/egov-ui-framework/tradelicense-citizen/apply?tenantId=" + tenantId : "/tradelicense-citizen/apply?tenantId=" + tenantId;
      dispatch((0, _actions2.setRoute)(applyUrl));
    }
  });
  (0, _set2.default)(action, "screenConfig.components.adhocDialog.children.popup", reqDocUi);
  var isTradeDetailsValid = validateFields("components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children", state, dispatch, "home");
  if (isTradeDetailsValid) {
    (0, _commons2.showHideAdhocPopup)(state, dispatch, "home");
  }
  dispatch((0, _actions.prepareFinalObject)("Licenses", []));
  dispatch((0, _actions.prepareFinalObject)("LicensesTemp", []));
  dispatch((0, _actions.prepareFinalObject)("DynamicMdms", []));
};

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

var getTradeTypeDropdownData = exports.getTradeTypeDropdownData = function getTradeTypeDropdownData(tradeTypes) {
  return tradeTypes && tradeTypes.TradeType && Object.keys(tradeTypes.TradeType).map(function (item) {
    return { code: item, active: true };
  });
};

var fillOldLicenseData = exports.fillOldLicenseData = function () {
  var _ref17 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee15(state, dispatch) {
    return _regenerator2.default.wrap(function _callee15$(_context15) {
      while (1) {
        switch (_context15.prev = _context15.next) {
          case 0:
            dispatch((0, _actions.initScreen)("apply", (0, _get2.default)(state.screenConfiguration, "screenConfig.apply", {})));

          case 1:
          case "end":
            return _context15.stop();
        }
      }
    }, _callee15, undefined);
  }));

  return function fillOldLicenseData(_x33, _x34) {
    return _ref17.apply(this, arguments);
  };
}();

var getTextToLocalMapping = exports.getTextToLocalMapping = function getTextToLocalMapping(label) {
  var localisationLabels = (0, _commons2.getTransformedLocalStorgaeLabels)();
  switch (label) {
    case "Application No":
      return (0, _commons2.getLocaleLabels)("Application No", "TL_COMMON_TABLE_COL_APP_NO", localisationLabels);

    case "License No":
      return (0, _commons2.getLocaleLabels)("License No", "TL_COMMON_TABLE_COL_LIC_NO", localisationLabels);

    case "Trade Name":
      return (0, _commons2.getLocaleLabels)("Trade Name", "TL_COMMON_TABLE_COL_TRD_NAME", localisationLabels);
    case "Owner Name":
      return (0, _commons2.getLocaleLabels)("Owner Name", "TL_COMMON_TABLE_COL_OWN_NAME", localisationLabels);

    case "Application Date":
      return (0, _commons2.getLocaleLabels)("Application Date", "TL_COMMON_TABLE_COL_APP_DATE", localisationLabels);

    case "Status":
      return (0, _commons2.getLocaleLabels)("Status", "TL_COMMON_TABLE_COL_STATUS", localisationLabels);
    case "INITIATED":
      return (0, _commons2.getLocaleLabels)("Initiated,", "TL_INITIATED", localisationLabels);
    case "APPLIED":
      return (0, _commons2.getLocaleLabels)("Applied", "TL_APPLIED", localisationLabels);
    case "PAID":
      return (0, _commons2.getLocaleLabels)("Paid", "WF_NEWTL_PENDINGAPPROVAL", localisationLabels);
    case "APPROVED":
      return (0, _commons2.getLocaleLabels)("Approved", "TL_APPROVED", localisationLabels);
    case "REJECTED":
      return (0, _commons2.getLocaleLabels)("Rejected", "TL_REJECTED", localisationLabels);
    case "CANCELLED":
      return (0, _commons2.getLocaleLabels)("Cancelled", "TL_CANCELLED", localisationLabels);
    case "PENDINGAPPROVAL":
      return (0, _commons2.getLocaleLabels)("Pending for Approval", "WF_NEWTL_PENDINGAPPROVAL", localisationLabels);
    case "PENDINGPAYMENT":
      return (0, _commons2.getLocaleLabels)("Pending payment", "WF_NEWTL_PENDINGPAYMENT", localisationLabels);

    case "FIELDINSPECTION":
      return (0, _commons2.getLocaleLabels)("Pending for Field Inspection", "WF_NEWTL_FIELDINSPECTION", localisationLabels);

    case "Search Results for Trade License Applications":
      return (0, _commons2.getLocaleLabels)("", "TL_HOME_SEARCH_RESULTS_TABLE_HEADING", localisationLabels);

    case "MY_APPLICATIONS":
      return (0, _commons2.getLocaleLabels)("My Applications", "TL_MY_APPLICATIONS", localisationLabels);
    case "Financial Year":
      return (0, _commons2.getLocaleLabels)("Financial Year", "TL_COMMON_TABLE_COL_FIN_YEAR", localisationLabels);
    case "Application Type":
      return (0, _commons2.getLocaleLabels)("Application Type", "TL_COMMON_TABLE_COL_APP_TYPE", localisationLabels);
    case "RENEWAL":
      return (0, _commons2.getLocaleLabels)("Renewal", "TL_TYPE_RENEWAL", localisationLabels);
    case "NEW":
      return (0, _commons2.getLocaleLabels)("New", "TL_TYPE_NEW", localisationLabels);
  }
};

var checkValueForNA = exports.checkValueForNA = function checkValueForNA(value) {
  return value ? value : "NA";
};
var triggerUpdateByKey = exports.triggerUpdateByKey = function triggerUpdateByKey(state, keyIndex, value, dispatch) {
  if (dispatch == "set") {
    (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.TradeLicense.tradeUnits.selectedValues[" + keyIndex + "]", value);
  } else {
    dispatch((0, _actions.prepareFinalObject)("DynamicMdms.TradeLicense.tradeUnits." + keyIndex, value));
  }
};
var updateMdmsDropDowns = exports.updateMdmsDropDowns = function () {
  var _ref18 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee16(state, dispatch) {
    var tradeSubTypes;
    return _regenerator2.default.wrap(function _callee16$(_context16) {
      while (1) {
        switch (_context16.prev = _context16.next) {
          case 0:
            tradeSubTypes = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].tradeLicenseDetail.tradeUnits", []);

            if (tradeSubTypes.length > 0) {
              try {
                tradeSubTypes.forEach(function (tradeSubType, i) {
                  var tradeCat = tradeSubType.tradeType.split(".")[0];
                  var tradeType = tradeSubType.tradeType.split(".")[1];
                  var formObj = {
                    tradeCategory: tradeCat, tradeType: tradeType, tradeSubType: tradeSubType.tradeType
                  };
                  triggerUpdateByKey(state, i, formObj, 'set');

                  triggerUpdateByKey(state, "tradeTypeTransformed.allDropdown[" + i + "]", (0, _commons2.getObjectKeys)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.TradeLicense.tradeUnits.tradeUnitsTransformed." + tradeCat, [])), dispatch);
                  triggerUpdateByKey(state, "tradeSubTypeTransformed.allDropdown[" + i + "]", (0, _commons2.getObjectValues)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.TradeLicense.tradeUnits.tradeUnitsTransformed." + tradeCat + "." + tradeType, [])), dispatch);

                  triggerUpdateByKey(state, "selectedValues[" + i + "]", formObj, dispatch);
                });
              } catch (e) {
                console.log(e);
              }
            }

          case 2:
          case "end":
            return _context16.stop();
        }
      }
    }, _callee16, undefined);
  }));

  return function updateMdmsDropDowns(_x35, _x36) {
    return _ref18.apply(this, arguments);
  };
}();
var updateStructureTypes = exports.updateStructureTypes = function () {
  var _ref19 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee17(state, dispatch) {
    var structType, dropDownValues, structureSubTypeDropValues;
    return _regenerator2.default.wrap(function _callee17$(_context17) {
      while (1) {
        switch (_context17.prev = _context17.next) {
          case 0:
            structType = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].tradeLicenseDetail.structureType");

            if (structType) {
              (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.LicensesTemp[0].tradeLicenseDetail.structureType", structType.split(".")[0]);
              try {
                dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.structureTypes.selectedValues[0].structureType", structType.split(".")[0]));

                dropDownValues = (0, _commons2.getObjectValues)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.common-masters.structureTypes.structureTypesTransformed." + structType.split(".")[0], []));
                structureSubTypeDropValues = [];

                if (dropDownValues && dropDownValues.length === 0) {
                  dropDownValues = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.StructureType", []);
                  if (dropDownValues && dropDownValues, length > 0) {
                    structureSubTypeDropValues = dropDownValues.filter(function (data) {
                      return data.code.split('.')[0] === structType.split(".")[0];
                    });
                    dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.structureTypes.structureSubTypeTransformed.allDropdown[0]", structureSubTypeDropValues));
                  }
                } else {
                  dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.structureTypes.structureSubTypeTransformed.allDropdown[0]", dropDownValues));
                }

                // dispatch(prepareFinalObject( `DynamicMdms.common-masters.structureTypes.structureSubTypeTransformed.allDropdown[0]`, getObjectValues(get( state, `screenConfiguration.preparedFinalObject.DynamicMdms.common-masters.structureTypes.structureTypesTransformed.${structType.split(".")[0]}`, [])) ));

                dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.structureTypes.selectedValues[0].structureSubType", structType));
                dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.structureType", structType));
                dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.structureSubType", structType));
              } catch (e) {
                console.log(e);
              }
            }

          case 2:
          case "end":
            return _context17.stop();
        }
      }
    }, _callee17, undefined);
  }));

  return function updateStructureTypes(_x37, _x38) {
    return _ref19.apply(this, arguments);
  };
}();
var updateOwnerShipEdit = exports.updateOwnerShipEdit = function () {
  var _ref20 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee18(state, dispatch) {
    var tradeSubOwnershipCat, tradeOwnershipCat, ownerInfoCards, singleCard;
    return _regenerator2.default.wrap(function _callee18$(_context18) {
      while (1) {
        switch (_context18.prev = _context18.next) {
          case 0:
            tradeSubOwnershipCat = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.Licenses[0].tradeLicenseDetail.subOwnerShipCategory");
            tradeOwnershipCat = "";

            if (tradeSubOwnershipCat) {
              tradeOwnershipCat = tradeSubOwnershipCat.split(".")[0];
            } else {
              tradeOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.common-masters.tradeOwner.ownershipTransformed[0].code", "");
              tradeSubOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.common-masters.tradeOwner.ownershipTransformed." + tradeOwnershipCat + "[0].code", "");
              (0, _set2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory", tradeSubOwnershipCat);

              dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.subOwnerShipCategory", tradeSubOwnershipCat));
            }

            (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.LicensesTemp[0].tradeLicenseDetail.ownerShipCategory", tradeOwnershipCat);
            (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.common-masters.tradeOwner.selectedValues[0].ownership", tradeOwnershipCat);
            try {

              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.tradeOwner.selectedValues[0].ownership", tradeOwnershipCat));

              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.tradeOwner.subOwnershipTransformed.allDropdown[0]", (0, _commons2.getObjectValues)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms.common-masters.tradeOwner.tradeOwnerTransformed." + tradeOwnershipCat, []))));

              dispatch((0, _actions.prepareFinalObject)("DynamicMdms.common-masters.tradeOwner.selectedValues[0].subOwnership", tradeSubOwnershipCat));
              //handlefield for Type of OwnerShip while setting drop down values as beforeFieldChange won't be callled
              if (tradeOwnershipCat === "INDIVIDUAL") {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "visible", true));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional", "visible", false));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "visible", false));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.ownerInfoInstitutional", "visible", true));
              }

              //handlefield for type of sub ownership while setting drop down values as beforeFieldChange won't be callled

              if (tradeSubOwnershipCat === "INDIVIDUAL.SINGLEOWNER") {
                ownerInfoCards = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, //hardcoded to apply screen
                "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items");

                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", false));
                if (ownerInfoCards && ownerInfoCards.length > 1) {
                  singleCard = ownerInfoCards.slice(0, 1); //get the first element if multiple cards present

                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.items", singleCard));
                  dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners").slice(0, 1)));
                }
              }

              if (tradeSubOwnershipCat === "INDIVIDUAL.MULTIPLEOWNERS") {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", true));
              }
            } catch (e) {
              console.log(e);
            }

          case 6:
          case "end":
            return _context18.stop();
        }
      }
    }, _callee18, undefined);
  }));

  return function updateOwnerShipEdit(_x39, _x40) {
    return _ref20.apply(this, arguments);
  };
}();

var pageResetAndChange = exports.pageResetAndChange = function pageResetAndChange(state, dispatch, tenant) {
  dispatch((0, _actions.prepareFinalObject)("Licenses", [{ licenseType: "PERMANENT" }]));
  dispatch((0, _actions.prepareFinalObject)("LicensesTemp", []));
  dispatch((0, _actions2.setRoute)("/tradelicence/apply?tenantId=" + tenant));
};