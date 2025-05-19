"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registrationSummary = exports.registrationSummaryDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var registrationSummaryDetails = exports.registrationSummaryDetails = {
  transferReason: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Reason for Transfer",
    labelKey: "PT_MUTATION_TRANSFER_REASON"
  }, {
    jsonPath: "Property.additionalDetails.reasonForTransfer",
    callBack: _utils2.checkValueForNA
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, { jsonPath: "PropertyOld.additionalDetails.reasonForTransfer", callBack: _utils2.checkValueForNA }),
  marketValue: (0, _utils.getLabelWithValueForModifiedLabel)({

    labelName: "Market Value",
    labelKey: "PT_MUTATION_MARKET_VALUE"
  }, {
    jsonPath: "Property.additionalDetails.marketValue",
    callBack: _utils2.checkValueForNA
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, { jsonPath: "PropertyOld.additionalDetails.marketValue", callBack: _utils2.checkValueForNA }),
  documentNo: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Document No.",
    labelKey: "PT_MUTATION_DOCUMENT_NO"
  }, {
    jsonPath: "Property.additionalDetails.documentNumber",
    callBack: _utils2.checkValueForNA
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, { jsonPath: "PropertyOld.additionalDetails.documentNumber", callBack: _utils2.checkValueForNA }), documentDate: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Document Issue Date",
    labelKey: "PT_MUTATION_DOCUMENT_DATE"
  }, {
    jsonPath: "Property.additionalDetails.documentDate",
    callBack: function callBack(value) {
      return (0, _index.convertEpochToDate)(value);
    }
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, {
    jsonPath: "PropertyOld.additionalDetails.documentDate", callBack: function callBack(value) {
      return (0, _index.convertEpochToDate)(value);
    }
  }), documentValue: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Document Value",
    labelKey: "PT_MUTATION_DOCUMENT_VALUE"
  }, {
    jsonPath: "Property.additionalDetails.documentValue",
    callBack: _utils2.checkValueForNA
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, { jsonPath: "PropertyOld.additionalDetails.documentValue", callBack: _utils2.checkValueForNA }),
  remarks: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Remarks",
    labelKey: "PT_MUTATION_REMARKS"
  }, {
    jsonPath: "Property.additionalDetails.remarks",
    callBack: _utils2.checkValueForNA
  }, {
    labelKey: "PTM_OLD_LABEL_NAME"
  }, { jsonPath: "PropertyOld.additionalDetails.remarks", callBack: _utils2.checkValueForNA })
};
var registrationDetails = (0, _utils.getCommonGrayCard)({
  propertyLocationContainer: (0, _utils.getCommonContainer)(registrationSummaryDetails)
});

var registrationSummary = exports.registrationSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Registration Details",
        labelKey: "PT_MUTATION_REGISTRATION_DETAILS"
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

  cardOne: registrationDetails
});