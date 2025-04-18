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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _DownloadFileContainer = require("../../../../common/DownloadFileContainer");

var _DownloadFileContainer2 = _interopRequireDefault(_DownloadFileContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DocumentsInfo = function (_Component) {
  (0, _inherits3.default)(DocumentsInfo, _Component);

  function DocumentsInfo() {
    (0, _classCallCheck3.default)(this, DocumentsInfo);
    return (0, _possibleConstructorReturn3.default)(this, (DocumentsInfo.__proto__ || Object.getPrototypeOf(DocumentsInfo)).apply(this, arguments));
  }

  (0, _createClass3.default)(DocumentsInfo, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          documentsUploaded = _props.documentsUploaded,
          editIcon = _props.editIcon;


      var header = "PT_COMMON_DOCS";
      return _react2.default.createElement(_components.Card, {
        style: { backgroundColor: "rgb(242, 242, 242)", boxShadow: "none" },
        textChildren: _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            "div",
            { className: "pt-rf-title rainmaker-displayInline", style: { justifyContent: "space-between", margin: "5px 0px 5px 0px" } },
            _react2.default.createElement(
              "div",
              { className: "rainmaker-displayInline", style: { alignItems: "center", marginLeft: "13px" } },
              header && _react2.default.createElement(_translationNode2.default, {
                labelStyle: { letterSpacing: "0.67px", color: "rgba(0, 0, 0, 0.87)", fontWeight: "400", lineHeight: "19px" },
                label: header,
                fontSize: "18px"
              })
            ),
            { editIcon: editIcon } && _react2.default.createElement(
              "span",
              { style: { alignItems: "right" } },
              editIcon
            )
          ),
          _react2.default.createElement(
            "div",
            { style: { margin: "15px" } },
            _react2.default.createElement(_DownloadFileContainer2.default, { data: documentsUploaded })
          )
        )
      });
    }
  }]);
  return DocumentsInfo;
}(_react.Component);

exports.default = DocumentsInfo;