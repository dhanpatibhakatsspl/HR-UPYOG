"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newCollectionServiceDetailsCard = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _common = require("config/common.js");

var _common2 = _interopRequireDefault(_common);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _find = require("lodash/find");

var _find2 = _interopRequireDefault(_find);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _localStorageUtils.getTenantId)();

var newCollectionServiceDetailsCard = exports.newCollectionServiceDetailsCard = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Service Details",
    labelKey: "SERVICEDETAILS"
  }, {
    style: {
      marginBottom: 18
    }
  }),

  searchContainer: (0, _utils.getCommonContainer)({
    City: (0, _extends3.default)({}, (0, _utils.getSelectField)({
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
      sourceJsonPath: "applyScreenMdmsData.tenant.citiesByModule",
      jsonPath: "Challan[0].tenantId",
      required: true,
      props: {
        required: true,
        disabled: true
      }
    }), {
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
                      tenantId: _common2.default.tenantId,
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
                  (0, _utils2.setServiceCategory)((0, _get2.default)(payload, "MdmsRes.BillingService.BusinessService", []), dispatch, state);
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
    }),
    // helpPdfButton: {
    //   componentPath: "Button",
    //   jsonPath: "Challan[0].ucCollection.pdf",
    //   gridDefination: {
    //     xs: 12,
    //     sm: 6,
    //   },
    //   props: {
    //     //variant: "outlined",
    //     color: "primary",
    //     style: {
    //       minWidth: "180px",
    //       height: "48px",
    //       marginRight: "45",
    //       borderRadius: "inherit",
    //     },
    //   },

    //   onClickDefination: {
    //     action: "condition",
    //     callBack: (state, dispatch) => {
    //       downloadHelpFile(state, dispatch);
    //     },
    //   },
    //   children: {
    //     downloadButtonIcon: {
    //       uiFramework: "custom-atoms",
    //       componentPath: "Icon",
    //       props: {
    //         iconName: "cloud_download",
    //       },
    //     },
    //     downloadButtonLabel: getLabel({
    //       labelName: "Help ?",
    //       labelKey: "UC_HELP_FILE",
    //     }),
    //   },
    // },

    serviceCategory: {
      uiFramework: "custom-containers",
      componentPath: "AutosuggestContainer",
      jsonPath: "Challan[0].consumerType",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        className: "autocomplete-dropdown",
        label: {
          labelName: "Service Category",
          labelKey: "UC_SERVICE_CATEGORY_LABEL"
        },
        placeholder: {
          labelName: "Select service Category",
          labelKey: "UC_SERVICE_CATEGORY_PLACEHOLDER"
        },
        localePrefix: {
          masterName: "BusinessService",
          moduleName: "BillingService"
        },

        visible: true,
        jsonPath: "Challan[0].consumerType",
        sourceJsonPath: "applyScreenMdmsData.serviceCategories",
        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,
        inputLabelProps: {
          shrink: true
        }
      },
      beforeFieldChange: function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(action, state, dispatch) {
          var editingMode, selServiceType, serviceData, visibleFlag;
          return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  //Reset service type value, if any

                  editingMode = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.Challan[0].id", null);
                  selServiceType = null;

                  if (editingMode != null) {
                    selServiceType = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.Challan[0].businessService", null);
                  }

                  dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.serviceType", "props.value", selServiceType));

                  //Set service type data and field if available.
                  serviceData = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.nestedServiceData", {});

                  if (action.value) {
                    visibleFlag = false;

                    if (serviceData[action.value] && serviceData[action.value].child && serviceData[action.value].child.length > 0) {
                      dispatch((0, _actions.prepareFinalObject)("applyScreenMdmsData.serviceTypes", serviceData[action.value].child));
                      visibleFlag = true;
                    }
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.serviceType", "visible", visibleFlag));
                  }

                case 6:
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

    serviceType: {
      uiFramework: "custom-containers",
      componentPath: "AutosuggestContainer",
      jsonPath: "Challan[0].businessService",
      gridDefination: {
        xs: 12,
        sm: 6
      },
      required: true,
      props: {
        style: {
          width: "100%",
          cursor: "pointer"
        },
        className: "autocomplete-dropdown",
        label: {
          labelName: "Service Type",
          labelKey: "UC_SERVICE_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select service Type",
          labelKey: "UC_SERVICE_TYPE_PLACEHOLDER"
        },
        localePrefix: {
          masterName: "BusinessService",
          moduleName: "BillingService"
        },

        visible: true,
        jsonPath: "Challan[0].businessService",
        sourceJsonPath: "applyScreenMdmsData.serviceTypes",
        labelsFromLocalisation: true,
        suggestions: [],
        fullwidth: true,
        inputLabelProps: {
          shrink: true
        }
      },
      beforeFieldChange: function () {
        var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(action, state, dispatch) {
          return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:

                  if (action.value) {
                    setTaxHeadFields(action, state, dispatch);
                  }

                case 1:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3, undefined);
        }));

        return function beforeFieldChange(_x7, _x8, _x9) {
          return _ref3.apply(this, arguments);
        };
      }()
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
      jsonPath: "Challan[0].taxPeriodFrom",
      beforeFieldChange: function () {
        var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(action, state, dispatch) {
          return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:

                  if (action.value) {
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.toDate", "props.disabled", false));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.toDate", "props.inputProps.min", action.value));
                  }

                case 1:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee4, undefined);
        }));

        return function beforeFieldChange(_x10, _x11, _x12) {
          return _ref4.apply(this, arguments);
        };
      }()
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
      props: {
        disabled: true
      },
      pattern: (0, _utils.getPattern)("Date"),
      jsonPath: "Challan[0].taxPeriodTo"
    })
  }, {
    style: {
      overflow: "visible"
    }
  }),
  commentsContainer: (0, _utils.getCommonContainer)({
    comments: (0, _utils.getTextField)({
      gridDefination: {
        xs: 12,
        sm: 6
      },
      label: {
        labelName: "Comments",
        labelKey: "UC_COMMENT_LABEL"
      },
      placeholder: {
        labelName: "Enter Comment ",
        labelKey: "UC_COMMENT_PLACEHOLDER"
      },
      Required: false,
      jsonPath: "Challan[0].description"
    })
  })
}, {
  style: {
    overflow: "visible"
  }
});

var setTaxHeadFields = function setTaxHeadFields(action, state, dispatch) {
  var taxHeadMasters = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.applyScreenMdmsData.BillingService.TaxHeadMaster", {});
  var matchingTaxHeads = taxHeadMasters.filter(function (item) {
    return item.service === action.value;
  });
  if (matchingTaxHeads && matchingTaxHeads.length > 0) {
    //Delete previous Tax Head fields
    var noOfPreviousTaxHeads = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.Challan[0].amount", []).length;
    var taxFields = (0, _get2.default)(state.screenConfiguration, "screenConfig.newCollection.components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children", {});
    var taxFieldKeys = Object.keys(taxFields).filter(function (item) {
      return item.startsWith("taxheadField_");
    });
    var editingMode = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.Challan[0].id", null);
    if (noOfPreviousTaxHeads > 0) {
      for (var i = 0; i < taxFieldKeys.length; i++) {
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children", taxFieldKeys[i] + ".props.value", ""));
        dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children", taxFieldKeys[i] + ".visible", false));
      }
      if (editingMode == null) {
        dispatch((0, _actions.prepareFinalObject)("Challan[0].amount", []));
      }
    }

    //Show new tax head fields
    matchingTaxHeads.forEach(function (item, index) {

      dispatch((0, _actions.prepareFinalObject)("Challan[0].amount[" + index + "].taxHeadCode", item.code));
      var prevCollection = (0, _get2.default)(state.screenConfiguration, "preparedFinalObject.ChallanTaxHeads", []);
      var colAmount = (0, _get2.default)((0, _find2.default)(prevCollection, { "taxHeadCode": item.code }), "amount", "");
      dispatch((0, _actions.prepareFinalObject)("Challan[0].amount[" + index + "].amount", colAmount));

      dispatch((0, _actions.handleScreenConfigurationFieldChange)("newCollection", "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children", "taxheadField_" + item.code.split(".").join("_"), (0, _utils.getTextField)({
        label: {
          labelName: "Tax Amount",
          labelKey: "" + (0, _commons.getTransformedLocale)(item.code)
        },
        placeholder: {
          labelName: "Enter Tax Amount",
          labelKey: "UC_AMOUNT_TO_BE_COLLECTED_PLACEHOLDER"
        },
        componentJsonpath: "components.div.children.newCollectionServiceDetailsCard.children.cardContent.children.searchContainer.children.taxheadField_" + item.code.split(".").join("_"),
        required: item.isRequired || false,
        pattern: (0, _utils.getPattern)("DecimalNumber"),
        //errorMessage: "Invalid Amount",
        visible: item.code.endsWith('_ROUNDOFF') ? false : true,
        // required: true,
        props: {
          // required: true
          //visible:item.code.endsWith('_ROUNDOFF')? false: true,
          type: "text"
        },
        jsonPath: "Challan[0].amount[" + index + "].amount"
      })));
    });
  }
};