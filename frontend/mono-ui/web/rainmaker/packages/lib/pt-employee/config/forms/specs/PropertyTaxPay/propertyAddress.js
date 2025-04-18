"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _reusableFields = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields");

var _actions = require("egov-ui-kit/redux/common/actions");

var _actions2 = require("egov-ui-kit/redux/form/actions");

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const Search = <Icon action="action" name="home" color="#30588c" />;

var formConfig = {
  name: "propertyAddress",
  fields: (0, _extends3.default)({
    city: {
      id: "city",
      jsonPath: "PropertiesTemp[0].address.city",
      required: true,
      type: "singleValueList",
      floatingLabelText: "CORE_COMMON_CITY",
      className: "pt-emp-property-address-city",
      disabled: true,
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      numcols: 6,
      dataFetchConfig: {
        url: _endPoints.CITY.GET.URL,
        action: _endPoints.CITY.GET.ACTION,
        queryParams: [],
        requestBody: {
          MdmsCriteria: {
            tenantId: _common2.default.tenantId,
            moduleDetails: [{
              moduleName: "tenant",
              masterDetails: [{
                name: "tenants"
              }]
            }]
          }
        },
        dataPath: ["MdmsRes.tenant.tenants"],
        dependants: [{
          fieldKey: "mohalla"
        }]
      },
      updateDependentFields: function updateDependentFields(_ref) {
        var formKey = _ref.formKey,
            field = _ref.field,
            dispatch = _ref.dispatch,
            state = _ref.state;

        dispatch((0, _actions.prepareFormData)("Properties[0].tenantId", field.value));
        // dispatch(setFieldProperty("propertyAddress", "mohalla", "value", ""));
        var requestBody = {
          MdmsCriteria: {
            tenantId: field.value,
            moduleDetails: [{
              moduleName: "PropertyTax",
              masterDetails: [{
                name: "Floor"
              }, {
                name: "OccupancyType"
              }, {
                name: "OwnerShipCategory"
              }, {
                name: "OwnerType"
              }, {
                name: "PropertySubType"
              }, {
                name: "PropertyType"
              }, {
                name: "SubOwnerShipCategory"
              }, {
                name: "UsageCategoryDetail"
              }, {
                name: "UsageCategoryMajor"
              }, {
                name: "UsageCategoryMinor"
              }, {
                name: "UsageCategorySubMinor"
              }]
            }]
          }
        };

        dispatch((0, _actions.fetchGeneralMDMSData)(requestBody, "PropertyTax", ["Floor", "OccupancyType", "OwnerShipCategory", "OwnerType", "PropertySubType", "PropertyType", "SubOwnerShipCategory", "UsageCategoryDetail", "UsageCategoryMajor", "UsageCategoryMinor", "UsageCategorySubMinor"]));
      }
    }
  }, _reusableFields.dummy, _reusableFields.houseNumber, _reusableFields.colony, _reusableFields.street, _reusableFields.mohalla, _reusableFields.pincode, {
    oldPID: {
      id: "oldpid",
      type: "textFieldIcon",
      className: "pt-old-pid-text-field",
      text: "PT_SEARCH_BUTTON",
      iconRedirectionURL: "https://pmidc.punjab.gov.in/propertymis/search.php",
      jsonPath: "Properties[0].oldPropertyId",
      floatingLabelText: "PT_PROPERTY_ADDRESS_EXISTING_PID",
      hintText: "PT_PROPERTY_ADDRESS_EXISTING_PID_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      toolTip: true,
      pattern: /^[^\$\"'<>?\\\\~`!@$%^+={}*,.:;“”‘’]{1,64}$/i,
      toolTipMessage: "PT_OLDPID_TOOLTIP_MESSAGE",
      maxLength: 64
    }
  }),
  afterInitForm: function afterInitForm(action, store, dispatch) {
    var tenantId = (0, _localStorageUtils.getTenantId)();
    var city = JSON.parse((0, _localStorageUtils.getUserInfo)()).permanentAddress;
    var state = store.getState();
    var citiesByModule = state.common.citiesByModule;

    var _ref2 = citiesByModule || {},
        PT = _ref2.PT;

    if (PT) {
      var tenants = PT.tenants;
      var found = tenants.find(function (city) {
        return city.code === tenantId;
      });
      if (found) {
        dispatch((0, _actions2.handleFieldChange)("propertyAddress", "city", tenantId));
        dispatch((0, _actions.prepareFormData)("Properties[0].address.city", city));
      }
    }
    (0, _set2.default)(action, "form.fields.city.required", true);
    (0, _set2.default)(action, "form.fields.pincode.disabled", false);
    return action;
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

exports.default = formConfig;