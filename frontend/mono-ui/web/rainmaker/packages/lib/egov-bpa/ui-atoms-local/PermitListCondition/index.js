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

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  Icon: {
    backgroundColor: "#f2f2f2",
    borderRadius: "100%",
    width: "36px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "rgba(0, 0, 0, 0.8700000047683716)",
    fontFamily: "Roboto",
    fontWeight: 400,
    letterSpacing: "0.83px",
    lineHeight: "24px"
  }
};

var PermitListCondition = function (_Component) {
  (0, _inherits3.default)(PermitListCondition, _Component);

  function PermitListCondition() {
    (0, _classCallCheck3.default)(this, PermitListCondition);
    return (0, _possibleConstructorReturn3.default)(this, (PermitListCondition.__proto__ || Object.getPrototypeOf(PermitListCondition)).apply(this, arguments));
  }

  (0, _createClass3.default)(PermitListCondition, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          classes = _props.classes,
          data = _props.data;

      return _react2.default.createElement(
        "div",
        null,
        data && data.length > 0 && data.map(function (conditions, key) {
          return _react2.default.createElement(
            _Grid2.default,
            { container: true },
            _react2.default.createElement(
              _Grid2.default,
              { item: true },
              _react2.default.createElement(
                "div",
                { className: classes.Icon },
                _react2.default.createElement(
                  "span",
                  null,
                  key + 1
                )
              )
            ),
            _react2.default.createElement(
              _Grid2.default,
              { item: true, xs: 10, sm: 5, md: 11 },
              _react2.default.createElement(_uiContainers.LabelContainer, {
                labelKey: conditions
              })
            )
          );
        })
      );
    }
  }]);
  return PermitListCondition;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state, ownProps) {
  var screenConfiguration = state.screenConfiguration;

  var data = (0, _get2.default)(screenConfiguration.preparedFinalObject, ownProps.sourceJsonPath, []);
  return { data: data };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, null)(PermitListCondition));