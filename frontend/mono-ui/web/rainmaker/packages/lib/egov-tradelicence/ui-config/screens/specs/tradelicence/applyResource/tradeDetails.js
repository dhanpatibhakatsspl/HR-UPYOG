"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tradeDetails = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _filter = require("lodash/filter");

var _filter2 = _interopRequireDefault(_filter);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tradeCategoryChange = function tradeCategoryChange(reqObj) {
  try {
    var dispatch = reqObj.dispatch,
        index = reqObj.index;

    dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.tradeUnits[" + index + "].tradeType", ''));
  } catch (e) {
    console.log(e);
  }
};

var tradeTypeChange = function tradeTypeChange(reqObj) {
  try {
    var dispatch = reqObj.dispatch,
        index = reqObj.index;

    dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.tradeUnits[" + index + "].tradeType", ''));
  } catch (e) {
    console.log(e);
  }
};

var tradeSubTypeChange = function tradeSubTypeChange(reqObj) {
  try {
    var moduleName = reqObj.moduleName,
        rootBlockSub = reqObj.rootBlockSub,
        keyValue = reqObj.keyValue,
        value = reqObj.value,
        state = reqObj.state,
        dispatch = reqObj.dispatch,
        index = reqObj.index;

    var keyValueRow = keyValue.replace("." + value, "");
    var tradeSubTypes = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "DynamicMdms." + moduleName + "." + rootBlockSub + "." + rootBlockSub + keyValueRow, []);
    var currentObject = (0, _filter2.default)(tradeSubTypes, {
      code: value
    });
    if (currentObject[0] && currentObject[0].uom !== null) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[" + index + "].item" + index + ".children.cardContent.children.tradeUnitCardContainer.children.tradeUOM", "props.value", currentObject[0].uom));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[" + index + "].item" + index + ".children.cardContent.children.tradeUnitCardContainer.children.tradeUOMValue", "props.required", true));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[" + index + "].item" + index + ".children.cardContent.children.tradeUnitCardContainer.children.tradeUOMValue", "props.disabled", false));
    } else {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[" + index + "].item" + index + ".children.cardContent.children.tradeUnitCardContainer.children.tradeUOMValue", "props.required", false));

      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[" + index + "].item" + index + ".children.cardContent.children.tradeUnitCardContainer.children.tradeUOMValue", "props.disabled", true));

      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[" + index + "].item" + index + ".children.cardContent.children.tradeUnitCardContainer.children.tradeUOM", "props.value", ""));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[" + index + "].item" + index + ".children.cardContent.children.tradeUnitCardContainer.children.tradeUOMValue", "props.value", ""));

      dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.tradeUnits[" + index + "].uom", null));
      dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.tradeUnits[" + index + "].uomValue", null));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeUnitCard.props.items[" + index + "].item" + index + ".children.cardContent.children.tradeUnitCardContainer.children.tradeUOMValue", "props.error", false));
    }
    dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.tradeUnits[" + index + "].tradeType", value));
  } catch (e) {
    console.log(e);
  }
};
var structureSubTypeChange = function structureSubTypeChange(reqObj) {
  try {
    var keyValue = reqObj.keyValue,
        value = reqObj.value,
        dispatch = reqObj.dispatch;

    var keyValueRow = keyValue.replace("." + value, "");
    dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.structureType", value));
    dispatch((0, _actions.prepareFinalObject)("LicensesTemp[0].tradeLicenseDetail.structureType", keyValueRow));
  } catch (e) {
    console.log(e);
  }
};

var tradeUnitCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {

    scheama: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "Trade Unit  ",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_UNIT_HEADER"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      tradeUnitCardContainer: (0, _utils.getCommonContainer)({
        dynamicMdms: {
          uiFramework: "custom-containers",
          componentPath: "DynamicMdmsContainer",
          props: {
            dropdownFields: [{
              key: 'tradeCategory',
              fieldType: "autosuggest",
              className: "applicant-details-error autocomplete-dropdown",
              callBack: tradeCategoryChange,
              isRequired: false,
              requiredValue: true
            }, {
              key: 'tradeType',
              fieldType: "autosuggest",
              className: "applicant-details-error autocomplete-dropdown",
              callBack: tradeTypeChange,
              isRequired: false,
              requiredValue: true
            }, {
              key: 'tradeSubType',
              callBack: tradeSubTypeChange,
              className: "applicant-details-error autocomplete-dropdown",
              fieldType: "autosuggest",
              isRequired: false,
              requiredValue: true
            }],
            moduleName: "TradeLicense",
            masterName: "TradeType",
            rootBlockSub: 'tradeUnits',
            filter: "[?(@.type=='TL')]",
            callBackEdit: _utils2.updateMdmsDropDowns,
            isDependency: "DynamicMdms.common-masters.structureTypes.selectedValues[0].structureSubType"
          }
        },
        tradeUOM: (0, _utils.getTextField)({
          label: {
            labelName: "UOM (Unit of Measurement)",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
          },
          placeholder: {
            labelName: "UOM",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
          },
          // required: true,
          props: {
            disabled: true
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uom",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        }),
        tradeUOMValue: (0, _utils.getTextField)({
          label: {
            labelName: "UOM Value",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
          },
          placeholder: {
            labelName: "Enter UOM Value",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_PLACEHOLDER"
          },
          required: true,
          props: {
            disabled: true,
            setDataInField: true,
            jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uomValue"
          },
          pattern: (0, _utils.getPattern)("UOMValue"),
          jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].uomValue",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        })
      }, {
        style: {
          overflow: "visible"
        }
      })
    }),
    items: [],
    addItemLabel: {
      labelName: "ADD TRADE UNITS",
      labelKey: "TL_ADD_TRADE_UNITS"
    },
    headerName: "TradeUnits",
    headerJsonPath: "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits",
    prefixSourceJsonPath: "children.cardContent.children.tradeUnitCardContainer.children",
    onMultiItemAdd: function onMultiItemAdd(state, muliItemContent) {
      return setFieldsOnAddItem(state, muliItemContent);
    }
  },
  type: "array"
};

var accessoriesCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: (0, _utils.getCommonGrayCard)({
      header: {
        uiFramework: "custom-atoms",
        componentPath: "Container",
        children: {
          head: (0, _utils.getCommonSubHeader)({
            labelName: "Accessories",
            labelKey: "TL_NEW_TRADE_DETAILS_HEADER_ACC"
          }, {
            style: {
              marginBottom: 18
            }
          }),
          ico: {
            uiFramework: "custom-molecules-local",
            moduleName: "egov-tradelicence",
            componentPath: "Tooltip",
            props: {
              val: {
                value: "Accessories Information",
                key: "TL_ACCESSORIES_TOOLTIP_MESSAGE"
              },
              style: (0, _utils2.getIconStyle)("headerIcon")
            }
          }
        }
      },
      accessoriesCardContainer: (0, _utils.getCommonContainer)({
        accessoriesName: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-tradelicence",
          componentPath: "AutosuggestContainer",
          props: {
            className: "accesories-name-dropdown",
            label: {
              labelName: "Accessories",
              labelKey: "TL_NEW_TRADE_DETAILS_ACC_LABEL"
            },
            placeholder: {
              labelName: "Select Accessories",
              labelKey: "TL_NEW_TRADE_DETAILS_ACC_PLACEHOLDER"
            },
            localePrefix: {
              moduleName: "TRADELICENSE",
              masterName: "ACCESSORIESCATEGORY"
            },
            labelsFromLocalisation: true,
            required: false,
            isClearable: true,
            inputLabelProps: {
              shrink: true
            },
            jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].accessoryCategory",
            sourceJsonPath: "applyScreenMdmsData.TradeLicense.AccessoriesCategory"
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].accessoryCategory",
          sourceJsonPath: "applyScreenMdmsData.TradeLicense.AccessoriesCategory",
          gridDefination: {
            xs: 12,
            sm: 4
          },
          beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
            try {
              var accessories = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.AccessoriesCategory", []);
              var currentObject = (0, _filter2.default)(accessories, {
                code: action.value
              });
              var currentUOMField = (0, _get2.default)(state.screenConfiguration.screenConfig.apply, action.componentJsonpath, []);
              var jsonArr = currentUOMField.jsonPath.split(".");
              jsonArr.pop();

              var currentUOMValueFieldPath = action.componentJsonpath.split(".");
              currentUOMValueFieldPath.pop();
              currentUOMValueFieldPath = currentUOMValueFieldPath.join(".");
              if (currentObject[0].uom) {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", currentUOMValueFieldPath + ".accessoriesUOM", "props.value", currentObject[0].uom));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", currentUOMValueFieldPath + ".accessoriesUOMValue", "props.disabled", false));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", currentUOMValueFieldPath + ".accessoriesUOMValue", "required", true));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", currentUOMValueFieldPath + ".accessoriesUOMValue", "required", false));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", currentUOMValueFieldPath + ".accessoriesUOM", "props.value", ""));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", currentUOMValueFieldPath + ".accessoriesUOMValue", "props.value", ""));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", currentUOMValueFieldPath + ".accessoriesUOMValue", "props.disabled", true));
                dispatch((0, _actions.prepareFinalObject)(jsonArr.join(".") + ".uom", null));
                dispatch((0, _actions.prepareFinalObject)(jsonArr.join(".") + ".uomValue", null));
              }
              if (action.value) {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", currentUOMValueFieldPath + ".accessoriesCount", "props.disabled", false));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", currentUOMValueFieldPath + ".accessoriesCount", "props.disabled", true));
              }
            } catch (e) {
              console.log(e);
            }
          }
        },
        accessoriesUOM: (0, _utils.getTextField)({
          label: {
            labelName: "UOM (Unit of Measurement)",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_LABEL"
          },
          placeholder: {
            labelName: "UOM",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_UOM_PLACEHOLDER"
          },
          // required: true,
          props: {
            disabled: true
          },
          jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uom",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        }),
        accessoriesUOMValue: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "UOM Value",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_LABEL"
          },
          placeholder: {
            labelName: "Enter UOM Value",
            labelKey: "TL_NEW_TRADE_DETAILS_UOM_VALUE_PLACEHOLDER"
          },
          pattern: (0, _utils.getPattern)("UOMValue"),
          props: {
            className: "applicant-details-error",
            disabled: true,
            jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uomValue"
          },
          required: true,
          jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].uomValue",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        })),
        accessoriesCount: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "Accessory Count",
            labelKey: "TL_NEW_TRADE_ACCESSORY_COUNT"
          },
          placeholder: {
            labelName: "Enter accessory count",
            labelKey: "TL_NEW_TRADE_ACCESSORY_COUNT_PLACEHOLDER"
          },
          pattern: (0, _utils.getPattern)("NoOfEmp"),
          props: {
            className: "applicant-details-error",
            setDataInField: true,
            jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].count",
            disabled: true
          },
          required: true,
          defaultValue: 1,
          jsonPath: "Licenses[0].tradeLicenseDetail.accessories[0].count",
          gridDefination: {
            xs: 12,
            sm: 4
          }
        }))
      })
    }),
    onMultiItemAdd: function onMultiItemAdd(state, muliItemContent) {
      return setFieldsOnAddItem(state, muliItemContent);
    },
    items: [],
    addItemLabel: {
      labelName: "ADD ACCESSORIES",
      labelKey: "TL_NEW_TRADE_DETAILS_BUTTON_NEW_ACC"
    },
    headerName: "Accessory",
    headerJsonPath: "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Licenses[0].tradeLicenseDetail.accessories",
    prefixSourceJsonPath: "children.cardContent.children.accessoriesCardContainer.children"
  },
  type: "array"
};

var tradeDetails = exports.tradeDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Trade Details",
    labelKey: "TL_NEW_TRADE_DETAILS_PROV_DET_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  tradeDetailsConatiner: (0, _utils.getCommonContainer)({
    financialYear: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-tradelicence",
      componentPath: "AutosuggestContainer",
      jsonPath: "Licenses[0].financialYear",
      sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
      props: {
        className: "autocomplete-dropdown",
        suggestions: [],
        disabled: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? true : false,
        label: {
          labelName: "Financial Year",
          labelKey: "TL_FINANCIAL_YEAR_LABEL"
        },
        placeholder: {
          labelName: "Select Financial Year",
          labelKey: "TL_FINANCIAL_YEAR_PLACEHOLDER"
        },
        required: true,
        isClearable: true,
        jsonPath: "Licenses[0].financialYear",
        sourceJsonPath: "applyScreenMdmsData.egf-master.FinancialYear",
        inputLabelProps: {
          shrink: true
        }
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true
    },
    // oldLicenseNo: getTextField({
    //   label: {
    //     labelName: "Old License No",
    //     labelKey: "TL_OLD_LICENSE_NO"
    //   },
    //   placeholder: {
    //     labelName: "Enter Old License No",
    //     labelKey: "TL_OLD_LICENSE_NO_PLACEHOLDER"
    //   },
    //   gridDefination: {
    //     xs: 12,
    //     sm: 6
    //   },
    //   props:{
    //     disabled:getQueryArg(window.location.href, "action") === "EDITRENEWAL"? true:false 
    //   },
    //   iconObj: {
    //     iconName: "search",
    //     position: "end",
    //     color: "#FE7A51",
    //     onClickDefination: {
    //       action: "condition",
    //       callBack: (state, dispatch) => {
    //         fillOldLicenseData(state, dispatch);
    //       }
    //     }
    //   },
    //   title: {
    //     value: "Fill the form by searching your old approved trade license",
    //     key: "TL_OLD_TL_NO"
    //   },
    //   infoIcon: "info_circle",
    //   jsonPath: "Licenses[0].oldLicenseNumber"
    // }),
    dummyDiv: {
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
    tradeLicenseType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
      label: {
        labelName: "License Type",
        labelKey: "TL_NEW_TRADE_DETAILS_LIC_TYPE_LABEL"
      },
      placeholder: {
        labelName: "Select License Type",
        labelKey: "TL_NEW_TRADE_DETAILS_LIC_TYPE_PLACEHOLDER"
      },
      required: true,
      jsonPath: "Licenses[0].licenseType",
      localePrefix: {
        moduleName: "TRADELICENSE",
        masterName: "LICENSETYPE"
      },
      props: {
        disabled: true,
        value: "PERMANENT",
        className: "tl-trade-type"
      },
      sourceJsonPath: "applyScreenMdmsData.TradeLicense.licenseType"
    }), {
      beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
        if (action.value === "TEMPORARY") {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeToDate", "visible", true));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeFromDate", "visible", true));
        } else {
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeToDate", "visible", false));
          dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.tradeDetails.children.cardContent.children.tradeDetailsConatiner.children.tradeFromDate", "visible", false));
          // dispatch(pFO("Licenses[0].validFrom", null));
          // dispatch(pFO("Licenses[0].validTo", null));
        }
      }
    }),
    tradeName: (0, _utils.getTextField)({
      label: {
        labelName: "Name of Trade",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_NAME_LABEL"
      },
      props: {
        className: "applicant-details-error",
        disabled: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? true : false
      },
      placeholder: {
        labelName: "Example Diljit Da Dhaba",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_NAME_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("TradeName"),
      jsonPath: "Licenses[0].tradeName"
    }),
    tradeFromDate: (0, _extends3.default)({}, (0, _utils.getDateField)({
      label: {
        labelName: "From Date",
        labelKey: "TL_COMMON_FROM_DATE_LABEL"
      },
      placeholder: (0, _defineProperty3.default)({
        labelName: "Trade License From Date"
      }, "labelName", "TL_TRADE_LICENCE_FROM_DATE"),
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Licenses[0].validFrom",
      props: {
        disabled: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? true : false,
        className: "applicant-details-error",
        inputProps: {
          min: (0, _commons.getTodaysDateInYMD)(),
          max: (0, _utils2.getFinancialYearDates)("yyyy-mm-dd").endDate
        }
      }
    }), {
      visible: false
    }),
    tradeToDate: (0, _extends3.default)({}, (0, _utils.getDateField)({
      label: { labelName: "To Date", labelKey: "TL_COMMON_TO_DATE_LABEL" },
      placeholder: {
        labelName: "Trade License From Date",
        labelKey: "TL_TRADE_LICENCE_TO_DATE"
      },
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Licenses[0].validTo",
      props: {
        disabled: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? true : false,
        inputProps: {
          min: (0, _utils2.getNextMonthDateInYMD)(),
          max: (0, _utils2.getFinancialYearDates)("yyyy-mm-dd").endDate
        }
      }
    }), {
      visible: false
    }),
    dynamicMdmsStructureType: {
      uiFramework: "custom-containers",
      componentPath: "DynamicMdmsContainer",
      props: {
        dropdownFields: [{
          key: 'structureType',
          isDisabled: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? true : false,
          fieldType: "autosuggest",
          className: "applicant-details-error autocomplete-dropdown",
          isRequired: false,
          requiredValue: true
        }, {
          key: 'structureSubType',
          callBack: structureSubTypeChange,
          fieldType: "autosuggest",
          className: "applicant-details-error autocomplete-dropdown",
          isRequired: false,
          requiredValue: true
        }],
        moduleName: "common-masters",
        masterName: "StructureType",
        rootBlockSub: 'structureTypes',
        callBackEdit: _utils2.updateStructureTypes
      }
    },
    tradeCommencementDate: (0, _utils.getDateField)({
      label: {
        labelName: "Trade Commencement Date",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_LABEL"
      },
      props: {
        className: "applicant-details-error",
        disabled: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? true : false
      },
      placeholder: {
        labelName: "Enter Trade Commencement Date",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_COMM_DATE_PLACEHOLDER"
      },
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Licenses[0].commencementDate"
    }),
    tradeGSTNo: (0, _utils.getTextField)({
      label: {
        labelName: "Trade GST No.",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_LABEL"
      },
      props: {
        className: "applicant-details-error",
        disabled: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? true : false
      },
      placeholder: {
        labelName: "Enter Trade GST No.",
        labelKey: "TL_NEW_TRADE_DETAILS_TRADE_GST_NO_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("GSTNo"),
      jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.gstNo"
    }),
    tradeOperationalArea: (0, _utils.getTextField)({
      label: {
        labelName: "Operatonal Area (Sq Ft)",
        labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_LABEL"
      },
      props: {
        className: "applicant-details-error",
        disabled: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? true : false
      },
      placeholder: {
        labelName: "Enter Operatonal Area in Sq Ft",
        labelKey: "TL_NEW_TRADE_DETAILS_OPR_AREA_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("OperationalArea"),
      jsonPath: "Licenses[0].tradeLicenseDetail.operationalArea"
    }),
    tradeNoOfEmployee: (0, _utils.getTextField)({
      label: {
        labelName: "No. Of Employee",
        labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_LABEL"
      },
      props: {
        className: "applicant-details-error",
        disabled: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? true : false
      },
      placeholder: {
        labelName: "Enter No. Of Employee",
        labelKey: "TL_NEW_TRADE_DETAILS_NO_EMPLOYEES_PLACEHOLDER"
      },
      pattern: (0, _utils.getPattern)("NoOfEmp"),
      jsonPath: "Licenses[0].tradeLicenseDetail.noOfEmployees"
    })
  }, { style: (0, _commons.getQueryArg)(window.location.href, "action") === "EDITRENEWAL" || (0, _commons.getQueryArg)(window.location.href, "workflowService") === "EDITRENEWAL" ? { "cursor": "not-allowed" } : {} }),
  tradeUnitCard: tradeUnitCard,
  accessoriesCard: accessoriesCard
});

var setFieldsOnAddItem = function setFieldsOnAddItem(state, multiItemContent) {
  var preparedFinalObject = JSON.parse(JSON.stringify(state.screenConfiguration.preparedFinalObject));
  for (var variable in multiItemContent) {
    var value = (0, _get2.default)(preparedFinalObject, multiItemContent[variable].props.jsonPath);
    if (multiItemContent[variable].props.setDataInField && value) {
      if (multiItemContent[variable].props.jsonPath.split(".")[0] === "LicensesTemp" && multiItemContent[variable].props.jsonPath.split(".").pop() === "tradeType") {
        var tradeTypeData = (0, _get2.default)(preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType", []);
        var tradeTypeDropdownData = tradeTypeData && tradeTypeData.TradeType && Object.keys(tradeTypeData.TradeType).map(function (item) {
          return { code: item, active: true };
        });
        multiItemContent[variable].props.data = tradeTypeDropdownData;
        var data = tradeTypeData[value];
        if (data) {
          multiItemContent["tradeType"].props.data = undefined.objectToDropdown(data);
        }
      } else if (multiItemContent[variable].props.jsonPath.split(".").pop() === "tradeType") {
        var _data = (0, _get2.default)(preparedFinalObject, "applyScreenMdmsData.TradeLicense.TradeType." + value.split(".")[0] + "." + value.split(".")[1]);
        if (_data) {
          multiItemContent[variable].props.data = _data;
        }
      } else if (multiItemContent[variable].props.jsonPath.split(".").pop() === "uomValue" && value > 0) {
        multiItemContent[variable].props.disabled = false;
        multiItemContent[variable].props.required = true;
      }
    }
    if (multiItemContent[variable].props.setDataInField && multiItemContent[variable].props.disabled) {
      if (multiItemContent[variable].props.jsonPath.split(".").pop() === "uomValue") {
        var disabledValue = (0, _get2.default)(state.screenConfiguration.screenConfig["apply"], multiItemContent[variable].componentJsonpath + ".props.disabled", true);
        multiItemContent[variable].props.disabled = disabledValue;
      }
    }
  }
  return multiItemContent;
};