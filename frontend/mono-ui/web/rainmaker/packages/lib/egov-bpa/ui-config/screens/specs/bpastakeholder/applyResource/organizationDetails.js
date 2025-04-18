"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.organizationDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var organizationDetails = exports.organizationDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Organization Details",
    labelKey: "BPA_NEW_ORGANIZATION_DETAILS_PROV_DET_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  organizationDetailsConatiner: (0, _utils.getCommonContainer)({
    nameOfOrganization: (0, _utils.getTextField)({
      label: {
        labelName: "Name of Organization",
        labelKey: "BPA_ORGANIZATION_NAME"
      },
      placeholder: {
        labelName: "Enter Name of Organization",
        labelKey: "BPA_ORGANIZATION_NAME_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      jsonPath: "Licenses[0].tradeLicenseDetail.institution.instituionName"
    }),

    contactNo: (0, _utils.getTextField)({
      label: {
        labelName: "Contact No.",
        labelKey: "BPA_ORGANIZATION_CONTACT_NO"
      },
      placeholder: {
        labelName: "Enter Contact No",
        labelKey: "BPA_ORGANIZATION_CONTACT_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      jsonPath: "Licenses[0].tradeLicenseDetail.institution.contactNo"
    }),
    partnerName: (0, _utils.getTextField)({
      label: {
        labelName: "Name of Partners/Directors/Contact Person",
        labelKey: "BPA_ORGANIZATION_CONTACT_PERSON_NAME"
      },
      placeholder: {
        labelName: "Enter Name of Partners/Directors/Contact Person",
        labelKey: "BPA_ORGANIZATION_CONTACT_PERSON_NAME_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      jsonPath: "Licenses[0].tradeLicenseDetail.institution.name"
    }),
    designation: (0, _utils.getTextField)({
      label: {
        labelName: "Designation",
        labelKey: "BPA_ORGANIZATION_DESIGNATION"
      },
      placeholder: {
        labelName: "Enter Designation",
        labelKey: "BPA_ORGANIZATION_DESIGNATION_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      jsonPath: "Licenses[0].tradeLicenseDetail.institution.designation"
    }),
    orgRegistraionNo: (0, _utils.getTextField)({
      label: {
        labelName: "Organization Registration NO/CIN Number",
        labelKey: "BPA_ORGANIZATION_REGISTRATION_NO"
      },
      placeholder: {
        labelName: "Enter Organization Registration NO/CIN Number",
        labelKey: "BPA_ORGANIZATION_REGISTRATION_NO_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      jsonPath: "Licenses[0].tradeLicenseDetail.institution.organisationRegistrationNo"
    }),
    orgAddress: (0, _utils.getTextField)({
      label: {
        labelName: "Address of Organization",
        labelKey: "BPA_ORGANIZATION_ADDRESS"
      },
      placeholder: {
        labelName: "Enter Address of Organization",
        labelKey: "BPA_ORGANIZATION_ADDRESS_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      jsonPath: "Licenses[0].tradeLicenseDetail.institution.address"
    })
  })
});