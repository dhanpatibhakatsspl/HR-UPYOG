"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("./../utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _fullBirthCertDetailsCard = require("./fullBirthCertDetailsCard");

var _fullDeathCertDetailsCard = require("./fullDeathCertDetailsCard");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
}; //returns action object
var footer = exports.footer = getCommonApplyFooter({
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className: "submit-btn leaseApplicationSubmitButton",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit"
      }
    },
    children: {
      previousButtonLabel: (0, _utils.getLabel)({
        labelName: "Previous Step",
        labelKey: "CORE_COMMON_EDIT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        var module = (0, _commons.getQueryArg)(window.location.href, "module");
        var newRegData = _.clone((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.viewFullCertDetails", []), true);
        var id = newRegData["id"];
        var applyUrl = "/" + module + "-employee/newRegistration?action=EDIT&certificateId=" + id + "&module=" + module;
        dispatch((0, _actions2.setRoute)(applyUrl));
      }
    },
    visible: (0, _utils2.ifUserRoleExists)("BIRTH_APPLICATION_EDITOR") || (0, _utils2.ifUserRoleExists)("DEATH_APPLICATION_EDITOR")
  }
});

var header = (0, _utils.getCommonHeader)({
  labelName: "Search Certificate",
  labelKey: "BND_BIRTH_SEARCH_DOWNLOAD"
});

var fullViewCertificate = {
  uiFramework: "material-ui",
  name: "fullViewCertificate",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var id = (0, _commons.getQueryArg)(window.location.href, "certificateId");
    var module = (0, _commons.getQueryArg)(window.location.href, "module");

    var data = { tenantId: tenantId, id: id, module: module };

    (0, _utils2.loadFullCertDetails)(action, state, dispatch, data).then(function (response) {
      //response = {BirthCertificate:[{"birthFatherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"birthMotherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"birthPresentaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"birthPermaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"registrationno":"test","hospitalname":"VAIJAYANTI HOSPITAL","dateofreportepoch":"2021-03-16","dateofbirthepoch":"2021-03-11","genderStr":"Male","firstname":"TEst","middlename":"TEst","lastname":"TEst","placeofbirth":"TEst","informantsname":"TEst","informantsaddress":"TEst","remarks":"asdf"}]};
      //response = {DeathCertificate:[{"deathFatherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"deathMotherInfo":{"firstname":"TEst","middlename":"TEst","lastname":"TEst","aadharno":"111111111111","emailid":"test@test.com","mobileno":"9444444444","education":"TEst","profession":"TEst","nationality":"TEst","religion":"TEst"},"deathPresentaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"deathPermaddr":{"buildingno":"TEst","houseno":"TEst","streetname":"TEst","locality":"TEst","tehsil":"TEst","district":"TEst","city":"TEst","state":"TEst","pinno":"512465","country":"TEst"},"registrationno":"test","hospitalname":"VAIJAYANTI HOSPITAL","dateofreportepoch":"2021-03-16","dateofdeathepoch":"2021-03-11","genderStr":"Male","firstname":"TEst","middlename":"TEst","lastname":"TEst","placeofdeath":"TEst","informantsname":"TEst","informantsaddress":"TEst","remarks":"asdf"}]};
      if (module == "birth" && response && response.BirthCertificate && response.BirthCertificate.length > 0) {
        dispatch((0, _actions.prepareFinalObject)("bnd.viewFullCertDetails", response.BirthCertificate[0]));
      } else if (module == "death" && response && response.DeathCertificate && response.DeathCertificate.length > 0) {
        dispatch((0, _actions.prepareFinalObject)("bnd.viewFullCertDetails", response.DeathCertificate[0]));
      }
    });

    return action;
  },

  components: {
    div1: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      visible: (0, _commons.getQueryArg)(window.location.href, "module") == "birth",
      props: {
        disableValidation: true
      },
      children: {
        details: (0, _fullBirthCertDetailsCard.getFullBirthCertDetailsCard)("bnd.viewFullCertDetails")
      }
    },
    div2: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      visible: (0, _commons.getQueryArg)(window.location.href, "module") == "death",
      props: {
        disableValidation: true
      },
      children: {
        details: (0, _fullDeathCertDetailsCard.getFullDeathCertDetailsCard)("bnd.viewFullCertDetails")
      }
    },
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        details: footer
      }
    }
  }
};

exports.default = fullViewCertificate;