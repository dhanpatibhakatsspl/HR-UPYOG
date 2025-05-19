"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

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

var _muiDatatables = require("mui-datatables");

var _muiDatatables2 = _interopRequireDefault(_muiDatatables);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _cloneDeep = require("lodash/cloneDeep");

var _cloneDeep2 = _interopRequireDefault(_cloneDeep);

var _reactRedux = require("react-redux");

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("egov-ui-framework/ui-containers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Table = function (_React$Component) {
  (0, _inherits3.default)(Table, _React$Component);

  function Table() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Table);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Table.__proto__ || Object.getPrototypeOf(Table)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      data: [],
      columns: [],
      customSortOrder: "asc"
    }, _this.getMuiTheme = function () {
      return (0, _styles.createMuiTheme)({
        overrides: {
          MUIDataTableBodyCell: {
            root: {
              // "&:nth-child(2)": {
              //   color: "#2196F3"
              //   //fontSize: 14
              // }
              boxShadow: "none"
            }
          },
          MuiTableCell: {
            body: {
              fontSize: 14
            },
            head: {
              fontSize: 14,
              color: "rgba(0, 0, 0, 0.8700000048)",
              fontWeight: 700
            }
          },
          MuiToolbar: {
            root: {
              display: "none"
            }
          }
        },
        shadows: ["none"]
      });
    }, _this.formatData = function (data, columns) {
      return data && [].concat((0, _toConsumableArray3.default)(data)).reduce(function (acc, curr) {
        var dataRow = [];
        // Object.keys(columns).forEach(column => {
        columns.forEach(function (column) {
          // Handling the case where column name is an object with options
          column = (typeof column === "undefined" ? "undefined" : (0, _typeof3.default)(column)) === "object" ? (0, _get2.default)(column, "key") : column;
          var columnValue = (0, _get2.default)(curr, "" + column, "");
          if ((0, _get2.default)(columns, column + ".format", "")) {
            columnValue = columns[column].format(curr);
          }
          if (typeof columnValue === "string") {
            columnValue = _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: columnValue, labelName: columnValue });
          }
          dataRow.push(columnValue);
        });
        var updatedAcc = [].concat((0, _toConsumableArray3.default)(acc));
        updatedAcc.push(dataRow);
        return updatedAcc;
      }, []);
    }, _this.getTranslatedHeader = function (columns) {
      if (columns) {
        columns.map(function (item, key) {
          columns[key].name = _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: item.name, labelName: item.name });
        });
        return columns;
      }
    }, _this.updateTable = function (data, columns) {
      // const updatedData = this.formatData(data, columns);
      // Column names should be array not keys of an object!
      // This is a quick fix, but correct this in other modules also!
      var fixedColumns = Array.isArray(columns) ? columns : Object.keys(columns);
      var updatedData = _this.formatData(data, fixedColumns);
      _this.setState({
        data: updatedData,
        // columns: Object.keys(columns)
        columns: _this.getTranslatedHeader(fixedColumns)
      });
    }, _this.onColumnSortChange = function (columnName, i) {
      var _this$state = _this.state,
          customSortOrder = _this$state.customSortOrder,
          data = _this$state.data;
      var customSortColumn = _this.props.customSortColumn;
      var column = customSortColumn.column,
          sortingFn = customSortColumn.sortingFn;

      if (columnName === column) {
        var updatedData = sortingFn((0, _cloneDeep2.default)(data), "", customSortOrder);
        _this.setState({
          data: updatedData.data,
          customSortOrder: updatedData.currentOrder
        });
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Table, [{
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      var data = nextProps.data,
          columns = nextProps.columns;

      this.updateTable(data, columns);
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var _props = this.props,
          data = _props.data,
          columns = _props.columns;

      this.updateTable(data, columns);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _state = this.state,
          data = _state.data,
          columns = _state.columns;
      var _props2 = this.props,
          options = _props2.options,
          title = _props2.title,
          customSortDate = _props2.customSortDate;

      return _react2.default.createElement(
        _styles.MuiThemeProvider,
        { theme: this.getMuiTheme() },
        _react2.default.createElement(_muiDatatables2.default, {
          title: title,
          data: data,
          columns: columns,
          options: (0, _extends3.default)({}, options, {
            onColumnSortChange: function onColumnSortChange(columnName, order) {
              return _this2.onColumnSortChange(columnName, order);
            }
          })
        })
      );
    }
  }]);
  return Table;
}(_react2.default.Component);

Table.propTypes = {
  columns: _propTypes2.default.array.isRequired,
  data: _propTypes2.default.array.isRequired
  // title: PropTypes.string.isRequired,
  // options: PropTypes.object.isRequired
};

//export default Table;
var mapStateToProps = function mapStateToProps(state, ownprops) {
  var data = "";
  var localizationLabels = state.app.localizationLabels;
  var jsonPath = ownprops.jsonPath,
      callBack = ownprops.callBack;
  var screenConfiguration = state.screenConfiguration;
  var preparedFinalObject = screenConfiguration.preparedFinalObject;

  if (jsonPath) {
    data = (0, _get2.default)(preparedFinalObject, jsonPath);
  }
  return { data: data, localizationLabels: localizationLabels };
};

/* export function mapStateToProps(state, ownprops) {
  return {
     preFinalObj :state.screenConfiguration.preparedFinalObject
  };
} */
exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(Table);