'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.showSearches = undefined;

var _utils = require('egov-ui-framework/ui-config/screens/specs/utils');

var _employeeApplication = require('./employeeApplication');

var _searchApplications = require('./searchApplications');

var showSearches = exports.showSearches = (0, _utils.getCommonContainer)({
  showSearchScreens: {
    uiFramework: "custom-containers-local",
    moduleName: "egov-wns",
    componentPath: "CustomTabContainer",
    props: {
      tabs: [{
        tabButton: { labelName: "SEARCH CONNECTIONS", labelKey: "WS_SEARCH_CONNECTIONS" },
        tabContent: { wnsApplication: _employeeApplication.wnsApplication }
      }, {
        tabButton: { labelName: "SEARCH APPLICATIONS", labelKey: "WS_SEARCH_APPLICATIONS" },
        tabContent: { searchApplications: _searchApplications.searchApplications }
      }],
      tabIndex: 0
    },
    type: "array"
  }
});