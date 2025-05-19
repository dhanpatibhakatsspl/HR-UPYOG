"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registrationDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registrationDetails = exports.registrationDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Registration Details",
    labelKey: "PT_MUTATION_REGISTRATION_DETAILS"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  registrationDetailsContainer: (0, _utils.getCommonContainer)({
    transferReason: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-pt",
      componentPath: "AutosuggestContainer",
      props: {
        className: "autocomplete-dropdown",
        label: {
          labelName: "Reason for Transfer",
          labelKey: "PT_MUTATION_TRANSFER_REASON"
        },
        placeholder: {
          labelName: "Select Reason for Transfer",
          labelKey: "PT_MUTATION_TRANSFER_REASON_PLACEHOLDER"
        },
        required: true,
        isClearable: true,
        labelsFromLocalisation: true,
        localePrefix: {
          moduleName: "PropertyTax",
          masterName: "ReasonForTransfer"
        },
        sourceJsonPath: "ReasonForTransfer.PropertyTax.ReasonForTransfer",
        inputLabelProps: {
          shrink: true
        }
      },
      required: true,
      jsonPath: "Property.additionalDetails.reasonForTransfer",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    },

    marketValue: (0, _utils.getTextField)({
      label: {
        labelName: "Market Value",
        labelKey: "PT_MUTATION_MARKET_VALUE"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Market Value",
        labelKey: "PT_MUTATION_MARKET_VALUE_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("DocumentNo"),
      jsonPath: "Property.additionalDetails.marketValue"
    }),
    documentNumber: (0, _utils.getTextField)({
      label: {
        labelName: "Document No.",
        labelKey: "PT_MUTATION_DOCUMENT_NO"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Document No.",
        labelKey: "PT_MUTATION_DOCUMENT_NO_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("DocumentNo"),
      jsonPath: "Property.additionalDetails.documentNumber"
    }),
    documentIssueDateField: (0, _extends3.default)({}, (0, _utils.getDateField)({
      label: { labelName: "Document Issue Date", labelKey: "PT_MUTATION_DOCUMENT_ISSUE_DATE" },
      placeholder: {
        labelName: "Enter Document No.",
        labelKey: "PT_MUTATION_DOCUMENT_ISSUE_DATE_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      isDOB: true,
      errorMessage: "PT_DOCUMENT_DATE_ERROR_MESSAGE",
      jsonPath: "Property.additionalDetails.documentDate",
      props: {
        inputProps: {
          max: (0, _utils2.getTodaysDateInYMD)()
        }
      }
    })),

    documentValue: (0, _utils.getTextField)({
      label: {
        labelName: "Document Value",
        labelKey: "PT_MUTATION_DOCUMENT_VALUE"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Document Value",
        labelKey: "PT_MUTATION_DOCUMENT_VALUE_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("DocumentNo"),
      jsonPath: "Property.additionalDetails.documentValue"
    }),
    remarks: (0, _utils.getTextField)({
      label: {
        labelName: "Remarks",
        labelKey: "PT_MUTATION_REMARKS"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Remarks if any",
        labelKey: "PT_MUTATION_REMARKS"
      },
      //pattern: getPattern("Address"),
      jsonPath: "Property.additionalDetails.remarks"
    })
  })
});