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

var _styles = require("@material-ui/core/styles");

var _LabelContainer = require("../../ui-containers-local/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _reactRouterDom = require("react-router-dom");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _LabelContainer3 = require("egov-ui-framework/ui-containers/LabelContainer");

var _LabelContainer4 = _interopRequireDefault(_LabelContainer3);

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _utils = require("../../ui-config/screens/specs/utils");

var _commons = require("egov-ui-framework/ui-utils/commons");

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
    (0, _classCallCheck3.default)(this, MeterReading);
    return (0, _possibleConstructorReturn3.default)(this, (MeterReading.__proto__ || Object.getPrototypeOf(MeterReading)).apply(this, arguments));
  }

  (0, _createClass3.default)(MeterReading, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          consumptionDetails = _props.consumptionDetails,
          onActionClick = _props.onActionClick,
          classes = _props.classes;
      // if (consumptionDetails.length > 0) {
      //   var lastReadingDate = convertEpochToDate(consumptionDetails[0].lastReadingDate)
      //   var currentReadingDate = convertEpochToDate(consumptionDetails[0].currentReadingDate)
      // }

      return _react2.default.createElement(
        "div",
        null,
        consumptionDetails && consumptionDetails.length > 0 ? consumptionDetails.map(function (item) {
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
                  { container: true, style: { marginBottom: 12 } },
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 4, xs: 6 },
                    _react2.default.createElement(_LabelContainer4.default, {
                      labelKey: "WS_CONSUMPTION_DETAILS_BILLING_PERIOD_LABEL",
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                    })
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 8, xs: 6 },
                    _react2.default.createElement(_LabelContainer2.default, {
                      labelName: item.billingPeriod,
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                    })
                  )
                ),
                _react2.default.createElement(
                  _Grid2.default,
                  { container: true, style: { marginBottom: 12 } },
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 4, xs: 6 },
                    _react2.default.createElement(_LabelContainer4.default, {
                      labelKey: "WS_CONSUMPTION_DETAILS_METER_STATUS_LABEL",
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                    })
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 8, xs: 6 },
                    _react2.default.createElement(_LabelContainer2.default, {
                      labelName: "" + (0, _commons.getLocaleLabels)("NA", "WS_SERVICES_CALCULATION_METERSTATUS_" + (0, _commons.getTransformedLocale)(item.meterStatus)),
                      fontSize: 14,
                      style: { fontSize: 14 }
                    })
                  )
                ),
                _react2.default.createElement(
                  _Grid2.default,
                  { container: true, style: { marginBottom: 12 } },
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 4, xs: 6 },
                    _react2.default.createElement(_LabelContainer4.default, {
                      labelKey: "WS_CONSUMPTION_DETAILS_LAST_READING_LABEL",
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                    })
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 8, xs: 6 },
                    _react2.default.createElement(_LabelContainer2.default, {
                      labelName: item.lastReading,
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                    })
                  )
                ),
                _react2.default.createElement(
                  _Grid2.default,
                  { container: true, style: { marginBottom: 12 } },
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 4, xs: 6 },
                    _react2.default.createElement(_LabelContainer4.default, {
                      labelKey: "WS_CONSUMPTION_DETAILS_LAST_READING_DATE_LABEL",
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                    })
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 8, xs: 6 },
                    _react2.default.createElement(_LabelContainer2.default, {
                      labelName: "" + (0, _utils.convertEpochToDate)(item.lastReadingDate),
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                    })
                  )
                ),
                _react2.default.createElement(
                  _Grid2.default,
                  { container: true, style: { marginBottom: 12 } },
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 4, xs: 6 },
                    _react2.default.createElement(_LabelContainer4.default, {
                      labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_LABEL",
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                    })
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 8, xs: 6 },
                    _react2.default.createElement(_LabelContainer2.default, {
                      labelName: item.currentReading,
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                    })
                  )
                ),
                _react2.default.createElement(
                  _Grid2.default,
                  { container: true, style: { marginBottom: 12 } },
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 4, xs: 6 },
                    _react2.default.createElement(_LabelContainer4.default, {
                      labelKey: "WS_CONSUMPTION_DETAILS_CURRENT_READING_DATE_LABEL",
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                    })
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 8, xs: 6 },
                    _react2.default.createElement(_LabelContainer2.default, {
                      labelName: "" + (0, _utils.convertEpochToDate)(item.currentReadingDate),
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                    })
                  )
                ),
                _react2.default.createElement(
                  _Grid2.default,
                  { container: true, style: { marginBottom: 12 } },
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 4, xs: 6 },
                    _react2.default.createElement(_LabelContainer4.default, {
                      labelKey: "WS_CONSUMPTION_DETAILS_CONSUMPTION_LABEL",
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                    })
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { item: true, md: 8, xs: 6 },
                    _react2.default.createElement(_LabelContainer2.default, {
                      labelName: item.currentReading - item.lastReading,
                      fontSize: 14,
                      style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                    })
                  )
                )
              )
            )
          );
        }) : _react2.default.createElement(
          "div",
          { style: {
              display: "flex",
              width: "100%",
              height: '50vh',
              alignItems: 'center',
              justifyContent: "center",
              textAlign: "center"
            } },
          _react2.default.createElement(_LabelContainer4.default, {
            labelKey: "No results Found!"
          })
        )
      );
    }
  }]);
  return MeterReading;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var consumptionDetails = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "consumptionDetails", []);
  var screenConfig = (0, _get2.default)(state.screenConfiguration, "screenConfig");
  return { screenConfig: screenConfig, consumptionDetails: consumptionDetails };
};
var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    setRoute: function setRoute(path) {
      return dispatch((0, _actions.setRoute)(path));
    }
    // handleField: (screenKey, jsonPath, fieldKey, value) =>
    //   dispatch(handleField(screenKey, jsonPath, fieldKey, value))
  };
};
exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MeterReading));