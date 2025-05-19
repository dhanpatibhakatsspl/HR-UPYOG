"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.transferorDetails = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var transferorDetails = exports.transferorDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Transferor Details",
    labelKey: "PT_MUTATION_TRANSFEROR_DETAILS"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  body: (0, _utils.getCommonContainer)({
    transferorName: (0, _utils.getLabelWithValue)({
      labelName: "Name",
      labelKey: "PT_MUTATION_TRANSFEROR_NAME"
    }, {
      jsonPath: "Property.owners[0].name",
      callBack: _utils2.checkValueForNA
      // callBack: value => {
      //   return value.split(".")[0];
      // }
    }),
    guardianName: (0, _utils.getLabelWithValue)({
      labelName: "Guardian's Name",
      labelKey: "PT_MUTATION_TRANSFEROR_GUARDIAN_NAME"
    }, {
      jsonPath: "Property.owners[0].fatherOrHusbandName",
      callBack: _utils2.checkValueForNA
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }),
    transferorGender: (0, _utils.getLabelWithValue)({
      labelName: "Gender",
      labelKey: "PT_MUTATION_TRANSFEROR_GENDER"
    }, {
      jsonPath: "Property.owners[0].gender",
      callBack: _utils2.checkValueForNA
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }),
    // transferorDOB: getLabelWithValue(
    //   {
    //     labelName: "Date Of Birth",
    //     labelKey: "PT_MUTATION_TRANSFEROR_DOB"
    //   },
    //   {
    //    // jsonPath: "Property.propertyDetails[0].owners[0].dob"
    //    jsonPath: "Property.propertyDetails[0].owners[0].dob",
    //     callBack: checkValueForNA
    //     }

    // ),
    transferorOwnerType: (0, _utils.getLabelWithValue)({
      labelName: "Type of Ownership",
      labelKey: "PT_FORM3_OWNERSHIP_TYPE"
    }, {
      jsonPath: "Property.ownershipCategory",
      callBack: _utils2.checkValueForNA
    }),
    transferorMobile: (0, _utils.getLabelWithValue)({
      labelName: "Mobile No.",
      labelKey: "PT_MUTATION_TRANSFEROR_MOBILE"
    }, {
      jsonPath: "Property.owners[0].mobileNumber",
      callBack: _utils2.checkValueForNA
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }), transferorAlterMobile: (0, _utils.getLabelWithValue)({
      labelName: "Mobile No.",
      labelKey: "PT_FORM3_ALT_MOBILE_NO"
    }, {
      jsonPath: "Property.owners[0].alternatemobilenumber",
      callBack: _utils2.checkValueForNA
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }),
    transferorEmail: (0, _utils.getLabelWithValue)({
      labelName: "Email",
      labelKey: "PT_MUTATION_TRANSFEROR_EMAIL"
    }, {
      jsonPath: "Property.owners[0].emailId",
      callBack: _utils2.checkValueForNA
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }),
    transferorSpecialCategory: (0, _utils.getLabelWithValue)({
      labelName: "Special Category",
      labelKey: "PT_MUTATION_TRANSFEROR_SPECIAL_CATEGORY"
    }, {
      jsonPath: "Property.owners[0].ownerType",
      callBack: _utils2.checkValueForNA
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    }),
    transferorCorrespondenceAddress: (0, _utils.getLabelWithValue)({
      labelName: "Correspondence Address",
      labelKey: "PT_MUTATION_TRANSFEROR_CORRESPONDENCE_ADDRESS"
    }, {
      jsonPath: "Property.owners[0].permanentAddress",
      callBack: _utils2.checkValueForNA
      // callBack: value => {
      //   return value.split(".")[1];
      // }
    })
  })
});