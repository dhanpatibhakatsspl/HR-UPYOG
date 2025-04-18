"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var arrearsCard = (0, _utils.getCommonGrayCard)({

  arrearCard: {
    uiFramework: "custom-containers-local",
    componentPath: "ArrearsCardContainer",
    moduleName: "egov-common",
    props: {
      estimate: {}
    }
  }
});

exports.default = arrearsCard;