"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _uiMoleculesLocal = require("../../ui-molecules-local");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

require("./index.css");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _api = require("egov-ui-framework/ui-utils/api");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tenant = (0, _commons.getQueryArg)(window.location.href, "tenantId");

var ResubmitActionContainer = function (_React$Component) {
  (0, _inherits3.default)(ResubmitActionContainer, _React$Component);

  function ResubmitActionContainer() {
    var _ref,
        _this2 = this;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ResubmitActionContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ResubmitActionContainer.__proto__ || Object.getPrototypeOf(ResubmitActionContainer)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      open: false,
      data: {}
    }, _this.convertOwnerDobToEpoch = function (owners) {
      var updatedOwners = owners && owners.map(function (owner) {
        return (0, _extends3.default)({}, owner, {
          dob: owner && owner !== null && (0, _utils.convertDateToEpoch)(owner.dob, "dayend")
        });
      }).filter(function (item) {
        return item && item !== null;
      });
      return updatedOwners;
    }, _this.wfUpdate = function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(label) {
        var _this$props, toggleSnackbar, preparedFinalObject, dataPath, updateUrl, data, removedDocs, owners, accessories, tradeUnits, applicationNumber, payload, path, licenseNumber;

        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _this$props = _this.props, toggleSnackbar = _this$props.toggleSnackbar, preparedFinalObject = _this$props.preparedFinalObject, dataPath = _this$props.dataPath, updateUrl = _this$props.updateUrl;
                data = (0, _get2.default)(preparedFinalObject, dataPath, []);


                if ((0, _commons.getQueryArg)(window.location.href, "edited")) {
                  removedDocs = (0, _get2.default)(preparedFinalObject, "LicensesTemp[0].removedDocs", []);

                  if (data[0] && data[0].commencementDate) {
                    data[0].commencementDate = (0, _utils.convertDateToEpoch)(data[0].commencementDate, "dayend");
                  }
                  owners = (0, _get2.default)(data[0], "tradeLicenseDetail.owners");

                  owners = owners && _this.convertOwnerDobToEpoch(owners) || [];
                  (0, _set2.default)(data[0], "tradeLicenseDetail.owners", owners);
                  (0, _set2.default)(data[0], "tradeLicenseDetail.applicationDocuments", [].concat((0, _toConsumableArray3.default)((0, _get2.default)(data[0], "tradeLicenseDetail.applicationDocuments", [])), (0, _toConsumableArray3.default)(removedDocs)));

                  // Accessories issue fix by Gyan
                  accessories = (0, _get2.default)(data[0], "tradeLicenseDetail.accessories");
                  tradeUnits = (0, _get2.default)(data[0], "tradeLicenseDetail.tradeUnits");

                  (0, _set2.default)(data[0], "tradeLicenseDetail.tradeUnits", (0, _commons.getMultiUnits)(tradeUnits));
                  (0, _set2.default)(data[0], "tradeLicenseDetail.accessories", (0, _commons.getMultiUnits)(accessories));
                }

                applicationNumber = (0, _commons.getQueryArg)(window.location.href, "applicationNumber");
                _context.prev = 4;
                _context.next = 7;
                return (0, _api.httpRequest)("post", updateUrl, "", [], (0, _defineProperty3.default)({}, dataPath, data));

              case 7:
                payload = _context.sent;


                _this.setState({
                  open: false
                });

                if (payload) {
                  path = "";

                  path = "Licenses[0].licenseNumber";
                  licenseNumber = (0, _get2.default)(payload, path, "");

                  window.location.href = "acknowledgement?purpose=resubmit&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenant + "&secondNumber=" + licenseNumber;
                }
                _context.next = 15;
                break;

              case 12:
                _context.prev = 12;
                _context.t0 = _context["catch"](4);

                toggleSnackbar(true, {
                  labelName: "Workflow update error!",
                  labelKey: "ERR_WF_UPDATE_ERROR"
                }, "error");

              case 15:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, _this2, [[4, 12]]);
      }));

      return function (_x) {
        return _ref2.apply(this, arguments);
      };
    }(), _this.createWorkFLow = function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(label, isDocRequired) {
        var _this$props2, toggleSnackbar, dataPath, preparedFinalObject, data, appendToPath, documents;

        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _this$props2 = _this.props, toggleSnackbar = _this$props2.toggleSnackbar, dataPath = _this$props2.dataPath, preparedFinalObject = _this$props2.preparedFinalObject;
                data = (0, _get2.default)(preparedFinalObject, dataPath, []);


                if (dataPath !== "BPA") {
                  data = data[0];
                }

                //setting the action to send in RequestInfo
                appendToPath = dataPath === "FireNOCs" ? "fireNOCDetails." : "";

                (0, _set2.default)(data, appendToPath + "action", label);

                if (isDocRequired) {
                  documents = (0, _get2.default)(data, "wfDocuments");

                  if (documents && documents.length > 0) {
                    _this.wfUpdate(label);
                  } else {
                    toggleSnackbar(true, { labelName: "Please Upload file !", labelKey: "ERR_UPLOAD_FILE" }, "error");
                  }
                } else {
                  _this.wfUpdate(label);
                }

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, _this2);
      }));

      return function (_x2, _x3) {
        return _ref3.apply(this, arguments);
      };
    }(), _this.openActionDialog = function (item) {
      var _this$props3 = _this.props,
          prepareFinalObject = _this$props3.prepareFinalObject,
          dataPath = _this$props3.dataPath;

      prepareFinalObject(dataPath + "[0].comment", "");
      prepareFinalObject(dataPath + "[0].assignee", []);
      _this.setState({ open: true, data: item });
    }, _this.onClose = function () {
      var prepareFinalObject = _this.props.prepareFinalObject;

      prepareFinalObject("ResubmitAction", false);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ResubmitActionContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          prepareFinalObject = _props.prepareFinalObject,
          onDialogButtonClick = _props.onDialogButtonClick,
          dataPath = _props.dataPath;
      var _props2 = this.props,
          open = _props2.open,
          data = _props2.data;


      return _react2.default.createElement(
        "div",
        { className: "apply-wizard-footer", id: "custom-atoms-footer" },
        _react2.default.createElement(_uiMoleculesLocal.ActionDialog, {
          open: open,
          onClose: this.onClose,
          dialogData: data,
          handleFieldChange: prepareFinalObject,
          onButtonClick: this.createWorkFLow,
          dataPath: dataPath
        })
      );
    }
  }]);
  return ResubmitActionContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;
  var workflow = preparedFinalObject.workflow;

  var _ref4 = workflow || [],
      ProcessInstances = _ref4.ProcessInstances;

  var open = preparedFinalObject.ResubmitAction;

  return { ProcessInstances: ProcessInstances, preparedFinalObject: preparedFinalObject, open: open };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(path, value) {
      return dispatch((0, _actions.prepareFinalObject)(path, value));
    },
    toggleSnackbar: function toggleSnackbar(open, message, variant) {
      return dispatch((0, _actions.toggleSnackbar)(open, message, variant));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ResubmitActionContainer);