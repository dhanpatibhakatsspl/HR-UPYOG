"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var logoStyle = {
  height: "6em",
  width: "6em"
};

var PdfHeader = function PdfHeader(_ref) {
  var _ref$header = _ref.header,
      header = _ref$header === undefined ? {} : _ref$header,
      _ref$subHeader = _ref.subHeader,
      subHeader = _ref$subHeader === undefined ? {} : _ref$subHeader;
  var logoUrl = header.logoUrl,
      corpCity = header.corpCity,
      ulbGrade = header.ulbGrade,
      headerLabel = header.label;
  var subHeaderLabel = subHeader.label,
      subHeaderValue = subHeader.value;


  return _react2.default.createElement(
    "div",
    { className: "pdf-header", id: "pdf-header", style: { width: '100%' } },
    _react2.default.createElement(_components.Card, {
      style: { display: "flex", backgroundColor: "rgb(242, 242, 242)", minHeight: "8em", alignItems: "center", paddingLeft: "1em" },
      textChildren: _react2.default.createElement(
        "div",
        { style: { display: "flex" } },
        _react2.default.createElement(_components.Image, { id: "image-id", style: logoStyle, source: logoUrl }),
        _react2.default.createElement(
          "div",
          { style: { marginLeft: '2em' } },
          _react2.default.createElement(
            "div",
            { style: { display: "flex", marginBottom: '0.5em' } },
            _react2.default.createElement(_translationNode2.default, { label: corpCity, fontSize: "20px", fontWeight: "500", color: "rgba(0, 0, 0, 0.87)", containerStyle: { marginRight: 10, textTransform: "uppercase" } }),
            _react2.default.createElement(_translationNode2.default, { label: ulbGrade, fontSize: "20px", fontWeight: "500", color: "rgba(0, 0, 0, 0.87)" })
          ),
          _react2.default.createElement(_translationNode2.default, { label: headerLabel, fontSize: "16px", fontWeight: "500" })
        )
      )
    }),
    subHeaderLabel && subHeaderValue && _react2.default.createElement(
      "div",
      { style: { display: "flex", justifyContent: "space-between" } },
      _react2.default.createElement(
        "div",
        { style: { display: "flex" } },
        _react2.default.createElement(_translationNode2.default, { label: subHeaderLabel, color: "rgba(0, 0, 0, 0.87)", fontSize: "20px", containerStyle: { marginRight: 10 } }),
        _react2.default.createElement(_translationNode2.default, { label: subHeaderValue, fontSize: "20px" })
      )
    )
  );
};

exports.default = PdfHeader;