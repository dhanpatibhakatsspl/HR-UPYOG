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
        return (0, _utils.convertEpochToDate)(from) + " - " + (0, _utils.convertEpochToDate)(to);
    } else {
        return "NA";
    }
};

function FeesEstimateOverviewCard(props) {
    var classes = props.classes,
        estimate = props.estimate;

    var totalHeadClassName = "tl-total-amount-value " + classes.bigheader;
    var isPaid = estimate.fees.appStatus === 'CONNECTION_ACTIVATED' || estimate.fees.appStatus === 'PENDING_FOR_CONNECTION_ACTIVATION' ? true : false;

    // if (estimate !== null && estimate !== undefined && estimate.fees !== undefined && estimate.fees !== null && estimate.fees.length > 0) {
    //     if (estimate.fees[0].data !== null && estimate.fees[0].data !== undefined && estimate.fees[0].data.length > 0) {
    //         totalAmount = estimate.fees[0].data[0].total;
    //         dueDate = convertEpochToDate(estimate.fees[0].data[0].expiryDate);
    //     }
    //     if (estimate.fees[0].description !== null && estimate.fees[0].description !== undefined && estimate.fees[0].description.length > 0) {
    //         sortedArray = estimate.fees[0].description;
    //     }
    // }

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
                estimate.fees.totalAmount
            ),
            isPaid ? _react2.default.createElement(
                _Typography2.default,
                { variant: "body2", align: "right", style: { color: 'green' } },
                _react2.default.createElement(_uiContainers.LabelContainer, {
                    labelName: "Paid Successfully",
                    labelKey: "WS_COMMON_PAID_SUCCESS"
                })
            ) : _react2.default.createElement(
                _Typography2.default,
                { variant: "body2", align: "right", style: { color: 'red' } },
                _react2.default.createElement(_uiContainers.LabelContainer, {
                    labelName: "Not Paid",
                    labelKey: "WS_COMMON_NOT_PAID"
                })
            )
        ),
        _react2.default.createElement(
            _Grid2.default,
            { xs: 12, sm: 7 },
            _react2.default.createElement(
                "div",
                { style: { maxWidth: 600 } },
                _react2.default.createElement(
                    "div",
                    null,
                    _react2.default.createElement(
                        _Grid2.default,
                        { container: true },
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 4 },
                                _react2.default.createElement(
                                    _Typography2.default,
                                    { variant: "body2" },
                                    _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "WS_APPLICATION_FEE_HEADER" })
                                )
                            ),
                            _react2.default.createElement(_Grid2.default, { item: true, xs: 2 }),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 6,
                                    align: "right",
                                    style: styles.taxStyles,
                                    className: "tl-application-table-total-value" },
                                _react2.default.createElement(
                                    _Typography2.default,
                                    { variant: "body2" },
                                    estimate.fees.fee
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 4 },
                                _react2.default.createElement(
                                    _Typography2.default,
                                    { variant: "body2" },
                                    _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "WS_SERVICE_FEE_HEADER" })
                                )
                            ),
                            _react2.default.createElement(_Grid2.default, { item: true, xs: 2 }),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 6,
                                    align: "right",
                                    style: styles.taxStyles,
                                    className: "tl-application-table-total-value" },
                                _react2.default.createElement(
                                    _Typography2.default,
                                    { variant: "body2" },
                                    estimate.fees.charge
                                )
                            )
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 4 },
                                _react2.default.createElement(
                                    _Typography2.default,
                                    { variant: "body2" },
                                    _react2.default.createElement(_uiContainers.LabelContainer, { labelKey: "WS_TAX_HEADER" })
                                )
                            ),
                            _react2.default.createElement(_Grid2.default, { item: true, xs: 2 }),
                            _react2.default.createElement(
                                _Grid2.default,
                                { item: true, xs: 6,
                                    align: "right",
                                    style: styles.taxStyles,
                                    className: "tl-application-table-total-value" },
                                _react2.default.createElement(
                                    _Typography2.default,
                                    { variant: "body2" },
                                    estimate.fees.taxAmount
                                )
                            )
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
                            estimate.fees.totalAmount
                        )
                    )
                )
            )
        ),
        _react2.default.createElement(_Grid2.default, { xs: 12,
            sm: 1 })
    );
}

exports.default = (0, _styles.withStyles)(styles)(FeesEstimateOverviewCard);