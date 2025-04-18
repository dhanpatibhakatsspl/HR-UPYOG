"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateFieldOfWNS = exports.getDemand = exports.triggerModificationsDisplay = exports.getTextToLocalMapping = exports.getRequiredDocData = exports.getLabelOnlyValue = exports.getCommonGrayCard = exports.resetFieldsForConnection = exports.resetFieldsForApplication = exports.getEpochForDate = exports.sortByEpoch = exports.getUniqueItemsFromArray = exports.getDialogButton = exports.showHideBreakupPopup = exports.setOwnerShipDropDownFieldChange = exports.getDocList = exports.getTransformedStatus = exports.ifUserRoleExists = exports.setValidToFromVisibilityForApply = exports.setValidToFromVisibilityForSV = exports.setMultiOwnerForApply = exports.setMultiOwnerForSV = exports.fetchBill = exports.getBaseURL = exports.getFinancialYearDates = exports.getNextMonthDateInYMD = exports.getTodaysDateInYMD = exports.epochToYmdDate = exports.validateFields = exports.getCurrentFinancialYear = exports.createEstimateData = exports.prepareDocumentTypeObj = exports.getUserDataFromUuid = exports.getDetailsForOwner = exports.getDetailsFromProperty = exports.getMdmsData = exports.getHeaderSideText = exports.showHideMapPopup = exports.getMapLocator = exports.getAutoSelector = exports.getReceiptData = exports.convertDateTimeToEpoch = exports.convertDateToEpoch = exports.convertEpochToDate = exports.handleRoadType = exports.handleNA = exports.handlePropertySubUsageType = exports.convertEpochToDateAndHandleNA = exports.getReceipt = exports.getBill = exports.getSearchResults = exports.objectToDropdown = exports.getButtonVisibility = exports.showHideAdhocPopupAndValues = exports.showHideAdhocPopup = exports.getIconStyle = exports.getFeesEstimateOverviewCard = exports.getFeesEstimateCard = exports.onClickPreviousButton = exports.onClickNextButton = exports.getFooterButtons = exports.getTranslatedLabel = exports.transformById = exports.getCommonApplyFooter = undefined;

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

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _isUndefined = require("lodash/isUndefined");

var _isUndefined2 = _interopRequireDefault(_isUndefined);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _api = require("../../../../ui-utils/api");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = exports.getCommonApplyFooter = function getCommonApplyFooter(position, children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: position === 'BOTTOM' ? "apply-wizard-footer" : ""
    },
    children: children
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
      return "/wns/acknowledgement?purpose=application&status=rejected&applicationNumber=" + applicationNumber + "&secondNumber=" + secondNumber + "&tenantId=" + tenantId;
    case "cancel":
      return "/wns/acknowledgement?purpose=application&status=cancelled&applicationNumber=" + applicationNumber + "&secondNumber=" + secondNumber + "&tenantId=" + tenantId;
    default:
      return "/wns/acknowledgement?purpose=approve&status=success&applicationNumber=" + applicationNumber + "&secondNumber=" + secondNumber + "&tenantId=" + tenantId;
  }
};

var onClickPreviousButton = exports.onClickPreviousButton = function onClickPreviousButton(queryValue, applicationNumber, tenantId) {
  switch (queryValue) {
    case "reject":
      return "/wns/search-preview?role=approver&status=pending_approval&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
    case "cancel":
      return "/wns/search-preview?role=approver&status=approved&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
    default:
      return "/wns/search-preview?role=approver&status=pending_approval&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;
  }
};
var getFeesEstimateCard = function getFeesEstimateCard(props) {
  var sourceJsonPath = props.sourceJsonPath,
      rest = (0, _objectWithoutProperties3.default)(props, ["sourceJsonPath"]);

  return {
    uiFramework: "custom-containers-local",
    moduleName: "egov-wns",
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

var getFeesEstimateOverviewCard = function getFeesEstimateOverviewCard(props) {
  var sourceJsonPath = props.sourceJsonPath,
      rest = (0, _objectWithoutProperties3.default)(props, ["sourceJsonPath"]);

  return {
    uiFramework: "custom-containers-local",
    moduleName: "egov-wns",
    componentPath: "EstimateOverviewCardContainer",
    props: (0, _extends3.default)({
      sourceJsonPath: sourceJsonPath
    }, rest)
  };
};

exports.getFeesEstimateOverviewCard = getFeesEstimateOverviewCard;
var getIconStyle = exports.getIconStyle = function getIconStyle(key) {
  return style[key];
};

var showHideAdhocPopup = exports.showHideAdhocPopup = function showHideAdhocPopup(state, dispatch, screenKey) {
  var value = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  var adhocDetails = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};

  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig[screenKey], "components.adhocDialog.props.open", false);

  // if (screenKey == "viewBill") {
  //   dispatch(
  //     handleField(
  //       "viewBill",
  //       "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyAmount",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "viewBill",
  //       "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyReason",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "viewBill",
  //       "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.commentsField",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "viewBill",
  //       "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateAmount",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "viewBill",
  //       "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateReason",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "viewBill",
  //       "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateCommentsField",
  //       "props.value",
  //       null
  //     )
  //   );
  // }

  // if (screenKey == "search-preview") {
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.commentsField",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyAmount",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyReason",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateAmount",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateCommentsField",
  //       "props.value",
  //       null
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateReason",
  //       "props.value",
  //       null
  //     )
  //   );
  // } else {
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.commentsField",
  //       "props.value",
  //       get(adhocDetails, "adhocPenaltyComment", null)
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyAmount",
  //       "props.value",
  //       get(adhocDetails, "adhocPenalty", null)
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyReason",
  //       "props.value",
  //       get(adhocDetails, "adhocPenaltyReason", null)
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateAmount",
  //       "props.value",
  //       get(adhocDetails, "adhocRebate", null)
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateCommentsField",
  //       "props.value",
  //       get(adhocDetails, "adhocRebateComment", null)
  //     )
  //   );
  //   dispatch(
  //     handleField(
  //       "search-preview",
  //       "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateReason",
  //       "props.value",
  //       get(adhocDetails, "adhocRebateReason", null)
  //     )
  //   );
  // }

  dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, "components.adhocDialog", "props.open", !toggle));
};

var showHideAdhocPopupAndValues = exports.showHideAdhocPopupAndValues = function showHideAdhocPopupAndValues(state, dispatch) {
  var screenKey = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "search-preview";

  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig[screenKey], "components.adhocDialog.props.open", false);
  var getValuesofAdhoc = localStorage.getItem("WS_ADDITIONAL_DETAILS_FOR_DATA");
  var isAdditionalReqData = localStorage.getItem("IS_WS_ADDITIONAL_DETAILS_FOR_DATA");
  var adhocDetails = getValuesofAdhoc ? JSON.parse(getValuesofAdhoc) : {};
  var additionalDetailsIsRequired = isAdditionalReqData ? JSON.parse(isAdditionalReqData) : false;
  if (additionalDetailsIsRequired) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.commentsField", "props.value", (0, _get2.default)(adhocDetails, "additionalDetails.adhocPenaltyComment", null)));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyAmount", "props.value", (0, _get2.default)(adhocDetails, "additionalDetails.adhocPenalty", null)));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyReason", "props.value", (0, _get2.default)(adhocDetails, "additionalDetails.adhocPenaltyReason", null)));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateAmount", "props.value", (0, _get2.default)(adhocDetails, "additionalDetails.adhocRebate", null)));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateCommentsField", "props.value", (0, _get2.default)(adhocDetails, "additionalDetails.adhocRebateComment", null)));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateReason", "props.value", (0, _get2.default)(adhocDetails, "additionalDetails.adhocRebateReason", null)));
  } else {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.commentsField", "props.value", null));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyAmount", "props.value", null));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocPenaltyCard.children.penaltyAmountAndReasonContainer.children.penaltyReason", "props.value", null));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateAmount", "props.value", null));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateCommentsField", "props.value", null));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.adhocDialog.children.popup.children.adhocRebateCard.children.rebateAmountAndReasonContainer.children.rebateReason", "props.value", null));
  }
  dispatch((0, _actions.handleScreenConfigurationFieldChange)(screenKey, "components.adhocDialog", "props.open", !toggle));
};

var getButtonVisibility = exports.getButtonVisibility = function getButtonVisibility(status, button) {
  if (status === "pending_payment" && button === "PROCEED TO PAYMENT") return true;
  if (status === "pending_approval" && button === "APPROVE") return true;
  if (status === "pending_approval" && button === "REJECT") return true;
  if (status === "approved" && button === "CANCEL TRADE LICENSE") return true;
  return false;
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
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(queryObject) {
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
            return _context.abrupt("return", {});

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 7]]);
  }));

  return function getSearchResults(_x4) {
    return _ref.apply(this, arguments);
  };
}();

var getBill = exports.getBill = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.prev = 0;
            _context2.next = 3;
            return (0, _api.httpRequest)("post", "/tl-calculator/v1/_getbill", "", queryObject);

          case 3:
            response = _context2.sent;
            return _context2.abrupt("return", response);

          case 7:
            _context2.prev = 7;
            _context2.t0 = _context2["catch"](0);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[0, 7]]);
  }));

  return function getBill(_x5) {
    return _ref2.apply(this, arguments);
  };
}();

var getReceipt = exports.getReceipt = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _context3.next = 3;
            return (0, _api.httpRequest)("post", "/collection-services/receipts/_search", "", queryObject);

          case 3:
            response = _context3.sent;
            return _context3.abrupt("return", response);

          case 7:
            _context3.prev = 7;
            _context3.t0 = _context3["catch"](0);

          case 9:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 7]]);
  }));

  return function getReceipt(_x6) {
    return _ref3.apply(this, arguments);
  };
}();

var convertEpochToDateAndHandleNA = exports.convertEpochToDateAndHandleNA = function convertEpochToDateAndHandleNA(dateEpoch) {
  if (dateEpoch !== undefined && dateEpoch !== null && dateEpoch !== "" && dateEpoch !== "NA" && dateEpoch !== 0) {
    var convertedToDate = convertEpochToDate(dateEpoch);
    return convertedToDate;
  } else {
    return "NA";
  }
};

var handlePropertySubUsageType = exports.handlePropertySubUsageType = function handlePropertySubUsageType(params) {
  params = handleNA(params);
  if (params !== "NA" && params.split(".").length > 1) {
    return params;
  } else {
    return "NA";
  }
};

var handleNA = exports.handleNA = function handleNA(params) {
  if (params !== undefined && params !== null && params !== "" && params !== 0) {
    return params;
  } else {
    return "NA";
  }
};

var handleRoadType = exports.handleRoadType = function handleRoadType(params) {
  return handleNA(params) == "NA" ? "NA" : 'WS_ROADTYPE_' + params;
};

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
  var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(queryObject) {
    var response;
    return _regenerator2.default.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _context4.next = 3;
            return (0, _api.httpRequest)("post", "collection-services/receipts/_search", "", queryObject);

          case 3:
            response = _context4.sent;
            return _context4.abrupt("return", response);

          case 7:
            _context4.prev = 7;
            _context4.t0 = _context4["catch"](0);
            return _context4.abrupt("return", {});

          case 10:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, undefined, [[0, 7]]);
  }));

  return function getReceiptData(_x8) {
    return _ref4.apply(this, arguments);
  };
}();

var getAutoSelector = exports.getAutoSelector = function getAutoSelector(textScheama) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
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
    moduleName: "egov-wns",
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
  var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(queryObject) {
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
            return _context5.abrupt("return", {});

          case 10:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, undefined, [[0, 7]]);
  }));

  return function getMdmsData(_x10) {
    return _ref5.apply(this, arguments);
  };
}();

var getDetailsFromProperty = exports.getDetailsFromProperty = function () {
  var _ref6 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(state, dispatch) {
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

            dispatch((0, _actions.toggleSnackbar)(true, {
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
                dispatch((0, _actions.toggleSnackbar)(true, {
                  labelName: "Property is not found with this Property Id",
                  labelKey: "ERR_PROPERTY_NOT_FOUND_WITH_PROPERTY_ID"
                }, "info"));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocPropertyID", "props.value", ""));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocMohalla", "props.value", {
                  value: payload.applyScreen.property.address.locality.code,
                  label: payload.applyScreen.property.address.locality.name
                }));
                dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.address", payload.applyScreen.property.address));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeLocationDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeLocCity.children.cityDropdown", "props.value", payload.applyScreen.property.address.tenantId));
              }
            }

          case 12:
            _context6.next = 16;
            break;

          case 14:
            _context6.prev = 14;
            _context6.t0 = _context6["catch"](0);

          case 16:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, undefined, [[0, 14]]);
  }));

  return function getDetailsFromProperty(_x11, _x12) {
    return _ref6.apply(this, arguments);
  };
}();

var getDetailsForOwner = exports.getDetailsForOwner = function () {
  var _ref7 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee7(state, dispatch, fieldInfo) {
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

            dispatch((0, _actions.toggleSnackbar)(true, {
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
                if (oldOwnersArr.length > 0) {
                  currOwnersArr.push((0, _extends3.default)({}, oldOwnersArr[cardIndex], {
                    userActive: false
                  }));
                }
                dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", currOwnersArr));
              }
            }

          case 18:
            _context7.next = 23;
            break;

          case 20:
            _context7.prev = 20;
            _context7.t0 = _context7["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, _context7.t0.message, "info"));

          case 23:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, undefined, [[0, 20]]);
  }));

  return function getDetailsForOwner(_x13, _x14, _x15) {
    return _ref7.apply(this, arguments);
  };
}();

// Get user data from uuid API call
var getUserDataFromUuid = exports.getUserDataFromUuid = function () {
  var _ref8 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee8(bodyObject) {
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
            return _context8.abrupt("return", {});

          case 8:
          case "end":
            return _context8.stop();
        }
      }
    }, _callee8, undefined, [[0, 5]]);
  }));

  return function getUserDataFromUuid(_x16) {
    return _ref8.apply(this, arguments);
  };
}();

var getStatementForDocType = function getStatementForDocType(docType) {
  switch (docType) {
    case "OWNERIDPROOF":
      return "Allowed documents are Aadhar Card / Voter ID Card / Driving License";
    case "OWNERSHIPPROOF":
      return "Allowed documents are Rent Deed / Lease Doc / Property Registry / General or Special Power of Attorney";
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

var createEstimateData = exports.createEstimateData = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee9(billData, jsonPath, dispatch) {
    var href = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    var getFromReceipt = arguments[4];
    var payload, estimateData, event;
    return _regenerator2.default.wrap(function _callee9$(_context9) {
      while (1) {
        switch (_context9.prev = _context9.next) {
          case 0:
            payload = billData;
            estimateData = payload;

            dispatch((0, _actions.prepareFinalObject)(jsonPath, estimateData));
            event = new CustomEvent("estimateLoaded", { detail: true });

            window.parent.document.dispatchEvent(event);
            return _context9.abrupt("return", payload);

          case 6:
          case "end":
            return _context9.stop();
        }
      }
    }, _callee9, undefined);
  }));

  return function createEstimateData(_x17, _x18, _x19) {
    return _ref9.apply(this, arguments);
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
    return "/wns";
  } else {
    return "/wns-citizen";
  }
};

var fetchBill = exports.fetchBill = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee10(action, state, dispatch) {
    var queryObject, LicensesPayload, payload;
    return _regenerator2.default.wrap(function _callee10$(_context10) {
      while (1) {
        switch (_context10.prev = _context10.next) {
          case 0:
            //For Adhoc
            // Search License
            queryObject = [{ key: "tenantId", value: (0, _commons.getQueryArg)(window.location.href, "tenantId") }, {
              key: "applicationNumber",
              value: (0, _commons.getQueryArg)(window.location.href, "applicationNumber")
            }];
            _context10.next = 3;
            return getSearchResults(queryObject);

          case 3:
            LicensesPayload = _context10.sent;
            _context10.t0 = LicensesPayload && LicensesPayload.Licenses;

            if (!_context10.t0) {
              _context10.next = 9;
              break;
            }

            _context10.next = 8;
            return createEstimateData(LicensesPayload.Licenses[0], "LicensesTemp[0].estimateCardData", dispatch, window.location.href);

          case 8:
            _context10.t0 = _context10.sent;

          case 9:
            payload = _context10.t0;

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
            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].tenantId", (0, _commons.getQueryArg)(window.location.href, "tenantId")));

            //set tenantId in instrument
            dispatch((0, _actions.prepareFinalObject)("ReceiptTemp[0].instrument.tenantId", (0, _commons.getQueryArg)(window.location.href, "tenantId")));

          case 18:
          case "end":
            return _context10.stop();
        }
      }
    }, _callee10, undefined);
  }));

  return function fetchBill(_x22, _x23, _x24) {
    return _ref10.apply(this, arguments);
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
  var documentList = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.ws-services-masters.Documents");
  function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
  }
  var applicationDocArray = documentList.filter(onlyUnique);
  var applicationDocument = prepareDocumentTypeObj(applicationDocArray);
  dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].applicationDocuments", applicationDocument));

  //REARRANGE APPLICATION DOCS FROM TL SEARCH IN EDIT FLOW
  var applicationDocs = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.applicationDocuments", []);
  var applicationDocsReArranged = applicationDocs && applicationDocs.length && applicationDocument.map(function (item) {
    var index = applicationDocs.findIndex(function (i) {
      return i.documentType === item.name;
    });
    return applicationDocs[index];
  });
  applicationDocsReArranged && dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.applicationDocuments", applicationDocsReArranged));
};

var setOwnerShipDropDownFieldChange = exports.setOwnerShipDropDownFieldChange = function setOwnerShipDropDownFieldChange(state, dispatch, payload) {
  var tradeSubOwnershipCat = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory");
  var tradeOwnershipCat = "";
  if (tradeSubOwnershipCat) {
    tradeOwnershipCat = tradeSubOwnershipCat.split(".")[0];
  } else {
    tradeOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.OwnerShipCategoryTransformed[0].code", "");
    tradeSubOwnershipCat = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.OwnerShipCategory." + tradeOwnershipCat + "[0].code", "");
    (0, _set2.default)(payload, "Licenses[0].tradeLicenseDetail.subOwnerShipCategory", tradeSubOwnershipCat);
    payload && dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.subOwnerShipCategory", payload.Licenses[0].tradeLicenseDetail.subOwnerShipCategory));
  }

  (0, _set2.default)(payload, "LicensesTemp[0].tradeLicenseDetail.ownerShipCategory", tradeOwnershipCat);

  try {
    payload && dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.ownerShipCategory", payload.LicensesTemp[0].tradeLicenseDetail.ownerShipCategory));
    dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.common-masters.subOwnerShipCategoryTransformed", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.common-masters.OwnerShipCategory." + tradeOwnershipCat, [])));

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
      var ownerInfoCards = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, //hardcoded to apply screen
      "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard.props.items");
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", false));
      if (ownerInfoCards && ownerInfoCards.length > 1) {
        var singleCard = ownerInfoCards.slice(0, 1); //get the first element if multiple cards present

        dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.items", singleCard));
        dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.owners", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.owners").slice(0, 1)));
      }
    }

    if (tradeSubOwnershipCat === "INDIVIDUAL.MULTIPLEOWNERS") {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardSecondStep.children.tradeOwnerDetails.children.cardContent.children.OwnerInfoCard", "props.hasAddItem", true));
    }
  } catch (e) {}
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
  var _ref11 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee11(tenantId) {
    var payload;
    return _regenerator2.default.wrap(function _callee11$(_context11) {
      while (1) {
        switch (_context11.prev = _context11.next) {
          case 0:
            _context11.next = 2;
            return (0, _api.httpRequest)("post", "/tl-calculator/billingslab/_search?tenantId=" + tenantId, "_search", [], {});

          case 2:
            payload = _context11.sent;
            return _context11.abrupt("return", payload);

          case 4:
          case "end":
            return _context11.stop();
        }
      }
    }, _callee11, undefined);
  }));

  return function getAllBillingSlabs(_x25) {
    return _ref11.apply(this, arguments);
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

var resetFieldsForApplication = exports.resetFieldsForApplication = function resetFieldsForApplication(state, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[1].tabContent.searchApplications.children.cardContent.children.wnsApplicationSearch.children.consumerNo", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[1].tabContent.searchApplications.children.cardContent.children.wnsApplicationSearch.children.applicationNo", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[1].tabContent.searchApplications.children.cardContent.children.wnsApplicationSearch.children.ownerMobNo", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[1].tabContent.searchApplications.children.cardContent.children.wnsApplicationSearch.children.applicationstatus", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[1].tabContent.searchApplications.children.cardContent.children.wnsApplicationSearch.children.fromDate", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[1].tabContent.searchApplications.children.cardContent.children.wnsApplicationSearch.children.toDate", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[1].tabContent.searchApplications.children.cardContent.children.wnsApplicationSearch.children.applicationType", "props.value", ""));
};

var resetFieldsForConnection = exports.resetFieldsForConnection = function resetFieldsForConnection(state, dispatch) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[0].tabContent.wnsApplication.children.cardContent.children.wnsApplicationContainer.children.consumerid", "props.value", ""));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[0].tabContent.wnsApplication.children.cardContent.children.wnsApplicationContainer.children.propertyid", "props.value", ""));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[0].tabContent.wnsApplication.children.cardContent.children.wnsApplicationContainer.children.oldConsumerid", "props.value", ""));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[0].tabContent.wnsApplication.children.cardContent.children.wnsApplicationContainer.children.ownerMobNo", "props.value", ""));

  dispatch((0, _actions.handleScreenConfigurationFieldChange)("search", "components.div.children.showSearches.children.showSearchScreens.props.tabs[0].tabContent.wnsApplication.children.cardContent.children.wnsApplicationContainer.children.propertyid", "props.value", ""));
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

var getRequiredDocData = exports.getRequiredDocData = function () {
  var _ref12 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee12(action, state, dispatch) {
    var tenantId, mdmsBody, payload;
    return _regenerator2.default.wrap(function _callee12$(_context12) {
      while (1) {
        switch (_context12.prev = _context12.next) {
          case 0:
            tenantId = process.env.REACT_APP_NAME === "Citizen" ? JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentCity : (0, _localStorageUtils.getTenantId)();
            mdmsBody = {
              MdmsCriteria: {
                tenantId: tenantId,
                moduleDetails: [{
                  moduleName: "FireNoc",
                  masterDetails: [{ name: "Documents" }]
                }]
              }
            };
            _context12.prev = 2;
            payload = null;
            _context12.next = 6;
            return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], mdmsBody);

          case 6:
            payload = _context12.sent;

            dispatch((0, _actions.prepareFinalObject)("searchScreenMdmsData", payload.MdmsRes));
            _context12.next = 12;
            break;

          case 10:
            _context12.prev = 10;
            _context12.t0 = _context12["catch"](2);

          case 12:
          case "end":
            return _context12.stop();
        }
      }
    }, _callee12, undefined, [[2, 10]]);
  }));

  return function getRequiredDocData(_x27, _x28, _x29) {
    return _ref12.apply(this, arguments);
  };
}();

var getTextToLocalMapping = exports.getTextToLocalMapping = function getTextToLocalMapping(label) {
  var localisationLabels = (0, _commons.getTransformedLocalStorgaeLabels)();
  switch (label) {
    case "Application No":
      return (0, _commons.getLocaleLabels)("Application No", "WS_COMMON_TABLE_COL_APP_NO_LABEL", localisationLabels);

    case "Application Type":
      return (0, _commons.getLocaleLabels)("Application Type", "WS_COMMON_TABLE_COL_APP_TYPE_LABEL", localisationLabels);

    case "Consumer No":
      return (0, _commons.getLocaleLabels)("Consumer No", "WS_COMMON_TABLE_COL_CONSUMER_NO_LABEL", localisationLabels);
    case "Service":
      return (0, _commons.getLocaleLabels)("Service", "WS_COMMON_TABLE_COL_SERVICE_LABEL", localisationLabels);
    case "Owner Name":
      return (0, _commons.getLocaleLabels)("Owner Name", "WS_COMMON_TABLE_COL_OWN_NAME_LABEL", localisationLabels);

    case "Status":
      return (0, _commons.getLocaleLabels)("Status", "WS_COMMON_TABLE_COL_STATUS_LABEL", localisationLabels);

    case "Due":
      return (0, _commons.getLocaleLabels)("Due", "WS_COMMON_TABLE_COL_AMT_DUE_LABEL", localisationLabels);

    case "Due Date":
      return (0, _commons.getLocaleLabels)("Due Date", "WS_COMMON_TABLE_COL_DUE_DATE_LABEL", localisationLabels);

    case "Action":
      return (0, _commons.getLocaleLabels)("Action", "WS_COMMON_TABLE_COL_ACTION_LABEL", localisationLabels);

    case "Address":
      return (0, _commons.getLocaleLabels)("Address", "WS_COMMON_TABLE_COL_ADDRESS", localisationLabels);

    case "Application Status":
      return (0, _commons.getLocaleLabels)("Application Status", "WS_COMMON_TABLE_COL_APPLICATION_STATUS");
    // case "Connection Type":
    //   return getLocaleLabels(
    //     "Connection Type",
    //     "Connection Type"
    //   )

    // case "INITIATED":
    //   return getLocaleLabels("Initiated,", "TL_INITIATED", localisationLabels);
    // case "APPLIED":
    //   getLocaleLabels("Applied", "TL_APPLIED", localisationLabels);
    // case "PAID":
    //   getLocaleLabels("Paid", "WF_NEWTL_PENDINGAPPROVAL", localisationLabels);

    // case "APPROVED":
    //   return getLocaleLabels("Approved", "TL_APPROVED", localisationLabels);
    // case "REJECTED":
    //   return getLocaleLabels("Rejected", "TL_REJECTED", localisationLabels);
    // case "CANCELLED":
    //   return getLocaleLabels("Cancelled", "TL_CANCELLED", localisationLabels);
    // case "PENDINGAPPROVAL ":
    //   return getLocaleLabels(
    //     "Pending for Approval",
    //     "WF_NEWTL_PENDINGAPPROVAL",
    //     localisationLabels
    //   );
    // case "PENDINGPAYMENT":
    //   return getLocaleLabels(
    //     "Pending payment",
    //     "WF_NEWTL_PENDINGPAYMENT",
    //     localisationLabels
    //   );

    // case "FIELDINSPECTION":
    //   return getLocaleLabels(
    //     "Pending for Field Inspection",
    //     "WF_NEWTL_FIELDINSPECTION",
    //     localisationLabels
    //   );

    case "Search Results for Water & Sewerage Connections":
      return (0, _commons.getLocaleLabels)("Search Results for Water & Sewerage Connections", "WS_HOME_SEARCH_RESULTS_TABLE_HEADING", localisationLabels);

    case "Search Results for Water & Sewerage Application":
      return (0, _commons.getLocaleLabels)("Search Results for Water & Sewerage Application", "WS_HOME_SEARCH_APPLICATION_RESULTS_TABLE_HEADING", localisationLabels);

    // case "MY_APPLICATIONS":
    //   return getLocaleLabels(
    //     "My Applications",
    //     "TL_MY_APPLICATIONS",
    //     localisationLabels
    //   );
  }
};
var setVisible = function setVisible(key, status, action) {
  (0, _set2.default)(action, "screenConfig.components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children." + key + ".visible", status);
};
var triggerModificationsDisplay = exports.triggerModificationsDisplay = function triggerModificationsDisplay(action, isModeEnable) {
  setVisible('modificationsEffectiveFrom', isModeEnable, action);
  setVisible('plumberDetailsContainer', !isModeEnable, action);
  setVisible('roadCuttingChargeContainer', !isModeEnable, action);
};

var getDemand = exports.getDemand = function () {
  var _ref13 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee13(queryObject, dispatch) {
    var response;
    return _regenerator2.default.wrap(function _callee13$(_context13) {
      while (1) {
        switch (_context13.prev = _context13.next) {
          case 0:
            _context13.prev = 0;
            _context13.next = 3;
            return (0, _api.httpRequest)("post", "/billing-service/demand/_search", "", queryObject);

          case 3:
            response = _context13.sent;
            return _context13.abrupt("return", response);

          case 7:
            _context13.prev = 7;
            _context13.t0 = _context13["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, { labelName: _context13.t0.message, labelKey: _context13.t0.message }, "warning"));

          case 10:
          case "end":
            return _context13.stop();
        }
      }
    }, _callee13, undefined, [[0, 7]]);
  }));

  return function getDemand(_x30, _x31) {
    return _ref13.apply(this, arguments);
  };
}();

var validateFieldOfWNS = exports.validateFieldOfWNS = function validateFieldOfWNS(objectJsonPath, state, dispatch) {
  var screen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "apply";

  var fields = (0, _get2.default)(state.screenConfiguration.screenConfig[screen], objectJsonPath, {});
  var isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].componentPath != "DynamicMdmsContainer" && fields[variable].props && fields[variable].jsonPath && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils2.validate)(screen, (0, _extends3.default)({}, fields[variable], {
        value: (0, _get2.default)(state.screenConfiguration.preparedFinalObject, fields[variable].jsonPath)
      }), dispatch, true)) {
        isFormValid = false;
      } else if (fields[variable] && fields[variable].componentPath == "DynamicMdmsContainer" && fields[variable].props && fields[variable].visible != false) {
        (function () {
          var _fields$variable$prop = fields[variable].props,
              masterName = _fields$variable$prop.masterName,
              moduleName = _fields$variable$prop.moduleName,
              rootBlockSub = _fields$variable$prop.rootBlockSub,
              dropdownFields = _fields$variable$prop.dropdownFields;

          var isIndex = fields[variable].index || 0;
          dropdownFields.forEach(function (item, i) {
            var isValid = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms." + moduleName + "." + rootBlockSub + ".selectedValues[" + isIndex + "]." + item.key, '');
            if (isValid == '' || isValid == 'none' || isValid == null || isValid.includes("null")) {
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