"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiContainers = require("../../ui-containers");

var _core = require("@material-ui/core");

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AckFooter = function AckFooter(props) {
	var style = props.style,
	    labelName = props.labelName,
	    labelKey = props.labelKey,
	    onClickFooter = props.onClickFooter,
	    path = props.path;

	return _react2.default.createElement(
		_Button2.default,
		{ className: "apply-wizard-footer1", variant: "outlined", color: "primary", style: style, onClick: function onClick() {
				return onClickFooter(path);
			} },
		_react2.default.createElement(_uiContainers.LabelContainer, { labelKey: labelKey, labelName: labelKey })
	);
};
exports.default = AckFooter;