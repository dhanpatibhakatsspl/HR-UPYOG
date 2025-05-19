"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCollectionDetailsCard = undefined;

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _localStorageUtils.getTenantId)();

var serviceTypeChange = function serviceTypeChange(reqObj) {
  var state = reqObj.state,
      value = reqObj.value,
      dispatch = reqObj.dispatch;

  dispatch((0, _actions.prepareFinalObject)('Demands[0].businessService', value));
  var demandId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Demands[0].id", null);

  if (!demandId && value) {
    var taxHeads = setTaxHeadFields(value, state, dispatch);
  }
};

var serviceCategoryChange = function serviceCategoryChange(reqObj) {
  var state = reqObj.state,
      value = reqObj.value,
      dispatch = reqObj.dispatch;

  dispatch((0, _actions.prepareFinalObject)('Demands[0].consumerType', value));
  var demandId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Demands[0].id", null);
  resetTaxAmountFields(state, dispatch);
  var serviceData = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.nestedServiceData", {});
  //Set tax head fields if there is no service type available
  if (!demandId && serviceData[value]) {
    var taxHeads = setTaxHeadFields(value, state, dispatch);
  }
};

var newCollectionDetailsCard = exports.newCollectionDetailsCard = (0, _utils.getCommonCard)({
  searchContainer: (0, _utils.getCommonContainer)((0, _defineProperty3.default)({
    City: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-uc",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "City",
          labelKey: "TL_NEW_TRADE_DETAILS_CITY_LABEL"
        },
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS"
        },
        optionLabel: "name",
        placeholder: {
          labelName: "Select City",
          labelKey: "TL_SELECT_CITY"
        },
        required: true,
        value: tenantId,
        disabled: true,
        labelsFromLocalisation: true,
        isClearable: true,
        className: "autocomplete-dropdown",
        sourceJsonPath: "applyScreenMdmsData.tenant.citiesByModule"
      },
      jsonPath: "Demands[0].tenantId",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var citiesByModule, requestBody, payload;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  citiesByModule = (0, _get2.default)(state, "common.citiesByModule.UC.tenants", []);

                  if (citiesByModule.find(function (item) {
                    return item.code === action.value;
                  })) {
                    _context.next = 3;
                    break;
                  }

                  return _context.abrupt("return", action);

                case 3:
                  requestBody = {
                    MdmsCriteria: {
                      tenantId: action.value,
                      moduleDetails: [{
                        moduleName: "BillingService",
                        masterDetails: [{
                          name: "BusinessService",
                          filter: "[?(@.type=='Adhoc')]"
                        }, {
                          name: "TaxHeadMaster"
                        }, {
                          name: "TaxPeriod"
                        }]
                      }]
                    }
                  };
                  _context.prev = 4;
                  payload = null;
                  _context.next = 8;
                  return (0, _api.httpRequest)("post", "/egov-mdms-service/v1/_search", "_search", [], requestBody);

                case 8:
                  payload = _context.sent;

                  dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.BillingService", payload.MdmsRes.BillingService));
                  (0, _utils2.setServiceCategory)((0, _get2.default)(payload, "MdmsRes.BillingService.BusinessService", []), dispatch);
                  _context.next = 16;
                  break;

                case 13:
                  _context.prev = 13;
                  _context.t0 = _context["catch"](4);

                  console.log(_context.t0);

                case 16:
                  return _context.abrupt("return", action);

                case 17:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, undefined, [[4, 13]]);
        }));

        return function beforeFieldChange(_x, _x2, _x3) {
          return _ref.apply(this, arguments);
        };
      }()
    },
    dummyDiv: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      visible: process.env.REACT_APP_NAME === "Citizen" ? false : true,
      props: {
        disabled: true
      }
    },
    ConsumerMobileNo: (0, _utils.getTextField)({
      label: {
        labelName: "Mobile No",
        labelKey: "UC_MOBILE_NO_LABEL"
      },
      placeholder: {
        labelName: "Enter Mobile No",
        labelKey: "UC_MOBILE_NO_PLACEHOLDER"
      },
      iconObj: {
        label: "+91 |",
        position: "start"
      },
      required: true,
      visible: true,
      pattern: (0, _utils.getPattern)("MobileNo"),
      errorMessage: "Invalid Mobile No.",
      jsonPath: "Demands[0].mobileNumber"
    }),
    ConsumerName: (0, _utils.getTextField)({
      label: {
        labelName: "Consumer Name",
        labelKey: "UC_CONS_NAME_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer Name",
        labelKey: "UC _CONS_NAME_LABEL_PLACEHOLDER"
      },

      required: true,
      visible: true,
      pattern: (0, _utils.getPattern)("Name"),
      errorMessage: "Invalid Name.",
      jsonPath: "Demands[0].consumerName"
    }),
    // serviceCategory: {
    //   uiFramework: "custom-containers-local",
    //   moduleName: "egov-uc",
    //   componentPath: "AutosuggestContainer",
    //   jsonPath: "Demands[0].businessService",
    //   gridDefination: {
    //     xs: 12,
    //     sm: 6
    //   },
    //   required: true,
    //   props: {
    //     className: "autocomplete-dropdown",
    //     label: {
    //       labelName: "Service Category",
    //       labelKey: "UC_SERVICE_CATEGORY_LABEL"
    //     },
    //     placeholder: {
    //       labelName: "Select service Category",
    //       labelKey: "UC_SERVICE_CATEGORY_PLACEHOLDER"
    //     },
    //     localePrefix: {
    //       masterName: "BusinessService",
    //       moduleName: "BillingService"
    //     },
    //     required: true,
    //     visible: true,
    //     jsonPath: "Demands[0].businessService",
    //     sourceJsonPath: "applyScreenMdmsData.serviceCategories",
    //     labelsFromLocalisation: true,
    //   },
    //   beforeFieldChange: async (action, state, dispatch) => {
    //     //Reset service type value, if any
    //     if (get(state, 'screenConfiguration.preparedFinalObject.Demands[0].serviceType', null)) {
    //       dispatch(
    //         handleField(
    //           "newCollection",
    //           "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType",
    //           "props.value",
    //           null
    //         )
    //       );
    //     }
    //     //Set service type data and field if available.
    //     const serviceData = get(
    //       state.screenConfiguration,
    //       "preparedFinalObject.applyScreenMdmsData.nestedServiceData",
    //       {}
    //     );
    //     if (action.value) {
    //       if (
    //         serviceData[action.value] &&
    //         serviceData[action.value].child &&
    //         serviceData[action.value].child.length > 0
    //       ) {
    //         dispatch(
    //           prepareFinalObject(
    //             "applyScreenMdmsData.serviceTypes",
    //             serviceData[action.value].child
    //           )
    //         );
    //         dispatch(
    //           handleField(
    //             "newCollection",
    //             "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType",
    //             "visible",
    //             true
    //           )
    //         );
    //       } else {
    //         dispatch(
    //           handleField(
    //             "newCollection",
    //             "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.serviceType",
    //             "visible",
    //             false
    //           )
    //         );
    //         const demandId = get(
    //           state.screenConfiguration.preparedFinalObject,
    //           "Demands[0].id",
    //           null
    //         );
    //         //Set tax head fields if there is no service type available
    //         if (!demandId && serviceData[action.value]) {
    //           const taxHeads = setTaxHeadFields(action, state, dispatch);
    //         }
    //       }
    //     }
    //   }
    // },
    // serviceType: {
    //   uiFramework: "custom-containers-local",
    //   moduleName: "egov-uc",
    //   componentPath: "AutosuggestContainer",
    //   props: {
    //     label: {
    //       labelName: "Service Type",
    //       labelKey: "UC_SERVICE_TYPE_LABEL"
    //     },
    //     localePrefix: {
    //       masterName: "BusinessService",
    //       moduleName: "BillingService"
    //     },
    //     placeholder: {
    //       labelName: "Select Service Type",
    //       labelKey: "UC_SERVICE_TYPE_PLACEHOLDER"
    //     },
    //     required: true,
    //     visible: false,
    //     labelsFromLocalisation: true,
    //     className: "autocomplete-dropdown",
    //     sourceJsonPath: "applyScreenMdmsData.serviceTypes",
    //   },
    //   required: true,
    //   jsonPath: "Demands[0].serviceType",
    //   gridDefination: {
    //     xs: 12,
    //     sm: 6
    //   },
    //   beforeFieldChange: async (action, state, dispatch) => {
    //     const demandId = get(
    //       state.screenConfiguration.preparedFinalObject,
    //       "Demands[0].id",
    //       null
    //     );
    //     if (!demandId && action.value) {
    //       const taxHeads = setTaxHeadFields(action, state, dispatch);
    //       console.log(taxHeads);
    //     }
    //   }
    // },

    dynamicMdmsServiceCategory: {
      uiFramework: "custom-containers",
      componentPath: "DynamicMdmsContainer",
      props: {
        dropdownFields: [{
          key: 'serviceCategory',
          fieldType: "autosuggest",
          callBack: serviceCategoryChange,
          className: "applicant-details-error autocomplete-dropdown",
          isRequired: false,
          requiredValue: true
        }, {
          key: 'serviceType',
          callBack: serviceTypeChange,
          fieldType: "autosuggest",
          className: "applicant-details-error autocomplete-dropdown",
          isRequired: false,
          requiredValue: true
        }],
        moduleName: "BillingService",
        masterName: "BusinessService",
        rootBlockSub: 'serviceCategories',
        filter: "[?(@.type=='Adhoc')]"
      }
    },
    fromDate: (0, _utils.getDateField)({
      label: {
        labelName: "From Date",
        labelKey: "UC_FROM_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter from Date",
        labelKey: "UC_SELECT_FROM_DATE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Demands[0].taxPeriodFrom"
    }),
    toDate: (0, _utils.getDateField)({
      label: {
        labelName: "To Date",
        labelKey: "UC_TO_DATE_LABEL"
      },
      placeholder: {
        labelName: "Enter to Date",
        labelKey: "UC_SELECT_TO_DATE_PLACEHOLDER"
      },
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Demands[0].taxPeriodTo"
    })
  }, "dummyDiv", {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    gridDefination: {
      xs: 12,
      sm: 6
    },
    visible: true,
    props: {
      disabled: true
    }
  }), {
    style: {
      overflow: "visible"
    }
  }),
  commentsContainer: (0, _utils.getCommonContainer)({
    comments: (0, _utils.getTextField)({
      label: {
        labelName: "Comments",
        labelKey: "UC_COMMENT_LABEL"
      },
      placeholder: {
        labelName: "Enter Comment ",
        labelKey: "UC_COMMENT_PLACEHOLDER"
      },
      Required: false,
      jsonPath: "Demands[0].additionalDetails.comment"
    })
  })
}, {
  style: {
    overflow: "visible"
  }
});

var resetTaxAmountFields = function resetTaxAmountFields(state, dispatch) {
  var noOfPreviousTaxHeads = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.Demands[0].demandDetails", []).length;
  var taxFields = (0, _get2.default)(state.screenConfiguration, "screenConfig.newCollection.components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", {});
  var taxFieldKeys = Object.keys(taxFields).filter(function (item) {
    return item.startsWith("taxheadField_");
  });
  if (noOfPreviousTaxHeads > 0) {
    for (var i = 0; i < taxFieldKeys.length; i++) {
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", taxFieldKeys[i] + ".props.value", ""));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", taxFieldKeys[i] + ".visible", false));
    }
    dispatch((0, _actions.prepareFinalObject)("Demands[0].demandDetails", []));
  }
};

var setTaxHeadFields = function setTaxHeadFields(value, state, dispatch) {
  var serviceData = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.nestedServiceData", {});
  var taxHeadMasters = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.BillingService.TaxHeadMaster", {});
  var matchingTaxHeads = taxHeadMasters.filter(function (item) {
    return item.service === value;
  });
  if (matchingTaxHeads && matchingTaxHeads.length > 0) {
    //Delete previous Tax Head fields
    var noOfPreviousTaxHeads = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.Demands[0].demandDetails", []).length;
    var taxFields = (0, _get2.default)(state.screenConfiguration, "screenConfig.newCollection.components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", {});
    var taxFieldKeys = Object.keys(taxFields).filter(function (item) {
      return item.startsWith("taxheadField_");
    });
    if (noOfPreviousTaxHeads > 0) {
      for (var i = 0; i < taxFieldKeys.length; i++) {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", taxFieldKeys[i] + ".props.value", ""));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", taxFieldKeys[i] + ".visible", false));
      }
      dispatch((0, _actions.prepareFinalObject)("Demands[0].demandDetails", []));
    }
    //Show new tax head fields
    matchingTaxHeads.forEach(function (item, index) {
      dispatch((0, _actions.prepareFinalObject)("Demands[0].demandDetails[" + index + "].taxHeadMasterCode", item.code));
      dispatch((0, _actions.prepareFinalObject)("Demands[0].demandDetails[" + index + "].collectionAmount", 0));
      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children", "taxheadField_" + item.code.split(".").join("_"), (0, _utils.getTextField)({
        label: {
          labelName: "Tax Amount",
          labelKey: "" + (0, _commons.getTransformedLocale)(item.code)
        },
        placeholder: {
          labelName: "Enter Tax Amount",
          labelKey: "UC_AMOUNT_TO_BE_COLLECTED_PLACEHOLDER"
        },
        componentJsonpath: "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.taxheadField_" + item.code.split(".").join("_"),
        required: item.isRequired || false,
        pattern: /^[0-9]{0,8}$/i,
        errorMessage: "Invalid Amount",
        visible: true,
        // required: true,
        props: {
          // required: true
        },
        type: "number",
        jsonPath: "Demands[0].demandDetails[" + index + "].taxAmount"
      })));
    });
    // dispatch(
    //   handleField(
    //     "newCollection",
    //     "components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children",
    //     `comment`,
    //     getTextField({
    //       label: {
    //         labelName: "Comments",
    //         labelKey: "UC_COMMENT_LABEL"
    //       },
    //       placeholder: {
    //         labelName: "Enter Comment ",
    //         labelKey: "UC_COMMENT_PLACEHOLDER"
    //       },
    //       Required: false,
    //       jsonPath: "Demands[0].comment",
    //       componentJsonpath: `components.div.children.newCollectionDetailsCard.children.cardContent.children.searchContainer.children.comment`
    //     })
    //   )
    // );
  }
};

// const setServiceCategory = (businessServiceData, dispatch) => {
//   let nestedServiceData = {};
//   businessServiceData.forEach(item => {
//     if (item.code && item.code.indexOf(".") > 0) {
//       if (nestedServiceData[item.code.split(".")[0]]) {
//         let child = get(
//           nestedServiceData,
//           `${item.code.split(".")[0]}.child`,
//           []
//         );
//         child.push(item);
//         set(nestedServiceData, `${item.code.split(".")[0]}.child`, child);
//       } else {
//         set(
//           nestedServiceData,
//           `${item.code.split(".")[0]}.code`,
//           item.code.split(".")[0]
//         );
//         set(nestedServiceData, `${item.code.split(".")[0]}.child[0]`, item);
//       }
//     } else {
//       set(nestedServiceData, `${item.code}`, item);
//     }
//   });
//   dispatch(
//     prepareFinalObject(
//       "applyScreenMdmsData.nestedServiceData",
//       nestedServiceData
//     )
//   );
//   let serviceCategories = Object.values(nestedServiceData).filter(
//     item => item.code
//   );
//   dispatch(
//     prepareFinalObject(
//       "applyScreenMdmsData.serviceCategories",
//       serviceCategories
//     )
//   );
// };