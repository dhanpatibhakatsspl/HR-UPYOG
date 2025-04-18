"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _components = require("components");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cardStyle = {
  padding: "32px 16px"
};

var iconStyle = {
  padding: "12px",
  width: "48px",
  height: "48px",
  color: "#fff",
  borderRadius: "50%"
};

var NewAndOldComplaints = function NewAndOldComplaints(_ref) {
  var history = _ref.history;

  return _react2.default.createElement(_components.Card, {
    id: "home-complaint-card",
    style: cardStyle,
    textChildren: _react2.default.createElement(
      "div",
      { className: "row newAndOldComplaints-content-section" },
      _react2.default.createElement(
        "div",
        {
          id: "home-new-complaint",
          className: "col-xs-6",
          onClick: function onClick(e) {
            history.push("/add-complaint");
          }
        },
        _react2.default.createElement(_components.Icon, { style: (0, _extends3.default)({}, iconStyle, { background: "#fe7a51" }), action: "content", name: "add" }),
        _react2.default.createElement(_translationNode2.default, { containerStyle: { marginTop: "10px" }, color: "#484848", bold: true, fontSize: 16, label: "CS_HOME_FILE_COMPLAINT" })
      ),
      _react2.default.createElement(
        "div",
        {
          id: "home-old-complaint",
          className: "col-xs-6",
          onClick: function onClick(e) {
            history.push("/my-complaints");
          }
        },
        _react2.default.createElement(_components.Icon, { style: { height: "48px", color: "#fff", width: "48px" }, action: "custom", name: "my-complaint" }),
        _react2.default.createElement(_translationNode2.default, { containerStyle: { marginTop: "10px" }, color: "#484848", bold: true, fontSize: 16, label: "CS_HOME_MY_COMPLAINTS" })
      )
    )
  });
};

exports.default = NewAndOldComplaints;