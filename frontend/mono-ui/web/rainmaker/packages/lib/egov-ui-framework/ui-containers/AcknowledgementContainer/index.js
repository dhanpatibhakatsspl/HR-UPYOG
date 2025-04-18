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

var _reactRedux = require("react-redux");

var _reactRouterDom = require("react-router-dom");

var _uiAtoms = require("../../ui-atoms");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AcknowledgementContainer = function (_React$Component) {
	(0, _inherits3.default)(AcknowledgementContainer, _React$Component);

	function AcknowledgementContainer() {
		var _ref;

		var _temp, _this, _ret;

		(0, _classCallCheck3.default)(this, AcknowledgementContainer);

		for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
			args[_key] = arguments[_key];
		}

		return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = AcknowledgementContainer.__proto__ || Object.getPrototypeOf(AcknowledgementContainer)).call.apply(_ref, [this].concat(args))), _this), _this.onclickFooter = function (path) {
			path && _this.props.setRoute(path);
		}, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
	}

	(0, _createClass3.default)(AcknowledgementContainer, [{
		key: "render",
		value: function render() {
			var _this2 = this;

			var _props = this.props,
			    header = _props.header,
			    body = _props.body,
			    footer = _props.footer;


			return _react2.default.createElement(
				"div",
				{ className: "common-div-css" },
				_react2.default.createElement(_uiAtoms.AckHeader, header),
				_react2.default.createElement(
					"div",
					{ className: "card-container" },
					_react2.default.createElement(_uiAtoms.AckBody, body)
				),
				_react2.default.createElement(
					"div",
					{ className: "apply-wizard-footer" },
					footer.map(function (config, index) {
						return _react2.default.createElement(_uiAtoms.AckFooter, {
							key: "act-footer-" + index,
							onClickFooter: _this2.onclickFooter,
							labelName: config.labelName,
							labelKey: config.labelKey,
							style: config.style,
							path: config.url
						});
					})
				)
			);
		}
	}]);
	return AcknowledgementContainer;
}(_react2.default.Component);

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	return {
		setRoute: function setRoute(route) {
			return dispatch((0, _actions.setRoute)(route));
		}
	};
};

exports.default = (0, _reactRedux.connect)(null, mapDispatchToProps)((0, _reactRouterDom.withRouter)(AcknowledgementContainer));