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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ErrorBoundary = function (_React$Component) {
    (0, _inherits3.default)(ErrorBoundary, _React$Component);

    function ErrorBoundary(props) {
        (0, _classCallCheck3.default)(this, ErrorBoundary);

        var _this = (0, _possibleConstructorReturn3.default)(this, (ErrorBoundary.__proto__ || Object.getPrototypeOf(ErrorBoundary)).call(this, props));

        _this.state = { hasError: false };
        return _this;
    }

    (0, _createClass3.default)(ErrorBoundary, [{
        key: "componentDidCatch",
        value: function componentDidCatch(error, errorInfo) {
            // You can also log the error to an error reporting service
            console.error(error, errorInfo);
        }
    }, {
        key: "render",
        value: function render() {
            if (this.state.hasError) {
                // You can render any custom fallback UI
                return _react2.default.createElement(
                    "h1",
                    null,
                    "Something went wrong."
                );
            } else {
                return this.props.children;
            }
        }
    }], [{
        key: "getDerivedStateFromError",
        value: function getDerivedStateFromError(error) {
            // Update state so the next render will show the fallback UI.
            return { hasError: true };
        }
    }]);
    return ErrorBoundary;
}(_react2.default.Component);

exports.default = ErrorBoundary;