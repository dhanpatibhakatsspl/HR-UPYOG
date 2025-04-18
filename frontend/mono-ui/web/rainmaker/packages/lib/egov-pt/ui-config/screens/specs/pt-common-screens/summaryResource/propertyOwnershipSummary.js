"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.institutionSummary = exports.applicantSummary = exports.reviewRelationship = exports.reviewGuardianName = exports.reviewOwnerGender = exports.reviewOwnerPhoneNo = exports.reviewownershipType = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: label
    },
    type: "array"
  };
};

var reviewownershipType = exports.reviewownershipType = (0, _utils.getLabelWithValue)({
  labelName: "Ownership Type",
  labelKey: "PT_COMMON_OWNERSHIP_TYPE"
}, {
  jsonPath: "Property.ownershipCategory",
  localePrefix: {
    moduleName: "common-masters",
    masterName: "OwnerShipCategory"
  },
  callBack: function callBack(value) {
    return value ? value.split(".")[0] : "";
  }
});

var reviewOwnerPhoneNo = exports.reviewOwnerPhoneNo = (0, _utils.getLabelWithValue)({
  labelName: "Mobile No.",
  labelKey: "PT_COMMON_APPLICANT_MOBILE_NO_LABEL"
}, {
  jsonPath: "Property.owners[0].mobileNumber",
  callBack: _utils2.checkValueForNA
});

var reviewOwnerGender = exports.reviewOwnerGender = (0, _utils.getLabelWithValue)({
  labelName: "Gender",
  labelKey: "PT_COMMON_GENDER_LABEL"
}, {
  jsonPath: "Property.owners[0].gender",
  callBack: _utils2.checkValueForNA
});

var reviewGuardianName = exports.reviewGuardianName = (0, _utils.getLabelWithValue)({
  labelName: "Father/Husband's Name",
  labelKey: "PT_COMMON_FATHER_OR_HUSBAND_NAME"
}, {
  jsonPath: "Property.owners[0].fatherOrHusbandName",
  callBack: _utils2.checkValueForNA
});

var reviewRelationship = exports.reviewRelationship = (0, _utils.getLabelWithValue)({
  labelName: "Relationship with Guardian",
  labelKey: "PT_COMMON_APPLICANT_RELATIONSHIP_LABEL"
}, {
  jsonPath: "Property.owners[0].relationship",
  localePrefix: {
    moduleName: "common-masters",
    masterName: "OwnerType"
  },
  callBack: _utils2.checkValueForNA
});

var applicantSummary = exports.applicantSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Transferee Details",
        labelKey: "PT_COMMON_PROPERTY_OWNERSHIP_DETAILS_HEADER"
      }))
    }
  },
  ownerDetailsHeader: getHeader({
    labelName: "Owner Information",
    labelKey: "PT_COMMON_OWNER_INFORMATION"
  }),
  break: (0, _utils.getBreak)(),
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: (0, _utils.getCommonContainer)({
        reviewownershipType: reviewownershipType,
        reviewOwnerPhoneNo: reviewOwnerPhoneNo,
        reviewOwnerName: (0, _utils.getLabelWithValue)({
          labelName: "Name",
          labelKey: "PT_COMMON_APPLICANT_NAME_LABEL"
        }, {
          jsonPath: "Property.owners[0].name",
          callBack: _utils2.checkValueForNA
        }),
        reviewOwnerGender: reviewOwnerGender,
        reviewGuardianName: reviewGuardianName,
        reviewRelationship: reviewRelationship,
        reviewOwnerAddr: (0, _utils.getLabelWithValue)({
          labelName: "Correspondence Address",
          labelKey: "PT_COMMON_CORRESPONDENCE_ADDRESS_LABEL"
        }, {
          jsonPath: "Property.owners[0].correspondenceAddress",
          callBack: _utils2.checkValueForNA
        }),
        reviewOwnerSpecialCat: (0, _utils.getLabelWithValue)({
          labelName: "Special Applicant Category",
          labelKey: "PT_COMMON_SPECIAL_APPLICANT_CATEGORY_LABEL"
        }, {
          jsonPath: "Property.owners[0].ownerType",
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerType"
          },
          callBack: _utils2.checkValueForNA
        }),
        reviewSameAsPropertyAddress: (0, _utils.getLabelWithValue)({
          labelName: "Same as property address",
          labelKey: "PT_COMMON_SAME_AS_PROPERTY_ADDRESS"
        }, {
          jsonPath: "Property.owners[0].sameAsPropertyAddress",
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerType"
          },
          callBack: _utils2.checkValueForNA
        }),
        break: (0, _utils.getBreak)()
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "Property.owners",
      prefixSourceJsonPath: "children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});

var institutionSummary = exports.institutionSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Property Ownership Details",
        labelKey: "PT_COMMON_PROPERTY_OWNERSHIP_DETAILS_HEADER"
      }))
    }
  },
  breaks: (0, _utils.getBreak)(),
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: (0, _utils.getCommonContainer)({
        reviewownershipType: reviewownershipType,
        reviewInstituteName: (0, _utils.getLabelWithValue)({
          labelName: "Institution Name",
          labelKey: "PT_COMMON_INSTITUTION_NAME"
        }, {
          jsonPath: "Property.institution.name",
          callBack: _utils2.checkValueForNA
        }),
        reviewinstituteType: (0, _utils.getLabelWithValue)({
          labelName: "Institution Type",
          labelKey: "PT_COMMON_INSTITUTION_TYPE"
        }, {
          jsonPath: "Property.institution.type",
          localePrefix: {
            moduleName: "common-masters",
            masterName: "OwnerShipCategory"
          },
          callBack: _utils2.checkValueForNA
        }),
        break: (0, _utils.getBreak)()
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "Property.owners",
      prefixSourceJsonPath: "children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  },
  ownerDetailsHeaders: getHeader({
    labelName: "Details of Authorised Person",
    labelKey: "PT_COMMON_AUTHORISED_PERSON_DETAILS"
  }),
  breaks1: (0, _utils.getBreak)(),
  cardTwo: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: (0, _utils.getCommonContainer)({
        authorisedPersonName: (0, _utils.getLabelWithValue)({
          labelName: "Name",
          labelKey: "PT_COMMON_AUTHORISED_PERSON_NAME"
        }, {
          jsonPath: "Property.owners[0].name",
          callBack: _utils2.checkValueForNA
        }),
        authorisedDesignationValue: (0, _utils.getLabelWithValue)({
          labelName: "Designation",
          labelKey: "PT_COMMON_AUTHORISED_PERSON_DESIGNATION"
        }, {
          jsonPath: "Property.institution.designation",
          callBack: _utils2.checkValueForNA
        }),
        authorisedMobile: (0, _utils.getLabelWithValue)({
          labelName: "Mobile",
          labelKey: "PT_COMMON_AUTHORISED_MOBILE"
        }, {
          jsonPath: "Property.owners[0].mobileNumber",
          callBack: _utils2.checkValueForNA
        }),
        authorisedLandline: (0, _utils.getLabelWithValue)({
          labelName: "Landline",
          labelKey: "PT_COMMON_AUTHORISED_LANDLINE"
        }, {
          jsonPath: "Property.owners[0].altContactNumber",
          callBack: _utils2.checkValueForNA
        }),
        authorisedAddress: (0, _utils.getLabelWithValue)({
          labelName: "Correspondence Address",
          labelKey: "PT_COMMON_AUTHORISED_CORRESPONDENCE_ADDRESS"
        }, {
          jsonPath: "Property.owners[0].correspondenceAddress",
          callBack: _utils2.checkValueForNA
        }),
        sameAsPropertyAddress: (0, _utils.getLabelWithValue)({
          labelName: "Same as property address",
          labelKey: "PT_COMMON_SAME_AS_PROPERTY_ADDRESS"
        }, {
          jsonPath: "Property.owners[0].sameAsPropertyAddress",
          callBack: _utils2.checkValueForNA
        }),
        break: (0, _utils.getBreak)()
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "Property.owners",
      prefixSourceJsonPath: "children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});