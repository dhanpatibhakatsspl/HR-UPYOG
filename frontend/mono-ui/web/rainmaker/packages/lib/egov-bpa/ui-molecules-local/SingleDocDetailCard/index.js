"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("@material-ui/core/styles");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _Tooltip = require("@material-ui/core/Tooltip");

var _Tooltip2 = _interopRequireDefault(_Tooltip);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LightTooltip = (0, _styles.withStyles)(function (theme) {
  return {
    tooltip: {
      fontSize: 13
    }
  };
})(_Tooltip2.default);

var styles = {
  whiteCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingLeft: 8,
    paddingRight: 0,
    paddingTop: 11,
    paddingBottom: 10,
    marginRight: 16,
    marginTop: 16,
    display: "inline-flex"
  },
  tooltip: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 13
  },
  body2: {
    wordWrap: "break-word"
  }
};

var cellstyle = {
  display: "flex",
  alignItems: "center",
  maxWidth: "22.8%"
};

var tablestyle = {
  display: "flex",
  alignItems: "center"
  //maxWidth: "32.8%"

};

var documentTitle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "14px",
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
  lineHeight: "10px",
  background: "#FEF0E7",
  borderRadius: "20px",
  padding: 10,
  display: "inline-block",
  margiTop: 10,
  width: 100,
  overflow: "hidden",
  whiteSpace: "nowrap",
  textOverflow: "ellipsis",
  textAlign: "center"
};

var documentTitlegrey = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "12px",
  fontWeight: 400,
  background: "#F3F4F6",
  borderRadius: "50%",
  padding: "10px 18px",
  display: "flex",
  width: "40px",
  height: "40px",
  position: "relative",
  overflow: "hidden",
  alignItems: "center",
  flexShrink: "0",
  justifyContent: "center"
};

var fontStyle = {
  fontSize: "12px",
  position: "absolute",
  float: "left",
  clear: "left",
  paddingTop: "32px"
};
var marginStyle = {
  fontSize: "12px",
  margin: "auto"
};

var documentStyle = {
  fontSize: "12px",
  margin: "auto"
};

function SingleDocDetailCard(props) {
  var classes = props.classes,
      docItem = props.docItem,
      docIndex = props.docIndex,
      name = props.name,
      rest = (0, _objectWithoutProperties3.default)(props, ["classes", "docItem", "docIndex", "name"]);

  return _react2.default.createElement(
    _Grid2.default,
    { container: true, spacing: 3 },
    _react2.default.createElement(
      _Grid2.default,
      {
        item: true,
        md: 12,
        xs: 12,
        sm: 12,
        className: props.backgroundGrey ? (0, _classnames2.default)(classes.whiteCard, "background-grey") : classes.whiteCard
      },
      _react2.default.createElement(
        _Grid2.default,
        { xs: 1, style: cellstyle },
        _react2.default.createElement(
          "div",
          { style: documentTitlegrey },
          docIndex + 1
        )
      ),
      _react2.default.createElement(
        _Grid2.default,
        { xs: 12, sm: 6, style: tablestyle },
        _react2.default.createElement(
          "div",
          { style: { float: "left", position: "absolute", paddingBottom: "8px" } },
          _react2.default.createElement(_uiContainers.LabelContainer, {
            labelName: (0, _commons.getTransformedLocale)(docItem.documentCode),
            labelKey: (0, _commons.getTransformedLocale)(docItem.documentCode),
            style: documentTitle
          })
        ),
        _react2.default.createElement(
          "div",
          { style: fontStyle },
          _react2.default.createElement(
            "span",
            null,
            _react2.default.createElement(_uiContainers.LabelContainer, {
              labelKey: !docItem.dropDownValues ? "" : (0, _commons.getTransformedLocale)(docItem.dropDownValues.value)
            })
          )
        )
      ),
      _react2.default.createElement(
        _Grid2.default,
        { xs: 9, className: classes.subtext },
        docItem.documents && docItem.documents.length > 0 ? _react2.default.createElement(
          "div",
          null,
          docItem.documents.map(function (doc) {
            return _react2.default.createElement(
              _Grid2.default,
              {
                xs: 7,
                style: {
                  display: "inline-block",
                  marginRight: "3px",
                  padding: "2px 0px 10px"

                }
              },
              _react2.default.createElement(
                LightTooltip,
                { title: doc.fileName, arrow: true },
                _react2.default.createElement(
                  "div",
                  { title: doc.fileName, style: documentTitleOrg },
                  doc.fileName
                )
              )
            );
          })
        ) : _react2.default.createElement(
          _Grid2.default,
          { xs: 7 },
          _react2.default.createElement(
            _Typography2.default,
            { style: documentStyle },
            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "BPA_NO_DOCS_UPLOAD_LABEL" })
          )
        )
      )
    )
  );
}

SingleDocDetailCard.propTypes = {};

exports.default = (0, _styles.withStyles)(styles)(SingleDocDetailCard);