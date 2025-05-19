"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectionDetailsDownload = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _commons = require("../../../../../ui-utils/commons");

var _commons2 = require("egov-ui-framework/ui-utils/commons");

require("./index.css");

var callDownload = function callDownload(mode) {
  var val = [{ key: 'connectionNumber', value: (0, _commons2.getQueryArg)(window.location.href, "connectionNumber") }, { key: 'tenantId', value: (0, _commons2.getQueryArg)(window.location.href, "tenantId") }, { key: "searchType", value: "CONNECTION" }];
  (0, _commons.wsDownloadConnectionDetails)(val, mode);
};

var connectionDetailsDownload = exports.connectionDetailsDownload = (0, _utils2.getCommonApplyFooter)("RIGHT", {
  downloadButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "150px",
        height: "48px",
        marginRight: "10px"
      }
    },
    children: {
      downloadButton: (0, _utils.getLabel)({
        labelKey: "WS_COMMON_BUTTON_DOWNLOAD"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        callDownload("download");
      }
    }
  },
  payButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      style: {
        minWidth: "150px",
        height: "48px",
        marginRight: "10px"
      }
    },
    children: {
      printButton: (0, _utils.getLabel)({
        labelKey: "WS_COMMON_BUTTON_PRINT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        callDownload("print");
      }
    }
    // visible: false
  }
});