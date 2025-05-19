"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var formConfig = {
  name: "additionalRebate",
  fields: {
    adhocPenalty: {
      id: "adhocPenalty",
      type: "number",
      floatingLabelText: "PT_ADDITIONAL_CHARGES",
      hintText: "PT_ENTER_AMOUNT",
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocPenalty"
    },
    adhocPenaltyReason: {
      id: "adhocPenaltyReason",
      type: "AutoSuggestDropdown",
      dropDownData: [{
        label: _react2.default.createElement(_translationNode2.default, { label: "PT_PENDING_DUES_FROM_EARLIER" }),
        value: "Pending dues from earlier"
      }, {
        label: _react2.default.createElement(_translationNode2.default, { label: "PT_MISCALCULATION_DUES" }),
        value: "Miscalculation of earlier assessment"
      }, {
        label: _react2.default.createElement(_translationNode2.default, { label: "PT_ONE_TIME_PENALTY" }),
        value: "One time Penalty"
      }, {
        label: _react2.default.createElement(_translationNode2.default, { label: "PROPERTYTAX_BILLING_SLAB_OTHERS" }),
        value: "Others"
      }],
      floatingLabelText: "PT_REASON_FOR_CHARGES",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocPenaltyReason"
    },
    adhocExemption: {
      id: "adhocExemption",
      type: "number",
      floatingLabelText: "PT_ADDITIONAL_REBATE",
      hintText: "PT_ENTER_AMOUNT",
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocExemption"
    },
    adhocExemptionReason: {
      id: "adhocExemptionReason",
      type: "singleValueList",
      floatingLabelText: "PT_REASON_FOR_REBATE",
      hintText: "ES_CREATECOMPLAINT_SELECT_PLACEHOLDER",
      dropDownData: [{
        label: _react2.default.createElement(_translationNode2.default, { label: "PT_REBATE_OPTION1" }),
        value: "Advanced paid by citizen earlier"
      }, {
        label: _react2.default.createElement(_translationNode2.default, { label: "PT_REBATE_OPTION2" }),
        value: "Rebate provided by commissioner/EO"
      }, {
        label: _react2.default.createElement(_translationNode2.default, { label: "PT_REBATE_OPTION3" }),
        value: "Additional amount charged from the citizen"
      }, {
        label: _react2.default.createElement(_translationNode2.default, { label: "PROPERTYTAX_BILLING_SLAB_OTHERS" }),
        value: "Others"
      }],
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocExemptionReason"
    },
    otherExemptionReason: {
      id: "adhocExemption",
      type: "textField",
      floatingLabelText: "PT_DESCRIPTION_FLOATING_LABEL",
      hintText: "PT_DESCRIPTION_HINT_TEXT",
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocExemptionReason"
    },
    otherPenaltyReason: {
      id: "adhocExemption",
      type: "textField",
      floatingLabelText: "PT_DESCRIPTION_FLOATING_LABEL",
      hintText: "PT_DESCRIPTION_HINT_TEXT",
      required: false,
      fullWidth: true,
      jsonPath: "Properties[0].propertyDetails[0].adhocPenaltyReason"
    }
  },
  action: "",
  saveUrl: "",
  redirectionRoute: ""
};

exports.default = formConfig;