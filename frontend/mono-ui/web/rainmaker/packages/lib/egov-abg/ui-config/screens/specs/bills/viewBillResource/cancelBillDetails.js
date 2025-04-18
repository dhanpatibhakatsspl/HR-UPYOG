"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cancelBillDetailsCard = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cancelBillDetailsCard = exports.cancelBillDetailsCard = (0, _utils.getCommonCard)({
  searchContainer: (0, _utils.getCommonContainer)({
    reason: {
      uiFramework: "custom-containers-local",
      moduleName: "egov-abg",
      componentPath: "AutosuggestContainer",
      props: {
        label: {
          labelName: "Reason",
          labelKey: "BC_RECEIPT_CANCELLATION_REASON_LABEL"
        },
        localePrefix: {
          moduleName: "BC",
          masterName: "REASON"
        },
        optionLabel: "name",
        placeholder: {
          labelName: "Select Reason",
          labelKey: "BC_SELECT_RECEIPT_CANCELLATION_REASON_LABEL"
        },
        required: true,
        labelsFromLocalisation: true,
        isClearable: true,
        className: "autocomplete-dropdown",
        sourceJsonPath: "applyScreenMdmsData.reasonForBillCancel"
      },
      required: true,
      jsonPath: "UpdateBillCriteria.additionalDetails.reason",
      gridDefination: {
        xs: 12,
        sm: 8
      },
      beforeFieldChange: function () {
        var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(action, state, dispatch) {
          var additionalDetailsJson;
          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  additionalDetailsJson = "components.div.children.cancelBillDetailsCard.children.cardContent.children.searchContainer.children.addtionalDetails";

                  if (action.value == "OTHER") {
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelBill', additionalDetailsJson, "props.disabled", false));
                    // dispatch(handleField('cancelBill', additionalDetailsJson, "required", true))
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelBill', additionalDetailsJson, "props.required", true));
                  } else {
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelBill', additionalDetailsJson, "props.disabled", true));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelBill', additionalDetailsJson, "required", false));
                    dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelBill', additionalDetailsJson, "props.required", false));
                  }
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelBill', additionalDetailsJson, "props.value", ""));
                  dispatch((0, _actions.handleScreenConfigurationFieldChange)('cancelBill', additionalDetailsJson, "props.error", false));
                  return _context.abrupt("return", action);

                case 5:
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
    },
    addtionalDetails: (0, _utils.getTextField)({
      label: {
        labelName: "Consumer Name",
        labelKey: "BC_MORE_DETAILS_LABEL"
      },
      placeholder: {
        labelName: "Enter Consumer Name",
        labelKey: "BC_SELECT_MORE_DETAILS_LABEL"
      },
      gridDefination: {
        xs: 12,
        sm: 8
      },
      required: false,
      disabled: true,
      // multiline: true,
      // rows: "4",
      visible: true,
      pattern: (0, _utils.getPattern)("Address"),
      errorMessage: "Invalid Details.",
      jsonPath: "UpdateBillCriteria.additionalDetails.description"
    }),
    break1: (0, _utils.getBreak)(),
    break2: (0, _utils.getBreak)(),
    break3: (0, _utils.getBreak)(),
    break4: (0, _utils.getBreak)(),
    break5: (0, _utils.getBreak)(),
    break6: (0, _utils.getBreak)(),
    break7: (0, _utils.getBreak)(),
    break8: (0, _utils.getBreak)(),
    break9: (0, _utils.getBreak)(),
    break10: (0, _utils.getBreak)()
  })
});