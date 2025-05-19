"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("egov-ui-kit/components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

var _AssessmentInfoTable = require("../AssessmentInfoTable");

var _AssessmentInfoTable2 = _interopRequireDefault(_AssessmentInfoTable);

var _utils = require("egov-ui-kit/redux/app/utils");

var _commons = require("../../../../../utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var locale = (0, _localStorageUtils.getLocale)() || "en_IN";
var localizationLabelsData = (0, _utils.initLocalizationLabels)(locale);

var editIconStyle = (0, _defineProperty3.default)({
  fill: "#767676",
  width: 19,
  height: 20,
  marginRight: 8
}, "fill", "#fe7a51");

var ReceiptItems = function ReceiptItems(_ref) {
  var items = _ref.items,
      propertyTaxAssessmentID = _ref.propertyTaxAssessmentID,
      history = _ref.history,
      tenantId = _ref.tenantId,
      onButtonClick = _ref.onButtonClick;

  return _react2.default.createElement(
    "div",
    { className: "property-informtion" },
    _react2.default.createElement(
      "div",
      null,
      items.map(function (item, index) {
        return _react2.default.createElement(
          "div",
          { key: index, className: "property-info-subsection" },
          _react2.default.createElement(
            "div",
            { style: { backgroundColor: 'rgb(242,242,242)', marginBottom: '10px', marginTop: '10px' } },
            _react2.default.createElement(
              "div",
              { className: "rainmaker-displayInline", style: { justifyContent: "space-between", alignItems: "center" } },
              _react2.default.createElement(
                "div",
                { className: "receipt-displayInline" },
                _react2.default.createElement(_translationNode2.default, {
                  label: item.heading,
                  containerStyle: { marginLeft: "13px" },
                  fontWeight: "400",
                  fontSize: "18px",
                  labelStyle: { letterSpacing: "0.75px", lineHeight: "20px", color: "rgba(0, 0, 0, 0.87)" }
                })
              )
            ),
            item.showTable ? _react2.default.createElement(_AssessmentInfoTable2.default, { items: item.items, tableHeaderItems: item.tableHeaderItems }) : item.nestedItems ? item.items.map(function (nestedItem, nestedIndex) {
              return _react2.default.createElement(_components.Receipt, { receiptItems: nestedItem.items, header: item.items.length > 1 && "Owner " + (nestedIndex + 1) });
            }) : _react2.default.createElement(_components.Receipt, { receiptItems: item.items })
          ),
          index < items.length - 1 && _react2.default.createElement("div", null)
          // <Divider className="reciept-divider" inset={true} lineStyle={{ marginLeft: 0, marginRight: 0, marginTop: 0 }} />

        );
      })
    )
  );
};

exports.default = ReceiptItems;