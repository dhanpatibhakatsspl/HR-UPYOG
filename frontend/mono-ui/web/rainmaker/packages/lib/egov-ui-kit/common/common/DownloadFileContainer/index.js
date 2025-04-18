"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

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

var _uiMolecules = require("egov-ui-framework/ui-molecules");

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DownloadFileContainer = function (_Component) {
  (0, _inherits3.default)(DownloadFileContainer, _Component);

  function DownloadFileContainer() {
    (0, _classCallCheck3.default)(this, DownloadFileContainer);
    return (0, _possibleConstructorReturn3.default)(this, (DownloadFileContainer.__proto__ || Object.getPrototypeOf(DownloadFileContainer)).apply(this, arguments));
  }

  (0, _createClass3.default)(DownloadFileContainer, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          data = _props.data,
          documentData = _props.documentData,
          rest = (0, _objectWithoutProperties3.default)(_props, ["data", "documentData"]);

      return _react2.default.createElement(_uiMolecules.MultiDownloadCard, (0, _extends3.default)({ data: data, documentData: documentData }, rest));
    }
  }]);
  return DownloadFileContainer;
}(_react.Component);

exports.default = DownloadFileContainer;