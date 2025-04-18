"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

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

var _styles = require("@material-ui/core/styles");

var _reactRedux = require("react-redux");

var _reactRedux2 = _interopRequireDefault(_reactRedux);

var _LabelContainer = require("../../ui-containers-local/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _reactRouterDom = require("react-router-dom");

var _SelectField = require("material-ui/SelectField");

var _SelectField2 = _interopRequireDefault(_SelectField);

var _DatePicker = require("material-ui/DatePicker");

var _DatePicker2 = _interopRequireDefault(_DatePicker);

var _TextField = require("material-ui/TextField");

var _TextField2 = _interopRequireDefault(_TextField);

var _Button = require("@material-ui/core/Button");

var _Button2 = _interopRequireDefault(_Button);

var _LabelContainer3 = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer4 = _interopRequireDefault(_LabelContainer3);

var _functions = require("../../ui-config/screens/specs/wns/meterReading/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    card: {
        marginLeft: 8,
        marginRight: 8,
        borderRadius: "inherit"
    }
};

// onCardClick = () => {
// switch (item.status) {
//   case "INITIATED":
//     return `/tradelicense-citizen/apply?applicationNumber=${item.applicationNumber}&tenantId=${item.tenantId}`;
//   default:
//     return `/tradelicence/search-preview?applicationNumber=${item.applicationNumber}&tenantId=${item.tenantId}`;
// }
// };
// onCardClick = () => {

// }

var MeterReading = function (_React$Component) {
    (0, _inherits3.default)(MeterReading, _React$Component);

    function MeterReading() {
        var _ref;

        var _temp, _this, _ret;

        (0, _classCallCheck3.default)(this, MeterReading);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MeterReading.__proto__ || Object.getPrototypeOf(MeterReading)).call.apply(_ref, [this].concat(args))), _this), _this.createBody = {
            "billingPeriod": "Q3-2018-19",
            "meterStatus": "Working",
            "lastReading": 70,
            "currentReading": '',
            "currentReadingDate": '',
            "consumption": ""
        }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
    }

    (0, _createClass3.default)(MeterReading, [{
        key: "setTwoNumberDecimal",
        value: function setTwoNumberDecimal(val) {
            this.createBody.currentReading = parseFloat(val).toFixed(2);
        }
    }, {
        key: "onSelectFieldChange",
        value: function onSelectFieldChange(event, key, payload, history, item) {}
    }, {
        key: "getDate",
        value: function getDate(val) {
            this.createBody.currentReadingDate = val;
        }
    }, {
        key: "saveMeterReading",
        value: function saveMeterReading() {

            (0, _functions.addMeterReading)(this.createBody);
        }
    }, {
        key: "render",
        value: function render() {
            var _this2 = this;

            var classes = this.props.classes;

            return _react2.default.createElement(
                _Card2.default,
                { className: classes.card },
                _react2.default.createElement(
                    _CardContent2.default,
                    null,
                    _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3 },
                                _react2.default.createElement(_LabelContainer4.default, {
                                    labelKey: "WS_CONSUMPTION_DETAILS_BILLING_PERIOD_LABEL",
                                    fontSize: 14,
                                    style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                                })
                            ),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3 },
                                _react2.default.createElement(_LabelContainer2.default, {
                                    labelName: "Q4-2018-19",
                                    fontSize: 14,
                                    style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3, style: { paddingTop: '20px' } },
                                _react2.default.createElement(_LabelContainer4.default, {
                                    labelKey: "WS_CONSUMPTION_DETAILS_METER_STATUS_LABEL",
                                    fontSize: 14,
                                    style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                                })
                            ),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3 },
                                _react2.default.createElement(_SelectField2.default, {
                                    className: "pt-action-dropDown",
                                    hintText: "Working",
                                    underlineStyle: styles.underlineStyle,
                                    iconStyle: styles.iconStyle,
                                    style: styles.customWidth,
                                    hintStyle: styles.hintStyle,
                                    onChange: function onChange(event, key, payload) {
                                        return _this2.onSelectFieldChange(event, key, payload, history, item);
                                    }
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3 },
                                _react2.default.createElement(_LabelContainer4.default, {
                                    labelKey: "WS_CONSUMPTION_DETAILS_LAST_READING_LABEL",
                                    fontSize: 14,
                                    style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                                })
                            ),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3 },
                                _react2.default.createElement(_LabelContainer2.default, {
                                    labelName: "75",
                                    fontSize: 14,
                                    style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3, style: { paddingTop: '20px' } },
                                _react2.default.createElement(_LabelContainer4.default, {
                                    labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_LABEL",
                                    fontSize: 14,
                                    style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                                })
                            ),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3 },
                                _react2.default.createElement(_TextField2.default, (0, _defineProperty3.default)({
                                    onChange: function onChange(e) {
                                        return _this2.setTwoNumberDecimal(e.target.value);
                                    },
                                    style: styles.customWidth,
                                    hintStyle: styles.hintStyle,
                                    fontSize: 14
                                }, "style", { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }))
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3, style: { paddingTop: '20px' } },
                                _react2.default.createElement(_LabelContainer4.default, {
                                    labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL",
                                    fontSize: 14,
                                    style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                                })
                            ),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3 },
                                _react2.default.createElement(_TextField2.default, {
                                    id: "date",
                                    type: "date",
                                    className: classes.textField,
                                    onChange: function onChange(e) {
                                        return _this2.getDate(e.target.value);
                                    },
                                    InputLabelProps: {
                                        shrink: true
                                    }
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3, style: { paddingTop: '20px' } },
                                _react2.default.createElement(_LabelContainer4.default, {
                                    labelKey: "WS_CONSUMPTION_DETAILS_CONSUMPTION_LABEL",
                                    fontSize: 14,
                                    style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                                })
                            ),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3, style: { paddingTop: '20px' } },
                                _react2.default.createElement(_LabelContainer2.default, {
                                    labelName: " ",
                                    fontSize: 14,
                                    style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                                })
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(_Grid2.default, { item: true, xs: 12, sm: 3 }),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 12, sm: 3, style: { paddingTop: '20px' } },
                                _react2.default.createElement(
                                    _Button2.default,
                                    { variant: "outlined", onClick: function onClick() {
                                            return _this2.saveMeterReading();
                                        }, style: { width: "50%" }, color: "primary", className: classes.button },
                                    _react2.default.createElement(_LabelContainer4.default, {
                                        labelKey: "WS_COMMON_BUTTON_SAVE",
                                        fontSize: 14
                                        // style={{ fontSize: 14, color: "rgba(0, 0, 0, 0.60" }}
                                    })
                                )
                            )
                        )
                    )
                )
            );
        }
    }]);
    return MeterReading;
}(_react2.default.Component);

exports.default = (0, _styles.withStyles)(styles)(MeterReading);