"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.footer = exports.postData = undefined;

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _api = require("egov-ui-framework/ui-utils/api");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _utils2 = require("../utils");

var _newRegistration = require("./newRegistration");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var checkIfFormIsValid = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(state, dispatch) {
    var isFormValid, newRegistration, placeOfBirth, childsInfo, fathersInfo, mothersInfo, permAddr, addrField, addrTimeOfBirth, dateofreport, dateofbirth;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            isFormValid = true;
            newRegistration = (0, _utils2.validateFields)("components.div2.children.details.children.cardContent.children.registrationInfo.children.cardContent.children.registrationInfoCont.children", state, dispatch, "newRegistration");
            placeOfBirth = (0, _utils2.validateFields)("components.div2.children.details.children.cardContent.children.placeInfo.children.cardContent.children.placeOfBirth.children", state, dispatch, "newRegistration");
            childsInfo = (0, _utils2.validateFields)("components.div2.children.details.children.cardContent.children.childInfo.children.cardContent.children.infoOfChild.children", state, dispatch, "newRegistration");
            fathersInfo = (0, _utils2.validateFields)("components.div2.children.details.children.cardContent.children.fathersInfo.children.cardContent.children.fathersInfo.children", state, dispatch, "newRegistration");
            mothersInfo = (0, _utils2.validateFields)("components.div2.children.details.children.cardContent.children.mothersInfo.children.cardContent.children.mothersInfo.children", state, dispatch, "newRegistration");
            permAddr = (0, _utils2.validateFields)("components.div2.children.details.children.cardContent.children.permAddressofParents.children.cardContent.children.permAddressofParents.children", state, dispatch, "newRegistration");
            addrField = (0, _utils2.validateFields)("components.div2.children.details.children.cardContent.children.addrTimeOfBirth.children.cardContent.children.addrTimeOfBirth.children", state, dispatch, "newRegistration");
            addrTimeOfBirth = (0, _utils2.validateFields)("components.div2.children.details.children.cardContent.children.informantsInfo.children.cardContent.children.informantInfo.children", state, dispatch, "newRegistration");

            if ((0, _utils2.validateTimeZone)()) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return");

          case 11:
            if (newRegistration && permAddr && placeOfBirth && childsInfo && fathersInfo && mothersInfo && addrField && addrTimeOfBirth) {
              _context.next = 15;
              break;
            }

            isFormValid = false;
            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please fill the required fields.",
              labelKey: "BND_FILL_REQUIRED_FIELDS"
            }, "info"));
            return _context.abrupt("return");

          case 15:
            dateofreport = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.dateofreportepoch");
            dateofbirth = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.dateofbirthepoch");

            if (!(dateofreport < dateofbirth)) {
              _context.next = 21;
              break;
            }

            isFormValid = false;
            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "",
              labelKey: "BND_DOR_SHNT_ABOVE_DEATHDATE"
            }, "info"));
            return _context.abrupt("return");

          case 21:
            if (!(!(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.firstname") && !(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.middlename") && !(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.lastname") && !(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.birthFatherInfo.firstname") && !(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.birthFatherInfo.middlename") && !(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.birthFatherInfo.lastname") && !(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.birthMotherInfo.firstname") && !(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.birthMotherInfo.middlename") && !(0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration.birthMotherInfo.lastname"))) {
              _context.next = 25;
              break;
            }

            isFormValid = false;
            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "Please enter child's name or father's name or mother's name",
              labelKey: "BND_ENTER_ANYONE_NAME"
            }, "info"));
            return _context.abrupt("return");

          case 25:

            if (isFormValid) {
              (0, _newRegistration.showHideConfirmationPopup)(state, dispatch);
            }

          case 26:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function checkIfFormIsValid(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var callBackSubmit = function () {
  var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(state, dispatch) {
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            checkIfFormIsValid(state, dispatch);

          case 1:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function callBackSubmit(_x3, _x4) {
    return _ref2.apply(this, arguments);
  };
}();

var postData = exports.postData = function () {
  var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(state, dispatch) {
    var newRegData, payload, actionmode, errorString, key, userAction;
    return _regenerator2.default.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;

            dispatch((0, _actions.toggleSpinner)());

            newRegData = _lodash2.default.clone((0, _get2.default)(state.screenConfiguration.preparedFinalObject, "bnd.birth.newRegistration", []), true);

            if (newRegData["checkboxforaddress"]) {
              newRegData["birthPermaddr"] = (0, _extends3.default)({}, newRegData["birthPresentaddr"]);
            }
            newRegData["tenantid"] = (0, _localStorageUtils.getTenantId)();
            newRegData["excelrowindex"] = -1;
            newRegData["counter"] = newRegData["isLegacyRecord"] ? 1 : 0;

            if (newRegData["dateofreportepoch"] != null) newRegData["dateofreportepoch"] = (0, _utils.convertDateToEpoch)(newRegData["dateofreportepoch"]) / 1000;
            if (newRegData["dateofbirthepoch"] != null) newRegData["dateofbirthepoch"] = (0, _utils.convertDateToEpoch)(newRegData["dateofbirthepoch"]) / 1000;

            payload = {
              birthCerts: [newRegData]
            };
            actionmode = (0, _commons.getQueryArg)(window.location.href, "action") == "EDIT" ? "updatebirthimport" : "savebirthimport";
            _context3.next = 13;
            return (0, _api.httpRequest)("post", "birth-death-services/common/" + actionmode, "" + actionmode, [], payload);

          case 13:
            payload = _context3.sent;


            if (payload) {
              if (payload.errorRowMap && Object.keys(payload.errorRowMap).length > 0) {
                errorString = "";

                for (key in payload.errorRowMap) {
                  errorString += key + " ";
                }
                dispatch((0, _actions.toggleSnackbar)(true, {
                  labelName: "API Error",
                  labelKey: payload.serviceError
                }, "info"));
              } else {
                dispatch((0, _actions.toggleSnackbar)(true, {
                  labelName: "",
                  labelKey: "BND_SUCCESS"
                }, "success"));
                userAction = (0, _commons.getQueryArg)(window.location.href, "action");

                if (userAction == "EDIT") {
                  setTimeout(function () {
                    return window.location.href = "/employee/birth-common/getCertificate";
                  }, 2000);
                } else {
                  setTimeout(function () {
                    return location.reload();
                  }, 2000);
                }
              }
            } else {
              // dispatch(
              //   setRoute(
              //     `/lams-citizen/acknowledgement?applicationNumber=${applicationNumber}&status=${status}&purpose=${purpose}`
              //   )
              // );
            }
            _context3.next = 20;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](0);

            dispatch((0, _actions.toggleSnackbar)(true, {
              labelName: "API Error",
              labelKey: "BND_SESSION_EXPIRED"
            }, "info"));

          case 20:
            dispatch((0, _actions.toggleSpinner)());

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, undefined, [[0, 17]]);
  }));

  return function postData(_x5, _x6) {
    return _ref3.apply(this, arguments);
  };
}();

var getCommonApplyFooter = function getCommonApplyFooter(children) {
  return {
    uiFramework: "custom-atoms",
    componentPath: "Div",
    props: {
      className: "apply-wizard-footer"
    },
    children: children
  };
};

var footer = exports.footer = getCommonApplyFooter({
  resetButton: {
    componentPath: "Button",
    props: {
      variant: "outlined",
      color: "primary",
      style: {
        minWidth: "200px",
        height: "48px",
        marginRight: "16px"
      }
    },
    children: {
      previousButtonLabel: (0, _utils.getLabel)({
        labelName: "Previous Step",
        labelKey: "BND_COMMON_NEW"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: function callBack(state, dispatch) {
        location.reload();
      }
    },
    visible: (0, _commons.getQueryArg)(window.location.href, "action") != "EDIT"
  },
  submitButton: {
    componentPath: "Button",
    props: {
      variant: "contained",
      color: "primary",
      className: "submit-btn leaseApplicationSubmitButton",
      style: {
        minWidth: "180px",
        height: "48px",
        marginRight: "16px",
        borderRadius: "inherit"
      }
    },
    children: {
      previousButtonLabel: (0, _utils.getLabel)({
        labelName: "Previous Step",
        labelKey: (0, _commons.getQueryArg)(window.location.href, "action") == "EDIT" ? "CORE_COMMON_UPDATE" : "CORE_COMMON_SUBMIT"
      })
    },
    onClickDefination: {
      action: "condition",
      callBack: callBackSubmit
    }
    //visible: (getQueryArg(window.location.href, "action")!="VIEW"),
  }
});