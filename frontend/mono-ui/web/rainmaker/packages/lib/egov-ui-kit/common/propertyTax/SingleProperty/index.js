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

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Card = require("../../../components/Card");

var _Card2 = _interopRequireDefault(_Card);

var _translationNode = require("../../../utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SingleProperty = function (_React$Component) {
  (0, _inherits3.default)(SingleProperty, _React$Component);

  function SingleProperty() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, SingleProperty);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = SingleProperty.__proto__ || Object.getPrototypeOf(SingleProperty)).call.apply(_ref, [this].concat(args))), _this), _this.onCardClick = function (item) {
      var propertyId = item.route,
          tenantId = item.tenantId;

      _this.props.history.push("/property-tax/my-properties/property/" + encodeURIComponent(propertyId) + "/" + tenantId);
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(SingleProperty, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          data = _props.data,
          action = _props.action,
          onActionClick = _props.onActionClick;

      return data && data.map(function (item) {
        return _react2.default.createElement(_Card2.default, {
          id: "pt-application-card",
          className: "pt-application-card",
          textChildren: _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
              _Grid2.default,
              { container: true, style: { marginBottom: 12 } },
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                _react2.default.createElement(_translationNode2.default, { label: "PT_PROPERTY_APPLICATION_NUMBER", fontSize: 14, color: "rgba(0, 0, 0, 0.60" })
              ),
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                item.applicationNo
              )
            ),
            _react2.default.createElement(
              _Grid2.default,
              { container: true, style: { marginBottom: 12 } },
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                _react2.default.createElement(_translationNode2.default, { label: "PT_SEARCHPROPERTY_TABEL_PID", fontSize: 14, color: "rgba(0, 0, 0, 0.60" })
              ),
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                item.propertyId
              )
            ),
            _react2.default.createElement(
              _Grid2.default,
              { container: true, style: { marginBottom: 12 } },
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                _react2.default.createElement(_translationNode2.default, { label: "PT_SEARCHPROPERTY_TABEL_APPLICATIONTYPE", fontSize: 14, color: "rgba(0, 0, 0, 0.60" })
              ),
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                _react2.default.createElement(_translationNode2.default, { label: item.applicationType, fontSize: 14, color: "rgba(0, 0, 0, 0.87" })
              )
            ),
            _react2.default.createElement(
              _Grid2.default,
              { container: true, style: { marginBottom: 12 } },
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                _react2.default.createElement(_translationNode2.default, { label: "PT_SEARCHPROPERTY_TABEL_OWNERNAME", fontSize: 14, color: "rgba(0, 0, 0, 0.60" })
              ),
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                _react2.default.createElement(_translationNode2.default, { label: item.name ? item.name : "NA", fontSize: 14, color: "rgba(0, 0, 0, 0.87" })
              )
            ),
            _react2.default.createElement(
              _Grid2.default,
              { container: true, style: { marginBottom: 12 } },
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                _react2.default.createElement(_translationNode2.default, { label: "PT_SEARCHPROPERTY_TABEL_APPLICATIONDATE", fontSize: 14, color: "rgba(0, 0, 0, 0.60" })
              ),
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                _react2.default.createElement(_translationNode2.default, { label: item.date, fontSize: 14, color: "rgba(0, 0, 0, 0.87" })
              )
            ),
            _react2.default.createElement(
              _Grid2.default,
              { container: true, style: { marginBottom: 12 } },
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                _react2.default.createElement(_translationNode2.default, { label: "PT_SEARCHPROPERTY_TABEL_STATUS", fontSize: 14, color: "rgba(0, 0, 0, 0.60" })
              ),
              _react2.default.createElement(
                _Grid2.default,
                { item: true, xs: 6 },
                item.status
              )
            )
          )
        });
      });
    }
  }]);
  return SingleProperty;
}(_react2.default.Component);

exports.default = SingleProperty;