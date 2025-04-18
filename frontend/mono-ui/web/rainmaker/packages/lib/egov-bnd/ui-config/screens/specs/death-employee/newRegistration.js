"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showHideAddHospitalDialog = exports.showHideConfirmationPopup = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../utils");

var _addHospitalDialog = require("./addHospitalDialog");

var _newRegistrationCard = require("./newRegistrationCard");

var _newRegistrationConfirmDialog = require("./newRegistrationConfirmDialog");

var _newRegistrationFooter = require("./newRegistrationFooter");

require("./index.css");

var _lodash = require("lodash");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//returns action object
var header = (0, _utils.getCommonHeader)({
  labelName: "Search Certificate",
  labelKey: "ACTION_TEST_DEATH_CERTIFICATE"
});

var showHideConfirmationPopup = exports.showHideConfirmationPopup = function showHideConfirmationPopup(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["newRegistration"], "components.confirmationDialog.props.open", false);
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.confirmationDialog", "props.open", !toggle));
};

var showHideAddHospitalDialog = exports.showHideAddHospitalDialog = function showHideAddHospitalDialog(state, dispatch) {
  var toggle = (0, _get2.default)(state.screenConfiguration.screenConfig["newRegistration"], "components.hospitalDialog.props.open", false);
  dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.hospitalDialog", "props.open", !toggle));
};

var prepareEditScreenData = function prepareEditScreenData(action, state, dispatch, response) {
  setTimeout(function () {
    if (response.DeathCertificate[0].dateofdeath) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.deceasedInfo.children.cardContent.children.infoOfDeceased.children.dob", "props.value", (0, _utils2.convertEpochToDateCustom)(response.DeathCertificate[0].dateofdeath)));
    }
    if (response.DeathCertificate[0].dateofreport) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.registrationInfo.children.cardContent.children.registrationInfoCont.children.dateOfReporting", "props.value", (0, _utils2.convertEpochToDateCustom)(response.DeathCertificate[0].dateofreport)));
    }
    if (response.DeathCertificate[0].hospitalname) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newRegistration", "components.div2.children.details.children.cardContent.children.registrationInfo.children.cardContent.children.registrationInfoCont.children.hospitalName", "props.value", response.DeathCertificate[0].hospitalname));
    }
  }, 1);
};
var newRegistration = {
  uiFramework: "material-ui",
  name: "newRegistration",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var userAction = (0, _commons.getQueryArg)(window.location.href, "action");
    var id = (0, _commons.getQueryArg)(window.location.href, "certificateId");
    var module = (0, _commons.getQueryArg)(window.location.href, "module");
    dispatch((0, _actions.prepareFinalObject)("bnd", {}));
    (0, _utils2.loadHospitals)(action, state, dispatch, "death", (0, _localStorageUtils.getTenantId)()).then(function (response) {
      if (response && response.MdmsRes && response.MdmsRes["birth-death-service"] && response.MdmsRes["birth-death-service"].hospitalList) {
        var hptList = response.MdmsRes["birth-death-service"].hospitalList;
        var newList = [].concat((0, _toConsumableArray3.default)(hptList.filter(function (hos) {
          return hos.active;
        })), [{
          hospitalName: "Others"
        }]);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = newList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var hospital = _step.value;

            hospital.code = hospital.hospitalName;
            hospital.name = hospital.hospitalName;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        dispatch((0, _actions.prepareFinalObject)("bnd.allHospitals", newList));
      } else {
        dispatch((0, _actions.prepareFinalObject)("bnd.allHospitals", [{ code: "Others", name: "Others" }]));
      }
      if (userAction == "EDIT" && id && module) {
        (0, _lodash.set)(action.screenConfig, "components.div2.children.details.children.cardContent.children.registrationInfo.children.cardContent.children.registrationInfoCont.children.hospitalName.props.isDisabled", true);
        (0, _lodash.set)(action.screenConfig, "components.div2.children.details.children.cardContent.children.registrationInfo.children.cardContent.children.registrationInfoCont.children.registrationNo.props.disabled", true);
        (0, _utils2.loadFullCertDetails)(action, state, dispatch, {
          tenantId: (0, _localStorageUtils.getTenantId)(),
          id: id,
          module: module
        }).then(function (response) {
          if (response && response.DeathCertificate && response.DeathCertificate.length > 0) {
            dispatch((0, _actions.prepareFinalObject)("bnd.death.newRegistration", response.DeathCertificate[0]));
            dispatch((0, _actions.prepareFinalObject)("bnd.death.newRegistration.isLegacyRecord", response.DeathCertificate[0].isLegacyRecord));
            prepareEditScreenData(action, state, dispatch, response);
          }
        });
      } else {
        dispatch((0, _actions.prepareFinalObject)("bnd.death.newRegistration", {
          deathSpouseInfo: {},
          deathFatherInfo: {},
          deathMotherInfo: {},
          deathPresentaddr: {},
          deathPermaddr: {}
        }));
      }
    });

    return action;
  },
  components: {
    div2: {
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
        details: _newRegistrationCard.newRegistrationForm
      }
      //visible: process.env.REACT_APP_NAME === "Employee" ? true: false
    },
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css bnd-footer"
      },
      children: {
        details: _newRegistrationFooter.footer
      }
    },
    confirmationDialog: {
      componentPath: "Dialog",
      props: {
        open: false,
        maxWidth: "sm",
        disableValidation: true
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          props: {
            classes: {
              root: "city-picker-dialog-style"
            }
            // style: { minHeight: "180px", minWidth: "365px" }
          },
          children: {
            popup: _newRegistrationConfirmDialog.confirmationDialog
          }
        }
      }
    },
    hospitalDialog: {
      componentPath: "Dialog",
      props: {
        open: false,
        maxWidth: "sm",
        disableValidation: true
      },
      children: {
        dialogContent: {
          componentPath: "DialogContent",
          props: {
            classes: {
              root: "city-picker-dialog-style"
            }
            // style: { minHeight: "180px", minWidth: "365px" }
          },
          children: {
            popup: _addHospitalDialog.addHospitalDialog
          }
        }
      }
    }
  }
};

exports.default = newRegistration;