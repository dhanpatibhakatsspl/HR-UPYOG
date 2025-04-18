"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.adhocPopupViewBill = undefined;

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _utils2 = require("../../utils");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _api = require("../../../../../ui-utils/api");

var _commons = require("../../../../../ui-utils/commons");

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

var _commons2 = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenantId = (0, _commons2.getQueryArg)(window.location.href, "tenantId");

var getEstimateDataAfterAdhoc = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var WSRequestBody, demandId, consumerCode, serviceUrl, httpmethod, WSpayload;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            WSRequestBody = (0, _cloneDeep2.default)((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection"));

            // to parse penalty and rebate amount

            if (WSRequestBody[0].additionalDetails !== undefined && WSRequestBody[0].additionalDetails.length !== 0) {
              if (WSRequestBody[0].additionalDetails.hasOwnProperty('adhocPenalty') === true) {
                WSRequestBody[0].additionalDetails.adhocPenalty = parseFloat(WSRequestBody[0].additionalDetails.adhocPenalty);
              }

              if (WSRequestBody[0].additionalDetails.hasOwnProperty('adhocRebate') === true) {
                WSRequestBody[0].additionalDetails.adhocRebate = parseFloat(WSRequestBody[0].additionalDetails.adhocRebate);
              }
            }
            demandId = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "viewBillToolipData[0].description.demandId");
            consumerCode = (0, _commons2.getQueryArg)(window.location.href, "connectionNumber") || WSRequestBody[0].connectionNo;
            serviceUrl = void 0, httpmethod = void 0;

            if (WSRequestBody[0].service === _commons.serviceConst.WATER) {
              serviceUrl = "ws-calculator/waterCalculator/_applyAdhocTax";
              httpmethod = "post";
            } else {
              serviceUrl = "sw-calculator/sewerageCalculator/_applyAdhocTax";
              httpmethod = "get";
            }
            _context.prev = 6;
            _context.next = 9;
            return (0, _api.httpRequest)("post", serviceUrl, "", [], {
              "demandId": demandId,
              "adhocrebate": WSRequestBody[0].additionalDetails.adhocRebate ? WSRequestBody[0].additionalDetails.adhocRebate : 0,
              "adhocpenalty": WSRequestBody[0].additionalDetails.adhocPenalty ? WSRequestBody[0].additionalDetails.adhocPenalty : 0,
              "consumerCode": consumerCode,
              "businessService": "WS"
            });

          case 9:
            WSpayload = _context.sent;


            if (WSpayload) {
              (0, _utils2.showHideAdhocPopup)(state, dispatch, "viewBill");
              window.location.reload();
            } else {
              dispatch((0, _actions.toggleSnackbar)(true, {
                labelKey: "PT_COMMON_ADD_REBATE_PENALITY",
                labelName: "Failed to add rebate and penality"
              }, "warning"));
            }
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](6);

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelKey: "PT_COMMON_ADD_REBATE_PENALITY",
              labelName: "Failed to add rebate and penality"
            }, "warning"));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined, [[6, 13]]);
  }));

  return function getEstimateDataAfterAdhoc(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var updateAdhoc = function updateAdhoc(state, dispatch) {
  var adhocAmount = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].additionalDetails.adhocPenalty");
  var rebateAmount = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "WaterConnection[0].additionalDetails.adhocRebate");
  if (adhocAmount || rebateAmount) {
    var totalAmount = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "billData.totalAmount");

    if (parseFloat(rebateAmount) && parseFloat(rebateAmount) >= parseFloat(totalAmount)) {
      dispatch((0, _actions.toggleSnackbar)(true, {
        labelKey: "ERR_WS_REBATE_GREATER_THAN_FEE_AMOUNT"
      }, "warning"));
    } else {
      getEstimateDataAfterAdhoc(state, dispatch);
    }
  } else {
    dispatch((0, _actions.toggleSnackbar)(true, {
      labelName: "Enter at least one field",
      labelKey: "ERR_WS_ENTER_ATLEAST_ONE_FIELD"
    }, "warning"));
  }
};

var adhocPopupViewBill = exports.adhocPopupViewBill = (0, _utils.getCommonContainer)({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: {
        width: "100%",
        float: "right"
      }
    },
    children: {
      div1: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 10,
          sm: 10
        },
        props: {
          style: {
            width: "100%",
            float: "right"
          }
        },
        children: {
          div: (0, _utils.getCommonHeader)({
            labelKey: "WS_ADD_HOC_CHARGES_POPUP_HEAD"
          }, {
            style: {
              fontSize: "20px"
            }
          })
        }
      },
      div2: {
        uiFramework: "custom-atoms",
        componentPath: "Div",
        gridDefination: {
          xs: 2,
          sm: 2
        },
        props: {
          style: {
            width: "100%",
            float: "right",
            cursor: "pointer"
          }
        },
        children: {
          closeButton: {
            componentPath: "Button",
            props: {
              style: {
                float: "right",
                color: "rgba(0, 0, 0, 0.60)"
              }
            },
            children: {
              previousButtonIcon: {
                uiFramework: "custom-atoms",
                componentPath: "Icon",
                props: {
                  iconName: "close"
                }
              }
            },
            onClickDefination: {
              action: "condition",
              callBack: function callBack(state, dispatch) {
                (0, _utils2.showHideAdhocPopup)(state, dispatch, "viewBill");
              }
            }
          }
        }
      }
    }
  },
  adhocPenaltyCard: (0, _utils.getCommonContainer)({
    subheader: (0, _utils.getCommonSubHeader)({
      labelKey: "WS_ADD_HOC_CHARGES_POPUP_SUB_FIRST"
    }, {
      style: {
        fontSize: "16px"
      }
    }),
    penaltyAmountAndReasonContainer: (0, _utils.getCommonContainer)({
      penaltyAmount: (0, _utils.getTextField)({
        label: {
          labelKey: "WS_ADD_HOC_CHARGES_POPUP_PEN_AMT_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADD_HOC_CHARGES_POPUP_PEN_AMT_PLACEHOLDER"
        },
        props: {
          style: {
            width: "90%"
          },
          type: "number"
        },
        jsonPath: "WaterConnection[0].additionalDetails.adhocPenalty"
      }),
      penaltyReason: (0, _utils.getSelectField)({
        label: {
          labelKey: "WS_PAYMENT_PENALTY_REASON"
        },
        placeholder: {
          labelKey: "WS_PAYMENT_PENALTY_REASON_SELECT"
        },
        props: {
          style: {
            width: "90%"
          }
        },
        data: [{
          code: "WS_ADHOC_PENDING_DUES"
        }, {
          code: "WS_ADHOC_MISCALCULATION"
        }, {
          code: "WS_ADHOC_ONE_TIME_PENALTY"
        }, {
          code: "WS_ADHOC_OTHER"
        }],
        jsonPath: "WaterConnection[0].additionalDetails.adhocPenaltyReason"
      })
    }),
    commentsField: (0, _utils.getTextField)({
      label: {
        labelKey: "WS_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
      },
      placeholder: {
        labelKey: "WS_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
      },
      gridDefination: {
        xs: 12,
        sm: 12
      },
      props: {
        style: {
          width: "90%"
        }
      },
      jsonPath: "WaterConnection[0].additionalDetails.adhocPenaltyComment"
    })
  }, {
    style: {
      marginTop: "12px"
    }
  }),
  adhocRebateCard: (0, _utils.getCommonContainer)({
    subHeader: (0, _utils.getCommonSubHeader)({
      labelKey: "WS_ADD_HOC_CHARGES_POPUP_SUB_SEC"
    }, {
      style: {
        fontSize: "16px"
      }
    }),
    rebateAmountAndReasonContainer: (0, _utils.getCommonContainer)({
      rebateAmount: (0, _utils.getTextField)({
        label: {
          labelKey: "WS_ADD_HOC_CHARGES_POPUP_RBT_AMT_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADD_HOC_CHARGES_POPUP_RBT_AMT_PLACEHOLDER"
        },
        props: {
          style: {
            width: "90%"
          },
          type: "number"
        },
        jsonPath: "WaterConnection[0].additionalDetails.adhocRebate"
      }),
      rebateReason: (0, _utils.getSelectField)({
        label: {
          labelKey: "WS_PAYMENT_REBATE_REASON"
        },
        placeholder: {
          labelKey: "WS_PAYMENT_REBATE_REASON_SELECT"
        },
        props: {
          style: {
            width: "90%"
          }
        },
        data: [{
          code: "WS_REBATE_ADVANCED_PAID"
        }, {
          code: "WS_REBATE_BY_COMMISSIONER"
        }, {
          code: "WS_REBATE_ADDITIONAL_AMOUNT_CHARGED"
        }, {
          code: "WS_ADHOC_OTHER"
        }],
        jsonPath: "WaterConnection[0].additionalDetails.adhocRebateReason"
      }),
      rebateCommentsField: (0, _utils.getTextField)({
        label: {
          labelKey: "WS_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        placeholder: {
          labelKey: "WS_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
        },
        gridDefination: {
          xs: 12,
          sm: 12
        },
        props: {
          style: {
            width: "90%"
          }
        },
        jsonPath: "WaterConnection[0].additionalDetails.adhocRebateComment"
      })
    })
  }, {
    style: {
      marginTop: "24px"
    }
  }),
  div: {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      style: {
        width: "100%",
        textAlign: "center"
      }
    },
    children: {
      cancelButton: {
        componentPath: "Button",
        props: {
          variant: "outlined",
          color: "primary",
          style: {
            width: "140px",
            height: "48px",
            margin: "8px"
          }
        },
        children: {
          previousButtonLabel: (0, _utils.getLabel)({
            labelKey: "WS_ADD_HOC_CHARGES_POPUP_BUTTON_CANCEL"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: function callBack(state, dispatch) {
            (0, _utils2.showHideAdhocPopup)(state, dispatch, "viewBill");
          }
        }
      },
      addButton: {
        componentPath: "Button",
        props: {
          variant: "contained",
          color: "primary",
          style: {
            width: "140px",
            height: "48px"
          }
        },
        children: {
          previousButtonLabel: (0, _utils.getLabel)({
            labelKey: "WS_ADD_HOC_CHARGES_POPUP_BUTTON_ADD"
          })
        },
        onClickDefination: {
          action: "condition",
          callBack: updateAdhoc
        }
      }
    }
  }
});