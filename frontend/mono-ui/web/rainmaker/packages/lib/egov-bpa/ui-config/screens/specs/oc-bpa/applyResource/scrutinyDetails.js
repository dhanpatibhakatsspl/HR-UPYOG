"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.abstractProposedBuildingDetails = exports.proposedBuildingDetails = exports.buildingPlanScrutinyDetails = exports.basicDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.css");

var _utils2 = require("../../utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var basicDetails = exports.basicDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Basic Details",
    labelKey: "BPA_BASIC_DETAILS_TITLE"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  basicDetailsContainer: (0, _utils.getCommonContainer)({
    ocScrutinynumber: (0, _utils.getTextField)({
      label: {
        labelName: "Occupancy Certificate Scrutiny Number",
        labelKey: "BPA_OC_SCRUTINY_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Occupancy Certificate Scrutiny Number",
        labelKey: "BPA_OC_SCRUTINY_NUMBER_PLACEHOLDER"
      },
      required: true,
      title: {
        value: "Please search scrutiny details linked to the scrutiny number",
        key: "BPA_BASIC_DETAILS_SCRUTINY_NUMBER_SEARCH_TITLE"
      },
      infoIcon: "info_circle",
      pattern: "^[a-zA-Z0-9]*$",
      errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
      jsonPath: "BPA.edcrNumber",
      iconObj: {
        iconName: "search",
        position: "end",
        color: "#FE7A51",
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch, fieldInfo) {
            (0, _utils2.getOcEdcrDetails)(state, dispatch, fieldInfo);
          }
        }
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    dummyDiv2: {
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
    applicationType: (0, _utils.getSelectField)({
      label: {
        labelName: "Application Type",
        labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL"
      },
      props: {
        disabled: true,
        className: "tl-trade-type"
      },
      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
      },
      required: true,
      jsonPath: "BPA.applicationType",
      sourceJsonPath: "applyScreenMdmsData.BPA.ApplicationType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    // riskType: getTextField({
    //   label: {
    //     labelName: "Risk Type",
    //     labelKey: "BPA_BASIC_DETAILS_RISK_TYPE_LABEL"
    //   },
    //   localePrefix: {
    //     moduleName: "WF",
    //     masterName: "BPA"
    //   },
    //   jsonPath: "BPA.riskType",
    //   required: true,
    //   gridDefination: {
    //     xs: 12,
    //     sm: 12,
    //     md: 6
    //   },
    //   props: {
    //     disabled: true,
    //     className: "tl-trade-type"
    //   }
    // }),
    riskType: (0, _utils.getSelectField)({
      label: {
        labelName: "Risk Type",
        labelKey: "BPA_BASIC_DETAILS_RISK_TYPE_LABEL"
      },
      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
      },
      props: {
        disabled: true,
        className: "tl-trade-type",
        optionValue: "code",
        optionLabel: "code"
      },
      jsonPath: "BPA.riskType",
      data: [{
        code: "LOW",
        label: "WF_BPA_LOW"
      }, {
        code: "MEDIUM",
        label: "WF_BPA_MEDIUM"
      }, {
        code: "HIGH",
        label: "WF_BPA_HIGH"
      }],
      required: true,
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    servicetype: (0, _utils.getSelectField)({
      label: {
        labelName: "Service type",
        labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_LABEL"
      },
      placeholder: {
        labelName: "Select service type",
        labelKey: "BPA_BASIC_DETAILS_SERVICE_TYPE_PLACEHOLDER"
      },
      props: {
        disabled: true,
        className: "tl-trade-type"
      },
      localePrefix: {
        moduleName: "WF",
        masterName: "BPA"
      },
      required: true,
      jsonPath: "BPA.serviceType",
      sourceJsonPath: "applyScreenMdmsData.BPA.ServiceType",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    applicationdate: (0, _utils.getDateField)({
      label: {
        labelName: "Application Date",
        labelKey: "BPA_BASIC_DETAILS_APP_DATE_LABEL"
      },
      jsonPath: "BPAs.appdate",
      props: {
        disabled: true,
        className: "tl-trade-type"
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
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
      jsonPath: "BPA.applicantName"
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
      jsonPath: "BPA.appliedBy"
    }),
    remarks: (0, _utils.getTextField)({
      label: {
        labelName: "Remarks",
        labelKey: "BPA_BASIC_DETAILS_REMARKS_LABEL"
      },
      placeholder: {
        labelName: "Enter Remarks Here",
        labelKey: "BPA_BASIC_DETAILS_REMARKS_PLACEHOLDER"
      },
      jsonPath: "BPA.additionalDetails.remarks",
      props: {
        multiline: true,
        rows: "4"
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    }),
    buildingPermitNum: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "downloadFile",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      },
      props: {
        label: {
          labelName: "Building Permit Number",
          labelKey: "EDCR_BUILDING_PERMIT_NUM_LABEL"
        },
        linkDetail: {
          labelName: "",
          labelKey: ""
        },
        jsonPath: "BPA.permitNumberLink"
      },
      type: "array"
    }
  })
});

var buildingPlanScrutinyDetails = exports.buildingPlanScrutinyDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Occupancy certificate scrutiny details",
    labelKey: "BPA_OC_CER_SCRUNITY_DETAILS_TITLE"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  buildingPlanScrutinyDetailsContainer: (0, _utils.getCommonContainer)({
    buildingplanscrutinyapplicationnumber: (0, _utils.getLabelWithValue)({
      labelName: "eDCR Number",
      labelKey: "BPA_EDCR_NO_LABEL"
    }, {
      jsonPath: "ocScrutinyDetails.edcrNumber"
    }),

    uploadedfile: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "downloadFile",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 3
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
        jsonPath: "ocScrutinyDetails.updatedDxfFile"
      },
      type: "array"
    },
    scrutinyreport: {
      uiFramework: "custom-atoms-local",
      moduleName: "egov-bpa",
      componentPath: "downloadFile",
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 3
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
        jsonPath: "ocScrutinyDetails.planReport"
      },
      type: "array"
    }
  })
});

var proposedBuildingDetails = exports.proposedBuildingDetails = (0, _utils.getCommonCard)({
  headertitle: (0, _utils.getCommonTitle)({
    labelName: "Block wise occupancy /sub occupancy and usage details",
    labelKey: "BPA_APPLICATION_BLOCK_WISE_OCCUPANCY_SUB_OCCUPANCY_USAGE_TITLE"
  }, {
    style: {
      marginBottom: 10
    }
  }),
  buildingheaderDetails: (0, _utils.getCommonContainer)({
    header: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: {
          fontSize: "18px",
          paddingLeft: "10px",
          paddingTop: "14px"
        }
      },
      children: {
        proposedLabel: (0, _utils.getLabel)({
          labelName: "Actual Building details",
          labelKey: "BPA_ACTUAL_BUILDING_DETAILS_LABEL"
        })
      },
      gridDefination: {
        xs: 12,
        sm: 12,
        md: 6
      }
    },
    occupancyTypeLabel: (0, _utils.getLabelWithValue)({
      labelName: "Occupancy Type",
      labelKey: "BPA_OCCUPANCY_TYPE"
    }, {
      localePrefix: {
        moduleName: "BPA",
        masterName: "OCCUPANCYTYPE"
      },
      jsonPath: "scrutinyDetails.planDetail.occupancies[0].typeHelper.type.code"
    })
  }),
  proposedContainer: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    visible: true,
    props: {
      className: "mymuicontainer"
    },
    children: {
      component: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
          hasAddItem: false,
          scheama: (0, _utils.getCommonContainer)({
            buildingDetailsContainer: (0, _utils.getCommonContainer)({

              header: (0, _utils.getLabel)("Block", "", {
                jsonPath: "edcr.blockDetail[0].titleData",
                style: {
                  width: "50%",
                  marginTop: "5px"
                }
              }),
              subOccupancyTypeLabel: (0, _utils.getLabelWithValue)({
                labelName: "Sub Occupancy Type",
                labelKey: "BPA_SUB_OCCUP_TYPE_LABEL"
              }, {
                jsonPath: "edcr.blockDetail[0]",
                callBack: function callBack(value) {
                  var returnVAlue = void 0;
                  if (value && value.occupancyType && value.occupancyType.length) {
                    returnVAlue = "";
                    var occupancy = value.occupancyType;
                    for (var tp = 0; tp < occupancy.length; tp++) {
                      if (tp === occupancy.length - 1) {
                        returnVAlue += (0, _commons.getLocaleLabels)((0, _commons.getTransformedLocale)("BPA_SUBOCCUPANCYTYPE_" + occupancy[tp].value), (0, _commons.getTransformedLocale)("BPA_SUBOCCUPANCYTYPE_" + occupancy[tp].value)); //occupancy[tp].label;
                      } else {
                        returnVAlue += (0, _commons.getLocaleLabels)((0, _commons.getTransformedLocale)("BPA_SUBOCCUPANCYTYPE_" + occupancy[tp].value), (0, _commons.getTransformedLocale)("BPA_SUBOCCUPANCYTYPE_" + occupancy[tp].value)) + ","; //occupancy[tp].label + ",";
                      }
                    }
                  }
                  return returnVAlue || "NA";
                }
              }),
              proposedBuildingDetailsContainer: {
                uiFramework: "custom-molecules-local",
                moduleName: "egov-bpa",
                componentPath: "Table",
                props: {
                  className: "mymuitable",
                  jsonPath: "edcr.blockDetail[0].blocks",
                  style: { marginBottom: 20 },
                  columns: [{ key: "Floor Description", name: "BPA_COMMON_TABLE_COL_FLOOR_DES" }, { key: "Level", name: "BPA_COMMON_TABLE_COL_FLOOR_LEVEL" }, { key: "Occupancy/Sub Occupancy", name: "BPA_COMMON_TABLE_COL_OCCUP" }, { key: "Buildup Area", name: "BPA_COMMON_TABLE_COL_BUILD_AREA" }, { key: "Floor Area", name: "BPA_COMMON_TABLE_COL_FLOOR_AREA" }, { key: "Carpet Area", name: "BPA_COMMON_TABLE_COL_CARPET_AREA" }],
                  title: "",
                  options: {
                    filterType: "dropdown",
                    responsive: "stacked",
                    selectableRows: false,
                    pagination: false,
                    selectableRowsHeader: false,
                    sortFilterList: false,
                    sort: false,
                    filter: false,
                    search: false,
                    print: false,
                    download: false,
                    viewColumns: false,
                    rowHover: false
                  }
                }
              }
            })
          }),
          items: [],
          isReviewPage: true,
          prefixSourceJsonPath: "children.buildingDetailsContainer.children",
          sourceJsonPath: "edcr.blockDetail"
        },
        type: "array"
      },
      breakP: (0, _utils.getBreak)(),
      breakq: (0, _utils.getBreak)()
    }
  }
});

var abstractProposedBuildingDetails = exports.abstractProposedBuildingDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Actual building abstract",
    labelKey: "BPA_ACTUAL_BUILDING_ABSTRACT_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  proposedContainer: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    visible: true,
    children: {
      breakPending: (0, _utils.getBreak)(),
      totalBuildUpAreaDetailsContainer: (0, _utils.getCommonContainer)({
        totalBuildupArea: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "Total Buildup Area (sq.mtrs)",
            labelKey: "BPA_APPLICATION_TOTAL_BUILDUP_AREA"
          },
          jsonPath: "ocScrutinyDetails.planDetail.virtualBuilding.totalBuitUpArea",
          props: {
            disabled: 'true',
            className: "tl-trade-type"
          },
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          }
        })),
        numOfFloors: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "Total Floor Area",
            labelKey: "BPA_APPLICATION_NO_OF_FLOORS"
          },
          jsonPath: "ocScrutinyDetails.planDetail.blocks[0].building.totalFloors",
          props: {
            disabled: 'true',
            className: "tl-trade-type"
          },
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          }
        })),
        highFromGroundLevel: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "Total Carpet Area",
            labelKey: "BPA_APPLICATION_HIGH_FROM_GROUND"
          },
          jsonPath: "ocScrutinyDetails.planDetail.blocks[0].building.buildingHeight",
          props: {
            disabled: 'true',
            className: "tl-trade-type"
          },
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          }
        }))
      })

    }
  }
});