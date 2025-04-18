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

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _uiAtoms = require("egov-ui-framework/ui-atoms");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _reactRedux = require("react-redux");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _commons2 = require("egov-ui-kit/utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _utils = require("egov-ui-kit/redux/app/utils");

var _isEmpty = require("lodash/isEmpty");

var _isEmpty2 = _interopRequireDefault(_isEmpty);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// const locale = getLocale() || "en_IN";
// const localizationLabelsData = initLocalizationLabels(locale);

var LabelContainer = function (_React$Component) {
	(0, _inherits3.default)(LabelContainer, _React$Component);

	function LabelContainer() {
		(0, _classCallCheck3.default)(this, LabelContainer);
		return (0, _possibleConstructorReturn3.default)(this, (LabelContainer.__proto__ || Object.getPrototypeOf(LabelContainer)).apply(this, arguments));
	}

	(0, _createClass3.default)(LabelContainer, [{
		key: "render",
		value: function render() {
			var _props = this.props,
			    labelName = _props.labelName,
			    labelKey = _props.labelKey,
			    localePrefix = _props.localePrefix,
			    fieldValue = _props.fieldValue,
			    isVisibleLabel = _props.isVisibleLabel,
			    localizationLabels = _props.localizationLabels,
			    dynamicArray = _props.dynamicArray,
			    checkValueForNA = _props.checkValueForNA,
			    _props$visibility = _props.visibility,
			    visibility = _props$visibility === undefined ? true : _props$visibility,
			    rest = (0, _objectWithoutProperties3.default)(_props, ["labelName", "labelKey", "localePrefix", "fieldValue", "isVisibleLabel", "localizationLabels", "dynamicArray", "checkValueForNA", "visibility"]);

			var translatedLabel = (0, _commons.getLocaleLabels)(labelName, labelKey, localizationLabels);

			if (dynamicArray) {
				if (dynamicArray.length > 1) {
					dynamicArray.forEach(function (item, index) {
						translatedLabel = translatedLabel.replace(new RegExp("\\{" + index + "\\}", "gm"), item);
					});
				} else {
					var index = 0;
					translatedLabel = translatedLabel.replace(new RegExp("\\{" + index + "\\}", "gm"), dynamicArray[0]);
				}
			}

			if (typeof fieldValue === "boolean") {
				fieldValue = fieldValue ? (0, _commons.getLocaleLabels)("SCORE_YES", "SCORE_YES") : (0, _commons.getLocaleLabels)("SCORE_NO", "SCORE_NO");
			}

			var fieldLabel = typeof fieldValue === "string" ? (0, _commons.getLocaleLabels)(fieldValue, localePrefix && !(0, _isEmpty2.default)(localePrefix) ? (0, _commons.appendModulePrefix)(fieldValue, localePrefix) : fieldValue, localizationLabels) : fieldValue;
			var labelValue = fieldValue;
			var lebelName = translatedLabel;
			labelValue = checkValueForNA && typeof checkValueForNA === "function" ? checkValueForNA(labelValue) : labelValue;

			var isMode = (0, _commons.getQueryArg)(window.location.href, "mode");
			isMode = isMode ? isMode.toUpperCase() : "";
			var classname = isMode === "WORKFLOWEDIT" && isVisibleLabel && labelValue && labelValue !== "NA" ? "show-label" : "hide-label";
			return _react2.default.createElement(
				_react2.default.Fragment,
				null,
				_react2.default.createElement(_uiAtoms.Label, (0, _extends3.default)({
					className: classname,
					"data-localization": labelKey ? labelKey : labelName ? labelName : fieldLabel
					// label={lebelName}
					, label: "Old value: "
				}, rest)),
				_react2.default.createElement(_uiAtoms.Label, (0, _extends3.default)({
					className: classname,
					label: labelValue
				}, rest))
			);
		}
	}]);
	return LabelContainer;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
	var fieldValue = "",
	    isVisibleLabel = false;
	var localizationLabels = state.app.localizationLabels;
	var jsonPath = ownprops.jsonPath,
	    callBack = ownprops.callBack,
	    value = ownprops.value,
	    oldValue = ownprops.oldValue;

	if (jsonPath === 'gender') {
		value = value && value.toUpperCase();
		oldValue = oldValue && oldValue.toUpperCase();
	}
	if (oldValue) {
		if (value !== oldValue) {
			isVisibleLabel = true;
			fieldValue = oldValue;
		}
	}
	return { fieldValue: fieldValue, isVisibleLabel: isVisibleLabel, localizationLabels: localizationLabels };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, {})(LabelContainer);