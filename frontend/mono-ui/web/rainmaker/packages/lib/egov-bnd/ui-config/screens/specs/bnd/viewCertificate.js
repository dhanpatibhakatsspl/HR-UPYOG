"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _utils2 = require("./../utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _birthCertDetailsCard = require("./birthCertDetailsCard");

var _deathCertDetailsCard = require("./deathCertDetailsCard");

var header = (0, _utils.getCommonHeader)({
  labelName: "Search Certificate",
  labelKey: "BND_BIRTH_SEARCH_DOWNLOAD"
}); //returns action object


var viewCertificate = {
  uiFramework: "material-ui",
  name: "viewCertificate",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {

    var tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
    var id = (0, _commons.getQueryArg)(window.location.href, "id");
    var birthcertificateno = (0, _commons.getQueryArg)(window.location.href, "birthcertificateno");
    var deathcertificateno = (0, _commons.getQueryArg)(window.location.href, "deathcertificateno");
    var module = (0, _commons.getQueryArg)(window.location.href, "module");

    var data = { tenantId: tenantId, id: id, birthcertificateno: birthcertificateno, deathcertificateno: deathcertificateno, module: module };

    (0, _utils2.loadCertDetails)(action, state, dispatch, data).then(function (response) {
      if (module == "birth" && response && response.BirthCertificate && response.BirthCertificate.length > 0) {
        dispatch((0, _actions.prepareFinalObject)("bnd.viewCertDetails", response.BirthCertificate[0]));
      } else if (module == "death" && response && response.DeathCertificate && response.DeathCertificate.length > 0) {
        dispatch((0, _actions.prepareFinalObject)("bnd.viewCertDetails", response.DeathCertificate[0]));
      }
    });

    return action;
  },

  components: {
    mainDiv: (0, _utils.getCommonCard)({
      caption2: (0, _utils.getCommonCaption)({
        labelName: "NOTE",
        labelKey: "BND_NOTE_VIEW_CERTIFICATE"
      }),
      divider1: (0, _utils.getDivider)(),
      header: (0, _utils.getCommonSubHeader)({
        labelName: "Certificate",
        labelKey: "BND_CERTIFICATE_DETAILS"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        visible: (0, _commons.getQueryArg)(window.location.href, "module") == "birth",
        props: {
          disableValidation: true
        },
        children: {
          details: (0, _birthCertDetailsCard.getBirthCertDetailsCard)("bnd.viewCertDetails")
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
          details: (0, _deathCertDetailsCard.getDeathCertDetailsCard)("bnd.viewCertDetails")
        }
      }
    })
  }
};

exports.default = viewCertificate;