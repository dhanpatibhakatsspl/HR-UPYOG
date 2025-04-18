"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addHospitalDialog = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _newRegistration = require("./newRegistration");

var _constants = require("../utils/constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addHospitalDataToDropDown = function addHospitalDataToDropDown(state, dispatch) {

  var newHospitalName = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.newHospitalName");
  var existingHospitals = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.allHospitals") || [];

  if (!newHospitalName || !new RegExp(_constants.patterns["hospitalName"]).test(newHospitalName)) {
    dispatch((0, _actions.toggleSnackbar)(true, {
      labelName: "Invalid value",
      labelKey: "CORE_COMMON_INVALID"
    }, "info"));
    return;
  }

  var hospitalExists = false;
  for (var hospital in existingHospitals) {
    if (existingHospitals[hospital].name == newHospitalName) {
      dispatch((0, _actions.toggleSnackbar)(true, {
        labelName: "Please fill the required fields.",
        labelKey: "BND_HOSPITAL_NAME_EXISTS"
      }, "info"));
      hospitalExists = true;
      break;
    }
  }

  if (!hospitalExists) {
    existingHospitals.unshift({ code: newHospitalName, name: newHospitalName });
    dispatch((0, _actions.toggleSnackbar)(true, {
      labelName: "Please fill the required fields.",
      labelKey: "BND_NEW_HOSPITAL_ADDED"
    }, "success"));
    dispatch((0, _actions.prepareFinalObject)("bnd.allHospitals", existingHospitals));
  }
};

var addHospitalDialog = exports.addHospitalDialog = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: "Confirm Add",
    labelKey: "BND_CONFIRM_ADD"
  }, {
    style: {
      fontSize: "20px"
    }
  }),
  confirmationContents: (0, _utils.getCommonContainer)({
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        style: {
          width: "90%",
          textAlign: "center"
        }
      },
      children: {

        hospitalName: (0, _utils.getTextField)({
          label: {
            labelName: "",
            labelKey: "BND_HOSPITALNAME_LABEL"
          },
          placeholder: {
            labelName: "",
            labelKey: "BND_HOSPITALNAME_LABEL"
          },
          required: false,
          visible: true,
          jsonPath: "bnd.newHospitalName",
          gridDefination: {
            xs: 12,
            sm: 12
          }
        }),

        yesButton: {
          componentPath: "Button",
          props: {
            variant: "contained",
            color: "primary",
            style: {
              minWidth: "100px",
              height: "20px",
              marginRight: "20px",
              marginTop: "16px"
            }
          },
          children: {
            previousButtonLabel: (0, _utils.getLabel)({
              labelName: "YES",
              labelKey: "BND_DOWNLOAD_PROCEED"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              addHospitalDataToDropDown(state, dispatch);
              (0, _newRegistration.showHideAddHospitalDialog)(state, dispatch);
            }
          }
        },
        cancelButton: {
          componentPath: "Button",
          props: {
            variant: "outlined",
            color: "primary",
            style: {
              minWidth: "100px",
              height: "20px",
              marginRight: "4px",
              marginTop: "16px"
            }
          },
          children: {
            previousButtonLabel: (0, _utils.getLabel)({
              labelName: "NO",
              labelKey: "CORE_COMMON_CANCEL"
            })
          },
          onClickDefination: {
            action: "condition",
            callBack: function callBack(state, dispatch) {
              (0, _newRegistration.showHideAddHospitalDialog)(state, dispatch);
            }
          }
        }
      }
    }
  })
});