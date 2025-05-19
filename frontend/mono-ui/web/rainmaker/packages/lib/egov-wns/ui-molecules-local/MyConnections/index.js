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

var _styles = require("@material-ui/core/styles");

var _LabelContainer = require("../../ui-containers-local/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _uiContainers = require("egov-ui-framework/ui-containers");

var _reactRedux = require("react-redux");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("./index.css");

var _commons = require("../../ui-utils/commons");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _functions = require("../../ui-config/screens/specs/wns/searchResource/functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

var MyConnections = function (_React$Component) {
  (0, _inherits3.default)(MyConnections, _React$Component);

  function MyConnections() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, MyConnections);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = MyConnections.__proto__ || Object.getPrototypeOf(MyConnections)).call.apply(_ref, [this].concat(args))), _this), _this.getConnectionDetails = function (data) {
      _store2.default.dispatch((0, _actions.setRoute)("/wns/connection-details?connectionNumber=" + data.connectionNo + "&tenantId=" + data.property.tenantId + "&service=" + data.service.toUpperCase() + "&connectionType=" + data.connectionType));
    }, _this.getViewBillDetails = function (data) {
      _store2.default.dispatch((0, _actions.setRoute)("/wns/viewBill?connectionNumber=" + data.connectionNo + "&tenantId=" + data.property.tenantId + "&service=" + data.service.toUpperCase() + "&connectionType=" + data.connectionType));
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(MyConnections, [{
    key: "render",


    // getConnectionDetails = data => {
    //   window.location.href = `${getDomainLink()}/wns/connection-details?connectionNumber=${data.connectionNo}&tenantId=${data.property.tenantId}&service=${data.service.toUpperCase()}&connectionType=${data.connectionType}`
    // }

    // getViewBillDetails = data => {
    //   window.location.href = `${getDomainLink()}/wns/viewBill?connectionNumber=${data.connectionNo}&tenantId=${data.property.tenantId}&service=${data.service.toUpperCase()}&connectionType=${data.connectionType}`
    // }


    value: function render() {
      var _this2 = this;

      var _props = this.props,
          myConnectionResults = _props.myConnectionResults,
          classes = _props.classes;

      return _react2.default.createElement(
        "div",
        { className: "application-card" },
        myConnectionResults && myConnectionResults.length > 0 ? myConnectionResults.map(function (item) {

          var formatAddress = (0, _functions.handleAddress)(item);

          return _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(
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
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelKey: "WS_MYCONNECTIONS_SERVICE",
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 8, xs: 6 },
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelName: item.service,
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
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelKey: "WS_MYCONNECTIONS_CONSUMER_NO",
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 8, xs: 6 },
                      _react2.default.createElement(
                        "div",
                        { className: "linkStyle", onClick: function onClick() {
                            return _this2.getConnectionDetails(item);
                          } },
                        _react2.default.createElement(
                          "a",
                          null,
                          " ",
                          _react2.default.createElement(_LabelContainer2.default, {
                            labelName: item.connectionNo,
                            fontSize: 14,
                            style: { fontSize: 14 }
                          })
                        )
                      )
                    )
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { container: true, style: { marginBottom: 12 } },
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 4, xs: 6 },
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelKey: "WS_MYCONNECTIONS_STATUS",
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 8, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelName: item.status,
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
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelKey: "WS_MYCONNECTIONS_OWNER_NAME",
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 8, xs: 6 },
                      item.property && item.property.owners && item.property.owners !== "NA" ? _react2.default.createElement(
                        "div",
                        null,
                        _react2.default.createElement(_uiContainers.LabelContainer, {
                          labelName: item.property.owners.map(function (owner) {
                            return owner.name;
                          }).join(","),
                          fontSize: 14,
                          style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                        })
                      ) : _react2.default.createElement("div", null)
                    )
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { container: true, style: { marginBottom: 12 } },
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 4, xs: 6 },
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelKey: "WS_MYCONNECTION_ADDRESS",
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 8, xs: 6 },
                      item.property && item.property.address && formatAddress ? _react2.default.createElement(_LabelContainer2.default, {
                        labelName: formatAddress,
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                      }) : _react2.default.createElement("div", null)
                    )
                  ),
                  _react2.default.createElement(
                    _Grid2.default,
                    { container: true, style: { marginBottom: 12 } },
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 4, xs: 6 },
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelKey: "WS_MYCONNECTIONS_DUE",
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 8, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelName: item.due ? item.due : "0", onClick: function onClick() {
                          return item.due && _this2.getViewBillDetails(item);
                        },
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                      })
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    null,
                    item.due === "NA" ? _react2.default.createElement("div", null) : item.due === 0 ? _react2.default.createElement(
                      "div",
                      null,
                      " ",
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelKey: "WS_COMMON_PAID_LABEL",
                        style: { color: '#008000', textTransform: 'uppercase', fontWeight: 400 }
                      })
                    ) : !item.due ? _react2.default.createElement("div", null) : _react2.default.createElement(
                      "div",
                      { className: "linkStyle", onClick: function onClick() {
                          return _this2.getViewBillDetails(item);
                        } },
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelKey: "CS_COMMON_PAY",
                        style: {
                          color: "#fe7a51",
                          fontSize: 14
                        }
                      })
                    )
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
              height: "50vh",
              alignItems: 'center',
              justifyContent: "center",
              textAlign: "center"
            } },
          _react2.default.createElement(_uiContainers.LabelContainer, {
            labelKey: "No results Found!",
            style: { marginBottom: 10 }
          })
        )
      );
    }
  }]);
  return MyConnections;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var myConnectionResults = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "myConnectionResults", []);
  var myConnectionDue = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "myConnectionDue", []);
  var screenConfig = (0, _get2.default)(state.screenConfiguration, "screenConfig");
  return { screenConfig: screenConfig, myConnectionResults: myConnectionResults, myConnectionDue: myConnectionDue };
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

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(MyConnections));