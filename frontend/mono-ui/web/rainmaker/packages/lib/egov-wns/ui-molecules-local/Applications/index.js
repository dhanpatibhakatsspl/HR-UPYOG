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

var _Card = require("@material-ui/core/Card");

var _Card2 = _interopRequireDefault(_Card);

var _CardContent = require("@material-ui/core/CardContent");

var _CardContent2 = _interopRequireDefault(_CardContent);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _styles = require("@material-ui/core/styles");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _actions = require("egov-ui-framework/ui-redux/app/actions");

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require("react-redux");

var _store = require("ui-redux/store");

var _store2 = _interopRequireDefault(_store);

var _LabelContainer = require("../../ui-containers-local/LabelContainer");

var _LabelContainer2 = _interopRequireDefault(_LabelContainer);

require("./index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var styles = {
  card: {
    marginLeft: 8,
    marginRight: 8,
    borderRadius: "inherit"
  }
};

var Applications = function (_React$Component) {
  (0, _inherits3.default)(Applications, _React$Component);

  function Applications() {
    var _ref;

    var _temp, _this, _ret;

    (0, _classCallCheck3.default)(this, Applications);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = (0, _possibleConstructorReturn3.default)(this, (_ref = Applications.__proto__ || Object.getPrototypeOf(Applications)).call.apply(_ref, [this].concat(args))), _this), _this.getTaskDetails = function (data) {
      data.service = data.service.toUpperCase();
      // store.dispatch(setRoute(`/wns/search-preview?applicationNumber=${data.applicationNo}&history=${true}&tenantId=${data.property.tenantId}&service=${data.service}`))
      var connectionNo = data.connectionNo || 'NA';
      var applicationType = data.applicationType;
      if (connectionNo && connectionNo !== 'NA' && applicationType.includes('MODIFY')) {
        _store2.default.dispatch((0, _actions.setRoute)("/wns/search-preview?applicationNumber=" + data.applicationNo + "&tenantId=" + data.property.tenantId + "&history=true&service=" + data.service + "&mode=MODIFY"));
      } else {
        _store2.default.dispatch((0, _actions.setRoute)("/wns/search-preview?applicationNumber=" + data.applicationNo + "&tenantId=" + data.property.tenantId + "&history=true&service=" + data.service));
      }
    }, _this.titleCasingStatus = function (status) {
      var splitStr = status.toLowerCase().split('_');
      for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
      }
      return splitStr.join(' ');
    }, _temp), (0, _possibleConstructorReturn3.default)(_this, _ret);
  }

  (0, _createClass3.default)(Applications, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          myApplicationResults = _props.myApplicationResults,
          classes = _props.classes;

      return _react2.default.createElement(
        "div",
        { className: "application-card" },
        myApplicationResults && myApplicationResults.length > 0 ? myApplicationResults.map(function (item) {
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
                        labelKey: "WS_MYCONNECTIONS_APPLICATION_NO",
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 8, xs: 6 },
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelName: item.applicationNo,
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
                      _react2.default.createElement(_uiContainers.LabelContainer, {
                        labelName: item.property && item.property.owners.map(function (owner) {
                          return owner.name;
                        }).join(","),
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
                        labelKey: "WS_MYCONNECTIONS_DUE",
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 8, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelName: item.due,
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
                        labelKey: "WS_MYCONNECTIONS_STATUS",
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.60" }
                      })
                    ),
                    _react2.default.createElement(
                      _Grid2.default,
                      { item: true, md: 8, xs: 6 },
                      _react2.default.createElement(_LabelContainer2.default, {
                        labelName: _this2.titleCasingStatus(item.applicationStatus),
                        fontSize: 14,
                        style: { fontSize: 14, color: "rgba(0, 0, 0, 0.87" }
                      })
                    )
                  ),
                  _react2.default.createElement(
                    "div",
                    { className: "linkStyle", onClick: function onClick() {
                        return _this2.getTaskDetails(item);
                      } },
                    _react2.default.createElement(_uiContainers.LabelContainer, {
                      labelKey: "WS_VIEW_DETAILS",
                      style: {
                        color: "#fe7a51",
                        fontSize: 14
                      }
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
  return Applications;
}(_react2.default.Component);

var mapStateToProps = function mapStateToProps(state) {
  var myApplicationResults = (0, _get2.default)(state.screenConfiguration.preparedFinalObject, "myApplicationResults", []);
  // const myConnectionDue = get(
  //   state.screenConfiguration.preparedFinalObject,
  //   "myConnectionDue",
  //   []
  // );
  var screenConfig = (0, _get2.default)(state.screenConfiguration, "screenConfig");
  return { screenConfig: screenConfig, myApplicationResults: myApplicationResults };
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

exports.default = (0, _styles.withStyles)(styles)((0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Applications));