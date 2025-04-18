"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _defineProperty2 = require("babel-runtime/helpers/defineProperty");

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _Grid = require("@material-ui/core/Grid");

var _Grid2 = _interopRequireDefault(_Grid);

var _Hidden = require("@material-ui/core/Hidden");

var _Hidden2 = _interopRequireDefault(_Hidden);

var _components = require("components");

var _uiContainers = require("egov-ui-framework/ui-containers");

var _commons = require("egov-ui-framework/ui-utils/commons");

var _translationNode = require("egov-ui-kit/utils/translationNode");

var _translationNode2 = _interopRequireDefault(_translationNode);

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _ReadMore = require("../ReadMore");

var _ReadMore2 = _interopRequireDefault(_ReadMore);

require("./index.css");

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

var Notifications = function Notifications(_ref) {
  var _ref$notifications = _ref.notifications,
      notifications = _ref$notifications === undefined ? [] : _ref$notifications,
      history = _ref.history;

  var renderUpdate = function renderUpdate(notification, index) {
    var _React$createElement;

    var description = notification.description,
        buttons = notification.buttons,
        address = notification.address,
        name = notification.name,
        SLA = notification.SLA,
        type = notification.type,
        id = notification.id,
        tenantId = notification.tenantId,
        eventDate = notification.eventDate,
        eventToDate = notification.eventToDate,
        documents = notification.documents;

    return _react2.default.createElement(_components.Card, (_React$createElement = {
      className: "home-notification",
      style: { margin: "8px 0px", borderLeft: type === "EVENTSONGROUND" ? "none" : "4px solid #fe7a51" },
      key: index,
      id: "home-notification" + index
    }, (0, _defineProperty3.default)(_React$createElement, "style", { padding: "12px 8px" }), (0, _defineProperty3.default)(_React$createElement, "textChildren", _react2.default.createElement(
      _Grid2.default,
      { container: true },
      type === "EVENTSONGROUND" && _react2.default.createElement(
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
        {
          item: true,
          xs: type === "EVENTSONGROUND" ? 8 : 12,
          sm: true,
          container: true,
          style: { display: "inline-block" },
          className: "update",
          onClick: function onClick() {
            return type === "EVENTSONGROUND" ? history.push("/event-details?uuid=" + id + "&tenantId=" + tenantId) : {};
          }
        },
        _react2.default.createElement(_translationNode2.default, { fontSize: 16, color: "rgba(0, 0, 0, 0.87)", label: type == "SYSTEMGENERATED" ? (0, _commons.getTransformedLocale)(name) : name, containerStyle: { marginBottom: 10 } }),
        type != "EVENTSONGROUND" && _react2.default.createElement(
          "div",
          null,
          _react2.default.createElement(
            _Hidden2.default,
            { xsDown: true },
            _react2.default.createElement(_translationNode2.default, {
              fontSize: 14,
              color: "rgba(0, 0, 0, 0.60)",
              label: description,
              labelStyle: { width: "100%", wordWrap: "break-word" },
              containerStyle: { marginBottom: 10 }
            })
          ),
          _react2.default.createElement(
            _Hidden2.default,
            { smUp: true },
            _react2.default.createElement(
              _ReadMore2.default,
              {
                className: "read-more-content",
                charLimit: 90,
                readMoreText: "CS_READ_MORE",
                readLessText: "CS_READ_LESS",
                containerStyle: { marginBottom: 10 }
              },
              description
            )
          )
        ),
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
          _react2.default.createElement(_translationNode2.default, {
            fontSize: 14,
            color: "rgba(0, 0, 0, 0.60)",
            label: address,
            containerStyle: { marginLeft: -7, marginBottom: 10, width: "90%" }
          })
        ),
        buttons && buttons.length > 0 && _react2.default.createElement(
          "div",
          { style: { marginTop: 5, display: "flex" } },
          buttons.map(function (button, index) {
            return _react2.default.createElement(
              "div",
              {
                onClick: function onClick() {
                  if (button.route.includes("digit-ui")) {
                    window.location.href = "" + (button.route.startsWith('digit-ui') ? '/' : "") + button.route;
                  } else {
                    history.push(button.route);
                  }
                },
                style: { cursor: "pointer", marginBottom: 10 }
              },
              _react2.default.createElement(_translationNode2.default, {
                label: "CS_COMMON_" + button.label.toUpperCase().replace(/[._:-\s\/]/g, "_"),
                color: "#FC8019",
                fontSize: 12,
                containerStyle: index != buttons.length - 1 ? { marginRight: 30 } : {}
              })
            );
          })
        ),
        documents && _react2.default.createElement(_uiContainers.DownloadFileContainer, { data: documents, className: "review-documents", backgroundGrey: true }),
        type === "EVENTSONGROUND" ? _react2.default.createElement(
          "div",
          { className: "rainmaker-displayInline" },
          _react2.default.createElement(_components.Icon, { name: "access-time", action: "device", viewBox: "10 0 24 24", style: { height: "20px", width: "35px" } }),
          SLA
        ) : SLA
      )
    )), _React$createElement));
  };

  return notifications && notifications.length > 0 && _react2.default.createElement(
    "div",
    null,
    notifications.map(function (notification, index) {
      return renderUpdate(notification, index);
    })
  );
  //  : (
  //   <div className="no-assessment-message-cont"><Label label="EMPTY_NOTIFICATIONS" /></div>
  // );
};

exports.default = Notifications;