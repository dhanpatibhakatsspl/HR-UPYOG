"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _Close = require("@material-ui/icons/Close");

var _Close2 = _interopRequireDefault(_Close);

var _styles = require("@material-ui/core/styles");

var _uiMolecules = require("egov-ui-framework/ui-molecules");

var _actions = require("egov-ui-framework/ui-redux/screen-configuration/actions");

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
    }, _this.getButtonLabelName = function (label) {
      switch (label) {
        case "FORWARD":
          return "Verify and Forward";
        case "MARK":
          return "Mark";
        case "REJECT":
          return "Reject";
        case "CANCEL":
        case "APPROVE":
          return "APPROVE";
        case "PAY":
          return "Pay";
        case "SENDBACK":
          return "Send Back";
        default:
          return label;
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  // onEmployeeClick = e => {
  //   const { handleFieldChange, toggleSnackbar } = this.props;
  //   const selectedValue = e.target.value;
  //   const currentUser = JSON.parse(getUserInfo()).uuid;
  //   if (selectedValue === currentUser) {
  //     toggleSnackbar(
  //       true,
  //       "Please mark to different Employee !",
  //       "error"
  //     );
  //   } else {
  //     handleFieldChange("Licenses[0].assignee", e.target.value);
  //   }
  // };

  (0, _createClass3.default)(ActionDialog, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          open = _props.open,
          onClose = _props.onClose,
          dropDownData = _props.dropDownData,
          handleFieldChange = _props.handleFieldChange,
          onButtonClick = _props.onButtonClick,
          dialogData = _props.dialogData,
          dataPath = _props.dataPath;
      var buttonLabel = dialogData.buttonLabel,
          showEmployeeList = dialogData.showEmployeeList,
          dialogHeader = dialogData.dialogHeader,
          moduleName = dialogData.moduleName,
          isDocRequired = dialogData.isDocRequired;
      var getButtonLabelName = this.getButtonLabelName;

      var fullscreen = false;
      var showAssignee = process.env.REACT_APP_NAME === "Citizen" ? false : true;

      if (dialogData.buttonLabel == "APPROVE" && dialogData.moduleName == "FIRENOC") {
        showAssignee = false;
      }

      if (window.innerWidth <= 768) {
        fullscreen = true;
      }
      if (dataPath === "FireNOCs") {
        dataPath = dataPath + "[0].fireNOCDetails.additionalDetail";
      } else if (dataPath === "Assessment" || dataPath === "Property" || dataPath === "BPA" || dataPath === "Noc") {
        dataPath = dataPath + ".workflow";
      } else {
        dataPath = dataPath + "[0]";
      }
      var assigneePath = '';
      /* The path for Assignee in Property and Assessment has latest workflow contract and it is Array of user object  */
      if (dataPath.includes("Assessment") || dataPath.includes("Property")) {
        assigneePath = dataPath + ".assignes[0].uuid";
      } else {
        assigneePath = dataPath + ".assignee[0]";
      }

      var wfDocumentsPath = void 0;
      if (dataPath === "BPA.workflow") {
        wfDocumentsPath = dataPath + ".varificationDocuments";
      } else if (dataPath === "Noc.workflow") {
        wfDocumentsPath = dataPath + ".documents";
      } else {
        wfDocumentsPath = dataPath + ".wfDocuments";
      }

      return _react2.default.createElement(
        _core.Dialog,
        {
          fullScreen: fullscreen,
          open: open,
          onClose: onClose,
          maxWidth: false,
          style: { zIndex: 2000 }
        },
        _react2.default.createElement(_core.DialogContent, {
          children: _react2.default.createElement(_uiAtoms.Container, {
            children: _react2.default.createElement(
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
                _react2.default.createElement(
                  _core.Typography,
                  { component: "h2", variant: "subheading" },
                  _react2.default.createElement(_uiContainers.LabelContainer, dialogHeader)
                )
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
              showEmployeeList && showAssignee && _react2.default.createElement(
                _core.Grid,
                {
                  item: true,
                  sm: "12",
                  style: {
                    marginTop: 16
                  }
                },
                _react2.default.createElement(_uiContainers.TextFieldContainer, {
                  select: true,
                  style: { marginRight: "15px" },
                  label: fieldConfig.approverName.label,
                  placeholder: fieldConfig.approverName.placeholder,
                  data: dropDownData,
                  optionValue: "value",
                  optionLabel: "label",
                  hasLocalization: false
                  //onChange={e => this.onEmployeeClick(e)}
                  , onChange: function onChange(e) {
                    return handleFieldChange(assigneePath, e.target.value);
                  },
                  jsonPath: assigneePath
                })
              ),
              _react2.default.createElement(
                _core.Grid,
                { item: true, sm: "12" },
                _react2.default.createElement(_uiContainers.TextFieldContainer, {
                  InputLabelProps: { shrink: true },
                  label: fieldConfig.comments.label,
                  onChange: function onChange(e) {
                    return handleFieldChange(dataPath + ".comment", e.target.value);
                  },
                  jsonPath: dataPath + ".comment",
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
                    }),
                    isDocRequired && _react2.default.createElement(
                      "span",
                      { style: { marginLeft: 5, color: "red" } },
                      "*"
                    )
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
                  buttonLabel: { labelName: "UPLOAD FILES", labelKey: "TL_UPLOAD_FILES_BUTTON" },
                  jsonPath: wfDocumentsPath,
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
                      onClick: function onClick() {
                        return onButtonClick(buttonLabel, isDocRequired);
                      }
                    },
                    _react2.default.createElement(_uiContainers.LabelContainer, {
                      labelName: getButtonLabelName(buttonLabel),
                      labelKey: moduleName ? "WF_" + moduleName.toUpperCase() + "_" + buttonLabel : ""
                    })
                  )
                )
              )
            )
          })
        })
      );
    }
  }]);
  return ActionDialog;
}(_react2.default.Component);

exports.default = (0, _styles.withStyles)(styles)(ActionDialog);