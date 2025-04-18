"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertySearchApiCall = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("../../../../../ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propertySearchApiCall = exports.propertySearchApiCall = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var tenantId, queryObject, searchScreenObject, key, allowCitizenToSearchOtherProperties, response, propertyData, contractedCorAddress, i;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            showHideFields(dispatch, false);
            tenantId = (0, _localStorageUtils.getTenantIdCommon)();
            queryObject = [{ key: "tenantId", value: tenantId }];
            searchScreenObject = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreen", {});

            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.ownerDetails.children.cardContent.children.ownerDetail.children.cardContent.children.headerDiv", "props.items", []));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.connectionHolderDetails.children.cardContent.children.holderDetails.children.headerDiv", "props.items", []));
            dispatch((0, _actions.prepareFinalObject)("applyScreen.property", {}));

            if (!(Object.keys(searchScreenObject).length == 0 || Object.values(searchScreenObject).every(function (x) {
              return x === "";
            }))) {
              _context.next = 11;
              break;
            }

            dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "WS_FILL_REQUIRED_FIELDS", labelName: "Please fill required details" }, "warning"));
            _context.next = 24;
            break;

          case 11:
            for (key in searchScreenObject) {
              if (searchScreenObject.hasOwnProperty(key) && searchScreenObject[key].trim() !== "") {
                queryObject.push({ key: key, value: searchScreenObject[key].trim() });
              }
            }
            _context.prev = 12;
            allowCitizenToSearchOtherProperties = (0, _get2.default)(state.screenConfiguration.preparedFinalObject.applyScreenMdmsData["ws-services-masters"], "PropertySearch", []).map(function (a) {
              return a.code === "allowCitizenToUseAnyProperty";
            })[0];

            if (process.env.REACT_APP_NAME === "Citizen" && !allowCitizenToSearchOtherProperties) {
              queryObject.push({ key: "mobileNumber", value: JSON.parse((0, _localStorageUtils.getUserInfo)()).mobileNumber });
            }
            _context.next = 17;
            return (0, _commons.getPropertyResults)(queryObject, dispatch);

          case 17:
            response = _context.sent;

            if (response && response.Properties.length > 0) {
              propertyData = response.Properties[0];

              if (!(0, _commons.isActiveProperty)(propertyData)) {
                dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "ERR_WS_PROP_STATUS_" + propertyData.status, labelName: "Property Status is " + propertyData.status }, "warning"));
                (0, _commons.showHideFieldsFirstStep)(dispatch, propertyData.propertyId, false);
                dispatch((0, _actions.prepareFinalObject)("applyScreen.property", propertyData));
              } else {
                contractedCorAddress = "";


                if (propertyData.address.doorNo !== null && propertyData.address.doorNo !== "") {
                  contractedCorAddress += propertyData.address.doorNo + ", ";
                }
                if (propertyData.address.buildingName !== null && propertyData.address.buildingName !== "") {
                  contractedCorAddress += propertyData.address.buildingName + ", ";
                }
                contractedCorAddress += propertyData.address.locality.name + ", " + propertyData.address.city;

                for (i = 0; i < propertyData.owners.length; i++) {
                  if (propertyData.owners[i].correspondenceAddress == 'NA' || propertyData.owners[i].correspondenceAddress == null || propertyData.owners[i].correspondenceAddress == "") {
                    if (propertyData.owners[i].permanentAddress == 'NA' || propertyData.owners[i].permanentAddress == null || propertyData.owners[i].permanentAddress == "") {
                      propertyData.owners[i].correspondenceAddress = contractedCorAddress;
                    } else {
                      propertyData.owners[i].correspondenceAddress = propertyData.owners[i].permanentAddress;
                    }
                  }
                }
                if (propertyData && propertyData.owners && propertyData.owners.length > 0) {
                  propertyData.owners = propertyData.owners.filter(function (owner) {
                    return owner.status == "ACTIVE";
                  });
                }
                if (propertyData.units == "NA" && propertyData.additionalDetails && propertyData.additionalDetails.subUsageCategory) {
                  propertyData.units = [];
                  propertyData.units.push({ usageCategory: propertyData.additionalDetails.subUsageCategory });
                }
                dispatch((0, _actions.prepareFinalObject)("applyScreen.property", propertyData));
                showHideFields(dispatch, true);
              }
            } else {
              showHideFields(dispatch, false);
              dispatch((0, _actions.toggleSnackbar)(true, { labelKey: "ERR_WS_PROP_NOT_FOUND", labelName: "No Property records found" }, "warning"));
            }
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](12);

            showHideFields(dispatch, false);

          case 24:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[12, 21]]);
  }));

  return function propertySearchApiCall(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var showHideFields = function showHideFields(dispatch, value) {
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.IDDetails.children.cardContent.children.propertyIDDetails", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.Details", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.ownerDetails", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.connectionHolderDetails", "visible", value));
};