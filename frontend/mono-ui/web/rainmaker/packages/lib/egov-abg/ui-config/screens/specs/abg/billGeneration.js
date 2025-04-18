"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _billGensearch = require("./billGenerationResource/billGensearch");

var _searchResults = require("./billGenerationResource/searchResults");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var header = (0, _utils.getCommonHeader)({
  labelName: "Generate Bill",
  labelKey: "ABG_COMMON_HEADER"
});
//   import { getQueryArg } from "egov-ui-framework/ui-utils/commons";


var billGenSearchAndResult = {
  uiFramework: "material-ui",
  name: "billGeneration",
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Form",
      props: {
        className: "common-div-css",
        id: "billGeneration"
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
        billGenSearchCard: _billGensearch.billGenSearchCard,
        breakAfterSearch: (0, _utils.getBreak)(),
        searchResults: _searchResults.searchResults
      }
    }
  }
};

exports.default = billGenSearchAndResult;