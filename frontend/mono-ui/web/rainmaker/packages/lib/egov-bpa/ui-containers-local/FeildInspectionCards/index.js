"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  whiteCard: {
    backgroundColor: "#FFFFFF",
    padding: 10,
    marginTop: 16
  },
  subtext: {
    paddingTop: 10
  },
  subtext1: {
    paddingTop: 5
  },
  body2: {
    wordWrap: "break-word"
  },
  documentIcon: {
    backgroundColor: "#f2f2f2",
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
    lineHeight: "24px"
  }
};

var documentTitle = {
  color: "rgba(0, 0, 0, 0.87)",
  fontFamily: "Roboto",
  fontSize: "16px",
  fontWeight: 400,
  letterSpacing: "0.67px",
  lineHeight: "19px"
};

function FeildInspectionCards(props) {
  var classes = props.classes,
      data = props.data,
      rest = (0, _objectWithoutProperties3.default)(props, ["classes", "data"]);

  return _react2.default.createElement(
    _Grid2.default,
    (0, _extends3.default)({ container: true }, rest),
    data && data.map(function (item, key) {
      return _react2.default.createElement(
        _Grid2.default,
        {
          container: true,
          className: props.backgroundGrey ? (0, _classnames2.default)(classes.whiteCard, "background-grey") : classes.whiteCard
        },
        _react2.default.createElement(
          _Grid2.default,
          (0, _defineProperty3.default)({ item: true, xs: 2, sm: 1, className: classes.iconDiv }, "className", classes.subtext1),
          _react2.default.createElement(
            "div",
            { className: classes.documentIcon },
            _react2.default.createElement(
              "span",
              null,
              key + 1
            )
          )
        ),
        _react2.default.createElement(
          _Grid2.default,
          {
            item: true,
            xs: 10,
            sm: 5,
            md: 4,
            align: "left"
          },
          _react2.default.createElement(
            _Typography2.default,
            (0, _defineProperty3.default)({ className: classes.body2 }, "className", classes.subtext),
            _react2.default.createElement(_uiContainers.LabelContainer, {
              labelKey: (0, _commons.getTransformedLocale)(item.question)
            })
          )
        ),
        _react2.default.createElement(
          _Grid2.default,
          { item: true, xs: 12, sm: 6, md: 4, className: classes.subtext },
          _react2.default.createElement(
            _Typography2.default,
            { className: classes.body2 },
            _react2.default.createElement(_uiContainers.LabelContainer, {
              labelKey: "BPA_ADD_HOC_CHARGES_POPUP_BUTTON_" + item.value
            })
          )
        ),
        _react2.default.createElement(
          _Grid2.default,
          {
            item: true,
            xs: 12,
            sm: 12,
            md: 3, align: "left",
            className: classes.descriptionDiv },
          _react2.default.createElement(_uiContainers.LabelContainer, {
            labelKey: (0, _commons.getTransformedLocale)("BPA_REMARKS"),
            style: styles.documentName
          }),
          _react2.default.createElement(
            _Typography2.default,
            { variant: "caption" },
            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: item.remarks })
          )
        )
      );
    })
  );
}

exports.default = (0, _styles.withStyles)(styles)(FeildInspectionCards);