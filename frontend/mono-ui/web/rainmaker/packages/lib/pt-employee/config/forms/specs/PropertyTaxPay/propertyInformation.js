"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _reusableFields = require("egov-ui-kit/config/forms/specs/PropertyTaxPay/utils/reusableFields");

var _actions = require("egov-ui-kit/redux/form/actions");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "propertyInformation",
  fields: (0, _extends3.default)({}, _reusableFields.city, _reusableFields.dummy, _reusableFields.houseNumber, _reusableFields.colony, _reusableFields.street, {

    mohalla: {
      id: "mohalla",
      jsonPath: "Properties[0].address.locality.code",
      type: "textfield",
      floatingLabelText: "PT_PROPERTY_DETAILS_MOHALLA",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      fullWidth: true,
      boundary: true,
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_MOHALLA_ERRORMSG",
      disabled: true
    }

  }, _reusableFields.pincode, {
    oldPID: {
      id: "oldpid",
      type: "textFieldIcon",
      className: "pt-old-pid-text-field",
      iconRedirectionURL: "https://pmidc.punjab.gov.in/propertymis/search.php",
      jsonPath: "Properties[0].oldPropertyId",
      floatingLabelText: "PT_PROPERTY_ADDRESS_EXISTING_PID",
      hintText: "PT_PROPERTY_ADDRESS_EXISTING_PID_PLACEHOLDER",
      numcols: 6,
      errorMessage: "PT_PROPERTY_DETAILS_PINCODE_ERRORMSG",
      errorStyle: { position: "absolute", bottom: -8, zIndex: 5 },
      pattern: /^[^\$\"'<>?\\\\~`!@$%^+={}*,.:;“”‘’]{1,64}$/i,
      maxLength: 64
    }
  }),
  beforeInitForm: function beforeInitForm(action, store) {
    var state = store.getState();
    (0, _set2.default)(action, "form.fields.city.required", false);
    (0, _set2.default)(action, "form.fields.pincode.disabled", true);
    return action;
  },
  afterInitForm: function afterInitForm(action, store, dispatch) {
    var tenantId = (0, _localStorageUtils.getTenantId)();
    dispatch((0, _actions.handleFieldChange)("propertyInformation", "city", tenantId));
    return action;
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

exports.default = formConfig;