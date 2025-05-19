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

var _Error = require("@material-ui/icons/Error");

var _Error2 = _interopRequireDefault(_Error);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    color: "rgba(0, 0, 0, 0.87)",
    marginTop: "1%",
    lineHeight: "35px",
    fontSize: "20px",
    border: "1px solid #F5B7B1",
    padding: "20px",
    borderRadius: "5px",
    backgroundColor: "#FADBD8"
};

var AddLinkForProperty = function (_React$Component) {
    (0, _inherits3.default)(AddLinkForProperty, _React$Component);

    function AddLinkForProperty() {
        (0, _classCallCheck3.default)(this, AddLinkForProperty);
        return (0, _possibleConstructorReturn3.default)(this, (AddLinkForProperty.__proto__ || Object.getPrototypeOf(AddLinkForProperty)).apply(this, arguments));
    }

    (0, _createClass3.default)(AddLinkForProperty, [{
        key: "render",
        value: function render() {
            var _props = this.props,
                fieldValue = _props.fieldValue,
                _props$propertyId = _props.propertyId,
                propertyId = _props$propertyId === undefined ? null : _props$propertyId;

            if (propertyId == null) {
                propertyId = fieldValue;
            }
            return _react2.default.createElement(
                "div",
                { style: styles },
                _react2.default.createElement(_Error2.default, { style: { color: "red", fontSize: "30px", marginRight: "5px", marginTop: "2px" } }),
                " ",
                _react2.default.createElement(
                    "span",
                    null,
                    "  "
                ),
                _react2.default.createElement(_uiContainers.LabelContainer, {
                    labelName: "Edit Property details application no. " + propertyId + " is under Workflow" })
            );
        }
    }]);
    return AddLinkForProperty;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state, ownprops) {
    var fieldValue = "";
    var screenConfiguration = state.screenConfiguration;
    var preparedFinalObject = screenConfiguration.preparedFinalObject;

    fieldValue = (0, _get2.default)(preparedFinalObject, "applyScreen.property.acknowldgementNumber");

    return { fieldValue: fieldValue };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps)(AddLinkForProperty);