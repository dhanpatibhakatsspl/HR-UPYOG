"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _functions = require("./functions");

var _FormIcon = require("../../../../ui-atoms-local/Icons/FormIcon");

var _FormIcon2 = _interopRequireDefault(_FormIcon);

var _EDCRIcon = require("../../../../ui-atoms-local/Icons/EDCRIcon");

var _EDCRIcon2 = _interopRequireDefault(_EDCRIcon);

var _utils2 = require("../utils");

require("../utils/index.css");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _commons = require("../../../../ui-utils/commons");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "eDCR Scrutiny",
  labelKey: "EDCR_CITIZEN_COMMON_TITLE"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var hideBPACard = function hideBPACard() {
  return (0, _utils2.ifUserRoleMatches)(["BPA_ARCHITECT", "BPA_ENGINEER", "BPA_BUILDER", "BPA_STRUCTURALENGINEER", "BPA_SUPERVISOR", "BPA_TOWNPLANNER"]);
};

var displayView = function displayView() {
  return hideBPACard() ? "my-applications" : "my-applications-stakeholder";
};

var cardItems = [{
  label: {
    labelKey: "EDCR_COMMON_APPL_NEW",
    labelName: "New Building Plan Scrutiny"
  },
  icon: _react2.default.createElement(_EDCRIcon2.default, null),
  route: "apply"
}, {
  label: {
    labelKey: "EDCR_COMMON_APPL_NEW_OC",
    labelName: "Occupancy Certificate eDCR Scrutiny For New Building"
  },
  icon: _react2.default.createElement(_EDCRIcon2.default, null),
  route: "ocapply"
}, {
  label: {
    labelKey: "BPA_MY_APPLICATIONS",
    labelName: "My Applications"
  },
  icon: _react2.default.createElement(_FormIcon2.default, null),
  route: displayView()
}];

var tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    var userInfo = JSON.parse((0, _localStorageUtils.getUserInfo)());
    var roles = (0, _get2.default)(userInfo, "roles");
    var stakeholerRoles = (0, _commons.getStakeHolderRoles)();
    var isStakeholder = false;
    if (roles && roles.length > 0) {
      roles.forEach(function (role) {
        if (stakeholerRoles.includes(role.code)) {
          isStakeholder = true;
        }
      });
    }
    if (isStakeholder) {
      (0, _set2.default)(action, "screenConfig.components.div.visible", true);
      (0, _functions.fetchData)(action, state, dispatch);
    }
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      visible: false,
      // props: {
      //   className: "common-div-css"
      // },
      children: {
        header: header,
        applyCard: {
          uiFramework: "custom-molecules",
          componentPath: "LandingPage",
          props: {
            items: cardItems,
            history: {}
          }
        }
      }
    }
  }
};

exports.default = tradeLicenseSearchAndResult;