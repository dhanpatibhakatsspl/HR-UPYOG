"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

require("./index.css");

var _uiContainers = require("../../ui-containers");

var _uiMolecules = require("../../ui-molecules");

var _uiAtoms = require("../../ui-atoms");

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AckHeader = function AckHeader(props) {
	var _props$downloadButton = props.downloadButton,
	    downloadButton = _props$downloadButton === undefined ? false : _props$downloadButton,
	    _props$printButton = props.printButton,
	    printButton = _props$printButton === undefined ? false : _props$printButton,
	    labelName = props.labelName,
	    labelKey = props.labelKey,
	    applicationNumber = props.applicationNumber,
	    downloadButtonProps = props.downloadButtonProps,
	    printButtonProps = props.printButtonProps,
	    downloadPrintContainerClass = props.downloadPrintContainerClass;

	return _react2.default.createElement(
		"div",
		{ className: "" },
		_react2.default.createElement(
			"div",
			{ className: "flex-container" },
			_react2.default.createElement(
				_core.Typography,
				{ variant: "headline" },
				_react2.default.createElement(_uiContainers.LabelContainer, { labelKey: labelKey, labelName: labelName })
			),
			_react2.default.createElement(_uiAtoms.ApplicationNumber, { number: applicationNumber })
		),
		_react2.default.createElement(
			"div",
			{ className: downloadPrintContainerClass + " flex-box" },
			downloadButton && _react2.default.createElement(_uiMolecules.DownloadPrintButton, { data: downloadButtonProps }),
			printButton && _react2.default.createElement(_uiMolecules.DownloadPrintButton, { data: printButtonProps })
		)
	);
};

exports.default = AckHeader;