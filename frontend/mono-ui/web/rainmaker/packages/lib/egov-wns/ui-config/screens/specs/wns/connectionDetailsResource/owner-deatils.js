"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connHolderDetailsSameAsOwnerSummary = exports.connectionHolderSameAsOwnerDetails = exports.connHolderDetailsSummary = exports.connectionHolderDetails = exports.getOwnerDetails = exports.correspondenceAddress = exports.email = exports.ownerCategory = exports.guardianName = exports.guardian = exports.gender = exports.ownerMobileNumber = exports.ownerName = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _footer = require("../viewBillResource/footer");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-wns",
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

var ownerName = exports.ownerName = (0, _utils.getLabelWithValue)({
  labelName: "Name",
  labelKey: "WS_OWN_DETAIL_OWN_NAME_LABEL"
}, { jsonPath: "WaterConnection[0].property.owners[0].name" });
var ownerMobileNumber = exports.ownerMobileNumber = (0, _utils.getLabelWithValue)({
  labelName: "Mobile Number",
  labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
}, {
  jsonPath: "WaterConnection[0].property.owners[0].mobileNumber"
});
var gender = exports.gender = (0, _utils.getLabelWithValue)({
  labelName: "Gender",
  labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
}, {
  jsonPath: "WaterConnection[0].property.owners[0].gender"
});
var guardian = exports.guardian = (0, _utils.getLabelWithValue)({
  labelName: "Guardian",
  labelKey: "WS_OWN_DETAIL_GUARDIAN_LABEL"
}, { jsonPath: "WaterConnection[0].property.owners[0].relationship" });
var guardianName = exports.guardianName = (0, _utils.getLabelWithValue)({
  labelName: "Guardian Name",
  labelKey: "WS_OWN_DETAIL_GUARDIAN_NAME_LABEL"
}, {
  jsonPath: "WaterConnection[0].property.owners[0].fatherOrHusbandName"
});
var ownerCategory = exports.ownerCategory = (0, _utils.getLabelWithValue)({
  labelName: "Owner Category",
  labelKey: "WS_OWN_DETAIL_CATEGORY_LABEL"
}, {
  jsonPath: "WaterConnection[0].property.ownershipCategory",
  localePrefix: {
    moduleName: "WS",
    masterName: "OWNERSHIPCATEGORY"
  }
});
var email = exports.email = (0, _utils.getLabelWithValue)({
  labelName: "Email",
  labelKey: "WS_OWNER_DETAILS_EMAIL_LABEL"
}, {
  jsonPath: "WaterConnection[0].property.owners[0].emailId"
});
var correspondenceAddress = exports.correspondenceAddress = (0, _utils.getLabelWithValue)({
  labelName: "Correspondence Address",
  labelKey: "WS_OWN_DETAIL_CROSADD"
}, { jsonPath: "WaterConnection[0].property.owners[0].correspondenceAddress" });

var getOwnerDetails = exports.getOwnerDetails = function getOwnerDetails() {
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
          labelKey: "WS_COMMON_OWN_DETAIL"
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
              (0, _footer.changeStep)(state, dispatch, "", 0);
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
          viewFive: (0, _utils.getCommonContainer)({
            ownerMobileNumber: ownerMobileNumber,
            ownerName: ownerName,
            gender: gender,
            guardian: guardian,
            guardianName: guardianName,
            ownerCategory: ownerCategory,
            email: email,
            correspondenceAddress: correspondenceAddress
          })
        }),
        items: [],
        hasAddItem: false,
        sourceJsonPath: "WaterConnection[0].property.owners",
        prefixSourceJsonPath: "children.cardContent.children.viewFive.children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
  });
};

var holderHeader = getHeader({
  labelKey: "WS_COMMON_CONNECTION_HOLDER_DETAILS_HEADER",
  labelName: "Connection Holder Details"
});

var connectionHolderDetails = exports.connectionHolderDetails = {
  mobileNumber: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_MOBILE_NO_LABEL"
  }, { jsonPath: "WaterConnection[0].connectionHolders[0].mobileNumber", callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "applyScreenOld.connectionHolders[0].mobileNumber", callBack: _utils2.handleNA }),
  name: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Name",
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_OWN_NAME_LABEL"
  }, { jsonPath: "WaterConnection[0].connectionHolders[0].name", callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "applyScreenOld.connectionHolders[0].name", callBack: _utils2.handleNA }),
  gender: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_GENDER_LABEL"
  }, {
    jsonPath: "WaterConnection[0].connectionHolders[0].gender",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "COMMON",
      masterName: "GENDER"
    }
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "applyScreenOld.connectionHolders[0].gender",
    callBack: _utils2.handleNA,
    localePrefix: {
      moduleName: "COMMON",
      masterName: "GENDER"
    }
  }),
  fatherName: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelKey: "WS_CONN_HOLDER_COMMON_FATHER_OR_HUSBAND_NAME"
  }, { jsonPath: "WaterConnection[0].connectionHolders[0].fatherOrHusbandName", callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "applyScreenOld.connectionHolders[0].fatherOrHusbandName", callBack: _utils2.handleNA }),
  relationship: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_RELATION_LABEL"
  }, { jsonPath: "WaterConnection[0].connectionHolders[0].relationship", callBack: _utils2.handleNA }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, { jsonPath: "applyScreenOld.connectionHolders[0].relationship", callBack: _utils2.handleNA }),
  correspondenceAddress: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_CROSADD"
  }, {
    jsonPath: "WaterConnection[0].connectionHolders[0].correspondenceAddress",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "applyScreenOld.connectionHolders[0].correspondenceAddress",
    callBack: _utils2.handleNA
  }),
  specialApplicantCategory: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelKey: "WS_CONN_HOLDER_OWN_DETAIL_SPECIAL_APPLICANT_LABEL"
  }, {
    jsonPath: "WaterConnection[0].connectionHolders[0].ownerType",
    callBack: _utils2.handleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "applyScreenOld.connectionHolders[0].ownerType",
    callBack: _utils2.handleNA
  })
};

var connHolderDetailsSummary = exports.connHolderDetailsSummary = function connHolderDetailsSummary() {
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
          labelKey: "WS_COMMON_CONNECTION_HOLDER_DETAILS_HEADER",
          labelName: "Connection Holder Details"
        }))
      }
    },
    connHoldDetail: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        scheama: (0, _utils.getCommonGrayCard)({
          viewFive: (0, _utils.getCommonContainer)(connectionHolderDetails)
        }),
        items: [],
        hasAddItem: false,
        sourceJsonPath: "WaterConnection[0].connectionHolders",
        prefixSourceJsonPath: "children.cardContent.children.connHoldDetail.children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
  });
};

var connectionHolderSameAsOwnerDetails = exports.connectionHolderSameAsOwnerDetails = {
  sameAsOwnerDetails: (0, _utils.getLabelWithValue)({
    labelKey: "WS_CONN_HOLDER_SAME_AS_OWNER_DETAILS"
  }, { jsonPath: "WaterConnection[0].sameAsPropertyAddress" })
};

var connHolderDetailsSameAsOwnerSummary = exports.connHolderDetailsSameAsOwnerSummary = function connHolderDetailsSameAsOwnerSummary() {
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
          labelKey: "WS_COMMON_CONNECTION_HOLDER_DETAILS_HEADER",
          labelName: "Connection Holder Details"
        }))
      }
    },
    connHoldDetail: {
      uiFramework: "custom-containers",
      componentPath: "MultiItem",
      props: {
        scheama: (0, _utils.getCommonGrayCard)({
          sameAsOwnerDetails: (0, _utils.getCommonContainer)(connectionHolderSameAsOwnerDetails)
        }),
        items: [],
        hasAddItem: false,
        sourceJsonPath: "WaterConnection[0].sameAsPropertyAddress",
        prefixSourceJsonPath: "children.cardContent.children.sameAsOwnerDetails.children",
        afterPrefixJsonPath: "children.value.children.key"
      },
      type: "array"
    }
  });
};