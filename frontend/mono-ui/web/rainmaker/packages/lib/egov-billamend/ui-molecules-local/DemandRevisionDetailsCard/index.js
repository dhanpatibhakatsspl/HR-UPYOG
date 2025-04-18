"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _propTypes = require("prop-types");

var _propTypes2 = _interopRequireDefault(_propTypes);

var _styles = require("@material-ui/core/styles");

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Typography = require("@material-ui/core/Typography");

var _Typography2 = _interopRequireDefault(_Typography);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Divider = require("@material-ui/core/Divider");

var _Divider2 = _interopRequireDefault(_Divider);

var _uiMolecules = require("egov-ui-framework/ui-molecules");

var _Error = require("@material-ui/icons/Error");

var _Error2 = _interopRequireDefault(_Error);

var _utils = require("egov-ui-framework/ui-config/screens/specs/utils");

var _reactBootstrap = require("react-bootstrap");

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
        borderRadius: 0
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
    }
};

function totalAmount(arr) {
    return arr.map(function (item) {
        return item.value ? item.value : 0;
    }).reduce(function (prev, next) {
        return prev + next;
    }, 0);
}

function DemandRevisionDetailsCard(props) {
    var classes = props.classes,
        estimate = props.estimate;

    var total = totalAmount(estimate.fees);
    return _react2.default.createElement(
        _Grid2.default,
        { container: true },
        _react2.default.createElement(
            _Grid2.default,
            { xs: 12, sm: 7 },
            _react2.default.createElement(
                _Grid2.default,
                { container: true },
                estimate.fees.map(function (fee, key) {
                    var tooltip = fee.info ? _react2.default.createElement(_uiMolecules.Tooltip, { val: fee.info.labelName, icon: "info_circle" }) : "";
                    var textLeft = fee.name ? _react2.default.createElement(
                        _Grid2.default,
                        { container: true, xs: 8 },
                        _react2.default.createElement(
                            _Typography2.default,
                            null,
                            fee.name.labelName
                        ),
                        tooltip
                    ) : _react2.default.createElement(_Grid2.default, { xs: 8 });
                    var textRight = fee.value ? _react2.default.createElement(
                        _Grid2.default,
                        { xs: 4, align: "right" },
                        _react2.default.createElement(
                            _Typography2.default,
                            { variant: "body2" },
                            fee.value
                        )
                    ) : _react2.default.createElement(_Grid2.default, { xs: 4 });
                    return _react2.default.createElement(
                        _Grid2.default,
                        { container: true },
                        _react2.default.createElement(
                            _reactBootstrap.Label,
                            null,
                            "ddd"
                        )
                    );
                })
            ),
            _react2.default.createElement(_Divider2.default, { style: { marginBottom: 5 } }),
            _react2.default.createElement(
                _Grid2.default,
                { container: true },
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 6 },
                    _react2.default.createElement(
                        _Typography2.default,
                        { variant: "body2" },
                        "Total"
                    )
                ),
                _react2.default.createElement(
                    _Grid2.default,
                    { item: true, xs: 6, align: "right", style: { paddingRight: 0 } },
                    _react2.default.createElement(
                        _Typography2.default,
                        { variant: "body2" },
                        total
                    )
                )
            )
        ),
        _react2.default.createElement(
            _Grid2.default,
            { xs: 12, sm: 5 },
            _react2.default.createElement(
                _Typography2.default,
                { variant: "body2", align: "right" },
                "Total Amount"
            ),
            _react2.default.createElement(
                _Typography2.default,
                { className: classes.bigheader, align: "right" },
                "Rs ",
                total
            ),
            _react2.default.createElement(
                _Card2.default,
                { className: classes.whiteCard },
                _react2.default.createElement(
                    _Grid2.default,
                    { container: true },
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
                            var colLeft = item.textRight ? 6 : 12;
                            var colRight = item.textLeft ? 6 : 12;
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
                                { container: true },
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

DemandRevisionDetailsCard.propTypes = {
    header: _propTypes2.default.string.isRequired,
    fees: _propTypes2.default.array.isRequired,
    extra: _propTypes2.default.array.isRequired
};

exports.default = (0, _styles.withStyles)(styles)(DemandRevisionDetailsCard);