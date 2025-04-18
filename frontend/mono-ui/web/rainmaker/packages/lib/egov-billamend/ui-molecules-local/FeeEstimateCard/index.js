"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require("babel-runtime/helpers/extends");

var _extends3 = _interopRequireDefault(_extends2);

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _styles = require("@material-ui/core/styles");

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Error = require("@material-ui/icons/Error");

var _Error2 = _interopRequireDefault(_Error);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _uiMolecules = require("egov-ui-framework/ui-molecules");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
    card: {
        backgroundColor: "rgb(242, 242, 242)",
        boxShadow: "none",
        borderRadius: 0,
        display: "flex"
    },
    whiteCard: {
        padding: 18,
        marginTop: 24,
        boxShadow: "none",
        borderRadius: 0,
        display: "flex"
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
    leftIcon: {
        color: "grey",
        marginRight: 4
    },
    taxHeadMasterCodes: {
        fontSize: "12px",
        marginTop: "5px"
    }
};

function totalAmount(arr) {
    if (Array.isArray(arr)) {
        return arr.map(function (item) {
            return item.taxAmount ? item.taxAmount : 0;
        }).reduce(function (prev, next) {
            return prev + next;
        }, 0);
    } else {
        return 0;
    }
}

// function getAmountType (fees) {
//     for(let i = 0; i < fees.length; i++) {
//         // if (fees[i].taxAmount < 0) return "reducedAmount";
//         // if (fees[i].taxAmount > 0) return "additionalAmount";
//         return fees[i].amountType
//     }
// }


var updateEstimate = function updateEstimate() {
    var fees = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var searchBillDetails = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var amountType = "reducedAmount";

    var newFee = {};
    fees && Array.isArray(fees) && fees.map(function (fee) {
        amountType = fee.amountType;
        newFee[fee.taxHeadMasterCode] = (0, _extends3.default)({}, fee);
    });
    var newFees = [];
    Object.keys(newFee).map(function (key) {
        if (key != 'TOTAL') {
            newFees.push({ taxHeadMasterCode: key, taxAmount: (0, _get2.default)(newFee, key + ".taxAmount", 0), amountType: amountType });
        }
    });

    return newFees;
};
function FeesEstimateCard(props) {
    var classes = props.classes,
        estimate = props.estimate,
        _props$searchBillDeta = props.searchBillDetails,
        searchBillDetails = _props$searchBillDeta === undefined ? {} : _props$searchBillDeta;

    var total = totalAmount(estimate.fees);
    estimate.fees = updateEstimate(estimate.fees, searchBillDetails); // to show All Tax heads in UI to 

    var billTotal = searchBillDetails && searchBillDetails.TOTAL || 0;
    var updatedTotal = (0, _get2.default)(estimate, "fees[0].amountType", "") === "reducedAmount" ? billTotal - total : billTotal + total;
    // const amountType = getAmountType(estimate.fees);
    return _react2.default.createElement(
        _Grid2.default,
        { container: true },
        _react2.default.createElement(
            _Grid2.default,
            { xs: 12, sm: 12 },
            _react2.default.createElement(
                _Typography2.default,
                { variant: "body2", align: "right" },
                _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Tax Heads", labelKey: "BILL_TOTAL_AMOUNT" })
            ),
            _react2.default.createElement(
                _Typography2.default,
                { className: classes.bigheader, align: "right" },
                _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Tax Heads", labelKey: "BILL_RS_HEADER", style: { fontWeight: "bold" } }),
                "  ",
                total
            )
        ),
        _react2.default.createElement(
            _Grid2.default,
            { xs: 12, sm: 12 },
            _react2.default.createElement(
                "div",
                null,
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true },
                    _react2.default.createElement(
                        _Grid2.default,
                        { container: true, style: { marginBottom: 10 } },
                        _react2.default.createElement(
                            _Grid2.default,
                            { container: true, xs: 3 },
                            _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Tax Heads", labelKey: "BILL_TAX_HEADS", style: { fontWeight: "bold" } })
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { align: "right", xs: 3 },
                            _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Tax Heads", labelKey: "BILL_OLD_AMOUNT", style: { fontWeight: "bold" } })
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { xs: 3, align: "right" },
                            _react2.default.createElement(_uiContainers.LabelContainer, {
                                labelName: "Reduced Amount(Rs)",
                                labelKey: (0, _get2.default)(estimate, "fees[0].amountType", "") === "reducedAmount" ? "BILL_REDUCED_AMOUNT_RS" : "BILL_ADDITIONAL_AMOUNT_RS",
                                style: { fontWeight: "bold" } })
                        ),
                        _react2.default.createElement(
                            _Grid2.default,
                            { xs: 3, align: "right" },
                            _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Tax Heads", labelKey: "BILL_UPDATED_AMOUNT", style: { fontWeight: "bold" } })
                        )
                    ),
                    estimate.fees && estimate.fees.length > 0 && estimate.fees.map(function (fee, key) {
                        var tooltip = fee.info ? _react2.default.createElement(_uiMolecules.Tooltip, { val: "", icon: "info_circle", className: 'bill-estimate-infoicon', style: { position: 'absolute' } }) //{fee.info.labelName}
                        : "";
                        var textLeft = fee.taxHeadMasterCode ? _react2.default.createElement(
                            _Grid2.default,
                            { container: true, xs: 3 },
                            _react2.default.createElement(_uiContainers.LabelContainer, {
                                labelKey: (0, _commons.getTransformedLocale)("BILL_" + fee.taxHeadMasterCode),
                                className: classes.taxHeadMasterCodes
                            }),
                            tooltip
                        ) : _react2.default.createElement(_Grid2.default, { xs: 3 });
                        var oldAmount = fee ? _react2.default.createElement(
                            _Grid2.default,
                            { xs: 3, align: "right" },
                            _react2.default.createElement(
                                _Typography2.default,
                                { variant: "body2", className: classes.taxHeadMasterCodes },
                                (0, _get2.default)(searchBillDetails, fee.taxHeadMasterCode, 0)
                            )
                        ) : _react2.default.createElement(_Grid2.default, { xs: 3 });
                        var newAmount = fee ? _react2.default.createElement(
                            _Grid2.default,
                            { xs: 3, align: "right" },
                            _react2.default.createElement(
                                _Typography2.default,
                                { variant: "body2", className: classes.taxHeadMasterCodes },
                                (0, _get2.default)(estimate, "fees[0].amountType", "") === "reducedAmount" ? Number((0, _get2.default)(searchBillDetails, fee.taxHeadMasterCode, 0)) - Number(fee.taxAmount) : Number((0, _get2.default)(searchBillDetails, fee.taxHeadMasterCode, 0)) + Number(fee.taxAmount)
                            )
                        ) : _react2.default.createElement(_Grid2.default, { xs: 3 });
                        var textRight = fee ? _react2.default.createElement(
                            _Grid2.default,
                            { xs: 3, align: "right" },
                            _react2.default.createElement(
                                _Typography2.default,
                                { variant: "body2", className: classes.taxHeadMasterCodes },
                                fee.taxAmount
                            )
                        ) : _react2.default.createElement(_Grid2.default, { xs: 3 });
                        return _react2.default.createElement(
                            _Grid2.default,
                            { container: true },
                            textLeft,
                            oldAmount,
                            textRight,
                            newAmount
                        );
                    })
                ),
                _react2.default.createElement(_Divider2.default, { style: { marginBottom: 5 } }),
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true },
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 3 },
                        _react2.default.createElement(_uiContainers.LabelContainer, { labelName: "Reduced Amount(Rs)", labelKey: "BILL_ADJUSTMENT_AMOUNT_TOTAL", style: { fontWeight: "bold" } })
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 3, align: "right", style: { paddingRight: 0 } },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            billTotal
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 3, align: "right", style: { paddingRight: 0 } },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            total
                        )
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true, xs: 3, align: "right", style: { paddingRight: 0 } },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            updatedTotal
                        )
                    )
                )
            )
        ),
        _react2.default.createElement(
            _Grid2.default,
            { xs: 12, sm: 12 },
            _react2.default.createElement(
                _Card2.default,
                { className: classes.whiteCard },
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true, style: { display: "flex", flexFlow: "row" } },
                    _react2.default.createElement(
                        _Grid2.default,
                        { item: true },
                        _react2.default.createElement(_Error2.default, { className: classes.leftIcon })
                    ),
                    _react2.default.createElement(
                        _Grid2.default,
                        null,
                        estimate.extra.map(function (item, key) {
                            var textLeft = void 0,
                                textRight = void 0;
                            var colLeft = item.textRight ? 12 : 12;
                            var colRight = item.textLeft ? 12 : 12;
                            if (item.textLeft) {
                                textLeft = _react2.default.createElement(
                                    _Grid2.default,
                                    { xs: colLeft },
                                    _react2.default.createElement(
                                        _Typography2.default,
                                        null,
                                        item.textLeft
                                    )
                                );
                            } else {
                                textLeft = _react2.default.createElement(_Grid2.default, { xs: colLeft });
                            }
                            if (item.textRight) {
                                textRight = _react2.default.createElement(
                                    _Grid2.default,
                                    { xs: colRight },
                                    _react2.default.createElement(
                                        _Typography2.default,
                                        null,
                                        item.textRight
                                    )
                                );
                            } else {
                                textRight = _react2.default.createElement(_Grid2.default, { xs: colRight });
                            }
                            return _react2.default.createElement(
                                _Grid2.default,
                                null,
                                textLeft,
                                textRight
                            );
                        })
                    )
                )
            )
        )
    );
}

FeesEstimateCard.propTypes = {
    header: _propTypes2.default.string.isRequired,
    fees: _propTypes2.default.array.isRequired,
    extra: _propTypes2.default.array.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(FeesEstimateCard);