"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require("babel-runtime/helpers/createClass");

var _createClass3 = _interopRequireDefault(_createClass2);

var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require("babel-runtime/helpers/inherits");

var _inherits3 = _interopRequireDefault(_inherits2);

var _common = require("modules/common");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SearchProperties = function (_Component) {
  (0, _inherits3.default)(SearchProperties, _Component);

  function SearchProperties() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SearchProperties);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SearchProperties.__proto__ || Object.getPrototypeOf(SearchProperties)).call.apply(_ref, [this].concat(args))), _this), _this.componentWillMount = function () {
      var history = _this.props.history;

      history.push('/pt-mutation/propertySearch');
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SearchProperties, [{
    key: "render",
    value: function render() {
      var history = this.props.history;

      return _react2.default.createElement(_common.SearchProperty, { history: history });
    }
  }]);
  return SearchProperties;
}(_react.Component);

exports.default = SearchProperties;