"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assignmentDetails = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var assignmentDetailsCard = {
  uiFramework: "custom-containers",
  componentPath: "MultiItem",
  props: {
    scheama: (0, _utils.getCommonGrayCard)({
      asmtDetailsCardContainer: (0, _utils.getCommonContainer)({
        assignFromDate: (0, _extends3.default)({}, (0, _utils.getDateField)({
          label: {
            labelName: "Assigned From Date",
            labelKey: "HR_ASMT_FROM_DATE_LABEL"
          },
          placeholder: {
            labelName: "Assigned From Date",
            labelKey: "HR_ASMT_FROM_DATE_PLACEHOLDER"
          },
          required: true,

          pattern: (0, _utils.getPattern)("Date"),
          jsonPath: "Employee[0].assignments[0].fromDate",
          props: {
            inputProps: {
              max: (0, _commons.getTodaysDateInYMD)()

            }
          }
        })),
        assignToDate: (0, _extends3.default)({}, (0, _utils.getDateField)({
          label: {
            labelName: "Assigned To Date",
            labelKey: "HR_ASMT_TO_DATE_LABEL"
          },
          placeholder: {
            labelName: "Assigned To Date",
            labelKey: "HR_ASMT_TO_DATE_PLACEHOLDER"
          },
          pattern: (0, _utils.getPattern)("Date"),
          jsonPath: "Employee[0].assignments[0].toDate",

          props: {
            checkFieldDisable: true,
            dependantField: 'isCurrentAssignment',
            jsonPathRemoveKey: "toDate",

            inputProps: {
              min: (0, _commons.getTodaysDateInYMD)()
            }
          }
        })),
        dummyDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Div",
          gridDefination: {
            xs: 12,
            sm: 6
          },
          props: {
            disabled: true
          }
        },
        currentAssignment: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-hrms",
          componentPath: "SwitchWithLabel",
          props: {
            items: [{
              label: {
                labelName: "Currently Assigned Here",
                labelKey: "HR_CURRENTLY_ASSIGNED_HERE_SWITCH_LABEL"
              }
            }],
            SwitchProps: {
              color: "primary"
            },
            jsonPath: "Employee[0].assignments[0].isCurrentAssignment",
            compJPath: "components.div.children.formwizardThirdStep.children.assignmentDetails.children.cardContent.children.assignmentDetailsCard.props.items",
            screenKey: "create"
          },
          beforeFieldChange: function beforeFieldChange(action, state, dispatch) {
            var assignToComponentPath = action.componentJsonpath.replace(".currentAssignment", ".assignToDate");
            var isDisabled = (0, _get2.default)(state.screenConfiguration.screenConfig.create, action.componentJsonpath + ".props.disabled");
            if (!isDisabled) {
              if (action.value) {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("create", assignToComponentPath, "props.value", null));
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("create", assignToComponentPath, "props.disabled", true));
              } else {
                dispatch((0, _actions.handleScreenConfigurationFieldChange)("create", assignToComponentPath, "props.disabled", false));
              }
            }
          }
        },
        department: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-hrms",
          componentPath: "AutosuggestContainer",
          jsonPath: "Employee[0].assignments[0].department",
          props: {
            className: "hr-generic-selectfield autocomplete-dropdown",
            optionValue: "code",
            optionLabel: "name",
            localePrefix: {
              moduleName: "common-masters",
              masterName: "Department"
            },
            label: {
              labelName: "Department",
              labelKey: "HR_DEPT_LABEL"
            },
            placeholder: {
              labelName: "Select Department",
              labelKey: "HR_DEPT_PLACEHOLDER"
            },
            required: true,
            isClearable: true,
            labelsFromLocalisation: true,
            jsonPath: "Employee[0].assignments[0].department",
            sourceJsonPath: "createScreenMdmsData.common-masters.Department"
          },
          required: true,
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          }
        },
        designation: {
          uiFramework: "custom-containers-local",
          moduleName: "egov-hrms",
          componentPath: "AutosuggestContainer",
          jsonPath: "Employee[0].assignments[0].designation",
          props: {
            className: "hr-generic-selectfield autocomplete-dropdown",
            optionValue: "code",
            optionLabel: "name",
            localePrefix: {
              moduleName: "common-masters",
              masterName: "Designation"
            },
            label: { labelName: "Designation", labelKey: "HR_DESG_LABEL" },
            placeholder: {
              labelName: "Select Designation",
              labelKey: "HR_DESIGNATION_PLACEHOLDER"
            },
            required: true,
            isClearable: true,
            labelsFromLocalisation: true,
            jsonPath: "Employee[0].assignments[0].designation",
            sourceJsonPath: "createScreenMdmsData.common-masters.Designation"
          },
          required: true,
          gridDefination: {
            xs: 12,
            sm: 12,
            md: 6
          }
        },
        reportingTo: (0, _extends3.default)({}, (0, _utils.getTextField)({
          label: {
            labelName: "Reporting To",
            labelKey: "HR_REP_TO_LABEL"
          },
          placeholder: {
            labelName: "Reporting To",
            labelKey: "HR_REP_TO_LABEL"
          },
          pattern: (0, _utils.getPattern)("Name") || null,
          jsonPath: "Employee[0].assignments[0].reportingTo"
        })),
        headOfDepartment: {
          uiFramework: "custom-molecules-local",
          moduleName: "egov-hrms",
          componentPath: "SwitchWithLabel",
          props: {
            items: [{
              label: {
                labelName: "Head Of Department",
                labelKey: "HR_HOD_SWITCH_LABEL"
              }
            }],
            SwitchProps: {
              color: "primary"
            },
            jsonPath: "Employee[0].assignments[0].isHOD"
          }
        }
      }, {
        style: {
          overflow: "visible"
        }
      })
    }),
    onMultiItemAdd: function onMultiItemAdd(state, muliItemContent) {
      var preparedFinalObject = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject", {});
      var cardIndex = (0, _get2.default)(muliItemContent, "assignFromDate.index");
      var cardId = (0, _get2.default)(preparedFinalObject, "Employee[0].assignments[" + cardIndex + "].id");
      if (cardId) {
        var isCurrentAssignment = (0, _get2.default)(preparedFinalObject, "Employee[0].assignments[" + cardIndex + "].isCurrentAssignment");
        Object.keys(muliItemContent).forEach(function (key) {
          if (isCurrentAssignment && key === "currentAssignment") {
            (0, _set2.default)(muliItemContent[key], "props.disabled", false);
          } else {
            // set(muliItemContent[key], "props.disabled", true);
          }
        });
      } else {
        Object.keys(muliItemContent).forEach(function (key) {
          if (key === "dummyDiv") {
            (0, _set2.default)(muliItemContent[key], "props.disabled", true);
          } else {
            (0, _set2.default)(muliItemContent[key], "props.disabled", false);
          }
        });
      }
      return muliItemContent;
    },
    items: [],
    addItemLabel: {
      labelName: "ADD ASSIGNMENT",
      labelKey: "HR_ADD_ASSIGNMENT"
    },
    headerName: "Assignment",
    headerJsonPath: "children.cardContent.children.header.children.head.children.Accessories.props.label",
    sourceJsonPath: "Employee[0].assignments",
    prefixSourceJsonPath: "children.cardContent.children.asmtDetailsCardContainer.children",
    disableDeleteIfKeyExists: "id"
  },
  type: "array"
};

var assignmentDetails = exports.assignmentDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Assignment Details",
    labelKey: "HR_ASSIGN_DET_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  subheader: (0, _utils.getCommonSubHeader)({
    labelName: "Verify entered details before submission. Assignment details cannot be edited once submitted.",
    labelKey: "HR_ASSIGN_DET_SUB_HEADER"
  }),
  assignmentDetailsCard: assignmentDetailsCard
}, {
  style: {
    overflow: "visible"
  }
});