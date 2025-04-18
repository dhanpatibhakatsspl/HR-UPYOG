"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var formConfig = {
  name: "basicInformation",
  fields: {
    typeOfUsage: {
      id: "typeOfUsage",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "PT_TYPE_OF_USAGE",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      value: ""
    },
    typeOfBuilding: {
      id: "typeOfBuilding",
      jsonPath: "",
      type: "singleValueList",
      floatingLabelText: "PT_TYPE_OF_BUILDING",
      hintText: "PT_COMMONS_SELECT_PLACEHOLDER",
      value: ""
    }
  },
  action: "",
  redirectionRoute: "",
  saveUrl: "",
  isFormValid: false
};

exports.default = formConfig;