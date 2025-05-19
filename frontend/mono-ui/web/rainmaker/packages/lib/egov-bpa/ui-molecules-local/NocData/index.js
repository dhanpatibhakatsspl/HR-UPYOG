"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _groupBy = require("lodash/groupBy");

var _groupBy2 = _interopRequireDefault(_groupBy);

var _commons = require("egov-ui-framework/ui-utils/commons");

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _utils = require("../../ui-config/screens/specs/utils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LightTooltip = (0, _styles.withStyles)(function (theme) {
  return {
    tooltip: {
      fontSize: 12
    }
  };
})(_Tooltip2.default);
var styles = {

  body2: {
    wordWrap: "break-word"
  },

  documentTitle: {
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    fontSize: "16px",
    fontWeight: 500,
    letterSpacing: "0.67px",
    lineHeight: "19px",
    paddingBottom: "5px"
  },
  whiteCard: {
    // maxWidth: 250,
    width: "100%",
    backgroundColor: "#FFFFFF",
    // paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 3,
    paddingBottom: 10,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 16,
    // marginBottom:4,
    display: "inline-flex"
  },
  fontStyle: {
    fontSize: "12px",
    fontWeight: "500",
    color: "rgba(0, 0, 0, 0.87)",
    fontFamily: "Roboto",
    wordBreak: "break-word",
    width: "90%",
    marginRight: "7px"
    // width:150,
    // overflow: "hidden", 
    // whiteSpace: "nowrap",
    // textOverflow: "ellipsis",
    // marginLeft:"7px",
  },
  labelStyle: {
    position: "relative",
    fontFamily: "Roboto",
    fontSize: 14,
    letterSpacing: 0.6,
    padding: "5px 0px",
    display: "inline-block"
  },
  underlineStyle: {
    position: "absolute",
    bottom: -1,
    borderBottom: "2px solid #FE7A51",
    width: "100%"
  },
  dividerStyle: {
    borderBottom: "1px solid rgba(5, 5, 5, 0.12)",
    width: "100%"
  },
  documentContainer: {
    backgroundColor: "#FFFFFF",
    padding: "16px",
    marginTop: "10px",
    marginBottom: "16px"
  }
};
var marginStyle1 = {
  fontSize: "14px",
  fontWeight: "500",
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  maxWidth: "12%"
};
var cellstyle = {
  display: "flex",
  alignItems: "center",
  maxWidth: "0% !important",
  fontSize: "10px"
};
var style = {
  display: "inline-grid",
  alignItems: "center",
  maxWidth: "22.8%"
};
var tablestyle = {
  display: "inline-grid",
  alignItems: "end",
  maxWidth: "23.3%",
  marginTop: "auto"
};

var documentTitle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "12px",
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
  lineHeight: "8px",
  background: "#FEF0E7",
  borderRadius: "20px",
  padding: 10,
  display: "inline-block"
};

var documentTitlegrey = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "12px",
  fontWeight: 400,
  background: "#F3F4F6",
  borderRadius: "50%",
  padding: "10px 18px",
  display: "inline-block"
};

var fontStyle = {
  fontSize: "12px",
  fontWeight: "500",
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  width: 150,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis"
  // marginLeft:"7px",
};

var titleStyle = {
  fontWeight: "bold",
  fontSize: "12px",
  // fontWeight: "500",
  // color: "rgba(120,110,110,0.64)",
  fontFamily: "Roboto"
  // marginLeft:"7px",

};

var marginStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto"
};

var floatStyle = {
  fontSize: "14px",
  fontWeight: "500",
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  width: "100%"
};
var requiredIcon = _react2.default.createElement(
  "sup",
  { style: { color: "#5b5b5b", fontSize: "12px", paddingLeft: "5px" } },
  "*"
);

var NocData = function (_Component) {
  (0, _inherits3.default)(NocData, _Component);

  function NocData() {
    (0, _classCallCheck3.default)(this, NocData);
    return (0, _possibleConstructorReturn3.default)(this, (NocData.__proto__ || Object.getPrototypeOf(NocData)).apply(this, arguments));
  }

  (0, _createClass3.default)(NocData, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          docItem = _props.docItem,
          docIndex = _props.docIndex,
          name = _props.name,
          rest = (0, _objectWithoutProperties3.default)(_props, ["classes", "docItem", "docIndex", "name"]);


      var submittedOn = void 0,
          satus = "";
      if (docItem.additionalDetails) {
        if (docItem.additionalDetails.submissionDetails) {
          submittedOn = docItem.additionalDetails.submissionDetails.SubmittedOn;
        }
        satus = docItem.additionalDetails.applicationStatus;
      }
      return _react2.default.createElement(
        _react2.default.Fragment,
        null,
        _react2.default.createElement(
          _Grid2.default,
          { container: true, spacing: 3,
            className: this.props.backgroundGrey ? (0, _classnames2.default)(styles.whiteCard, "background-grey") : styles.whiteCard
          },
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3 },
            _react2.default.createElement(
              _Typography2.default,
              {
                variant: "subtitle1",
                style: { fontWeight: "bold", fontSize: "12px", paddingTop: "12px" }
              },
              _react2.default.createElement(_uiContainers.LabelContainer, {
                labelKey: "BPA_STATUS_LABEL"
              })
            ),
            _react2.default.createElement(_uiContainers.LabelContainer, {
              labelKey: (0, _commons.getTransformedLocale)(satus),
              style: styles.fontStyle
            })
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 3 },
            _react2.default.createElement(
              _Typography2.default,
              {
                variant: "subtitle1",
                style: { fontWeight: "bold", fontSize: "12px", paddingTop: "12px" }
              },
              _react2.default.createElement(_uiContainers.LabelContainer, {
                labelKey: "BPA_SUDMITTED_ON_LABEL"
              })
            ),
            _react2.default.createElement(
              "div",
              { style: styles.fontStyle },
              !submittedOn ? "NA" : (0, _utils.convertEpochToDate)(JSON.parse(submittedOn))
            )
          ),
          satus === "APPROVED" || satus === "REJECTED" || satus === "AUTO_APPROVED" || satus === "AUTO_REJECTED" ? _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 6 },
            _react2.default.createElement(
              _Typography2.default,
              {
                variant: "subtitle1",
                style: { fontWeight: "bold", fontSize: "12px", paddingTop: "12px" }
              },
              _react2.default.createElement(_uiContainers.LabelContainer, {
                labelKey: "BPA_APPROVED_REJECTED_ON_LABEL"
              })
            ),
            _react2.default.createElement(
              "div",
              { style: styles.fontStyle },
              !satus ? "NA" : docItem.additionalDetails && (0, _utils.convertEpochToDate)(docItem.additionalDetails.approvedRejectedOn)
            )
          ) : ""
        ),
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 12 },
          _react2.default.createElement(
            "div",
            { style: styles.dividerStyle },
            _react2.default.createElement(
              "div",
              { style: styles.labelStyle },
              _react2.default.createElement(
                "span",
                null,
                _react2.default.createElement(_uiContainers.LabelContainer, {
                  labelKey: "BPA_COMMON_DOCS"
                })
              ),
              _react2.default.createElement("div", { style: styles.underlineStyle })
            )
          )
        )
      );
    }
  }]);
  return NocData;
}(_react.Component);

NocData.propTypes = {};

exports.default = (0, _styles.withStyles)(styles)(NocData);