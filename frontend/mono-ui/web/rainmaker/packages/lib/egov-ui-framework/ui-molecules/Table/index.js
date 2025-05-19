"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof2 = require("babel-runtime/helpers/typeof");

var _typeof3 = _interopRequireDefault(_typeof2);

var _toConsumableArray2 = require("babel-runtime/helpers/toConsumableArray");

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("../../ui-containers");

var _commons = require("../../ui-utils/commons");

require("./index.css");

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
    }, _this.getExtraTableStyle = function () {
      var tableStyle = {
        MUIDataTableToolbar: {
          titleRoot: {
            fontSize: "18px",
            fontWeight: 600,
            color: "rgba(0, 0, 0, 0.87)"
          }
        },
        MUIDataTableHeadCell: {
          data: {
            fontSize: "14px !important",
            fontWeight: "600 !important",
            color: "rgba(0, 0, 0, 0.87) !important"
          }
        }
      };
      return (0, _commons.isPublicSearch)() ? tableStyle : {};
    }, _this.getMuiTheme = function (ignoreFirstColumnHover) {
      return (0, _styles.createMuiTheme)({
        overrides: (0, _extends3.default)({
          MUIDataTableBodyCell: {
            root: {
              "&:nth-child(2)": {
                color: (0, _commons.isPublicSearch)() || ignoreFirstColumnHover ? "rgba(0, 0, 0, 0.87)" : "#2196F3",
                cursor: (0, _commons.isPublicSearch)() || ignoreFirstColumnHover ? "auto" : "pointer"
              }
            }
          },
          MuiTypography: {
            caption: {
              fontSize: "14px"
            }
          },
          MuiFormLabel: {
            root: {
              fontSize: "14px"
            }
          },
          MuiTableCell: {
            body: {
              fontSize: 14
            }
          },
          MUIDataTableSearch: {
            main: {
              alignItems: "center"
            }
          },
          MuiIconButton: {
            root: {
              marginRight: "20px",
              width: "unset",
              height: "unset"
            }
          },
          mui: {
            tooltip: {
              height: "10px"
            }
          }
        }, _this.getExtraTableStyle())
      });
    }, _this.formatData = function (data, columns) {
      return data && [].concat((0, _toConsumableArray3.default)(data)).reduce(function (acc, curr) {
        var dataRow = [];
        // Object.keys(columns).forEach(column => {
        columns.forEach(function (column) {
          // Handling the case where column name is an object with options
          column = (typeof column === "undefined" ? "undefined" : (0, _typeof3.default)(column)) === "object" ? (0, _get2.default)(column, "labelKey") : column;
          var columnValue = (0, _get2.default)(curr, "" + column, "");
          if ((0, _get2.default)(columns, column + ".format", "")) {
            columnValue = columns[column].format(curr);
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
          columns[key].name = _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: item.labelKey, labelName: item.labelKey });
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
    }, _this.getLabelContainer = function (labelKey, labelName) {
      return _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: labelKey, labelName: labelName });
    }, _this.getTableTextLabel = function () {
      var textLabels = {
        body: {
          noMatch: _this.getLabelContainer("COMMON_TABLE_NO_RECORD_FOUND", "Sorry, no matching records found"),
          toolTip: _this.getLabelContainer("COMMON_TABLE_SORT", "Sort")
        },
        pagination: {
          next: _this.getLabelContainer("COMMON_TABLE_NEXT_PAGE", "Next Page"),
          previous: _this.getLabelContainer("COMMON_TABLE_PREVIOUS_PAGE", "Previous Page"),
          rowsPerPage: _this.getLabelContainer("COMMON_TABLE_ROWS_PER_PAGE", "Rows per page:")
          // displayRows: this.getLabelContainer("COMMON_TABLE_OF", "of")
        },
        toolbar: {
          search: _this.getLabelContainer("COMMON_TABLE_SEARCH", "Search"),
          downloadCsv: _this.getLabelContainer("COMMON_TABLE_DOWNLOAD_CSV", "Download CSV"),
          print: _this.getLabelContainer("COMMON_TABLE_PRINT", "Print"),
          viewColumns: _this.getLabelContainer("COMMON_TABLE_VIEW_COLUMNS", "View Columns"),
          filterTable: _this.getLabelContainer("COMMON_TABLE_FILTER", "Filter Table")
        },
        filter: {
          all: _this.getLabelContainer("COMMON_TABLE_ALL", "All"),
          title: _this.getLabelContainer("COMMON_TABLE_FILTERS", "FILTERS"),
          reset: _this.getLabelContainer("COMMON_TABLE_RESET", "RESET")
        },
        viewColumns: {
          title: _this.getLabelContainer("COMMON_TABLE_SHOW_COLUMNS", "Show Columns"),
          titleAria: _this.getLabelContainer("COMMON_TABLE_SHOW_HIDE_TABLE", "Show/Hide Table Columns")
        }
      };
      return textLabels;
    }, _this.getTabelTitle = function (title) {
      return (0, _commons.getLocaleLabels)(title.labelName, title.labelKey);
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
          rows = _props2.rows,
          customSortDate = _props2.customSortDate;
      var _options$ignoreFirstC = options.ignoreFirstColumnHover,
          ignoreFirstColumnHover = _options$ignoreFirstC === undefined ? false : _options$ignoreFirstC;

      options.textLabels = this.getTableTextLabel();
      return _react2.default.createElement(
        _styles.MuiThemeProvider,
        { theme: this.getMuiTheme(ignoreFirstColumnHover) },
        _react2.default.createElement(_muiDatatables2.default, {
          title: this.getTabelTitle(title) + " (" + rows + ")",
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
  columns: _propTypes2.default.object.isRequired,
  data: _propTypes2.default.array.isRequired,
  title: _propTypes2.default.string.isRequired,
  options: _propTypes2.default.object.isRequired
};

exports.default = Table;