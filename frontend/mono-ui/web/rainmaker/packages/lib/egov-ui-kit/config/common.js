"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var commonConfig = {
  MAP_API_KEY: globalConfigExists() ? window.globalConfigs.getConfig("GMAPS_API_KEY") : process.env.REACT_APP_GMAPS_API_KEY,
  tenantId: globalConfigExists() ? window.globalConfigs.getConfig("STATE_LEVEL_TENANT_ID") : process.env.REACT_APP_DEFAULT_TENANT_ID,
  forgotPasswordTenant: "pb.amritsar",
  singleInstance: globalConfigExists() ? window.globalConfigs.getConfig("ENABLE_SINGLEINSTANCE") || false : false
};

function globalConfigExists() {
  return typeof window.globalConfigs !== "undefined" && typeof window.globalConfigs.getConfig === "function";
}

exports.default = commonConfig;
var screenConfigPaths = exports.screenConfigPaths = {
  pgrCitizenConfigPath: "pgr-citizen/config/forms/specs/"
};