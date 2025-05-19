"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.serviceDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var serviceDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: (0, _utils.getCommonGrayCard)({
      serviceDetailsCardContainer: (0, _utils.getCommonContainer)({
        status: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-hrms",
          componentPath: "AutosuggestContainer",
          jsonPath: "Employee[0].serviceHistory[0].serviceStatus",
          gridDefination: {
            xs: 12,
            sm: 4
          },
          required: false,
          props: {
            className: "hr-generic-selectfield autocomplete-dropdown",
            jsonPath: "Employee[0].serviceHistory[0].serviceStatus",
            sourceJsonPath: "createScreenMdmsData.egov-hrms.EmployeeStatus",
            optionValue: "code",
            optionLabel: "status",
            localePrefix: {
              moduleName: "egov-hrms",
              masterName: "EmployeeStatus"
            },
            label: {
              labelName: "Status",
              labelKey: "HR_STATUS_LABEL"
            },
            placeholder: {
              labelName: "Select Status",
              labelKey: "HR_STATUS_PLACEHOLDER"
            },
            labelsFromLocalisation: true,
            isClearable: true,
            required: false
          }
        },
        serviceFromDate: (0, _extends3.default)({}, (0, _utils.getDateField)({
          label: {
            labelName: "Service From Date",
            labelKey: "HR_SER_FROM_DATE_LABEL"
          },
          placeholder: {
            labelName: "Service From Date",
            labelKey: "HR_SER_FROM_DATE_LABEL"
          },
          pattern: (0, _utils.getPattern)("Date"),
          jsonPath: "Employee[0].serviceHistory[0].serviceFrom",
          gridDefination: {
            xs: 12,
            sm: 4
          },
          props: {
            jsonPath: "Employee[0].serviceHistory[0].serviceFrom"
            // inputProps: {
            //   min: getTodaysDateInYMD(),
            //   max: getFinancialYearDates("yyyy-mm-dd").endDate
            // }
          }
        })),
        serviceToDate: (0, _extends3.default)({}, (0, _utils.getDateField)({
          label: {
            labelName: "Service To Date",
            labelKey: "HR_SER_TO_DATE_LABEL"
          },
          placeholder: {
            labelName: "Service To Date",
            labelKey: "HR_SER_TO_DATE_LABEL"
          },
          pattern: (0, _utils.getPattern)("Date"),
          jsonPath: "Employee[0].serviceHistory[0].serviceTo",
          gridDefination: {
            xs: 12,
            sm: 4
          },
          props: {
            jsonPath: "Employee[0].serviceHistory[0].serviceTo",
            checkFieldDisable: true,
            dependantField: 'isCurrentPosition',
            jsonPathRemoveKey: "serviceTo"
            // inputProps: {
            //   min: getTodaysDateInYMD(),
            //   max: getFinancialYearDates("yyyy-mm-dd").endDate
            // }
          }
        })),
        location: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "Location",
            labelKey: "HR_LOCATION_LABEL"
          },
          placeholder: {
            labelName: "Select Location",
            labelKey: "HR_LOCATION_PLACEHOLDER"
          },
          jsonPath: "Employee[0].serviceHistory[0].location",
          gridDefination: {
            xs: 12,
            sm: 4
          },
          props: {
            //   className: "hr-generic-selectfield",
            jsonPath: "Employee[0].serviceHistory[0].location"
            //   data: [
            //     {
            //       value: "pb.amritsar",
            //       label: "Amritsar"
            //     }
            //   ],
            //   optionValue: "value",
            //   optionLabel: "label"
          }
        })),
        orderNo: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "Order No",
            labelKey: "HR_ORDER_NO_LABEL"
          },
          placeholder: {
            labelName: "Enter Order No",
            labelKey: "HR_ORDER_NO_PLACEHOLDER"
          },
          pattern: (0, _utils.getPattern)("TradeName") || null,
          jsonPath: "Employee[0].serviceHistory[0].orderNo",
          props: {
            jsonPath: "Employee[0].serviceHistory[0].orderNo"
          }
        }), {
          gridDefination: {
            xs: 12,
            sm: 4
          }
        }),
        currentlyWorkingHere: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-hrms",
          componentPath: "SwitchWithLabel",
          jsonPath: "Employee[0].serviceHistory[0].isCurrentPosition",
          props: {
            items: [{
              label: {
                labelName: "Currently Working Here",
                labelKey: "HR_CURRENTLY_WORKING_HERE_SWITCH_LABEL"
              }
            }],
            SwitchProps: {
              color: "primary"
            },
            jsonPath: "Employee[0].serviceHistory[0].isCurrentPosition"
          },
          beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
            var assignToComponentPath = action.componentJsonpath.replace(".currentlyWorkingHere", ".serviceToDate");
            if (action.value) {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("create", assignToComponentPath, "props.value", null));
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("create", assignToComponentPath, "props.disabled", true));
            } else {
              dispatch((0, _actions.handleScreenConfigurationFieldChange)("create", assignToComponentPath, "props.disabled", false));
            }
          }
        }
      }, {
        style: {
          overflow: "visible"
        }
      })
    }),
    items: [],
    addItemLabel: {
      labelName: "ADD SERVICE ENTRY",
      labelKey: "HR_ADD_SERVICE_ENTRY"
    },
    headerName: "Service",
    headerJsonPath: "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Employee[0].serviceHistory",
    prefixSourceJsonPath: "children.cardContent.children.serviceDetailsCardContainer.children",
    disableDeleteIfKeyExists: "id"
  },
  type: "array"
};

var serviceDetails = exports.serviceDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Service Details",
    labelKey: "HR_SER_DET_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  subheader: (0, _utils.getCommonSubHeader)({
    labelName: "Verify entered details before submission. Service details cannot be edited once submitted.",
    labelKey: "HR_SER_DET_SUB_HEADER"
  }),

  serviceDetailsCard: serviceDetailsCard
}, {
  style: {
    overflow: "visible"
  }
});