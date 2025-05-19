"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReviewLicenseDetails = exports.reviewValidityPeriod = exports.reviewcounsilForArchNo = exports.reviewLicenseeSubType = exports.reviewLicenseeType = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _footer = require("./footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewLicenseeType = exports.reviewLicenseeType = (0, _utils.getLabelWithValue)({
  labelName: "Technical Person Licensee Type",
  labelKey: "BPA_LICENSEE_TYPE_LABEL"
}, {
  jsonPath: "LicensesTemp[0].tradeLicenseDetail.tradeUnits[0].tradeType",
  localePrefix: {
    moduleName: "TRADELICENSE",
    masterName: "TRADETYPE"
  },
  callBack: _utils2.checkValueForNA
});

var reviewLicenseeSubType = exports.reviewLicenseeSubType = (0, _utils.getLabelWithValue)({
  labelName: "Technical Person Licensee Sub Type",
  labelKey: "BPA_LICENSEE_SUB_TYPE_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
  localePrefix: {
    moduleName: "TRADELICENSE",
    masterName: "TRADETYPE"
  },
  callBack: _utils2.checkValueForNA
});

var reviewcounsilForArchNo = exports.reviewcounsilForArchNo = (0, _utils.getLabelWithValue)({
  labelName: "Council for Architecture No.",
  labelKey: "BPA_COUNCIL_FOR_ARCH_NO_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.counsilForArchNo",
  callBack: _utils2.checkValueForNA
});

var reviewValidityPeriod = exports.reviewValidityPeriod = (0, _utils.getLabelWithValue)({
  labelName: "License valid up to.",
  labelKey: "BPA_LICENSE_VALID_UP_TO_LABEL"
}, {
  jsonPath: "Licenses[0].validTo",
  callBack: function callBack(value) {
    return (0, _utils.convertEpochToDate)(value) || _utils2.checkValueForNA;
  }
});

var getReviewLicenseDetails = exports.getReviewLicenseDetails = function getReviewLicenseDetails() {
  var isEditable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonGrayCard)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }, (0, _utils.getCommonSubHeader)({
          labelName: "Licensee Details",
          labelKey: "BPA_LICENSEE_DETAILS_HEADER_OWNER_INFO"
        })),
        editSection: {
          componentPath: "Button",
          props: {
            color: "primary"
          },
          visible: isEditable,
          gridDefination: {
            xs: 12,
            sm: 2,
            align: "right"
          },
          children: {
            editIcon: {
              uiFramework: "custom-atoms",
              componentPath: "Icon",
              props: {
                iconName: "edit"
              }
            },
            buttonLabel: (0, _utils.getLabel)({
              labelName: "Edit",
              labelKey: "BPA_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _footer.changeStep)(state, dispatch, "", 0);
            }
          }
        }
      }
    },
    multiOwner: (0, _utils.getCommonContainer)({
      viewFive: (0, _utils.getCommonContainer)({
        reviewLicenseeType: reviewLicenseeType,
        // reviewLicenseeSubType,
        reviewcounsilForArchNo: reviewcounsilForArchNo,
        reviewValidityPeriod: reviewValidityPeriod
      })
    })
  });
};