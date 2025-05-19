"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transferorInstitutionSummary = exports.transferorSummary = exports.transferorInstitutionSummaryDetails = exports.transferorSummaryDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transferorSummaryDetails = exports.transferorSummaryDetails = {
  ownerName: (0, _utils.getLabelWithValue)({
    labelName: "Name",
    labelKey: "PT_OWNERSHIP_INFO_NAME"
  }, {
    jsonPath: "Property.ownersInit[0].name",
    callBack: _utils2.checkValueForNA
  }), ownerFatherHusbandName: (0, _utils.getLabelWithValue)({
    labelName: "Guardian's Name",
    labelKey: "PT_SEARCHPROPERTY_TABEL_GUARDIANNAME"
  }, {
    jsonPath: "Property.ownersInit[0].fatherOrHusbandName",
    callBack: _utils2.checkValueForNA
  }), ownerGender: (0, _utils.getLabelWithValue)({
    labelName: "Gender",
    labelKey: "PT_OWNERSHIP_INFO_GENDER"
  }, {
    jsonPath: "Property.ownersInit[0].gender",
    callBack: _utils2.checkValueForNA
  }), ownerType: (0, _utils.getLabelWithValue)({
    labelName: "Type of Ownership",
    labelKey: "PT_FORM3_OWNERSHIP_TYPE"
  }, {
    jsonPath: "Property.ownershipCategoryInit",
    callBack: _utils2.checkValueForNA
  }),
  mobileNo: (0, _utils.getLabelWithValue)({
    labelName: "Mobile No.",
    labelKey: "PT_OWNERSHIP_INFO_MOBILE_NO"
  }, {
    jsonPath: "Property.ownersInit[0].mobileNumber",
    callBack: _utils2.checkValueForNA
  }), ownerEmail: (0, _utils.getLabelWithValue)({
    labelName: "Email",
    labelKey: "PT_OWNERSHIP_INFO_EMAIL_ID"
  }, {
    jsonPath: "Property.ownersInit[0].emailId",
    callBack: _utils2.checkValueForNA
  }), alterMobile: (0, _utils.getLabelWithValue)({
    labelName: "Mobile No.",
    labelKey: "PT_FORM3_ALT_MOBILE_NO"
  }, {
    jsonPath: "Property.ownersInit[0].alternatemobilenumber",
    callBack: _utils2.checkValueForNA
  }),
  ownerDob: (0, _utils.getLabelWithValue)({
    labelName: "Special Category",
    labelKey: "PT_OWNERSHIP_INFO_USER_CATEGORY"
  }, {
    jsonPath: "Property.ownersInit[0].ownerType",
    callBack: _utils2.checkValueForNA
  }),
  ownerAddress: (0, _utils.getLabelWithValue)({
    labelName: "Correspondence Address",
    labelKey: "PT_OWNERSHIP_INFO_CORR_ADDR"
  }, {
    jsonPath: "Property.ownersInit[0].permanentAddress",
    callBack: _utils2.checkValueForNA
  }),
  ownerSpecialDocumentType: (0, _utils.getLabelWithValue)({
    labelName: "Document Type",
    labelKey: "PT_CATEGORY_DOCUMENT_TYPE"
  }, {
    jsonPath: "Property.ownersInit[0].documentType",
    callBack: _utils2.checkValueForNA
  }),
  ownerSpecialDocumentID: (0, _utils.getLabelWithValue)({
    labelName: "Document Id",
    labelKey: "PT_CATEGORY_DOCUMENT_ID"
  }, {
    jsonPath: "Property.ownersInit[0].documentUid",
    callBack: _utils2.checkValueForNA
  })
};
var transferorInstitutionSummaryDetails = exports.transferorInstitutionSummaryDetails = {
  institutionName: (0, _utils.getLabelWithValue)({
    labelName: "Name of Institution",
    labelKey: "PT_OWNERSHIP_INSTI_NAME"
  }, {
    jsonPath: "Property.institutionInit.name",
    callBack: _utils2.checkValueForNA
  }),
  designation: (0, _utils.getLabelWithValue)({
    labelName: "Designation in Institution",
    labelKey: "PT_OWNERSHIP_INFO_DESIGNATION"
  }, {
    jsonPath: "Property.institutionInit.designation",
    callBack: _utils2.checkValueForNA
  }),
  institutionType: (0, _utils.getLabelWithValue)({
    labelName: "Institution Type",
    labelKey: "PT_OWNERSHIP_INSTI_TYPE"
  }, {
    jsonPath: "Property.institutionInit.type",
    callBack: function callBack(value) {
      if (!value) {
        return 'NA';
      }
      return "COMMON_MASTERS_OWNERSHIPCATEGORY_" + (0, _commons.getTransformedLocale)(value);
    }
  }),
  institutionOwnershipType: (0, _utils.getLabelWithValue)({
    labelName: "Type Of Ownership",
    labelKey: "PT_INSTI_OWNERSHIP_TYPE"
  }, {
    jsonPath: "Property.ownershipCategoryInit",
    callBack: _utils2.checkValueForNA
  }),
  authorizedPersonName: (0, _utils.getLabelWithValue)({
    labelName: "Name of Authorized Person",
    labelKey: "PT_OWNERSHIP_INFO_NAME_OF_AUTH"
  }, {
    jsonPath: "Property.institutionInit.nameOfAuthorizedPerson",
    callBack: _utils2.checkValueForNA
  }),
  telephoneNumber: (0, _utils.getLabelWithValue)({
    labelName: "Official Telephone No.",
    labelKey: "PT_OWNERSHIP_INFO_TEL_NO"
  }, {
    jsonPath: "Property.ownersInit[0].altContactNumber",
    callBack: _utils2.checkValueForNA
  }),
  mobileNumber: (0, _utils.getLabelWithValue)({
    labelName: "Mobile No. of Authorized Person",
    labelKey: "PT_OWNERSHIP_INFO_MOBILE_NO"
  }, {
    jsonPath: "Property.ownersInit[0].mobileNumber",
    callBack: _utils2.checkValueForNA
  }), alterMobile: (0, _utils.getLabelWithValue)({
    labelName: "Mobile No.",
    labelKey: "PT_FORM3_ALT_MOBILE_NO"
  }, {
    jsonPath: "Property.ownersInit[0].alternatemobilenumber",
    callBack: _utils2.checkValueForNA
  }),
  officialAddress: (0, _utils.getLabelWithValue)({
    labelName: "Official Correspondence Address",
    labelKey: "PT_OWNERSHIP_INFO_CORR_ADDR"
  }, {
    jsonPath: "Property.ownersInit[0].correspondenceAddress",
    callBack: _utils2.checkValueForNA
  })
};

var transferorSummary = exports.transferorSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Transferor Details",
        labelKey: "PT_MUTATION_TRANSFEROR_DETAILS"
      }))
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "owner-summary",
      scheama: (0, _utils.getCommonGrayCard)({
        ownerContainer: (0, _utils.getCommonContainer)(transferorSummaryDetails)
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "Property.ownersInit",
      prefixSourceJsonPath: "children.cardContent.children.ownerContainer.children",
      afterPrefixJsonPath: "children.value.children.key"
    },
    type: "array"
  }
});

var transferorInstitutionSummary = exports.transferorInstitutionSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Transferor Details",
        labelKey: "PT_INSTITUTION_TRANSFEROR_DETAILS_HEADER"
      }))
    }
  },
  body: (0, _utils.getCommonContainer)(transferorInstitutionSummaryDetails)
});