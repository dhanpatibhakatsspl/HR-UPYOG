"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _core = require("@material-ui/core");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _Close = require("@material-ui/icons/Close");

var _Close2 = _interopRequireDefault(_Close);

var _styles = require("@material-ui/core/styles");

var _uiMolecules = require("egov-ui-framework/ui-molecules");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

var _actions2 = require("egov-ui-framework/ui-redux/app/actions");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _api = require("egov-ui-framework/ui-utils/api");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _set = require("lodash/set");

var _set2 = _interopRequireDefault(_set);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    root: {
      marginTop: 24,
      width: "100%"
    }
  };
};

var fieldConfig = {
  approverName: {
    label: {
      labelName: "Assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_LABEL"
    },
    placeholder: {
      labelName: "Select assignee Name",
      labelKey: "WF_ASSIGNEE_NAME_PLACEHOLDER"
    }
  },
  comments: {
    label: {
      labelName: "Comments",
      labelKey: "WF_COMMON_COMMENTS"
    },
    placeholder: {
      labelName: "Enter Comments",
      labelKey: "WF_ADD_HOC_CHARGES_POPUP_COMMENT_LABEL"
    }
  }
};

var ActionDialog = function (_React$Component) {
  (0, _inherits3.default)(ActionDialog, _React$Component);

  function ActionDialog() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, ActionDialog);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = ActionDialog.__proto__ || Object.getPrototypeOf(ActionDialog)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      employeeList: [],
      roles: ""

    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(ActionDialog, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          onClose = _props.onClose,
          handleFieldChange = _props.handleFieldChange,
          updateTheApplication = _props.updateTheApplication,
          applicationAction = _props.applicationAction,
          error = _props.error,
          errorMessage = _props.errorMessage;

      var fullscreen = false;
      if (window.innerWidth <= 768) {
        fullscreen = true;
      }

      onClose = function onClose() {
        var _props2 = _this2.props,
            handleField = _props2.handleField,
            bpaDetails = _props2.bpaDetails;

        _this2.props.handleField();
      };

      handleFieldChange = function handleFieldChange(jsonPath, value) {
        var _props3 = _this2.props,
            prepareFinalObject = _props3.prepareFinalObject,
            bpaDetails = _props3.bpaDetails;

        if (bpaDetails && bpaDetails.workflow) {
          bpaDetails.workflow.comments = value;
        } else {
          bpaDetails.workflow = {};
          bpaDetails.workflow.comments = value;
        }

        prepareFinalObject("BPA", bpaDetails);
      };

      updateTheApplication = function () {
        var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
          var _props4, bpaDetails, applicationAction, toggleSnackbar, prepareFinalObject, applicationProcessInstances, applicationNumber, tenantId, comment, getId, uuids, response, appPath, acknowledgementUrl;

          return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  _props4 = _this2.props, bpaDetails = _props4.bpaDetails, applicationAction = _props4.applicationAction, toggleSnackbar = _props4.toggleSnackbar, prepareFinalObject = _props4.prepareFinalObject, applicationProcessInstances = _props4.applicationProcessInstances;
                  applicationNumber = (0, _get2.default)(bpaDetails, "applicationNo");
                  tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
                  comment = (0, _get2.default)(bpaDetails, "workflow.comments");

                  (0, _set2.default)(bpaDetails, "workflow.action", applicationAction);
                  if ((0, _get2.default)(bpaDetails, "status").includes("CITIZEN_ACTION_PENDING")) {
                    getId = (0, _get2.default)(applicationProcessInstances, "assigner.uuid");
                    uuids = { uuid: getId };

                    bpaDetails.assignees = [uuids];
                    bpaDetails.assignee = [getId];
                  }

                  if (!(comment && applicationAction === "SEND_TO_ARCHITECT" || applicationAction === "APPROVE" || applicationAction === "FORWARD")) {
                    _context.next = 13;
                    break;
                  }

                  _context.next = 9;
                  return (0, _api.httpRequest)("post", "bpa-services/v1/bpa/_update", "", [], { BPA: bpaDetails });

                case 9:
                  response = _context.sent;

                  if (response && response.BPA && response.BPA.length > 0) {
                    appPath = "egov-bpa";

                    if ((0, _get2.default)(response, "BPA[0].businessService") === "BPA_OC") {
                      appPath = "oc-bpa";
                    }
                    acknowledgementUrl = process.env.REACT_APP_SELF_RUNNING === "true" ? "/egov-ui-framework/" + appPath + "/acknowledgement?purpose=" + applicationAction + "&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId : "/" + appPath + "/acknowledgement?purpose=" + applicationAction + "&status=success&applicationNumber=" + applicationNumber + "&tenantId=" + tenantId;

                    _this2.props.setRoute(acknowledgementUrl);
                  }
                  _context.next = 14;
                  break;

                case 13:
                  toggleSnackbar(true, {
                    labelName: "Please fill comment",
                    labelKey: "BPA_REMARKS_LABEL"
                  }, "info");

                case 14:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this2);
        }));

        return function updateTheApplication() {
          return _ref2.apply(this, arguments);
        };
      }();

      return _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(
          _core.Grid,
          {
            container: "true",
            spacing: 12,
            marginTop: 16,
            className: "action-container"
          },
          _react2.default.createElement(
            _core.Grid,
            {
              style: {
                alignItems: "center",
                display: "flex"
              },
              item: true,
              sm: 10
            },
            _react2.default.createElement(_core.Typography, { component: "h2", variant: "subheading" })
          ),
          _react2.default.createElement(
            _core.Grid,
            {
              item: true,
              sm: 2,
              style: {
                textAlign: "right",
                cursor: "pointer",
                position: "absolute",
                right: "16px",
                top: "16px"
              },
              onClick: onClose
            },
            _react2.default.createElement(_Close2.default, null)
          ),
          _react2.default.createElement(
            _core.Grid,
            { item: true, sm: "12" },
            _react2.default.createElement(_uiContainers.TextFieldContainer, {
              InputLabelProps: { shrink: true },
              label: fieldConfig.comments.label,
              required: true,
              error: error,
              helperText: errorMessage,
              onChange: function onChange(e) {
                return handleFieldChange("BPA.workflow.comments", e.target.value);
              },
              jsonPath: "BPA.workflow.comments",
              placeholder: fieldConfig.comments.placeholder
            })
          ),
          _react2.default.createElement(
            _core.Grid,
            { item: true, sm: "12" },
            _react2.default.createElement(
              _core.Typography,
              {
                component: "h3",
                variant: "subheading",
                style: {
                  color: "rgba(0, 0, 0, 0.8700000047683716)",
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px",
                  marginBottom: "8px"
                }
              },
              _react2.default.createElement(
                "div",
                { className: "rainmaker-displayInline" },
                _react2.default.createElement(_uiContainers.LabelContainer, {
                  labelName: "Supporting Documents",
                  labelKey: "WF_APPROVAL_UPLOAD_HEAD"
                })
              )
            ),
            _react2.default.createElement(
              "div",
              {
                style: {
                  color: "rgba(0, 0, 0, 0.60)",
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontWeight: 400,
                  lineHeight: "20px"
                }
              },
              _react2.default.createElement(_uiContainers.LabelContainer, {
                labelName: "Only .jpg and .pdf files. 5MB max file size.",
                labelKey: "WF_APPROVAL_UPLOAD_SUBHEAD"
              })
            ),
            _react2.default.createElement(_uiMolecules.UploadMultipleFiles, {
              maxFiles: 4,
              inputProps: {
                accept: "image/*, .pdf, .png, .jpeg"
              },
              buttonLabel: { labelName: "UPLOAD FILES", labelKey: "BPA_UPLOAD_FILES_BUTTON" },
              jsonPath: "BPA.workflow.varificationDocuments",
              maxFileSize: 5000
            }),
            _react2.default.createElement(
              _core.Grid,
              { sm: 12, style: { textAlign: "right" }, className: "bottom-button-container" },
              _react2.default.createElement(
                _core.Button,
                {
                  variant: "contained",
                  color: "primary",
                  style: {
                    minWidth: "200px",
                    height: "48px"
                  },
                  className: "bottom-button",
                  onClick: function onClick(e) {
                    return updateTheApplication("BPA", e);
                  }
                },
                _react2.default.createElement(_uiContainers.LabelContainer, {
                  labelName: "send to architect",
                  labelKey: "BPA_" + applicationAction + "_BUTTON"
                })
              )
            )
          )
        )
      );
    }
  }]);
  return ActionDialog;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
  var screenConfiguration = state.screenConfiguration;
  var moduleName = screenConfiguration.moduleName;

  var applicationAction = ownprops.applicationAction;
  var bpaDetails = (0, _get2.default)(screenConfiguration.preparedFinalObject, "BPA", {});
  var applicationProcessInstances = (0, _get2.default)(screenConfiguration.preparedFinalObject, "applicationProcessInstances");
  var applicationProps = screenConfiguration;
  return { applicationProps: applicationProps, moduleName: moduleName, bpaDetails: bpaDetails, applicationAction: applicationAction, applicationProcessInstances: applicationProcessInstances };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    prepareFinalObject: function prepareFinalObject(jsonPath, value) {
      return dispatch((0, _actions.prepareFinalObject)(jsonPath, value));
    },
    toggleSnackbar: function toggleSnackbar(open, message, variant) {
      return dispatch((0, _actions.toggleSnackbar)(open, message, variant));
    },
    setRoute: function setRoute(route) {
      return dispatch((0, _actions2.setRoute)(route));
    },
    handleField: function handleField(value) {
      return dispatch((0, _actions.handleScreenConfigurationFieldChange)("search-preview", "components.div.children.sendToArchPickerDialog", "props.open", false));
    }
  };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(ActionDialog));