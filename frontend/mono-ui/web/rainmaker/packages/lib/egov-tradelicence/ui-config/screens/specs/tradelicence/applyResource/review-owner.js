"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getReviewOwner = exports.tradeInstitutionDetails = exports.tradeOwnerDetails = exports.reviewOwnerPAN = exports.reviewOwnerEmail = exports.reviewOwnerPhoneNo = exports.reviewOwnerDOB = exports.reviewOwnerGender = exports.reviewRelationship = exports.reviewOwnerFatherName = exports.reviewsubOwnership = exports.reviewownershipType = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _footer = require("./footer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewownershipType = exports.reviewownershipType = (0, _utils.getLabelWithValue)({
  labelName: "Type of ownership",
  labelKey: "TL_NEW_OWNER_DETAILS_OWNERSHIP_TYPE_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.subOwnerShipCategory",
  localePrefix: {
    moduleName: "common-masters",
    masterName: "OwnerShipCategory"
  },
  callBack: function callBack(value) {
    return value ? value.split(".")[0] : "";
  }
});
var reviewsubOwnership = exports.reviewsubOwnership = (0, _utils.getLabelWithValue)({
  labelName: "Type of sub-ownership",
  labelKey: "TL_NEW_OWNER_DETAILS_TYPE_OF_OWNERSHIP"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.subOwnerShipCategory",
  localePrefix: {
    moduleName: "common-masters",
    masterName: "OwnerShipCategory"
  }
});
var reviewOwnerFatherName = exports.reviewOwnerFatherName = (0, _utils.getLabelWithValue)({
  labelName: "Father/Husband's Name",
  labelKey: "TL_NEW_OWNER_DETAILS_FATHER_NAME_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].fatherOrHusbandName"
});
var reviewRelationship = exports.reviewRelationship = (0, _utils.getLabelWithValue)({
  labelName: "Relationship",
  labelKey: "TL_COMMON_RELATIONSHIP_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].relationship",
  localePrefix: {
    moduleName: "COMMON",
    masterName: "RELATION"
  }

});
var reviewOwnerGender = exports.reviewOwnerGender = (0, _utils.getLabelWithValue)({
  labelName: "Gender",
  labelKey: "TL_NEW_OWNER_DETAILS_GENDER_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].gender",
  localePrefix: {
    moduleName: "COMMON",
    masterName: "GENDER"
  }
});

var reviewOwnerDOB = exports.reviewOwnerDOB = (0, _utils.getLabelWithValue)({
  labelName: "Date of Birth",
  labelKey: "TL_EMP_APPLICATION_DOB"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].dob",
  callBack: _utils2.convertEpochToDate
});

var reviewOwnerPhoneNo = exports.reviewOwnerPhoneNo = (0, _utils.getLabelWithValue)({
  labelName: "Mobile No.",
  labelKey: "TL_NEW_OWNER_DETAILS_MOB_NO_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].mobileNumber"
});
var reviewOwnerEmail = exports.reviewOwnerEmail = (0, _utils.getLabelWithValue)({
  labelName: "Email",
  labelKey: "TL_NEW_OWNER_DETAILS_EMAIL_LABEL"
}, {
  jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].emailId",
  callBack: _utils2.checkValueForNA
});
var reviewOwnerPAN = exports.reviewOwnerPAN = (0, _utils.getLabelWithValue)({
  labelName: "PAN No.",
  labelKey: "TL_NEW_OWNER_DETAILS_PAN_LABEL"
}, { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].pan", callBack: _utils2.checkValueForNA });

var tradeOwnerDetails = exports.tradeOwnerDetails = {
  reviewownershipType: reviewownershipType,
  reviewsubOwnership: reviewsubOwnership,
  reviewOwnerPhoneNo: reviewOwnerPhoneNo,
  reviewOwnerName: (0, _utils.getLabelWithValue)({
    labelName: "Name",
    labelKey: "TL_NEW_OWNER_DETAILS_NAME_LABEL"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].name" }),
  reviewOwnerFatherName: reviewOwnerFatherName,
  reviewRelationship: reviewRelationship,
  reviewOwnerGender: reviewOwnerGender,
  reviewOwnerDOB: reviewOwnerDOB,
  reviewOwnerEmail: reviewOwnerEmail,
  reviewOwnerPAN: reviewOwnerPAN,
  reviewOwnerAddr: (0, _utils.getLabelWithValue)({
    labelName: "Corrospondence Address",
    labelKey: "TL_NEW_OWNER_DETAILS_ADDR_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress",
    callBack: _utils2.checkValueForNA
  }),
  reviewOwnerSpecialCat: (0, _utils.getLabelWithValue)({
    labelName: "Special Owner Category",
    labelKey: "TL_NEW_OWNER_DETAILS_SPL_OWN_CAT_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].ownerType",
    localePrefix: {
      moduleName: "common-masters",
      masterName: "OwnerType"
    },
    callBack: _utils2.checkValueForNA
  })
};
var tradeInstitutionDetails = exports.tradeInstitutionDetails = {
  reviewownershipType: reviewownershipType,
  reviewsubOwnership: reviewsubOwnership,
  reviewOwnerPhoneNo: reviewOwnerPhoneNo,
  reviewoffTelephone: (0, _utils.getLabelWithValue)({
    labelName: "Official Telephone No.",
    labelKey: "TL_NEW_OWNER_PHONE_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].altContactNumber",
    callBack: _utils2.checkValueForNA
  }),
  reviewOwnerName: (0, _utils.getLabelWithValue)({
    labelName: "Name of the Authorised Person",
    labelKey: "TL_NEW_OWNER_AUTH_PER_LABEL"
  }, { jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].name" }),
  reviewDesignation: (0, _utils.getLabelWithValue)({
    labelName: "Designation",
    labelKey: "TL_NEW_OWNER_DESIG_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.institution.designation",
    callBack: _utils2.checkValueForNA
  }),
  reviewOwnerFatherName: reviewOwnerFatherName,
  reviewRelationship: reviewRelationship,
  reviewOwnerGender: reviewOwnerGender,
  reviewOwnerDOB: reviewOwnerDOB,

  reviewOwnerEmail: reviewOwnerEmail,
  reviewOwnerAddr: (0, _utils.getLabelWithValue)({
    labelName: "Official Corrospondence Address",
    labelKey: "TL_NEW_OWNER_OFF_ADDR_LABEL"
  }, {
    jsonPath: "Licenses[0].tradeLicenseDetail.owners[0].permanentAddress",
    callBack: _utils2.checkValueForNA
  })
};
var getReviewOwner = exports.getReviewOwner = function getReviewOwner() {
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
          labelName: "Owner Details",
          labelKey: "TL_COMMON_OWN_DETAILS"
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
              labelKey: "TL_SUMMARY_EDIT"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _footer.changeStep)(state, dispatch, "", 1);
            }
          }
        }
      }
    },
    multiOwner: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        scheama: (0, _utils.getCommonGrayCard)({
          viewFive: (0, _utils.getCommonContainer)(tradeOwnerDetails)
        }),
        items: [],
        hasAddItem: false,
        sourceJsonPath: "Licenses[0].tradeLicenseDetail.owners",
        prefixSourceJsonPath: "children.cardContent.children.viewFive.children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    },
    multiOwnerInstitutional: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        scheama: (0, _utils.getCommonGrayCard)({
          viewFive: (0, _utils.getCommonContainer)(tradeInstitutionDetails)
        }),

        items: [],
        hasAddItem: false,
        sourceJsonPath: "Licenses[0].tradeLicenseDetail.owners",
        prefixSourceJsonPath: "children.cardContent.children.viewFive.children"
      },
      type: "array"
    }
  });
};