"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initLocalizationLabels = undefined;

var _commons = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var initLocalizationLabels = exports.initLocalizationLabels = function initLocalizationLabels(locale) {
  var localizationLabels = void 0;
  try {
    localizationLabels = (0, _localStorageUtils.getLocalization)("localization_" + locale);
    localizationLabels = JSON.parse(localizationLabels);
    localizationLabels = (0, _commons.transformLocalizationLabels)(localizationLabels);
  } catch (error) {
    localizationLabels = {};
  }

  return localizationLabels;
};