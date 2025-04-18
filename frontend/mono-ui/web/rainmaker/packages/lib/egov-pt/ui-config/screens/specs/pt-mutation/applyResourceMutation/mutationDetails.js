"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutationDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var mutationDetails = exports.mutationDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Mutation Details",
    labelKey: "PT_MUTATION_DETAILS"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  mutationDetailsContainer: (0, _utils.getCommonContainer)({
    getMutationPendingRadioButton: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      jsonPath: "Property.additionalDetails.isMutationInCourt",
      props: {
        label: {
          name: "Is Mutation Pending in Court?",
          key: "PT_MUTATION_COURT_PENDING_OR_NOT"
        },
        buttons: [{
          labelName: "Yes",
          labelKey: "PT_MUTATION_PENDING_YES",
          value: "YES"
        }, {
          label: "No",
          labelKey: "PT_MUTATION_PENDING_NO",
          value: "NO"
        }],
        // jsonPath:"Property.additionalDetails.isMutationInCourt",
        required: true
      },
      required: true,
      type: "array",
      beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
        var courtCaseJsonPath = "components.div.children.formwizardFirstStep.children.mutationDetails.children.cardContent.children.mutationDetailsContainer.children.courtCaseDetails";
        if (action.value === "NO") {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.disabled", true));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.value", ""));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.helperText", ""));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.error", false));
        } else {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.disabled", false));
        }
      }
    },
    courtCaseDetails: (0, _utils.getTextField)({
      label: {
        labelName: "Details of Court Case",
        labelKey: "PT_MUTATION_COURT_CASE_DETAILS"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Details of Court Case",
        labelKey: "PT_MUTATION_COURT_CASE_DETAILS_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("Address"),
      jsonPath: "Property.additionalDetails.caseDetails"
    }),
    getMutationStateAcquisitionRadioButton: {
      uiFramework: "custom-containers",
      componentPath: "RadioGroupContainer",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      jsonPath: "Property.additionalDetails.isPropertyUnderGovtPossession",
      props: {
        label: {
          name: "Is Property or Part of Property under State/Central Government Acquisition? ",
          key: "PT_MUTATION_STATE_ACQUISITION"
        },
        buttons: [{
          labelName: "Yes",
          labelKey: "PT_MUTATION_STATE_ACQUISITION_YES",
          value: "YES"
        }, {
          label: "No",
          labelKey: "PT_MUTATION_STATE_ACQUISITION_NO",
          value: "NO"
        }],
        // jsonPath:"Property.additionalDetails.isPropertyUnderGovtPossession",
        required: true
      },
      required: true,
      type: "array",
      beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
        var courtCaseJsonPath = "components.div.children.formwizardFirstStep.children.mutationDetails.children.cardContent.children.mutationDetailsContainer.children.govtAcquisitionDetails";
        if (action.value === "NO") {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.disabled", true));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.value", ""));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.helperText", ""));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.error", false));
        } else {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", courtCaseJsonPath, "props.disabled", false));
        }
      }
    },
    govtAcquisitionDetails: (0, _utils.getTextField)({
      label: {
        labelName: "Details of Government Acquisition",
        labelKey: "PT_MUTATION_GOVT_ACQUISITION_DETAILS"
      },
      props: {
        className: "applicant-details-error"
      },
      placeholder: {
        labelName: "Enter Details of Govt Acquisition",
        labelKey: "PT_MUTATION_GOVT_ACQUISITION_DETAILS_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("Address"),
      jsonPath: "Property.additionalDetails.govtAcquisitionDetails"
    })

  })
});