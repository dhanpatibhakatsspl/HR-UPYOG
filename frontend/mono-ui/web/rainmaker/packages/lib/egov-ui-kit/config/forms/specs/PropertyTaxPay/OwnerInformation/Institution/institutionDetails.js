"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _endPoints = require("egov-ui-kit/utils/endPoints");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _formConfigModifier = require("../../utils/formConfigModifier");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "institutionDetails",
  fields: {
    name: {
      id: "institution-name",
      jsonPath: "Properties[0].propertyDetails[0].institution.name",
      type: "textfield",
      floatingLabelText: "PT_INSTITUTION_NAME",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      errorMessage: "PT_NAME_ERROR_MESSAGE",
      numcols: 6,
      required: true
    },
    type: {
      id: "institution-type",
      jsonPath: "Properties[0].propertyDetails[0].institution.type",
      type: "AutocompleteDropdown",
      localePrefix: "PROPERTYTAX_BILLING_SLAB",
      floatingLabelText: "PT_INSTITUTION_TYPE",
      numcols: 6,
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      required: true,
      labelsFromLocalisation: false,
      gridDefination: {
        xs: 12,
        sm: 6
      }
    }
  },
  beforeInitForm: function beforeInitForm(action, store) {
    var state = store.getState();
    var value = (0, _get2.default)(state, "form.ownershipType.fields.typeOfOwnership.value", "");
    var institutedropDown = (0, _formConfigModifier.updateInstituteType)(state, value);
    (0, _set2.default)(action, "form.fields.type.dropDownData", institutedropDown);
    return action;
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

exports.default = formConfig;