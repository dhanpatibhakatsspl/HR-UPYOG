"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mutationSummary = exports.mutationSummaryDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mutationSummaryDetails = exports.mutationSummaryDetails = {
  transferReason: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Reason for Transfer",
    labelKey: "PT_MUTATION_COURT_PENDING_OR_NOT"
  }, {
    jsonPath: "Property.additionalDetails.isMutationInCourt",
    callBack: _utils2.checkValueForNA
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, { jsonPath: "PropertyOld.additionalDetails.isMutationInCourt", callBack: _utils2.checkValueForNA }), documentNo: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Document No.",
    labelKey: "PT_MUTATION_COURT_CASE_DETAILS"
  }, {
    jsonPath: "Property.additionalDetails.caseDetails",
    callBack: _utils2.checkValueForNA
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, { jsonPath: "PropertyOld.additionalDetails.caseDetails", callBack: _utils2.checkValueForNA }), documentDate: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Document Issue Date",
    labelKey: "PT_MUTATION_STATE_ACQUISITION"
  }, {
    jsonPath: "Property.additionalDetails.isPropertyUnderGovtPossession",
    callBack: _utils2.checkValueForNA
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, { jsonPath: "PropertyOld.additionalDetails.isPropertyUnderGovtPossession", callBack: _utils2.checkValueForNA }), documentValue: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Document Value",
    labelKey: "PT_MUTATION_GOVT_ACQUISITION_DETAILS"
  }, {
    jsonPath: "Property.additionalDetails.govtAcquisitionDetails",
    callBack: _utils2.checkValueForNA
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, { jsonPath: "PropertyOld.additionalDetails.govtAcquisitionDetails", callBack: _utils2.checkValueForNA })
};

var mutationDetails = (0, _utils.getCommonGrayCard)({
  mutationDetailsContainer: (0, _utils.getCommonContainer)(mutationSummaryDetails)
});

var mutationSummary = exports.mutationSummary = (0, _utils.getCommonGrayCard)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" }
    },
    children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 8
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Mutation Details",
        labelKey: "PT_MUTATION_DETAILS"
      })),
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px"
          }
        },
        gridDefination: {
          xs: 4,
          align: "right"
        }
        // children: {
        //   editIcon: {
        //     uiFramework: "custom-atoms",
        //     componentPath: "Icon",
        //     props: {
        //       iconName: "edit"
        //     }
        //   },
        // buttonLabel: getLabel({
        //   labelName: "Edit",
        //   labelKey: "PT_EDIT"
        // })
        // },
        // onClickDefination: {
        //   action: "condition",
        //   callBack: (state, dispatch) => {
        //     gotoApplyWithStep(state, dispatch, 0);
        //   }
        // }
      }
    }
  },

  cardOne: mutationDetails
});