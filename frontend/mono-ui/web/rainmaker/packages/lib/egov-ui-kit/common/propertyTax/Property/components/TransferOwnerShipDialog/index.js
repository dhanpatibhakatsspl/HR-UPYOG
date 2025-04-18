"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _components = require("components");

var _commons = require("egov-ui-framework/ui-utils/commons.js");

var _formUtils = require("egov-ui-kit/utils/PTCommon/FormWizardUtils/formUtils");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouterDom = require("react-router-dom");

require("./index.css");

var _styles = require("@material-ui/core/styles");

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bodyStyle = {
  backgroundColor: "#FFFFFF",
  border: "0.5px solid rgba(0, 0, 0, 0)",
  boxShadow: "0 24px 24px 0 rgba(0, 0, 0, 0.3), 0 0 24px 0 rgba(0, 0, 0, 0.22)"
};

var styles = function styles(theme) {
  return {
    root: {
      flexGrow: 1
    },
    paper: {
      height: 140,
      width: 100
    },
    control: {
      padding: theme.spacing.unit * 2
    }
  };
};

var contentStyle = {
  width: "90%",
  maxWidth: "fit-content"
};
var TransferOwnerShipDialog = function TransferOwnerShipDialog(props) {
  // class TransferOwnerShipDialog extends Component { 
  // const classes = useStyles();
  var navigateToRouteUrl = function navigateToRouteUrl(envURL) {
    props.closeDialogue();
    // routeToCommonPay(this.props.consumerCode, this.props.tenantId);
    props.history.push(envURL);
  };

  // dialogContent = (amount) => {
  //   return getLocaleLabels("PT_YOU_HAVE", "PT_YOU_HAVE") + " " + getLocaleLabels("PT_MUTATION_RS", "PT_MUTATION_RS") + "<b>" + amount + "</b>" + " " + getLocaleLabels("PT_PENDING_AMOUNT", "PT_PENDING_AMOUNT") + "<br/>" + getLocaleLabels("PT_INORDER_TO_TRANSFER", "PT_INORDER_TO_TRANSFER");
  // }
  var open = props.open,
      closeDialogue = props.closeDialogue,
      amount = props.amount,
      routeUrl = props.routeUrl;

  var printDiv = function printDiv() {
    var content = document.getElementById("documents-div").innerHTML;
    var printWindow = window.open("", "");

    printWindow.document.write("<html><body>" + content + "</body></html>");

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };
  return _react2.default.createElement(_components.Dialog, {
    open: open,
    scroll: "paper",
    children: [_react2.default.createElement(
      "div",
      { style: { overflow: "hidden" } },
      _react2.default.createElement(
        "div",
        { style: { margin: "16px", marginBottom: "0" } },
        _react2.default.createElement(_translationNode2.default, { label: "PT_REQIURED_DOC_TRANSFER_OWNERSHIP", fontSize: "20px", labelClassName: "pending-amount-due" })
      ),
      _react2.default.createElement("br", null),
      _react2.default.createElement(
        "div",
        { className: "dialog-content transfer-ownership-dialog-content", id: "documents-div", style: { margin: "16px", marginTop: "0" } },
        props.documents.map(function (item1) {
          return _react2.default.createElement(
            "div",
            { className: "pt-custom-dialog-gray-card" },
            _react2.default.createElement(
              "div",
              { style: { marginBottom: "12px" } },
              _react2.default.createElement(_translationNode2.default, { className: "document-header", fontSize: "16px", color: "rgba(0, 0, 0, 0.87", label: item1.code })
            ),
            _react2.default.createElement(
              "div",
              { className: "pt-custom-dialog-container" },
              _react2.default.createElement(
                _Grid2.default,
                { container: true, className: props.classes.root, spacing: 16 },
                _react2.default.createElement(
                  _Grid2.default,
                  { item: true, xs: 12 },
                  _react2.default.createElement(
                    _Grid2.default,
                    { container: true, className: props.classes.demo, spacing: 32 },
                    item1.dropdownData.map(function (item2, index) {
                      return _react2.default.createElement(
                        _Grid2.default,
                        { key: item2.code, item: true },
                        _react2.default.createElement(_translationNode2.default, { className: "document-header", indexNumber: index + 1, fontSize: "12px", label: item2.code })
                      );
                    })
                  )
                )
              )
            ),
            _react2.default.createElement(
              "div",
              null,
              _react2.default.createElement(_translationNode2.default, { className: "document-header", fontSize: "12px", color: "rgba(0, 0, 0, 0.87", label: item1.description })
            )
          );
        })
      ),
      _react2.default.createElement(
        "div",
        { className: "transfer-ownership-dialog-footer", style: { marginTop: 10 } },
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_PRINT", fontSize: "16px", color: "#fe7a51", padding: "0", lineHeight: "25px !important", labelClassName: "footer-button-label" }),
          buttonStyle: { border: "1px solid #fe7a51", padding: 0 },
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51" },
          className: "footer-button",
          onClick: function onClick() {
            printDiv();
          }
        }),
        _react2.default.createElement(_components.Button, {
          label: _react2.default.createElement(_translationNode2.default, { buttonLabel: true, label: "PT_TRANFER_OWNERSHIP", fontSize: "16px", lineHeight: "25px !important", labelClassName: "footer-button-label" }),
          primary: true,
          className: "footer-button",
          labelStyle: { letterSpacing: 0.7, padding: 0, color: "#fe7a51", lineHeight: "20px" },
          buttonStyle: { padding: 0 },
          onClick: function onClick() {
            navigateToRouteUrl(routeUrl);
          }
        })
      )
    )],
    bodyStyle: bodyStyle,
    isClose: true,
    handleClose: closeDialogue,
    onRequestClose: closeDialogue,
    contentStyle: contentStyle,
    contentClassName: "transfer-doc-required-content"
  });
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRouterDom.withRouter)(TransferOwnerShipDialog));