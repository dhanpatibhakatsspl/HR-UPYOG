"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _objectWithoutProperties2 = require("babel-runtime/helpers/objectWithoutProperties");

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

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

var _styles = require("@material-ui/core/styles");

var _uiMoleculesLocal = require("../../ui-molecules-local");

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = function styles(theme) {
  return {
    button: {
      margin: theme.spacing.unit,
      padding: "8px 38px"
    },
    input: {
      display: "none !important"
    }
  };
};

var CheckListContainer = function (_Component) {
  (0, _inherits3.default)(CheckListContainer, _Component);

  function CheckListContainer() {
    (0, _classCallCheck3.default)(this, CheckListContainer);
    return (0, _possibleConstructorReturn3.default)(this, (CheckListContainer.__proto__ || Object.getPrototypeOf(CheckListContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(CheckListContainer, [{
    key: "render",
    value: function render() {
      var rest = (0, _objectWithoutProperties3.default)(this.props, []);

      return _react2.default.createElement(_uiMoleculesLocal.CheckList, rest);
    }
  }]);
  return CheckListContainer;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var documentsList = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.FieldinspectionQstns", []);
  var bpaDetails = (0, _get2.default)(state, "screenConfiguration.preparedFinalObject.BPA", []);
  return { documentsList: documentsList, bpaDetails: bpaDetails };
};

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, null)(CheckListContainer));