"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.additionDetails = exports.commonRoadCuttingChargeInformation = exports.updateWaterSource = exports.triggerUpdateByKey = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("../../utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _index = require("../../../../../ui-utils/index");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("../../../../../ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//   import { searchApiCall } from "./functions";
var isMode = (0, _commons2.isModifyMode)();

var getPlumberRadioButton = {
  uiFramework: "custom-containers-local",
  moduleName: "egov-wns",
  componentPath: "RadioGroupContainer",
  gridDefination: { xs: 12, sm: 12 },
  jsonPath: "applyScreen.additionalDetails.detailsProvidedBy",
  props: {
    label: { key: "WS_ADDN_DETAILS_PLUMBER_PROVIDED_BY" },
    buttons: [{ labelKey: "WS_PLUMBER_ULB", value: "ULB" }, { labelKey: "WS_PLUMBER_SELF", value: "Self" }],
    required: false
  },
  type: "array"
};
var triggerUpdateByKey = exports.triggerUpdateByKey = function triggerUpdateByKey(state, keyIndex, value, dispatch) {
  if (dispatch == "set") {
    (0, _set2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.ws-services-masters.waterSource.selectedValues[" + keyIndex + "]", value);
  } else {
    dispatch((0, _actions.prepareFinalObject)("DynamicMdms.ws-services-masters.waterSource." + keyIndex, value));
  }
};
var updateWaterSource = exports.updateWaterSource = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var waterSource, waterSubSource, modValue, i, formObj;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            waterSource = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].waterSource", null);
            waterSubSource = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.WaterConnection[0].waterSubSource", null);
            modValue = waterSource + "." + waterSubSource;
            i = 0;
            formObj = {
              waterSourceType: waterSource, waterSubSource: modValue
            };

            triggerUpdateByKey(state, i, formObj, 'set');

            triggerUpdateByKey(state, "waterSubSourceTransformed.allDropdown[" + i + "]", (0, _commons.getObjectValues)((0, _get2.default)(state, "screenConfiguration.preparedFinalObject.DynamicMdms.ws-services-masters.waterSource.waterSourceTransformed." + waterSource, [])), dispatch);

            triggerUpdateByKey(state, "selectedValues[" + i + "]", formObj, dispatch);

          case 8:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function updateWaterSource(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();
var waterSourceTypeChange = function waterSourceTypeChange(reqObj) {
  try {
    var dispatch = reqObj.dispatch,
        value = reqObj.value,
        state = reqObj.state;

    dispatch((0, _actions.prepareFinalObject)("WaterConnection[0].waterSource", value));
    dispatch((0, _actions.prepareFinalObject)("WaterConnection[0].waterSubSource", ''));
    var formObj = {
      waterSourceType: value, waterSubSource: ''
    };
    triggerUpdateByKey(state, "selectedValues[0]", formObj, dispatch);
  } catch (e) {}
};
var waterSubSourceChange = function waterSubSourceChange(reqObj) {
  try {
    var dispatch = reqObj.dispatch,
        value = reqObj.value;

    var rowValue = value.split(".");
    dispatch((0, _actions.prepareFinalObject)("WaterConnection[0].waterSubSource", rowValue[1]));
  } catch (e) {}
};
var commonRoadCuttingChargeInformation = exports.commonRoadCuttingChargeInformation = function commonRoadCuttingChargeInformation() {
  return (0, _utils.getCommonGrayCard)({
    roadDetails: (0, _utils.getCommonContainer)({
      roadType: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-wns",
        componentPath: "AutosuggestContainer",
        jsonPath: "applyScreen.roadCuttingInfo[0].roadType",
        localePrefix: {
          moduleName: "WS",
          masterName: "ROADTYPE"
        },
        props: {
          className: "hr-generic-selectfield autocomplete-dropdown",
          label: { labelKey: "WS_ADDN_DETAIL_ROAD_TYPE", labelName: "Road Type" },
          placeholder: { labelKey: "WS_ADDN_DETAILS_ROAD_TYPE_PLACEHOLDER", labelName: "Select Road Type" },
          required: false,
          isClearable: true,
          labelsFromLocalisation: true,
          jsonPath: "applyScreen.roadCuttingInfo[0].roadType",
          sourceJsonPath: "applyScreenMdmsData.sw-services-calculation.RoadType",
          localePrefix: {
            moduleName: "WS",
            masterName: "ROADTYPE"
          }
        },
        required: false,
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      },
      enterArea: (0, _utils.getTextField)({
        label: {
          labelKey: "WS_ADDN_DETAILS_AREA_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_AREA_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: (0, _utils.getPattern)("Amount"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.roadCuttingInfo[0].roadCuttingArea"
      })
    })
  });
};
var additionDetails = exports.additionDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonHeader)({
    labelKey: "WS_COMMON_ADDN_DETAILS_HEADER"
  }),
  connectiondetailscontainer: (0, _utils.getCommonGrayCard)({
    subHeader: (0, _utils.getCommonTitle)({
      labelKey: "WS_COMMON_CONNECTION_DETAILS"
    }),

    connectionDetails: (0, _utils.getCommonContainer)({
      connectionType: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-wns",
        componentPath: "AutosuggestContainer",
        jsonPath: "applyScreen.connectionType",
        localePrefix: {
          moduleName: "WS",
          masterName: "CONNECTIONTYPE"
        },
        props: {
          className: "hr-generic-selectfield autocomplete-dropdown",
          label: { labelKey: "WS_SERV_DETAIL_CONN_TYPE", labelName: "Connection type" },
          placeholder: { labelKey: "WS_ADDN_DETAILS_CONN_TYPE_PLACEHOLDER", labelName: "Select Connetion Type" },
          required: false,
          isClearable: true,
          labelsFromLocalisation: true,
          jsonPath: "applyScreen.connectionType",
          sourceJsonPath: "applyScreenMdmsData.ws-services-masters.connectionType",
          localePrefix: {
            moduleName: "WS",
            masterName: "CONNECTIONTYPE"
          }
        },
        required: false,
        gridDefination: { xs: 12, sm: 6 },
        afterFieldChange: function () {
          var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
            var connType;
            return _regenerator2.default.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    _context2.next = 2;
                    return (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.applyScreen.connectionType");

                  case 2:
                    connType = _context2.sent;

                    if (connType === undefined || connType === "Non Metered" || connType === "Bulk-supply" || connType !== "Metered") {
                      showHideFeilds(dispatch, false);
                    } else {
                      showHideFeilds(dispatch, true);
                    }

                  case 4:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, undefined);
          }));

          return function afterFieldChange(_x3, _x4, _x5) {
            return _ref2.apply(this, arguments);
          };
        }()
      },

      numberOfTaps: (0, _utils.getTextField)({
        label: { labelKey: "WS_SERV_DETAIL_NO_OF_TAPS" },
        placeholder: { labelKey: "WS_SERV_DETAIL_NO_OF_TAPS_PLACEHOLDER" },
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.noOfTaps",
        pattern: /^[0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
      }),
      dynamicMdmsWaterSource: {
        uiFramework: "custom-containers",
        componentPath: "DynamicMdmsContainer",
        props: {
          dropdownFields: [{
            key: 'waterSourceType',
            fieldType: "autosuggest",
            className: "applicant-details-error autocomplete-dropdown",
            callBack: waterSourceTypeChange,
            isRequired: false,
            requiredValue: false
          }, {
            key: 'waterSubSource',
            fieldType: "autosuggest",
            className: "applicant-details-error autocomplete-dropdown",
            callBack: waterSubSourceChange,
            isRequired: false,
            requiredValue: false
          }],
          moduleName: "ws-services-masters",
          masterName: "waterSource",
          rootBlockSub: 'waterSource',
          callBackEdit: updateWaterSource
        }
      },
      pipeSize: {
        uiFramework: "custom-containers-local",
        moduleName: "egov-wns",
        componentPath: "AutosuggestContainer",
        jsonPath: "applyScreen.pipeSize",
        props: {
          className: "hr-generic-selectfield autocomplete-dropdown",
          label: { labelKey: "WS_SERV_DETAIL_PIPE_SIZE", labelName: "Pipe Size" },
          placeholder: { labelKey: "WS_SERV_DETAIL_PIPE_SIZE_PLACEHOLDER", labelName: "Select Pipe Size" },
          required: false,
          isClearable: true,
          labelsFromLocalisation: true,
          jsonPath: "applyScreen.pipeSize",
          sourceJsonPath: "applyScreenMdmsData.ws-services-calculation.pipeSize"
        },
        required: false,
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 6
        }
      },

      noOfWaterClosets: (0, _utils.getTextField)({
        label: { labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS" },
        placeholder: { labelKey: "WS_ADDN_DETAILS_NO_OF_WATER_CLOSETS_PLACEHOLDER" },
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.noOfWaterClosets",
        pattern: /^[0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
      }),
      noOfToilets: (0, _utils.getTextField)({
        label: { labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS" },
        placeholder: { labelKey: "WS_ADDN_DETAILS_NO_OF_TOILETS_PLACEHOLDER" },
        gridDefination: { xs: 12, sm: 6 },
        jsonPath: "applyScreen.noOfToilets",
        pattern: /^[0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG"
      })
    })
  }),
  plumberDetailsContainer: (0, _utils.getCommonGrayCard)({
    subHeader: (0, _utils.getCommonTitle)({
      labelKey: "WS_COMMON_PLUMBER_DETAILS"
    }),
    plumberDetails: (0, _utils.getCommonContainer)({
      getPlumberRadioButton: getPlumberRadioButton,
      plumberLicenceNo: (0, _utils.getTextField)({
        label: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_LICENCE_NO_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: /^[0-9]*$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.plumberInfo[0].licenseNo"
      }),
      plumberName: (0, _utils.getTextField)({
        label: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_NAME_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: (0, _utils.getPattern)("Name"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.plumberInfo[0].name"
      }),
      plumberMobNo: (0, _utils.getTextField)({
        label: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_PLUMBER_MOB_NO_LABEL_PLACEHOLDER"
        },
        gridDefination: { xs: 12, sm: 6 },
        iconObj: { label: "+91 |", position: "start" },
        required: false,
        pattern: (0, _utils.getPattern)("MobileNo"),
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.plumberInfo[0].mobileNumber"
      })
    })
  }),
  roadCuttingChargeContainer: (0, _utils.getCommonCard)({
    header: (0, _utils.getCommonSubHeader)({
      labelName: "Road Cutting Charge",
      labelKey: "WS_ROAD_CUTTING_CHARGE_DETAILS"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    applicantTypeContainer: (0, _utils.getCommonContainer)({
      roadCuttingChargeInfoCard: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        props: {
          style: {
            // display: "none"
            // width: 
          }
        },
        children: {
          multipleApplicantInfo: {
            uiFramework: "custom-containers",
            componentPath: "MultiItem",
            props: {
              scheama: commonRoadCuttingChargeInformation(),
              items: [],
              addItemLabel: {
                labelName: "Add Road Type",
                labelKey: "WS_ADD_ROAD_TYPE_LABEL"
              },
              isReviewPage: false,
              sourceJsonPath: "applyScreen.roadCuttingInfo",
              prefixSourceJsonPath: "children.cardContent.children.roadDetails.children"
            },
            type: "array"
          }
        }
      }
    })
  }),
  activationDetailsContainer: (0, _utils.getCommonGrayCard)({
    subHeader: (0, _utils.getCommonTitle)({
      labelKey: "WS_ACTIVATION_DETAILS"
    }),
    activeDetails: (0, _utils.getCommonContainer)({
      connectionExecutionDate: (0, _utils.getDateField)({
        label: { labelName: "connectionExecutionDate", labelKey: "WS_SERV_DETAIL_CONN_EXECUTION_DATE" },
        // placeholder: {
        //   labelName: "Select From Date",
        //   labelKey: "WS_FROM_DATE_PLACEHOLDER"
        // },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: (0, _utils.getPattern)("Date"),
        errorMessage: "ERR_INVALID_DATE",
        jsonPath: "applyScreen.connectionExecutionDate"
      }),
      meterID: (0, _utils.getTextField)({
        label: {
          labelKey: "WS_SERV_DETAIL_METER_ID"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_METER_ID_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: /^[a-z0-9]+$/i,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.meterId"
      }),
      meterInstallationDate: (0, _utils.getDateField)({
        label: { labelName: "meterInstallationDate", labelKey: "WS_ADDN_DETAIL_METER_INSTALL_DATE" },
        // placeholder: {
        //   labelName: "Select From Date",
        //   labelKey: "WS_FROM_DATE_PLACEHOLDER"
        // },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: (0, _utils.getPattern)("Date"),
        errorMessage: "ERR_INVALID_DATE",
        jsonPath: "applyScreen.meterInstallationDate"
      }),
      initialMeterReading: (0, _utils.getTextField)({
        label: {
          labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING"
        },
        placeholder: {
          labelKey: "WS_ADDN_DETAILS_INITIAL_METER_READING_PLACEHOLDER"
        },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: false,
        pattern: /^[0-9]\d{0,9}(\.\d{1,3})?%?$/,
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "applyScreen.additionalDetails.initialMeterReading"
      })
    })
  }),
  modificationsEffectiveFrom: (0, _utils.getCommonGrayCard)({
    subHeader: (0, _utils.getCommonTitle)({
      labelKey: "WS_MODIFICATIONS_EFFECTIVE_FROM"
    }),
    modificationEffectiveDate: (0, _utils.getCommonContainer)({
      connectionExecutionDate: (0, _utils.getDateField)({
        label: { labelName: "Modifications Effective Date", labelKey: "MODIFICATIONS_EFFECTIVE_DATE" },
        gridDefination: {
          xs: 12,
          sm: 6
        },
        required: true,
        pattern: (0, _utils.getPattern)("Date"),
        errorMessage: "ERR_INVALID_DATE",
        jsonPath: "applyScreen.dateEffectiveFrom",
        props: {
          inputProps: {
            min: (0, _commons.getTodaysDateInYMD)()
          }
        }
      })

    })
  })
});

var showHideFeilds = function showHideFeilds(dispatch, value) {
  var mStep = (0, _commons2.isModifyMode)() ? 'formwizardSecondStep' : 'formwizardThirdStep';
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children." + mStep + ".children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.initialMeterReading", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterInstallationDate", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardThirdStep.children.additionDetails.children.cardContent.children.activationDetailsContainer.children.cardContent.children.activeDetails.children.meterID", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewInitialMeterReading", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterInstallationDate", "visible", value));
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.summaryScreen.children.cardContent.children.reviewOwnerDetails.children.cardContent.children.viewTwelve.children.reviewMeterId", "visible", value));
};