"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.institutionSummary = exports.assessmentSummary = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propertyDetails = (0, _utils.getCommonGrayCard)({
  propertyContainer: (0, _utils.getCommonContainer)({
    usageType: (0, _utils.getLabelWithValue)({
      labelName: "Property Usage Type",
      labelKey: "PT_ASSESMENT_INFO_USAGE_TYPE"
    }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo" }),
    propertyType: (0, _utils.getLabelWithValue)({
      labelName: "Property Type",
      labelKey: "PT_ASSESMENT_INFO_TYPE_OF_BUILDING"
    }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo" }),
    landArea: (0, _utils.getLabelWithValue)({
      labelName: "Plot Size (sq yards)",
      labelKey: "PT_ASSESMENT_INFO_PLOT_SIZE"
    }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo" }),
    noOfFloors: (0, _utils.getLabelWithValue)({
      labelName: "No. of Floors",
      labelKey: "PT_ASSESMENT_INFO_NO_OF_FLOOR"
    }, { jsonPath: "FireNOCs[0].fireNOCDetails.propertyDetails.address.doorNo" })

  })
});
var assessmentSummary = exports.assessmentSummary = (0, _utils.getCommonGrayCard)({
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
        labelName: "Assessment Details",
        labelKey: "PT_ASSESMENT_INFO_SUB_HEADER"
      }))
    }
  },
  cardOne: propertyDetails,
  floorDetailHeader: {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-pt",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label: "Ground Floor",
      style: { marginBottom: "1px" }
    }, children: {
      header: (0, _extends3.default)({
        gridDefination: {
          xs: 8
        }
      }, (0, _utils.getCommonSubHeader)({
        labelName: "Ground Floor",
        labelKey: "PROPERTYTAX_FLOOR_0"
      }))
    },
    type: "array"
  },
  cardTwo: {
    uiFramework: "custom-containers",
    componentPath: "MultiItem",
    props: {
      className: "applicant-summary",
      scheama: (0, _utils.getCommonCard)({
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
              labelName: "Unit-1",
              labelKey: "Unit-1"
            }))

          }
        },
        body: (0, _utils.getCommonContainer)({
          usageCategoryMajor: (0, _utils.getLabelWithValue)({
            labelName: "Unit Usage Type",
            labelKey: "PT_ASSESSMENT_UNIT_USAGE_TYPE"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].gender"
          }),
          occupancyType: (0, _utils.getLabelWithValue)({
            labelName: "Occupancy",
            labelKey: "PT_ASSESMENT_INFO_OCCUPLANCY"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].fatherOrHusbandName"
          }),
          unitArea: (0, _utils.getLabelWithValue)({
            labelName: "Built-up area (sq ft)",
            labelKey: "PT_FORM2_BUILT_AREA"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].dob",
            callBack: function callBack(value) {
              return (0, _utils.convertEpochToDate)(value);
            }
          }),
          annualRent: (0, _utils.getLabelWithValue)({
            labelName: "Total Annual Rent (INR)",
            labelKey: "PT_FORM2_TOTAL_ANNUAL_RENT"
          }, {
            jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId"
          })

        })
      }),
      items: [],
      hasAddItem: false,
      isReviewPage: true,
      sourceJsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners",
      prefixSourceJsonPath: "children.cardContent.children.applicantContainer.children",
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
        labelName: "Owner Details",
        labelKey: "PT_OWNERSHIP_INFO_SUB_HEADER"
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
            labelKey: "PT_EDIT"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _index.gotoApplyWithStep)(state, dispatch, 2);
          }
        }
      }
    }
  },
  body: (0, _utils.getCommonContainer)({
    institutionType: (0, _utils.getLabelWithValue)({
      labelName: "Institution Type",
      labelKey: "PT_INSTITUTION_Type"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.ownerShipType",
      callBack: function callBack(value) {
        return "COMMON_MASTERS_OWNERSHIPCATEGORY_" + (0, _commons.getTransformedLocale)(value);
      }
    }),
    institutionName: (0, _utils.getLabelWithValue)({
      labelName: "Name of Institution",
      labelKey: "NOC_NAME_OF_INSTITUTION_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionName"
    }),
    telephoneNumber: (0, _utils.getLabelWithValue)({
      labelName: "Official Telephone No.",
      labelKey: "NOC_OFFICIAL_TELEPHONE_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.telephoneNumber"
    }),
    authorizedPersonName: (0, _utils.getLabelWithValue)({
      labelName: "Name of Authorized Person",
      labelKey: "NOC_AUTHORIZED_PERSON_NAME_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].name"
    }),
    designation: (0, _utils.getLabelWithValue)({
      labelName: "Designation in Institution",
      labelKey: "NOC_DESIGNATION_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.additionalDetail.institutionDesignation"
    }),
    mobileNumber: (0, _utils.getLabelWithValue)({
      labelName: "Mobile No. of Authorized Person",
      labelKey: "NOC_AUTHORIZED_PERSON_MOBILE_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].mobileNumber"
    }),
    authorizedEmail: (0, _utils.getLabelWithValue)({
      labelName: "Email of Authorized Person",
      labelKey: "NOC_AUTHORIZED_PERSON_EMAIL_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].emailId"
    }),
    officialAddress: (0, _utils.getLabelWithValue)({
      labelName: "Official Correspondence Address",
      labelKey: "NOC_OFFICIAL_CORRESPONDENCE_ADDRESS_LABEL"
    }, {
      jsonPath: "FireNOCs[0].fireNOCDetails.applicantDetails.owners[0].correspondenceAddress"
    })
  })
});