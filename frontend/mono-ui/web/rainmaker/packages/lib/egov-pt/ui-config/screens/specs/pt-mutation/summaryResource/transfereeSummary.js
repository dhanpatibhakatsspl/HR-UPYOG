"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transfereeInstitutionSummary = exports.transfereeSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("../../utils");

var _index = require("../../utils/index");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var showComponent = function showComponent(dispatch, componentJsonPath, display) {
  var displayProps = display ? {} : { display: "none" };
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", componentJsonPath, "props.style", displayProps));
};
var transfereeSummary = exports.transfereeSummary = (0, _utils.getCommonGrayCard)({
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
        labelKey: "PT_MUTATION_TRANSFEREE_DETAILS"
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

      }
    }
  },
  cardOne: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "owner-summary",
      scheama: (0, _utils.getCommonGrayCard)({
        ownerContainer: (0, _utils.getCommonContainer)({
          ownerName: (0, _utils.getLabelWithValue)({
            labelName: "Name",
            labelKey: "PT_OWNERSHIP_INFO_NAME"
          }, {
            jsonPath: "Property.ownersTemp[0].name",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].name", callBack: _utils2.checkValueForNA }), ownerFatherHusbandName: (0, _utils.getLabelWithValue)({
            labelName: "Guardian's Name",
            labelKey: "PT_SEARCHPROPERTY_TABEL_GUARDIANNAME"
          }, {
            jsonPath: "Property.ownersTemp[0].fatherOrHusbandName",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].fatherOrHusbandName", callBack: _utils2.checkValueForNA }), ownerGender: (0, _utils.getLabelWithValue)({
            labelName: "Gender",
            labelKey: "PT_OWNERSHIP_INFO_GENDER"
          }, {
            jsonPath: "Property.ownersTemp[0].gender",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].gender", callBack: _utils2.checkValueForNA }), ownerType: (0, _utils.getLabelWithValue)({
            labelName: "Type of Ownership",
            labelKey: "PT_FORM3_OWNERSHIP_TYPE"
          }, {
            jsonPath: "Property.ownershipCategoryTemp",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownershipCategoryTemp", callBack: _utils2.checkValueForNA }),
          mobileNo: (0, _utils.getLabelWithValue)({
            labelName: "Mobile No.",
            labelKey: "PT_OWNERSHIP_INFO_MOBILE_NO"
          }, {
            jsonPath: "Property.ownersTemp[0].mobileNumber",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].mobileNumber", callBack: _utils2.checkValueForNA }), alterMobileNo: (0, _utils.getLabelWithValue)({
            labelName: "Mobile No.",
            labelKey: "PT_FORM3_ALT_MOBILE_NO"
          }, {
            jsonPath: "Property.ownersTemp[0].alternatemobilenumber",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].alternatemobilenumber", callBack: _utils2.checkValueForNA }), ownerEmail: (0, _utils.getLabelWithValue)({
            labelName: "Email",
            labelKey: "PT_OWNERSHIP_INFO_EMAIL_ID"
          }, {
            jsonPath: "Property.ownersTemp[0].emailId",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].emailId", callBack: _utils2.checkValueForNA }),
          ownerDob: (0, _utils.getLabelWithValue)({
            labelName: "Special Category",
            labelKey: "PT_OWNERSHIP_INFO_USER_CATEGORY"
          }, {
            jsonPath: "Property.ownersTemp[0].ownerType",
            callBack: _utils2.checkValueForNA
            // callBack: value => {
            //   return convertEpochToDate(value);
            // }
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].ownerType", callBack: _utils2.checkValueForNA }),
          ownerAddress: (0, _utils.getLabelWithValue)({
            labelName: "Correspondence Address",
            labelKey: "PT_OWNERSHIP_INFO_CORR_ADDR"
          }, {
            jsonPath: "Property.ownersTemp[0].permanentAddress",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].permanentAddress", callBack: _utils2.checkValueForNA }),
          ownerSpecialDocumentType: (0, _index.getLabelIfNotNull)({
            labelName: "Special Category Document Type",
            labelKey: "PT_OWNERSHIP_SPECIAL_CATEGORY_DOCUMENT_TYPE"
          }, {
            jsonPath: "Property.ownersTemp[0].documentType",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].documentType", callBack: _utils2.checkValueForNA }),
          ownerDocumentId: (0, _index.getLabelIfNotNull)({
            labelName: "Document ID",
            labelKey: "PT_OWNERSHIP_DOCUMENT_ID"
          }, {
            jsonPath: "Property.ownersTemp[0].documentUid",
            callBack: _utils2.checkValueForNA
          }, {
            labelKey: "PTM_OLD_LABEL_NAME"
          }, { jsonPath: "PropertyOld.ownersTemp[0].documentUid", callBack: _utils2.checkValueForNA })

        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "Property.ownersTemp",
      prefixSourceJsonPath: "children.cardContent.children.ownerContainer.children",
      afterPrefixJsonPath: "children.value.children.key"

    },
    type: "array"
  },
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var categoryDocumentIDJsonPath = "components.div.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerDocumentId.props.style";

    var categoryDocumentTypeJsonPath = "components.div.children.body.children.cardContent.children.transfereeSummary.children.cardContent.children.cardOne.props.scheama.children.cardContent.children.ownerContainer.children.ownerSpecialDocumentType.props.style";

    // if(categoryType === "NONE"){

    //    dispatch(handleField("search-preview", categoryDocumentIDJsonPath, "display","none"));
    //    dispatch(handleField("search-preview", categoryDocumentTypeJsonPath, "display","none"));


    // }
  }
});

var transfereeInstitutionSummary = exports.transfereeInstitutionSummary = (0, _utils.getCommonGrayCard)({
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
        labelKey: "PT_INSTITUTION_TRANSFEREE_DETAILS_HEADER"
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
        //   buttonLabel: getLabel({
        //     labelName: "Edit",
        //     labelKey: "PT_EDIT"
        //   })
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
  body: (0, _utils.getCommonContainer)({
    institutionName: (0, _utils.getLabelWithValueForModifiedLabel)({
      labelName: "Name of Institution",
      labelKey: "PT_OWNERSHIP_INSTI_NAME"
    }, {
      jsonPath: "Property.institutionTemp.institutionName",
      callBack: _utils2.checkValueForNA
    }, {
      labelKey: "PTM_OLD_LABEL_NAME"
    }, { jsonPath: "PropertyOld.institutionTemp.institutionName", callBack: _utils2.checkValueForNA }),
    designation: (0, _utils.getLabelWithValueForModifiedLabel)({
      labelName: "Designation",
      labelKey: "PT_OWNERSHIP_INFO_DESIGNATION"
    }, {
      jsonPath: "Property.institutionTemp.designation",
      callBack: _utils2.checkValueForNA
    }, {
      labelKey: "PTM_OLD_LABEL_NAME"
    }, { jsonPath: "PropertyOld.institutionTemp.designation", callBack: _utils2.checkValueForNA }),

    institutionType: (0, _utils.getLabelWithValueForModifiedLabel)({
      labelName: "Type Of Institution",
      labelKey: "PT_OWNERSHIP_INSTI_TYPE"
    }, {
      jsonPath: "Property.institutionTemp.institutionType",
      // callBack: checkValueForNA
      callBack: function callBack(value) {
        if (!value) {
          return 'NA';
        }
        return "COMMON_MASTERS_OWNERSHIPCATEGORY_" + (0, _commons.getTransformedLocale)(value);
      }
    }, {
      labelKey: "PTM_OLD_LABEL_NAME"
    }, { jsonPath: "PropertyOld.institutionTemp.institutionName", callBack: _utils2.checkValueForNA }),
    institutionOwnershipType: (0, _utils.getLabelWithValueForModifiedLabel)({
      labelName: "Type Of Ownership",
      labelKey: "PT_INSTI_OWNERSHIP_TYPE"
    }, {
      jsonPath: "Property.ownershipCategoryTemp",
      callBack: _utils2.checkValueForNA
      // callBack: value => {
      //   return `COMMON_MASTERS_OWNERSHIPCATEGORY_${getTransformedLocale(value)}`;
      // }
    }, {
      labelKey: "PTM_OLD_LABEL_NAME"
    }, { jsonPath: "PropertyOld.ownershipCategoryTemp", callBack: _utils2.checkValueForNA }),

    authorizedPersonName: (0, _utils.getLabelWithValueForModifiedLabel)({
      labelName: "Name of Authorized Person",
      labelKey: "PT_OWNERSHIP_INFO_NAME_OF_AUTH"
    }, {
      jsonPath: "Property.institutionTemp.name",
      callBack: _utils2.checkValueForNA
    }, {
      labelKey: "PTM_OLD_LABEL_NAME"
    }, { jsonPath: "PropertyOld.institutionTemp.name", callBack: _utils2.checkValueForNA }),
    landlineNumber: (0, _utils.getLabelWithValueForModifiedLabel)({
      labelName: "Telephone No.",
      labelKey: "PT_OWNERSHIP_INFO_TEL_NO"
    }, {
      jsonPath: "Property.institutionTemp.landlineNumber",
      callBack: _utils2.checkValueForNA
    }, {
      labelKey: "PTM_OLD_LABEL_NAME"
    }, { jsonPath: "PropertyOld.institutionTemp.landlineNumber", callBack: _utils2.checkValueForNA }),

    mobileNumber: (0, _utils.getLabelWithValueForModifiedLabel)({
      labelName: "Mobile No. of Authorized Person",
      labelKey: "PT_OWNERSHIP_INFO_MOBILE_NO"
    }, {
      jsonPath: "Property.institutionTemp.mobileNumber",
      callBack: _utils2.checkValueForNA
    }, {
      labelKey: "PTM_OLD_LABEL_NAME"
    }, { jsonPath: "PropertyOld.institutionTemp.mobileNumber", callBack: _utils2.checkValueForNA }),
    alterMobileNo: (0, _utils.getLabelWithValue)({
      labelName: "Mobile No.",
      labelKey: "PT_FORM3_ALT_MOBILE_NO"
    }, {
      jsonPath: "Property.institutionTemp.alternatemobilenumber",
      callBack: _utils2.checkValueForNA
    }, {
      labelKey: "PTM_OLD_LABEL_NAME"
    }, { jsonPath: "PropertyOld.institutionTemp.alternatemobilenumber", callBack: _utils2.checkValueForNA }),
    officialAddress: (0, _utils.getLabelWithValueForModifiedLabel)({
      labelName: "Official Correspondence Address",
      labelKey: "PT_OWNERSHIP_INFO_CORR_ADDR"
    }, {
      jsonPath: "Property.institutionTemp.correspondenceAddress",
      callBack: _utils2.checkValueForNA
    }, {
      labelKey: "PTM_OLD_LABEL_NAME"
    }, { jsonPath: "PropertyOld.institutionTemp.correspondenceAddress", callBack: _utils2.checkValueForNA })
  })
});