"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var columnData = [{
  id: "applicationNo",
  numeric: false,
  disablePadding: false,
  label: "PT_PROPERTY_APPLICATION_NUMBER"
}, {
  id: "propertyId",
  numeric: false,
  disablePadding: false,
  label: "PT_SEARCHPROPERTY_TABEL_PID"
}, {
  id: "applicationType",
  numeric: false,
  disablePadding: true,
  label: "PT_SEARCHPROPERTY_TABEL_APPLICATIONTYPE"
}, {
  id: "name",
  numeric: false,
  disablePadding: true,
  label: "PT_SEARCHPROPERTY_TABEL_OWNERNAME"
},
// {
//   id: "guardianName",
//   numeric: false,
//   disablePadding: true,
//   label: "PT_SEARCHPROPERTY_TABEL_GUARDIANNAME"
// },
{
  id: "date",
  numeric: false,
  disablePadding: false,
  label: "PT_SEARCHPROPERTY_TABEL_APPLICATIONDATE"
}, {
  id: "status",
  numeric: false,
  disablePadding: false,
  label: "PT_SEARCHPROPERTY_TABEL_STATUS"
}];

var PropertyTable = function PropertyTable(_ref) {
  var tableData = _ref.tableData,
      onActionClick = _ref.onActionClick,
      sortOnObject = _ref.sortOnObject;

  return _react2.default.createElement(
    "div",
    { className: "form-without-button-cont-generic" },
    _react2.default.createElement(_components.Card, {
      textChildren: _react2.default.createElement(
        "div",
        null,
        _react2.default.createElement(_translationNode2.default, {
          secondaryText: '(' + tableData.length + ')',
          label: "PT_SEARCH_PROPERTY_TABLE_HEADERS",
          className: "property-search-table-heading",
          fontSize: 16,
          labelStyle: {
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 500,
            letterSpacing: "0px",
            textAlign: "left",
            color: "#484848"
          }
        }),
        _react2.default.createElement(_components.TableUi, {
          sortOnObject: sortOnObject,
          rowCheckBox: false,
          orderby: "index",
          columnData: columnData,
          rowData: tableData,
          ActionOnRow: _react2.default.createElement(_components.Button, {
            className: "search-table-assess-pay-btn",
            label: "PT_PAYMENT_ASSESS_AND_PAY",
            onClick: onActionClick
          })
        })
      )
    })
  );
};

exports.default = PropertyTable;