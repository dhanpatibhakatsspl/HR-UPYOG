"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sortByEpoch = exports.getEpochForDate = exports.getAdminRole = exports.toggleDeactivateDialog = exports.createEmployee = exports.showCityPicker = exports.setFilteredTradeTypes = exports.showHideBreakupPopup = exports.setOwnerShipDropDownFieldChange = exports.updateDropDowns = exports.getTodaysDateInYMD = exports.epochToYmdDate = exports.validateFields = exports.prepareDocumentTypeObj = exports.convertDateTimeToEpoch = exports.convertDateToEpoch = exports.objectToDropdown = exports.commonTransform = exports.showHideAdhocPopup = exports.getTranslatedLabel = exports.checkValueForNA = exports.transformById = exports.getCommonApplyFooter = undefined;

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _actions2 = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils = require("egov-ui-framework/ui-redux/screen-configuration/utils");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

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

var transformById = exports.transformById = function transformById(payload, id) {
  return payload && payload.reduce(function (result, item) {
    result[item[id]] = (0, _extends3.default)({}, item);

    return result;
  }, {});
};

var checkValueForNA = exports.checkValueForNA = function checkValueForNA(value) {
  return value == null || value == undefined || value == '' ? "NA" : value;
};

var getTranslatedLabel = exports.getTranslatedLabel = function getTranslatedLabel(labelKey, localizationLabels) {
  var translatedLabel = null;
  if (localizationLabels && localizationLabels.hasOwnProperty(labelKey)) {
    translatedLabel = localizationLabels[labelKey];
    if (translatedLabel && (typeof translatedLabel === "undefined" ? "undefined" : (0, _typeof3.default)(translatedLabel)) === "object" && translatedLabel.hasOwnProperty("message")) translatedLabel = translatedLabel.message;
  }
  return translatedLabel || labelKey;
};

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

var showHideAdhocPopup = exports.showHideAdhocPopup = function showHideAdhocPopup(state, dispatch) {

  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["view"], "components.adhocDialog.props.open", false);

  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.adhocDialog", "props.open", !toggle));
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

var getStatementForDocType = function getStatementForDocType(docType) {
  switch (docType) {
    case "OWNERIDPROOF":
      return "TL_UPLOAD_STATEMENT1";
    case "OWNERSHIPPROOF":
      return "TL_UPLOAD_STATEMENT2";
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

var validateFields = exports.validateFields = function validateFields(objectJsonPath, state, dispatch) {
  var screen = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "apply";

  var fields = (0, _get2.default)(state.screenConfiguration.screenConfig[screen], objectJsonPath, {});
  var isFormValid = true;
  for (var variable in fields) {
    if (fields.hasOwnProperty(variable)) {
      if (fields[variable] && fields[variable].props && (fields[variable].props.disabled === undefined || !fields[variable].props.disabled) && !(0, _utils.validate)(screen, (0, _extends3.default)({}, fields[variable], {
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
  var d = new Date(et),
      month = "" + (d.getMonth() + 1),
      day = "" + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

var getTodaysDateInYMD = exports.getTodaysDateInYMD = function getTodaysDateInYMD() {
  var date = new Date();
  var month = date.getMonth() + 1;
  var day = date.getDate() < 9 ? "0" + (date.getDate() + 1) : date.getDate() + 1;
  date = date.getFullYear() + "-" + month + "-" + day;
  return date;
};

var updateDropDowns = exports.updateDropDowns = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(payload, action, state, dispatch, queryValue) {
    var structType, tradeTypes, tradeTypeDropdownData, tradeSubTypes;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            structType = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.structureType");

            if (structType) {
              (0, _set2.default)(payload, "LicensesTemp[0].tradeLicenseDetail.structureType", structType.split(".")[0]);
              try {
                dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.common-masters.StructureSubTypeTransformed", (0, _get2.default)(state.screenConfiguration.preparedFinalObject.applyScreenMdmsData["common-masters"], "StructureType." + structType.split(".")[0], [])));

                payload && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.structureType", payload.LicensesTemp[0].tradeLicenseDetail.structureType));
              } catch (e) {
                console.log(e);
              }
            }

            tradeTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType", []);
            tradeTypeDropdownData = tradeTypes && Object.keys(tradeTypes).map(function (item) {
              return { code: item, active: true };
            });

            tradeTypeDropdownData && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeTypeTransformed", tradeTypeDropdownData));
            tradeSubTypes = (0, _get2.default)(payload, "Licenses[0].tradeLicenseDetail.tradeUnits");


            if (tradeSubTypes.length > 0) {
              try {
                tradeSubTypes.forEach(function (tradeSubType, i) {
                  var tradeCat = tradeSubType.tradeType.split(".")[0];
                  var tradeType = tradeSubType.tradeType.split(".")[1];
                  (0, _set2.default)(payload, "LicensesTemp.tradeUnits[" + i + "].tradeType", tradeCat);
                  (0, _set2.default)(payload, "LicensesTemp.tradeUnits[" + i + "].tradeSubType", tradeType);

                  dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeCategoryTransformed", objectToDropdown((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType." + tradeCat, []))));

                  dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeSubCategoryTransformed", (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType." + tradeCat + "." + tradeType, [])));
                  payload && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp.tradeUnits[" + i + "].tradeType", tradeCat));

                  payload && dispatch((0, _actions2.prepareFinalObject)("LicensesTemp.tradeUnits[" + i + "].tradeSubType", tradeType));
                });
              } catch (e) {
                console.log(e);
              }
            }
            setOwnerShipDropDownFieldChange(state, dispatch, payload);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateDropDowns(_x3, _x4, _x5, _x6, _x7) {
    return _ref.apply(this, arguments);
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
        dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeType", tradeTypeList));
        var filteredList = tradeTypeList && tradeTypeList.length > 0 && tradeTypeList.filter(function (item) {
          if (item.licenseType === licenseType && item.structureType === structureSubtype) return true;
        });
        var tradeTypeTransformed = commonTransform({ TradeType: [].concat((0, _toConsumableArray3.default)(filteredList)) }, "TradeType");
        tradeTypeTransformed.TradeType && dispatch((0, _actions2.prepareFinalObject)("applyScreenMdmsData.TradeLicense.TradeType", tradeTypeTransformed.TradeType));
        return tradeTypeTransformed;
      }
    }
  } catch (e) {
    console.log(e);
  }
};

var showCityPicker = exports.showCityPicker = function showCityPicker(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["search"], "components.cityPickerDialog.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("search", "components.cityPickerDialog", "props.open", !toggle));
};

var createEmployee = exports.createEmployee = function createEmployee(state, dispatch) {
  var hrmsPickerFlag = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "hrmsPickerFlag", false);
  var isCityPickerValid = true;
  if (hrmsPickerFlag) {
    isCityPickerValid = validateFields("components.cityPickerDialog.children.dialogContent.children.popup.children.cityPicker.children", state, dispatch, "search");
    if (!isCityPickerValid) isCityPickerValid = false;
  }

  if (isCityPickerValid) {
    var tenantId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "citiesByModule.tenantId") || (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "citiesByModule.tenantId.value");
    tenantId = tenantId ? tenantId : (0, _localStorageUtils.getTenantId)();
    (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Employee") && dispatch((0, _actions2.prepareFinalObject)("Employee", []));
    (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "hrms.reviewScreen.furnishedRolesList") && dispatch((0, _actions2.prepareFinalObject)("hrms.reviewScreen.furnishedRolesList", ""));
    var tenantIdQueryString = tenantId ? "?tenantId=" + tenantId : "";
    var createUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/hrms/create" + tenantIdQueryString : "/hrms/create" + tenantIdQueryString;
    dispatch((0, _actions.setRoute)(createUrl));
  }
};

// HRMS
var toggleDeactivateDialog = exports.toggleDeactivateDialog = function toggleDeactivateDialog(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["view"], "components.deactivateEmployee.props.open", false);
  dispatch((0, _actions2.handleScreenConfigurationFieldChange)("view", "components.deactivateEmployee", "props.open", !toggle));
};

// HRMS GET STATE ADMIN ROLE
var getAdminRole = exports.getAdminRole = function getAdminRole(state) {
  var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
  var currentUserRoles = (0, _get2.default)(userInfo, "roles");

  /** REMOVE THESE 2 HARDCODES after moving StateInfo object to localStorage */
  var configAdminRoles = JSON.parse((0, _get2.default)(state, "common.stateInfoById[0].roleMapping.hrmsAdmin", '["HRMS_ADMIN"]'));
  var stateTenantId = (0, _get2.default)(state, "common.stateInfoById[0].code", _common2.default.tenantId);
  /** END */

  var hasAdminRole = false;
  Array.isArray(currentUserRoles) && currentUserRoles.forEach(function (role) {
    if (Array.isArray(configAdminRoles) && configAdminRoles.includes(role.code) && role.tenantId === stateTenantId) {
      hasAdminRole = true;
    }
  });
  return { hasAdminRole: hasAdminRole, configAdminRoles: configAdminRoles };
};

var getEpochForDate = exports.getEpochForDate = function getEpochForDate(date) {
  var dateSplit = date.split("/");
  return new Date(dateSplit[2], dateSplit[1] - 1, dateSplit[0]).getTime();
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