"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ocScrutinyDetailsContainer = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _documentList = require("./documentList");

var _functions = require("./functions");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _utils2 = require("../utils");

var _apply = require("./apply");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "Occupancy Certificate eDCR Scrutiny",
  labelKey: "BPA_OC_SCRUTINY_TITLE"
});

var ocScrutinyDetailsContainer = exports.ocScrutinyDetailsContainer = (0, _utils.getCommonGrayCard)({

  // buildingplanscrutinyapplicationnumber: getLabelWithValue(
  //   {
  //     labelName: "eDCR Number",
  //     labelKey: "BPA_EDCR_NO_LABEL"
  //   },
  //   {
  //     jsonPath: "scrutinyDetails.edcrNumber"
  //   }
  // ),
  gridDefination: {
    xs: 12,
    sm: 12,
    md: 12
  },
  scrutinyDetailsCard: (0, _utils.getCommonContainer)({
    eDCRNumber: (0, _utils.getTextField)({
      label: {
        labelName: "eDCR Number",
        labelKey: "BPA_EDCR_NO_LABEL"
      },
      gridDefination: {
        xs: 12,
        sm: 4,
        md: 4
      },
      props: {
        disabled: true,
        className: "tl-trade-type"
      },
      jsonPath: "bpaDetails.edcrNumber"
    }),
    uploadedfile: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "downloadFile",
      gridDefination: {
        xs: 12,
        sm: 4,
        md: 4
      },
      props: {
        label: {
          labelName: "Uploaded Diagram",
          labelKey: "BPA_BASIC_DETAILS_UPLOADED_DIAGRAM"
        },
        linkDetail: {
          labelName: "uploadedDiagram.dxf",
          labelKey: "BPA_BASIC_DETAILS_UPLOADED_DIAGRAM_DXF"
        },
        jsonPath: "scrutinyDetails.updatedDxfFile"
      },
      type: "array"
    },
    scrutinyreport: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "downloadFile",
      gridDefination: {
        xs: 12,
        sm: 4,
        md: 4
      },
      props: {
        label: {
          labelName: "Scrutiny Report",
          labelKey: "BPA_BASIC_DETAILS_SCRUTINY_REPORT"
        },
        linkDetail: {
          labelName: "ScrutinyReport.pdf",
          labelKey: "BPA_BASIC_DETAILS_SCRUTINY_REPORT_PDF"
        },
        jsonPath: "scrutinyDetails.planReport"
      },
      type: "array"
    }
  })
});

var buildingInfoCard = (0, _utils.getCommonCard)({
  buildingPlanCardContainer: (0, _utils.getCommonContainer)({
    dropdown: _apply.dropdown,
    dummyDiv1: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      visible: true,
      props: {
        disabled: true
      }
    },
    buildingPermitDate: (0, _utils.getDateField)({
      label: {
        labelName: "Building Permit Date",
        labelKey: "EDCR_BUILDING_PERMIT_DATE_LABEL"
      },
      jsonPath: "Scrutiny[0].permitDate",
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      props: {
        required: true,
        inputProps: {
          max: (0, _utils2.getTodaysDateInYMD)()
        }
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    buildingPermitNum: (0, _utils.getTextField)({
      label: {
        labelName: "Building Permit Number",
        labelKey: "EDCR_BUILDING_PERMIT_NUM_LABEL"
      },
      placeholder: {
        labelName: "Enter Building Permit Number",
        labelKey: "EDCR_BUILDING_PERMIT_NUM_PLACEHOLDER"
      },
      required: true,
      title: {
        value: "Please search scrutiny details linked to the scrutiny number",
        key: "BPA_BASIC_DETAILS_SCRUTINY_NUMBER_SEARCH_TITLE"
      },
      infoIcon: "info_circle",
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "Scrutiny[0].permitNumber",
      props: {
        required: true
      },
      iconObj: {
        iconName: "search",
        position: "end",
        color: "#FE7A51",
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch, fieldInfo) {
            (0, _functions.getBuildingDetails)(state, dispatch, fieldInfo);
          }
        }
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    inputdetails: (0, _utils.getCommonContainer)({
      applicantName: (0, _utils.getTextField)({
        label: {
          labelName: "Applicant Name",
          labelKey: "EDCR_SCRUTINY_NAME_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          disabled: true,
          className: "tl-trade-type"
        },
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "Scrutiny[0].applicantName"
      }),
      servicetype: (0, _extends3.default)({}, (0, _utils.getSelectField)({
        label: {
          labelName: "Service type",
          labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL"
        },
        localePrefix: {
          moduleName: "WF",
          masterName: "BPA"
        },
        props: {
          disabled: true,
          className: "tl-trade-type"
        },
        jsonPath: "bpaDetails.serviceType",
        sourceJsonPath: "applyScreenMdmsData.BPA.ServiceType",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      })),
      buildUpArea: (0, _utils.getTextField)({
        label: {
          labelName: "Total Build Up Area",
          labelKey: "EDCR_TOTAL_BUILD_UP_AREA_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          disabled: true,
          className: "tl-trade-type"
        },
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "scrutinyDetails.planDetail.virtualBuilding.totalBuitUpArea"
      }),
      buildingHeight: (0, _utils.getTextField)({
        label: {
          labelName: "Building Height",
          labelKey: "EDCR_BUILDING_HEIGHT_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          disabled: true,
          className: "tl-trade-type"
        },
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "scrutinyDetails.planDetail.blocks[0].building.buildingHeight"
      }),
      stakeHolderName: (0, _utils.getTextField)({
        label: {
          labelName: "Stake Holder Name",
          labelKey: "EDCR_SH_NAME_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        },
        props: {
          disabled: true,
          className: "tl-trade-type"
        },
        pattern: (0, _utils.getPattern)("Name"),
        jsonPath: "bpaDetails.appliedBy"
      })
    }),
    ocScrutinyDetailsContainer: ocScrutinyDetailsContainer,
    dummyDiv2: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 12
      },
      visible: false,
      props: {
        disabled: true
      },
      children: {
        documentList: _documentList.documentList
      }
    },
    dummyDiv3: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      visible: true,
      props: {
        disabled: true
      }
    },
    buttonContainer: (0, _utils.getCommonContainer)({
      firstCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 3
        }
      },
      resetButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3
        },
        props: {
          variant: "outlined",
          style: {
            color: "#FE7A51",
            border: "#FE7A51 solid 1px",
            borderRadius: "2px",
            width: window.innerWidth > 480 ? "80%" : "100%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "CLEAR FORM",
            labelKey: "BPA_SCRUTINY_CLEARFORM_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: _functions.resetOCFields
        }
      },

      searchButton: {
        componentPath: "Button",
        gridDefination: {
          xs: 12,
          sm: 3
        },
        props: {
          variant: "contained",
          style: {
            color: "white",
            backgroundColor: "#FE7A51",
            borderRadius: "2px",
            width: window.innerWidth > 480 ? "80%" : "100%",
            height: "48px"
          }
        },
        children: {
          buttonLabel: (0, _utils.getLabel)({
            labelName: "SUBMIT",
            labelKey: "EDCR_SCRUTINY_SUBMIT_BUTTON"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _functions.submitFields)(state, dispatch);
          }
        }
      },

      lastCont: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 12,
          sm: 3
        }
      }
    })
  })
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "ocapply",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.buildingPermitDate", "props.value", null));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.buildingPermitNum", "props.value", null));
    dispatch((0, _actions.handleScreenConfigurationFieldChange)("ocapply", "components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.dropdown", "props.value", null));
    (0, _set2.default)(state, "screenConfiguration.moduleName", "ocScrutiny");
    (0, _functions.fetchMDMSOCData)(action, state, dispatch);
    (0, _set2.default)(action, "screenConfig.components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.inputdetails.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.buttonContainer.visible", false);
    (0, _set2.default)(action, "screenConfig.components.div.children.buildingInfoCard.children.cardContent.children.buildingPlanCardContainer.children.ocScrutinyDetailsContainer.visible", false);
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",

          children: {
            header: (0, _extends3.default)({
              gridDefination: {
                xs: 12,
                sm: 6
              }
            }, header)
          }
        },
        buildingInfoCard: buildingInfoCard
      }
    }
  }
};
exports.default = screenConfig;