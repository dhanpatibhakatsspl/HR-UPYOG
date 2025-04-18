"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

var _components = require("egov-ui-kit/components");

var _commons = require("egov-ui-framework/ui-utils/commons");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AssessmentInfoTable = function AssessmentInfoTable(_ref) {
  var items = _ref.items,
      tableHeaderItems = _ref.tableHeaderItems;

  return _react2.default.createElement(
    "div",
    { className: "clearfix", style: { marginBottom: 15 } },
    _react2.default.createElement(
      "div",
      { style: { marginTop: -5 } },
      _react2.default.createElement(_components.Receipt, { receiptItems: tableHeaderItems })
    ),
    _react2.default.createElement(
      "div",
      null,
      items.values.map(function (value, index) {
        return _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              "div",
              { className: "receipt-displayInline" },
              _react2.default.createElement(
                "div",
                { style: { marginLeft: "13px" } },
                _react2.default.createElement(_translationNode2.default, {
                  labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
                  label: value.value[0] ? value.value[0] : "NA",
                  fontSize: "16px"
                })
              )
            )
          ),
          _react2.default.createElement(
            "div",
            { style: { margin: "25px" } },
            _react2.default.createElement(
              "div",
              { style: { backgroundColor: "white", paddingBottom: "5px" }, className: "row" },
              value.value.map(function (nestedValue, nestedIndex) {
                return _react2.default.createElement(
                  "div",
                  null,
                  nestedIndex != 0 && _react2.default.createElement(
                    "div",
                    { className: "col-sm-3 col-xs-12", style: { marginBottom: 10 } },
                    _react2.default.createElement(
                      "div",
                      { className: "col-sm-12 col-xs-12", style: { padding: "5px 0px 0px 0px" } },
                      _react2.default.createElement(_translationNode2.default, {
                        labelStyle: { letterSpacing: 0, color: "rgba(0, 0, 0, 0.54)", fontWeight: "400", lineHeight: "1.375em" },
                        label: items.header[nestedIndex] ? items.header[nestedIndex] : "NA",
                        fontSize: "12px"
                      })
                    ),
                    _react2.default.createElement(
                      "div",
                      { className: "col-sm-12 col-xs-12", style: { padding: "5px 0px 0px 0px" } },
                      _react2.default.createElement(_translationNode2.default, {
                        labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
                        label: nestedValue ? nestedValue : "NA",
                        fontSize: "16px"
                      })
                    )
                  ),
                  nestedIndex == 0 && _react2.default.createElement(
                    "div",
                    { className: "receipt-displayInline" },
                    _react2.default.createElement(
                      "div",
                      { style: { marginLeft: "13px" } },
                      _react2.default.createElement(_translationNode2.default, {
                        labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
                        label: nestedValue ? (0, _commons.getLocaleLabels)('PT_UNIT', 'PT_UNIT') + " -1" : "NA",
                        fontSize: "14px"
                      })
                    )
                  )
                );
              })
            )
          )
        );
      })
    )
  );
};

exports.default = AssessmentInfoTable;