"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _notificationSearch = require("./notificationResource/notificationSearch");

var _searchResults = require("./notificationResource/searchResults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "Notification",
  labelKey: "ABG_COMMON_NOC"
});

var notificationSearchAndResult = {
  uiFramework: "material-ui",
  name: "notification",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "notification"
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
        NotificationSearchCard: _notificationSearch.NotificationSearchCard,
        breakAfterSearch: (0, _utils.getBreak)(),
        // progressStatus,
        searchResults: _searchResults.searchResults

      }
    }
  }
};

exports.default = notificationSearchAndResult;