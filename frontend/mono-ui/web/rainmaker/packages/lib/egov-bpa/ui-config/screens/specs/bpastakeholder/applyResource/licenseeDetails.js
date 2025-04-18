"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tradeOwnerDetails = exports.LicenseeCard = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../../utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LicenseeCard = exports.LicenseeCard = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonSubHeader)({
    labelName: "Licensee Details",
    labelKey: "BPA_LICENSEE_DETAILS_HEADER_OWNER_INFO"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  tradeUnitCardContainer: (0, _utils.getCommonContainer)({
    container1: (0, _utils.getCommonContainer)({
      licenseeType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
        label: {
          labelName: "Technical Person Licensee Type",
          labelKey: "BPA_LICENSEE_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Technical Person Licensee Type",
          labelKey: "BPA_LICENSEE_TYPE_PLACEHOLDER"
        },
        required: true,
        jsonPath: "LicensesTemp[0].tradeLicenseDetail.tradeUnits[0].tradeType",
        localePrefix: {
          moduleName: "TRADELICENSE",
          masterName: "TRADETYPE"
        },
        sourceJsonPath: "applyScreenMdmsData.TradeLicense.TradeTypeTransformed",
        gridDefination: {
          xs: 12,
          sm: 6
        }
      }), {
        beforeFieldChange: function () {
          var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
            var previousValue, counsilForArchNo, getClassOfLicenseType;
            return _regenerator2.default.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    previousValue = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "LicensesTemp[0].tradeLicenseDetail.tradeUnits[0].tradeType");
                    counsilForArchNo = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "Licenses[0].tradeLicenseDetail.additionalDetail.counsilForArchNo");

                    if (!(action.value !== previousValue)) {
                      _context.next = 8;
                      break;
                    }

                    _context.next = 5;
                    return (0, _utils2.setLicenseeSubTypeDropdownData)(action.value, state, dispatch);

                  case 5:
                    if (counsilForArchNo) {
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container3.children.counsilForArchNo", "props.value", ""));
                    };
                    dispatch((0, _actions.prepareFinalObject)("LicensesTemp.isDeclared", false));

                  case 8:

                    if (action.value == "ARCHITECT") {
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container3.children.counsilForArchNo", "visible", true));
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container3.children.counsilForArchNo", "required", true));
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardForthStep.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewcounsilForArchNo", "visible", true));
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewcounsilForArchNo", "visible", true));
                    } else {
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container3.children.counsilForArchNo", "visible", false));
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFirstStep.children.LicenseeCard.children.cardContent.children.tradeUnitCardContainer.children.container3.children.counsilForArchNo", "required", false));
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardForthStep.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewcounsilForArchNo", "visible", false));
                      dispatch((0, _actions.handleScreenConfigurationFieldChange)("apply", "components.div.children.formwizardFourthStep.children.tradeReviewDetails.children.cardContent.children.reviewLicenseDetails.children.cardContent.children.multiOwner.children.viewFive.children.reviewcounsilForArchNo", "visible", false));
                      if (counsilForArchNo) {
                        dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.additionalDetail.counsilForArchNo", ""));
                      }
                    }
                    getClassOfLicenseType = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "applyScreenMdmsData.TradeLicense.tradeSubType[0].code");

                    if (getClassOfLicenseType) {
                      dispatch((0, _actions.prepareFinalObject)("Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType", getClassOfLicenseType));
                    }

                  case 11:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, undefined);
          }));

          return function beforeFieldChange(_x, _x2, _x3) {
            return _ref.apply(this, arguments);
          };
        }()
      })
    }),
    container2: (0, _utils.getCommonContainer)({
      licenseeSubType: (0, _extends3.default)({}, (0, _utils.getSelectField)({
        label: {
          labelName: "Technical Person Licensee Sub Type",
          labelKey: "BPA_LICENSEE_SUB_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select Technical Person Licensee Sub Type",
          labelKey: "BPA_LICENSEE_SUB_TYPE_PLACEHOLDER"
        },
        required: true,
        visible: false,
        jsonPath: "Licenses[0].tradeLicenseDetail.tradeUnits[0].tradeType",
        localePrefix: {
          moduleName: "TRADELICENSE",
          masterName: "TRADETYPE"
        },
        // props: {
        //   jsonPathUpdatePrefix: "LicensesTemp.tradeUnits",
        //   setDataInField: true
        // },
        sourceJsonPath: "applyScreenMdmsData.TradeLicense.tradeSubType",
        gridDefination: {
          xs: 12,
          sm: 6
        }
      }), {
        beforeFieldChange: function beforeFieldChange(action, state, dispatch) {}
      })
    }),
    container3: (0, _utils.getCommonContainer)({
      counsilForArchNo: (0, _utils.getTextField)({
        label: {
          labelName: "Council for Architecture No.",
          labelKey: "BPA_COUNCIL_FOR_ARCH_NO_LABEL"
        },
        placeholder: {
          labelName: "Enter Council for Architecture No.",
          labelKey: "BPA_COUNCIL_FOR_ARCH_NO_PLACEHOLDER"
        },
        visible: false,
        required: true,
        jsonPath: "Licenses[0].tradeLicenseDetail.additionalDetail.counsilForArchNo"
      })
    })
  })
});

var tradeOwnerDetails = exports.tradeOwnerDetails = (0, _utils.getCommonCard)({
  header: (0, _utils.getCommonTitle)({
    labelName: "Trade Owner Details",
    labelKey: "BPA_NEW_OWNER_DETAILS_HEADER"
  }, {
    style: {
      marginBottom: 18
    }
  }),
  LicenseeCard: LicenseeCard
});