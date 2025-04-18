"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.propertyOwnerDetails = exports.specialApplicantCategory = exports.correspondenceAddress = exports.relationship = exports.fatherName = exports.dateOfBirth = exports.gender = exports.email = exports.name = exports.mobileNumber = exports.propertyOwnerDetailsHeader = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getHeader = function getHeader(label) {
    return {
        uiFramework: "custom-molecules-local",
        moduleName: "egov-wns",
        componentPath: "DividerWithLabel",
        props: {
            className: "hr-generic-divider-label",
            labelProps: {},
            dividerProps: {},
            label: label
        },
        type: "array"
    };
};

var propertyOwnerDetailsHeader = exports.propertyOwnerDetailsHeader = getHeader({
    labelKey: "WS_TASK_PROP_OWN_HEADER"
});

var mobileNumber = exports.mobileNumber = (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_MOBILE_NO_LABEL"
}, { jsonPath: "WaterConnection[0].property.owners[0].mobileNumber" });

var name = exports.name = (0, _utils.getLabelWithValue)({
    labelName: "Name",
    labelKey: "WS_OWN_DETAIL_OWN_NAME_LABEL"
}, {
    jsonPath: "WaterConnection[0].property.owners[0].name"
});

var email = exports.email = (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_OWN_EMAIL_LABEL"
}, {
    jsonPath: "WaterConnection[0].property.owners[0].emailId"
});

var gender = exports.gender = (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_GENDER_LABEL"
}, {
    jsonPath: "WaterConnection[0].property.owners[0].gender",
    localePrefix: {
        moduleName: "COMMON",
        masterName: "GENDER"
    }
});

var dateOfBirth = exports.dateOfBirth = (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_DOB_LABEL"
}, {
    jsonPath: "WaterConnection[0].property.owners[0].dob",
    callBack: _utils2.convertEpochToDateAndHandleNA
});

var fatherName = exports.fatherName = (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_FATHER_OR_HUSBAND_NAME"
}, { jsonPath: "WaterConnection[0].property.owners[0].fatherOrHusbandName" });

var relationship = exports.relationship = (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_RELATION_LABEL"
}, { jsonPath: "WaterConnection[0].property.owners[0].relationship" });

var correspondenceAddress = exports.correspondenceAddress = (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_CROSADD"
}, { jsonPath: "WaterConnection[0].property.owners[0].correspondenceAddress" });

var specialApplicantCategory = exports.specialApplicantCategory = (0, _utils.getLabelWithValue)({
    labelKey: "WS_OWN_DETAIL_SPECIAL_APPLICANT_LABEL"
}, {
    jsonPath: "WaterConnection[0].property.owners[0].name"
});

var propertyOwnerDetails = exports.propertyOwnerDetails = function propertyOwnerDetails() {
    return (0, _utils.getCommonGrayCard)({
        headerDiv: (0, _extends3.default)({
            uiFramework: "custom-atoms",
            componentPath: "Container",
            props: {
                style: { marginBottom: "10px" }
            }
        }, propertyOwnerDetailsHeader),
        multiOwner: {
            uiFramework: "custom-containers",
            componentPath: "MultiItem",
            props: {
                scheama: (0, _utils.getCommonContainer)({
                    reviewOwnerAddr: (0, _utils.getLabelWithValue)({
                        labelName: "Corrospondence Address",
                        labelKey: "WS_OWN_DETAIL_CROSADD"
                    }, {
                        jsonPath: "WaterConnection[0].property.owners[0].name"
                    }),
                    mobileNumber: mobileNumber,
                    name: name,
                    gender: gender,
                    dateOfBirth: dateOfBirth,
                    email: email,
                    fatherName: fatherName,
                    relationship: relationship,
                    correspondenceAddress: correspondenceAddress,
                    specialApplicantCategory: specialApplicantCategory
                }),
                items: [],
                hasAddItem: false,
                sourceJsonPath: "WaterConnection[0].property.owners",
                prefixSourceJsonPath: "children.cardContent.children.scheama.children",
                afterPrefixJsonPath: "children.value.children.key"
            },
            type: "array"
        }
    });
};