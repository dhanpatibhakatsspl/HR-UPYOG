"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("egov-ui-framework/ui-containers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  root: {
    color: 'rgba(0, 0, 0, 0.54)',
    // fontSize: '16px',
    fontWeight: "bold",
    // paddingBottom: "6px",
    fontSize: "12px"
    // lineHeight: '1.375em',
  },
  linkDetails: {
    color: 'rgb(245, 117, 66)',
    fontSize: '12px',
    fontWeight: 500,
    fontFamily: 'Roboto',
    lineHeight: '19px',
    letterSpacing: '0.67px',
    textDecoration: 'none',
    '&:hover': {
      color: 'rgb(245, 117, 66)'
    },
    '&:active': {
      color: 'rgb(245, 117, 66)'
    },
    '&:visited': {
      color: 'rgb(245, 117, 66)'
    },
    '&:link': {
      color: 'rgb(245, 117, 66)'
    }

  }
};

var LinkAtom = function LinkAtom(props) {
  var linkDetail = props.linkDetail,
      classes = props.classes;

  return _react2.default.createElement(
    "div",
    null,
    _react2.default.createElement(
      "div",
      { className: classes.root },
      _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: linkDetail.labelName })
    ),
    linkDetail.value ? _react2.default.createElement(
      "a",
      { className: classes.linkDetails, href: linkDetail.value, target: "_blank", rel: "noopener noreferrer" },
      linkDetail.valueName
    ) : _react2.default.createElement(
      "div",
      { className: classes.linkDetails },
      linkDetail.valueName
    )
  );
};

// LinkAtom.propTypes = {
// };
exports.default = (0, _styles.withStyles)(styles)(LinkAtom);