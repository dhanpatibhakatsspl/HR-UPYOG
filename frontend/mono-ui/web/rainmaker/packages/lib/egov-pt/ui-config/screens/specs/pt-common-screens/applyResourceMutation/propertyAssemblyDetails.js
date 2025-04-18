"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.propertyAssemblyDetails = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rendersubUsageType = function rendersubUsageType(usageType, propType, dispatch, state) {
    var subTypeValues = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "searchScreenMdmsData.PropertyTax.subUsageType");
    var propertyType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.propertyType");
    var additionalDetailsJson = "components.div.children.formwizardFirstStep.children.propertyAssemblyDetails.children.cardContent.children.propertyAssemblyDetailsContainer.children.subUsageType";

    var subUsage = void 0;
    if (propertyType === "BUILTUP.SHAREDPROPERTY" || propertyType === "BUILTUP.INDEPENDENTPROPERTY") {
        if (usageType === "NONRESIDENTIAL.COMMERCIAL" || usageType === "NONRESIDENTIAL.INDUSTRIAL" || usageType === "NONRESIDENTIAL.INSTITUTIONAL") {
            dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', additionalDetailsJson, "visible", true));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', additionalDetailsJson, "props.visible", true));
            if (usageType === "MIXED") {
                subUsage = subTypeValues;
            } else {
                subUsage = subTypeValues.filter(function (cur) {
                    return cur.code.startsWith(usageType);
                });
            }
        } else {
            (0, _set2.default)(state.screenConfiguration.preparedFinalObject, "Property.subUsageCategory", "");
            dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', additionalDetailsJson, "visible", false));
            dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', additionalDetailsJson, "props.visible", false));
        }
    } else {
        (0, _set2.default)(state.screenConfiguration.preparedFinalObject, "Property.subUsageCategory", "");
        dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', additionalDetailsJson, "visible", false));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)('register-property', additionalDetailsJson, "props.visible", false));
    }

    //   if (propertyType === "BUILTUP.SHAREDPROPERTY") {
    //     dispatch(handleField('register-property', additionalDetailsJson, "required", true));
    //     dispatch(handleField('register-property', additionalDetailsJson, "props.required", true))

    //     if (usageType === "MIXED") {
    //       subUsage = subTypeValues;
    //     } else {
    //       subUsage = subTypeValues.filter(cur => {
    //         return (cur.code.startsWith(usageType))
    //       })
    //     }
    //   } else {
    //     subUsage = [];
    //     set(state.screenConfiguration.preparedFinalObject,"Property.subUsageCategory", "");
    //     dispatch(handleField('register-property', additionalDetailsJson, "required", false));
    //     dispatch(handleField('register-property', additionalDetailsJson, "props.required", false));
    //   }
    dispatch((0, _actions.prepareFinalObject)("propsubusagetypeForSelectedusageCategory", subUsage));
};

var propertyAssemblyDetails = exports.propertyAssemblyDetails = (0, _utils.getCommonCard)({
    header: (0, _utils.getCommonTitle)({
        labelName: "Property Assembly Details",
        labelKey: "PT_COMMON_PROPERTY_ASSEMBLY_DETAILS"
    }, {
        style: {
            marginBottom: 18
        }
    }),
    propertyAssemblyDetailsContainer: (0, _utils.getCommonContainer)({
        propertyType: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-pt",
            componentPath: "AutosuggestContainer",
            jsonPath: "Property.propertyType",
            props: {
                className: "hr-generic-selectfield autocomplete-dropdown",
                localePrefix: {
                    moduleName: "COMMON",
                    masterName: "PROPTYPE"
                },
                label: {
                    labelName: "Property Type",
                    labelKey: "PT_COMMON_PROPERTY_TYPE"
                },
                placeholder: {
                    labelName: "Select Property Type",
                    labelKey: "PT_COMMON_PROPERTY_TYPE_PLACEHOLDER"
                },
                required: true,
                isClearable: true,
                labelsFromLocalisation: true,
                jsonPath: "Property.propertyType",
                sourceJsonPath: "searchScreenMdmsData.PropertyTax.PropertyType"
            },
            required: true,
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            },
            afterFieldChange: function () {
                var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
                    var usageType;
                    return _regenerator2.default.wrap(function _callee$(_context) {
                        while (1) {
                            switch (_context.prev = _context.next) {
                                case 0:
                                    usageType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.usageCategory");
                                    // if (usageType) {

                                    rendersubUsageType(usageType, action.value, dispatch, state);
                                    // }

                                case 2:
                                case "end":
                                    return _context.stop();
                            }
                        }
                    }, _callee, undefined);
                }));

                return function afterFieldChange(_x, _x2, _x3) {
                    return _ref.apply(this, arguments);
                };
            }()
        },
        totalLandArea: (0, _utils.getTextField)({
            label: {
                labelName: "Total Land Area",
                labelKey: "PT_COMMON_TOTAL_LAND_AREA"
            },
            props: {},
            placeholder: {
                labelName: "Select Total Land Area",
                labelKey: "PT_COMMON_TOTAL_LAND_AREA_PLACEHOLDER"
            },
            required: true,
            pattern: /^[0-9]\d{0,9}(\.\d{1,3})?%?$/,
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
            jsonPath: "Property.landArea"
        }),
        totalConstructedArea: (0, _utils.getTextField)({
            label: {
                labelName: "Total Constructed Area",
                labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA"
            },
            props: {},
            placeholder: {
                labelName: "Enter Total Constructed Area",
                labelKey: "PT_COMMON_TOTAL_CONSTRUCTED_AREA_PLACEHOLDER"
            },
            required: true,
            pattern: /^[0-9]\d{0,9}(\.\d{1,3})?%?$/,
            errorMessage: "ERR_DEFAULT_INPUT_FIELD_MSG",
            jsonPath: "Property.superBuiltUpArea"
        }),
        usageType: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-pt",
            componentPath: "AutosuggestContainer",
            jsonPath: "Property.usageCategory",
            props: {
                className: "hr-generic-selectfield autocomplete-dropdown",
                localePrefix: {
                    moduleName: "COMMON",
                    masterName: "PROPUSGTYPE"
                },
                label: {
                    labelName: "Usage Type",
                    labelKey: "PT_COMMON_USAGE_TYPE"
                },
                placeholder: {
                    labelName: "Select Usage Type",
                    labelKey: "PT_COMMON_USAGE_TYPE_PLACEHOLDER"
                },
                required: true,
                isClearable: true,
                labelsFromLocalisation: true,
                jsonPath: "Property.usageCategory",
                sourceJsonPath: "searchScreenMdmsData.PropertyTax.UsageType"
            },
            required: true,
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            },
            beforeFieldChange: function () {
                var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
                    var propType;
                    return _regenerator2.default.wrap(function _callee2$(_context2) {
                        while (1) {
                            switch (_context2.prev = _context2.next) {
                                case 0:
                                    propType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Property.propertyType");

                                    rendersubUsageType(action.value, propType, dispatch, state);

                                case 2:
                                case "end":
                                    return _context2.stop();
                            }
                        }
                    }, _callee2, undefined);
                }));

                return function beforeFieldChange(_x4, _x5, _x6) {
                    return _ref2.apply(this, arguments);
                };
            }()
        },
        subUsageType: {
            uiFramework: "custom-containers-local",
            moduleName: "egov-pt",
            componentPath: "AutosuggestContainer",
            jsonPath: "Property.subUsageCategory",
            props: {
                className: "hr-generic-selectfield autocomplete-dropdown",
                localePrefix: {
                    moduleName: "COMMON",
                    masterName: "PROPSUBUSGTYPE"
                },
                label: {
                    labelName: "Sub Usage Type",
                    labelKey: "PT_COMMON_SUB_USAGE_TYPE"
                },
                placeholder: {
                    labelName: "Select Sub Usage Type",
                    labelKey: "PT_COMMON_SUB_USAGE_TYPE_PLACEHOLDER"
                },
                required: true,
                isClearable: true,
                labelsFromLocalisation: true,
                jsonPath: "Property.subUsageCategory",
                sourceJsonPath: "propsubusagetypeForSelectedusageCategory",
                visible: false
            },
            required: true,
            visible: false,
            gridDefination: {
                xs: 12,
                sm: 12,
                md: 6
            }
        }
    })
});