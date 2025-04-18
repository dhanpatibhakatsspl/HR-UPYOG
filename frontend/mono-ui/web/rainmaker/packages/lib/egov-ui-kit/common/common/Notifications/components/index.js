"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _regenerator = require("babel-runtime/regenerator");

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require("babel-runtime/helpers/asyncToGenerator");

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var _common = require("modules/common");

var _components = require("components");

var _reactRedux = require("react-redux");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _localStorageUtils = require("egov-ui-kit/utils/localStorageUtils");

var _actions = require("egov-ui-kit/redux/app/actions");

var _Location_pin = require("egov-ui-kit/assets/Location_pin.svg");

var _Location_pin2 = _interopRequireDefault(_Location_pin);

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _get = require("lodash/get");

var _get2 = _interopRequireDefault(_get);

require("../index.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pStyle = {
  backgroundColor: "#EEEEEE",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  height: "65%",
  width: "90%"
};
var divStyle = {
  backgroundColor: "#FC8019",
  justifyContent: "center",
  alignItems: "center",
  display: "flex",
  height: "35%",
  width: "90%"
};

var EventDetails = function (_Component) {
  (0, _inherits3.default)(EventDetails, _Component);

  function EventDetails(props) {
    var _this2 = this;

    (0, _classCallCheck3.default)(this, EventDetails);

    var _this = (0, _possibleConstructorReturn3.default)(this, (EventDetails.__proto__ || Object.getPrototypeOf(EventDetails)).call(this, props));

    _this.openMapHandler = function (isOpen) {
      _this.setState({ openMap: isOpen });
    };

    _this.componentDidMount = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
      var tenantId, _this$props, getNotifications, notifications, queryObject, requestBody;

      return _regenerator2.default.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              tenantId = (0, _commons.getQueryArg)(window.location.href, "tenantId");
              _this$props = _this.props, getNotifications = _this$props.getNotifications, notifications = _this$props.notifications;

              if (!notifications) {
                queryObject = [{
                  key: "tenantId",
                  value: tenantId
                }, {
                  key: "eventTypes",
                  value: "EVENTSONGROUND"
                }];
                requestBody = {
                  RequestInfo: {
                    apiId: "org.egov.pt",
                    ver: "1.0",
                    ts: 1502890899493,
                    action: "asd",
                    did: "4354648646",
                    key: "xyz",
                    msgId: "654654",
                    requesterId: "61",
                    authToken: (0, _localStorageUtils.getAccessToken)()
                  }
                };

                getNotifications(queryObject, requestBody);
              }

            case 3:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, _this2);
    }));

    _this.state = {
      response: "",
      openMap: false
    };
    return _this;
  }

  (0, _createClass3.default)(EventDetails, [{
    key: "render",
    value: function render() {
      var _React$createElement, _React$createElement2;

      var openMap = this.state.openMap;
      var openMapHandler = this.openMapHandler;
      var _props = this.props,
          eventDetails = _props.eventDetails,
          loading = _props.loading;

      var _ref2 = eventDetails || "",
          description = _ref2.description,
          SLA = _ref2.SLA,
          address = _ref2.address,
          locationObj = _ref2.locationObj,
          eventCategory = _ref2.eventCategory,
          name = _ref2.name,
          eventDate = _ref2.eventDate,
          eventToDate = _ref2.eventToDate,
          entryFees = _ref2.entryFees;

      return _react2.default.createElement(
        _common.Screen,
        { className: "notifications-screen-style", loading: loading },
        eventCategory && _react2.default.createElement(_components.Card, (_React$createElement = {
          className: "home-notification",
          style: { margin: "8px 0px" }
        }, (0, _defineProperty3.default)(_React$createElement, "style", { padding: "12px 8px" }), (0, _defineProperty3.default)(_React$createElement, "textChildren", _react2.default.createElement(
          _Grid2.default,
          { container: true },
          eventDate && _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 4, direction: "column", style: { maxWidth: "100px", maxHeight: "100px", minWidth: "100px", minHeight: "100px" } },
            _react2.default.createElement(
              "div",
              { style: divStyle },
              _react2.default.createElement(_translationNode2.default, { label: eventDate.split(":")[0] === eventToDate.split(":")[0] ? eventDate.split(":")[0] : eventDate.split(":")[0] + "-" + eventToDate.split(":")[0], color: "#fff", fontSize: "17px" })
            ),
            _react2.default.createElement(
              "div",
              { style: pStyle },
              _react2.default.createElement(_translationNode2.default, { label: eventDate.split(":")[1] === eventToDate.split(":")[1] && eventDate.split(":")[0] === eventToDate.split(":")[0] ? eventDate.split(":")[1] : eventDate.split(":")[1] + "-" + eventToDate.split(":")[1], color: "#FC8019", fontSize: "34px" })
            )
          ),
          _react2.default.createElement(
            _Grid2.default,
            { item: true, xs: 8, sm: true, container: true },
            _react2.default.createElement(
              "div",
              { className: "update" },
              _react2.default.createElement(_translationNode2.default, {
                leftWrapperStyle: true,
                fontSize: 16,
                color: "rgba(0, 0, 0, 0.87)",
                label: name,
                labelStyle: { width: "100%", wordWrap: "break-word" },
                containerStyle: { marginBottom: 5 }
              }),
              _react2.default.createElement(_translationNode2.default, {
                leftWrapperStyle: true,
                fontSize: 14,
                color: "rgba(0, 0, 0, 0.60)",
                label: "MSEVA_EVENTCATEGORIES_" + eventCategory,
                labelStyle: { width: "100%", wordWrap: "break-word" },
                containerStyle: { marginBottom: 5, marginTop: 10 }
              })
            )
          )
        )), _React$createElement)),
        description && _react2.default.createElement(_components.Card, (_React$createElement2 = {
          style: { margin: "8px 0px" }
        }, (0, _defineProperty3.default)(_React$createElement2, "style", { padding: "12px 8px" }), (0, _defineProperty3.default)(_React$createElement2, "textChildren", _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(_translationNode2.default, {
            leftWrapperStyle: true,
            fontSize: 14,
            color: "rgba(0, 0, 0, 0.60)",
            label: description,
            labelStyle: { width: "100%", wordWrap: "break-word" },
            containerStyle: { marginBottom: 20 }
          }),
          address && _react2.default.createElement(
            "div",
            { className: "rainmaker-displayInline" },
            _react2.default.createElement(_components.Icon, {
              name: "place",
              action: "maps",
              style: {
                height: 25,
                width: 100,
                maxWidth: 38,
                color: "#484848"
              },
              viewBox: "10 0 24 24"
            }),
            _react2.default.createElement(_translationNode2.default, { fontSize: 14, color: "rgba(0, 0, 0, 0.60)", label: address, containerStyle: { marginLeft: 2, marginBottom: 10, width: "90%" } })
          ),
          _react2.default.createElement(
            "div",
            {
              onClick: function onClick() {
                openMapHandler(true);
              },
              style: { cursor: "pointer", marginBottom: 20, marginLeft: 40 }
            },
            _react2.default.createElement(_translationNode2.default, { label: "GET DIRECTIONS", color: "#FC8019", fontSize: 14 })
          ),
          _react2.default.createElement(
            "div",
            { className: "rainmaker-displayInline" },
            _react2.default.createElement(_components.Icon, { name: "access-time", action: "device", viewBox: "10 0 24 24", style: { height: "20px", width: "35px" } }),
            SLA
          ),
          entryFees > 0 && _react2.default.createElement(
            "div",
            { className: "rainmaker-displayInline", style: { marginTop: 8 } },
            _react2.default.createElement(_components.Icon, { name: "rupee", action: "custom", viewBox: "10 0 24 24", style: { height: "20px", width: "35px" } }),
            _react2.default.createElement(_translationNode2.default, { label: "" + entryFees, containerStyle: { marginLeft: 5 } })
          ),
          openMap && _react2.default.createElement(
            "div",
            null,
            _react2.default.createElement(_components.Icon, {
              className: "mapBackBtn",
              onClick: function onClick() {
                openMapHandler(false);
              },
              style: {
                height: 24,
                width: 24,
                color: "#484848"
              },
              action: "navigation",
              name: "arrow-back"
            }),
            _react2.default.createElement(_components.MapLocation, { currLoc: locationObj, icon: _Location_pin2.default, hideTerrainBtn: true, viewLocation: true })
          )
        )), _React$createElement2))
      );
    }
  }]);
  return EventDetails;
}(_react.Component);

var mapStateToProps = function mapStateToProps(state) {
  var notifications = (0, _get2.default)(state.app, "notificationObj.notificationsById");
  var loading = (0, _get2.default)(state.app, "notificationObj.loading");
  var uuid = (0, _commons.getQueryArg)(window.location.href, "uuid");
  var eventDetails = notifications && notifications.hasOwnProperty(uuid) ? (0, _get2.default)(notifications, uuid) : {};
  return { eventDetails: eventDetails, loading: loading };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    getNotifications: function getNotifications(queryObject, requestBody) {
      return dispatch((0, _actions.getNotifications)(queryObject, requestBody));
    }
  };
};

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(EventDetails);