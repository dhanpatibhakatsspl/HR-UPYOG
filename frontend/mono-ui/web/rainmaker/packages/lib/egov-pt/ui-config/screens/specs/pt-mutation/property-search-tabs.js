"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _mutationMethods = require("./mutation-methods");

// import "./index.css"

var propertySearchTabs = (0, _utils.getCommonCard)({
  // header: getCommonSubHeader(
  //   { labelName: "Capture Payment", labelKey: "NOC_PAYMENT_CAP_PMT" },
  //   {
  //     style: {
  //       marginBottom: "8px"
  //     }
  //   }
  // ),
  tabSection: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-pt",
    componentPath: "CustomTabContainer",
    props: {
      className: "ptTabs",
      tabs: [{
        tabButton: { labelName: "Search Property", labelKey: "PT_SEARCH_PROPERTY" },
        tabContent: { searchPropertyDetails: _mutationMethods.searchPropertyDetails }
      }, {
        tabButton: { labelName: "Search application", labelKey: "PT_SEARCH_APPLICATION" },
        tabContent: { searchApplicationDetails: _mutationMethods.searchApplicationDetails }
      }]
    },
    type: "array"
  }
});

exports.default = propertySearchTabs;