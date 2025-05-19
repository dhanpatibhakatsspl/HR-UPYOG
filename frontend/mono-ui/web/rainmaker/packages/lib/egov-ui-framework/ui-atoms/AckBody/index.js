"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _Avatar = require("material-ui/Avatar");

var _Avatar2 = _interopRequireDefault(_Avatar);

var _core = require("@material-ui/core");

var _uiContainers = require("../../ui-containers");

require("./index.css");

var _uiAtoms = require("../../ui-atoms");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
	tailText: {
		color: "rgba(0, 0, 0, 0.6000000238418579)",
		fontSize: 16,
		fontWeight: 400
	},
	tailNumber: {
		fontSize: 24,
		fontWeight: 500
	},
	tailBox: {
		textAlign: "right",
		justifyContent: "center",
		flex: 1
	}
};

var AckBody = function AckBody(props) {
	var iconStyle = props.iconStyle,
	    iconName = props.iconName,
	    iconSize = props.iconSize,
	    headerLabelName = props.headerLabelName,
	    headerLabelKey = props.headerLabelKey,
	    paragragraphStyle = props.paragragraphStyle,
	    paragraphLableName = props.paragraphLableName,
	    paragraphLabelKey = props.paragraphLabelKey,
	    tailText = props.tailText,
	    tailNumber = props.tailNumber;

	return _react2.default.createElement(
		"div",
		{ className: "ack-header" },
		_react2.default.createElement(
			"div",
			null,
			_react2.default.createElement(
				_Avatar2.default,
				{ className: iconName === 'done' ? "ack-icon" : "ack-icon-failure" },
				_react2.default.createElement(_uiAtoms.Icon, { style: iconStyle, iconName: iconName, iconSize: iconSize })
			)
		),
		_react2.default.createElement(
			"div",
			{ className: "ack-body" },
			_react2.default.createElement(
				_core.Typography,
				{ variant: "headline" },
				_react2.default.createElement(_uiContainers.LabelContainer, { labelName: headerLabelName, labelKey: headerLabelKey })
			),
			_react2.default.createElement(
				"div",
				{ style: paragragraphStyle },
				_react2.default.createElement(_uiContainers.LabelContainer, { labelName: paragraphLableName, labelKey: paragraphLabelKey })
			)
		),
		tailText && _react2.default.createElement(
			"div",
			{ className: "ack-text" },
			_react2.default.createElement(
				_core.Typography,
				{ variant: "headline", style: styles.tailText },
				_react2.default.createElement(_uiContainers.LabelContainer, { labelName: tailText.labelName, labelKey: tailText.labelKey })
			),
			_react2.default.createElement(
				_core.Typography,
				{ variant: "headline", style: styles.tailNumber },
				_react2.default.createElement(_uiContainers.LabelContainer, { labelName: tailNumber, labelKey: tailNumber })
			)
		)
	);
};
exports.default = AckBody;