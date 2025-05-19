"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _BirthIcon = require("../../../../ui-atoms-local/Icons/BirthIcon");

var _BirthIcon2 = _interopRequireDefault(_BirthIcon);

var _GetCertIcon = require("../../../../ui-atoms-local/Icons/GetCertIcon");

var _GetCertIcon2 = _interopRequireDefault(_GetCertIcon);

var _HelpIcon = require("../../../../ui-atoms-local/Icons/HelpIcon");

var _HelpIcon2 = _interopRequireDefault(_HelpIcon);

require("../utils/index.css");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import { cityPicker } from "./citypicker";
var header = (0, _utils.getCommonHeader)({
  labelName: "Lams",
  labelKey: "BND_BIRTH_COMMON"
}, {
  classes: {
    root: "common-header-cont"
  }
});

var cardItems = [{
  label: {
    labelKey: "BND_BIRTH_APPLY_CERT",
    labelName: "Apply for Certificate"
  },
  icon: _react2.default.createElement(_GetCertIcon2.default, null),
  route: "../birth-common/getCertificate"
}, {
  label: {
    labelKey: "BND_MY_REQUESTS",
    labelName: "My Applications"
  },
  icon: _react2.default.createElement(_BirthIcon2.default, null),
  route: "../birth-citizen/myApplications"
}];

var tradeLicenseSearchAndResult = {
  uiFramework: "material-ui",
  name: "home",
  beforeInitScreen: function beforeInitScreen(action, state, dispatch) {
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
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
          // listCard: {
          //   uiFramework: "custom-molecules-local",
          //   moduleName: "egov-tradelicence",
          //   componentPath: "HowItWorks"
          // }
        } }
    }

    // cityPickerDialog: {
    //   componentPath: "Dialog",
    //   props: {
    //     open: false,
    //     maxWidth: "md"
    //   },
    //   children: {
    //     dialogContent: {
    //       componentPath: "DialogContent",
    //       props: {
    //         classes: {
    //           root: "city-picker-dialog-style"
    //         }
    //         // style: { minHeight: "180px", minWidth: "365px" }
    //       },
    //       children: {
    //         popup: cityPicker
    //       }
    //     }
    //   }
    // },
    // adhocDialog: {
    //   uiFramework: "custom-containers",
    //   componentPath: "DialogContainer",
    //   props: {
    //     open: false,
    //     maxWidth: false,
    //     screenKey: "home"
    //   },
    //   children: {
    //     popup: {}
    //   }
    // }
  }
};

exports.default = tradeLicenseSearchAndResult;