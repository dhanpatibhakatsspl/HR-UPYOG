"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Icon = require("@material-ui/core/Icon");

var _Icon2 = _interopRequireDefault(_Icon);

var _styles = require("@material-ui/core/styles");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiMoleculesLocal = require("../../ui-molecules-local");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var requiredIcon = _react2.default.createElement(
  "sup",
  { style: { color: "#5b5b5b", fontSize: "12px", paddingLeft: "5px" } },
  "*"
);
var styles = {
  documentTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.67px",
    lineHeight: "19px",
    paddingBottom: "5px"
  },
  documentName: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 400,
    letterSpacing: "0.67px",
    lineHeight: "19px"
  },
  dropdownLabel: {
    color: "rgba(0, 0, 0, 0.54)",
    fontSize: "12px"
  }
};
var cellstyle = {
  display: "flex",
  alignItems: "center"
};
var themeStyles = function themeStyles(theme) {
  return {
    documentContainer: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "16px"
    },
    documentCard: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "16px"
    },
    documentSubCard: {
      backgroundColor: "#F2F2F2",
      padding: "16px",
      marginTop: "10px",
      marginBottom: "10px",
      border: "#d6d6d6",
      borderStyle: "solid",
      borderWidth: "1px"
    },
    documentIcon: {
      backgroundColor: "#FFFFFF",
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      color: "rgba(0, 0, 0, 0.8700000047683716)",
      fontFamily: "Roboto",
      fontSize: "20px",
      fontWeight: 400,
      letterSpacing: "0.83px",
      lineHeight: "24px",
      marginTop: "20px"
    },
    documentSuccess: {
      borderRadius: "100%",
      width: "36px",
      height: "36px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#39CB74",
      color: "white",
      marginTop: "20px"
    },
    button: {
      margin: theme.spacing.unit,
      padding: "8px 38px"
    },
    input: {
      display: "none"
    },
    iconDiv: {
      display: "flex",
      alignItems: "center"
    },
    descriptionDiv: {
      alignItems: "center",
      display: "block",
      marginTop: "20px"
    },
    formControl: {
      minWidth: 250,
      padding: "0px"
    },
    fileUploadDiv: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      paddingTop: "5px",
      "& input": {
        display: "none"
      }
    }
  };
};
var documentTitle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 400,
  letterSpacing: "0.67px",
  lineHeight: "19px"
};

var documentTitleOrg = {
  color: "#CA9382",
  fontFamily: "Roboto",
  fontSize: "12px",
  fontWeight: 400,
  letterSpacing: "0.67px",
  lineHeight: "19px",
  background: "#FEF0E7",
  borderRadius: "20px",
  padding: 10,
  display: "inline-block"
};

var documentTitlegrey = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 400,
  background: "#F3F4F6",
  borderRadius: "50%",
  padding: "10px 18px",
  display: "inline-block"
};
var relpos = {
  position: "relative"
};
var UploadCard = function UploadCard(props) {
  var classes = props.classes,
      docItem = props.docItem,
      docIndex = props.docIndex,
      name = props.name,
      jsonPath = props.jsonPath,
      ids = props.ids,
      specificStyles = props.specificStyles,
      rest = (0, _objectWithoutProperties3.default)(props, ["classes", "docItem", "docIndex", "name", "jsonPath", "ids", "specificStyles"]);

  var forUpBtn = specificStyles ? specificStyles : "upload_btn";
  return _react2.default.createElement(
    _Grid2.default,
    { container: true, style: relpos },
    !props.isFromPreview ? _react2.default.createElement(
      _Grid2.default,
      { item: true, xs: 4, sm: 2, md: 1, className: cellstyle },
      docItem && docItem.documents && docItem.documents.length > 0 ? _react2.default.createElement(
        "div",
        { className: classes.documentSuccess },
        _react2.default.createElement(
          _Icon2.default,
          null,
          _react2.default.createElement(
            "i",
            { "class": "material-icons" },
            "done"
          )
        )
      ) : _react2.default.createElement(
        "div",
        { className: classes.documentIcon },
        _react2.default.createElement(
          "span",
          null,
          docIndex + 1
        )
      )
    ) : "",
    _react2.default.createElement(
      _Grid2.default,
      {
        item: true,
        xs: 10,
        sm: 5,
        md: 4,
        align: "left",
        className: classes.descriptionDiv
      },
      _react2.default.createElement(_uiContainers.LabelContainer, {
        labelKey: (0, _commons.getTransformedLocale)(docItem.name),
        style: styles.documentName
      }),
      docItem.required && requiredIcon,
      _react2.default.createElement(
        _Typography2.default,
        { variant: "caption" },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelKey: (0, _commons.getTransformedLocale)("TL_UPLOAD_RESTRICTIONS")
        })
      )
    ),
    _react2.default.createElement(
      _Grid2.default,
      { item: true, xs: 12, sm: 6, md: 4 },
      docItem.dropDownValues ? _react2.default.createElement(_uiContainers.TextFieldContainer, {
        select: true,
        label: {
          labelKey: (0, _commons.getTransformedLocale)(docItem.dropDownValues.label)
        },
        placeholder: { labelKey: docItem.dropDownValues.label },
        data: docItem.dropDownValues.menu,
        optionValue: "code",
        optionLabel: "label",
        autoSelect: true,
        required: !docItem.isDocumentRequired ? docItem.required : docItem.isDocumentRequired,
        onChange: function onChange(event) {
          return props.handleChange(docIndex, event);
        },
        jsonPath: jsonPath + "[" + docIndex + "].dropDownValues.value"
      }) : ""
    ),
    _react2.default.createElement(
      _Grid2.default,
      {
        item: true,
        xs: 12,
        sm: 12
        // md={6}
        , className: classes.fileUploadDiv,
        style: { display: "inline-block !important;" }
      },
      _react2.default.createElement(
        "div",
        { className: forUpBtn },
        _react2.default.createElement(_uiMoleculesLocal.UploadMultipleFile, {
          classes: props.classes,
          handleFileUpload: function handleFileUpload(e) {
            return (0, _commons.handleFileUpload)(e, props.handleDocument, props);
          },
          uploaded: docItem && docItem.documents ? true : false,
          removeDocument: function removeDocument(uploadedDocIndex) {
            return props.removeDocument(docIndex, uploadedDocIndex);
          },
          documents: docItem && docItem.documents,
          onButtonClick: function onButtonClick() {
            return props.onUploadClick(docIndex);
          },
          inputProps: props.inputProps,
          buttonLabel: props.buttonLabel,
          id: ids ? ids : "doc-" + (docIndex + 1)
        })
      )
    ),
    props.isFromPreview ? _react2.default.createElement(
      _Grid2.default,
      { item: true, xs: 12 },
      _react2.default.createElement(
        _Button2.default,
        {
          color: "primary",
          style: { float: "right" },
          onClick: function onClick() {
            return props.toggleEditClick(docIndex);
          }
        },
        _react2.default.createElement(_uiContainers.LabelContainer, {
          labelKey: (0, _commons.getTransformedLocale)("NOC_PREVIEW_LABEL")
        })
      )
    ) : ""
  );
};

UploadCard.propTypes = {};

exports.default = (0, _styles.withStyles)(themeStyles)(UploadCard);