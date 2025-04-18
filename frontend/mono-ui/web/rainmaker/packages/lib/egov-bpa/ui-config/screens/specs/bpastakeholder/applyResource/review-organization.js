"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOrganizationDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("./footer");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getOrganizationDetails = exports.getOrganizationDetails = function getOrganizationDetails() {
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
          labelName: "Organization Details",
          labelKey: "BPA_COMMON_TR_DETAILS"
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
    viewOne: (0, _utils.getCommonContainer)({
      reviewOrgName: (0, _utils.getLabelWithValue)({
        labelName: "Name of Organization",
        labelKey: "BPA_ORGANIZATION_NAME"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.institution.instituionName",
        callBack: _utils2.checkValueForNA
      }),
      reviewContactNo: (0, _utils.getLabelWithValue)({
        labelName: "Contact No.",
        labelKey: "BPA_ORGANIZATION_CONTACT_NO"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.institution.contactNo",
        callBack: _utils2.checkValueForNA
      }),
      reviewpartnerName: (0, _utils.getLabelWithValue)({
        labelName: "Name of Partners/Directors/Contact Person",
        labelKey: "BPA_ORGANIZATION_CONTACT_PERSON_NAME"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.institution.name",
        callBack: _utils2.checkValueForNA
      }),
      reviewDesignation: (0, _utils.getLabelWithValue)({
        labelName: "Designation",
        labelKey: "BPA_ORGANIZATION_DESIGNATION"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.institution.designation",
        callBack: _utils2.checkValueForNA
      }),
      reviewOrgRegistraionNo: (0, _utils.getLabelWithValue)({
        labelName: "Organization Registration NO/CIN Number",
        labelKey: "BPA_ORGANIZATION_REGISTRATION_NO"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.institution.organisationRegistrationNo",
        callBack: _utils2.checkValueForNA
      }),
      reviewOrgAddress: (0, _utils.getLabelWithValue)({
        labelName: "Address of Organization",
        labelKey: "BPA_ORGANIZATION_ADDRESS"
      }, {
        jsonPath: "Licenses[0].tradeLicenseDetail.institution.address",
        callBack: _utils2.checkValueForNA
      })
    })
  });
};