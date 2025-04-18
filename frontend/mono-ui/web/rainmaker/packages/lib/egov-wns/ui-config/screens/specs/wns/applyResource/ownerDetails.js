"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOwnerDetails = exports.specialApplicantCategory = exports.correspondenceAddress = exports.email = exports.fatherName = exports.Relationship = exports.dateOfBirth = exports.gender = exports.ownerMobileNumber = exports.ownerName = exports.ownershipType = exports.ownerDetailsHeader = exports.propertyOwnerDetailsHeader = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
    componentPath: "OwnerHeader",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: label
    },
    type: "array"
  };
};

var propertyOwnerDetailsHeader = exports.propertyOwnerDetailsHeader = getHeader({
  labelKey: "WS_OWNER_HEADER_LABEL"
});

var ownerDetailsHeader = exports.ownerDetailsHeader = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelKey: "WS_COMMON_OWN_DETAIL"
  })
});

var ownershipType = exports.ownershipType = (0, _utils.getLabelWithValue)({
  labelName: "Ownership Type ",
  labelKey: "WS_OWN_DETAIL_OWNERSHIP_TYPE_LABEL"
}, {
  jsonPath: "applyScreen.property.ownershipCategory",
  callBack: _utils2.handleNA,
  localePrefix: {
    moduleName: "WS",
    masterName: "OWNERSHIPCATEGORY"
  }
});

var ownerName = exports.ownerName = (0, _utils.getLabelWithValue)({
  labelName: "Name",
  labelKey: "WS_OWN_DETAIL_OWN_NAME_LABEL"
}, {
  jsonPath: "applyScreen.property.owners[0].name",
  callBack: _utils2.handleNA
});
var ownerMobileNumber = exports.ownerMobileNumber = (0, _utils.getLabelWithValue)({
  labelName: "Mobile Number",
  labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
}, {
  jsonPath: "applyScreen.property.owners[0].mobileNumber",
  callBack: _utils2.handleNA
});
var gender = exports.gender = (0, _utils.getLabelWithValue)({
  labelName: "Gender",
  labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
}, {
  jsonPath: "applyScreen.property.owners[0].gender",
  callBack: _utils2.handleNA
});
var dateOfBirth = exports.dateOfBirth = (0, _utils.getLabelWithValue)({
  labelName: "Date Of Birth",
  labelKey: "WS_OWN_DETAIL_DOB_LABEL"
}, {
  jsonPath: "applyScreen.property.owners[0].dob",
  callBack: _utils2.convertEpochToDateAndHandleNA
});
var Relationship = exports.Relationship = (0, _utils.getLabelWithValue)({
  labelName: "Relationship",
  labelKey: "WS_OWN_DETAIL_RELATION_LABEL"
}, {
  jsonPath: "applyScreen.property.owners[0].relationship",
  callBack: _utils2.handleNA
});
var fatherName = exports.fatherName = (0, _utils.getLabelWithValue)({
  labelName: "Father/Husband Name",
  labelKey: "WS_OWN_DETAIL_FATHER_OR_HUSBAND_NAME"
}, {
  jsonPath: "applyScreen.property.owners[0].fatherOrHusbandName",
  callBack: _utils2.handleNA
});
// export const ownerCategory = getLabelWithValue(
//   {
//     labelName: "Owner Category",
//     labelKey: "WS_OWN_DETAIL_CATEGORY_LABEL"
//   },
//   {
//     jsonPath: "WaterConnection[0].property.ownershipCategory",
//   }
// )
var email = exports.email = (0, _utils.getLabelWithValue)({
  labelName: "Email",
  labelKey: "WS_OWNER_DETAILS_EMAIL_LABEL"
}, {
  jsonPath: "applyScreen.property.owners[0].emailId",
  callBack: _utils2.handleNA
});
var correspondenceAddress = exports.correspondenceAddress = (0, _utils.getLabelWithValue)({
  labelName: "Correspondence Address",
  labelKey: "WS_OWN_DETAIL_CROSADD"
}, {
  jsonPath: "applyScreen.property.owners[0].correspondenceAddress",
  callBack: _utils2.handleNA
});
var specialApplicantCategory = exports.specialApplicantCategory = (0, _utils.getLabelWithValue)({
  labelName: "Special Applicant Category",
  labelKey: "WS_OWN_DETAIL_SPECIAL_APPLICANT_LABEL"
}, {
  jsonPath: "applyScreen.property.owners[0].ownerType",
  localePrefix: {
    moduleName: "COMMON_MASTERS",
    masterName: "OWNERTYPE"
  },
  callBack: _utils2.handleNA
});

var getOwnerDetails = exports.getOwnerDetails = function getOwnerDetails() {
  var isEditable = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

  return (0, _utils.getCommonGrayCard)({
    ownerHeader: (0, _utils.getCommonSubHeader)({
      labelKey: "WS_OWN_DETAIL_HEADER_INFO"
    }),
    headerDiv: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        className: "common-div-css search-preview",
        scheama: (0, _utils.getCommonGrayCard)({
          // div1: specialApplicantCategory,
          //   style: { marginBottom: "10px" }
          // },
          // children: {
          //   header: {
          //     gridDefination: {
          //       xs: 12,
          //       sm: 10
          //     },
          //     ...getCommonSubHeader({
          //     labelKey:"WS_OWN_DETAIL_HEADER_INFO"
          //     })
          //   },

          // }
          // },

          // multiOwner: {
          //   uiFramework: "custom-containers",
          //   componentPath: "MultiItem",
          //   props: {
          //     scheama: getCommonGrayCard({
          div3: propertyOwnerDetailsHeader,
          viewFive: (0, _utils.getCommonContainer)({
            ownerMobileNumber: (0, _utils.getLabelWithValue)({
              labelName: "Mobile Number",
              labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
            }, {
              jsonPath: "applyScreen.property.owners[0].mobileNumber",
              callBack: _utils2.handleNA
            }),
            ownerName: (0, _utils.getLabelWithValue)({
              labelName: "Name",
              labelKey: "WS_OWN_DETAIL_OWN_NAME_LABEL"
            }, {
              jsonPath: "applyScreen.property.owners[0].name",
              callBack: _utils2.handleNA
            }),
            gender: (0, _utils.getLabelWithValue)({
              labelName: "Gender",
              labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
            }, {
              jsonPath: "applyScreen.property.owners[0].gender",
              callBack: _utils2.handleNA
            }),
            dateOfBirth: (0, _utils.getLabelWithValue)({
              labelName: "Date Of Birth",
              labelKey: "WS_OWN_DETAIL_DOB_LABEL"
            }, {
              jsonPath: "applyScreen.property.owners[0].dob",
              callBack: _utils2.convertEpochToDateAndHandleNA
            }),
            email: (0, _utils.getLabelWithValue)({
              labelName: "Email",
              labelKey: "WS_OWNER_DETAILS_EMAIL_LABEL"
            }, {
              jsonPath: "applyScreen.property.owners[0].emailId",
              callBack: _utils2.handleNA
            }),
            fatherName: (0, _utils.getLabelWithValue)({
              labelName: "Father/Husband Name",
              labelKey: "WS_OWN_DETAIL_FATHER_OR_HUSBAND_NAME"
            }, {
              jsonPath: "applyScreen.property.owners[0].fatherOrHusbandName",
              callBack: _utils2.handleNA
            }),
            Relationship: (0, _utils.getLabelWithValue)({
              labelName: "Relationship",
              labelKey: "WS_OWN_DETAIL_RELATION_LABEL"
            }, { jsonPath: "applyScreen.property.owners[0].relationship",
              callBack: _utils2.handleNA }),
            //   ownerCategory,

            correspondenceAddress: (0, _utils.getLabelWithValue)({
              labelName: "Correspondence Address",
              labelKey: "WS_OWN_DETAIL_CROSADD"
            }, { jsonPath: "applyScreen.property.owners[0].correspondenceAddress",
              callBack: _utils2.handleNA }),
            specialApplicantCategory: (0, _utils.getLabelWithValue)({
              labelName: "Special Applicant Category",
              labelKey: "WS_OWN_DETAIL_SPECIAL_APPLICANT_LABEL"
            }, { jsonPath: "applyScreen.property.owners[0].ownerType",
              localePrefix: {
                moduleName: "COMMON_MASTERS",
                masterName: "OWNERTYPE"
              },
              callBack: _utils2.handleNA })
          })
        }),
        items: [],
        hasAddItem: false,
        sourceJsonPath: "applyScreen.property.owners",
        prefixSourceJsonPath: "children.cardContent.children.viewFive.children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
  });
};