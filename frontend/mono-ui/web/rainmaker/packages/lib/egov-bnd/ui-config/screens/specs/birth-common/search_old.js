"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.header = exports.formwizardFourthStep = exports.formwizardThirdStep = exports.formwizardSecondStep = exports.formwizardFirstStep = exports.stepper = exports.stepsData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var stepsData = exports.stepsData = [{ labelName: "Trade Details", labelKey: "TL_COMMON_TR_DETAILS" }, { labelName: "Owner Details", labelKey: "TL_COMMON_OWN_DETAILS" }, { labelName: "Documents", labelKey: "TL_COMMON_DOCS" }, { labelName: "Summary", labelKey: "TL_COMMON_SUMMARY" }];

var stepper = exports.stepper = (0, _utils.getStepperObject)({ props: { activeStep: 0 } }, stepsData);

var formwizardFirstStep = exports.formwizardFirstStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form1"
  },
  children: {}
};

var formwizardSecondStep = exports.formwizardSecondStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form2"
  },
  children: {},
  visible: false
};

var formwizardThirdStep = exports.formwizardThirdStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form3"
  },
  children: {},
  visible: false
};

var formwizardFourthStep = exports.formwizardFourthStep = {
  uiFramework: "custom-atoms",
  componentPath: "Form",
  props: {
    id: "apply_form4"
  },
  children: {},
  visible: false
};

var header = exports.header = (0, _utils.getCommonContainer)({
  header: (0, _utils.getCommonHeader)({
    labelName: 'Apply for New Trade License',
    labelKey: "APPLY"
  }),
  applicationNumber: {
    uiFramework: "custom-atoms-local",
    moduleName: "egov-tradelicence",
    componentPath: "ApplicationNoContainer",
    props: {
      number: "NA"
    },
    visible: false
  }
});

var screenConfig = {
  uiFramework: "material-ui",
  name: "mihyLoginScreen",
  components: {
    mihyLoginGrid: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      children: {
        mihyEmptyRow: {
          uiFramework: "custom-atoms",
          componentPath: "Item",
          props: {
            sm: 4
          }
        },
        mihyLoginItem: {
          uiFramework: "custom-atoms",
          componentPath: "Item",
          props: {
            sm: 4,
            xs: 12
          },
          children: {

            headerDiv: {
              uiFramework: "custom-atoms",
              componentPath: "Container",
              children: {
                header: (0, _extends3.default)({
                  gridDefination: {
                    xs: 12,
                    sm: 10
                  }
                }, header)
              }
            },
            stepper: stepper,
            formwizardFirstStep: formwizardFirstStep,
            formwizardSecondStep: formwizardSecondStep,
            formwizardThirdStep: formwizardThirdStep,
            formwizardFourthStep: formwizardFourthStep,
            //footer,

            mihyLoginCard: (0, _utils.getCommonCardWithHeader)({
              mihyloginDiv: {
                uiFramework: "custom-atoms",
                componentPath: "Div",
                props: {
                  className: "text-center"
                },
                children: {
                  mihyLoginUsername: {
                    uiFramework: "custom-molecules",
                    componentPath: "TextfieldWithIcon",
                    props: {
                      label: "Email",
                      margin: "normal",
                      fullWidth: true,
                      autoFocus: true,
                      required: true,
                      iconObj: {
                        position: "end",
                        iconName: "email"
                      }
                    },
                    required: true,
                    jsonPath: "body.mihy.username",
                    pattern: "^([a-zA-Z0-9@.])+$"
                  },
                  mihyLoginPassword: {
                    uiFramework: "custom-molecules",
                    componentPath: "TextfieldWithIcon",
                    props: {
                      label: "Password",
                      type: "password",
                      margin: "normal",
                      fullWidth: true,
                      required: true,
                      iconObj: { position: "end", iconName: "lock" }
                    },
                    jsonPath: "body.mihy.password",
                    required: true,
                    pattern: "^([a-zA-Z0-9!])+$"
                  },
                  mihyBreakOne: {
                    uiFramework: "custom-atoms",
                    componentPath: "Break"
                  },
                  mihyBreakTwo: {
                    uiFramework: "custom-atoms",
                    componentPath: "Break"
                  },
                  mihyLoginButton: {
                    componentPath: "Button",
                    props: {
                      color: "primary",
                      fullWidth: true
                    },
                    children: {
                      mihyLoginButtonText: (0, _utils.getLabel)({ label: "Let's go" })
                      // onClickDefination:{
                      //   action:"submit",
                      //   method:"get",
                      //   endPoint:"afbc.com",
                      //   purpose:"authLogin",
                      //   redirectionUrl:"/"
                      // }
                    } }
                }
              }
            }, {
              mihyLoginHeader: {
                componentPath: "Typography",
                children: {
                  mihyLoginHeaderText: (0, _utils.getLabel)({ label: "Login" })
                },
                props: {
                  align: "center",
                  variant: "title",
                  style: {
                    color: "white"
                  }
                }
              }
            })
          }
        }
      }
    }
  }
};

exports.default = screenConfig;