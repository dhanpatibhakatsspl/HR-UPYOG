"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getBirthCertDetailsCard = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _constants = require("./../../../../ui-utils/constants");

var _utils2 = require("../utils");

var addSpace = function addSpace(data) {
  return "" + (0, _utils.checkValueForNA)(data);;
};

var addMoneySuffix = function addMoneySuffix(data) {
  data = (0, _utils.checkValueForNA)(data);
  return data === "NA" ? data : data + " /-";
};

var checkNoData = function checkNoData(data) {
  data = (0, _utils.checkValueForNA)(data);
  return data === "NA" ? "-" : data;
};

var getGenderStr = function getGenderStr(data) {
  data = (0, _utils.checkValueForNA)(data);
  data = data != "NA" ? _constants.genderValues[data] : data;
  return data;
};

var getBirthCertDetailsCard = exports.getBirthCertDetailsCard = function getBirthCertDetailsCard(inJsonPath) {

  return (0, _utils.getCommonGrayCard)({

    // value2: getCommonValue({
    //   jsonPath: inJsonPath + ".detailsAndMutDate",
    //   callBack: addSpace
    // }),
    certDetailsContainer: (0, _utils.getCommonContainer)({
      name: (0, _utils.getLabelWithValue)({
        labelName: "Name",
        labelKey: "BND_NAME_LABEL"
      }, {
        jsonPath: inJsonPath + ".fullName",
        callBack: checkNoData
      }),
      genderStr: (0, _utils.getLabelWithValue)({
        labelName: "Gender",
        labelKey: "BND_GENDER_LABEL"
      }, {
        jsonPath: inJsonPath + ".genderStr"
        //callBack: getGenderStr
      })
    }),
    //divider1: getDivider(),
    certDetailsContainer2: (0, _utils.getCommonContainer)({
      dob: (0, _utils.getLabelWithValue)({
        labelName: "Date of Birth",
        labelKey: "BND_DOB_LABEL"
      }, {
        jsonPath: inJsonPath + ".dateofbirth",
        callBack: _utils2.convertEpochToDateWithTimeIST
      }),
      placeOfBirth: (0, _utils.getLabelWithValue)({
        labelName: "Place of Birth",
        labelKey: "BND_BIRTH_LABEL"
      }, {
        jsonPath: inJsonPath + ".placeofbirth",
        callBack: checkNoData
      })
    }),
    //divider2: getDivider(),
    certDetailsContainer3: (0, _utils.getCommonContainer)({
      nameOfMother: (0, _utils.getLabelWithValue)({
        labelName: "Name of Mother",
        labelKey: "BND_MOTHER_NAME_LABEL"
      }, {
        jsonPath: inJsonPath + ".birthMotherInfo.fullName",
        callBack: checkNoData
      }),
      nameOfFather: (0, _utils.getLabelWithValue)({
        labelName: "Name of Father",
        labelKey: "BND_FATHER_NAME_LABEL"
      }, {
        jsonPath: inJsonPath + ".birthFatherInfo.fullName",
        callBack: checkNoData
      })
    }, {
      style: {
        overflow: "visible"
      }
    }),
    divider2: (0, _utils.getDivider)(),
    // certDetailsContainer4: getCommonContainer(
    //   {
    //     mothersUid: getLabelWithValue(
    //       {
    //         labelName: "Mother's Aadhar No",
    //         labelKey: "Mother's Aadhar No"
    //       },
    //       {
    //         jsonPath: inJsonPath + ".birthMotherInfo.aadharno",
    //         //callBack: checkNoData
    //       }
    //     ),
    //     fathersUid: getLabelWithValue(
    //       {
    //         labelName: "Father's Aadhar No",
    //         labelKey: "Father's Aadhar No"
    //       },
    //       {
    //         jsonPath: inJsonPath + ".birthFatherInfo.aadharno",
    //         //callBack: checkNoData
    //       }
    //     ),
    //   },
    //   {
    //     style: {
    //       overflow: "visible"
    //     }
    //   }
    // ),
    //divider4: getDivider(),
    certDetailsContainer6: (0, _utils.getCommonContainer)({
      presentAddr: (0, _utils.getLabelWithValue)({
        labelName: "ADDRESS OF PARENTS AT THE TIME OF BIRTH OF THE CHILD",
        labelKey: "BND_ADDRESS_OF_PARENTS_TIME_BIRTH"
      }, {
        jsonPath: inJsonPath + ".birthPresentaddr.fullAddress",
        callBack: checkNoData
      }),
      permenantAddr: (0, _utils.getLabelWithValue)({
        labelName: "PERMANENT ADDRESS OF THE PARENTS",
        labelKey: "BND_ADDRESS_OF_PARENTS"
      }, {
        jsonPath: inJsonPath + ".birthPermaddr.fullAddress",
        callBack: checkNoData
      })
    }, {
      style: {
        overflow: "visible"
      }
    }),
    divider5: (0, _utils.getDivider)(),
    certDetailsContainer7: (0, _utils.getCommonContainer)({
      registrationNo: (0, _utils.getLabelWithValue)({
        labelName: "Registration Number",
        labelKey: "BND_REGISTRATION_NUMBER"
      }, {
        jsonPath: inJsonPath + ".registrationno",
        callBack: checkNoData
      }),
      dateOfRegistration: (0, _utils.getLabelWithValue)({
        labelName: "Date of Registration",
        labelKey: "BND_DATE_REGISTRATION"
      }, {
        jsonPath: inJsonPath + ".dateofreport",
        callBack: _utils2.convertEpochToDateWithTimeIST
      })
    }, {
      style: {
        overflow: "visible"
      }
    }),
    divider6: (0, _utils.getDivider)(),
    certDetailsContainer8: (0, _utils.getCommonContainer)({
      dateOfIssue: (0, _utils.getLabelWithValue)({
        labelName: "Date of Issue",
        labelKey: "BND_DATE_ISSUE"
      }, {
        jsonPath: inJsonPath + ".dateofissue",
        callBack: _utils2.convertEpochToDateWithTimeIST
      })
    }, {
      style: {
        overflow: "visible"
      }
    })
  });
};