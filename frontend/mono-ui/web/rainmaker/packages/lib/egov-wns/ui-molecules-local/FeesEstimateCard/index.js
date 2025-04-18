"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _styles = require("@material-ui/core/styles");

var _Card = require("material-ui/Card");

var _utils = require("../../ui-config/screens/specs/utils");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _core = require("@material-ui/core");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    card: {
        backgroundColor: "rgb(242, 242, 242)",
        boxShadow: "none",
        borderRadius: 0
    },
    whiteCard: {
        padding: 18,
        marginTop: 2,
        // boxShadow: "none",
        borderRadius: 0,
        backgroundColor: "#ffffff"
    },
    whiteCardText: {
        padding: 8,
        color: "rgba(0, 0, 0, 0.6000000238418579)",
        fontFamily: "Roboto",
        fontSize: 14,
        fontWeight: 400,
        letterSpacing: 0.65
    },
    toolTipIcon: {
        color: "rgba(0, 0, 0, 0.3799999952316284)",
        paddingLeft: 5,
        paddingTop: 1
    },
    bigheader: {
        color: "rgba(0, 0, 0, 0.8700000047683716)",
        fontFamily: "Roboto",
        fontSize: "34px",
        fontWeight: 500,
        letterSpacing: "1.42px",
        lineHeight: "41px"
    },
    taxStyles: {
        color: "rgba(0, 0, 0, 0.87)",
        fontSize: 16,
        fontWeight: 400,
        lineHeight: "19px",
        letterSpacing: 0.67,
        fontFamily: "Roboto",
        marginBottom: 16
    }
};

var date = function date(from, to) {
    if (from !== undefined && to !== 'NA') {
        return (0, _utils.convertEpochToDate)(from) + " to " + (0, _utils.convertEpochToDate)(to);
    } else {
        return "NA";
    }
};

function FeesEstimateCard(props) {
    var classes = props.classes,
        estimate = props.estimate;

    var sortedArray = [],
        totalAmount = void 0,
        arrears = 0,
        arrearsDescription = void 0,
        fromPeriod = void 0,
        toPeriod = void 0,
        dueDate = void 0;
    var totalHeadClassName = "tl-total-amount-value " + classes.bigheader;
    if (estimate !== null && estimate !== undefined && estimate.fees !== undefined && estimate.fees !== null && estimate.fees.length > 0) {
        if (estimate.fees[0].data !== null && estimate.fees[0].data !== undefined && estimate.fees[0].data.length > 0) {
            totalAmount = estimate.fees[0].data[0].total;
            dueDate = (0, _utils.convertEpochToDate)(estimate.fees[0].data[0].expiryDate);
        }
        if (estimate.fees[0].description !== undefined && estimate.fees[0].description !== null) {
            sortedArray = estimate.fees[0].description.bill;
            arrearsDescription = estimate.fees[0].arrearsDescription;
            fromPeriod = estimate.fees[0].description.fromPeriod;
            toPeriod = estimate.fees[0].description.toPeriod;
            arrears = estimate.fees[0].arrears;
        }
    }

    return _react2.default.createElement(
        _Grid2.default,
        { container: true },
        _react2.default.createElement(
            _Grid2.default,
            { xs: 12, sm: 12 },
            _react2.default.createElement(
                _Typography2.default,
                { variant: "body2",
                    align: "right",
                    style: { marginTop: -20 },
                    className: "tl-total-amount-text" },
                _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Total Amount", labelKey: "WS_COMMON_TOTAL_AMT" })
            ),
            _react2.default.createElement(
                _Typography2.default,
                { className: totalHeadClassName, align: "right" },
                "Rs ",
                totalAmount
            )
        ),
        _react2.default.createElement(
            _Grid2.default,
            { xs: 12, sm: 7 },
            _react2.default.createElement(
                "div",
                { style: { maxWidth: 600 } },
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true },
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 6 },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "WS_VIEW_BILL_BILLING_PERIOD_LABEL" })
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 6,
                            align: "right",
                            style: styles.taxStyles,
                            className: "tl-application-table-total-value" },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            date(fromPeriod, toPeriod)
                        )
                    )
                ),
                sortedArray.length > 0 && sortedArray.map(function (fee) {
                    return _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 4 },
                                _react2.default.createElement(
                                    _Typography2.default,
                                    { variant: "body2" },
                                    _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: fee.key })
                                )
                            ),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 2 },
                                _react2.default.createElement(
                                    _core.Tooltip,
                                    { title: fee.value },
                                    _react2.default.createElement(
                                        _core.Icon,
                                        { className: styles.toolTipIcon },
                                        _react2.default.createElement(
                                            "i",
                                            { "class": "material-icons", style: { fontSize: 18 } },
                                            "info_circle"
                                        )
                                    )
                                )
                            ),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 6,
                                    align: "right",
                                    style: styles.taxStyles,
                                    className: "tl-application-table-total-value" },
                                _react2.default.createElement(
                                    _Typography2.default,
                                    { variant: "body2" },
                                    "Rs ",
                                    fee.amount
                                )
                            )
                        )
                    );
                }),
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true },
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 4 },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "COMMON_ARREARS" })
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 2 },
                        _react2.default.createElement(
                            _core.Tooltip,
                            { title: arrearsDescription },
                            _react2.default.createElement(
                                _core.Icon,
                                { className: styles.toolTipIcon },
                                _react2.default.createElement(
                                    "i",
                                    { "class": "material-icons", style: { fontSize: 18 } },
                                    "info_circle"
                                )
                            )
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 6,
                            align: "right",
                            style: { paddingRight: 0 },
                            className: "tl-application-table-total-value" },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            "Rs ",
                            arrears
                        )
                    )
                ),
                _react2.default.createElement(_Divider2.default, null),
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true },
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 6 },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "WS_COMMON_TOTAL_AMT" })
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 6,
                            align: "right",
                            style: { paddingRight: 0 },
                            className: "tl-application-table-total-value" },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            "Rs ",
                            totalAmount
                        )
                    )
                )
            )
        ),
        _react2.default.createElement(_Grid2.default, { xs: 12,
            sm: 1 }),
        _react2.default.createElement(
            _Grid2.default,
            { xs: 12, sm: 4 },
            _react2.default.createElement(
                _Card.Card,
                { className: classes.whiteCard,
                    style: { backgroundColor: '#fff', boxShadow: "none" } },
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true },
                    _react2.default.createElement(
                        _Grid2.default,
                        { xs: 12,
                            style: { marginBottom: 16, fontSize: '16px', fontWeight: 500 } },
                        _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "WS_VIEW_BILL_IMP_DATE_HEADER" })
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { xs: 6 },
                        _react2.default.createElement(
                            _Typography2.default,
                            null,
                            " ",
                            _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "WS_VIEW_BILL_DUE_DATE_LABEL" })
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { xs: 6,
                            align: "right" },
                        _react2.default.createElement(
                            _Typography2.default,
                            null,
                            dueDate
                        )
                    )
                )
            )
        )
    );
}

// FeesEstimateCard.propTypes = {
//   header: PropTypes.string.isRequired,
//   fees: PropTypes.array.isRequired,
//   extra: PropTypes.array.isRequired
// };

exports.default = (0, _styles.withStyles)(styles)(FeesEstimateCard);