"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFullDeathCertDetailsCard = exports.getAddressForm = exports.getPersonDetailsForm = undefined;

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _constants = require("./../../../../ui-utils/constants");

var _utils2 = require("../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var addSpace = function addSpace(data) {
  return "" + (0, _utils.checkValueForNA)(data);
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

var getPersonDetailsForm = exports.getPersonDetailsForm = function getPersonDetailsForm(type, inJsonPath) {
  return (0, _utils.getCommonContainer)({
    firstName: (0, _utils.getLabelWithValue)({
      labelName: "BND_FIRSTNAME_LABEL",
      labelKey: "BND_FIRSTNAME_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".firstname"),
      callBack: checkNoData
    }),
    middlename: (0, _utils.getLabelWithValue)({
      labelName: "BND_MIDDLENAME_LABEL",
      labelKey: "BND_MIDDLENAME_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".middlename"),
      callBack: checkNoData
    }),
    lastname: (0, _utils.getLabelWithValue)({
      labelName: "BND_LASTNAME_LABEL",
      labelKey: "BND_LASTNAME_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".lastname"),
      callBack: checkNoData
    }),
    aadharNo: (0, _utils.getLabelWithValue)({
      labelName: "BND_AADHAR_NO",
      labelKey: "BND_AADHAR_NO"
    }, {
      jsonPath: inJsonPath + ("." + type + ".aadharno"),
      callBack: checkNoData
    }),
    emailId: (0, _utils.getLabelWithValue)({
      labelName: "BND_EMAIL_ID",
      labelKey: "BND_EMAIL_ID"
    }, {
      jsonPath: inJsonPath + ("." + type + ".emailid"),
      callBack: checkNoData
    }),
    mobNo: (0, _utils.getLabelWithValue)({
      labelName: "CORE_COMMON_MOBILE_NUMBER",
      labelKey: "CORE_COMMON_MOBILE_NUMBER"
    }, {
      jsonPath: inJsonPath + ("." + type + ".mobileno"),
      callBack: checkNoData
    })
  });
};

var getAddressForm = exports.getAddressForm = function getAddressForm(type, inJsonPath) {
  return (0, _utils.getCommonContainer)({
    buildingNo: (0, _utils.getLabelWithValue)({
      labelName: "BND_BUILDINGNO_LABEL",
      labelKey: "BND_BUILDINGNO_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".buildingno"),
      callBack: checkNoData
    }),
    houseNo: (0, _utils.getLabelWithValue)({
      labelName: "BND_HOUSENO_LABEL",
      labelKey: "BND_HOUSENO_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".houseno"),
      callBack: checkNoData
    }),
    streetname: (0, _utils.getLabelWithValue)({
      labelName: "BND_STREETNAME_LABEL",
      labelKey: "BND_STREETNAME_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".streetname"),
      callBack: checkNoData
    }),
    locality: (0, _utils.getLabelWithValue)({
      labelName: "BND_LOCALITY_LABEL",
      labelKey: "BND_LOCALITY_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".locality"),
      callBack: checkNoData
    }),
    tehsil: (0, _utils.getLabelWithValue)({
      labelName: "BND_TEHSIL_LABEL",
      labelKey: "BND_TEHSIL_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".tehsil"),
      callBack: checkNoData
    }),
    district: (0, _utils.getLabelWithValue)({
      labelName: "BND_DISTRICT_LABEL",
      labelKey: "BND_DISTRICT_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".district"),
      callBack: checkNoData
    }),
    city: (0, _utils.getLabelWithValue)({
      labelName: "BND_CITY_LABEL",
      labelKey: "BND_CITY_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".city"),
      callBack: checkNoData
    }),
    state: (0, _utils.getLabelWithValue)({
      labelName: "BND_STATE_LABEL",
      labelKey: "BND_STATE_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".state"),
      callBack: checkNoData
    }),
    pinno: (0, _utils.getLabelWithValue)({
      labelName: "BND_PINNO_LABEL",
      labelKey: "BND_PINNO_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".pinno"),
      callBack: checkNoData
    }),
    country: (0, _utils.getLabelWithValue)({
      labelName: "BND_COUNTRY_LABEL",
      labelKey: "BND_COUNTRY_LABEL"
    }, {
      jsonPath: inJsonPath + ("." + type + ".country"),
      callBack: checkNoData
    })
  });
};

var getFullDeathCertDetailsCard = exports.getFullDeathCertDetailsCard = function getFullDeathCertDetailsCard(inJsonPath) {
  return (0, _utils.getCommonCard)({
    header: (0, _utils.getCommonTitle)({
      labelName: "",
      labelKey: "BND_REGISTRATION"
    }, {
      style: {
        marginBottom: 18
      }
    }),
    editButton: {
      componentPath: "Button",
      props: {
        variant: "contained",
        color: "primary",
        style: {
          minWidth: "50px",
          height: "30px",
          float: "right",
          borderRadius: "inherit"
        }
      },
      visible: false,
      children: {
        previousButtonLabel: (0, _utils.getLabel)({
          labelName: "Previous Step",
          labelKey: "CORE_COMMON_EDIT"
        })
      },

      onClickDefination: {
        action: "condition",
        callBack: function callBack(state, dispatch) {
          var newRegData = _.clone((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.viewFullCertDetails", []), true);
          var id = newRegData["id"];
          var applyUrl = "/death-employee/newRegistration?action=EDIT&certificateId=" + id + "&module=death";
          dispatch((0, _actions.setRoute)(applyUrl));
        }
      }
    },
    registrationInfo: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_REGISTRATION"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      registrationInfoCont: (0, _utils.getCommonContainer)({
        registrationNo: (0, _utils.getLabelWithValue)({
          labelName: "BND_REG_NO_LABEL",
          labelKey: "BND_REG_NO_LABEL"
        }, {
          jsonPath: inJsonPath + ".registrationno",
          callBack: checkNoData
        }),
        hospitalName: (0, _utils.getLabelWithValue)({
          labelName: "BND_HOSPITALNAME_LABEL",
          labelKey: "BND_HOSPITALNAME_LABEL"
        }, {
          jsonPath: inJsonPath + ".hospitalname",
          callBack: checkNoData
        }),
        dateOfRegistration: (0, _utils.getLabelWithValue)({
          labelName: "BND_DOR",
          labelKey: "BND_DOR"
        }, {
          jsonPath: inJsonPath + ".dateofreport",
          callBack: _utils2.convertEpochToDateWithTimeIST
        })
      })
    }),
    childInfo: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_INFO_OF_DECEASED"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      infoOfChild: (0, _utils.getCommonContainer)({
        dob: (0, _utils.getLabelWithValue)({
          labelName: "BND_DEATH_DOB",
          labelKey: "BND_DEATH_DOB"
        }, {
          jsonPath: inJsonPath + ".dateofdeath",
          callBack: _utils2.convertEpochToDateWithTimeIST
        }),
        gender: (0, _utils.getLabelWithValue)({
          labelName: "BND_GENDER",
          labelKey: "BND_GENDER"
        }, {
          jsonPath: inJsonPath + ".genderStr",
          callBack: checkNoData
        }),
        firstName: (0, _utils.getLabelWithValue)({
          labelName: "BND_FIRSTNAME_LABEL",
          labelKey: "BND_FIRSTNAME_LABEL"
        }, {
          jsonPath: inJsonPath + ".firstname",
          callBack: checkNoData
        }),
        middlename: (0, _utils.getLabelWithValue)({
          labelName: "BND_MIDDLENAME_LABEL",
          labelKey: "BND_MIDDLENAME_LABEL"
        }, {
          jsonPath: inJsonPath + ".middlename",
          callBack: checkNoData
        }),
        lastname: (0, _utils.getLabelWithValue)({
          labelName: "BND_LASTNAME_LABEL",
          labelKey: "BND_LASTNAME_LABEL"
        }, {
          jsonPath: inJsonPath + ".lastname",
          callBack: checkNoData
        }),
        eidNo: (0, _utils.getLabelWithValue)({
          labelName: "BND_EIDNO",
          labelKey: "BND_EIDNO"
        }, {
          jsonPath: inJsonPath + ".eidno",
          callBack: checkNoData
        }),
        aadharNo: (0, _utils.getLabelWithValue)({
          labelName: "BND_AADHAR_NO",
          labelKey: "BND_AADHAR_NO"
        }, {
          jsonPath: inJsonPath + ".aadharno",
          callBack: checkNoData
        }),
        nationality: (0, _utils.getLabelWithValue)({
          labelName: "BND_NATIONALITY",
          labelKey: "BND_NATIONALITY"
        }, {
          jsonPath: inJsonPath + ".nationality",
          callBack: checkNoData
        }),
        religion: (0, _utils.getLabelWithValue)({
          labelName: "BND_RELIGION",
          labelKey: "BND_RELIGION"
        }, {
          jsonPath: inJsonPath + ".religion",
          callBack: checkNoData
        })
      })
    }),
    placeInfo: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_DEATH_PLACE"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      placeOfDeath: (0, _utils.getCommonContainer)({
        firstName: (0, _utils.getLabelWithValue)({
          labelName: "BND_DEATH_PLACE",
          labelKey: "BND_DEATH_PLACE"
        }, {
          jsonPath: inJsonPath + ".placeofdeath",
          callBack: checkNoData
        }),
        icdCode: (0, _utils.getLabelWithValue)({
          labelName: "BND_ICDCODE",
          labelKey: "BND_ICDCODE"
        }, {
          jsonPath: inJsonPath + ".icdcode",
          callBack: checkNoData
        })
      })
    }),
    spouseInfo: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_SPOUSES_INFO"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      spouseInfo: getPersonDetailsForm("deathSpouseInfo", inJsonPath)
    }),
    fathersInfo: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_FATHERS_INFO"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      fathersInfo: getPersonDetailsForm("deathFatherInfo", inJsonPath)
    }),
    mothersInfo: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_MOTHERS_INFO"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      mothersInfo: getPersonDetailsForm("deathMotherInfo", inJsonPath)
    }),
    addrTimeOfDeath: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_PRESENT_ADDR_DURING_DEATH"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      addrTimeOfDeath: getAddressForm("deathPresentaddr", inJsonPath)
    }),
    permAddressofParents: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_DEATH_ADDR_PERM"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      permAddressofParents: getAddressForm("deathPermaddr", inJsonPath)
    }),
    informantsInfo: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_INFORMANTS_INFO"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      informantInfo: (0, _utils.getCommonContainer)({
        informantName: (0, _utils.getLabelWithValue)({
          labelName: "CORE_COMMON_NAME",
          labelKey: "CORE_COMMON_NAME"
        }, {
          jsonPath: inJsonPath + ".informantsname",
          callBack: checkNoData
        }),
        informantsAddress: (0, _utils.getLabelWithValue)({
          labelName: "BND_ADDRESS",
          labelKey: "BND_ADDRESS"
        }, {
          jsonPath: inJsonPath + ".informantsaddress",
          callBack: checkNoData
        })
      })
    }),
    remarksInfo: (0, _utils.getCommonGrayCard)({
      header: (0, _utils.getCommonSubHeader)({
        labelName: "",
        labelKey: "BND_REMARKS_LABEL"
      }, {
        style: {
          marginBottom: 18
        }
      }),
      informantInfo: (0, _utils.getCommonContainer)({
        remarks: (0, _utils.getLabelWithValue)({
          labelName: "BND_REMARKS_LABEL",
          labelKey: "BND_REMARKS_LABEL"
        }, {
          jsonPath: inJsonPath + ".remarks",
          callBack: checkNoData
        })
      })
    })
  });
};