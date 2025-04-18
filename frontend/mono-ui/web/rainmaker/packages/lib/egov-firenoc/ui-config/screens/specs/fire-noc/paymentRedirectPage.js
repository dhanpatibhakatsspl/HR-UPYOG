"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var screenConfig = {
  uiFramework: "material-ui",
  name: "PaymentRedirectPage",

  components: {
    div: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-firenoc",
      componentPath: "PaymentRedirectPage",
      props: {
        className: "payment-redirect-page"
      }
    }
  }
};

exports.default = screenConfig;