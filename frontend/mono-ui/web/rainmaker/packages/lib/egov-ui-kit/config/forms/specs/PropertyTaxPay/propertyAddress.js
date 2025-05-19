"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _reusableFields = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields");

var _actions = require("egov-ui-kit/redux/app/actions");

var _actions2 = require("egov-ui-kit/redux/common/actions");

var _actions3 = require("egov-ui-kit/redux/form/actions");

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _sortBy = require("lodash/sortBy");

var _sortBy2 = _interopRequireDefault(_sortBy);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "propertyAddress",
  fields: (0, _extends3.default)({
    city: {
      id: "city",
      jsonPath: "PropertiesTemp[0].address.city",
      required: true,
      localePrefix: { moduleName: "tenant", masterName: "tenants" },
      labelsFromLocalisation: true,
      type: "AutocompleteDropdown",
      floatingLabelText: "CORE_COMMON_CITY",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      fullWidth: true,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      numcols: 6,
      gridDefination: {
        xs: 12,
        sm: 6
      },
      dataFetchConfig: {
        dependants: [{
          fieldKey: "mohalla"
        }]
      },
      updateDependentFields: function updateDependentFields(_ref) {
        var formKey = _ref.formKey,
            field = _ref.field,
            dispatch = _ref.dispatch,
            state = _ref.state;

        dispatch((0, _actions2.prepareFormData)("Properties[0].tenantId", field.value));
        dispatch((0, _actions2.prepareFormData)("Properties[0].address.city", (0, _filter2.default)((0, _get2.default)(state, "common.cities"), function (city) {
          return city.code === field.value;
        })[0].name));
        dispatch((0, _actions3.setFieldProperty)("propertyAddress", "mohalla", "value", ""));
        var moduleValue = field.value;
        dispatch((0, _actions.fetchLocalizationLabel)((0, _localStorageUtils.getLocale)(), moduleValue, moduleValue));
        var requestBody = (0, _commons.generalMDMSDataRequestObj)(field.value);

        dispatch((0, _actions2.fetchGeneralMDMSData)(requestBody, "PropertyTax", (0, _commons.getGeneralMDMSDataDropdownName)()));
      }
    },
    dummy: {
      numcols: 6,
      type: "dummy"
    },
    houseNumber: {
      id: "house-number",
      jsonPath: "Properties[0].address.doorNo",
      type: "textfield",
      floatingLabelText: "PT_PROPERTY_DETAILS_DOOR_NUMBER",
      hintText: "PT_PROPERTY_DETAILS_DOOR_NUMBER_PLACEHOLDER",
      numcols: 6,
      pattern: (0, _utils.getPattern)("DoorHouseNo"),
      errorMessage: "PT_PROPERTY_DETAILS_DOOR_NUMBER_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64
    },
    colony: {
      id: "property-colony",
      jsonPath: "Properties[0].address.buildingName",
      type: "textfield",
      floatingLabelText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME",
      hintText: "PT_PROPERTY_DETAILS_BUILDING_COLONY_NAME_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_COLONY_NAME_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64
    },
    street: {
      id: "property-street",
      jsonPath: "Properties[0].address.street",
      type: "textfield",
      floatingLabelText: "PT_PROPERTY_DETAILS_STREET_NAME",
      hintText: "PT_PROPERTY_DETAILS_STREET_NAME_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_STREET_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      maxLength: 64
    }
  }, _reusableFields.mohalla, {
    pincode: {
      id: "pincode",
      type: "number",
      jsonPath: "Properties[0].address.pincode",
      floatingLabelText: "PT_PROPERTY_DETAILS_PINCODE",
      hintText: "PT_PROPERTY_DETAILS_PINCODE_PLACEHOLDER",
      numcols: 6,
      //errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorMessage: "PT_PINCODE_ERROR_MESSAGE",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: "^([0-9]){6}$"
    },
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
    try {
      var state = store.getState();
      var localizationLabels = state.app.localizationLabels;
      var _state$common = state.common,
          cities = _state$common.cities,
          citiesByModule = _state$common.citiesByModule;

      var PT = citiesByModule && citiesByModule.PT;
      if (PT) {
        var tenants = PT.tenants;
        var dd = tenants.reduce(function (dd, tenant) {
          var selected = cities.find(function (city) {
            return city.code === tenant.code;
          });
          var label = "TENANT_TENANTS_" + selected.code.toUpperCase().replace(/[.]/g, "_");
          dd.push({ label: (0, _commons.getTranslatedLabel)(label, localizationLabels), value: selected.code });
          return dd;
        }, []);
        dispatch((0, _actions3.setFieldProperty)("propertyAddress", "city", "dropDownData", (0, _sortBy2.default)(dd, ["label"])));
      }
      var tenant = (0, _get2.default)(state, 'form.propertyAddress.fields.city.value', null);
      var mohallaDropDownData = (0, _get2.default)(state, 'form.propertyAddress.fields.mohalla.dropDownData', []);

      if (process.env.REACT_APP_NAME === "Citizen" && tenant && mohallaDropDownData.length == 0) {
        var dataFetchConfig = {
          url: "egov-location/location/v11/boundarys/_search?hierarchyTypeCode=REVENUE&boundaryType=Locality",
          action: "",
          queryParams: [{
            key: "tenantId",
            value: tenant
          }],
          requestBody: {},
          isDependent: true,
          hierarchyType: "REVENUE"
        };
        (0, _commons.fetchDropdownData)(dispatch, dataFetchConfig, 'propertyAddress', 'mohalla', state, true);
      }
      return action;
    } catch (e) {
      return action;
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

exports.default = formConfig;