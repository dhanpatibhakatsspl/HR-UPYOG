"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.reviewModificationsEffective = exports.reviewModificationsEffectiveDate = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var reviewModificationsEffectiveDate = exports.reviewModificationsEffectiveDate = {
  reviewModification: (0, _utils.getLabelWithValueForModifiedLabel)({
    labelName: "Modifications Effective Date",
    labelKey: "WS_MODIFICATIONS_EFFECTIVE_DATE"
  }, {
    jsonPath: "WaterConnection[0].dateEffectiveFrom",
    callBack: _utils2.convertEpochToDateAndHandleNA
  }, {
    labelKey: "WS_OLD_LABEL_NAME"
  }, {
    jsonPath: "WaterConnectionOld[0].dateEffectiveFrom",
    callBack: _utils2.convertEpochToDateAndHandleNA
  }) };

var reviewModificationsEffective = exports.reviewModificationsEffective = function reviewModificationsEffective() {
  return (0, _utils.getCommonGrayCard)({
    headerDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Container",
      props: {
        style: { marginBottom: "10px" }
      },
      children: {
        header: (0, _extends3.default)({
          gridDefination: {
            xs: 12,
            sm: 10
          }
        }, (0, _utils.getCommonSubHeader)({
          labelKey: "WS_MODIFICATIONS_EFFECTIVE_FROM"
        }))
      }
    },
    viewOne: modificationsEffectiveDateDetails
  });
};

var modificationsEffectiveDateDetails = (0, _utils.getCommonContainer)(reviewModificationsEffectiveDate);