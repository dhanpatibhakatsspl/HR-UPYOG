"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.permitConditions = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _index = require("../../utils/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var commonApplicantInformation = function commonApplicantInformation() {
  return (0, _utils.getCommonGrayCard)({
    permitCard: (0, _utils.getCommonContainer)({
      mobileNumber: (0, _utils.getTextField)({
        placeholder: {
          labelName: "Enter question here",
          labelKey: "BPA_ENTER_QSTN_PLACEHOLDER"
        },
        required: true,
        props: {
          className: "applicant-details-error"
        },
        errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
        jsonPath: "BPA.tempAdded[0].conditions",
        gridDefination: {
          xs: 12,
          sm: 12,
          md: 12
        },
        afterFieldChange: function afterFieldChange(action, state, dispatch) {
          (0, _index.getConditionsInPermitList)(action, state, dispatch);
        }
      })
    })
  });
};

var permitConditions = exports.permitConditions = (0, _utils.getCommonGrayCard)({
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
        labelName: "Permit Conditions",
        labelKey: "BPA_PERMIT_CONDITIONS"
      }))
    }
  },
  permitConditionsCard: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-bpa",
    componentPath: "BpaConditionsContainer",
    props: {
      sourceJsonPath: "permitConditions"
    },
    type: "array"
  },
  multiCheckListContainers: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    children: {
      multipleApplicantInfo: {
        uiFramework: "custom-containers",
        componentPath: "MultiItem",
        props: {
          scheama: commonApplicantInformation(),
          items: [],
          addItemLabel: {
            labelName: "Add More",
            labelKey: "BPA_ADD_MORE"
          },
          sourceJsonPath: "BPA.tempAdded",
          prefixSourceJsonPath: "children.cardContent.children.permitCard.children"
        },
        type: "array"
      }
    }
  }
});